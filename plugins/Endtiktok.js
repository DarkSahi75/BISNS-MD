const axios = require("axios");
const { cmd } = require("../lib/command");
const config = require('../settings');
const prefix = config.PREFIX || ".";

cmd({
  pattern: "ttend",
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
        title: "◎ 𝙲𝙷𝙾𝙾𝚂 𝙵𝙾𝚁𝙼𝙰𝚃𝙴 ◎",
        sections: [{
          title: "DINUWH MD OPTIONS",
          rows: [
            { title: "[Audio 🎧]", description: "Download as audio\n〽️ade By Dinuwh Bbh", id: `${prefix}ytaud ${q}` },
            { title: "[Document 📁]", description: "Download as document\n〽️ade By Dinuwh Bbh", id: `${prefix}ytdoc ${q}` },
            { title: "[Voice (ptt) 💡]", description: "Download as Voice Note\n〽️ade By Dinuwh Bbh", id: `${prefix}ytvoice ${q}` },
            { title: "[Video File 📽️]", description: "Download as Video\n〽️ade By Dinuwh Bbh", id: `${prefix}devilv ${q}` },
          ]
        }]
      };

      return await conn.sendMessage(from, {
        image: { url: thumbnail },
        caption: detailsMsg,
        footer: "> 〽️ade By Dinuwh Bbh",
        buttons: [
          { buttonId: `${prefix}ytvoice ${q}`, buttonText: { displayText: "`[Voice Note(Ptt) 🎧]`" }, type: 1 },
          { buttonId: `${prefix}ytaud ${q}`, buttonText: { displayText: "`[Audio Type 🎧]`" }, type: 1 },
          { buttonId: `${prefix}ytdoc ${q}`, buttonText: { displayText: "`[Document 📁]`" }, type: 1 },
          { buttonId: `${prefix}devilv ${q}`, buttonText: { displayText: "`[Video 📽️]`" }, type: 1 },
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
    reply(`❌ Error: ${e.message || 'TikTok video data grab එකේ Error එකක්! Retry කරන්න.'}`);
  }
});
