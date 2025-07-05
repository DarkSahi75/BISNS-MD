const { cmd } = require("../lib/command");
const axios = require("axios");
const config = require("../settings");

cmd(
  {
    pattern: "kaliyaopus", // 🔊 New command
    desc: "Download MP3 from YouTube and send to user",
    category: "download",
    react: "🎧",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    try {
      if (!q || (!q.includes("youtube.com") && !q.includes("youtu.be")))
        return reply("*YouTube ලින්ක් එකක් හරි ගීත නමක් හරි දෙන්න!*");

      const apiURL = `https://kaliyax-api.vercel.app/api/ytmp3dl?url=${encodeURIComponent(q)}`;
      const { data: res } = await axios.get(apiURL);

      if (!res?.status || !res.data?.dl_url) {
        return reply("❌ ගීතය බාගත කළ නොහැක. වෙනත් එකක් උත්සහ කරන්න!");
      }

      const meta = res.data.metadata;
      const result = {
        title: meta.title,
        thumbnail: meta.thumbnail,
        download: res.data.dl_url,
        ago: meta.ago,
        timestamp: meta.duration.timestamp,
      };

      const caption = `*${result.title}*

\`◊. Date :* ${result.ago}\`    \`◊. Time :* ${result.timestamp}\`

* *ලස්සන රියැක්ට් ඕනී ...💗😽🍃*

> *🫟🎶මනෝපාර | Music ᥫ᭡|🇱🇰*`;

      // 🖼️ Send thumbnail + caption to sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          image: { url: result.thumbnail },
          caption: caption,
        },
        { quoted: mek }
      );

      // 🎧 Send voice note to sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          audio: { url: result.download },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply("*😓 දෙයක් වැරදිලා... නැවත උත්සහ කරන්න!*");
    }
  }
);
