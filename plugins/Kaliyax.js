const { getBuffer, fetchJson } = require('../lib/functions');
const { cmd } = require("../lib/command");
const yts = require("yt-search");

cmd(
  {
    pattern: "kariyax",
    alias: ["ytptt", "vreptt"],
    react: "🎶",
    desc: "Download MP3 & send as Voice Note using KaliyaX API",
    category: "download",
    filename: __filename,
  },
  async (robin, mek, m, { from, q, reply }) => {
    try {
      if (!q) return reply("🧠 නමක් හරි YouTube ලින්ක් එකක් හරි දෙන්න");

      const search = await yts(q);
      if (!search.videos.length) return reply("❌ Video not found!");

      const video = search.videos[0];
      const videoUrl = video.url;

      const metadataMsg = `🎵 *Uploading as Voice Note...*

📌 *Title:* ${video.title}
🔗 *URL:* ${video.url}
🕘 *Duration:* ${video.timestamp}
📅 *Uploaded:* ${video.ago}
👁️ *Views:* ${video.views}

🎧 *Headphones on – Feel the vibe!*`;

      await robin.sendMessage(
        from,
        {
          image: { url: video.thumbnail },
          caption: metadataMsg,
        },
        { quoted: mek }
      );

      // Use KaliyaX API to fetch MP3
      const apiURL = `https://kaliyax-yt-api.vercel.app/api/ytmp3?url=${encodeURIComponent(videoUrl)}`;
      const res = await fetchJson(apiURL);

      if (!res?.status || !res?.data?.download?.status) {
        return reply("⚠️ Cannot fetch audio from KaliyaX API");
      }

      // Duration check
      let durationParts = video.timestamp.split(":").map(Number);
      let totalSeconds =
        durationParts.length === 3
          ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
          : durationParts[0] * 60 + durationParts[1];

      if (totalSeconds > 1800) {
        return reply("⏱️ Sorry, limit is 30 mins or less for voice notes.");
      }

      const audioBuffer = await getBuffer(res.data.download.url);

      // Send audio as voice note (PTT)
      await robin.sendMessage(
        from,
        {
          audio: audioBuffer,
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);
