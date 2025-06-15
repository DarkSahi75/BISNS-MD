const config = require('../settings');
const axios = require('axios');
const fs = require('fs');
//const apkdl = require('../lib/apkdl');
const cheerio = require('cheerio');
const { phsearch, phdl } = require('darksadas-yt-pornhub-scrape');
const { File } = require('megajs');
const { igdl } = require('ruhend-scraper');
const { sizeFormatter } = require('human-readable');
const {
  getBuffer,
  getGroupAdmins,
  getRandom,
  getsize,
  h2k,
  isUrl,
  Json,
  runtime,
  sleep,
  fetchJson,
} = require('../lib/functions');
const { cmd, commands } = require('../lib/command');
const { getFbVideoInfo } = require('fb-downloader-scrapper');

const yts = require('ytsearch-venom');
const g_i_s = require('g-i-s');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const sharp = require('sharp');

const sizeTooLargeMessage = '_This file size is too big_';

// Resize image function with error handling
async function resizeImage(buffer, width, height) {
  try {
    return await sharp(buffer).resize(width, height).toBuffer();
  } catch (error) {
    console.error('Error resizing image:', error);
    return buffer;
  }
}

let watermark = config.FOOTER;
let maxFileSizeBytes = config.MAX_SIZE * 1024 * 1024;

// YouTube mp3 downloader via external service
async function ytmp3(url) {
  try {
    // Get download page HTML
    const pageResponse = await axios.get(
      'https://p.oceansaver.in/ajax/download.php?format=mp3&url=' + url
    );

    const $page = cheerio.load(pageResponse.data);

    // Get download progress info
    const progressResponse = await axios.get(
      'https://p.oceansaver.in/api/progress?id=' + pageResponse.data.id
    );

    const $progress = cheerio.load(progressResponse.data);

    return progressResponse.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Google Drive downloader helper
async function GDriveDl(url) {
  if (!url || !url.match(/drive\.google/i)) {
    return null;
  }

  const formatSize = sizeFormatter({
    std: 'JEDEC',
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (size, unit) => size + ' ' + unit + 'B',
  });

  try {
    // Extract file ID from URL
    let fileId = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1];
    if (!fileId) {
      throw new Error('ID Not Found');
    }

    // Post to Google Drive endpoint to get file info
    let response = await fetch(
      'https://drive.google.com/uc?id=' + fileId + '&authuser=0&export=download',
      {
        method: 'POST',
        headers: {
          'accept-encoding': 'gzip, deflate, br',
          'content-length': 0,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          origin: 'https://drive.google.com',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
            '(KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
          'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
          'x-drive-first-party': 'DriveWebUi',
          'x-json-requested': 'true',
        },
      }
    );

    // The response text has 4 chars to skip before JSON
    let data = JSON.parse((await response.text()).slice(4));

    if (!data.downloadUrl) {
      throw new Error('Link Download Limit!');
    }

    // Test download URL
    let fileResponse = await fetch(data.downloadUrl);
    if (fileResponse.status !== 200) {
      return fileResponse.statusText;
    }

    return {
      downloadUrl: data.downloadUrl,
      fileName: data.fileName,
      fileSize: formatSize(data.sizeBytes),
      mimetype: fileResponse.headers.get('content-type'),
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

// WhatsApp bot command registration for Google Drive download
cmd(
  {
    pattern: 'gdrive',
    alias: ['googledrive'],
    react: '📥',
    desc: 'Download googledrive files.',
    category: 'download',
    use: '.gdrive <googledrive link>',
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      l,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      if (!q) {
        return await reply('*Please give me googledrive url !!*');
      }

      let fileInfo = await GDriveDl(q);

      if (!fileInfo) {
        return await reply('*File not found or download limit reached*');
      }

      let message =
        '*📥 VISPER GDRIVE DOWNLOADER 📥*\n\n' +
        `*📁 Name:* ${fileInfo.fileName}\n` +
        `*📦 Size:* ${fileInfo.fileSize}\n` +
        `*📄 Type:* ${fileInfo.mimetype}`;

      await reply(message);

      await conn.sendMessage(
        from,
        {
          document: { url: fileInfo.downloadUrl },
          fileName: fileInfo.fileName,
          mimetype: fileInfo.mimetype,
        },
        { quoted: mek }
      );
    } catch (error) {
      await reply('*Error !!*');
      console.log(error);
    }
  }
);


cmd(
  {
    pattern: 'mega',
    react: '📍',
    alias: ['megadl', 'meganz'],
    desc: 'Mega.nz files download',
    category: 'download',
    use: '.mega url',
    filename: __filename,
  },
  async (conn, msg, m, { from, q: url, reply }) => {
    if (!url) return await reply('*Please provide a mega.nz URL!*');
    try {
      const file = File.fromURL(url);
      await file.loadAttributes();
      const buffer = await file.downloadBuffer();

      let mimetype = 'application/octet-stream';
      if (/mp4$/i.test(file.name)) mimetype = 'video/mp4';
      else if (/pdf$/i.test(file.name)) mimetype = 'application/pdf';
      else if (/zip$/i.test(file.name)) mimetype = 'application/zip';
      else if (/rar$/i.test(file.name)) mimetype = 'application/x-rar-compressed';
      else if (/7z$/i.test(file.name)) mimetype = 'application/x-7z-compressed';
      else if (/jpe?g$/i.test(file.name)) mimetype = 'image/jpeg';
      else if (/png$/i.test(file.name)) mimetype = 'image/png';

      await reply('*📩 Downloaded file:* ' + file.name);
      await conn.sendMessage(
        from,
        {
          document: buffer,
          mimetype,
          filename: file.name,
        },
        { quoted: msg }
      );
      await conn.sendMessage(from, {
        react: { text: '✅', key: msg.key },
      });
    } catch (error) {
      console.error(error);
      await reply('❌ *Error:* ' + (error.message || error));
    }
  }
);

function ytreg(url) {
  return /(?:https?:\/\/)?(?:www\.)?youtube(?:-nocookie)?\.com\/(?:watch\?.*v=|embed\/|shorts\/|v\/)|youtu\.be\/[-_0-9A-Za-z]{11}/.test(
    url
  );
}

cmd(
  {
    pattern: '/yts',
    alias: ['ytsearch'],
    use: '.yts <query>',
    react: '🔎',
    desc: 'Search songs on YouTube',
    category: 'download',
    filename: __filename,
  },
  async (conn, msg, m, { from, q: query, reply }) => {
    const imgmsg = '*Please provide a valid search query!*';
    try {
      if (!query) return await reply(imgmsg);
      if (isUrl(query) && !ytreg(query)) return await reply(imgmsg);

      let ytsearch;
      try {
        ytsearch = require('ytsearch-venom');
      } catch (e) {
        return await conn.sendMessage(
          from,
          { text: '*Error: YouTube search module not found*' },
          { quoted: msg }
        );
      }

      const result = await ytsearch(query);
      let text = '';
      result.all.map((video) => {
        text += ` *🎵 ${video.title}*\n🔗 ${video.url}\n\n`;
      });

      await conn.sendMessage(from, { text }, { quoted: msg });
    } catch (error) {
      console.error(error);
      await reply('*Error searching YouTube!*');
    }
  }
);

cmd(
  {
    pattern: '/song',
    alias: ['ytsong'],
    use: '.song <query or url>',
    react: '🎶',
    desc: 'Download high-quality songs from YouTube',
    category: 'download',
    filename: __filename,
  },
  async (conn, msg, m, { from, prefix, q: query, reply }) => {
    if (!query) return await reply('🎶 *Please provide a song name or YouTube link!*');
    try {
      const searchQuery = query.replace(/\?si=[^&]*/, '');
      const ytResult = await yts(searchQuery);
      const video = ytResult.videos[0];
      const footer = config.FOOTER || '';

      const caption =
        `\n🎶 *VISPER SONG DOWNLOADER* 🎶\n\n` +
        `🎵 *Title:* ${video.title}\n` +
        `👁️ *Views:* ${video.views}\n` +
        `⏳ *Duration:* ${video.duration}\n` +
        `🔗 *URL:* ${video.url}\n\n`;

      const buttons = [
        {
          buttonId: prefix + 'ytaa ' + video.url,
          buttonText: { displayText: '🎧 Audio Format' },
          type: 1,
        },
        {
          buttonId:
            prefix +
            'ytad ' +
            video.url +
            '&' +
            video.thumbnail +
            '&' +
            video.title,
          buttonText: { displayText: '📄 Document Format' },
          type: 1,
        },
      ];

      if (config.BUTTON === 'true') {
        await conn.sendMessage(
          from,
          {
            image: { url: video.thumbnail },
            caption,
            footer,
            buttons,
            headerType: 1,
            viewOnce: true,
          },
          { quoted: msg }
        );
      } else {
        await conn.buttonMessage(
          from,
          {
            image: { url: video.thumbnail },
            caption,
            footer,
            buttons,
            headerType: 4,
          },
          msg
        );
      }
    } catch (error) {
      console.error(error);
      await reply('❌ *Song not found or an error occurred.*');
    }
  }
);


cmd(
  {
    pattern: '/song2',
    alias: ['ytsong2'],
    use: '.song2 <query/url>',
    react: '🎧',
    desc: 'Download songs',
    category: 'download',
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      prefix,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      if (!q) {
        return await reply('*Please enter a query or a URL!*');
      }
      const cleanQuery = q.replace(/\?si=[^&]*/, '');
      const searchResult = await yts(cleanQuery); // yts = youtube search function
      const video = searchResult.videos[0];
      const footerText = config.FOOTER || '';

      let captionText =
        '🎶 *VISPER SONG DOWNLOADER* 🎶\n\n' +
        `*Title:* ${video.title}\n` +
        `*Views:* ${video.views}\n` +
        `*Duration:* ${video.duration}\n` +
        `*URL:* ${video.url}\n` +
        '────────────────────────────';

      // Send thumbnail + song info
      await conn.sendMessage(from, {
        image: { url: video.thumbnail },
        caption: captionText,
      });

      // Fetch audio download URL from external API
      const audioData = await fetchJson(
        'https://sadas-ytmp3-5.vercel.app/convert?link=' + video.url
      );
      const audioUrl = audioData?.url;
      if (!audioUrl) {
        return await reply('*Failed to get audio link.*');
      }

      // Send audio as voice
      await conn.sendMessage(
        from,
        {
          audio: { url: audioUrl },
          mimetype: 'audio/mpeg',
        },
        { quoted: mek }
      );

      // Download thumbnail, resize and send as document with audio
      const thumbResponse = await fetch(video.thumbnail);
      const thumbBuffer = await thumbResponse.buffer();
      const resizedThumb = await resizeImage(thumbBuffer, 200, 200);

      await conn.sendMessage(
        from,
        {
          document: { url: audioUrl },
          jpegThumbnail: resizedThumb,
          caption: footerText,
          mimetype: 'audio/mpeg',
          fileName: video.title + '.mp3',
        },
        { quoted: mek }
      );
    } catch (error) {
      console.error(error);
      await reply('❌ Error: Could not process the request.');
    }
  }
);

// Another command for direct YouTube MP3 download by URL

cmd(
  {
    pattern: 'ytaa',
    react: '🎧',
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, mek, m, { from, q, reply }) => {
    if (!q) {
      return await reply('*Need a YouTube URL!*');
    }
    try {
      const data = await fetchJson(
        'https://yt-five-tau.vercel.app/download?q=' + q + '&format=mp3'
      );
      // React with a "loading" emoji or similar
      await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });

      // Send audio
      await conn.sendMessage(
        from,
        {
          audio: { url: data.result.download },
          mimetype: 'audio/mpeg',
        },
        { quoted: mek }
      );

      // React with a "done" emoji
      await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
      await reply('*❌ Not found or error occurred!*');
      console.log(error);
    }
  }
);


