const { cmd } = require('../lib/command');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

cmd({
  pattern: 'ytmp3ptt',
  alias: ['ytptt'],
  desc: 'Download YouTube MP3 and send as Voice Note (PTT)',
  category: 'download',
  use: '.ytmp3ptt <YouTube Link>',
  filename: __filename
}, async (conn, m, msg, { q, reply }) => {
  if (!q) return reply('🔗 *YouTube link එකක් දාන්න!*\n\nඋදාහරණයක්: `.ytmp3ptt https://youtu.be/tFNcAHBe6cE`');

  try {
    const apiUrl = `https://kaliyax-yt-api.vercel.app/api/ytmp3?url=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    if (!data?.status || !data?.data?.download?.status) {
      return reply('🚫 Unable to fetch download link. Please check the YouTube URL.');
    }

    const { title } = data.data.metadata;
    const audioUrl = data.data.download.url;

    reply(`🎶 *Downloading:* ${title}\n📥 Sending as Voice Note...`);

    const audio = await axios.get(audioUrl, { responseType: 'arraybuffer' });
    const tempFile = path.join(__dirname, `../temp/${Date.now()}.mp3`);
    fs.writeFileSync(tempFile, audio.data);

    await conn.sendMessage(m.chat, {
      audio: fs.readFileSync(tempFile),
      mimetype: 'audio/mp4',
      ptt: true
    }, { quoted: m });

    fs.unlinkSync(tempFile);
  } catch (err) {
    console.error('PTT ERROR:', err.message);
    reply('⚠️ *Error while downloading or sending voice note.*\n\n🧪 Try again later or check the URL.');
  }
});
