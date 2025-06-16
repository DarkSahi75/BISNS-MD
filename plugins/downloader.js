const axios = require("axios");
const { cmd } = require('../lib/command');
const { fetchJson } = require('../lib/functions');
const config = require('../settings');

const apikey = `edbcfabbca5a9750`;

// Instagram Downloader Command with menu options
cmd({
  pattern: "ig",
  react: "📸",
  alias: ["insta", "instadl", "instagram"],
  desc: "Download Instagram Reel or Video",
  category: "download",
  use: ".instagram <instagram_url>",
  filename: __filename,
}, async (conn, mek, m, { from, prefix, q, reply }) => {
  try {
    if (!q || !q.includes("instagram.com")) {
      return reply("Please provide a valid Instagram URL.\nExample: .instagram https://www.instagram.com/reel/xyz/");
    }

    const res = await fetchJson(`https://api-dark-shan-yt.koyeb.app/download/instagram?url=${encodeURIComponent(q)}&apikey=${apikey}`);

    if (!res.status || !res.data || !res.data.url || !res.data.url[0]) {
      return reply("Video not found or cannot be downloaded.");
    }

    const videoUrl = res.data.url[0].url;
    const title = res.data.meta?.title || "Instagram Video";
    const username = res.data.meta?.username || "unknown";
    const thumb = res.data.thumb;

    const caption = `*Instagram Downloader*\n\n`
      + `*📝 Title:* ${title}\n`
      + `*👤 User:* @${username}\n`
      + `*🔗 Url:* ${q}`;

    if (config.MODE === 'nonbutton') {
      const sections = [
        {
          title: "📹 Video With Watermark",
          rows: [
            { title: "1. Normal Video", rowId: `${prefix}igvwm ${q}`, description: "With Watermark - Normal Video" },
            { title: "2. Document Video", rowId: `${prefix}igvwmdoc ${q}`, description: "With Watermark - Document" }
          ]
        },
        {
          title: "🎞️ Video No Watermark",
          rows: [
            { title: "3. Normal Video", rowId: `${prefix}igvnowm ${q}`, description: "No Watermark - Normal Video" },
            { title: "4. Document Video", rowId: `${prefix}igvnowmdoc ${q}`, description: "No Watermark - Document" }
          ]
        },
        {
          title: "🎧 Audio Options",
          rows: [
            { title: "5. Audio Normal File", rowId: `${prefix}igaud ${q}`, description: "Audio Normal File" },
            { title: "6. Audio Document File", rowId: `${prefix}igauddoc ${q}`, description: "Audio Document" },
            { title: "7. Audio Voice Note", rowId: `${prefix}igaudptt ${q}`, description: "Audio Voice Note" }
          ]
        }
      ];
      const listMessage = {
        caption,
        image: { url: thumb },
        footer: '> 〽️ade By Dinuwh Bbh',
        title: '',
        buttonText: '> Reply Below Number',
        sections
      };

      return await conn.replyList(from, listMessage, { quoted: mek });
    }

    if (config.MODE === 'button') {
      const listData = {
        title: "Video Selection",
        sections: [
          {
            title: "Non-Watermark Video Downloader",
            rows: [
              { title: "Normal Video", id: `${prefix}igvnowm ${q}`, description: "No Watermark Normal Video" },
              { title: "Document Video", id: `${prefix}igvnowmdoc ${q}`, description: "No Watermark Document Video" }
            ]
          },
          {
            title: "Video Note Downloader",
            rows: [
              { title: "Video Note", id: `${prefix}igvp ${q}`, description: "Video Note Type" }
            ]
          }
        ]
      };

      await conn.sendMessage(from, {
        text: "Choose a download type below ⬇️",
        buttonText: "🔘 Choose Download Type",
        sections: listData.sections
      }, { quoted: mek });
    }

  } catch (e) {
    console.error(e);
    reply("❌ Error occurred: " + e.message);
  }
});

