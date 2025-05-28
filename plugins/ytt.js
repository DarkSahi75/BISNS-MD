const { cmd } = require("../command");
const axios = require("axios");

cmd({
  pattern: "ytt144",
  category: "download",
  desc: "Download YouTube 144p Video",
  filename: __filename,
}, async (robin, m, msg, { q, from, reply }) => {
  if (!q) return reply("🔗 *ඔයාලා YouTube ලින්ක් එකක් දාන්න!*");

  try {
    const { data } = await axios.get(`https://yt-five-tau.vercel.app/download?q=${q}&format=144`);
    if (!data?.result?.download) return reply("❌ Video link එක ගන්න බැරි වුණා!");

    await robin.sendMessage(from, {
      video: { url: data.result.download },
      caption: `🎬 *${data.result.title}*\n\n🔻 Uploaded in 144p landscape mode.`,
      mimetype: "video/mp4",
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    reply("😓 *Error එකක් ආවා!* ➤ " + e.message);
  }
});