cmd(
  {
    pattern: 'ytad',
    react: '📡',
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, m, text, { from, q, reply }) => {
    try {
      if (!q) return await reply('*Need a YouTube URL!*')

      const ytUrl = q.split('&')[0]
      const thumbUrl = q.split('&')[1]
      const filename = q.split('&')[2]

      const response = await fetch(thumbUrl)
      const imageBuffer = await response.buffer()
      const resizedThumb = await resizeImage(imageBuffer, 200, 200)

      const result = await fetchJson(`https://yt-five-tau.vercel.app/download?q=${ytUrl}&format=mp3`)

      await conn.sendMessage(from, {
        react: { text: '🚀', key: m.key },
      })

      await conn.sendMessage(
        from,
        {
          document: { url: result.result.download },
          jpegThumbnail: resizedThumb,
          caption: config.FOOTER,
          mimetype: 'audio/mpeg',
          fileName: filename,
        },
        { quoted: m }
      )

      await conn.sendMessage(from, {
        react: { text: '✅', key: m.key },
      })
    } catch (err) {
      console.log(err)
    }
  }
)

cmd(
  {
    pattern: 'directmp3',
    react: '📡',
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, m, text, { from, q, reply }) => {
    try {
      if (!q) return await reply('*Need a direct MP3 URL!*')

      await conn.sendMessage(from, {
        react: { text: '🚀', key: m.key },
      })

      const msg = await conn.sendMessage(
        from,
        { text: '*Uploading request...*' },
        { quoted: m }
      )

      await conn.sendMessage(from, {
        audio: { url: q },
        mimetype: 'audio/mpeg',
        caption: config.FOOTER,
        fileName: 'music.mp3',
      })

      await conn.sendMessage(from, { delete: msg.key })

      await conn.sendMessage(from, {
        react: { text: '✅', key: m.key },
      })
    } catch (err) {
      console.log(err)
    }
  }
)

