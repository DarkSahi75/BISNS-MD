const axios = require("axios");
const { cmd } = require("../lib/command");
const config = require('../settings');
const prefix = config.PREFIX || ".";

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
\`╭────────✦✧✦────────╯\`

\`╭───────────────✿\`

- \`D\` ᴏᴡɴʟᴏᴀᴅꜱ : _${metrics.download_count}_
- \`C\` ᴏᴍᴍᴇɴᴛꜱ  : _*${metrics.comment_count}*_
- \`S\` ʜᴀʀᴇꜱ    : _${metrics.share_count}_
- \`R\` ᴇɢɪᴏɴ    : _*${metrics.region}*_
- \`P\` ʟᴀʏꜱ     : _${metrics.play_count}_
- \`L\` ɪᴋᴇꜱ     : _*${metrics.digg_count}*_
- \`L\` ɪɴᴋ      : _${tiktokUrl}_

✠.Aᴜᴛʜᴏʀ :
- Nɪᴄᴋ Nᴀᴍᴇ :- *${author.nickname}*
- Uꜱᴇʀɴᴀᴍᴇ   :- *@${author.username}*

\`╰───────────────✿\`

〽️ᴀᴅᴇ ʙʏ Dɪɴᴜᴡʜ ʙʙʜ`;

    // ✳️ If nonbutton mode
if (config.MODE === 'button') {
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
    ]
  },
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
//footer: '> 〽️ade By Dinuwh Bbh',
title: '',
buttonText: '> *◎Reply Below Number ⇲◎*',
sections
}
	
return await conn.replyList(from, listMessage ,{ quoted : mek })

	//button
} if (config.MODE === 'nonbutton') {
      const listData = {
        title: "𝐕𝐢𝐝𝐞𝐨 𝐒𝐞𝐥𝐞𝐜𝐭𝐢𝐨𝐧 ツ",
        sections: [{
          title: "ᴅɪɴᴜᴡʜ-ᴍᴅ || ᴛɪᴋᴛᴏᴋ ᴠɪᴅᴇᴏɴ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ⇲",
          rows: [
            {
              title: "NonWaterMark Norml Video",
              description: "Download as audio\n〽️ade By Dinuwh Bbh",
              id: `${prefix}tikaud ${data.url}`
            },
            {
              title: "NonWaterMark Document Video",
              description: "Download as document\n〽️ade By Dinuwh Bbh",
              id: `${prefix}ytdoc ${data.url}`
            },
            {
              title: "WithWaterMark Normal Video",
              description: "Download as Voice Note\n〽️ade By Dinuwh Bbh",
              id: `${prefix}ytvoice ${data.url}`
            },
            {
              title: "WithWaterMark Document Video",
              description: "Download as Video\n〽️ade By Dinuwh Bbh",
              id: `${prefix}devilv ${data.url}`
            }
          ]
        }]
      };

const listData2 = {
        title: "𝐀𝐮𝐝𝐢𝐨 𝐒𝐞𝐥𝐞𝐜𝐭𝐢𝐨𝐧 ツ",
        sections: [{
          title: "DINUWH MD OPTIONS",
          rows: [
            {
              title: "[A2 🎧]",
              description: "Download as audio\n〽️ade By Dinuwh Bbh",
              id: `${prefix}ytaud ${data.url}`
            },
            {
              title: "[D2📁]",
              description: "Download as document\n〽️ade By Dinuwh Bbh",
              id: `${prefix}ytdoc ${data.url}`
            },
            {
              title: "[V2 💡]",
              description: "Download as Voice Note\n〽️ade By Dinuwh Bbh",
              id: `${prefix}ytvoice ${data.url}`
            },
            {
              title: "[V2📽️]",
              description: "Download as Video\n〽️ade By Dinuwh Bbh",
              id: `${prefix}devilv ${data.url}`
            }
          ]
        }]
      };

      return await conn.sendMessage(from, {
        image: { url: data.thumbnail },
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
