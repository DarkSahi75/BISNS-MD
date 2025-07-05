const { cmd } = require("../lib/command");
const { fetchJson, getBuffer } = require("../lib/functions");

cmd(
  {
    pattern: "tt",
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




cmd(
  {
    pattern: "ttdlxz_hd",
    desc: "Download TikTok HD video (no watermark)",
    category: "download",
    react: "📽️",
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
        return reply("❌ Failed to fetch TikTok video.");
      }

      const result = res.result;
      const videoHD = result.data.find(x => x.type === "nowatermark_hd")?.url;

      if (!videoHD) {
        return reply("❌ HD video not available.");
      }

      const buffer = await getBuffer(videoHD);

      await robin.sendMessage(
        mek.key.remoteJid,
        {
          video: buffer,
          mimetype: "video/mp4",
          caption: `🎥 *TikTok HD Video*\n📝 ${result.title || "No caption"}\n🧑 @${result.author?.nickname || "unknown"}`,
        },
        { quoted: mek }
      );

    } catch (err) {
      console.error(err);
      reply("*🥲 Error while downloading TikTok HD video.*");
    }
  }
);



cmd(
  {
    pattern: "ttdlxz_sd",
    desc: "Download TikTok SD video (no watermark)",
    category: "download",
    react: "🎥",
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
        return reply("❌ Failed to fetch TikTok video.");
      }

      const result = res.result;
      const videoSD = result.data.find(x => x.type === "nowatermark")?.url;

      if (!videoSD) {
        return reply("❌ SD video not available.");
      }

      const buffer = await getBuffer(videoSD);

      await robin.sendMessage(
        mek.key.remoteJid,
        {
          video: buffer,
          mimetype: "video/mp4",
          caption: `🎬 *TikTok SD Video*\n📝 ${result.title || "No caption"}`,
        },
        { quoted: mek }
      );

    } catch (err) {
      console.error(err);
      reply("*🥲 Error while downloading TikTok SD video.*");
    }
  }
);


cmd(
  {
    pattern: "ttdlxz_mp3ptt",
    desc: "Download TikTok music/audio only",
    category: "download",
    react: "🎧",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    try {
      if (!q || (!q.includes("tiktok.com") && !q.includes("vt.tiktok.com"))) {
        return reply("*Please provide a valid TikTok link!*");
      }

      const api = `https://my-private-api-site.vercel.app/ttdlxz?url=${encodeURIComponent(q)}`;
      const res = await fetchJson(api);

      if (!res?.status || !res.result?.music_info?.url) {
        return reply("❌ Failed to fetch audio from TikTok.");
      }

      const audioUrl = res.result.music_info.url;
      const title = res.result.music_info.title || "TikTok Audio";

      const buffer = await getBuffer(audioUrl);

      await robin.sendMessage(
        mek.key.remoteJid,
        {
          audio: buffer,
          mimetype: "audio/mpeg",
          ptt: true, // change to false if you want it as normal audio
        },
        { quoted: mek }
      );

    } catch (err) {
      console.error(err);
      reply("*🥲 Error while downloading TikTok audio.*");
    }
  }
);


cmd(
  {
    pattern: "ttdlxz_mp3doc",
    desc: "Download TikTok audio as document (mp3)",
    category: "download",
    react: "🎧",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    try {
      if (!q || (!q.includes("tiktok.com") && !q.includes("vt.tiktok.com"))) {
        return reply("*Please provide a valid TikTok link!*");
      }

      const api = `https://my-private-api-site.vercel.app/ttdlxz?url=${encodeURIComponent(q)}`;
      const res = await fetchJson(api);

      if (!res?.status || !res.result?.music_info?.url) {
        return reply("❌ Failed to fetch TikTok audio.");
      }

      const audioUrl = res.result.music_info.url;
      const title = res.result.music_info.title || "TikTok Audio";

      const buffer = await getBuffer(audioUrl);

      await robin.sendMessage(
        mek.key.remoteJid,
        {
          document: buffer,
          mimetype: "audio/mpeg",
          fileName: `${title}.mp3`,
        },
        { quoted: mek }
      );

    } catch (err) {
      console.error(err);
      reply("*🥲 Error while downloading TikTok audio.*");
    }
  }
);


cmd(
  {
    pattern: "ttdlxz_mp3",
    desc: "Download TikTok audio (normal player, no PTT)",
    category: "download",
    react: "🎧",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    try {
      if (!q || (!q.includes("tiktok.com") && !q.includes("vt.tiktok.com"))) {
        return reply("*Please provide a valid TikTok link!*");
      }

      const api = `https://my-private-api-site.vercel.app/ttdlxz?url=${encodeURIComponent(q)}`;
      const res = await fetchJson(api);

      if (!res?.status || !res.result?.music_info?.url) {
        return reply("❌ Failed to fetch TikTok audio.");
      }

      const audioUrl = res.result.music_info.url;
      const title = res.result.music_info.title || "TikTok Audio";

      const buffer = await getBuffer(audioUrl);

      await robin.sendMessage(
        mek.key.remoteJid,
        {
          audio: buffer,
          mimetype: "audio/mpeg",
          ptt: false, // ✅ No voice note!
        },
        { quoted: mek }
      );

    } catch (err) {
      console.error(err);
      reply("*🥲 Error while downloading TikTok audio.*");
    }
  }
);


cmd(
  {
    pattern: "ttdlxz_hddoc",
    desc: "Download TikTok HD video (no watermark) as document",
    category: "download",
    react: "📦",
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
        return reply("❌ Failed to fetch TikTok HD video.");
      }

      const result = res.result;
      const videoHD = result.data.find(x => x.type === "nowatermark_hd")?.url;

      if (!videoHD) {
        return reply("❌ HD video not available.");
      }

      const title = result.title?.slice(0, 64).replace(/[^a-zA-Z0-9 _-]/g, "") || "tiktok_hd_video";
      const buffer = await getBuffer(videoHD);

      await robin.sendMessage(
        mek.key.remoteJid,
        {
          document: buffer,
          mimetype: "video/mp4",
          fileName: `${title}.mp4`,
        },
        { quoted: mek }
      );

    } catch (err) {
      console.error(err);
      reply("*🥲 Error while downloading TikTok HD video.*");
    }
  }
);



cmd(
  {
    pattern: "ttdlxz_sddoc",
    desc: "Download TikTok SD video (no watermark) as document",
    category: "download",
    react: "📦",
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
        return reply("❌ Failed to fetch TikTok SD video.");
      }

      const result = res.result;
      const videoSD = result.data.find(x => x.type === "nowatermark")?.url;

      if (!videoSD) {
        return reply("❌ SD video not available.");
      }

      const title = result.title?.slice(0, 64).replace(/[^a-zA-Z0-9 _-]/g, "") || "tiktok_sd_video";
      const buffer = await getBuffer(videoSD);

      await robin.sendMessage(
        mek.key.remoteJid,
        {
          document: buffer,
          mimetype: "video/mp4",
          fileName: `${title}.mp4`,
        },
        { quoted: mek }
      );

    } catch (err) {
      console.error(err);
      reply("*🥲 Error while downloading TikTok SD video.*");
    }
  }
);
