const { cmd } = require("../lib/command");
const yts = require("yt-search");
const axios = require("axios");
const config = require("../settings");

cmd(
  {
    pattern: "api",
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

      const api = `https://yt-five-tau.vercel.app/download?q=${ytUrl}&format=mp3`;
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
          mimetype: "audio/mpeg",
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


//second yt
cmd({
  pattern: "ytptt",
  alias: ["ytmp3ptt"],
  category: "downloader",
  use: "<YouTube URL>",
  desc: "Download YouTube audio in PTT format",
  filename: __filename
},
async (m, { args, prefix, command }) => {
  if (!args[0]) return m.reply(`*Example:* ${prefix + command} https://youtube.com/watch?v=K4UjOgTd_hM`);

  try {
    const res = await fetch(`https://sadas-ytmp3-new-2.vercel.app/convert?url=${args[0]}`);
    const json = await res.json();

    if (!json.success || !json.data?.link) return m.reply("Failed to fetch audio. Try another video URL.");

    const { link, title, filesize, duration } = json.data;
    const sec = Math.floor(duration % 60).toString().padStart(2, '0');
    const min = Math.floor(duration / 60).toString().padStart(2, '0');
    const sizeMB = (filesize / 1024 / 1024).toFixed(2);
    const thumb = `https://i.ytimg.com/vi/${args[0].split("v=")[1]}/hqdefault.jpg`;

    // Send song details preview with thumbnail
    await conn.sendMessage(m.chat, {
      image: { url: thumb },
      caption: `*🎶 Title:* ${title}\n*⏱ Duration:* ${min}:${sec}\n*📁 File Size:* ${sizeMB} MB\n\n_Audio will be sent as PTT voice note._`,
    }, { quoted: m });

    // Send audio as PTT
    await conn.sendMessage(m.chat, {
      audio: { url: link },
      mimetype: 'audio/mp4',
      ptt: true
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    return m.reply("An error occurred. Please try again later.");
  }
});
