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
    title: "📹 𝐕𝐢𝐝𝐞𝐨 𝐖𝐢𝐭𝐡 𝐒𝐃",
    rows: [
      {
        title: "1",
        rowId: `${prefix}downfb_sd ${q}`,
        description: 'SD Normal Video 📹'
      },
      {
        title: "2",
        rowId: `${prefix}downfb_sdd ${q}`,
        description: '\`SD video Note 📹\`'
      },
      {
        title: "3",
        rowId: `${prefix}downfb_sdp ${q}`,
        description: 'SD Document Video 📄'
      }
    ] 
  },
  {
    title: "🎞️ 𝐕𝐢𝐝𝐞𝐨 𝐖𝐢𝐭𝐡 𝐇𝐃",
    rows: [
      {
        title: "4",
        rowId: `${prefix}downfb_hd ${q}`,
        description: 'HD Normal Video 📹'
      },
     {
        title: "5",
        rowId: `${prefix}downfb_hdd ${q}`,
        description: '\`HD Video Note 📹\`'
      }, 
      {
        title: "6",
        rowId: `${prefix}downfb_hdp ${q}`,
        description: 'HD Document Video 📄'
      }
    ]
  },
  {
    title: "🎧 𝐀𝐮𝐝𝐢𝐨 𝐎𝐩𝐭𝐢𝐨𝐧𝐬",
    rows: [
      {
        title: "7",
        rowId: `${prefix}fb_sd_audio ${q}`,
        description: 'Audio With Normal File 🎵'
      },
      {
        title: "8",
        rowId: `${prefix}fb_sd_doc ${q}`,
        description: '\`Audio With Document File 📄\`'
      },
      {
        title: "9",
        rowId: `${prefix}fb_sd_ptt ${q}`,
        description: 'Audio With Voice Note 🎤'
      }
    ]
  }
];
const listMessage = {
  caption: caption,
  image: { url: fb.result.thumb }, // ✅ fixed line
  footer: '> *〽️ade By Dinuwh Bbh*',
  title: '',
  buttonText: '> *◎Reply Below Number ⇲◎*',
  sections
};

