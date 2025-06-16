const { cmd } = require('../lib/command');
const fetch = require('node-fetch');

const apiBase = 'https://darksadasyt-fbdl.vercel.app/api/fb-download?q=';

// HD VIDEO
cmd({
  pattern: 'fbhdsadas',
  desc: 'Download Facebook HD Video',
  category: 'download',
  use: '.fbhd <facebook link>',
  filename: __filename
}, async (message, match, m, { from, quoted, q, reply }) => {
  try {
    if (!q) return reply("🔗 Facebook video link එකක් දෙන්න!");
    const res = await fetch(apiBase + encodeURIComponent(q));
    const json = await res.json();
    if (!json.result?.videoFormats?.[0]?.url) return reply("❌ HD video එක ලබාගත නොහැක.");
    await message.sendMessage(from, {
      video: { url: json.result.videoFormats[0].url },
      mimetype: 'video/mp4',
      caption: `🎥 Facebook HD Video\n📁 Quality: ${json.result.videoFormats[0].quality}`,
    }, { quoted });
  } catch (err) {
    console.log(err);
    reply("❌ Error downloading HD video.");
  }
});

// SD VIDEO
cmd({
  pattern: 'fbsdsadas',
  desc: 'Download Facebook SD Video',
  category: 'download',
  use: '.fbsd <facebook link>',
  filename: __filename
}, async (message, match, m, { from, quoted, q, reply }) => {
  try {
    if (!q) return reply("🔗 Facebook video link එකක් දෙන්න!");
    const res = await fetch(apiBase + encodeURIComponent(q));
    const json = await res.json();
    if (!json.result?.videoFormats?.[1]?.url) return reply("❌ SD video එක ලබාගත නොහැක.");
    await message.sendMessage(from, {
      video: { url: json.result.videoFormats[1].url },
      mimetype: 'video/mp4',
      caption: `🎥 Facebook SD Video\n📁 Quality: ${json.result.videoFormats[1].quality}`,
    }, { quoted });
  } catch (err) {
    console.log(err);
    reply("❌ Error downloading SD video.");
  }
});

// MP3 AUDIO
cmd({
  pattern: 'fbmp3sadas',
  desc: 'Download Facebook Audio MP3',
  category: 'download',
  use: '.fbmp3 <facebook link>',
  filename: __filename
}, async (message, match, m, { from, quoted, q, reply }) => {
  try {
    if (!q) return reply("🔗 Facebook video link එකක් දෙන්න!");
    const res = await fetch(apiBase + encodeURIComponent(q));
    const json = await res.json();
    if (!json.result?.audioFormats?.[0]?.url) return reply("❌ MP3 audio එක ලබාගත නොහැක.");
    await message.sendMessage(from, {
      audio: { url: json.result.audioFormats[0].url },
      mimetype: 'audio/mpeg',
      ptt: false,
      waveform: true,
    }, { quoted });
  } catch (err) {
    console.log(err);
    reply("❌ Error downloading MP3 audio.");
  }
});
