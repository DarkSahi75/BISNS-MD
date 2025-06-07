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

    const cap = `\`乂 Ｄ𝚒𝚗𝚞𝚠𝚑 Чт Ｄｏｗｎ⟩⟩⟩\`
╭────────✦✧✦────────╯
* \`✦ 𝚃𝚒𝚝𝚕𝚎\`     : _*${data.title}*_
* \`✦ 𝙳𝚞𝚛𝚊𝚝𝚒𝚘𝚗\`  : _*${data.timestamp}*_
* \`✦ 𝚄𝚙𝚕𝚘𝚊𝚍𝚎𝚍\`  : _${data.ago}_
* \`✦ Channel\`   : *_${data.author.name}_*
* \`✦ 𝚅𝚒𝚎𝚠𝚜\`     : _${data.views}_
* \`✦ 𝚄𝚁𝙻\`       : *_${data.url}_*
╰───────────────✿`;

    const listData = {
      title: "◎ 𝙲𝙷𝙾𝙾𝚂 𝙵𝙾𝚁𝙼𝙰𝚃𝙴 ◎",
      sections: [
        {
          title: "🎧 Audio/Video Options",
          rows: [
            {
              title: "[🎵 Audio]",
              description: "MP3 Song File",
              id: `${prefix}ytaud ${data.url}`
            },
            {
              title: "[📄 Document]",
              description: "Song as Doc File",
              id: `${prefix}ytdoc ${data.url}`
            },
            {
              title: "[🎤 Voice Note]",
              description: "Voice Format (ptt)",
              id: `${prefix}ytvoice ${data.url}`
            },
            {
              title: "[📽️ Video]",
              description: "MP4 Video File",
              id: `${prefix}devilv ${data.url}`
            }
          ]
        }
      ]
    };

    await robin.sendMessage(from, {
      image: { url: data.thumbnail },
      caption: cap,
      footer: "> Powered by DINUWH MD",
      buttons: [
        {
          buttonId: "song_options_list",
          buttonText: { displayText: "🔘 ඇතුලත් වීමේ විකල්ප" },
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

  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e.message}`);
  }
});
