const { cmd } = require("../lib/command");
const yts = require("yt-search");
const axios = require("axios");
const config = require("../settings");

cmd(
  {
    pattern: "mymp4",
    alias: ["vre", "yta"],
    react: "🎧",
    desc: "Download YouTube MP3",
    category: "download",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    { from, q, reply }
  ) => {
    try {
      if (!q) return reply("ඔයාලා YouTube නමක් හෝ ලින්ක් එකක් දෙන්න!");

      const search = await yts(q);
      if (!search.videos.length) return reply("❌ ගීතයක් හමුනොවුණා!");

      const data = search.videos[0];
      const ytUrl = data.url;

      const api = `https://yt-five-tau.vercel.app/download?q=${ytUrl}&format=144`;
      const { data: apiRes } = await axios.get(api);

      if (!apiRes?.status || !apiRes.result?.download) {
        return reply("❌ ගීතය බාගත කළ නොහැක. වෙනත් එකක් උත්සහ කරන්න!");
      }

      const result = apiRes.result;

      const caption = `⭕𝚃𝙸𝚃𝙻𝙴 :- *${result.title}*

➣ ||𝚃𝙸𝙼𝙴    : ${data.timestamp}
✭ ||𝚄𝙿𝙻𝙾𝙰𝙳  : ${data.ago}
➣ ||𝚅𝙸𝙴𝚆𝚂   : ${data.views}
✭ ||𝚄𝚁𝙻     : ${data.url}

> //#DιηᵤW 🅱🅱🅷 🧚‍♂️
____  *||"💗🩷💙💚🖤" ඔයාගෙ ආසම පාටින් රියැට් කරමූ💐..!*
`;

      await robin.sendMessage(
        from,
        {
          image: { url: result.thumbnail },
          caption: caption,
        },
        { quoted: mek }
      );

      await robin.sendMessage(
        from,
        {
          audio: { url: result.download },
          mimetype: "video/mp4",
          ptt: true,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);
