const { cmd } = require("../lib/command");
const { fetchJson, getBuffer } = require("../lib/functions");

cmd(
  {
    pattern: "ttdlxz",
    desc: "Download TikTok video using KaliYaX API",
    category: "download",
    react: "📥",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    try {
      if (!q || (!q.includes("tiktok.com") && !q.includes("vt.tiktok.com"))) {
        return reply("*Please provide a valid TikTok link!*");
      }

      const api = `https://my-private-api-site.vercel.app/ttdlxz?url=${encodeURIComponent(q)}`;
      const res = await fetchJson(api);

      if (!res?.status || !res.result?.data) {
        return reply("❌ Failed to fetch video. Try another link.");
      }

      const result = res.result;
      const videoSD = result.data.find(x => x.type === "nowatermark")?.url;
      const videoHD = result.data.find(x => x.type === "nowatermark_hd")?.url;
      const audio = result.music_info?.url;

      const caption = `*🎬 TikTok Video*

📝 *Title:* ${result.title}
🌍 *Region:* ${result.region}
🕐 *Posted:* ${result.taken_at}
🎧 *Sound:* ${result.music_info?.title || "N/A"}
👤 *Creator:* ${result.author?.fullname || "N/A"} (${result.author?.nickname || ""})

📊 *Stats:* 👁️ ${result.stats.views} | ❤️ ${result.stats.likes} | 💬 ${result.stats.comment} | 🔁 ${result.stats.share}

🔗 *No-Watermark Links Available*
`;

      const thumbnail = await getBuffer(result.cover);

      await robin.sendMessage(
        mek.key.remoteJid,
        {
          image: thumbnail,
          caption: caption,
          footer: "Choose download option below 👇",
          buttons: [
            {
              buttonId: `.ttdlxz_sd ${q}`,
              buttonText: { displayText: "🎥 Video SD" },
              type: 1,
            },
            {
              buttonId: `.ttdlxz_hd ${q}`,
              buttonText: { displayText: "📽️ Video HD" },
              type: 1,
            },
            {
              buttonId: `.ttdlxz_mp3 ${q}`,
              buttonText: { displayText: "🎧 Audio Only" },
              type: 1,
            },
          ],
          headerType: 4,
        },
        { quoted: mek }
      );
    } catch (err) {
      console.error(err);
      reply("*⚠️ Error occurred while fetching TikTok video.*");
    }
  }
);