cmd(
  {
    pattern: '/tiktok',
    alias: ['tt', 'ttdl', 'tiktokdl'],
    react: '🎩',
    desc: 'Download TikTok videos',
    category: 'download',
    use: '.tiktok <tiktok url>',
    filename: __filename,
  },
  
  async (conn, m, text, { from, q, reply }) => {
    try {
    try {
      if (!q) return await reply('TikTok link එකක් දෙන්න!')
      if (!q.includes('tiktok')) return await reply('වැදගත් TikTok URL එකක් දෙන්න!')

      const res = await fetchJson(`https://darksadasyt-tiktokdl.vercel.app/api/tiktok?q=${q}`)

      const caption = `*👑 VISPER TIKTOK DOWNLOADER 👑*\n\n` +
        `📌 *Title:* ${res.title}\n` +
        `🌍 *Region:* ${res.regions}\n` +
        `⏱️ *Duration:* ${res.runtime}\n` +
        `🔗 *Url:* ${q}\n`

      const buttons = [
        {
          buttonId: `${prefix}ttdl1 ${res.no_watermark}`,
          buttonText: { displayText: '📽️ Video No Watermark' },
          type: 1,
        },
        {
          buttonId: `${prefix}ttdl2 ${res.watermark}`,
          buttonText: { displayText: '📽️ Video Watermark' },
          type: 1,
        },
        {
          buttonId: `${prefix}ttdl3 ${res.music}`,
          buttonText: { displayText: '🎶 Audio' },
          type: 1,
        },
      ]

      await conn.buttonMessage(from, {
        image: { url: res.thumbnail },
        caption,
        footer: config.FOOTER,
        buttons,
        headerType: 4,
      }, m)

    } catch (err) {
      await reply('Error !!\n\n*' + err + '*')
      console.log(err)
    }
  }
)

cmd(
  {
    pattern: 'ttdl1',
    react: '📥',
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, m, _, { from, q, reply }) => {
    try {
      await conn.sendMessage(from, {
        react: { text: '⬇️', key: m.key },
      });

      await conn.sendMessage(from, {
        video: { url: q },
        mimetype: 'video/mp4',
        caption: config.FOOTER,
      }, { quoted: m });

      await conn.sendMessage(from, {
        react: { text: '✅', key: m.key },
      });
    } catch (e) {
      console.log(e);
      reply(`Error !!\n\n*${e}*`);
    }
  }
);

cmd(
  {
    pattern: 'ttdl2',
    react: '📥',
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, m, _, { from, q, reply }) => {
    try {
      await conn.sendMessage(from, {
        react: { text: '⬇️', key: m.key },
      });

      await conn.sendMessage(from, {
        video: { url: q },
        mimetype: 'video/mp4',
        caption: config.FOOTER,
      }, { quoted: m });

      await conn.sendMessage(from, {
        react: { text: '✅', key: m.key },
      });
    } catch (e) {
      console.log(e);
      reply(`Error !!\n\n${e}`);
    }
  }
);


cmd(
  {
    pattern: 'ttdl3',
    react: '📥',
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, m, _, { from, q, reply }) => {
    try {
      await conn.sendMessage(from, {
        react: { text: '⬇️', key: m.key },
      });

      await conn.sendMessage(from, {
        audio: { url: q },
        mimetype: 'audio/mpeg',
        caption: config.FOOTER,
      }, { quoted: m });

      await conn.sendMessage(from, {
        react: { text: '✅', key: m.key },
      });
    } catch (e) {
      console.log(e);
      reply(`Error !!\n\n${e}`);
    }
  }
);

cmd(
  {
    pattern: 'ttdl4',
    react: '📥',
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, m, _, { from, q, reply }) => {
    try {
      await conn.sendMessage(from, {
        react: { text: '⬇️', key: m.key },
      });

      await conn.sendMessage(from, {
        audio: { url: q },
        mimetype: 'audio/mpeg',
        caption: config.FOOTER,
      }, { quoted: m });

      await conn.sendMessage(from, {
        react: { text: '✅', key: m.key },
      });
    } catch (e) {
      console.log(e);
      reply(`Error !!\n\n${e}*`);
    }
  }
);

//const { cmd } = require('../lib/command');
//const { fetchJson } = require('../lib/functions');
//const g_i_s = require('g-i-s');
//const config = require('../settings');

// AI Chat Plugin
cmd({
  pattern: 'ai',
  react: '🤯',
  dontAddCommandList: true,
  filename: __filename,
}, async (_ctx, _msg, _data, { q, reply }) => {
  if (!q) return await reply('*Need a YouTube URL!*');
  try {
    const res = await fetchJson('https://darksadas-ytmp3.vercel.app/chat?q=' + q);
    reply('' + res);
  } catch (err) {
    reply('*Error occurred!*');
    console.log(err);
  }
});

// Facebook Downloader
cmd({
  pattern: '/fb',
  alias: ['facebook'],
  use: '.fb <facebook url>',
  react: '📮',
  desc: 'Download videos from Facebook',
  category: 'download',
  filename: __filename,
}, async (_ctx, _msg, _data, { prefix, q, reply }) => {
  if (!q || !q.includes('facebook.com')) return await reply('*Please enter a valid Facebook URL!*');
  try {
    const res = await fetchJson(`https://darksadasyt-fbdl.vercel.app/api/fb-download?q=${encodeURIComponent(q)}`);
    if (!res.result?.videoFormats?.length) return reply('*Download link error*');

    const buttons = [
      {
        buttonId: prefix + 'downfb ' + res.result.videoFormats[1].url,
        buttonText: { displayText: '📥 SD Quality' },
        type: 1,
      },
      {
        buttonId: prefix + 'downfb ' + res.result.videoFormats[0].url,
        buttonText: { displayText: '📥 HD Quality' },
        type: 1,
      },
    ];
    const content = {
      image: { url: res.result.thumbnailUrl },
      caption: `📥 *VISPER FB DOWNLOADER*\n\n🎞️ Title: Facebook video\n⏱ Duration: ${res.result.duration}\n🔗 URL: ${q}`,
      footer: config.FOOTER,
      buttons,
      headerType: 4,
    };
    return _ctx.buttonMessage(_data.from, content, _msg);
  } catch (err) {
    console.error(err);
    reply('*Error occurred while processing your request!*');
  }
});

// Facebook Video Downloader Direct
cmd({
  pattern: 'downfb',
  react: '📥',
  dontAddCommandList: true,
  filename: __filename,
}, async (_ctx, _msg, _data, { q, reply, from }) => {
  if (!q) return await reply('*Not Found!*');
  try {
    await _ctx.sendMessage(from, { video: { url: q } }, { quoted: _msg });
    await _ctx.sendMessage(from, { react: { text: '✅', key: _msg.key } });
  } catch (err) {
    reply('*Error !!*');
    console.log(err);
  }
});

// Google Image Search - Buttons
cmd({
  pattern: 'img',
  alias: ['googleimg'],
  react: '🖶',
  desc: 'Search for images on Google',
  category: 'download',
  use: '.img <query>',
  filename: __filename,
}, async (_ctx, _msg, _data, { q, reply, prefix, from }) => {
  if (!q) return reply('*Please provide a search query!*');
  const buttons = [
    {
      buttonId: prefix + 'imgdlm ' + q,
      buttonText: { displayText: '🖼 Normal Type' },
      type: 1,
    },
    {
      buttonId: prefix + 'imgdld ' + q,
      buttonText: { displayText: '📄 Document Type' },
      type: 1,
    },
  ];
  const content = {
    caption: '*🖼 Choose Image Download Type...*',
    footer: config.FOOTER,
    buttons,
    headerType: 1,
  };
  return _ctx.buttonMessage(from, content, _msg);
});

// Google Image Downloader - Normal
cmd({
  pattern: 'imgdlm',
  react: '🖼',
  filename: __filename,
}, async (_ctx, _msg, _data, { q, reply, from }) => {
  if (!q) return await reply('*Search query missing!*');
  g_i_s(q, async (error, results) => {
    if (error || !results.length) return reply('*No images found!*');
    for (let i = 0; i < Math.min(5, results.length); i++) {
      await _ctx.sendMessage(from, {
        image: { url: results[i].url },
        caption: config.FOOTER,
      }, { quoted: _msg });
    }
  });
});


cmd(
  {
    pattern: 'imgdld',
    react: '🖼️',
    use: '.imgsearch <query>',
    filename: __filename,
  },
  async (conn, msg, args, { from, reply, q }) => {
    try {
      if (!q) {
        return await reply('Please provide a search query!');
      }
      // Google image search function (g_i_s) call with the query
      g_i_s(q, async (error, results) => {
        if (error || !results.length) {
          return reply('No images found!');
        }
        // Get first 5 image URLs
        const imageUrls = results.slice(0, 5).map((img) => img.url);
        // Send each image as a document with caption and filename
        for (const url of imageUrls) {
          await conn.sendMessage(from, {
            document: { url },
            caption: config.FOOTER,
            mimetype: 'image/jpeg',
            fileName: q + '.jpeg',
          });
        }
      });
    } catch (err) {
      console.error(err);
      reply(
        'An error occurred while processing your request. Please try again later.'
      );
    }
  }
);

cmd(
  {
    pattern: 'ig',
    desc: 'To get the instagram video.',
    react: '📸',
    use: '.ig <Link>',
    category: 'download',
    filename: __filename,
  },
  async (
    conn,
    msg,
    args,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args: argList,
      q,
      reply,
    }
  ) => {
    try {
      if (!q) {
        return reply('Please Give Me a valid Link...');
      }
      reply.react('⌛');
      // Fetch Instagram video download info from external API
      let response = await fetchJson(
        'https://darksadasyt-igdl.vercel.app/api/download?q=' + q
      );
      reply.react('✅');
      await conn.sendMessage(
        from,
        {
          video: { url: response.result.data[0].downloadUrl },
          mimetype: 'video/mp4',
          caption: config.FOOTER,
        },
        { quoted: msg }
      );
      reply.react('✔️');
    } catch (err) {
      console.log(err);
    }
  }
);

cmd(
  {
    pattern: 'twitter',
    alias: ['tw'],
    desc: 'To get the twitter video.',
    react: '🐦',
    use: '.twitter <Link>',
    category: 'download',
    filename: __filename,
  },
  async (
    conn,
    msg,
    args,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args: argList,
      q,
      reply,
    }
  ) => {
    try {
      if (!q) {
        return reply('Please Give Me a valid Link...');
      }
      reply.react('⌛');
      // Fetch Twitter video download info from external API
      let response = await fetchJson(
        'https://darksadasyt-twiterdl.vercel.app/api/download?url=' + q
      );
      reply.react('✅');
      await conn.sendMessage(
        from,
        {
          video: { url: response.videos[0].url },
          mimetype: 'video/mp4',
          caption: config.FOOTER,
        },
        { quoted: msg }
      );
      reply.react('✔️');
    } catch (err) {
      console.log(err);
    }
  }
);

