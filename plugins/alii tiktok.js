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


//=3=3.03=3.033=3.033=3.0333=3.03333=3.033333=3.0333333=3.03333333=3.03333333

//const axios = require("axios");
//const { cmd } = require("../command");

cmd({
  pattern: "tauddoc",
  alias: ["ttdl", "tiktokdl", "tt"],
  react: '🎧',
  desc: "Download TikTok audio.",
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

    if (!response.data || response.data.status !== 200 || !response.data.result || !response.data.result.audio) {
      return reply('❌ Audio link එක ගන්න බැරිවුණා. කරුණාකර link එක පරීක්ෂා කරන්න.');
    }

    const { audio } = response.data.result;

    const audioRes = await axios.get(audio, { responseType: 'arraybuffer' });
    if (!audioRes.data) {
      return reply('❌ Audio බාගත කරන්න බැරිවුණා.');
    }

    const audioBuffer = Buffer.from(audioRes.data, 'binary');

    await conn.sendMessage(from, {
      document: audioBuffer,
      mimetype: 'audio/mpeg',
      fileName: 'tiktok_audio.mp3',
      caption: '*〽️ade By Diniwh Bbh 😩💗*'
    }, { quoted: mek });

    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

  } catch (err) {
    console.error('TikTok audio error:', err);
    reply('❌ Audio බාගත කිරීමේදී දෝෂයක් සිදු වුණා.');
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
  }
});

//=4=4.04=4.044=4.0444=4.04444=4.0444=4.044444=4.044444=4.0444444=4.0444444=4.0444444



cmd({
  pattern: "taud",
  alias: ["ttdl", "tiktokdl", "tt"],
  react: '🎧',
  desc: "Download TikTok audio (not document).",
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

    if (!response.data || response.data.status !== 200 || !response.data.result || !response.data.result.audio) {
      return reply('❌ TikTok audio link එක ගන්න බැරිවුණා.');
    }

    const { audio } = response.data.result;

    const audioRes = await axios.get(audio, { responseType: 'arraybuffer' });
    if (!audioRes.data) {
      return reply('❌ Audio බාගත කිරීමේදී ගැටලුවක් තිබුණා.');
    }

    const audioBuffer = Buffer.from(audioRes.data, 'binary');

    await conn.sendMessage(from, {
      audio: audioBuffer,
      mimetype: 'audio/mpeg',
      ptt: false, // true = voice message (PTT), false = normal audio
      caption: '*〽️ade By Diniwh Bbh 😩💗*'
    }, { quoted: mek });

    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

  } catch (err) {
    console.error('TikTok audio error:', err);
    reply('❌ Audio බාගත කිරීමේදී දෝෂයක් සිදු වුණා.');
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
  }
});

//3?3?3?3?3?3?3?3?3??333=333.03=333.033=333.033

cmd({
  pattern: "taudptt",
  alias: ["ttdl", "tiktokdl", "tt"],
  react: '🎧',
  desc: "Download TikTok audio as PTT (voice).",
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

    if (!response.data || response.data.status !== 200 || !response.data.result || !response.data.result.audio) {
      return reply('❌ TikTok audio link එක ගන්න බැරිවුණා.');
    }

    const { audio } = response.data.result;

    const audioRes = await axios.get(audio, { responseType: 'arraybuffer' });
    if (!audioRes.data) {
      return reply('❌ Audio බාගත කිරීමේදී ගැටලුවක් තිබුණා.');
    }

    const audioBuffer = Buffer.from(audioRes.data, 'binary');

    await conn.sendMessage(from, {
      audio: audioBuffer,
      mimetype: 'audio/mpeg',
      ptt: true, // PTT: true means voice message
      caption: '*〽️ade By Diniwh Bbh 😩💗*'
    }, { quoted: mek });

    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

  } catch (err) {
    console.error('TikTok PTT error:', err);
    reply('❌ Audio බාගත කිරීමේදී දෝෂයක් සිදු වුණා.');
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
  }
});

//=2=2.02=2.022=2.0222=2.02222=2.022222=2.0222222=2.0222222=2.0222222=2.0222222

const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "tptt",
  alias: ["ttdl", "tiktokdl", "tt"],
  react: '🎧',
  desc: "Download TikTok audio as voice message.",
  category: "download",
  use: ".tiktok <TikTok video URL>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const tiktokUrl = args[0];
    if (!tiktokUrl || !tiktokUrl.includes("tiktok.com")) {
      return reply('🔗 කරුණාකර වලංගු TikTok ලින්ක් එකක් දෙන්න. උදාහරණයක්: `.tiktok https://www.tiktok.com/...`');
    }

    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    // Call the TikTok audio API
    const apiUrl = `https://api.nexoracle.com/downloader/tiktok-nowm?apikey=free_key@maher_apis&url=${encodeURIComponent(tiktokUrl)}`;
    const res = await axios.get(apiUrl);

    if (!res.data || res.data.status !== 200 || !res.data.result.audio) {
      return reply('❌ TikTok audio link එක ගන්න බැරිවුණා.');
    }

    const audioUrl = res.data.result.audio;

    const audioRes = await axios.get(audioUrl, { responseType: 'arraybuffer' });
    const audioBuffer = Buffer.from(audioRes.data, 'binary');

    await conn.sendMessage(from, {
      audio: audioBuffer,
      mimetype: 'audio/mpeg',
      ptt: true,
      caption: '*〽️ade By Diniwh Bbh 😩💗*'
    }, { quoted: mek });

    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
  } catch (err) {
    console.error(err);
    await reply('⚠️ Error එකක් ඇතිවෙලා bro. ටික දවසකින් උත්සාහ කරන්න.');
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
  }
});
