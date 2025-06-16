const fetch = require('node-fetch');
const { cmd } = require('../lib/command'); 
const axios = require("axios");
const config = require('../settings');
const prefix = config.PREFIX || ".";

cmd({
  pattern: "tikaud",
 // alias: ["tt", "ttdl", "tiktokdl"],
  react: '🎧',
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
  react: '🎧',
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
  react: '🎧',
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
  react: '📹',
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


cmd({
  pattern: "tikwmp",
  // alias: ["tt", "ttdl", "tiktokdl"],
  react: '📹',
  desc: "Download TikTok video (WM) + Audio",
  category: "download",
  use: '.tiktok <tiktok url>',
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return await reply('*Error: Please provide a TikTok link*');
    if (!q.includes("tiktok")) return await reply("*URL Error: Invalid TikTok URL*");

    const res = await fetch(`https://darksadasyt-tiktokdl.vercel.app/api/tiktok?q=${q}`);
    const data = await res.json();

    if (!data || !data.watermark) {
      return await reply("❌ Could not fetch video.");
    }

    // Send watermark video with autoplay (ptv: true)
    await conn.sendMessage(from, {
      video: { url: data.watermark, ptv: true },
      caption: "> *〽️ade By Dinuwh Bbh*"
    }, { quoted: mek });

  } catch (e) {
    console.log(e);
    return reply(`❌ Error\n\n${e.message}`);
  }
});
//=Watermark-doc=======


cmd({
  pattern: "tikwmdoc",
 // alias: ["tt", "ttdl", "tiktokdl"],
  react: '📹',
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
  // alias: ["tt", "ttdl", "tiktokdl"],
  react: '📹',
  desc: "Download TikTok video (WM) + Audio",
  category: "download",
  use: '.tiktok <tiktok url>',
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return await reply('*Error: Please provide a TikTok link*');
    if (!q.includes("tiktok")) return await reply("*URL Error: Invalid TikTok URL*");

    const res = await fetch(`https://darksadasyt-tiktokdl.vercel.app/api/tiktok?q=${q}`);
    const data = await res.json();

    if (!data || !data.watermark) {
      return await reply("❌ Could not fetch video.");
    }

    await conn.sendMessage(from, {
      video: { url: data.watermark, ptv: false },
      caption: "> *〽️ade By Dinuwh Bbh*",
    }, { quoted: mek });

  } catch (e) {
    console.log(e);
    return reply(`❌ Error\n\n${e.message}`);
  }
});


cmd({
  pattern: "tiknowmp",
  // alias: ["tt", "ttdl", "tiktokdl"],
  react: '📹',
  desc: "Download TikTok video (WM) + Audio",
  category: "download",
  use: '.tiktok <tiktok url>',
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return await reply('*Error: Please provide a TikTok link*');
    if (!q.includes("tiktok")) return await reply("*URL Error: Invalid TikTok URL*");

    const res = await fetch(`https://darksadasyt-tiktokdl.vercel.app/api/tiktok?q=${q}`);
    const data = await res.json();

    if (!data || !data.watermark) {
      return await reply("❌ Could not fetch video.");
    }

    await conn.sendMessage(from, {
      video: { url: data.watermark, ptv: true },
      caption: "> *〽️ade By Dinuwh Bbh*",
    }, { quoted: mek });

  } catch (e) {
    console.log(e);
    return reply(`❌ Error\n\n${e.message}`);
  }
});
//==tik-no wm Doc



