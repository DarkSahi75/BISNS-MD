const sadiya_md_footer = "🌀 Powered by DINUWH MD";
  pattern: "v144",
  //lias: ["yt144"],
  react: "📹",
  desc: "Download 144p video",
  category: "download",
  filename: __filename,
}, async (robin, mek, m, { q, reply }) => {
  try {
    if (!q) return reply("🔗 YouTube ලින්ක් එකක් හරි නමක් හරි දෙන්න");
    const search = await require("yt-search")(q);
    if (!search.videos.length) return reply("❌ Video not found!");

    const url = search.videos[0].url;
    const data = await fetchJson(`https://manul-official-new-api-site.vercel.app/convert?mp4=${encodeURIComponent(url)}&quality=144p&apikey=Manul-Official`);

    await robin.sendMessage(m.chat, {
      video: { url: data.data.url },
      caption: "",
    }, { quoted: mek });
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

//ytv

//const { cmd } = require("../command");
const axios = require("axios");

cmd({
  pattern: "yt144",
  react: "💗",
  category: "download",
  desc: "Download YouTube video 144p",
  filename: __filename,
}, async (robin, mek, m, { q, from, reply }) => {
  if (!q) return reply("🔗 YouTube ලින්ක් එකක් දෙන්න!");
  try {
    const res = await axios.get(`https://yt-five-tau.vercel.app/download?q=${q}&format=144`);
    if (!res.data?.result?.download) return reply("❌ Link එක හොයාගන්න බැරිවුණා!");
    await robin.sendMessage(from, {
      video: { url: res.data.result.download },
      caption: "🎥 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝙳 - 144p",
    }, { quoted: mek });
  } catch (e) {
    reply("❌ Error: " + e.message);
  }
});



  //Sadiya
cmd({
    pattern: "ytmp4-240",
    dontAddCommandList: true,
    filename: __filename
  },
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
  try {
    const ytdl = await fetchJson(`https://sadiya-tech-apis.vercel.app/download/ytdl?url=${q}&apikey=sadiya&format=240`);
    const dllink = ytdl.result.download;
    await conn.sendMessage(from, {
      video: { url: dllink },
      mimetype: "video/mp4",
      caption: sadiya_md_footer
    }, { quoted: mek });
  } catch (e) {
    console.log(e);
    reply("🚫 Error: " + e.message);
  }
});

//const { fetchJson } = require('../lib/functions');
//onst { cmd } = require('../command');
//onst yts = require("yt-search");

cmd(
  {
    pattern: "giftv",
    alias: ["ytvideo", "giftedyt"],
    react: "🎬",
    desc: "Download YouTube Video (MP4)",
    category: "download",
    filename: __filename,
  },
