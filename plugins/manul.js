const { cmd } = require("../lib/command");
const { fetchJson, getBuffer } = require("../lib/functions");
const config = require("../settings"); // Make sure to include PREFIX from here
const prefix = config.PREFIX;

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
      const thumbnail = await getBuffer(result.cover);
      const tiktokUrl = result.metadata?.url || q;

      const caption = `*🎬 TikTok Video*

📝 *Title:* ${result.title}
🌍 *Region:* ${result.region}
🕐 *Posted:* ${result.taken_at}
🎧 *Sound:* ${result.music_info?.title || "N/A"}
👤 *Creator:* ${result.author?.fullname || "N/A"} (${result.author?.nickname || ""})

📊 *Stats:* 👁️ ${result.stats.views} | ❤️ ${result.stats.likes} | 💬 ${result.stats.comment} | 🔁 ${result.stats.share}`;

      const listData = {
        title: "𝐕𝐢𝐝𝐞𝐨 𝐒𝐞𝐥𝐞𝐜𝐭𝐢𝐨𝐧 ツ",
        sections: [
          {
            title: "📽️ HD ᴠɪᴅᴇᴏ ⇲",
            rows: [
              {
                title: "HD Normal Video",
                description: "〽️ade By Dinuwh Bbh",
                id: `${prefix}ttdlxz_hd ${tiktokUrl}`,
              },
              {
                title: "HD Document Video",
                description: "〽️ade By Dinuwh Bbh",
                id: `${prefix}ttdlxz_hddoc ${tiktokUrl}`,
              },
              {
                title: "HD Video Note",
                description: "〽️ade By Dinuwh Bbh",
                id: `${prefix}ttdlxz_hdptv ${tiktokUrl}`,
              },
            ],
          },
          {
            title: "💧 SD ᴠɪᴅᴇᴏ ⇲",
            rows: [
              {
                title: "SD Normal Video",
                description: "〽️ade By Dinuwh Bbh",
                id: `${prefix}ttdlxz_sd ${tiktokUrl}`,
              },
              {
                title: "SD Document Video",
                description: "〽️ade By Dinuwh Bbh",
                id: `${prefix}ttdlxz_sddoc ${tiktokUrl}`,
              },
               {
                title: "SD Video Note",
                description: "〽️ade By Dinuwh Bbh",
                id: `${prefix}ttdlxz_sdptv ${tiktokUrl}`,
              },
            ],
          },
        ],
      };

      const listData2 = {
        title: "𝐀𝐮𝐝𝐢𝐨 𝐒𝐞𝐥𝐞𝐜𝐭𝐢𝐨𝐧 ツ",
        sections: [
          {
            title: "🎧 TikTok Audio Options",
            rows: [
              {
                title: "Audio With Normal",
                description: "〽️ade By Dinuwh Bbh",
                id: `${prefix}ttdlxz_mp3 ${tiktokUrl}`,
              },
              {
                title: "Audio With Document",
                description: "〽️ade By Dinuwh Bbh",
                id: `${prefix}ttdlxz_mp3ptt ${tiktokUrl}`,
              },
              {
                title: "Audio With Voice Note",
                description: "〽️ade By Dinuwh Bbh",
                id: `${prefix}ttdlxz_mp3doc ${tiktokUrl}`,
              },
            ],
          },
        ],
      };

      await robin.sendMessage(
        mek.key.remoteJid,
        {
          image: thumbnail,
          caption: caption,
          footer: "〽️ade By Dinuwh Bbh",
          buttons: [
            {
              buttonId: "video_menu",
              buttonText: { displayText: "🎞️ Video Options" },
              type: 4,
              nativeFlowInfo: {
                name: "single_select",
                paramsJson: JSON.stringify(listData),
              },
            },
            {
              buttonId: "audio_menu",
              buttonText: { displayText: "🎧 Audio Options" },
              type: 4,
              nativeFlowInfo: {
                name: "single_select",
                paramsJson: JSON.stringify(listData2),
              },
            },
          ],
          headerType: 1,
          viewOnce: true,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
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


cmd(
  {
    pattern: "ttdlxz_hdptv",
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
          PTV: "true",
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
    pattern: "ttdlxz_sdptv",
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
          ptv: "true",
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
