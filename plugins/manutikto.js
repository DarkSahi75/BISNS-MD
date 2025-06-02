const { cmd } = require("../lib/command");
const axios = require("axios");

cmd({
  pattern: "tikmanu3",
  alias: ["ttmp3"],
  category: "downloader",
  use: ".tiktokmp3 <TikTok URL>",
  desc: "Download TikTok audio as MP3",
  react: "🎶"
}, async ({ msg, args }) => {

  try {
   

  const res = await fetchJson(`https://api-pink-venom.vercel.app/api/tiktok?url=${q}`)

const manul = res.result 

const title = manul.title
const audio_link = manul.music

        await conn.sendMessage(from, { audio: { url: audio_link }, mimetype: 'audio/mp4', ptt: true }, { quoted:mek })

        await conn.sendMessage(from, {audio: {url: audio_link },mimetype:"audio/mpeg", caption :""}, { quoted:mek } )

        await conn.sendMessage(from, { 
                            document: { url: audio_link },
                            mimetype: "audio/mpeg", 
                            fileName: `${title}`, 
                            caption: `
*File Name -:* *${title}*

> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : පකයා*
`
                        }, { quoted: mek });
  } catch (e) {
    console.error(e);
    msg.reply(`${e}`);
  }
});