return await conn.replyList(from, listMessage, { quoted: mek });
	//button
} if (config.MODE === 'button') {
      const listData = {
  title: "𝐕𝐢𝐝𝐞𝐨 𝐒𝐞𝐥𝐞𝐜𝐭𝐢𝐨𝐧 ツ",
  sections: [
    {
      title: "⥥ Sd Qulity ᴠɪᴅᴇᴏ ᴄᴏʟʟᴇᴄᴛɪᴏɴ ⇲",
      rows: [
        {
          title: "SD Normal Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}downfb_sd ${q}`
        },
        {
          title: "SD Document Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}downfb_sdd ${q}`
        },
	{
          title: "SD Video Note",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}downfb_sdp ${q}`
	}
      ]
    },
    {
      title: "⥥ Hd Qulity ᴠɪᴅᴇᴏ ᴄᴏʟʟᴇᴄᴛɪᴏɴ ⇲",
      rows: [
        {
          title: "HD Normal Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}downfb_hd ${q}`
        },
	{
          title: "HD Document Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}downfb_hdd ${q}`
        },
	{
          title: "HD Video Note",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}downfb_hdp ${q}`
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
              title: "\`Fb Audio With Normal\`",
              description: "〽️ade By Dinuwh Bbh",
              id: `${prefix}fb_sd_audio ${q}`
            },
            {
              title: "\`Fb Audio With Document\`",
              description: "〽️ade By Dinuwh Bbh",
              id: `${prefix}fb_sd_doc ${q}`
            },
            {
              title: "\`Fb Audio With Voice Note\`",
              description: "〽️ade By Dinuwh Bbh",
              id: `${prefix}fb_sd_ptt ${q}`
            }
          ]
        }]
      };

      return await conn.sendMessage(from, {
        image: { url: fb.result.thumb },
        caption: caption,
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
//=====3=3=3==3=4=4=4=4==4===4-4-3


cmd({
  pattern: "downfb_hdd",
  react: "⬇️",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, {
  from, q, reply
}) => {
  try {
    const fb = await fetchJson(`${api}/download/fbdown?url=${encodeURIComponent(q)}`);

    if (!fb.result || (!fb.result.sd && !fb.result.hd)) {
      return reply("📛 Video not found or not downloadable. Please check the URL.");
    }

    if (fb.result.hd) {
      await conn.sendMessage(from, {
        document: { url: fb.result.hd },
        fileName: "facebook_video_hd.mp4",
        mimetype: "video/mp4",
        caption: `*📥 HD Facebook Video*\n\n> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏᴋᴜ-ᴍᴅ 🔒🪄`
      }, { quoted: mek });
    }

  } catch (e) {
    console.error("Facebook Download Error:", e);
    reply(`❌ Error: ${e.message || e}`);
  }
});

//==3=3==3=3-3-3-



cmd({
  pattern: "downfb_sdd",
  react: "⬇️",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, {
  from, q, reply
}) => {
  try {
    const fb = await fetchJson(`${api}/download/fbdown?url=${encodeURIComponent(q)}`);

    if (!fb.result || (!fb.result.sd && !fb.result.hd)) {
      return reply("📛 Video not found or not downloadable. Please check the URL.");
    }

    if (fb.result.sd) {
      await conn.sendMessage(from, {
        document: { url: fb.result.sd },
        fileName: "facebook_video_sd.mp4",
        mimetype: "video/mp4",
        caption: `*📥 SD Facebook Video*\n\n> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏᴋᴜ-ᴍᴅ 🔒🪄`
      }, { quoted: mek });
    }

  } catch (e) {
    console.error("Facebook Download Error:", e);
    reply(`❌ Error: ${e.message || e}`);
  }
});
//=3=3=3==3=3=3==4=3=4=4=4=4==4=4858&=&885

cmd({
  pattern: "downfb_sdp",
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
	ptv: "true",
        caption: `*SD Quality*\n\n> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏᴋᴜ-ᴍᴅ 🔒🪄`
      }, { quoted: mek });
    }

  } catch (e) {
    console.error("Facebook Download Error:", e);
    reply(`Error: ${e.message || e}`);
  }
});

cmd({
  pattern: "downfb_hdp",
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
	ptv: "true",
        caption: `*HD Quality*\n\n> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏᴋᴜ-ᴍᴅ 🔒🪄`
      }, { quoted: mek });
    }

  } catch (e) {
    console.error("Facebook Download Error:", e);
    reply(`Error: ${e.message || e}`);
  }
});



cmd({
  pattern: "fb_sd_ptt",
  react: "🎤",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, {
  from, q, reply
}) => {
  try {
    const fb = await fetchJson(`${api}/download/fbdown?url=${encodeURIComponent(q)}`);

    if (!fb.result || !fb.result.sd) {
      return reply("❌ SD video not found.");
    }

    await conn.sendMessage(from, {
      audio: { url: fb.result.sd }, // using video URL directly
      mimetype: 'audio/mpeg',       // trick to treat video as audio
      ptt: true                     // make it voice note
    }, { quoted: mek });

  } catch (e) {
    console.error("Direct Audio Send Error:", e);
    reply(`❌ Error: ${e.message || e}`);
  }
});

cmd({
  pattern: "fb_sd_audio",
  react: "🎵",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, {
  from, q, reply
}) => {
  try {
    const fb = await fetchJson(`${api}/download/fbdown?url=${encodeURIComponent(q)}`);

    if (!fb.result || !fb.result.sd) {
      return reply("❌ SD video not found.");
    }

    await conn.sendMessage(from, {
      audio: { url: fb.result.sd },     // still using video URL
      mimetype: 'audio/mpeg',           // send as MP3
      ptt: false                        // make sure it's NOT voice note
    }, { quoted: mek });

  } catch (e) {
    console.error("FB Audio Send Error:", e);
    reply(`❌ Error: ${e.message || e}`);
  }
});



cmd({
  pattern: "fb_sd_doc",
  react: "📄",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, {
  from, q, reply
}) => {
  try {
    const fb = await fetchJson(`${api}/download/fbdown?url=${encodeURIComponent(q)}`);

    if (!fb.result || !fb.result.sd) {
      return reply("❌ SD video not found.");
    }

    await conn.sendMessage(from, {
      document: { url: fb.result.sd },  // <-- send as document
      mimetype: "audio/mpeg",           // <-- trick WhatsApp to treat as audio
      fileName: "facebook_audio.mp3",   // <-- can be .mp3 even if it's .mp4
      caption: `🎶 *Facebook Audio* via SD Video\n\n> 🔒 Powered by Loku-MD`
    }, { quoted: mek });

  } catch (e) {
    console.error("FB Audio Doc Send Error:", e);
    reply(`❌ Error: ${e.message || e}`);
  }
});
