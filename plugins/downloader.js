const axios = require("axios");
const cheerio = require('cheerio');
const { cmd, commands } = require('../lib/command')
const config = require('../settings');
const yts = require("yt-search");
const {fetchJson} = require('../lib/functions');

const apikey = `edbcfabbca5a9750`;

var desc =''
if(config.LANG === 'SI') desc = "Tiktok වෙතින් වීඩියෝ බාගත කරයි."
else desc = "Download videos from Tiktok."

var ddesc =''
if(config.LANG === 'SI') ddesc = "Facebook වෙතින් වීඩියෝ බාගත කරයි."
else ddesc = "Download videos from Facebook."

var descs =''
if(config.LANG === 'SI') descs = "*Youtube වෙතින් songs බාගත කරයි.*"
else descs = "*Download songs from Youtube.*"

var N_FOUND =''
if(config.LANG === 'SI') N_FOUND = "*මට කිසිවක් සොයාගත නොහැකි විය :(*"
else N_FOUND = "*I couldn't find anything :(*"

var urlneed =''
if(config.LANG === 'SI') urlneed = "*🚩 කරුණාකර url එකක් ලබා දෙන්න*"
else urlneed = "*🚩 Please give me a url*"

var apkmsg =''
if(config.LANG === 'SI') apkmsg = "Play store වෙතින් බාගත කරයි."
else apkmsg = "Download Apk Play store"

var gdmsg =''
if(config.LANG === 'SI') gdmsg = "Google Drive වෙතින් බාගත කරයි."
else gdmsg = "Download from Google Drive."

var medmsg =''
if(config.LANG === 'SI') medmsg = "*media fire වෙතින් බාගත කරයි."
else medmsg = "Download from media fire."

var ttmsg =''
if(config.LANG === 'SI') ttmsg = "*twitter වෙතින් බාගත කරයි*"
else ttmsg = "*Download from twitter."

var igmsg =''
if(config.LANG === 'SI') igmsg = "*ig වෙතින් බාගත කරයි*"
else igmsg = "*Download from ig."

var imgmsg =''
if(config.LANG === 'SI') imgmsg = "*🚩 කරුණාකර වචන කිහිපයක් ලියන්න*"
else imgmsg = "*🚩 Please give me a text*"

var xn =''
if(config.LANG === 'SI') xn = "XNXX වෙතින් වීඩියෝ බාගත කරයි."
else xn = "Download videos from XNXX."

var xv =''
if(config.LANG === 'SI') xv = "XVIDEO වෙතින් වීඩියෝ බාගත කරයි."
else xv = "Download videos from XVIDEO."

var xvu =''
if(config.LANG === 'SI') xvu = "*සබැදි මගින් XVIDEO බාගත කරයි."
else xvu = "*Download XVIDEO in use Url*"




const api = `https://nethu-api-ashy.vercel.app`;

//09.Instagram Download

