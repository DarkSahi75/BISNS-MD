const axios = require("axios");
const { cmd } = require("../lib/command");

//const axios = require("axios");
const config = require('../settings');
//onst { cmd } = require('../lib/plugins');

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
caption: cap,
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
        caption: cap,
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

cmd({
  pattern: "tiktok",
  alias: ["ttdl", "tiktokdl","tt"],
  react: '⏰',
  desc: "Download TikTok videos.",
  category: "download",
  use: ".tiktok <TikTok video URL>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    // Check if the user provided a TikTok video URL
    const tiktokUrl = args[0];
    if (!tiktokUrl || !tiktokUrl.includes("tiktok.com")) {
      return reply('Please provide a valid TikTok video URL. Example: `.tiktok https://tiktok.com/...`');
    }

    // Add a reaction to indicate processing
    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    // Prepare the API URL
    const apiUrl = `https://api.nexoracle.com/downloader/tiktok-nowm?apikey=free_key@maher_apis&url=${encodeURIComponent(tiktokUrl)}`;

    // Call the API using GET
    const response = await axios.get(apiUrl);

    // Check if the API response is valid
    if (!response.data || response.data.status !== 200 || !response.data.result) {
      return reply('❌ Unable to fetch the video. Please check the URL and try again.');
    }

    // Extract the video details
    const { title, thumbnail, author, metrics, url } = response.data.result;

    // Inform the user that the video is being downloaded
   // await reply(`📥 *Downloading TikTok video by @${author.username}... Please wait.*`);

    // Download the video
    const videoResponse = await axios.get(url, { responseType: 'arraybuffer' });
    if (!videoResponse.data) {
      return reply('❌ Failed to download the video. Please try again later.');
    }

    // Prepare the video buffer
    const videoBuffer = Buffer.from(videoResponse.data, 'binary');

    // Send the video with details
    await conn.sendMessage(from, {
      video: videoBuffer,
      caption: `*🫟𝐀ɭīī 𝐌Ɗ 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐃*\n\n` +
        `🔖 *ᴛɪᴛʟᴇ*: ${title || "No title"}\n` +
        `👤 *ᴀᴜᴛʜᴏʀ*: ${author.nickname}\n` +
        `♥️ *ʟɪᴋᴇs*: ${metrics.digg_count}\n` +
        `💬 *ᴄᴏᴍᴍᴇɴᴛs*: ${metrics.comment_count}\n` +
        `♻️ *sʜᴀʀᴇs*: ${metrics.share_count}\n` +
        `📥 *ᴅᴏᴡɴʟᴏᴀᴅs*: ${metrics.download_count}\n\n` +
        `> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴀʟɪ*`,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363318387454868@newsletter',
          newsletterName: '『 𝐀ɭīī 𝐌Ɗ 𝐒ʊ̊𝐏𝐏๏፝֟ɼʈ 』',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

    // Add a reaction to indicate success
    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
  } catch (error) {
    console.error('Error downloading TikTok video:', error);
    reply('❌ Unable to download the video. Please try again later.');

    // Add a reaction to indicate failure
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
  }
});


//const axios = require("axios");
//onst { cmd } = require("../command");

cmd({
  pattern: "tiktokbtn",
  alias: ["tta", "ttaudio", "ttmp3"],
  react: "🎧",
  desc: "TikTok Audio Downloader with Button & Non-Button Modes",
  category: "download",
  use: ".tiktok <link> [button/nounbutton]",
  filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
  try {
    const url = args[0];
    const mode = (args[1] || "").toLowerCase();

    if (!url || !url.includes("tiktok.com")) {
      return reply("🔗 *වලංගු TikTok ලින්ක් එකක් දාන්න!*\nඋදා: `.tiktok https://tiktok.com/...`");
    }

    await conn.sendMessage(from, { react: { text: "⏳", key: m.key } });

    const api = `https://api.nexoracle.com/downloader/tiktok-mp3?apikey=free_key@maher_apis&url=${encodeURIComponent(url)}`;
    const res = await axios.get(api);
    if (!res.data || res.data.status !== 200 || !res.data.result?.url) {
      return reply("❌ *ඕඩියෝ එක ලබාගන්න බැරිවුණා. වෙන ලින්ක් එකක් ට්‍රයි කරන්න.*");
    }

    const audioUrl = res.data.result.url;

    if (mode === "nounbutton") {
      // Non-button mode (reply directly)
      const audio = await axios.get(audioUrl, { responseType: "arraybuffer" });
      const audioBuffer = Buffer.from(audio.data, "binary");

      await conn.sendMessage(from, {
        audio: audioBuffer,
        mimetype: "audio/mp4",
        ptt: false
      }, { quoted: mek });

      return await conn.sendMessage(from, { react: { text: "✅", key: m.key } });
    }

    // Button List Mode
    const sections = [{
      title: "🌀 Choose Format",
      rows: [
        {
          title: "1.1 🎧 Audio",
          rowId: `.ttaudio ${url} nounbutton`
        },
        {
          title: "1.2 🎵 Document",
          rowId: `.ttaudio ${url} doc`
        }
      ]
    }];

    const listMessage = {
      text: "🔊 *ඔයාට ඕනෙ Format එක තෝරන්න*",
      footer: "Powered by DINUWH MD",
      title: "🎧 TikTok Audio Downloader",
      buttonText: "🧲 Select Format",
      sections
    };

    await conn.sendMessage(from, listMessage, { quoted: mek });

  } catch (e) {
    console.error("TT Audio Error:", e);
    reply("❌ *Error එකක් ආවා. ටිකට පස්සෙ ට්‍රයි කරන්න.*");
    await conn.sendMessage(from, { react: { text: "❌", key: m.key } });
  }
});
