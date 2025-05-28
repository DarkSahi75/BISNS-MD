const { cmd } = require("../lib/command");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const https = require("https");

cmd({
  pattern: "yt14",
  react: "😁",
  category: "download",
  desc: "Download YouTube video in 144p with proper size",
  filename: __filename,
}, async (client, m, msg, { q, from, reply }) => {
  if (!q) return reply("🔗 YouTube ලින්ක් එකක් දාපන්!");

  try {
    let res = await axios.get(`https://yt-five-tau.vercel.app/download?q=${q}&format=144`);
    if (!res.data?.result?.download) return reply("❌ Download link එක error!");

    const videoUrl = res.data.result.download;
    const title = res.data.result.title || "YouTube Video";

    // temp path
    const filePath = path.join(__dirname, "../tmp", `${Date.now()}.mp4`);

    const file = fs.createWriteStream(filePath);
    https.get(videoUrl, (stream) => {
      stream.pipe(file);
      file.on("finish", async () => {
        file.close();

        await client.sendMessage(from, {
          video: fs.readFileSync(filePath),
          caption: `🎬 *${title}*\n📥 Downloaded in *144p (YouTube ratio)*`,
          mimetype: "video/mp4",
        }, { quoted: m });

        fs.unlinkSync(filePath); // delete after sending
      });
    });

  } catch (e) {
    reply("❌ Error එකක් ආව: " + e.message);
  }
});
