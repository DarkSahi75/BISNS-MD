const { getBuffer, getFile, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, jsonformat} = require('../lib/functions');
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { writeFileSync, unlinkSync, createReadStream } = require("fs");
const FormData = require("form-data");
const cheerio = require("cheerio");
const { toAudio } = require("@whiskeysockets/baileys");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const { exec } = require("child_process");
const { cmd } = require("../lib/command"); // Command handler path
//const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const os = require("os");
const util = require("util");
const stream = require("stream");
const https = require("https");
const http = require("http");
const desc = 'Download TikTok videos with or without watermark or as audio.';
cmd({
    pattern: "tiktok",
    alias: ["ttdl","tt"],
    react: '🏷️',
    desc: desc,
    category: "download",
    use: '.tiktok <Tiktok link>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!regtik(q)) return await  reply(urlneed)

const data = await fetchJson(`https://api-mainh-20a12b683c39.herokuapp.com/download/tiktokdl?url=${q}`)

let dat = `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]

*TIKTOK DOWNLOADER*

*📃 Title:* ${data.result.title}
*✍🏼 Link:* ${q}`

if (config.MODE === 'nonbutton') {

	
const sections = [
    {
	title: "Without Watermark",
	rows: [	
        {title: "    1.1", rowId: `${prefix}ttw ${q}`,description: 'Withoit-Watermark'},
        {title: "    1.2", rowId: `${prefix}ttwd ${q}`,description: 'Without-Watermark Doc'},
	]
    },
	{
	title: "With Watermark",
	rows: [	
        {title: "    2.1", rowId: `${prefix}tnd ${q}`,description: 'With-Watermark'} ,
        {title: "    2.2", rowId: `${prefix}tndd ${q}`,description: 'With-Watermark Doc'},      
	]
    },
	{	
	title: "VOICE CUT TYPE 🎶",
	rows: [	
	{title: "    3.1", rowId: `${prefix}ta ${q}`,description: 'AUDIO DOWNLOAD'} ,
	{title: "    2.2", rowId: `${prefix}td ${q}`,description: 'DOCUMENT DOWNLOAD'} ,	
  ]
    } 
]
	
const listMessage = {
image: { url: data.result.thumbnail },	
caption: dat,
footer: config.FOOTER,
title: '',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })

} if (config.MODE === 'button') {

let sections = [{
        title: 'Without Watermark',
        rows: [{
                header: "",
                title: "",
                description: "With-Watermark",
                id: `${prefix}ttw ${q}`
            },
            {
                header: "",
                title: "",
                description: "With-Watermark Doc",
                id: `${prefix}ttwd ${q}`
            }
        ]
    },
    {
        title: 'With Watermark',
        rows: [{
                header: "",
                title: "",
                description: "Without-Watermark",
                id: `${prefix}tnd ${q}`
            },
            {
                header: "",
                title: "",
                description: "Without-Watermark Doc",
                id: `${prefix}tndd ${q}`
            }
        ]
    },
    {
        title: 'VOICE CUT TYPE 🎶',
        rows: [{
                header: "",
                title: "",
                description: "AUDIO DOWNLOAD",
                id: `${prefix}ta ${q}`
            },
            {
                header: "",
                title: "",
                description: "DOCUMENT DOWNLOAD",
                id: `${prefix}td ${q}`
            }
        ]
    }
]

let listMessage = {
            title: 'Click Here⎙',
            sections
        };
        conn.sendMessage(from, {
            image: { url: config.LOGO },
    caption: dat,
    footer: config.FOOTER,
                buttons: [
		{
                    buttonId: `${prefix}ttw ${q}`,
                    buttonText: {
                        displayText: ' 🪫 `SD` QUALITY VIDEO'
                    },
                },	
                {
                    buttonId: `${prefix}tnd ${q}`,
                    buttonText: {
                        displayText: ' 🔋 `HD` QUALITY VIDEO'
                    },
                },	
		{
                    buttonId: `${prefix}ta ${q}`,
                    buttonText: {
                        displayText: ' 🎶 Audio file'
                    },
                },		

                {
                    buttonId: 'action',
                    buttonText: {
                        displayText: 'ini pesan interactiveMeta'
                    },
                    type: 4,
                    nativeFlowInfo: {
                        name: 'single_select',
                        paramsJson: JSON.stringify(listMessage),
                    },
                },
            ],
            headerType: 1,
            viewOnce: true
        }, {
            quoted: m
        });

}
	
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})





cmd({
    pattern: "ttw",
    react: "⬇",    
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const data = await fetchJson(`https://api-mainh-20a12b683c39.herokuapp.com/download/tiktokdl?url=${q}`)

    

await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { video: { url: data.result.nowm }, mimetype: "video/mp4", caption: `> *POWERED by VAJIRA-MD*` }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})



