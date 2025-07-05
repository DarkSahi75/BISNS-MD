const { cmd } = require("../lib/command");
const axios = require("axios");

cmd(
  {
    pattern: "ttinfo", // 👈 Command to trigger the plugin
    desc: "Get TikTok video details using external API",
    category: "download",
    react: "🎵",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    try {
      if (!q || (!q.includes("tiktok.com") && !q.includes("vt.tiktok.com"))) {
        return reply("*Please provide a valid TikTok link!*");
      }

      const api = `https://my-private-api-site.vercel.app/ttdlxz?url=${encodeURIComponent(q)}`;
      const { data: res } = await axios.get(api);

      if (!res || !res.status || !res.data) {
        return reply("❌ Failed to fetch TikTok video details.");
      }

      const info = res.data;

      const caption = `*🎬 TikTok Video Info*

👤 *Author:* ${info.author || "N/A"}
🎵 *Sound:* ${info.music || "N/A"}
🕒 *Duration:* ${info.duration || "N/A"}
🔗 *Video Link:* ${info.play || q}
📝 *Title:* ${info.title || "N/A"}`;

      await robin.sendMessage(
        mek.key.remoteJid,
        {
          image: { url: info.cover || info.thumbnail },
          caption: caption,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply("*Something went wrong while fetching TikTok info.*");
    }
  }
);
