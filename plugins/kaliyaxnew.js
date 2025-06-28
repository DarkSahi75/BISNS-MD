const { getBuffer, fetchJson } = require('../lib/functions');
const { cmd } = require("../lib/command");
const yts = require("yt-search");

cmd(
  {
    pattern: "kalisong",
    alias: ["ytmp3", "ptt"],
    react: "🎵",
    desc: "Download YouTube song as PTT (voice note)",
    category: "download",
    filename: __filename,
  },
  async (robin, mek, m, { from, q, reply }) => {
    try {
      if (!q) return reply("❗ Please provide a song name or YouTube link.");

      const search = await yts(q);
      if (!search.videos.length) return reply("❌ No video found for your query!");

      const data = search.videos[0];
      const url = data.url;
      const apilink = `https://kaliyax-api.vercel.app/api/yto?url=${encodeURIComponent(url)}`;
      const fetched = await fetchJson(apilink);
      if (!fetched.status) return reply("⚠️ Error while fetching the audio link!");

      const song = fetched.data;
      const durationParts = data.timestamp.split(":").map(Number);
      const totalSeconds = durationParts.length === 3
        ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
        : durationParts[0] * 60 + durationParts[1];

      if (totalSeconds > 1800) return reply("⏱️ Sorry, audio duration must be under 30 minutes.");

      const caption = `〲🎶 𝙽𝙾𝚆 𝙿𝙻𝙰𝚈𝙸𝙽𝙶...㋞

🖇️ *Title*     : ${song.title}
✄ *URL*        : ${url}
✨ *Duration*   : ${data.timestamp}
✰ *Uploaded*   : ${data.ago}
◲ *Views*      : ${data.views.toLocaleString()}

> 𓆩 BBH Music Style 🎧

🕊️ Plug in your headphones & feel the vibe!`;

      // Send thumbnail + caption
      await robin.sendMessage(
        from,
        {
          image: { url: song.thumbnail },
          caption: caption,
        },
        { quoted: mek }
      );

      // Send audio as PTT (voice note)
      await robin.sendMessage(
        from,
        {
          audio: { url: song.link },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

    } catch (err) {
      console.error(err);
      reply("❌ An error occurred. Please try again later.");
    }
  }
);
