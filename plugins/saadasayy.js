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