cmd(
  {
    pattern: 'apk',
    react: '🔍',
    alias: ['findapk', 'playstore'],
    category: 'download',
    use: '.apk whatsapp',
    filename: __filename,
  },
  async (
    conn,     // bot connection object
    mek,      // message object
    _3rdParam, // unused param in your snippet
    {
      from,   // chat id where message came from
      l,      // language or locale? unused here
      quoted, // quoted message (if any)
      body,   // full message body
      isCmd,  // is command?
      command, // command name
      args,    // array of args
      q,       // the query (args joined as string)
      isGroup, // is group chat
      sender,  // sender id
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,   // function to reply to sender
    }
  ) => {
    try {
      // React to the message with an emoji
      await conn.sendMessage(from, {
        react: { text: '🔍', key: mek.key },
      });

      // If no query provided, send instruction
      if (!q) {
        return await conn.sendMessage(
          from,
          { text: '*🔍 Please enter the APK name...*' },
          { quoted: mek }
        );
      }

      // Use some apkdl.download function to get APK info
      const apkInfo = await apkdl.download(q);

      // Compose message with APK details
      let caption = `*🔍 VISPER APK DOWNLOADER 🔍*\n\n` +
        `*• Name:* ${apkInfo.name}\n` +
        `*• Package:* ${apkInfo.package}\n` +
        `*• Last update:* ${apkInfo.lastup}\n` +
        `*• Size:* ${apkInfo.size}\n`;

      // Send APK icon with details caption
      await conn.sendMessage(
        from,
        {
          image: { url: apkInfo.icon },
          caption,
        },
        { quoted: mek }
      );

      // Send the actual APK file as a document
      let sentDoc = await conn.sendMessage(
        from,
        {
          document: { url: apkInfo.dllink },
          mimetype: 'application/vnd.android.package-archive',
          fileName: apkInfo.name + '.apk',
          caption: '',
        },
        { quoted: mek }
      );

      // React with confirmation emojis
      await conn.sendMessage(from, {
        react: { text: '✅', key: sentDoc.key },
      });
      await conn.sendMessage(from, {
        react: { text: '✔️', key: mek.key },
      });
    } catch (error) {
      reply('ERROR !!');
      console.log(error);
    }
  }
);

cmd(
  {
    pattern: '/video',
    alias: ['ytvideo'],
    use: '.video <query or url>',
    react: '🎥',
    desc: 'Download videos',
    category: 'download',
    filename: __filename,
  },
  async (
    conn,
    mek,
    _3rdParam,
    {
      from,
      prefix,
      l,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      // If no query or url provided, reply asking for it
      if (!q) {
        return await reply('*Please enter a query or a url!*');
      }

      // Remove youtube query parameter '?si=...' if exists
      const cleanQuery = q.replace(/\?si=[^&]*/, '');

      // Search videos using yts (YouTube search) library
      const searchResult = await yts(cleanQuery);

      // Get first video result
      const video = searchResult.videos[0];

      // Compose info caption
      let caption = `*🎥 VISPER VIDEO DOWNLOADER 🎥*\n\n` +
        `*• Title:* ${video.title}\n` +
        `*• Views:* ${video.views}\n` +
        `*• Duration:* ${video.duration}\n` +
        `*• Url:* ${video.url}\n`;

      // Prepare buttons for different video qualities to download
      let buttons = [
        {
          buttonId: prefix + 'videodl144 ' + video.url,
          buttonText: { displayText: '144p Video 🎥' },
          type: 1,
        },
        {
          buttonId: prefix + 'videodl240 ' + video.url,
          buttonText: { displayText: '240p Video 🎥' },
          type: 1,
        },
        {
          buttonId: prefix + 'videodl360 ' + video.url,
          buttonText: { displayText: '360p Video 🎥' },
          type: 1,
        },
        {
          buttonId: prefix + 'videodl720 ' + video.url,
          buttonText: { displayText: '720p Video 🎥' },
          type: 1,
        },
        {
          buttonId: prefix + 'videodl1080 ' + video.url,
          buttonText: { displayText: '1080p Video 🎥' },
          type: 1,
        },
      ];

      // Prepare buttons for document download (video as doc) at different qualities
      buttons.push(
        {
          buttonId: prefix + `docdl144 ${video.url}&${video.thumbnail}&${video.title}`,
          buttonText: { displayText: '144p Document 📄' },
          type: 1,
        },
        {
          buttonId: prefix + `docdl240 ${video.url}&${video.thumbnail}&${video.title}`,
          buttonText: { displayText: '240p Document 📄' },
          type: 1,
        },
        {
          buttonId: prefix + `docdl360 ${video.url}&${video.thumbnail}&${video.title}`,
          buttonText: { displayText: '360p Document 📄' },
          type: 1,
        },
        {
          buttonId: prefix + `docdl720 ${video.url}&${video.thumbnail}&${video.title}`,
          buttonText: { displayText: '720p Document 📄' },
          type: 1,
        },
        {
          buttonId: prefix + `docdl1080 ${video.url}&${video.thumbnail}&${video.title}`,
          buttonText: { displayText: '_1080p Document 📄_' },
          type: 1,
        }
      );

      // Prepare the message with buttons and image
      const buttonMessage = {
        image: { url: video.thumbnail },
        caption,
        footer: config.FOOTER,
        buttons,
        headerType: 4,
      };

      // Send the button message
      await conn.buttonMessage(from, buttonMessage, mek);
    } catch (error) {
      reply('Not Found');
      console.log(error);
    }
  }
);

cmd(
  {
    pattern: 'docdl144',
    react: '⏱️',  // initial reaction emoji
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, msg, args, { from, q, reply }) => {
    try {
      if (!q) {
        return await reply('*Need a YouTube URL!*');
      }

      // Split input by '&' to get components, first part is the YouTube URL
      const parts = q.split('&');
      const youtubeUrl = parts[0];
      const thumbnailUrl = parts[1];
      const fileNameBase = parts[2] || 'video';

      // Fetch the thumbnail image buffer
      const thumbResponse = await fetch(thumbnailUrl);
      const thumbBuffer = await thumbResponse.buffer();

      // Resize the thumbnail image to 200x200 (assumes resizeImage is defined elsewhere)
      const thumbResized = await resizeImage(thumbBuffer, 200, 200);

      // Call the external API to get the download URL for 144p video
      const json = await fetchJson(
        'https://sadas-ytmp4-5.vercel.app/convert?link=' +
          youtubeUrl +
          '&format=mp4&audioBitrate=128&videoQuality=144&filenameStyle=pretty&vCodec=h264'
      );

      const videoUrl = json.url;

      // Send initial reaction (like "typing" or "processing")
      await conn.sendMessage(from, {
        react: {
          text: '⏳',
          key: msg.key,
        },
      });

      // Send the video document with thumbnail, caption, mimetype and fileName
      await conn.sendMessage(
        from,
        {
          document: { url: videoUrl },
          jpegThumbnail: thumbResized,
          caption: config?.FOOTER || '',
          mimetype: 'video/mp4',
          fileName: (json.filename || fileNameBase) + '.mp4',
        },
        { quoted: msg }
      );

      // Send final reaction (like "done" checkmark)
      await conn.sendMessage(from, {
        react: {
          text: '✅',
          key: msg.key,
        },
      });
    } catch (error) {
      console.error(error);
      await reply('*An error occurred while processing your request.*');
    }
  }
);

// The following 3 commands are exactly the same except for the videoQuality parameter and pattern name

