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
