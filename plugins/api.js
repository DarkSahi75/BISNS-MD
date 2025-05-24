const { cmd } = require("../lib/command");
//nst yts = require("yt-search");
const axios = require("axios");
const config = require("../settings");


//const yts = require("yt-search");
//onst axios = require("axios");

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
      const durationText = data.timestamp || `${Math.floor(data.seconds / 60)}:${(data.seconds % 60).toString().padStart(2, '0')}`;
      const durationSeconds = data.seconds || 0;

      const caption = `⭕𝚃𝙸𝚃𝙻𝙴 :- *${data.title}*

➣ ||𝚃𝙸𝙼𝙴    : ${durationText} (${durationSeconds} Seconds)

> //#DιηᵤW 🅱🅱🅷 🧚‍♂️
____  *||"💗🩷💙💚🖤" ඔයාගෙ ආසම පාටින් රියැට් කරමූ💐..!*
`;

      await robin.sendMessage(
        from,
        {
          image: { url: data.thumbnail },
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

//YTAPI2 SADAS


const yts = require("yt-search");

cmd({
  pattern: "api2",
  alias: ["songptt"],
  category: "downloader",
  use: "<YouTube URL or song name>",
  desc: "Download YouTube audio as PTT voice note",
  filename: __filename
},
async (m, { args, prefix, command }) => {
  if (!args[0]) return m.reply(`*Example:* ${prefix + command} shape of you`);

  const input = args.join(" ");
  let videoUrl;

  try {
    if (input.includes("youtube.com") || input.includes("youtu.be")) {
      videoUrl = input;
    } else {
      const search = await yts(input);
      if (!search?.videos?.length) return m.reply("No results found.");
      videoUrl = search.videos[0].url;
    }

    const res = await fetch(`https://sadas-ytmp3-new-2.vercel.app/convert?url=${videoUrl}`);
    const json = await res.json();

    if (!json.success || !json.data?.link) return m.reply("Download failed. Try again.");

    const { link, title, filesize, duration } = json.data;
    const durationSec = Math.round(duration);
    const min = Math.floor(durationSec / 60).toString();
    const sec = Math.floor(durationSec % 60).toString().padStart(2, '0');
    const fancyDuration = `${min}:${sec} (${durationSec} Seconds)`;
    const ytId = videoUrl.split("v=")[1]?.split("&")[0] || videoUrl.split("/").pop();
    const thumb = `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`;

    const caption = `⭕𝚃𝙸𝚃𝙻𝙴 :- *${title}*\n\n➣ ||𝚃𝙸𝙼𝙴    : ${fancyDuration}\n\n> //#DιηᵤW 🅱🅱🅷 🧚‍♂️\n____  *||"💗🩷💙💚🖤" ඔයාගෙ ආසම පාටින් රියැට් කරමූ💐..!*`;

    await conn.sendMessage(m.chat, {
      image: { url: thumb },
      caption
    }, { quoted: m });

    await conn.sendMessage(m.chat, {
      audio: { url: link },
      mimetype: 'audio/mp4',
      ptt: true
    }, { quoted: m });

  } catch (e) {
    console.log(e);
    m.reply("⚠️ Error occurred while downloading. Please try again.");
  }
});

                                                                                //
