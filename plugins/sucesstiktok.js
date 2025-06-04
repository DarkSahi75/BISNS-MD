const axios = require("axios");
const { cmd } = require("../lib/command");
const config = require('../settings');
const prefix = config.PREFIX || ".";

cmd({
  pattern: "tiktest",
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

   const detailsMsg = \`乂 Ｄ𝚒ｎｕｗｈ Чт Ｄｏｗｎ⟩⟩⟩\`
╭────────✦✧✦────────╯

\`╭───────────────✿\` 

* \`✠.𝙳𝚘𝚠𝚗𝙻𝚘𝚊𝚍𝚜 :\` _${metrics.download_count}_
* \`✠.𝙲𝚘𝚖𝚖𝚎𝚗𝚝𝚜 :\` _${metrics.comment_count}_
* \`✠.𝙻𝚒𝚔𝚎𝚜    :\` _${metrics.digg_count}_
* \`✠.𝚂𝚑𝚊𝚛𝚎   :\` _${metrics.share_count}_
* \`✠.𝙻𝚒𝚗𝚔   :\` _${tiktokUrl}_

* \`✠.𝙰𝚞𝚝𝚑𝚘𝚛 :\` 
> *𝙽𝚒𝚌𝚔 𝙽𝚊𝚖𝚎* :- _${author.nickname}_
> *𝚄𝚜𝚎𝚛𝙽𝚊𝚖𝚎*  :- _${author.username}_
\`╰───────────────✿\`

> 〽️ade By Dinuwh Bbh
`;
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
      image: { url: thumbnail },
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

  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e.message}`);
  }
});
