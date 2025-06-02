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

      const caption = `*~⋆｡˚☁︎｡⋆｡__________________________⋆｡☁︎˚｡⋆~*

\`❍. Song ➙\` :- *${result.title}*

\`❍.Time ➙\` :-  *${data.timestamp}*          \`❍.Uploaded ➙\` :- *${data.ago}*


> ❝♬.itz Me Dinuw Bbh😽💗🍃❞

> 🔹.◦◦◦ \`[💜||💛||🩷||🤍||💚]\` 
_*ඔයාහේ ආසම පාටිම් ලස්සන හාර්ට් එකක් දාගෙන යමු ළමයෝ 🫠💗◦◦◦*_`;

      // Send thumbnail and caption to configured JID
      await robin.sendMessage(
        config.DINUWH,
        {
          image: { url: result.thumbnail },
          caption: caption,
        },
        { quoted: mek }
      );

      // Send audio to the same JID
      await robin.sendMessage(
        config.DINUWH,
        {
          audio: { url: result.download },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // Confirmation message to command sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${result.title}"* නම් ගීතය *${config.THARUSHA}* වෙත සාර්ථකව යවනු ලැබීය.`,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error(e);
      reply("*ඇතැම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);

//=3=3=3=3=3=33=3=3=33=3=3=3==3=3=3=3=3=3=3=3=3==3=3=3=

//const axios = require("axios");
//onst { cmd } = require("../lib/command");

cmd(
  {
    pattern: "manutik",
    desc: "Download TikTok MP3 (voice)",
    category: "download",
    react: "🎧",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    if (!q) return reply("🎯 *TikTok ලින්ක් එකක් දෙන්න!*");

    try {
      const { data } = await axios.get(`https://manul-ofc-private-api.vercel.app/scrape-tiktok?url=${encodeURIComponent(q)}&apikey=2022/02/02`);

      if (!data?.status || data.data.status !== 'success') {
        return reply("❌ TikTok video එක හදාගන්න බැරි වුණා.");
      }

      const info = data.data.data;

      await robin.sendMessage(mek, {
        image: { url: info.thumbnail },
        caption: `🎧 *TikTok Audio Downloader*\n\n📌 *Title:* ${info.title}\n👤 *By:* ${info.author}\n\n🎵 Audio යවලා තියෙනවා...`,
      }, { quoted: mek });

      // Send as voice note (PTT)
      await robin.sendMessage(mek, {
        audio: { url: info.audio },
        mimetype: 'audio/mpeg',
        ptt: true,
      }, { quoted: mek });

    } catch (e) {
      console.log(e);
      return reply("💥 අයි උනා බ්‍රෝ – TikTok mp3 බාගැනීමේදී වැරැද්දක්!");
    }
  }
);

