const axios = require("axios");
const cheerio = require('cheerio');
const { cmd, commands } = require('../lib/command')
const config = require('../settings');
const yts = require("yt-search");
const {fetchJson} = require('../lib/functions');

const api = `https://nethu-api-ashy.vercel.app`;

//01.Facebook Download
cmd({
  pattern: "facebook",
  react: "🎥",
  alias: ["fbbbb", "fbvideo", "fb"],
  desc: ddesc,
  category: "download",
  use: '.facebook <facebook_url>',
  filename: __filename
},
async(conn, mek, m, {
    from, prefix, q, reply
}) => {
  try {
  if (!q) return reply("Please provide a Facebook video URL.");

  const fb = await fetchJson(`${api}/download/fbdown?url=${encodeURIComponent(q)}`);

if (!fb.result || (!fb.result.sd && !fb.result.hd)) {
  return reply("Video not found or not downloadable. Please check the URL.");
}

let result = fb.result; // <== මෙතන result එක assign කරපන්

let caption = `*Facebook Downloader*

*▣ \`T\`itle* : ${result.title || 'N/A'}
*▣ \`D\`esc* : ${result.desc || 'N/A'}
*▣ \`U\`RL*   : ${q}`;
  const buttons = [
    {
      buttonId: `${prefix}downfb_sd ${q}`,
      buttonText: { displayText: "🪫 SD Video" },
      type: 1
    },
    {
      buttonId: `${prefix}downfb_hd ${q}`,
      buttonText: { displayText: "🔋 HD Video" },
      type: 1
    }
  ];

  if (fb.result.thumb) {
    await conn.buttonMessage2(from, {
      image: { url: fb.result.thumb },
      caption,
      footer: "> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏᴋᴜ-ᴍᴅ 🔒🪄",
      buttons,
      headerType: 4
    }, mek);
  }

} catch (err) {
  console.error(err);
  reply("*ERROR*");
  }
});

cmd({
  pattern: "downfb_sd",
  react: "⬇️",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m, {
    from, q, reply
}) => {
  try {
      
    const fb = await fetchJson(`${api}/download/fbdown?url=${encodeURIComponent(q)}`);
    
    if (!fb.result || (!fb.result.sd && !fb.result.hd)) {
      return reply("Video not found or not downloadable. Please check the URL.");
    }

    if (fb.result.sd) {
      await conn.sendMessage(from, {
        video: { url: fb.result.sd },
        mimetype: "video/mp4",
        caption: `*SD Quality*\n\n> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏᴋᴜ-ᴍᴅ 🔒🪄`
      }, { quoted: mek });
    }

  } catch (e) {
    console.error("Facebook Download Error:", e);
    reply(`Error: ${e.message || e}`);
  }
});

cmd({
  pattern: "downfb_hd",
  react: "⬇️",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m, {
    from, q, reply
}) => {
  try {
      
    const fb = await fetchJson(`${api}/download/fbdown?url=${encodeURIComponent(q)}`);
    
    if (!fb.result || (!fb.result.sd && !fb.result.hd)) {
      return reply("Video not found or not downloadable. Please check the URL.");
    }

    if (fb.result.hd) {
      await conn.sendMessage(from, {
        video: { url: fb.result.hd },
        mimetype: "video/mp4",
        caption: `*HD Quality*\n\n> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏᴋᴜ-ᴍᴅ 🔒🪄`
      }, { quoted: mek });
    }

  } catch (e) {
    console.error("Facebook Download Error:", e);
    reply(`Error: ${e.message || e}`);
  }
});