cmd(
  {
    pattern: "igm",
    react: "📸",
    alias: ["ig", "instadl", "reel"],
    desc: "Download Instagram Reel or Video",
    category: "download",
    use: '.instagram <instagram_url>',
    filename: __filename
  },
  async (conn, mek, m, { from, prefix, q, reply }) => {
    try {
      if (!q || !q.includes("instagram.com")) {
        return reply("Please provide a valid Instagram URL.\nExample: .instagram https://www.instagram.com/reel/xyz/");
      }

      const res = await fetchJson(`https://api-dark-shan-yt.koyeb.app/download/instagram?url=${encodeURIComponent(q)}&apikey=edbcfabbca5a9750`);

      if (!res.status || !res.data || !res.data.url || !res.data.url[0]) {
        return reply("Video not found or cannot be downloaded.");
      }

      const videoUrl = res.data.url[0].url;
      const title = res.data.meta?.title || "Instagram Video";
      const username = res.data.meta?.username || "unknown";
      const thumb = res.data.thumb;

      const caption = `*Instagram Downloader*\n\n`
        + `*📝 Title:* ${title}\n`
        + `*👤 User:* @${username}\n`
        + `*🔗 Url:* ${q}`;

 if (config.MODE === 'nonbutton') {
  const sections = [
  {
    title: "📹 𝐕𝐢𝐝𝐞𝐨 𝐖𝐢𝐭𝐡 𝐖𝐚𝐭𝐞𝐫𝐦𝐚𝐫𝐤",
    rows: [
      {
        title: "1.",
        rowId: `${prefix}tikwm }`,
        description: '`❲ With Watermark Normal ❳` 📹'
      },
      {
        title: "2.",
        rowId: `${prefix}tikwmdoc }`,
        description: '`❲ With Watermark Document ❳` 📄'
      }
    ] },
  {
    title: "🎞️ 𝐕𝐢𝐝𝐞𝐨 𝐍𝐨 𝐖𝐚𝐭𝐞𝐫𝐦𝐚𝐫𝐤",
    rows: [
      {
        title: "3.",
        rowId: `${prefix}tiknowm }`,
        description: '`❲ No Watermark Normal ❳` 📹'
      },
      {
        title: "4.",
        rowId: `${prefix}tiknowmdoc }`,
        description: '`❲ No Watermark Document ❳` 📄'
      }
    ]
  },
  {
    title: "🎧 𝐀𝐮𝐝𝐢𝐨 𝐎𝐩𝐭𝐢𝐨𝐧𝐬",
    rows: [
      {
        title: "5.",
        rowId: `${prefix}tikaud }`,
        description: '`❲ Audio With Normal File ❳` 🎵'
      },
      {
        title: "6.",
        rowId: `${prefix}tikauddoc }`,
        description: '`❲ Audio With Document File ❳` 📄'
      },
      {
        title: "7.",
        rowId: `${prefix}tikaudptt }`,
        description: '`❲ Audio With Voice Note ❳` 🎤'
      }
    ]
  }
];
const listMessage = {
caption: caption,
image: { url:thumb },  // <-- use YouTube thumbnail here
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
          id: `${prefix}tiknowm }`
        },
        {
          title: "NonWaterMark Document Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}tiknowmdoc }`
        }
      ]
    },
    {
      title: "💧 With-Watermark ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ⇲",
      rows: [
        {
          title: "WithWaterMark Normal Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}tikwm }`
        },
        {
          title: "WithWaterMark Document Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}tikwmdoc }`
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
              id: `${prefix}tikaud }`
            },
            {
              title: "\`Audio With Document\`",
              description: "〽️ade By Dinuwh Bbh",
              id: `${prefix}tikauddoc }`
            },
            {
              title: "\`Audio With Voice Note\`",
              description: "〽️ade By Dinuwh Bbh",
              id: `${prefix}tikaudptt`
            }
          ]
        }]
      };

      return await conn.sendMessage(from, {
        image: { url: thumb },
        caption: caption,
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


cmd({
  pattern: "igv",
  desc: "Send Instagram video directly",
  category: "download",
  filename: __filename
},
async (conn, mek, m, { q, reply }) => {
  try {
    if (!q || !q.includes("instagram.com")) {
      return reply("Please provide a valid Instagram URL.\nExample: .dl_ig https://www.instagram.com/reel/xyz/");
    }

    const res = await fetchJson(`https://api-dark-shan-yt.koyeb.app/download/instagram?url=${encodeURIComponent(q)}&apikey=edbcfabbca5a9750`);

    if (!res.status || !res.data || !res.data.url || !res.data.url[0]) {
      return reply("Video not found or cannot be downloaded.");
    }

    const videoUrl = res.data.url[0].url;
    const username = res.data.meta?.username || "unknown";

    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: `*Instagram Video*\n\n> *〽️ade By Dinuwh Bbh*\n*User:* @${username}\n\n> Powered by loku-md`,
      mimetype: 'video/mp4'
    }, { quoted: mek });

  } catch (err) {
    console.error(err);
    reply("*ERROR*: Failed to download Instagram video.");
  }
});

cmd({
  pattern: "igvd",
  desc: "Send Instagram video directly as Document",
  category: "download",
  filename: __filename
},
async (conn, mek, m, { q, reply }) => {
  try {
    if (!q || !q.includes("instagram.com")) {
      return reply("Please provide a valid Instagram URL.\nExample: .dl_ig https://www.instagram.com/reel/xyz/");
    }

    const res = await fetchJson(`https://api-dark-shan-yt.koyeb.app/download/instagram?url=${encodeURIComponent(q)}&apikey=edbcfabbca5a9750`);

    if (!res.status || !res.data || !res.data.url || !res.data.url[0]) {
      return reply("Video not found or cannot be downloaded.");
    }

    const videoUrl = res.data.url[0].url;
    const username = res.data.meta?.username || "unknown";

    await conn.sendMessage(m.chat, {
      document: { url: videoUrl },
      fileName: `instagram_video_${Date.now()}.mp4`,
      mimetype: 'video/mp4',
      caption: `*Instagram Video*\n\n> *〽️ade By Dinuwh Bbh*\n*User:* @${username}\n\n> Powered by loku-md`
    }, { quoted: mek });

  } catch (err) {
    console.error(err);
    reply("*ERROR*: Failed to download Instagram video.");
  }
});

cmd({
  pattern: "igvp",
  desc: "Send Instagram video as Push-To-Video (PTV)",
  category: "download",
  filename: __filename
},
async (conn, mek, m, { q, reply }) => {
  try {
    if (!q || !q.includes("instagram.com")) {
      return reply("Please provide a valid Instagram URL.\nExample: .dl_ig https://www.instagram.com/reel/xyz/");
    }

    const res = await fetchJson(`https://api-dark-shan-yt.koyeb.app/download/instagram?url=${encodeURIComponent(q)}&apikey=edbcfabbca5a9750`);

    if (!res.status || !res.data || !res.data.url || !res.data.url[0]) {
      return reply("Video not found or cannot be downloaded.");
    }

    const videoUrl = res.data.url[0].url;
    const username = res.data.meta?.username || "unknown";

    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      mimetype: 'video/mp4',
      ptv: true, // Push-To-Video Mode (PTV)
     // caption: `*Instagram Video*\n\n> *〽️ade By Dinuwh Bbh*\n*User:* @${username}\n\n> Powered by loku-md`
    }, { quoted: mek });

  } catch (err) {
    console.error(err);
    reply("*ERROR*: Failed to download Instagram video.");
  }
});


