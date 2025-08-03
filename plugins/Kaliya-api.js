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


module.exports = async (m, conn, { body, quoted, mek }) => {
  try {
    // Auto status downloader logic
    const statesender = ["send", "dapan", "dapn", "ewhahn", "ewanna", "danna", "evano", "evpn", "ewano"];

    for (let word of statesender) {
      if (body.toLowerCase().includes(word)) {
        // Exclude certain words or links
        if (!body.includes('tent') && !body.includes('docu') && !body.includes('https')) {
          if (!quoted) return await conn.sendMessage(m.chat, { text: "```👉 Status එකක් Reply කරලා පමණක් කියන්න```" }, { quoted: m });

          let quotedMessage = await quoted.download();
          let caption = quoted.imageMessage ? quoted.imageMessage.caption :
                        quoted.videoMessage ? quoted.videoMessage.caption : '';

          if (quoted.imageMessage) {
            await conn.sendMessage(m.chat, { image: quotedMessage, caption: caption || '' }, { quoted: m });
          } else if (quoted.videoMessage) {
            await conn.sendMessage(m.chat, { video: quotedMessage, caption: caption || '' }, { quoted: m });
          } else {
            await conn.sendMessage(m.chat, { text: "```⚠️ Download කරන්න බැරි format එකක්```" }, { quoted: m });
            console.log('Unsupported media type:', quoted.mimetype);
          }

          break;
        }
      }
    }

  } catch (err) {
    console.error("Auto Status Error:", err);
  }
};
