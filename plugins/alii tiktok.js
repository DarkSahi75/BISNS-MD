const axios = require("axios");
const { cmd } = require("../lib/command");
const config = require('../settings');
const prefix = config.PREFIX || ".";

cmd({
  pattern: "tiok",
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

    const detailsMsg = `📌 *TikTok Video Info*\n\n` +
      `🔖 *Title*: ${title || "N/A"}\n` +
      `👤 *Author*: ${author.nickname} (@${author.username})\n` +
      `❤️ *Likes*: ${metrics.digg_count}\n` +
      `💬 *Comments*: ${metrics.comment_count}\n` +
      `🔁 *Shares*: ${metrics.share_count}\n` +
      `📥 *Downloads*: ${metrics.download_count}\n\n` +
      `🔗 *Link*: ${tiktokUrl}\n\n` +
      `> *Powered by DINUWH MD™*`;

    // ✳️ If nonbutton mode
if (config.MODE === 'nonbutton') {
  const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: `${prefix}ytaud ${tiktokUrl}`, description: '\`❲ Audio File ❳\` 🎧'},
	    {title: "2", rowId: `${prefix}ytdoc ${tiktokUrl}`, description: '\`❲ Document File ❳\` 📄'} ,
            {title: "3", rowId: `${prefix}ytvoice ${tiktokUrl}`, description: '\`❲ Voice Note (ptt) ❳\` 🎤'} ,
            {title: "4", rowId: `${prefix}devilv ${tiktokUrl}`, description: '\`❲ Video File (mp4) ❳\` 📽️'} ,
	]
    } 
]
const listMessage = {
caption: detailsMsg,
image: { url:thumbnail },  // <-- use YouTube thumbnail here
footer: '> 〽️ade By Dinuwh Bbh',
title: '',
buttonText: '> *◎Power Full Whatsapp bot Make By Dinuwh◎*',
sections
}
	
