const { fetchJson } = require('../lib/functions');
const { cmd } = require("../command");
const yts = require("yt-search");
const config = require("../config"); // make sure config.JID is defined here

cmd(
  {
    pattern: "vre",
    alias: "ytmp3",
    react: "🎵",
    desc: "Download Song as PTT",
    category: "download",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    {
      q,
      reply,
    }
  ) => {
    try {
      if (!q) return reply("නමක් හරි ලින්ක් එකක් හරි දෙන්න 🌚❤️");

      const search = await yts(q);
      if (!search.videos.length) return reply("❌ Video not found!");

      const data = search.videos[0];
      const url = data.url;

      await reply("📩 Downloading...");

      // Check song duration
      let durationParts = data.timestamp.split(":").map(Number);
      let totalSeconds =
        durationParts.length === 3
          ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
          : durationParts[0] * 60 + durationParts[1];

      if (totalSeconds > 1800) {
        return reply("⏱️ Audio limit is 30 minutes!");
      }

      // Download MP3 using Manul API
      const dataa = await fetchJson(`https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(url)}&apikey=Manul-Official`);
      const dl_link = dataa.data.url;

      // Send audio as PTT to config.JID
      await robin.sendMessage(
        config.JID,
        {
          audio: { url: dl_link },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      await reply("✅ Song sent as PTT to your configured JID!");

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);
