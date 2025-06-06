const axios = require("axios");
const { cmd } = require("../lib/command");
const config = require('../settings');
const prefix = config.PREFIX || ".";

cmd({
  pattern: "tiklist",
  alias: ["tlist", "ttlist"],
  react: '🎵',
  desc: "TikTok Song Downloader with List Only",
  category: "tiktok",
  use: ".tiklist <TikTok URL>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const url = args[0];
    if (!url || !url.includes("tiktok.com")) return reply("🥲 කරුණාකර වලංගු TikTok ලින්ක් එකක් දෙන්න.");

    await conn.sendMessage(from, { react: { text: "🧠", key: m.key } });

    const api = `https://api.nexoracle.com/downloader/tiktok-nowm?apikey=free_key@maher_apis&url=${encodeURIComponent(url)}`;
    const res = await axios.get(api);
    const { title, thumbnail, music, play_count, download_count, comment_count, share_count, digg_count, region, video_url, nickname, unique_id } = res.data.result;
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

    if (config.MODE === 'nonbutton') {
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

    if (config.MODE === 'button') {
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