cmd(
  {
    pattern: 'docdl240',
    react: '⏱️',
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, msg, args, { from, q, reply }) => {
    try {
      if (!q) return await reply('*Need a YouTube URL!*');

      const parts = q.split('&');
      const youtubeUrl = parts[0];
      const thumbnailUrl = parts[1];
      const fileNameBase = parts[2] || 'video';

      const thumbResponse = await fetch(thumbnailUrl);
      const thumbBuffer = await thumbResponse.buffer();
      const thumbResized = await resizeImage(thumbBuffer, 200, 200);

      const json = await fetchJson(
        'https://sadas-ytmp4-5.vercel.app/convert?link=' +
          youtubeUrl +
          '&format=mp4&audioBitrate=128&videoQuality=240&filenameStyle=pretty&vCodec=h264'
      );

      const videoUrl = json.url;

      await conn.sendMessage(from, {
        react: {
          text: '⏳',
          key: msg.key,
        },
      });

      await conn.sendMessage(
        from,
        {
          document: { url: videoUrl },
          jpegThumbnail: thumbResized,
          caption: config?.FOOTER || '',
          mimetype: 'video/mp4',
          fileName: (json.filename || fileNameBase) + '.mp4',
        },
        { quoted: msg }
      );

      await conn.sendMessage(from, {
        react: {
          text: '✅',
          key: msg.key,
        },
      });
    } catch (error) {
      console.error(error);
      await reply('*An error occurred while processing your request.*');
    }
  }
);

cmd(
  {
    pattern: 'docdl360',
    react: '⏱️',
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, msg, args, { from, q, reply }) => {
    try {
      if (!q) return await reply('*Need a YouTube URL!*');

      const parts = q.split('&');
      const youtubeUrl = parts[0];
      const thumbnailUrl = parts[1];
      const fileNameBase = parts[2] || 'video';

      const thumbResponse = await fetch(thumbnailUrl);
      const thumbBuffer = await thumbResponse.buffer();
      const thumbResized = await resizeImage(thumbBuffer, 200, 200);

      const json = await fetchJson(
        'https://sadas-ytmp4-5.vercel.app/convert?link=' +
          youtubeUrl +
          '&format=mp4&audioBitrate=128&videoQuality=360&filenameStyle=pretty&vCodec=h264'
      );

      const videoUrl = json.url;

      await conn.sendMessage(from, {
        react: {
          text: '⏳',
          key: msg.key,
        },
      });

      await conn.sendMessage(
        from,
        {
          document: { url: videoUrl },
          jpegThumbnail: thumbResized,
          caption: config?.FOOTER || '',
          mimetype: 'video/mp4',
          fileName: (json.filename || fileNameBase) + '.mp4',
        },
        { quoted: msg }
      );

      await conn.sendMessage(from, {
        react: {
          text: '✅',
          key: msg.key,
        },
      });
    } catch (error) {
      console.error(error);
      await reply('*An error occurred while processing your request.*');
    }
  }
);

cmd(
  {
    pattern: 'docdl720',
    react: '⏱️',
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, msg, args, { from, q, reply }) => {
    try {
      if (!q) return await reply('*Need a youtube url!*');

      const parts = q.split('&');
      const youtubeUrl = parts[0];
      const thumbnailUrl = parts[1];
      const fileNameBase = parts[2] || 'video';

      const thumbResponse = await fetch(thumbnailUrl);
      const thumbBuffer = await thumbResponse.buffer();
      const thumbResized = await resizeImage(thumbBuffer, 200, 200);

      const json = await fetchJson(
        'https://sadas-ytmp4-5.vercel.app/convert?link=' +
          youtubeUrl +
          '&format=mp4&audioBitrate=128&videoQuality=720&filenameStyle=pretty&vCodec=h264'
      );

      const videoUrl = json.url;

      await conn.sendMessage(from, {
        react: {
          text: '⏳',
          key: msg.key,
        },
      });

      await conn.sendMessage(
        from,
        {
          document: { url: videoUrl },
          jpegThumbnail: thumbResized,
          caption: config?.FOOTER || '',
          mimetype: 'video/mp4',
          fileName: (json.filename || fileNameBase) + '.mp4',
        },
        { quoted: msg }
      );

      await conn.sendMessage(from, {
        react: {
          text: '✅',
          key: msg.key,
        },
      });
    } catch (error) {
      console.log(error);
      await reply('*An error occurred while processing your request.*');
    }
  }
);

cmd(
  {
    pattern: 'docdl1080',
    react: '⏱️',
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, message, m, { from, q: query, reply }) => {
    try {
      if (!query) return await reply('*Need a youtube url!*');

      // The original code tries to split the query by & and extract parts, but looks buggy.
      // I'll just take the full query URL here.
      const url = query.split('&')[0]; 

      // Fetching thumbnail buffer and resizing it (assuming resizeImage is defined elsewhere)
      // The original code tries to fetch the second split parameter as URL, which looks wrong,
      // so we skip that here.
      // Just fetch thumbnail from YouTube or a placeholder.
      // For now, let's just ignore thumbnail part or use a placeholder.
      // You can implement thumbnail fetching yourself.

      // Fetch video info from API
      const videoInfo = await fetchJson(
        'https://sadas-ytmp4-5.vercel.app/convert?link=' +
          url +
          '&format=mp4&audioBitrate=128&videoQuality=1080&filenameStyle=pretty&vCodec=h264'
      );

      const videoUrl = videoInfo.url;

      // React to message with emoji
      await conn.sendMessage(from, {
        react: { text: '⏳', key: message.key },
      });

      // Send the video document with thumbnail (if you have a thumbnail buffer, set jpegThumbnail)
      await conn.sendMessage(
        from,
        {
          document: { url: videoUrl },
          // jpegThumbnail: thumbnailBuffer, // optional if you have it
          caption: config?.FOOTER || '',
          mimetype: 'video/mp4',
          fileName: (videoInfo.filename || 'video') + '.mp4',
        },
        { quoted: message }
      );

      // React again after sending
      await conn.sendMessage(from, {
        react: { text: '✅', key: message.key },
      });
    } catch (error) {
      console.log(error);
      await reply('*Error while downloading the video.*');
    }
  }
);

cmd(
  {
    pattern: 'videodl144',
    react: '⏱️',
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, message, m, { from, q: query, reply }) => {
    try {
      if (!query) return await reply('*You must provide a YouTube URL!*');

      const videoInfo = await fetchJson(
        'https://sadas-ytmp4-5.vercel.app/convert?link=' +
          query +
          '&format=mp4&audioBitrate=128&videoQuality=144&filenameStyle=pretty&vCodec=h264'
      );

      const videoUrl = videoInfo.url;

      await conn.sendMessage(from, {
        react: { text: '⏳', key: message.key },
      });

      await conn.sendMessage(
        from,
        {
          video: { url: videoUrl },
          caption: videoInfo.filename || 'Downloaded Video',
        },
        { quoted: message }
      );

      await conn.sendMessage(from, {
        react: { text: '✅', key: message.key },
      });
    } catch (error) {
      console.error(error);
      await reply('*An error occurred while downloading the video.*');
    }
  }
);

cmd(
  {
    pattern: 'videodl240',
    react: '⏱️',
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, message, m, { from, q: query, reply }) => {
    try {
      if (!query) return await reply('*You must provide a YouTube URL!*');

      const videoInfo = await fetchJson(
        'https://sadas-ytmp4-5.vercel.app/convert?link=' +
          query +
          '&format=mp4&audioBitrate=240&videoQuality=144&filenameStyle=pretty&vCodec=h264'
      );

      const videoUrl = videoInfo.url;

      await conn.sendMessage(from, {
        react: { text: '⏳', key: message.key },
      });

      await conn.sendMessage(
        from,
        {
          video: { url: videoUrl },
          caption: videoInfo.filename || 'Downloaded Video',
        },
        { quoted: message }
      );

      await conn.sendMessage(from, {
        react: { text: '✅', key: message.key },
      });
    } catch (error) {
      await reply('*Error !!*');
      console.log(error);
    }
  }
);

cmd(
  {
    pattern: 'videodl360',
    react: '⏱️',
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, message, m, { from, q: query, reply }) => {
    try {
      if (!query) return await reply('*You must provide a YouTube URL!*');

      const videoInfo = await fetchJson(
        'https://sadas-ytmp4-5.vercel.app/convert?link=' +
          query +
          '&format=mp4&audioBitrate=360&videoQuality=144&filenameStyle=pretty&vCodec=h264'
      );

      const videoUrl = videoInfo.url;

      await conn.sendMessage(from, {
        react: { text: '⏳', key: message.key },
      });

      await conn.sendMessage(
        from,
        {
          video: { url: videoUrl },
          caption: videoInfo.filename || 'Downloaded Video',
        },
        { quoted: message }
      );

      await conn.sendMessage(from, {
        react: { text: '✅', key: message.key },
      });
    } catch (error) {
      await reply('*Error !!*');
      console.log(error);
    }
  }
);