return await conn.replyList(from, listMessage ,{ quoted : mek })

	//button
} if (config.MODE === 'button') {
      const listData = {
        title: "◎ 𝙲𝙷𝙾𝙾𝚂 𝙵𝙾𝚁𝙼𝙰𝚃𝙴 ◎",
        sections: [{
          title: "DINUWH MD OPTIONS",
          rows: [
            {
              title: "[Audio 🎧]",
              description: "Download as audio\n〽️ade By Dinuwh Bbh",
              id: `${prefix}ytaud ${tiktokUrl}`
            },
            {
              title: "[Document 📁]",
              description: "Download as document\n〽️ade By Dinuwh Bbh",
              id: `${prefix}ytdoc ${tiktokUrl}`
            },
            {
              title: "[Voice (ptt) 💡]",
              description: "Download as Voice Note\n〽️ade By Dinuwh Bbh",
              id: `${prefix}ytvoice ${tiktokUrl}`
            },
            {
              title: "[Video File 📽️]",
              description: "Download as Video\n〽️ade By Dinuwh Bbh",
              id: `${prefix}devilv ${tiktokUrl}`
            }
          ]
        }]
      };

      return await conn.sendMessage(from, {
        image: { url:thumbnail },
        caption: detailsMsg,
        footer: "> 〽️ade By Dinuwh Bbh",
        buttons: [
          {
            buttonId: `${prefix}ytvoice ${tiktokUrl}`,
            buttonText: { displayText: "`[Voice Note(Ptt) 🎧]`" },
            type: 1
          },
          {
            buttonId: `${prefix}ytaud ${tiktokUrl}`,
            buttonText: { displayText: "`[Audio Type 🎧]`" },
            type: 1
          },
          {
            buttonId: `${prefix}ytdoc ${tiktokUrl}`,
            buttonText: { displayText: "`[Document 📁]`" },
            type: 1
          },
          {
            buttonId: `${prefix}devilv ${tiktokUrl}`,
            buttonText: { displayText: "`[Video 📽️]`" },
            type: 1
          },

          {
            buttonId: "action",
            buttonText: { displayText: "🔘 Choose Song Type" },
            type: 4,
            nativeFlowInfo: {
              name: "single_select",
              paramsJson: JSON.stringify(listData),
            },
          },
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

/*cmd({
  pattern: "alive",
  react: '😁',
  desc: "Show bot status with website button",
  category: "general",
  use: '.alive'
}, async (m, text, { conn, prefix }) => {

  const botName = "DINUWH MD"
  const ownerName = "𝙳𝙸 𝙽 𝚄 𝚆 𝙷 - 𝙼 𝙳"
  const webURL = "https://dinuwhofficial.vercel.app"  // <-- ඔයාගේ web එක මෙතනට දාන්න

  await conn.sendMessage(m.chat, {
    text: `╭━━〔 *💠 ${botName} 💠* 〕━━━⬣  
┃  
┃  ✅ Bot ක්‍රියාත්මකයි  
┃  👑 Owner: ${ownerName}  
┃  📅 Date: ${new Date().toLocaleDateString('si-LK')}  
┃  ⏰ Time: ${new Date().toLocaleTimeString('si-LK')}  
┃  
┃  🔗 Visit our official site 👇  
┃  
╰━━━━━━━━━━━━━━━━⬣`,
    footer: "Powered by DINUWH MD",
    templateButtons: [
      {
        index: 1,
        urlButton: {
          displayText: "🌐 Visit Website",
          url: webURL
        }
      },
      {
        index: 2,
        quickReplyButton: {
          displayText: "📜 Menu",
          id: `${prefix}menu`
        }
      }
    ]
  }, { quoted: m })

});*/
//const axios = require("axios");const { cmd } = require("../command");

cmd({
  pattern: "tvideo",
  alias: ["ttdl", "tiktokdl", "tt"],
  react: '⏰',
  desc: "Download TikTok videos.",
  category: "download",
  use: ".tiktok <TikTok video URL>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const tiktokUrl = args[0];
    if (!tiktokUrl || !tiktokUrl.includes("tiktok.com")) {
      return reply('🔗 කරුණාකර වලංගු TikTok link එකක් දෙන්න. උදා: `.tiktok https://tiktok.com/...`');
    }

    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    const apiUrl = `https://api.nexoracle.com/downloader/tiktok-nowm?apikey=free_key@maher_apis&url=${encodeURIComponent(tiktokUrl)}`;
    const response = await axios.get(apiUrl);

    if (!response.data || response.data.status !== 200 || !response.data.result) {
      return reply('❌ වීඩියෝව ලබා ගන්න බැරිවුණා. කරුණාකර link එක පරීක්ෂා කරන්න.');
    }

    const { url } = response.data.result;
    const videoResponse = await axios.get(url, { responseType: 'arraybuffer' });

    if (!videoResponse.data) {
      return reply('❌ වීඩියෝව බාගත කිරීමේදී දෝෂයකි.');
    }

    const videoBuffer = Buffer.from(videoResponse.data, 'binary');

    await conn.sendMessage(from, {
      video: videoBuffer,
      caption: '*〽️ade By Diniwh Bbh 😩💗*'
    }, { quoted: mek });

    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

  } catch (error) {
    console.error('TikTok download error:', error);
    reply('❌ වීඩියෝව බාගත කරන්න බැරිවුණා. ආයෙත් උත්සාහ කරන්න.');
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
  }
});


//=3==3=3.03=3.033=3.0333=3.03333=3.033333=3.033333=3.0333333=3.03333333=3.033333333=3.0333333333=3.0333333333

//const axios = require("axios");const { cmd } = require("../command");

cmd({
  pattern: "tdoc",
  alias: ["ttdl", "tiktokdl", "tt"],
  react: '⏰',
  desc: "Download TikTok videos.",
  category: "download",
  use: ".tiktok <TikTok video URL>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const tiktokUrl = args[0];
    if (!tiktokUrl || !tiktokUrl.includes("tiktok.com")) {
      return reply('🔗 කරුණාකර වලංගු TikTok link එකක් දෙන්න. උදා: `.tiktok https://tiktok.com/...`');
    }

    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    const apiUrl = `https://api.nexoracle.com/downloader/tiktok-nowm?apikey=free_key@maher_apis&url=${encodeURIComponent(tiktokUrl)}`;
    const response = await axios.get(apiUrl);

    if (!response.data || response.data.status !== 200 || !response.data.result) {
      return reply('❌ වීඩියෝව ලබා ගන්න බැරිවුණා. කරුණාකර link එක පරීක්ෂා කරන්න.');
    }

    const { url } = response.data.result;
    const videoResponse = await axios.get(url, { responseType: 'arraybuffer' });

    if (!videoResponse.data) {
      return reply('❌ වීඩියෝව බාගත කිරීමේදී දෝෂයකි.');
    }

    const videoBuffer = Buffer.from(videoResponse.data, 'binary');

    await conn.sendMessage(from, {
      document: videoBuffer,
      mimetype: 'video/mp4',
      fileName: 'tiktok_video.mp4',
      caption: '*〽️ade By Diniwh Bbh 😩💗*'
    }, { quoted: mek });

    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

  } catch (error) {
    console.error('TikTok download error:', error);
    reply('❌ වීඩියෝව බාගත කරන්න බැරිවුණා. ආයෙත් උත්සාහ කරන්න.');
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
  }
});
//5=5.05=5.054=5.054=4=4.04=4.044=4.0444=4.0444
   //    const { cmd } = require('../command');
//const axios = require('axios');

cmd({
    pattern: "tiktokvi",
    alias: ["ttdl", "tt", "tiktokdl"],
    desc: "Download TikTok video without watermark",
    category: "downloader",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        if (!q) return reply("Please provide a TikTok video link.");
        if (!q.includes("tiktok.com")) return reply("Invalid TikTok link.");
        
        reply("Downloading video, please wait...");
        
        const apiUrl = `https://delirius-apiofc.vercel.app/download/tiktok?url=${q}`;
        const { data } = await axios.get(apiUrl);
        
        if (!data.status || !data.data) return reply("Failed to fetch TikTok video.");
        
        const { title, like, comment, share, author, meta } = data.data;
        const videoUrl = meta.media.find(v => v.type === "video").org;
        
        const caption = `🎵 *TikTok Video* 🎵\n\n` +
                        `👤 *User:* ${author.nickname} (@${author.username})\n` +
                        `📖 *Title:* ${title}\n` +
                        `👍 *Likes:* ${like}\n💬 *Comments:* ${comment}\n🔁 *Shares:* ${share}`;
        
        await conn.sendMessage(from, {
            video: { url: videoUrl },
            caption: caption,
            contextInfo: { mentionedJid: [m.sender] }
        }, { quoted: mek });
        
    } catch (e) {
        console.error("Error in TikTok downloader command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});                                  
            
