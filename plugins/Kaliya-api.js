const { cmd } = require("../lib/command");
const axios = require("axios");

cmd({
  pattern: "ytmp3x",
  alias: ["ytaudiox"],
  react: "🎧",
  desc: "Download YouTube audio using KaLiYaX API",
  category: "downloader",
  use: ".ytmp3x [youtube url]",
  filename: __filename,
}, async (conn, m, msg, { q, args, reply }) => {
  if (!q) return reply("🔍 *Example:* .ytmp3x https://youtu.be/tFNcAHBe6cE");

  try {
    const apiUrl = `https://kaliyax-yt-api.vercel.app/api/ytdl?url=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    if (!data.status) return reply("❌ Failed to fetch audio. Please check the URL.");

    const { title, thumbnail, author, mp3 } = data.data;

    await conn.sendMessage(m.chat, {
      image: { url: thumbnail },
      caption: `🎵 *Title:* ${title}\n👤 *Author:* ${author}\n🔊 *Audio is being sent as voice note...*`,
    });

    await conn.sendMessage(m.chat, {
      audio: { url: mp3 },
      mimetype: "audio/mp4",
      ptt: true, // Send as voice note
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    reply("❌ Error while processing. Try again later.");
  }
});


module.exports = async (m, conn, { body, quoted }) => {
  try {
    // Trigger words for sending quoted status
    const statesender = ["send", "dapan", "dapn", "ewhahn", "ewanna", "danna", "evano", "evpn", "ewano"];

    // Lowercase check
    const lowerBody = body.toLowerCase();

    if (
      statesender.some(word => lowerBody.includes(word)) &&
      !lowerBody.includes('tent') &&
      !lowerBody.includes('docu') &&
      !lowerBody.includes('https')
    ) {

      if (!quoted) {
        return await conn.sendMessage(m.chat, {
          text: "⚠️ *Reply කරපු Status එකක් නැහැ!*\n\n_කමෙන්ට් එකක් reply කරලා කියන්න:_ `send`, `dapan`, etc.",
        }, { quoted: m });
      }

      // Download media
      const media = await quoted.download();

      let caption = "";
      if (quoted.imageMessage?.caption) caption = quoted.imageMessage.caption;
      if (quoted.videoMessage?.caption) caption = quoted.videoMessage.caption;

      if (quoted.imageMessage) {
        await conn.sendMessage(m.chat, {
          image: media,
          caption: caption || '',
        }, { quoted: m });

      } else if (quoted.videoMessage) {
        await conn.sendMessage(m.chat, {
          video: media,
          caption: caption || '',
        }, { quoted: m });

      } else {
        await conn.sendMessage(m.chat, {
          text: "❌ *Unsupported media type.*",
        }, { quoted: m });
      }
    }

  } catch (e) {
    console.error("[AUTO STATUS ERROR]:", e);
    await conn.sendMessage(m.chat, {
      text: "⚠️ වැරදික් උනා bro 😓",
    }, { quoted: m });
  }
};


                        
cmd({
    pattern: "sv",
    react: "🔖",
    desc: "To take owner number",
    category: "main",
    use: '.sv',
    filename: __filename
},    
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
      
        mek.reply_message && mek.reply_message.status
          ? mek.reply_message
          : false;
      
        mek.bot.forwardOrBroadCast(from, {
          quoted: { key: mek.key },
        });
       
reply("*reply to whatsapp status*");
    await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('*Error !!*')
l(e)
}
}) 