cmd({
  pattern: "tiknowmdoc",
 // alias: ["tt", "ttdl", "tiktokdl"],
  react: '📹',
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


//====3==3=3=3.03=3.03=3.03=3.033-=3-



cmd({
  pattern: "ttpaka",
  alias: ["ttinfo", "ttdetails", "tt"],
  react: '🔎',
  desc: "Get TikTok video details only.",
  category: "tools",
  use: ".tiok <TikTok video URL>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const tiktokUrl = args[0];
    if (!tiktokUrl || !tiktokUrl.includes("tiktok.com")) {
      return reply('```🥲 කරුණාකර වලංගු TikTok ලින්ක් එකක් දෙන්න.\nඋදාහරණයක්: .tiok https://www.tiktok.com/@user/video/123...```');
    }

    await conn.sendMessage(from, { react: { text: '🔍', key: m.key } });

    const apiUrl = `https://api.nexoracle.com/downloader/tiktok-nowm?apikey=free_key@maher_apis&url=${encodeURIComponent(tiktokUrl)}`;
    const response = await axios.get(apiUrl);

    const { title, thumbnail, author, metrics } = response.data.result;

    const detailsMsg = `乂 ᗪIᑎᑌᗯᕼ TIKTOK ᗪOᗯᑎ ⟩⟩⟩
\`╭───────────────✿\`

- \`D\` ᴏᴡɴʟᴏᴀᴅꜱ : _${metrics.download_count}_
- \`C\` ᴏᴍᴍᴇɴᴛꜱ  : _*${metrics.comment_count}*_
- \`S\` ʜᴀʀᴇꜱ    : _${metrics.share_count}_
- \`P\` ʟᴀʏꜱ     : _${metrics.play_count}_
- \`L\` ɪᴋᴇꜱ     : _*${metrics.digg_count}*_
- \`L\` ɪɴᴋ      : _${tiktokUrl}_
✠.Aᴜᴛʜᴏʀ :
- Nɪᴄᴋ Nᴀᴍᴇ :- *${author.nickname}*
- Uꜱᴇʀɴᴀᴍᴇ   :- *@${author.username}*

\`╰───────────────✿\``;

    // ✳️ If nonbutton mode
if (config.MODE === 'nonbutton') {
  const sections = [
  {
    title: "📹 𝐕𝐢𝐝𝐞𝐨 𝐖𝐢𝐭𝐡 𝐖𝐚𝐭𝐞𝐫𝐦𝐚𝐫𝐤",
    rows: [
      {
        title: "1.",
        rowId: `${prefix}tikwm ${tiktokUrl}`,
        description: 'With Watermark Normal 📹'
      },
      {
        title: "2",
        rowId: `${prefix}tikwmp ${tiktokUrl}`,
        description: 'With Watermark video Note 📹'
      },
      {
        title: "3",
        rowId: `${prefix}tikwmdoc ${tiktokUrl}`,
        description: 'With Watermark Document 📄'
      }
    ] 
  },
  {
    title: "🎞️ 𝐕𝐢𝐝𝐞𝐨 𝐍𝐨 𝐖𝐚𝐭𝐞𝐫𝐦𝐚𝐫𝐤",
    rows: [
      {
        title: "4",
        rowId: `${prefix}tiknowm ${tiktokUrl}`,
        description: 'No Watermark Normal 📹'
      },
     {
        title: "5",
        rowId: `${prefix}tiknowmp ${tiktokUrl}`,
        description: 'No Watermark Video Note 📹'
      }, 
      {
        title: "6",
        rowId: `${prefix}tiknowmdoc ${tiktokUrl}`,
        description: 'No Watermark Document 📄'
      }
    ]
  },
  {
    title: "🎧 𝐀𝐮𝐝𝐢𝐨 𝐎𝐩𝐭𝐢𝐨𝐧𝐬",
    rows: [
      {
        title: "7",
        rowId: `${prefix}tikaud ${tiktokUrl}`,
        description: 'Audio With Normal File 🎵'
      },
      {
        title: "8",
        rowId: `${prefix}tikauddoc ${tiktokUrl}`,
        description: 'Audio With Document File📄'
      },
      {
        title: "9",
        rowId: `${prefix}tikaudptt ${tiktokUrl}`,
        description: 'Audio With Voice Note 🎤'
      }
    ]
  }
];
const listMessage = {
caption: detailsMsg,
image: { url:thumbnail },  // <-- use YouTube thumbnail here
footer: '> *〽️ade By Dinuwh Bbh*',
title: '',
buttonText: '> *◎Reply Below Number ⇲◎*',
sections
}
	
return await conn.replyList(from, listMessage ,{ quoted : mek })

	//button
} if (config.MODE === 'button') {
      const listData = {
  title: "𝐕𝐢𝐝𝐞𝐨 𝐒𝐞𝐥𝐞𝐜𝐭𝐢𝐨𝐧 ツ",
  sections: [
    {
      title: "⥥ Non-Watermark ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ⇲",
      rows: [
        {
          title: "NonWaterMark Normal Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}tiknowm ${tiktokUrl}`
        },
        {
          title: "NonWaterMark Document Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}tiknowmdoc ${tiktokUrl}`
        }
      ]
    },
    {
      title: "⥥ With-Watermark ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ⇲",
      rows: [
        {
          title: "WithWaterMark Normal Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}tikwm ${tiktokUrl}`
        },
        {
          title: "WithWaterMark Document Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}tikwmdoc ${tiktokUrl}`
        }
      ]
    }
  ]
};
const listData2 = {
        title: "𝐀𝐮𝐝𝐢𝐨 𝐒𝐞𝐥𝐞𝐜𝐭𝐢𝐨𝐧 ツ",
        sections: [{
          title: "TikTok Audio Down Section 🎧",
          rows: [
            
            {
              title: "\`Audio With Normal\`",
              description: "〽️ade By Dinuwh Bbh",
              id: `${prefix}tikaud ${tiktokUrl}`
            },
            {
              title: "\`Audio With Document\`",
              description: "〽️ade By Dinuwh Bbh",
              id: `${prefix}tikauddoc ${tiktokUrl}`
            },
            {
              title: "\`Audio With Voice Note\`",
              description: "〽️ade By Dinuwh Bbh",
              id: `${prefix}tikaudptt ${tiktokUrl}`
            }
          ]
        }]
      };

      return await conn.sendMessage(from, {
        image: { url: thumbnail },
        caption: detailsMsg,
        footer: "> *〽️ade By Dinuwh Bbh*",
        buttons: [
          {
            buttonId: "action",
            buttonText: { displayText: "🔘" },
            type: 4,
            nativeFlowInfo: {
              name: "single_select",
              paramsJson: JSON.stringify(listData),
            },
          },
          {
            buttonId: "action",
            buttonText: { displayText: "🔘" },
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

  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e.message}`);
  }
});


