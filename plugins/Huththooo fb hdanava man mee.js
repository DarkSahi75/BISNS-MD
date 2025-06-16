const axios = require("axios");
const cheerio = require('cheerio');
const { cmd, commands } = require('../lib/command')
const config = require('../settings');
const yts = require("yt-search");
const {fetchJson} = require('../lib/functions');

const api = `https://nethu-api-ashy.vercel.app`;

//01.Facebook Download
cmd({
  pattern: "facebook",
  react: "🎥",
  alias: ["fbbbb", "fbvideo", "fb"],
  desc: "ddesc",
  category: "download",
  use: '.facebook <facebook_url>',
  filename: __filename
},
async(conn, mek, m, {
    from, prefix, q, reply
}) => {
  try {
  if (!q) return reply("Please provide a Facebook video URL.");

  const fb = await fetchJson(`${api}/download/fbdown?url=${encodeURIComponent(q)}`);

if (!fb.result || (!fb.result.sd && !fb.result.hd)) {
  return reply("Video not found or not downloadable. Please check the URL.");
}

let result = fb.result; // <== මෙතන result එක assign කරපන්

let caption = `\`乂 Ｄ𝚒ｎｕｗｈ 𝐹𝛣 Ｄｏｗｎ⟩⟩⟩\`
╭────────✦✧✦────────╯


* *▣ \`T\` itle* : ${result.title || 'N/A'}
* *▣ \`D\` esc* : ${result.desc || 'N/A'}
* *▣ \`U\` RL*   : ${q}
╭────────✦✧✦────────╯

╭───────────────✿  
│ 🎶 *ƒσℓℓσω υѕ мυѕι¢ ¢нαηηєℓ* 🧚‍♂️  
╰───────────────✿  
🔗 https://whatsapp.com/channel/0029Vb3mqn5H5JLuJO3s3Z1J
`;
  if (config.MODE === 'nonbutton') {
  const sections = [
  {
    title: "📹 𝐕𝐢𝐝𝐞𝐨 𝐖𝐢𝐭𝐡 𝐖𝐚𝐭𝐞𝐫𝐦𝐚𝐫𝐤",
    rows: [
      {
        title: "1",
        rowId: `${prefix}tikwm ${tiktokUrl}`,
        description: 'Wm Normal Video 📹'
      },
      {
        title: "2",
        rowId: `${prefix}tikwmp ${tiktokUrl}`,
        description: '\`Wm video Note 📹\`'
      },
      {
        title: "3",
        rowId: `${prefix}tikwmdoc ${tiktokUrl}`,
        description: 'Wm Document Video 📄'
      }
    ] 
  },
  {
    title: "🎞️ 𝐕𝐢𝐝𝐞𝐨 𝐍𝐨 𝐖𝐚𝐭𝐞𝐫𝐦𝐚𝐫𝐤",
    rows: [
      {
        title: "4",
        rowId: `${prefix}tiknowm ${tiktokUrl}`,
        description: 'No_Wm Normal Video 📹'
      },
     {
        title: "5",
        rowId: `${prefix}tiknowmp ${tiktokUrl}`,
        description: '\`No_Wm Video Note 📹\`'
      }, 
      {
        title: "6",
        rowId: `${prefix}tiknowmdoc ${tiktokUrl}`,
        description: 'No_Wm Document Video 📄'
      }
    ]
  },
  {
    title: "🎧 𝐀𝐮𝐝𝐢𝐨 𝐎𝐩𝐭𝐢𝐨𝐧𝐬",
    rows: [
      {
        title: "7",
        rowId: `${prefix}tikaud ${tiktokUrl}`,
        description: 'Audio With Normal File 🎵'
      },
      {
        title: "8",
        rowId: `${prefix}tikauddoc ${tiktokUrl}`,
        description: '\`Audio With Document File 📄\`'
      },
      {
        title: "9",
        rowId: `${prefix}tikaudptt ${tiktokUrl}`,
        description: 'Audio With Voice Note 🎤'
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
      title: "⥥ Non-Watermark ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ⇲",
      rows: [
        {
          title: "NonWaterMark Normal Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}tiknowm ${tiktokUrl}`
        },
        {
          title: "NonWaterMark Document Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}tiknowmdoc ${tiktokUrl}`
        },
	{
          title: "NonWatermark Video Note",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}tiknowmp ${tiktokUrl}`
	}
      ]
    },
    {
      title: "⥥ With-Watermark ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ⇲",
      rows: [
        {
          title: "WithWaterMark Normal Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}tikwm ${tiktokUrl}`
        },
	{
          title: "WithWaterMark Video Note",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}tikwmp ${tiktokUrl}`
        },
        {
          title: "WithWaterMark Document Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}tikwmdoc ${tiktokUrl}`
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
            buttonText: { displayText: "🔘" },
            type: 4,
            nativeFlowInfo: {
              name: "single_select",
              paramsJson: JSON.stringify(listData),
            },
          },
          {
            buttonId: "action",
            buttonText: { displayText: "🔘" },
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

//==3-3--3=3-3-3-3-3=3-3-3-3-3-=3=3=3=3=3=3==*=*=*=*=**=*=&=&=&=&=&=&==&-&-&-&-&=&=&=&-&-*&
cmd({
  pattern: "downfb_sd",
  react: "⬇️",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m, {
    from, q, reply
}) => {
  try {
      
    const fb = await fetchJson(`${api}/download/fbdown?url=${encodeURIComponent(q)}`);
    
    if (!fb.result || (!fb.result.sd && !fb.result.hd)) {
      return reply("Video not found or not downloadable. Please check the URL.");
    }

    if (fb.result.sd) {
      await conn.sendMessage(from, {
        video: { url: fb.result.sd },
        mimetype: "video/mp4",
        caption: `*SD Quality*\n\n> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏᴋᴜ-ᴍᴅ 🔒🪄`
      }, { quoted: mek });
    }

  } catch (e) {
    console.error("Facebook Download Error:", e);
    reply(`Error: ${e.message || e}`);
  }
});

cmd({
  pattern: "downfb_hd",
  react: "⬇️",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m, {
    from, q, reply
}) => {
  try {
      
    const fb = await fetchJson(`${api}/download/fbdown?url=${encodeURIComponent(q)}`);
    
    if (!fb.result || (!fb.result.sd && !fb.result.hd)) {
      return reply("Video not found or not downloadable. Please check the URL.");
    }

    if (fb.result.hd) {
      await conn.sendMessage(from, {
        video: { url: fb.result.hd },
        mimetype: "video/mp4",
        caption: `*HD Quality*\n\n> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏᴋᴜ-ᴍᴅ 🔒🪄`
      }, { quoted: mek });
    }

  } catch (e) {
    console.error("Facebook Download Error:", e);
    reply(`Error: ${e.message || e}`);
  }
});