// Directly send Instagram video normal
cmd({
  pattern: "igvnowm",
  desc: "Send Instagram video normal no watermark",
  category: "download",
  filename: __filename,
}, async (conn, mek, m, { q, reply }) => {
  try {
    if (!q || !q.includes("instagram.com")) {
      return reply("Please provide a valid Instagram URL.\nExample: .igvnowm https://www.instagram.com/reel/xyz/");
    }

    const res = await fetchJson(`https://api-dark-shan-yt.koyeb.app/download/instagram?url=${encodeURIComponent(q)}&apikey=${apikey}`);

    if (!res.status || !res.data || !res.data.url || !res.data.url[0]) {
      return reply("Video not found or cannot be downloaded.");
    }

    const videoUrl = res.data.url[0].url;

    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      mimetype: 'video/mp4',
      caption: '*Instagram Video*'
    }, { quoted: mek });

  } catch (e) {
    console.error(e);
    reply("❌ Failed to download Instagram video.");
  }
});

// Document send for Instagram video no watermark
cmd({
  pattern: "igvnowmdoc",
  desc: "Send Instagram video as document no watermark",
  category: "download",
  filename: __filename,
}, async (conn, mek, m, { q, reply }) => {
  try {
    if (!q || !q.includes("instagram.com")) {
      return reply("Please provide a valid Instagram URL.\nExample: .igvnowmdoc https://www.instagram.com/reel/xyz/");
    }

    const res = await fetchJson(`https://api-dark-shan-yt.koyeb.app/download/instagram?url=${encodeURIComponent(q)}&apikey=${apikey}`);

    if (!res.status || !res.data || !res.data.url || !res.data.url[0]) {
      return reply("Video not found or cannot be downloaded.");
    }

    const videoUrl = res.data.url[0].url;

    await conn.sendMessage(m.chat, {
      document: { url: videoUrl },
      fileName: `instagram_${Date.now()}.mp4`,
      mimetype: 'video/mp4',
      caption: '*Instagram Video Document*'
    }, { quoted: mek });

  } catch (e) {
    console.error(e);
    reply("❌ Failed to download Instagram video document.");
  }
});

// Video note
cmd({
  pattern: "igvp",
  desc: "Send Instagram video as push-to-video",
  category: "download",
  filename: __filename,
}, async (conn, mek, m, { q, reply }) => {
  try {
    if (!q || !q.includes("instagram.com")) {
      return reply("Please provide a valid Instagram URL.\nExample: .igvp https://www.instagram.com/reel/xyz/");
    }

    const res = await fetchJson(`https://api-dark-shan-yt.koyeb.app/download/instagram?url=${encodeURIComponent(q)}&apikey=${apikey}`);

    if (!res.status || !res.data || !res.data.url || !res.data.url[0]) {
      return reply("Video not found or cannot be downloaded.");
    }

    const videoUrl = res.data.url[0].url;

    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      mimetype: 'video/mp4',
      ptv: true,
    }, { quoted: mek });

  } catch (e) {
    console.error(e);
    reply("❌ Failed to download Instagram video as video note.");
  }
});

// Audio normal
cmd({
  pattern: "igaud",
  desc: "Send Instagram audio normal file",
  category: "audio",
  filename: __filename,
}, async (conn, mek, m, { q, reply }) => {
  try {
    if (!q || !q.includes("http")) return reply("MP3 URL needed!");

    await conn.sendMessage(m.chat, {
      audio: { url: q },
      mimetype: 'audio/mpeg',
    }, { quoted: mek });

  } catch (e) {
    console.error(e);
    reply("❌ Cannot send MP3 audio.");
  }
});

// Audio document
cmd({
  pattern: "igauddoc",
  desc: "Send Instagram audio as document",
  category: "audio",
  filename: __filename,
}, async (conn, mek, m, { q, reply }) => {
  try {
    if (!q || !q.includes("http")) return reply("MP3 URL needed!");

    await conn.sendMessage(m.chat, {
      document: { url: q },
      mimetype: 'audio/mpeg',
      fileName: `audio_${Date.now()}.mp3`,
      caption: 'MP3 Audio Document'
    }, { quoted: mek });

  } catch (e) {
    console.error(e);
    reply("❌ Cannot send MP3 audio document.");
  }
});

// Audio voice note
cmd({
  pattern: "igaudptt",
  desc: "Send Instagram audio as voice note (PTT)",
  category: "audio",
  filename: __filename,
}, async (conn, mek, m, { q, reply }) => {
  try {
    if (!q || !q.includes("http")) return reply("MP3 URL needed!");

    await conn.sendMessage(m.chat, {
      audio: { url: q },
      mimetype: 'audio/mpeg',
      ptt: true,
    }, { quoted: mek });

  } catch (e) {
    console.error(e);
    reply("❌ Cannot send MP3 voice note.");
  }
});
