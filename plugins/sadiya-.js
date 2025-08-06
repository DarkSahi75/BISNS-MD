const { cmd } = require('../lib/command');
const { fetchJson } = require('axios');
const yts = require('yt-search');

const sadiya_apikey = 'sadiya-key-666';
const footer = '> *© 𝐘𝐨𝐮𝐓𝐮𝐛𝐞 𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝𝐞𝐫*';

cmd({
  pattern: 'sadiyasong',
  react: '🎵',
  alias: ['ytmp3', 'ytsong'],
  desc: 'Download Youtube Songs.',
  category: 'download',
  filename: __filename
}, async (conn, msg, m, { prefix, q, reply }) => {
  if (!q) return reply('❌ *Give me a title or URL*');

  try {
    const search = await yts(q);
    const video = search.videos[0];
    const videoUrl = video.url;

    const caption = `🎶 *Music Downloader Result* 📥\n\n`
      + `- 🎵 *TITLE:* ${video.title}\n`
      + `- 🙋 *DESCRIPTION:* ${video.description}\n`
      + `- ⏱️ *TIME:* ${video.timestamp}\n`
      + `- 👀 *VIEWS:* ${video.views}\n`
      + `- 🔇 *AGO:* ${video.ago}`;

    const sections = [
      {
        title: '',
        rows: [
          {
            title: '1',
            rowId: `${prefix}ytmp3 ${videoUrl}`,
            description: '🎧 Audio File'
          },
          {
            title: '2',
            rowId: `${prefix}ytdoc ${videoUrl}`,
            description: '📙 Document File'
          }
        ]
      }
    ];

    await conn.replyBtn(m.from, {
      image: { url: video.thumbnail || '' },
      caption,
      buttonText: '*🔢 Reply below number,*',
      footer,
      headerType: 4,
      sections
    }, msg);
  } catch (err) {
    console.log(err);
    reply('❌ *I couldn\'t find anything. Please try again later...*');
    await conn.sendMessage(m.botNumber + '@s.whatsapp.net', { text: '❗ *Error Info:* ' + err }, { quoted: msg });
  }
});

cmd({
  pattern: 'ytmp3',
  dontAddCommandList: true,
  filename: __filename
}, async (conn, msg, m, { q, from, reply }) => {
  try {
    const res = await fetchJson(`https://sadiya-tech-apis.vercel.app/download/ytdl?url=${q}&apikey=${sadiya_apikey}&format=mp3`);
    const audioUrl = res.result.download;

    await conn.sendMessage(from, {
      audio: { url: audioUrl },
      mimetype: 'audio/mpeg'
    }, { quoted: msg });
  } catch (err) {
    console.log(err);
    reply('❌ *I couldn\'t find anything. Please try again later...*');
    await conn.sendMessage(m.botNumber + '@s.whatsapp.net', { text: '❗ *Error Info:* ' + err }, { quoted: msg });
  }
});

cmd({
  pattern: 'ytdoc',
  dontAddCommandList: true,
  filename: __filename
}, async (conn, msg, m, { q, from, reply }) => {
  try {
    const res = await fetchJson(`https://sadiya-tech-apis.vercel.app/download/ytdl?url=${q}&apikey=${sadiya_apikey}&format=mp3`);
    const audioUrl = res.result.download;

    await conn.sendMessage(from, {
      document: { url: audioUrl },
      mimetype: 'audio/mpeg',
      fileName: res.result.title + '.mp3',
      caption: footer
    }, { quoted: msg });
  } catch (err) {
    console.log(err);
    reply('❌ *I couldn\'t find anything. Please try again later...*');
    await conn.sendMessage(m.botNumber + '@s.whatsapp.net', { text: '❗ *Error Info:* ' + err }, { quoted: msg });
  }
});
