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


//3=3.03=3.033=3.0333=3.03333=3.033333=3.033333
const axios = require("axios");
//onst { cmd } = require("../lib/command");
const config = require('../settings');
const prefix = config.PREFIX || ".";

cmd({
  pattern: "ttlatest",
  alias: ["ttinfo", "ttdetails", "tt"],
  react: '🔎',
  desc: "Get TikTok video details only.",
  category: "tools",
  use: ".tend <TikTok video URL>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const q = args[0] || m.quoted?.text;
    if (!q || !q.includes("tiktok.com")) {
      return reply('```🥲 කරුණාකර වලංගු TikTok ලින්ක් එකක් දෙන්න.\nඋදාහරණයක්: .tend https://www.tiktok.com/@user/video/123...```');
    }

    await conn.sendMessage(from, { react: { text: '🔍', key: m.key } });

    const apiUrl = `https://api.nexoracle.com/downloader/tiktok-nowm?apikey=free_key@maher_apis&url=${encodeURIComponent(q)}`;
    const response = await axios.get(apiUrl);
    const { title, thumbnail, video_url, author = {}, metrics = {} } = response.data.result;

    const download_count = metrics?.download_count || 'N/A';
    const comment_count = metrics?.comment_count || 'N/A';
    const share_count   = metrics?.share_count   || 'N/A';
    const region        = metrics?.region        || '🌍 Unknown';
    const play_count    = metrics?.play_count    || 'N/A';
    const digg_count    = metrics?.digg_count    || 'N/A';

    const nickname = author?.nickname || 'N/A';
    const username = author?.unique_id || 'N/A';

    const detailsMsg = `乂 ᗪIᑎᑌᗯᕼ TIKTOK ᗪOᗯᑎ ⟩⟩⟩
\`╭────────✦✧✦────────╯\`

\`╭───────────────✿\`

- \`D\` ᴏᴡɴʟᴏᴀᴅꜱ : _${download_count}_
- \`C\` ᴏᴍᴍᴇɴᴛꜱ  : _*${comment_count}*_
- \`S\` ʜᴀʀᴇꜱ    : _${share_count}_
- \`R\` ᴇɢɪᴏɴ    : _*${region}*_
- \`P\` ʟᴀʏꜱ     : _${play_count}_
- \`L\` ɪᴋᴇꜱ     : _*${digg_count}*_
- \`L\` ɪɴᴋ      : _${q}_

✠.Aᴜᴛʜᴏʀ :
- Nɪᴄᴋ Nᴀᴍᴇ :- *${nickname}*
- Uꜱᴇʀɴᴀᴍᴇ   :- *${username}*

\`╰───────────────✿\`

〽️ᴀᴅᴇ ʙʏ Dɪɴᴜᴡʜ ʙʙʜ`;


if (config.MODE === 'nonbutton') {
  const sections = [
    {
      title: "",
      rows: [
        { title: "1", rowId: `${prefix}ytaud ${q}`, description: '`❲ Audio File ❳` 🎧' },
        { title: "2", rowId: `${prefix}ytdoc ${q}`, description: '`❲ Document File ❳` 📄' },
        { title: "3", rowId: `${prefix}ytvoice ${q}`, description: '`❲ Voice Note (ptt) ❳` 🎤' },
        { title: "4", rowId: `${prefix}devilv ${q}`, description: '`❲ Video File (mp4) ❳` 📽️' },
      ]
    }
  ];

  const listMessage = {
    caption: detailsMsg,
    image: { url: thumbnail },
    footer: '> 〽️ade By Dinuwh Bbh',
    title: '',
    buttonText: '> *◎Power Full Whatsapp bot Make By Dinuwh◎*',
    sections
  };

  return await conn.replyList(from, listMessage, { quoted: mek });

} else if (config.MODE === 'button') {
  const listData = {
    title: "𝐕𝐢𝐝𝐞𝐨 𝐒𝐞𝐥𝐞𝐜𝐭𝐢𝐨𝐧 ツ",
    sections: [{
      title: "ᴅɪɴᴜᴡʜ-ᴍᴅ || ᴛɪᴋᴛᴏᴋ ᴠɪᴅᴇᴏɴ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ⇲",
      rows: [
        {
          title: "NonWaterMark Norml Video",
          description: "Download as audio\n〽️ade By Dinuwh Bbh",
          id: `${prefix}tikaud ${q}`
        },
        {
          title: "NonWaterMark Document Video",
          description: "Download as document\n〽️ade By Dinuwh Bbh",
          id: `${prefix}ytdoc ${q}`
        },
        {
          title: "WithWaterMark Normal Video",
          description: "Download as Voice Note\n〽️ade By Dinuwh Bbh",
          id: `${prefix}ytvoice ${q}`
        },
        {
          title: "WithWaterMark Document Video",
          description: "Download as Video\n〽️ade By Dinuwh Bbh",
          id: `${prefix}devilv ${q}`
        }
      ]
    }]
  };

  const listData2 = {
    title: "𝐀𝐮𝐝𝐢𝐨 𝐒𝐞𝐥𝐞𝐜𝐭𝐢𝐨𝐧 ツ",
    sections: [{
      title: "DINUWH MD OPTIONS",
      rows: [
        {
          title: "[A2 🎧]",
          description: "Download as audio\n〽️ade By Dinuwh Bbh",
          id: `${prefix}ytaud ${q}`
        },
        {
          title: "[D2📁]",
          description: "Download as document\n〽️ade By Dinuwh Bbh",
          id: `${prefix}ytdoc ${q}`
        },
        {
          title: "[V2 💡]",
          description: "Download as Voice Note\n〽️ade By Dinuwh Bbh",
          id: `${prefix}ytvoice ${q}`
        },
        {
          title: "[V2📽️]",
          description: "Download as Video\n〽️ade By Dinuwh Bbh",
          id: `${prefix}devilv ${q}`
        }
      ]
    }]
  };

  return await conn.sendMessage(from, {
    image: { url: thumbnail },
    caption: detailsMsg,
    footer: "> 〽️ade By Dinuwh Bbh",
    buttons: [
      {
        buttonId: "action1",
        buttonText: { displayText: "🔘 Choose Video Type" },
        type: 4,
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify(listData),
        },
      },
      {
        buttonId: "action2",
        buttonText: { displayText: "🔘 Choose Audio Type" },
        type: 4,
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify(listData2),
        },
      }
    ],
    headerType: 1,
    viewOnce: true,
  }, { quoted: mek });
}
