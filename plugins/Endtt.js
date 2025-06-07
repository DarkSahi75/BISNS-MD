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
//const { cmd } = require("../lib/command");
const config = require('../settings');
const prefix = config.PREFIX || ".";

cmd({
  pattern: "tiktoklatest",
  alias: ["tlist", "ttlist"],
  react: '🎵',
  desc: "TikTok Song Downloader with List Only",
  category: "tiktok",
  use: ".tiklist <TikTok URL>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const url = args[0];
    if (!url || !url.includes("tiktok.com")) {
      return reply("🥲 කරුණාකර වලංගු TikTok ලින්ක් එකක් දෙන්න.");
    }

    await conn.sendMessage(from, { react: { text: "🧠", key: m.key } });

    const api = `https://api.nexoracle.com/downloader/tiktok-nowm?apikey=free_key@maher_apis&url=${encodeURIComponent(url)}`;
    const res = await axios.get(api);

    if (!res.data || !res.data.result) {
      return reply("🥲 TikTok API එකෙන් ප්‍රතිචාරයක් ලැබුණේ නැහැ.");
    }

    const {
      title = "Unknown Title",
      thumbnail,
      music,
      play_count = 0,
      download_count = 0,
      comment_count = 0,
      share_count = 0,
      digg_count = 0,
      region = "N/A",
      video_url = url,
      nickname = "Unknown",
      unique_id = "N/A"
    } = res.data.result;

    if (!music) return reply("🎵 ගීතය ලබාගත නොහැක. කරුණාකර වෙනත් TikTok link එකක් වගේ දෙන්න.");

    const cap = `乂 ᗪIᑎᑌᗯᕼ TIKTOK ᗪOᗯᑎ ⟩⟩⟩
\`╭────────✦✧✦────────╯\`

\`╭───────────────✿\`

- \`D\` ᴏᴡɴʟᴏᴀᴅꜱ : _${download_count}_
- \`C\` ᴏᴍᴍᴇɴᴛꜱ  : _*${comment_count}*_
- \`S\` ʜᴀʀᴇꜱ    : _${share_count}_
- \`R\` ᴇɢɪᴏɴ    : _*${region}*_
- \`P\` ʟᴀʏꜱ     : _${play_count}_
- \`L\` ɪᴋᴇꜱ     : _*${digg_count}*_
- \`L\` ɪɴᴋ      : _${video_url}_

✠.Aᴜᴛʜᴏʀ :
- Nɪᴄᴋ Nᴀᴍᴇ :- *${nickname}*
- Uꜱᴇʀɴᴀᴍᴇ   :- *${unique_id}*

\`╰───────────────✿\`

〽️ᴀᴅᴇ ʙʏ Dɪɴᴜᴡʜ ʙʙʜ`;

    const mode = config.MODE || 'button';

    if (mode === 'nonbutton') {
      const sections = [
        {
          title: "",
          rows: [
            { title: "1", rowId: `${prefix}ytaud ${music}`, description: '`❲ Audio File ❳` 🎧' },
            { title: "2", rowId: `${prefix}ytdoc ${music}`, description: '`❲ Document File ❳` 📄' },
            { title: "3", rowId: `${prefix}ytvoice ${music}`, description: '`❲ Voice Note (ptt) ❳` 🎤' },
            { title: "4", rowId: `${prefix}devilv ${music}`, description: '`❲ Video File (mp4) ❳` 📽️' },
          ]
        }
      ];
      const listMessage = {
        caption: cap,
        image: { url: thumbnail },
        footer: '> 〽️ade By Dinuwh Bbh',
        title: '',
        buttonText: '> *◎Power Full Whatsapp bot Make By Dinuwh◎*',
        sections
      };
      return await conn.sendMessage(from, listMessage, { quoted: mek });
    }

    if (mode === 'button') {
      const listData = {
        title: "◎ 𝙲𝙷𝙾𝙾𝚂 𝙵𝙾𝚁𝙼𝙰𝚃𝙴 ◎",
        sections: [{
          title: "DINUWH MD OPTIONS",
          rows: [
            {
              title: "[Audio 🎧]",
              description: "Download as audio\n〽️ade By Dinuwh Bbh",
              id: `${prefix}ytaud ${music}`
            },
            {
              title: "[Document 📁]",
              description: "Download as document\n〽️ade By Dinuwh Bbh",
              id: `${prefix}ytdoc ${music}`
            },
            {
              title: "[Voice (ptt) 💡]",
              description: "Download as Voice Note\n〽️ade By Dinuwh Bbh",
              id: `${prefix}ytvoice ${music}`
            },
            {
              title: "[Video File 📽️]",
              description: "Download as Video\n〽️ade By Dinuwh Bbh",
              id: `${prefix}devilv ${music}`
            }
          ]
        }]
      };

      return await conn.sendMessage(from, {
        image: { url: thumbnail },
        caption: cap,
        footer: "> 〽️ade By Dinuwh Bbh",
        buttons: [
          {
            buttonId: "action",
            buttonText: { displayText: "🔘 Choose Song Type" },
            type: 4,
            nativeFlowInfo: {
              name: "single_select",
              paramsJson: JSON.stringify(listData),
            },
          }
        ],
        headerType: 1,
        viewOnce: true,
      }, { quoted: mek });
    }

  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e.message}`);
  }
});
