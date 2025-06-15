const axios = require("axios");
const yts = require("yt-search");
const { cmd } = require("../lib/command");

cmd(
  {
    pattern: "240ptv",
    react: "🎥",
    desc: "Download YouTube Video as PTV (240p)",
    category: "download",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }
  ) => {
    try {
      if (!q) return reply("*🎥 කරුණාකර YouTube ලින්ක් එකක් හෝ සෙව්වක් දෙන්න*");

      // Search video on YouTube
      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      // Function to download video from external API
      const downloadVideo = async (url, quality) => {
        const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${quality}&url=${encodeURIComponent(
          url
        )}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

        const response = await axios.get(apiUrl);

        if (response.data && response.data.success) {
          const { id, title } = response.data;

          // Wait for download to finish
          const progressUrl = `https://p.oceansaver.in/ajax/progress.php?id=${id}`;
          while (true) {
            const progress = await axios.get(progressUrl);
            if (progress.data.success && progress.data.progress === 1000) {
              const videoBuffer = await axios.get(progress.data.download_url, {
                responseType: "arraybuffer",
              });
              return { buffer: videoBuffer.data, title };
            }
            await new Promise((resolve) => setTimeout(resolve, 5000));
          }
        } else {
          throw new Error("❌ Video download API failed.");
        }
      };

      // Set quality to 240p
      const quality = "240";

      // Download video
      const video = await downloadVideo(url, quality);

      // Send as PTV bubble video (round)
      await robin.sendMessage(
        from,
        {
          video: video.buffer,
          mimetype: "video/mp4",
          ptv: true,
          caption: `🎬 *${video.title}*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);
