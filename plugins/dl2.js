const { cmd } = require('../lib/command');
const { downloadMp3 } = require("xproverce-youtubedl");

cmd(
  {
    pattern: "xprodl",
    desc: "Get direct MP3 link from YouTube",
    category: "download",
    react: "🔗",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    try {
      if (!q) return reply("👉 YouTube link එකක් දාන්න !");

      let data = await downloadMp3(q, "128");

      // package එකේ return type check
      let mp3Url = data?.download_url || data?.url || data;

      console.log("🎶 Direct Link:", mp3Url);

      if (!mp3Url) return reply("❌ Direct link not found!");

      await robin.sendMessage(m.chat, { text: `⬇️ Direct Link:\n${mp3Url}` }, { quoted: mek });

    } catch (e) {
      console.error("❌ Error:", e);
      reply("❌ Error: " + e.message);
    }
  }
);
