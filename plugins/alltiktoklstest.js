const axios = require("axios");
const { cmd } = require("../lib/command");
const config = require('../settings');
const prefix = config.PREFIX || ".";

cmd({
  pattern: "tiktest",
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
    const { title, thumbnail, metrics, author } = res.data.result;

    const cap = `
\`乂 Ｄ𝚒ｎｕｗｈ Чт Ｄｏｗｎ⟩⟩⟩\`
╭────────✦✧✦────────╯

\`╭───────────────✿\` 

* \`✠.𝙳𝚘𝚠𝚗𝙻𝚘𝚊𝚍𝚜 :\` _${metrics.download_count}_
* \`✠.𝙲𝚘𝚖𝚖𝚎𝚗𝚝𝚜 :\` _${metrics.comment_count}_
* \`✠.𝙻𝚒𝚔𝚎𝚜    :\` _${metrics.digg_count}_
* \`✠.𝚂𝚑𝚊𝚛𝚎   :\` _${metrics.share_count}_
* \`✠.𝙻𝚒𝚗𝚔   :\` _${url}_

* \`✠.𝙰𝚞𝚝𝚑𝚘𝚛 :\` 
> *𝙽𝚒𝚌𝚔 𝙽𝚊𝚖𝚎* :- _${author.nickname}_
> *𝚄𝚜𝚎𝚛𝙽𝚊𝚖𝚎*  :- _${author.username}_
\`╰───────────────✿\`

> 〽️ade By Dinuwh Bbh
`;

    if (config.MODE === 'nonbutton') {
      const sections = [
        {
          title: "",
          rows: [
            { title: "1", rowId: `${prefix}ytaud ${url}`, description: '`❲ Audio File ❳` 🎧' },
            { title: "2", rowId: `${prefix}ytdoc ${url}`, description: '`❲ Document File ❳` 📄' },
            { title: "3", rowId: `${prefix}ytvoice ${url}`, description: '`❲ Voice Note (ptt) ❳` 🎤' },
            { title: "4", rowId: `${prefix}devilv ${url}`, description: '`❲ Video File (mp4) ❳` 📽️' },
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
  const listMessage = {
    title: "◎ 𝙲𝙷𝙾𝙾𝚂 𝙵𝙾𝚁𝙼𝙰𝚃𝙴 ◎",
    sections: [{
      title: "DINUWH MD OPTIONS",
      rows: [
        {
          title: "[Audio 🎧]",
          description: "Download as audio\n〽️ade By Dinuwh Bbh",
          rowId: `${prefix}ytaud ${url}`
        },
        {
          title: "[Document 📁]",
          description: "Download as document\n〽️ade By Dinuwh Bbh",
          rowId: `${prefix}ytdoc ${url}`
        },
        {
          title: "[Voice (ptt) 💡]",
          description: "Download as Voice Note\n〽️ade By Dinuwh Bbh",
          rowId: `${prefix}ytvoice ${url}`
        },
        {
          title: "[Video File 📽️]",
          description: "Download as Video\n〽️ade By Dinuwh Bbh",
          rowId: `${prefix}devilv ${url}`
        }
      ]
    }]
  };

  // Image + Buttons
  await conn.sendMessage(from, {
    image: { url: thumbnail },
    caption: cap,
    footer: "> 〽️ade By Dinuwh Bbh",
    templateButtons: [
      {
        index: 1,
        urlButton: {
          displayText: "📺 Watch on YouTube",
          url: url
        }
      },
      {
        index: 2,
        callButton: {
          displayText: "📞 Contact Owner",
          phoneNumber: "94761344523" // Change to your number
        }
      },
      {
        index: 3,
        quickReplyButton: {
          displayText: "🔘 Choose Song Type",
          id: ".listmenu"
        }
      }
    ]
  }, { quoted: mek });

  // Handle fake .listmenu button trigger
  if (body === '.listmenu') {
    return await conn.sendMessage(from, {
      text: listMessage.title,
      footer: "〽️ade By Dinuwh Bbh",
      buttonText: "🔘 Select Download Format",
      sections: listMessage.sections
    }, { quoted: mek });
  }
}