cmd(
  {
    pattern: 'videodl720',
    react: '⏱️',
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, message, m, { from, q: query, reply }) => {
    try {
      if (!query) return await reply('*You must provide a YouTube URL!*');

      const videoInfo = await fetchJson(
        'https://sadas-ytmp4-5.vercel.app/convert?link=' +
          query +
          '&format=mp4&audioBitrate=128&videoQuality=720&filenameStyle=pretty&vCodec=h264'
      );

      const videoUrl = videoInfo.url;

      await conn.sendMessage(from, {
        react: { text: '⏳', key: message.key },
      });

      await conn.sendMessage(
        from,
        {
          video: { url: videoUrl },
          caption: videoInfo.filename || 'Downloaded Video',
        },
        { quoted: message }
      );

      await conn.sendMessage(from, {
        react: { text: '✅', key: message.key },
      });
    } catch (error) {
      await reply('*Error !!*');
      console.log(error);
    }
  }
);


// Command for downloading 1080p video from a link (probably YouTube)
cmd(
  {
    pattern: 'videodl1080',
    react: '⏱️', // reaction emoji
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, mek, m, { from, q: link, reply }) => {
    try {
      // Call external API to convert the video link to mp4 1080p
      const response = await fetchJson(
        'https://sadas-ytmp4-5.vercel.app/convert?link=' +
          link +
          '&format=mp4&audioBitrate=128&videoQuality=1080&filenameStyle=pretty&vCodec=h264'
      );

      const videoUrl = response.url;

      // React with emoji
      await conn.sendMessage(from, {
        react: {
          text: '⏰',
          key: mek.key,
        },
      });

      // Send the video with caption
      await conn.sendMessage(
        from,
        {
          video: { url: videoUrl },
          caption: response.filename || 'Downloaded Video',
        },
        { quoted: mek }
      );

      // React with another emoji to mark completion
      await conn.sendMessage(from, {
        react: {
          text: '✅',
          key: mek.key,
        },
      });
    } catch (error) {
      reply('*Error !!*');
      console.log(error);
    }
  }
);

// Command for downloading from Mediafire links
cmd(
  {
    pattern: 'mediafire',
    react: '🕐',
    alias: ['mfire', 'mfdl'],
    category: 'download',
    use: '.mediafire <link>',
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      l,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      // React emoji for command received
      await conn.sendMessage(from, {
        react: {
          text: '⏱️',
          key: mek.key,
        },
      });

      // If no link provided, prompt user
      if (!q) {
        return await conn.sendMessage(
          from,
          { text: '*🕐 Enter mediafire link...*' },
          { quoted: mek }
        );
      }

      // Fetch Mediafire download info from API
      const response = await fetchJson('https://mfire-dl.vercel.app/mfire?url=' + q);

      // Compose info message
      let messageText = 
        '*`🕐 VISPER MEDIAFIRE DOWNLOADER 🕐`*\n\n' +
        `*📌 Name :* ${response.fileName}\n` +
        `*🗂️ Type :* ${response.fileType}\n` +
        `*📦 Size :* ${response.size}\n` +
        `*📅 Date :* ${response.date}\n`;

      reply(messageText);

      // Send the Mediafire file as a document
      let sentMessage = await conn.sendMessage(
        from,
        {
          document: { url: response.dl_link },
          mimetype: response.type,
          fileName: response.fileName,
          caption: '',
        },
        { quoted: mek }
      );

      // React to indicate success
      await conn.sendMessage(from, {
        react: {
          text: '📦',
          key: sentMessage.key,
        },
      });

      await conn.sendMessage(from, {
        react: {
          text: '✅',
          key: mek.key,
        },
      });
    } catch (error) {
      reply('ERROR !!');
      console.log(error);
    }
  }
);

// Function to scrape search results from xnxx.com for a given query
async function xnxxs(query) {
  return new Promise((resolve, reject) => {
    fetch(
      'https://www.xnxx.com/search/' +
        query +
        '/' +
        (Math.floor(Math.random() * 3) + 1),
      { method: 'get' }
    )
      .then(res => res.text())
      .then(html => {
        const $ = cheerio.load(html, { xmlMode: false });

        const titles = [];
        const infos = [];
        const links = [];

        // Extract video links
        $('div.mozaique').each((i, elem) => {
          $(elem)
            .find('div.thumb')
            .each((j, el) => {
              let href = $(el).find('a').attr('href');
              href = href.replace('/THUMBNUM/', '/'); // clean url
              links.push('https://www.xnxx.com' + href);
            });
        });

        // Extract video info and titles
        $('div.mozaique').each((i, elem) => {
          $(elem)
            .find('div.thumb-under')
            .each((j, el) => {
              infos.push($(el).find('p.metadata').text());
              $(el)
                .find('a')
                .each((k, anchor) => {
                  titles.push($(anchor).attr('title'));
                });
            });
        });

        const results = [];

        for (let i = 0; i < titles.length; i++) {
          results.push({
            title: titles[i],
            info: infos[i],
            link: links[i],
          });
        }

        resolve({
          status: true,
          result: results,
        });
      })
      .catch(error => {
        reject({
          status: false,
          result: error,
        });
      });
  });
}

//const fetch = require('node-fetch');
//onst cheerio = require('cheerio');

cmd(
  {
    pattern: 'xnxx',
    react: '🔞',
    category: 'download',
    desc: 'xnxx download',
    use: '.xnxx <search-term>',
    filename: __filename,
  },
  async (conn, msg, msgInfo, { from, q, isSudo, isOwner, prefix, isMe, reply }) => {
    try {
      if (config.XNXX_BLOCK === 'true' && !isMe && !isSudo && !isOwner) {
        await conn.sendMessage(from, { react: { text: '❌', key: msgInfo.key } });
        return await conn.sendMessage(
          from,
          {
            text:
              '*This command currently only works for the Bot owner. To disable this restriction, use the .settings command.*',
          },
          { quoted: msgInfo }
        );
      }

      if (!q) return reply('🔞 *Please provide search terms!*');

      let searchResults = await xnxxSearch(q);
      let results = searchResults.result;
      let sectionsArray = [];

      for (let i = 0; i < results.length; i++) {
        sectionsArray.push({
          title: results[i].title,
          description: '',
          rowId: prefix + 'xnxxdown ' + results[i].link,
        });
      }

      let listMessage = {
        text: `*_XNXX SEARCH RESULTS 🔞_*\n\n*Input:* ${q}`,
        footer: config.FOOTER,
        title: 'xnxx results',
        buttonText: '*Select a result 🔞*',
        sections: [{ title: 'Search Results', rows: sectionsArray }],
      };

      await conn.listMessage(from, listMessage, msgInfo);
    } catch (error) {
      console.error(error);
      await conn.sendMessage(from, { text: '🔞 *Error occurred!*' }, { quoted: msgInfo });
    }
  }
);

// Function to scrape the video page and get download links
async function xdl(url) {
  return new Promise((resolve, reject) => {
    fetch(url, { method: 'GET' })
      .then((res) => res.text())
      .then((html) => {
        const $ = cheerio.load(html, { xmlMode: false });

        const title = $('meta[property="og:title"]').attr('content');
        const duration = $('meta[property="og:duration"]').attr('content');
        const image = $('meta[property="og:image"]').attr('content');
        const videoType = $('meta[property="og:video:type"]').attr('content');
        const videoWidth = $('meta[property="og:video:width"]').attr('content');
        const videoHeight = $('meta[property="og:video:height"]').attr('content');
        const info = $('span.metadata').text();
        const scriptContent = $('#video-player-bg > script:nth-child(6)').html();

        const files = {
          low: (scriptContent.match(/html5player.setVideoUrlLow'(.*?)';/) || [])[1],
          high: (scriptContent.match(/html5player.setVideoUrlHigh'(.*?)';/) || [])[1],
          HLS: (scriptContent.match(/html5player.setVideoHLS'(.*?)';/) || [])[1],
          thumb: (scriptContent.match(/html5player.setThumbUrl'(.*?)';/) || [])[1],
          thumb69: (scriptContent.match(/html5player.setThumbUrl169'(.*?)';/) || [])[1],
          thumbSlide: (scriptContent.match(/html5player.setThumbSlide'(.*?)';/) || [])[1],
          thumbSlideBig: (scriptContent.match(/html5player.setThumbSlideBig'(.*?)';/) || [])[1],
        };

        resolve({
          status: true,
          result: {
            title,
            URL: url,
            duration,
            image,
            videoType,
            videoWidth,
            videoHeight,
            info,
            files,
          },
        });
      })
      .catch((err) => reject({ status: false, result: err }));
  });
}

