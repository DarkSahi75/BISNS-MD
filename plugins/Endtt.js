const fetch = require('node-fetch');
const { cmd } = require('../lib/command'); // ඔබගේ structure එකට adjust කරන්න
//AUDIO-ONLY==========3=3.03=3.03=3.03=3.03=3.033-3

cmd({
  pattern: "tikaud",
 // alias: ["tt", "ttdl", "tiktokdl"],
  react: '🎩',
  desc: "Download TikTok video (WM) + Audio",
  category: "download",
  use: '.tiktok <tiktok url>',
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return await reply('*Error*');
    if (!q.includes("tiktok")) return await reply("*Url Error*.");

    const res = await fetch(`https://darksadasyt-tiktokdl.vercel.app/api/tiktok?q=${q}`);
    const data = await res.json();


    // Send audio as voice message (PTT)
    await conn.sendMessage(from, { audio: { url: data.music }, mimetype: 'audio/mp4', ptt: false }, { quoted: mek });

  } catch (e) {
    console.log(e);
    return reply(`*Download Error*\n\n${e.message}`);
  }
});

//=======TiktokAud-Document


cmd({
  pattern: "tikauddoc",
//  alias: ["tt", "ttdl", "tiktokdl"],
  react: '🎩',
  desc: "Download TikTok audio (MP3 as document)",
  category: "download",
  use: '.tiktoksv <tiktok url>',
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return await reply('*Error*');
    if (!q.includes("tiktok")) return await reply("*🔗 Url Error*");

    const res = await fetch(`https://darksadasyt-tiktokdl.vercel.app/api/tiktok?q=${q}`);
    const data = await res.json();

    // Send audio as document
    await conn.sendMessage(from, {
      document: { url: data.music },
      mimetype: 'audio/mp3',
      fileName: `${data.title || 'tiktok'}.mp3`,
      caption: '> *〽️ade By Dinuwh Bbh*'
    }, { quoted: mek });

  } catch (e) {
    console.log(e);
    return reply(`*Download Error*\n\n${e.message}`);
  }
});

//=====Tik-Aud-Ptt=3=3.03=3.03=3.033=3.03333


cmd({
  pattern: "tikaudptt",
//  alias: ["tt", "ttdl", "tiktokdl"],
  react: '🎩',
  desc: "Download TikTok video (WM) + Audio",
  category: "download",
  use: '.tiktok <tiktok url>',
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return await reply('*Error*');
    if (!q.includes("tiktok")) return await reply("*Url Error*");

    const res = await fetch(`https://darksadasyt-tiktokdl.vercel.app/api/tiktok?q=${q}`);
    const data = await res.json();


    // Send audio as voice message (PTT)
    await conn.sendMessage(from, { audio: { url: data.music }, mimetype: 'audio/mp4', ptt: true }, { quoted: mek });

  } catch (e) {
    console.log(e);
    return reply(`*Download Error*\n\n${e.message}`);
  }
});

//=====Tik-Watermark-norml


cmd({
  pattern: "tikwm",
 // alias: ["tt", "ttdl", "tiktokdl"],
  react: '🎩',
  desc: "Download TikTok video (WM) + Audio",
  category: "download",
  use: '.tiktok <tiktok url>',
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return await reply('*Error*');
    if (!q.includes("tiktok")) return await reply("*Url Error*");

    const res = await fetch(`https://darksadasyt-tiktokdl.vercel.app/api/tiktok?q=${q}`);
    const data = await res.json();

    // Send watermark video
    await conn.sendMessage(from, { video: { url: data.watermark }, caption: "> *〽️ade By Dinuwh Bbh*" }, { quoted: mek });


  } catch (e) {
    console.log(e);
    return reply(`❌ Error\n\n${e.message}`);
  }
});

//=Watermark-doc=======


cmd({
  pattern: "tikwmdoc",
  alias: ["tt", "ttdl", "tiktokdl"],
  react: '🎩',
  desc: "Download TikTok video (WM) as Document",
  category: "download",
  use: '.tiktoksv <tiktok url>',
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return await reply('*Error*');
    if (!q.includes("tiktok")) return await reply("*Url Error*");

    const res = await fetch(`https://darksadasyt-tiktokdl.vercel.app/api/tiktok?q=${q}`);
    const data = await res.json();

    // Send watermark video as document
    await conn.sendMessage(from, {
      document: { url: data.watermark },
      mimetype: 'video/mp4',
      fileName: `${data.title || 'tiktok'}.mp4`,
      caption: '> *〽️ade By Dinuwh Bbh*'
    }, { quoted: mek });

  } catch (e) {
    console.log(e);
    return reply(`❌ Error\n\n${e.message}`);
  }
});

//Tik-Nonwatermark-norml



cmd({
  pattern: "tiknowm",
  alias: ["tt", "ttdl", "tiktokdl"],
  react: '🎩',
  desc: "Download TikTok video (WM) + Audio",
  category: "download",
  use: '.tiktok <tiktok url>',
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return await reply('*Error*');
    if (!q.includes("tiktok")) return await reply("*Url Error*");

    const res = await fetch(`https://darksadasyt-tiktokdl.vercel.app/api/tiktok?q=${q}`);
    const data = await res.json();

    // Send watermark video
    await conn.sendMessage(from, { video: { url: data.no_watermark }, caption: "> *〽️ade By Dinuwh Bbh*" }, { quoted: mek });

    

  } catch (e) {
    console.log(e);
    return reply(`❌ Error\n\n${e.message}`);
  }
});

//==tik-no wm Doc



cmd({
  pattern: "tiknowmdoc",
  alias: ["tt", "ttdl", "tiktokdl"],
  react: '🎩',
  desc: "Download TikTok video (No Watermark) as Document",
  category: "download",
  use: '.tiktoksv <tiktok url>',
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return await reply('*Error*');
    if (!q.includes("tiktok")) return await reply("*Url Error*");

    const res = await fetch(`https://darksadasyt-tiktokdl.vercel.app/api/tiktok?q=${q}`);
    const data = await res.json();

    // Send video as document (no watermark)
    await conn.sendMessage(from, {
      document: { url: data.no_watermark },
      mimetype: 'video/mp4',
      fileName: `${data.title || 'tiktok'}.mp4`,
      caption: '> *〽️ade By Dinuwh Bbh*'
    }, { quoted: mek });

  } catch (e) {
    console.log(e);
    return reply(`*❌ Error*\n\n${e.message}`);
  }
});
