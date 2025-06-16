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

    // ✳️ If nonbutton mode
if (config.MODE === 'nonbutton') {
  const sections = [
  {
    title: "📹 𝐕𝐢𝐝𝐞𝐨 𝐖𝐢𝐭𝐡 𝐖𝐚𝐭𝐞𝐫𝐦𝐚𝐫𝐤",
    rows: [
      {
        title: "1.",
        rowId: `${prefix}tikwm }`,
        description: '`❲ With Watermark Normal ❳` 📹'
      },
      {
        title: "2.",
        rowId: `${prefix}tikwmdoc }`,
        description: '`❲ With Watermark Document ❳` 📄'
      }
    ] },
  {
    title: "🎞️ 𝐕𝐢𝐝𝐞𝐨 𝐍𝐨 𝐖𝐚𝐭𝐞𝐫𝐦𝐚𝐫𝐤",
    rows: [
      {
        title: "3.",
        rowId: `${prefix}tiknowm }`,
        description: '`❲ No Watermark Normal ❳` 📹'
      },
      {
        title: "4.",
        rowId: `${prefix}tiknowmdoc {}`,
        description: '`❲ No Watermark Document ❳` 📄'
      }
    ]
  },
  {
    title: "🎧 𝐀𝐮𝐝𝐢𝐨 𝐎𝐩𝐭𝐢𝐨𝐧𝐬",
    rows: [
      {
        title: "5.",
        rowId: `${prefix}tikaud }`,
        description: '`❲ Audio With Normal File ❳` 🎵'
      },
      {
        title: "6.",
        rowId: `${prefix}tikauddoc }`,
        description: '`❲ Audio With Document File ❳` 📄'
      },
      {
        title: "7.",
        rowId: `${prefix}tikaudptt {}`,
        description: '`❲ Audio With Voice Note ❳` 🎤'
      }
    ]
  }
];
const listMessage = {
caption: caption,
image: { url: thumb },  // <-- use YouTube thumbnail here
footer: '> *〽️ade By Dinuwh Bbh*',
title: '',
buttonText: '> *◎Reply Below Number ⇲◎*',
sections
}
	
return await conn.replyList(from, listMessage ,{ quoted : mek })

	//button
} if (config.MODE === 'button') {
      const listData = {
  title: "𝐕𝐢𝐝𝐞𝐨 𝐒𝐞𝐥𝐞𝐜𝐭𝐢𝐨𝐧 ツ",
  sections: [
    {
      title: "📽️ Non-Watermark ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ⇲",
      rows: [
        {
          title: "NonWaterMark Normal Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}tiknowm {}`
        },
        {
          title: "NonWaterMark Document Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}tiknowmdoc {}`
        }
      ]
    },
    {
      title: "💧 With-Watermark ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ⇲",
      rows: [
        {
          title: "WithWaterMark Normal Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}tikwm {}`
        },
        {
          title: "WithWaterMark Document Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}tikwmdoc {}`
        }
      ]
    }
  ]
};


      return await conn.sendMessage(from, {
        image: { url: thumb },
        caption: caption,
        footer: "> *〽️ade By Dinuwh Bbh*",
        buttons: [
          {
            buttonId: "action",
            buttonText: { displayText: "🔘 Choose Song Type" },
            type: 4,
            nativeFlowInfo: {
              name: "single_select",
              paramsJson: JSON.stringify(listData),
            },
          }
        ],
        headerType: 1,
        viewOnce: true,
      }, { quoted: mek });
    }

  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e.message}`);
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