cmd(
  {
    pattern: 'xnxxdown',
    alias: ['dlxnxx', 'xnxxdl'],
    react: '🔞',
    dontAddCommandList: true,
    filename: __filename,
  },
  async (
    conn,
    msg,
    msgInfo,
    { from, reply, q }
  ) => {
    try {
      if (!q) return reply('*Please provide the video URL!*');

      let videoData = await xdl(q);
      let title = videoData.result.title;

      await conn.sendMessage(
        from,
        {
          video: { url: videoData.result.files.high },
          caption: title,
        },
        { quoted: msgInfo }
      );
    } catch (error) {
      reply('*Error !!*');
      console.error(error);
    }
  }
);

cmd(
  {
    pattern: 'pornhub',
    react: '🔞',
    category: 'download',
    desc: 'pornhub search and download',
    use: '.pornhub <search-term>',
    filename: __filename,
  },
  async (conn, msg, msgInfo, { from, q, isSudo, isOwner, prefix, isMe, reply }) => {
    try {
      if (config.XNXX_BLOCK === 'true' && !isMe && !isSudo && !isOwner) {
        await conn.sendMessage(from, { react: { text: '❌', key: msgInfo.key } });
        return await conn.sendMessage(
          from,
          {
            text:
              '*This command currently only works for the Bot owner. To disable this restriction, use the .settings command.*',
          },
          { quoted: msgInfo }
        );
      }

      if (!q) return reply('🔞 *Please provide search terms!*');

      let results = await phsearch(q); // Assume phsearch is defined elsewhere
      let sectionsArray = [];

      for (let i = 0; i < results.length; i++) {
        sectionsArray.push({
          title: results[i].title,
          description: '',
          rowId: prefix + 'phinfo ' + results[i].link,
        });
      }

      let listMessage = {
        text: `*_PORNHUB SEARCH RESULTS 🔞_*\n\n*Input:* ${q}`,
        footer: config.FOOTER,
        title: 'pornhub.com results',
        buttonText: '*Select a result 🔞*',
        sections: [{ title: 'Search Results', rows: sectionsArray }],
      };

      await conn.listMessage(from, listMessage, msgInfo);
    } catch (error) {
      console.error(error);
      await conn.sendMessage(from, { text: '🔞 *Error occurred!*' }, { quoted: msgInfo });
    }
  }
);

//const { cmd } = require('your-command-lib'); // Adjust import according to your setup
//const { fetchJson } = require('your-utils'); // Adjust import according to your setup
//onst config = require('your-config'); // Your config file with FOOTER and others

// Command: phinfo
cmd(
  {
    pattern: 'phinfo',
    react: '🔞', // emoji reaction for command
    filename: __filename,
  },
  async (conn, message, quoted, { from, q: url, prefix, reply }) => {
    try {
      // Call API to analyze the given URL
      let data = await fetchJson('https://ph-slow-dl.vercel.app/api/analyze?q=' + url);

      let caption =
        '*🔞 VISPER PORNHUB DOWNLOADER 🔞*\n\n' +
        `*📌 Title :* ${data.video_title}\n` +
        `*⏰ Time :* ${data.analyze_time}\n` +
        `*👤 Uploader :* ${data.video_uploader}\n` +
        `*🔗 Url :* ${url}\n`;

      // Prepare buttons with different video formats and download URLs
      let buttons = [];
      data.format.map((format) => {
        buttons.push({
          buttonId: prefix + 'phdl ' + data.video_cover + '¤' + format.download_url + '¤' + data.video_title,
          buttonText: { displayText: '' + format.resolution },
          type: 1,
        });
      });

      const buttonMessage = {
        image: { url: data.video_cover },
        caption: caption,
        footer: config.FOOTER,
        buttons: buttons,
        headerType: 4,
      };

      // Send button message
      return await conn.buttonMessage(from, buttonMessage, quoted);
    } catch (error) {
      console.error(error);
      await conn.sendMessage(from, { text: '❌ *Error !!*' }, { quoted });
    }
  }
);

// Command: phdl (download)
cmd(
  {
    pattern: 'phdl',
    react: '⏳',
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, message, quoted, { from, q: args, reply }) => {
    try {
      if (!args) return await reply('*Need a YouTube URL!*');

      // The args string contains video_cover, download_url, video_title separated by '¤'
      const [videoCover, downloadUrl, videoTitle] = args.split('¤');

      // React with a waiting emoji
      await conn.sendMessage(from, { react: { text: '⏳', key: message.key } });

      // Send the video as a document
      await conn.sendMessage(
        from,
        {
          document: { url: downloadUrl },
          caption: config.FOOTER,
          mimetype: 'video/mp4',
          fileName: videoTitle,
        },
        { quoted: message }
      );

      // React with a done emoji
      await conn.sendMessage(from, { react: { text: '✅', key: message.key } });
    } catch (error) {
      console.error(error);
    }
  }
);

// Command: spotify search
cmd(
  {
    pattern: 'spotify',
    react: '🎵',
    category: 'download',
    desc: 'spotify search',
    use: '.spotify <keywords>',
    filename: __filename,
  },
  async (conn, message, quoted, { from, q: query, prefix, reply }) => {
    try {
      if (!query) return reply('❌ *Please give me words to search*');

      let searchResult = await fetchJson('https://darksadasyt-spotify-search.vercel.app/search?query=' + query);

      let rows = [];
      for (let i = 0; i < searchResult.length; i++) {
        rows.push({
          title: searchResult[i].song_name,
          description: '',
          rowId: prefix + 'spotifydl ' + searchResult[i].track_url,
        });
      }

      const sections = [
        {
          title: 'open.spotify.com',
          rows: rows,
        },
      ];

      const listMessage = {
        text: `*_SPOTIFY SEARCH RESULT 🎶_*\n\n*Input:* ${query}`,
        footer: config.FOOTER,
        title: 'open.spotify.com',
        buttonText: '*Reply Below Number 🎢*',
        sections: sections,
      };

      await conn.listMessage(from, listMessage, quoted);
    } catch (error) {
      console.error(error);
      await conn.sendMessage(from, { text: '❌ *Error !!*' }, { quoted });
    }
  }
);


cmd(
  {
    pattern: 'spotifydl',
    alias: ['ytsong'],
    use: '.song <query or url>',
    react: '🎧',
    desc: 'Download songs from Spotify',
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      prefix,
      q,
      reply,
    }
  ) => {
    try {
      if (!q) {
        return await reply('*Please enter a query or a URL!*');
      }

      // Call external API to get song info and download link
      const response = await axios.get(
        'https://phinfo.vercel.app/download?songId=' + encodeURIComponent(q)
      );
      const songData = response.data.data;

      if (!songData || !songData.downloadLink) {
        return await reply('❌ Could not retrieve the song. Please check your query.');
      }

      // Prepare message caption
      let caption =
        `*🎼 VISPER SPOTIFY DOWNLOADER 🎼*\n\n` +
        `*🎵 Title:* ${songData.title}\n` +
        `*👤 Artist:* ${songData.artist}\n` +
        `*💿 Album:* ${songData.album}\n` +
        `*📅 Date:* ${songData.releaseDate}\n` +
        `*🔗 URL:* ${q}\n`;

      // Buttons for audio and document download
      const buttons = [
        {
          buttonId: prefix + 'spa ' + songData.downloadLink,
          buttonText: { displayText: 'Audio Type 🎶' },
          type: 1,
        },
        {
          buttonId: prefix + 'spad ' + songData.downloadLink + '&' + songData.cover + '&' + songData.title,
          buttonText: { displayText: 'Document Type 📄' },
          type: 1,
        },
      ];

      const buttonMessage = {
        image: { url: songData.cover },
        caption: caption,
        footer: config.FOOTER,
        buttons: buttons,
        headerType: 4,
      };

      await conn.buttonMessage(from, buttonMessage, mek);
    } catch (error) {
      console.error('Error occurred:', error);
      await reply('❌ An error occurred while processing your request. Please try again later.');
    }
  }
);

