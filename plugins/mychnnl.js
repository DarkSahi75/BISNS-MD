const { cmd } = require("../lib/command");
const yts = require("yt-search");
const axios = require("axios");
const config = require("../settings");

cmd(
  {
    pattern: "dinuwa",
    desc: "Send YouTube MP3 to a specific JID",
    category: "download",
    react: "🎧",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    try {
      if (!q) return reply("*ඔයාලා ගීත නමක් හෝ YouTube ලින්ක් එකක් දෙන්න...!*");

      const search = await yts(q);
      if (!search.videos.length) return reply("*ගීතය හමුනොවුණා... ❌*");

      const data = search.videos[0];
      const ytUrl = data.url;

      const api = `https://yt-five-tau.vercel.app/download?q=${ytUrl}&format=mp3`;
      const { data: apiRes } = await axios.get(api);

      if (!apiRes?.status || !apiRes.result?.download) {
        return reply("❌ ගීතය බාගත කළ නොහැක. වෙනත් එකක් උත්සහ කරන්න!");
      }

      const result = apiRes.result;

      // Duration breakdown
      const durationStr = result.duration || "0:00";
      const timeParts = durationStr.split(":").map((n) => parseInt(n));
      let secondsTotal = 0;

      if (timeParts.length === 2) {
        secondsTotal = timeParts[0] * 60 + timeParts[1];
      } else if (timeParts.length === 3) {
        secondsTotal = timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];
      }

      const caption = `*~⋆｡˚☁︎｡⋆｡__________________________⋆｡☁︎˚｡⋆~*

\`❍. Song ➙\` ${result.title}

\`❍.Time ➙\` ${durationStr} (${secondsTotal} sec)        \`❍.Uploaded ➙\` ${data.ago}

> ❝♬.itz Me Dinuw Bbh😽💗🍃❞
> *||____*🔹.◦◦◦ \`[💜\\💛\\🩷\\🤍\\💚]\` 
_*ඔයාහේ ආසම පාටිම් ලස්සන හාර්ට් එකක් දාගෙන යමු ළමයෝ 🫠💗◦◦◦*_`;

      await robin.sendMessage(
        config.DINUWH,
        {
          image: { url: result.thumbnail },
          caption: caption,
        },
        { quoted: mek }
      );

      await robin.sendMessage(
        config.DINUWH,
        {
          audio: { url: result.download },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${result.title}"* නම් ගීතය *${config.DINUWH}* වෙත සාර්ථකව යවනු ලැබීය.`,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error(e);
      reply("*ඇතැම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);
