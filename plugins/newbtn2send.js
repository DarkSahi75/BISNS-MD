const fetch = require("node-fetch");
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions')
const { cmd, commands } = require("../lib/command");
const yts = require("yt-search");
const config = require("../settings");
// Get prefix dynamically from settings or fallback
const prefix = config.PREFIX || ".";
const cheerio = require('cheerio'); // For HTML scraping from AN1
const { JSDOM } = require('jsdom'); // For DOM parsing from HTML
const axios = require("axios");

/*const fetch = require("node-fetch");
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions');
const { cmd, commands } = require("../lib/command");
const yts = require("yt-search");
const config = require("../settings");

const prefix = config.PREFIX || ".";*/

cmd({
  pattern: "2gg",
  alias: "song",
  react: "🎵",
  desc: "Download Song",
  category: "download",
  filename: __filename,
}, async (robin, mek, m, { from, q, prefix, reply }) => {
  try {
    if (!q) return reply("`Give Me SONG NAME OR LINK || නමක් දියන්😓❤️`");

    const search = await yts(q);
    if (!search.videos.length) return reply("`❌ Video not found!`");
    const data = search.videos[0];

    const cap = `\`乂 Ｄ𝚒ｎｕｗｈ Чт Ｄｏｗｎ⟩⟩⟩\`
╭────────✦✧✦────────╯

* \`✦ 𝚃𝚒𝚝𝚕𝚎\`     :  _*${data.title}*_
\`╭───────────────✿\` 

* \`✦ 𝙳𝚞𝚛𝚊𝚝𝚒𝚘𝚗\`  : _*${data.timestamp} (${data.seconds} sec)*_  
* \`✦ 𝚄𝚙𝚕𝚘𝚊𝚍𝚎𝚍\`  : _${data.ago}_  
* \`✦ Channel\`   : *_${data.author.name}_*
* \`✦ 𝚅𝚒𝚎𝚠𝚜\`     : _${data.views}_
* \`✦ 𝚄𝚁𝙻\`       : *_${data.url}_*

\`╰───────────────✿\`
╭───────────────✿  
│ 🎶 *ƒσℓℓσω υѕ мυѕι¢ ¢нαηηєℓ* 🧚‍♂️  
╰───────────────✿  
🔗 https://whatsapp.com/channel/0029Vb3mqn5H5JLuJO3s3Z1J

> *Send You Want Song Formate ⤵️*`;

    if (config.MODE === 'nonbutton') {
      const sections = [
        {
          title: "",
          rows: [
            { title: "1", rowId: `${prefix}ytaud ${data.url}`, description: '`❲ Audio File ❳` 🎧' },
            { title: "2", rowId: `${prefix}ytdoc ${data.url}`, description: '`❲ Document File ❳` 📄' },
            { title: "3", rowId: `${prefix}ytvoice ${data.url}`, description: '`❲ Voice Note (ptt) ❳` 🎤' },
            { title: "4", rowId: `${prefix}devilv ${data.url}`, description: '`❲ Video File (mp4) ❳` 📽️' },
          ]
        }
      ];
      const listMessage = {
        caption: cap,
        image: { url: data.thumbnail },
        footer: '> 〽️ade By Dinuwh Bbh',
        title: '',
        buttonText: '> *◎Power Full Whatsapp bot Make By Dinuwh◎*',
        sections
      };
      return await robin.replyList(from, listMessage, { quoted: mek });
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
          id: `${prefix}ytaud ${data.url}`
        },
        {
          title: "[Document 📁]",
          description: "Download as document\n〽️ade By Dinuwh Bbh",
          id: `${prefix}ytdoc ${data.url}`
        },
        {
          title: "[Voice (ptt) 💡]",
          description: "Download as Voice Note\n〽️ade By Dinuwh Bbh",
          id: `${prefix}ytvoice ${data.url}`
        },
        {
          title: "[Video File 📽️]",
          description: "Download as Video\n〽️ade By Dinuwh Bbh",
          id: `${prefix}devilv ${data.url}`
        }
      ]
    }]
  };

  return await robin.sendMessage(from, {
    image: { url: data.thumbnail },
    caption: cap,
    footer: "> 〽️ade By Dinuwh Bbh",
    buttons: [
      {
        buttonId: `${prefix}ytaud ${data.url}`,
        buttonText: { displayText: "🎧 Audio" },
        type: 1
      },
      {
        buttonId: `${prefix}ytdoc ${data.url}`,
        buttonText: { displayText: "📄 Document" },
        type: 1
      },
      {
        buttonId: "list_format_button",
        buttonText: { displayText: "🔘 More Formats" },
        type: 4,
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify(listData)
        }
      }
    ],
    headerType: 4,
    viewOnce: true,
  }, { quoted: mek });
}

  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e.message}`);
  }
});