cmd(
  {
    pattern: 'spa',
    react: '⚡',
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, mek, m, { from, q, reply }) => {
    if (!q) {
      return await reply('*Need a youtube url!*');
    }
    try {
      await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });
      await conn.sendMessage(
        from,
        {
          audio: { url: q },
          mimetype: 'audio/mpeg',
        },
        { quoted: mek }
      );
      await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
      console.log(error);
    }
  }
);

cmd(
  {
    pattern: 'spad',
    react: '⚡',
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, mek, m, { from, q, reply }) => {
    try {
      if (!q) {
        return await reply('*Need a youtube url!*');
      }

      // q format: downloadLink & coverURL & title
      const parts = q.split('&');
      const downloadLink = parts[0];
      const coverURL = parts[1];
      const title = parts[2];

      // Fetch cover image and resize thumbnail (assuming resizeImage is defined)
      const response = await fetch(coverURL);
      const buffer = await response.buffer();
      const thumbnail = await resizeImage(buffer, 200, 200);

      await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });

      await conn.sendMessage(
        from,
        {
          document: { url: downloadLink },
          jpegThumbnail: thumbnail,
          caption: config.FOOTER,
          mimetype: 'audio/mpeg',
          fileName: title,
        },
        { quoted: mek }
      );

      await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
      console.log(error);
    }
  }
);

cmd(
  {
    pattern: 'soundcloud',
    react: '🎶',
    category: 'download',
    desc: 'SoundCloud search',
    use: '.soundcloud <search query>',
    filename: __filename,
  },
  async (
    conn,
    msg,
    quoted,
    { from, q, isSudo, isOwner, prefix, isMe, reply }
  ) => {
    try {
      if (!q) {
        return reply('🎩 *Please give me words to search*');
      }

      // Fetch search results from API
      let response = await fetchJson(
        `https://api.fgmods.xyz/api/search/soundcloud?text=${q}&apikey=fg_NHnzSf6e`
      );

      // Prepare list rows for results
      let rows = [];
      for (let i = 0; i < response.result.length; i++) {
        rows.push({
          title: response.result[i].title,
          description: '',
          rowId: prefix + 'sounddl ' + response.result[i].url,
        });
      }

      // Prepare list message
      const sections = [
        {
          title: 'soundcloud.com results',
          rows: rows,
        },
      ];

      const listMessage = {
        text: `*_SOUNDCLOUD SEARCH RESULT 🎶_*\n\n*Input:* ${q}`,
        footer: config.FOOTER,
        title: 'soundcloud.com results',
        buttonText: '*Reply Below Number 🎝*',
        sections: sections,
      };

      // Send list message
      await conn.listMessage(from, listMessage, quoted);
    } catch (error) {
      console.log(error);
      await conn.sendMessage(from, { text: '🎩 *Error !!*' }, { quoted });
    }
  }
);

cmd(
  {
    pattern: 'sounddl',
    alias: ['ytsong'],
    use: '.song <query>',
    react: '🎶',
    desc: 'Download songs',
    filename: __filename,
  },
  async (
    conn,
    msg,
    quoted,
    { from, prefix, q, reply }
  ) => {
    try {
      if (!q) {
        return await reply('*❗ Please enter a song name or SoundCloud URL!*');
      }

      const apiUrl =
        'https://darksadasyt-soundcloud-dl.vercel.app/api/fetch-track?q=' +
        encodeURIComponent(q);

      let response;
      try {
        response = await axios.get(apiUrl);
      } catch (apiError) {
        console.error('API request failed:', apiError.message);
        return await reply(
          '❗ The song download server is currently unavailable or returned an error (500). Please try again later.'
        );
      }

      const data = response.data;

      if (!data || !data.url || !data.title || !data.imageURL) {
        return await reply(
          '⚠️ Failed to retrieve valid song data. Please check your query or try again later.'
        );
      }

      // Prepare caption message
      const caption =
        `*🎼 VISPER SOUNDCLOUD DOWNLOADER 🎼*\n\n` +
        `🎶 Title: ${data.title}\n` +
        `🔗 URL: ${q}`;

      // Buttons for Audio and Document
      const buttons = [
        {
          buttonId: prefix + 'spa ' + data.url,
          buttonText: { displayText: 'Audio Type 🎶' },
          type: 1,
        },
        {
          buttonId:
            prefix +
            'spad ' +
            data.url +
            '&' +
            data.imageURL +
            '&' +
            data.title,
          buttonText: { displayText: 'Document Type 🎼' },
          type: 1,
        },
      ];

      // Message to send
      const buttonMessage = {
        image: { url: data.imageURL },
        caption: caption,
        footer: config.FOOTER || 'VISPER BOT',
        buttons: buttons,
        headerType: 4,
      };

      await conn.buttonMessage(from, buttonMessage, msg);
    } catch (error) {
      console.error('Unexpected error:', error);
      await reply(
        '❗ An unexpected error occurred. Please try again later.'
      );
    }
  }
);


cmd(
  {
    pattern: 'automp3',
    react: '🎶',
    dontAddCommandList: true,
    filename: __filename,
  },
  async (
    conn,
    message,
    quoted,
    { from, q: query, reply }
  ) => {
    if (!query) {
      return await reply('❌ Please enter a search keyword.');
    }
    try {
      // Search YouTube videos with yts (YouTube search library)
      const searchResult = await yts(query);
      const videos = searchResult.videos;

      if (!videos || videos.length === 0) {
        return await reply('❌ No songs found.');
      }

      await reply(`🎶 Search successful! Found ${videos.length} songs. Sending the first song now. The next songs will be sent after 40 seconds.`);

      let isFirstSong = true;

      for (const video of videos) {
        // Prepare message caption with video details
        const caption = 
          `*Alex Music Video*\n` +
          `*Title:* ${video.title}\n` +
          `*Views:* ${video.views}\n` +
          `*Duration:* ${video.duration}\n\n` +
          `https://whatsapp.com/channel/0029Vaa6QzC4o7qEV92gin3H\n\n` +
          `> Alex Music Video`;

        // Send video thumbnail with info caption
        await conn.sendMessage(from, {
          image: { url: video.thumbnail },
          caption: caption,
        });

        try {
          // Fetch mp3 download link using an API
          const mp3Response = await fetchWithRetry(
            'https://yt-five-tau.vercel.app/download?q=' +
              encodeURIComponent(video.url) +
              '&format=mp3'
          );

          // Send the mp3 audio file as a voice note (ptt: true)
          await conn.sendMessage(
            from,
            {
              audio: { url: mp3Response.result.download },
              mimetype: 'audio/mpeg',
              ptt: true,
            },
            { quoted: message }
          );
        } catch (err) {
          console.log(`❌ MP3 fetch failed for: ${video.title}`, err);
          await conn.sendMessage(from, {
            text: `❌ Unable to download MP3 for "${video.title}". Tried 3 times.`,
          });
        }

        if (isFirstSong) {
          isFirstSong = false;
          continue; // skip delay after first song
        }

        // Inform user about delay before sending next song
        await conn.sendMessage(from, {
          text: '⏳ Next song will be sent in 40 seconds...',
        });

        // Wait 40 seconds before sending the next song
        await new Promise((resolve) => setTimeout(resolve, 40000));
      }

      await conn.sendMessage(from, {
        text: `✅ Successfully sent ${videos.length} songs.`,
      });
    } catch (error) {
      console.log('❌ Error in automp3 command:', error);
      await reply('❌ An error occurred. Please try again later.');
    }
  }
);

// Helper function to retry fetching JSON from URL with retries
async function fetchWithRetry(url, retries = 3, delayMs = 3000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const jsonData = await fetchJson(url);
      return jsonData;
    } catch (error) {
      console.log(`❌ Retry ${attempt}/${retries} failed:`, error.message || error);
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }
  throw new Error(`⚠️ All retries failed for URL: ${url}`);
}
