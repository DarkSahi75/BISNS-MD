const { cmd } = require("../lib/command");
const axios = require("axios");
const fs = require("fs");
const { getBuffer } = require("../lib/functions");

cmd({
  pattern: "ytvlow",
  category: "download",
  desc: "Download YouTube video in 144p quality",
  filename: __filename,
}, async (client, m, msg, { q, from, reply }) => {
  if (!q) return reply("🔗 Please provide a YouTube link!");

  try {
    const waitMsg = await reply("⏳ Downloading your video... Please wait");

    // Using a more reliable API
    const apiUrl = `https://youtube-downloader-api5.vercel.app/?url=${encodeURIComponent(q)}&quality=144`;
    const res = await axios.get(apiUrl, { timeout: 60000 });

    if (!res.data?.videoUrl) {
      await waitMsg.delete();
      return reply("❌ Could not fetch download link. Try another video.");
    }

    const videoUrl = res.data.videoUrl;
    const title = res.data.title || "YouTube Video";
    const thumbnail = res.data.thumbnail || null;

    // Download with proper headers
    const videoBuffer = await axios.get(videoUrl, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'video/mp4'
      }
    }).then(res => Buffer.from(res.data));

    // Validate video length (at least 100KB)
    if (!videoBuffer || videoBuffer.length < 102400) {
      await waitMsg.delete();
      return reply("❌ Downloaded video is too small or corrupted");
    }

    // Temporary save to file for validation
    const tempFile = `./temp_${Date.now()}.mp4`;
    fs.writeFileSync(tempFile, videoBuffer);

    // Send as document if video sending fails
    const sendAsDocument = async () => {
      await client.sendMessage(from, {
        document: fs.readFileSync(tempFile),
        fileName: `${title.substring(0, 50)}_144p.mp4`,
        mimetype: 'video/mp4',
        caption: `🎬 ${title}\n📥 Quality: 144p (sent as document)`
      }, { quoted: m });
      fs.unlinkSync(tempFile);
    };

    try {
      await client.sendMessage(from, {
        video: fs.readFileSync(tempFile),
        caption: `🎬 ${title}\n📥 Quality: 144p`,
        ...(thumbnail ? { thumbnail: await getBuffer(thumbnail) } : {}),
        mimetype: 'video/mp4'
      }, { quoted: m });
      fs.unlinkSync(tempFile);
    } catch (e) {
      console.log("Video send failed, trying as document", e);
      await sendAsDocument();
    }

    await waitMsg.delete();

  } catch (e) {
    console.error("YT144 Error:", e);
    reply(`❌ Error: ${e.message || "Failed to process video"}`);
    try { fs.unlinkSync(tempFile); } catch {} // Cleanup
  }
});
