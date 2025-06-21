const axios = require("axios");
const { cmd } = require("../lib/command");
const config = require('../settings');
const prefix = config.PREFIX || ".";

//const { cmd } = require("../lib/command");

cmd({
  pattern: "btn",
  desc: "Get TikTok video details only.",
  category: "tools",
  use: ".tiok <TikTok video URL>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {

const buttons = [
  { buttonId: 'id1', buttonText: { displayText: 'Button 1' }, type: 1 },
  { buttonId: 'id2', buttonText: { displayText: 'Button 2' }, type: 1 }
]

const buttonMessage = {
    image: { url: "https://manul-official-new-api-site.vercel.app/manu-md" }, // image: buffer or path
    caption: "Hi it's button message with image",
    footer: 'Hello World',
    buttons,
    headerType: 1,
    viewOnce: true
}

await conn.sendMessage(from, buttonMessage, { quoted: mek })


  } catch (e) {
    console.error(e);
    reply(`${e}`);
  }
});

//const { cmd } = require("../lib/command");
/*
cmd({
  pattern: "btn",
  desc: "Get TikTok video details only.",
  category: "tools",
  use: ".tiok <TikTok video URL>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {

const buttons = [
  { buttonId: 'id1', buttonText: { displayText: 'Button 1' }, type: 1 },
  { buttonId: 'id2', buttonText: { displayText: 'Button 2' }, type: 1 }
]

const buttonMessage = {
    image: { url: "https://manul-official-new-api-site.vercel.app/manu-md" }, // image: buffer or path
    caption: "Hi it's button message with image",
    footer: 'Hello World',
    buttons,
    headerType: 1,
    viewOnce: true
}

await conn.sendMessage(id, buttonMessage, { quoted: mek })


  } catch (e) {
    console.error(e);
    reply(`${e}`);
  }
});
*/
cmd({
  pattern: "tipk",
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

    const detailsMsg = `乂 ᗪIᑎᑌᗯᕼ TIKTOK ᗪOᗯᑎ ⟩⟩⟩
\`╭───────────────✿\`

- \`D\` ᴏᴡɴʟᴏᴀᴅꜱ : _${metrics.download_count}_
- \`C\` ᴏᴍᴍᴇɴᴛꜱ  : _*${metrics.comment_count}*_
- \`S\` ʜᴀʀᴇꜱ    : _${metrics.share_count}_
- \`P\` ʟᴀʏꜱ     : _${metrics.play_count}_
- \`L\` ɪᴋᴇꜱ     : _*${metrics.digg_count}*_
- \`L\` ɪɴᴋ      : _${tiktokUrl}_
✠.Aᴜᴛʜᴏʀ :
- Nɪᴄᴋ Nᴀᴍᴇ :- *${author.nickname}*
- Uꜱᴇʀɴᴀᴍᴇ   :- *@${author.username}*

\`╰───────────────✿\``;

    // ✳️ If nonbutton mode
if (config.MODE === 'nonbutton') {
  const sections = [
  {
    title: "📹 𝐕𝐢𝐝𝐞𝐨 𝐖𝐢𝐭𝐡 𝐖𝐚𝐭𝐞𝐫𝐦𝐚𝐫𝐤",
    rows: [
      {
        title: "1.",
        rowId: `${prefix}tikwm ${tiktokUrl}`,
        description: '`❲ With Watermark Normal ❳` 📹'
      },
      {
        title: "2.",
        rowId: `${prefix}tikwmdoc ${tiktokUrl}`,
        description: '`❲ With Watermark Document ❳` 📄'
      }
    ] },
  {
    title: "🎞️ 𝐕𝐢𝐝𝐞𝐨 𝐍𝐨 𝐖𝐚𝐭𝐞𝐫𝐦𝐚𝐫𝐤",
    rows: [
      {
        title: "3.",
        rowId: `${prefix}tiknowm ${tiktokUrl}`,
        description: '`❲ No Watermark Normal ❳` 📹'
      },
      {
        title: "4.",
        rowId: `${prefix}tiknowmdoc ${tiktokUrl}`,
        description: '`❲ No Watermark Document ❳` 📄'
      }
    ]
  },
  {
    title: "🎧 𝐀𝐮𝐝𝐢𝐨 𝐎𝐩𝐭𝐢𝐨𝐧𝐬",
    rows: [
      {
        title: "5.",
        rowId: `${prefix}tikaud ${tiktokUrl}`,
        description: '`❲ Audio With Normal File ❳` 🎵'
      },
      {
        title: "6.",
        rowId: `${prefix}tikauddoc ${tiktokUrl}`,
        description: '`❲ Audio With Document File ❳` 📄'
      },
      {
        title: "7.",
        rowId: `${prefix}tikaudptt ${tiktokUrl}`,
        description: '`❲ Audio With Voice Note ❳` 🎤'
      }
    ]
  }
];
const listMessage = {
caption: detailsMsg,
image: { url:thumbnail },  // <-- use YouTube thumbnail here
footer: '> *〽️ade By Dinuwh Bbh*',
title: '',
buttonText: '> *◎Reply Below Number ⇲◎*',
sections
}
	
return await conn.replyList(from, listMessage ,{ quoted : mek })

	//button
} if (config.MODE === 'button') {
      const listData = {
  title: "𝐕𝐢𝐝𝐞𝐨 𝐒𝐞𝐥𝐞𝐜𝐭𝐢𝐨𝐧 ツ",
  sections: [
    {
      title: "📽️ Non-Watermark ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ⇲",
      rows: [
        {
          title: "NonWaterMark Normal Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}tikaud ${tiktokUrl}`
        },
        {
          title: "NonWaterMark Document Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}ytdoc ${tiktokUrl}`
        }
      ]
    },
    {
      title: "💧 With-Watermark ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ⇲",
      rows: [
        {
          title: "WithWaterMark Normal Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}ytvoice ${tiktokUrl}`
        },
        {
          title: "WithWaterMark Document Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}devilv ${tiktokUrl}`
        }
      ]
    }
  ]
};
const listData2 = {
        title: "𝐀𝐮𝐝𝐢𝐨 𝐒𝐞𝐥𝐞𝐜𝐭𝐢𝐨𝐧 ツ",
        sections: [{
          title: "TikTok Audio Down Section 🎧",
          rows: [
            
            {
              title: "\`Audio With Normal\`",
              description: "〽️ade By Dinuwh Bbh",
              id: `${prefix}tikaud ${tiktokUrl}`
            },
            {
              title: "\`Audio With Document\`",
              description: "〽️ade By Dinuwh Bbh",
              id: `${prefix}tikauddoc ${tiktokUrl}`
            },
            {
              title: "\`Audio With Voice Note\`",
              description: "〽️ade By Dinuwh Bbh",
              id: `${prefix}tikaudptt ${tiktokUrl}`
            }
          ]
        }]
      };

      return await conn.sendMessage(from, {
        image: { url: thumbnail },
        caption: detailsMsg,
        footer: "> *〽️ade By Dinuwh Bbh*",
        buttons: [
          {
            buttonId: "action",
            buttonText: { displayText: "🔘 Choose Song Type" },
            type: 4,
            nativeFlowInfo: {
              name: "single_select",
              paramsJson: JSON.stringify(listData),
            },
          },
          {
            buttonId: "action",
            buttonText: { displayText: "🔘 Choose Song Type" },
            type: 4,
            nativeFlowInfo: {
              name: "single_select",
              paramsJson: JSON.stringify(listData2),
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


/*
cmd({
  pattern: "alivepayyo",
  desc: "Bot Status with Buttons",
  category: "misc",
  react: "👀",
  filename: __filename
}, 
async (conn, m, mdata) => {
  try {
    const templateButtons = [
      { index: 1, quickReplyButton: { displayText: '🧠 Help', id: 'help' } },
      { index: 2, urlButton: { displayText: '🌐 Website', url: 'https://your-site.com' } },
      { index: 3, callButton: { displayText: '📞 Call Me', phoneNumber: '+94771234567' } }
    ];

    await conn.sendMessage(m.chat, {
      text: "👋 *Bot is Alive!*\n\n💻 Version: 2.0.0\n📅 Uptime: Always Online\n🔧 Powered by *Visper Bot*",
      footer: "💚 Made with 💻 by Dineth",
      templateButtons
    }, { quoted: m });

  } catch (e) {
    console.log("Error in .alive:", e);
    m.reply("❌ Error showing alive status.");
  }
});
*/
