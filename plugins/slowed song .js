const { cmd } = require("../command");
const config = require("../settings");
const yts = require("yt-search");
const { fetchJson } = require("../lib/functions");

cmd(
  {
    pattern: "slowed",
    alias: ["slowerb"],
    desc: "Send song as PTT with styled details and thumbnail",
    category: "download",
    react: "🎧",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    try {
      if (!q) return reply("*ඔයාලා ගීත නමක් හෝ YouTube ලින්ක් එකක් දෙන්න...!*");

      const search = await yts(q);
      if (!search.videos.length) return reply("*ගීතය හමුනොවුණා... ❌*");

      const data = search.videos[0];
      const title = data.title;
      const timestamp = data.timestamp;
      const ago = data.ago;
      const ytUrl = data.url;
      const thumbnail = data.thumbnail;
      const views = data.views;

      // API Call
      const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(
        ytUrl
      )}&apikey=Manul-Official`;

      const res = await fetchJson(api);

      if (!res?.status || !res?.data?.url) {
        return reply("❌ ගීතය බාගත කළ නොහැක. වෙනත් එකක් උත්සහ කරන්න!");
      }

      const audioUrl = res.data.url;

      // 🟢 Exact styled caption (as you showed)
      const styledCaption = `
\`🫐 ᴛɪᴛʟᴇ :\` *${title}*

\`🪲 ᴠɪᴇᴡꜱ :\` *${views}*          \`🔖ᴜᴘʟᴏᴀᴅᴇᴅ :\` *${ago}*

\`00:00 ────○─────── ${timestamp}\`


> 🫟 *Slowed සින්දු 🍃😽💗"*
`;

      // Send image + caption
      await robin.sendMessage(
        config.SLOWED || mek.key.remoteJid,
        {
          image: { url: thumbnail },
          caption: styledCaption,
        },
        { quoted: mek }
      );

      // Send audio as PTT
      await robin.sendMessage(
        config.SLOWED || mek.key.remoteJid,
        {
          audio: { url: audioUrl },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // Confirmation to sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${title}"* නම් ගීතය සාර්ථකව *${config.BOTNAME || "channel එකට"}* යවලා තියෙන්නෙ.`,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error(e);
      reply("*😓 උණුසුම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);
