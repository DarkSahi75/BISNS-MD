const fetch = require('node-fetch');
const { cmd } = require('../lib/command'); // ඔබේ command handler path එකට adjust කරන්න

const fetchJson = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await res.json();
  } catch (err) {
    return { error: err.message };
  }
};

const config = require('../settings'); // config.FOOTER එක load වෙන තැන

cmd({
  pattern: "tiktoksadas",
  alias: ["tt", "ttdl", "tiktokdl"],
  react: '🎩',
  desc: "Download TikTok videos",
  category: "download",
  use: '.tiktok <tiktok url>',
  filename: __filename
},
async (conn, mek, m, {
  from, prefix, q, reply
}) => {
  try {
    if (!q) return await reply('📌 කරුණාකර TikTok link එකක් ලබාදෙන්න.\n\nඋදාහරණය: `.tiktok https://www.tiktok.com/@user/video/123456`');
    if (!q.includes('tiktok')) return await reply('❌ මෙය වලංගු TikTok ලින්ක් එකක් නොවේ.');

    const mov = await fetchJson(`https://darksadasyt-tiktokdl.vercel.app/api/tiktok?q=${q}`);

    if (!mov || mov.error || !mov.title) return await reply('⚠️ TikTok video එක ලබාගත නොහැක. URL එක පරීක්ෂා කරන්න.');

    let yt = `*\`🪺 VISPER TIK TOK DOWNLOADER 🪺\`*\n\n` +
             `*┌──────────────────*\n` +
             `*├ 🎩 Title :* ${mov.title}\n` +
             `*├ 🎃 Region :* ${mov.regions}\n` +
             `*├ ⏰ Duration :* ${mov.runtime}\n` +
             `*├ 🔗 Url :* ${q}\n` +
             `*└──────────────────*`;

    const buttons = [
      {
        buttonId: prefix + 'ttdl1 ' + mov.no_watermark,
        buttonText: { displayText: '*🎥 Video No Watermark*' },
        type: 1
      },
      {
        buttonId: prefix + 'ttdl2 ' + mov.watermark,
        buttonText: { displayText: '*📼 Video With Watermark*' },
        type: 1
      },
      {
        buttonId: prefix + 'ttdl3 ' + mov.music,
        buttonText: { displayText: '*🎶 Audio (MP3)*' },
        type: 1
      }
    ];

    const buttonMessage = {
      image: { url: mov.thumbnail },
      caption: yt,
      footer: config.FOOTER || '🧠 POWERED BY DINUWH MD',
      buttons: buttons,
      headerType: 4
    };

    await conn.buttonMessage(from, buttonMessage, mek);

  } catch (e) {
    reply(`❌ *Error occurred!*\n\n${e.message}`);
    console.log(e);
  }
});

cmd({
    pattern: "ttdl1",
    category: "download",
    desc: "Download TikTok no watermark video",
    use: '.ttdl1 <url>'
}, async (conn, m, { q, reply }) => {
    if (!q) return reply("TikTok video url එක දෙන්න.");
    await conn.sendMessage(m.from, { video: { url: q }, caption: "🎩 No Watermark Video" }, { quoted: m });
});

cmd({
    pattern: "ttdl2",
    category: "download",
    desc: "Download TikTok watermark video",
    use: '.ttdl2 <url>'
}, async (conn, m, { q, reply }) => {
    if (!q) return reply("TikTok video url එක දෙන්න.");
    await conn.sendMessage(m.from, { video: { url: q }, caption: "📼 Watermark Video" }, { quoted: m });
});

cmd({
    pattern: "ttdl3",
    category: "download",
    desc: "Download TikTok mp3",
    use: '.ttdl3 <url>'
}, async (conn, m, { q, reply }) => {
    if (!q) return reply("TikTok music url එක දෙන්න.");
    await conn.sendMessage(m.from, { audio: { url: q }, mimetype: 'audio/mpeg', ptt: true }, { quoted: m });
});


    
                  
cmd({
  pattern: "tikwm",
  alias: ["tt", "ttdl", "tiktokdl"],
  react: '🎩',
  desc: "Download TikTok videos (Watermark only)",
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

    await conn.sendMessage(from, { video: { url: data.watermark } }, { quoted: mek });

  } catch (e) {
    console.log(e);
    return reply(`❌ Error\n\n${e.message}`);
  }
});       


cmd({
  pattern: "tikaud",
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
