const fetch = require('node-fetch');
const { cmd } = require('../lib/command'); // ඔබගේ structure එකට adjust කරන්න

cmd({
  pattern: "tiktoksv",
  alias: ["tt", "ttdl", "tiktokdl"],
  react: '🎩',
  desc: "Download TikTok video (WM) + Audio",
  category: "download",
  use: '.tiktok <tiktok url>',
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return await reply('📌 TikTok වීඩියෝ link එකක් දෙන්න.');
    if (!q.includes("tiktok")) return await reply("🔗 වලංගු TikTok URL එකක් දෙන්න.");

    const res = await fetch(`https://darksadasyt-tiktokdl.vercel.app/api/tiktok?q=${q}`);
    const data = await res.json();

    // Send watermark video
    await conn.sendMessage(from, { video: { url: data.watermark }, caption: "🎥" }, { quoted: mek });

    // Send audio as voice message (PTT)
    await conn.sendMessage(from, { audio: { url: data.music }, mimetype: 'audio/mp4', ptt: true }, { quoted: mek });

  } catch (e) {
    console.log(e);
    return reply(`❌ Error\n\n${e.message}`);
  }
});
