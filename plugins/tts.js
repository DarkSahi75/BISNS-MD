const { cmd } = require('../lib/command');
const { tts } = require('google-tts-api');
const axios = require('axios');
const fs = require('fs');

cmd({
  pattern: 'tts',
  alias: ['text2voice', 'say'],
  category: 'tools',
  use: '.tts [text]',
  desc: 'Convert text to voice using Google TTS',
  react: '🗣️'
}, async (m, text, { conn }) => {
  if (!text) return m.reply('📝 කරුණාකර පණිවුඩයක් සපයන්න.\nตัวอย่าง: `.tts Hello world`');

  try {
    // Google TTS URL
    const url = tts.getAudioUrl(text, {
      lang: 'en',
      slow: false,
      host: 'https://translate.google.com',
    });

    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const filePath = './temp_tts.mp3';

    fs.writeFileSync(filePath, response.data);

    await conn.sendMessage(m.chat, {
      audio: fs.readFileSync(filePath),
      mimetype: 'audio/mpeg',
      ptt: true // Send as voice message (PTT)
    }, { quoted: m });

    fs.unlinkSync(filePath);
  } catch (e) {
    console.error(e);
    m.reply('❌ වචන ➜ හඬ වලට පරිවර්තනය කිරීමේදී දෝෂයක් ඇතිවිය.');
  }
});
