const { cmd } = require('../lib/command');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

cmd({
  pattern: 'kariyax',
  alias: ['ytptt'],
  desc: 'Download YouTube MP3 and send as Voice Note (PTT)',
  category: 'download',
  use: '.ytmp3ptt <YouTube Link>',
  filename: __filename
}, async (m, conn, msg, { q, args, reply }) => {
  if (!q) return reply('🧑‍🎤 *YouTube link එකක් දෙන්න!*\n\n🧪 *Use:* `.ytmp3ptt https://youtu.be/xxxx`');

  try {
    const api = `https://kaliyax-yt-api.vercel.app/api/ytmp3?url=${encodeURIComponent(q)}`;
    const res = await axios.get(api);

    if (!res.data.status || !res.data.data.download.status)
      return reply('❌ Download Error: MP3 link unavailable.');

    const data = res.data.data;
    const audioUrl = data.download.url;
    const title = data.metadata.title;
    const author = data.metadata.author.name;
    const thumb = data.metadata.thumbnail;
    const filename = `${title}.mp3`;

    reply(`🎧 *Title:* ${title}\n👤 *Artist:* ${author}\n📥 *Sending as Voice Note...*`);

    const audioRes = await axios.get(audioUrl, { responseType: 'arraybuffer' });
    const tempPath = path.join(__dirname, '../temp', filename);
    fs.writeFileSync(tempPath, audioRes.data);

    await conn.sendMessage(m.chat, {
      audio: fs.readFileSync(tempPath),
      mimetype: 'audio/mp4',
      ptt: true,
    }, { quoted: m });

    fs.unlinkSync(tempPath);
  } catch (e) {
    console.error(e);
    reply('⚠️ Error while downloading or sending audio.');
  }
});