//ig Audio Section

//01.Facebook Download
cmd({
  pattern: "facebook",
  react: "🎥",
  alias: ["fbb", "fbvideo", "fb"],
  desc: ddesc,
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

  let caption = `*Facebook Downloader*

*│* 📝 \`Title\` : Facebook video
*│* 🔗 \`Url\` : ${q}`;

  const buttons = [
    {
      buttonId: `${prefix}downfb_sd ${q}`,
      buttonText: { displayText: "🪫 SD Video" },
      type: 1
    },
    {
      buttonId: `${prefix}downfb_hd ${q}`,
      buttonText: { displayText: "🔋 HD Video" },
      type: 1
    }
  ];

  if (fb.result.thumb) {
    await conn.buttonMessage2(from, {
      image: { url: fb.result.thumb },
      caption,
      footer: "> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏᴋᴜ-ᴍᴅ 🔒🪄",
      buttons,
      headerType: 4
    }, mek);
  }

} catch (err) {
  console.error(err);
  reply("*ERROR*");
  }
});

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

//02.Tiktok Download 
cmd({
  pattern: "tiktok",
  alias: ['tt', 'ttdl'],
  react: '🎥',
  desc: "Download TikTok video",
  category: "download",
  use: ".tiktok <TikTok Link>",
  filename: __filename
}, async (client, message, chat, { from, body, reply }) => {
  try {
    if (!body || !body.includes("tiktok")) {
      return await reply("❌ Please provide a valid TikTok URL.");
    }

    const tt = `https://api-dark-shan-yt.koyeb.app/download/tiktok?url=${encodeURIComponent(body)}&apikey=${apikey}`;
    const { data } = await axios.get(tt);

    if (!data.status || !data.data) {
      return await reply("❌ Failed to fetch video. Try again.");
    }

    const v = data.data;

    const caption = `*Tiktok Download*
    
*│* 🤵‍♂️ \`User\` : ${v.author.nickname} (@${v.author.unique_id})
*│* 🆔 \`Video ID\` : ${v.id}
*│* 🕒 \`Duration\` : ${v.duration}
*│* 👁️ \`Views\` : ${v.stats.play_count}
*│* ❤️ \`Likes\` : ${v.stats.digg_count}
*│* 💬 \`Comments\` : ${v.stats.comment_count}
*│* 🔁 \`Shares\` : ${v.stats.share_count}

*│* 🔗 \`Url\`  : ${body}`;
    
    const buttons = [
      {
        buttonId: `.ttdl_nowm ${v.play}`,
        buttonText: { displayText: "📼 No Watermark" },
        type: 1
      },
      {
        buttonId: `.ttdl_wm ${v.wmplay}`,
        buttonText: { displayText: "🎟️ With Watermark" },
        type: 1
      },
      {
        buttonId: `.ttdl_mp3 ${v.music}`,
        buttonText: { displayText: "🎶 Audio file" },
        type: 1
      }
    ];

    await client.buttonMessage2(from, {
      image: { url: v.cover },
      caption,
      footer: "> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏᴋᴜ-ᴍᴅ 🔒🪄",
      buttons,
      headerType: 4
    }, chat);

  } catch (err) {
    console.error(err);
    reply("❌ Error occurred. Try again later.");
  }
});

cmd({
  pattern: 'ttdl_nowm',
  dontAddCommandList: true,
  filename: __filename
}, async (client, message, chat, { from, body, reply }) => {
  const url = body.split(' ')[1];
  if (!url) return await reply("❌ No video URL found.");
  await client.sendMessage(from, {
    video: { url },
    mimetype: "video/mp4",
    caption: "*NO Wotermark*\n\n> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏᴋᴜ-ᴍᴅ 🔒🪄"
  });
});

cmd({
  pattern: 'ttdl_wm',
  dontAddCommandList: true,
  filename: __filename
}, async (client, message, chat, { from, body, reply }) => {
  const url = body.split(' ')[1];
  if (!url) return await reply("❌ No video URL found.");
  await client.sendMessage(from, {
    video: { url },
    mimetype: "video/mp4",
    caption: "*Wotermark*\n\n> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏᴋᴜ-ᴍᴅ 🔒🪄"
  });
});

cmd({
  pattern: 'ttdl_mp3',
  dontAddCommandList: true,
  filename: __filename
}, async (client, message, chat, { from, body, reply }) => {
  const url = body.split(' ')[1];
  if (!url) return await reply("❌ No audio URL found.");
  await client.sendMessage(from, {
    audio: { url },
    mimetype: "audio/mpeg",
    caption: "*TikTok Audio*\n\n> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏᴋᴜ-ᴍᴅ 🔒🪄"
  });
});