cmd({
    pattern: "ttwd",
    react: "⬇",    
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const data = await fetchJson(`https://api-mainh-20a12b683c39.herokuapp.com/download/tiktokdl?url=${q}`)


    

await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { document: { url: data.result.nowm }, mimetype: "video/mp4", fileName: `${data.result.title}.mp4`, caption: "💻 *VAJIRA MD TTDL*" }, { quoted: mek }); 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})


cmd({
    pattern: "tnd",
    react: "⬇",    
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
 
const data = await fetchJson(`https://api-mainh-20a12b683c39.herokuapp.com/download/tiktokdl?url=${q}`)

await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { video: { url: data.result.watermark}, mimetype: "video/mp4", caption: `> *POWERED by VAJIRA-MD*` }, { quoted: mek })
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})



cmd({
    pattern: "tndd",
    react: "⬇",    
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
 
const data = await fetchJson(`https://api-mainh-20a12b683c39.herokuapp.com/download/tiktokdl?url=${q}`)


await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { document: { url: data.result.watermark }, mimetype: "video/mp4", fileName: `${data.result.title}.mp4`, caption: "💻 *VAJIRA MD TTDL*" }, { quoted: mek }); 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})




cmd({
    pattern: "ttaud",
    react: "⬇",    
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  


const data = await fetchJson(`https://api-mainh-20a12b683c39.herokuapp.com/download/tiktokdl?url=${q}`)



await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { audio: { url: data.result.audio }, mimetype: "audio/mpeg" }, { quoted: mek })  
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})



cmd({
    pattern: "td",
    react: "⬇",    
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  


const data = await fetchJson(`https://api-mainh-20a12b683c39.herokuapp.com/download/tiktokdl?url=${q}`)



await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { document: { url: data.result.audio }, mimetype: "audio/mpeg", fileName: `${data.result.title}.mp3`, caption: "💻 *VAJIRA MD TTDL*" }, { quoted: mek }); 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})

cmd({
    pattern: "tiktok2",
    alias: ["ttdl2","tt2"],
    react: '🏷️',
    desc: desc,
    category: "download",
    use: '.tiktok <Tiktok link>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!regtik(q)) return await  reply(urlneed)
let data = await downloadTiktok(q);	
let msg = `
    🎟️ *VAJIRA-MD TIKTOK DOWNLOADER* 🎟️

📌 *Please click what you want to select*

*Title* :- ${data.result.title}

*URL:* ${q}`	
await conn.sendMessage( from, { image: { url:`${data.result.image}`}, caption: msg }, { quoted: mek })	
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
await conn.sendMessage(from, { document: { url: q }, mimetype: 'audio/mpeg', fileName: 'TikTok Audio' + '.mp3',caption: config.FOOTER }, { quoted: mek })
await conn.sendMessage(from, { video: { url: data.result.dl_link.download_mp4_1}, mimetype: "video/mp4", caption: `SD QUALITY\n\n> *POWERED by VAJIRA-MD` }, { quoted: mek })	
await conn.sendMessage(from, { video: { url: data.result.dl_link.download_mp4_2 }, mimetype: "video/mp4", caption: `HD QUALITY\n\n> *POWERED by VAJIRA-MD` }, { quoted: mek })  
	
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
  reply('*ERROR !!*')
l(e)
}
})



cmd({
  pattern: "tiktokmp3",
  alias: ["ttmp3"],
  category: "downloader",
  use: ".tiktokmp3 <TikTok URL>",
  desc: "🎵 TikTok Video එකක ගීතය MP3 එකක් විදිහට බාගන්න",
  react: "🎶"
}, async ({ msg, args, sock }) => {
  if (!args || !args[0]?.includes("tiktok.com")) {
    return msg.reply("🚫 කරුණාකර නිවැරදි TikTok ලින්ක් එකක් දෙන්න!\n\n📌 උදාහරණය: `.tiktokmp3 https://www.tiktok.com/....`");
  }

  try {
    const api = `https://api-pink-venom.vercel.app/api/tiktok?url=${args[0]}`;
    const { data } = await axios.get(api);

    if (!data.status || !data.result?.music) {
      return msg.reply("❌ MP3 එක ලබාගත නොහැක. වෙනත් TikTok ලින්ක් එකක් උත්සාහ කරන්න.");
    }

    const title = data.result.title || "TikTok MP3";
    const mp3 = data.result.music;

    await msg.reply(`🎧 *TikTok MP3 එක ඔබට ගෙනෙන්නෙ මෙන්න!*\n\n📌 *Title:* ${title.substring(0, 100)}...\n\n🔗 *Source:* ${args[0]}`, {
      audio: { url: mp3 },
      mimetype: 'audio/mpeg',
      ptt: true,
      fileName: `${title.substring(0, 30)}.mp3`,
    });

  } catch (e) {
    console.error(e);
    msg.reply("🥲 උපස්ථානයක දෝෂයක් ඇතිවුණා. නැවත උත්සාහ කරන්න.");
  }
});
