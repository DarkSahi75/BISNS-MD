const { cmd } = require("../lib/command");
const yts = require("yt-search");
const axios = require("axios");
const config = require("../settings");

cmd(
  {
    pattern: "144v",
    react: "🎥",
    desc: "Download YouTube Video",
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
      if (!q) return reply("*Provide a name or a YouTube link.* 🎥❤️");

      // Search for the video
      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      // Video download function
      const downloadVideo = async (url, quality) => {
        const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${quality}&url=${encodeURIComponent(
          url
        )}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

        const response = await axios.get(apiUrl);

        if (response.data && response.data.success) {
          const { id, title } = response.data;

          // Wait for download URL generation
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
          throw new Error("Failed to fetch video details.");
        }
      };

      // Specify desired quality
      const quality = "144";

      // Download and send video only
      const video = await downloadVideo(url, quality);
      await robin.sendMessage(
        from,
        {
          video: video.buffer,
          caption: `🎥 *${video.title}*`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);

//==========================*=*=*=*--*-*=*=*-*==*=**=*=*==*==*=*=*=*=*=

cmd(
  {
    pattern: "240v",
    react: "🎥",
    desc: "Download YouTube Video",
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
      if (!q) return reply("*Provide a name or a YouTube link.* 🎥❤️");

      // Search for the video
      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      // Video download function
      const downloadVideo = async (url, quality) => {
        const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${quality}&url=${encodeURIComponent(
          url
        )}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

        const response = await axios.get(apiUrl);

        if (response.data && response.data.success) {
          const { id, title } = response.data;

          // Wait for download URL generation
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
          throw new Error("Failed to fetch video details.");
        }
      };

      // Specify desired quality
      const quality = "240";

      // Download and send video only
      const video = await downloadVideo(url, quality);
      await robin.sendMessage(
        from,
        {
          video: video.buffer,
          caption: `🎥 *${video.title}*`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);

//==========================*=*=*=*--*-*=*=*-*==*=**=*=*==*==*=*=*=*=*=
cmd(
  {
    pattern: "360v",
    react: "🎥",
    desc: "Download YouTube Video",
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
      if (!q) return reply("*Provide a name or a YouTube link.* 🎥❤️");

      // Search for the video
      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      // Video download function
      const downloadVideo = async (url, quality) => {
        const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${quality}&url=${encodeURIComponent(
          url
        )}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

        const response = await axios.get(apiUrl);

        if (response.data && response.data.success) {
          const { id, title } = response.data;

          // Wait for download URL generation
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
          throw new Error("Failed to fetch video details.");
        }
      };

      // Specify desired quality
      const quality = "360";

      // Download and send video only
      const video = await downloadVideo(url, quality);
      await robin.sendMessage(
        from,
        {
          video: video.buffer,
          caption: `🎥 *${video.title}*`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);

//==*=6=6.06=6.066=6.066=6.0666=6.06666=6.06666*=*=*==*=*=*=*=6=6.06=6.06=6.066=6.0666=6.06666=6.06666*=*==*=

cmd(
  {
    pattern: "480v",
    react: "🎥",
    desc: "Download YouTube Video",
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
      if (!q) return reply("*Provide a name or a YouTube link.* 🎥❤️");

      // Search for the video
      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      // Video download function
      const downloadVideo = async (url, quality) => {
        const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${quality}&url=${encodeURIComponent(
          url
        )}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

        const response = await axios.get(apiUrl);

        if (response.data && response.data.success) {
          const { id, title } = response.data;

          // Wait for download URL generation
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
          throw new Error("Failed to fetch video details.");
        }
      };

      // Specify desired quality
      const quality = "480";

      // Download and send video only
      const video = await downloadVideo(url, quality);
      await robin.sendMessage(
        from,
        {
          video: video.buffer,
          caption: `🎥 *${video.title}*`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);


//=$==%=&=55=55.06=55.066=55.0666=55.0666=55.06666=55.066666=55.0666666=55.06666666=55.066666666=55.06666666666=55.06666666666

cmd(
  {
    pattern: "720v",
    react: "🎥",
    desc: "Download YouTube Video",
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
      if (!q) return reply("*Provide a name or a YouTube link.* 🎥❤️");

      // Search for the video
      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      // Video download function
      const downloadVideo = async (url, quality) => {
        const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${quality}&url=${encodeURIComponent(
          url
        )}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

        const response = await axios.get(apiUrl);

        if (response.data && response.data.success) {
          const { id, title } = response.data;

          // Wait for download URL generation
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
          throw new Error("Failed to fetch video details.");
        }
      };

      // Specify desired quality
      const quality = "720";

      // Download and send video only
      const video = await downloadVideo(url, quality);
      await robin.sendMessage(
        from,
        {
          video: video.buffer,
          caption: `🎥 *${video.title}*`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);

//=$==$=$=%=%==%=%=%($(($93($($(=3=3.04=3.04=3.044=3.0444=3.04444=3.044444=3.04444=3.04444
cmd(
  {
    pattern: "1080v",
    react: "🎥",
    desc: "Download YouTube Video",
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
      if (!q) return reply("*Provide a name or a YouTube link.* 🎥❤️");

      // Search for the video
      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      // Video download function
      const downloadVideo = async (url, quality) => {
        const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${quality}&url=${encodeURIComponent(
          url
        )}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

        const response = await axios.get(apiUrl);

        if (response.data && response.data.success) {
          const { id, title } = response.data;

          // Wait for download URL generation
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
          throw new Error("Failed to fetch video details.");
        }
      };

      // Specify desired quality
      const quality = "1080";

      // Download and send video only
      const video = await downloadVideo(url, quality);
      await robin.sendMessage(
        from,
        {
          video: video.buffer,
          caption: `🎥 *${video.title}*`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);


//=$=$-$===Document-Type

cmd(
  {
    pattern: "144vd",
    react: "🎥",
    desc: "Download YouTube Video",
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
      if (!q) return reply("*📥 Please provide a name or a YouTube link.*");

      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      const downloadVideo = async (url, quality) => {
        const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${quality}&url=${encodeURIComponent(
          url
        )}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

        const response = await axios.get(apiUrl);

        if (response.data && response.data.success) {
          const { id, title } = response.data;
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
          throw new Error("📛 Failed to fetch video details.");
        }
      };

      const quality = "144";
      const video = await downloadVideo(url, quality);

      await robin.sendMessage(
        from,
        {
          document: video.buffer,
          mimetype: "video/mp4",
          fileName: `${video.title}.mp4`,
          caption: `🎥 *${video.title}*\n\n*MADE BY - DINUWH-MD🖇️*`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);

//=%=%=-%=%=%=%==3=3.0$==$=%=%=%=%==3=3.03=3.03=3.033=3.0333=3.03333=3.033333=3.033333

cmd(
  {
    pattern: "240vd",
    react: "🎥",
    desc: "Download YouTube Video",
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
      if (!q) return reply("*📥 Please provide a name or a YouTube link.*");

      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      const downloadVideo = async (url, quality) => {
        const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${quality}&url=${encodeURIComponent(
          url
        )}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

        const response = await axios.get(apiUrl);

        if (response.data && response.data.success) {
          const { id, title } = response.data;
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
          throw new Error("📛 Failed to fetch video details.");
        }
      };

      const quality = "240";
      const video = await downloadVideo(url, quality);

      await robin.sendMessage(
        from,
        {
          document: video.buffer,
          mimetype: "video/mp4",
          fileName: `${video.title}.mp4`,
          caption: `🎥 *${video.title}*\n\n*MADE BY - DINUWH-MD🖇️*`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);

//=$=$=$$=$94=94.0=94.04=94.04=94.04=94.044=94.044=94.0444=94.04444=94.04444=94.044444=94.044444

cmd(
  {
    pattern: "360vd",
    react: "🎥",
    desc: "Download YouTube Video",
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
      if (!q) return reply("*📥 Please provide a name or a YouTube link.*");

      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      const downloadVideo = async (url, quality) => {
        const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${quality}&url=${encodeURIComponent(
          url
        )}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

        const response = await axios.get(apiUrl);

        if (response.data && response.data.success) {
          const { id, title } = response.data;
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
          throw new Error("📛 Failed to fetch video details.");
        }
      };

      const quality = "360";
      const video = await downloadVideo(url, quality);

      await robin.sendMessage(
        from,
        {
          document: video.buffer,
          mimetype: "video/mp4",
          fileName: `${video.title}.mp4`,
          caption: `🎥 *${video.title}*\n\n*MADE BY - DINUWH-MD🖇️*`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);

//-$=3=3.03=3.03=3.033=3.033=3.033=2=2.02=2.022=2.0222=2.0222

cmd(
  {
    pattern: "480vd",
    react: "🎥",
    desc: "Download YouTube Video",
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
      if (!q) return reply("*📥 Please provide a name or a YouTube link.*");

      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      const downloadVideo = async (url, quality) => {
        const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${quality}&url=${encodeURIComponent(
          url
        )}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

        const response = await axios.get(apiUrl);

        if (response.data && response.data.success) {
          const { id, title } = response.data;
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
          throw new Error("📛 Failed to fetch video details.");
        }
      };

      const quality = "480";
      const video = await downloadVideo(url, quality);

      await robin.sendMessage(
        from,
        {
          document: video.buffer,
          mimetype: "video/mp4",
          fileName: `${video.title}.mp4`,
          caption: `🎥 *${video.title}*\n\n*MADE BY - DINUWH-MD🖇️*`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);

//=33=3.03=3.03=3.033=3.033=3.0333=3.03333=3.033333=3.033333=3.0333333=3.03333333=3.033333333=3.033333333==

cmd(
  {
    pattern: "720vd",
    react: "🎥",
    desc: "Download YouTube Video",
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
      if (!q) return reply("*📥 Please provide a name or a YouTube link.*");

      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      const downloadVideo = async (url, quality) => {
        const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${quality}&url=${encodeURIComponent(
          url
        )}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

        const response = await axios.get(apiUrl);

        if (response.data && response.data.success) {
          const { id, title } = response.data;
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
          throw new Error("📛 Failed to fetch video details.");
        }
      };

      const quality = "720";
      const video = await downloadVideo(url, quality);

      await robin.sendMessage(
        from,
        {
          document: video.buffer,
          mimetype: "video/mp4",
          fileName: `${video.title}.mp4`,
          caption: `🎥 *${video.title}*\n\n*MADE BY - DINUWH-MD🖇️*`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);


//=3=3.03=3.033=3.033=3.033=3.0333=3.03333=3.033333=3.0333333=3.03333333=3.03333333


cmd(
  {
    pattern: "1080vd",
    react: "🎥",
    desc: "Download YouTube Video",
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
      if (!q) return reply("*📥 Please provide a name or a YouTube link.*");

      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      const downloadVideo = async (url, quality) => {
        const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${quality}&url=${encodeURIComponent(
          url
        )}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

        const response = await axios.get(apiUrl);

        if (response.data && response.data.success) {
          const { id, title } = response.data;
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
          throw new Error("📛 Failed to fetch video details.");
        }
      };

      const quality = "1080";
      const video = await downloadVideo(url, quality);

      await robin.sendMessage(
        from,
        {
          document: video.buffer,
          mimetype: "video/mp4",
          fileName: `${video.title}.mp4`,
          caption: `🎥 *${video.title}*\n\n*MADE BY - DINUWH-MD🖇️*`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);

//VideoDownload Main


cmd({
  pattern: "normalv",
  alias: "song",
  react: "🎵",
  desc: "Download Song",
  category: "download",
  filename: __filename,
}, async (robin, mek, m, { from, q, prefix, reply }) => {
  try {
    if (!q) return reply("\`Give Me SONG NAME OR LINK || නමක් දියන්😓❤️\`");

    const search = await yts(q);
    if (!search.videos.length) return reply("\`❌ Video not found!\`");
    const data = search.videos[0];

    const cap = `\`乂 Ｄ𝚒ｎｕｗｈ Чт Ｄｏｗｎ⟩⟩⟩\`
╭────────✦✧✦────────╯

* \`✦ 𝚃𝚒𝚝𝚕𝚎\`     :  _*${data.title}*_
\`╭───────────────✿\` 
* *Same The Old Details 😴🖇️*
\`╰───────────────✿\`
╭───────────────✿  
│ *Select You Want Video quality* 🧚‍♂️
│ *ඔබට අවශ්‍ය වීඩියෝ ණාත්මක තත්වය තෝරන්න 😴🖇️*
╰───────────────✿`;

    // ✳️ If nonbutton mode
if (config.MODE === 'nonbutton') {
  const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: `${prefix}144v ${data.url}`, description: '\`❲ 144p Normal Video File ❳\` 📽️'},
	    {title: "2", rowId: `${prefix}240v ${data.url}`, description: '\`❲ 240p Normal Video File ❳\` 📽️'} ,
      {title: "3", rowId: `${prefix}360v ${data.url}`, description: '\`❲ 360p Normal Video File ❳\` 📽️'} ,
      {title: "4", rowId: `${prefix}480v ${data.url}`, description: '\`❲ 480p Normal Video File ❳\` 📽️'} ,
      {title: "5", rowId: `${prefix}720v ${data.url}`, description: '\`❲ 720p Normal Video File ❳\` 📽️'} ,
      {title: "6", rowId: `${prefix}1080v ${data.url}`, description: '\`❲ 1080 Normal Video File ❳\` 📽️'} ,
	]
    } 
]
const listMessage = {
caption: cap,
image: { url: data.thumbnail },  // <-- use YouTube thumbnail here
footer: '> 〽️ade By Dinuwh Bbh',
title: '',
buttonText: '> *◎Power Full Whatsapp bot Make By Dinuwh◎*',
sections
}
	
return await robin.replyList(from, listMessage ,{ quoted : mek })

	//button
} if (config.MODE === 'button') {
      const listData = {
        title: "◎ 𝙲𝙷𝙾𝙾𝚂 𝚀𝚄𝙰𝙻𝙸𝚃𝚈 ◎",
        sections: [{
          title: "◎ Document Video OPTIONS ◎",
          rows: [
            {
              title: "\`❲ 144p Normal Video File ❳\` 📄",
              description: "Download as 144p\n〽️ade By Dinuwh Bbh",
              id: `${prefix}144v ${data.url}`
            },
            {
              title: "\`❲ 240p Normal Video File ❳\` 📄",
              description: "Download as 240p\n〽️ade By Dinuwh Bbh",
              id: `${prefix}240v ${data.url}`
            },
            {
              title: "\`❲ 360p Normal Video File ❳\` 📄",
              description: "Download as 360p\n〽️ade By Dinuwh Bbh",
              id: `${prefix}360v ${data.url}`
            },
            {
              title: "\`❲ 480p Normal Video File ❳\` 📄",
              description: "Download as 480p\n〽️ade By Dinuwh Bbh",
              id: `${prefix}480v ${data.url}`
            },
            {
              title: "\`❲ 720p Normal Video File ❳\` 📄",
              description: "Download as 720p\n〽️ade By Dinuwh Bbh",
              id: `${prefix}720v ${data.url}`
            },
	   {
              title: "\`❲ 1080p Normal Video File ❳\` 📄",
              description: "Download as 1080p\n〽️ade By Dinuwh Bbh",
              id: `${prefix}1080v ${data.url}`
            },
          ]
        }]
      };

      return await robin.sendMessage(from, {
        image: { url: data.thumbnail },
        caption: cap,
        footer: "> 〽️ade By Dinuwh Bbh",
        buttons: [
          
            {
                    buttonId: `${prefix}ping`,
                    buttonText: {
                        displayText: '\`CHECK BOT PING 📍\`'
                    },
                },	
            ],
            headerType: 1,
            viewOnce: true
        }, {
            quoted: m
        });
        

}


	
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})





//==$=3=3.03=3.032=3.0322=3.0322=3.03222=3.032222=3.032222

cmd({
  pattern: "documentv",
  //alias: "song",
  react: "🎵",
  desc: "Download Song",
  category: "download",
  filename: __filename,
}, async (robin, mek, m, { from, q, prefix, reply }) => {
  try {
    if (!q) return reply("\`Give Me SONG NAME OR LINK || නමක් දියන්😓❤️\`");

    const search = await yts(q);
    if (!search.videos.length) return reply("\`❌ Video not found!\`");
    const data = search.videos[0];

    const cap = `\`乂 Ｄ𝚒ｎｕｗｈ Чт Ｄｏｗｎ⟩⟩⟩\`
╭────────✦✧✦────────╯

* \`✦ 𝚃𝚒𝚝𝚕𝚎\`     :  _*${data.title}*_
\`╭───────────────✿\` 
* *Same The Old Details 😴🖇️*
\`╰───────────────✿\`
╭───────────────✿  
│ *Select You Want Video quality* 🧚‍♂️
│ *ඔබට අවශ්‍ය වීඩියො ගුණාත්මක තත්වය තෝරන්න 😴🖇️*
╰───────────────✿`;

    // ✳️ If nonbutton mode
if (config.MODE === 'nonbutton') {
  const sections = [
    {
	title: "",
	rows: [
      {title: "1", rowId: `${prefix}144vd ${data.url}`, description: '\`❲ 144p Document Video File ❳\` 📄'},
      {title: "2", rowId: `${prefix}240vd ${data.url}`, description: '\`❲ 240p Document Video File ❳\` 📄'} ,
      {title: "3", rowId: `${prefix}360vd ${data.url}`, description: '\`❲ 360p Document Video File ❳\` 📄'} ,
      {title: "4", rowId: `${prefix}480vd ${data.url}`, description: '\`❲ 480p Document Video File ❳\` 📄'} ,
      {title: "5", rowId: `${prefix}720vd ${data.url}`, description: '\`❲ 720p Document Video File ❳\` 📄'} ,
      {title: "6", rowId: `${prefix}1080vd ${data.url}`, description: '\`❲ 1080p Document Video File ❳\` 📄'} ,
	]
    } 
]
const listMessage = {
caption: cap,
image: { url: data.thumbnail },  // <-- use YouTube thumbnail here
footer: '> 〽️ade By Dinuwh Bbh',
title: '',
buttonText: '> *◎Power Full Whatsapp bot Make By Dinuwh◎*',
sections
}
	
return await robin.replyList(from, listMessage ,{ quoted : mek })

	//button
}if (config.MODE === 'button') {

  // Quality Selection List
  const listMessage = {
    text: "◎ 𝙲𝙷𝙾𝙾𝚂 𝚀𝚄𝙰𝙻𝙸𝚃𝚈 ◎",
    footer: "〽️ade By Dinuwh Bbh",
    title: "🎞️ Video Quality Selector",
    buttonText: "📥 CLICK HERE TO SELECT",
    sections: [
      {
        title: "◎ Document Video OPTIONS ◎",
        rows: [
          {
            title: "`❲ 144p Document Video File ❳` 📄",
            description: "Download as 144p\n〽️ade By Dinuwh Bbh",
            rowId: `${prefix}144vd ${data.url}`
          },
          {
            title: "`❲ 240p Document Video File ❳` 📄",
            description: "Download as 240p\n〽️ade By Dinuwh Bbh",
            rowId: `${prefix}240vd ${data.url}`
          },
          {
            title: "`❲ 360p Document Video File ❳` 📄",
            description: "Download as 360p\n〽️ade By Dinuwh Bbh",
            rowId: `${prefix}360vd ${data.url}`
          },
          {
            title: "`❲ 480p Document Video File ❳` 📄",
            description: "Download as 480p\n〽️ade By Dinuwh Bbh",
            rowId: `${prefix}480vd ${data.url}`
          },
          {
            title: "`❲ 720p Document Video File ❳` 📄",
            description: "Download as 720p\n〽️ade By Dinuwh Bbh",
            rowId: `${prefix}720vd ${data.url}`
          },
          {
            title: "`❲ 1080p Document Video File ❳` 📄",
            description: "Download as 1080p\n〽️ade By Dinuwh Bbh",
            rowId: `${prefix}1080vd ${data.url}`
          }
        ]
      }
    ]
  }

  // Send Thumbnail + Caption + Ping Button
  await robin.sendMessage(from, {
    image: { url: data.thumbnail },
    caption: cap,
    footer: "〽️ade By Dinuwh Bbh",
    buttons: [
      {
        buttonId: `${prefix}ping`,
        buttonText: {
          displayText: '`CHECK BOT PING 📍`'
        },
        type: 1
      }
    ],
    headerType: 4, // 4 = Image Message with Buttons
    viewOnce: true
  }, { quoted: m });

  // Then send Selector List
  return await robin.sendMessage(from, listMessage, { quoted: m });

}
