const { cmd } = require('../lib/command');
const fetch = require('node-fetch');

// COMMON BASE
const API_BASE = 'https://darksadasyt-fbdl.vercel.app/api/fb-download?q=';

// 📽️ FB HD VIDEO
cmd({
  pattern: 'fbhd',
  desc: 'Download Facebook HD Video',
  category: 'download',
  use: '.fbhd <facebook url>',
  filename: __filename
}, async (message, match, m, { from, quoted, q, reply }) => {
  try {
    if (!q) return reply("🔗 Facebook link එකක් දාපං!");
    const res = await fetch(API_BASE + encodeURIComponent(q));
    const json = await res.json();

    const hdVideo = json?.result?.videoFormats?.find(v => v.quality === 'HD');
    if (!hdVideo?.url) return reply("❌ HD Video link එකක් හම්බුනේ නෑ!");

    await message.sendMessage(from, {
      video: { url: hdVideo.url },
      mimetype: 'video/mp4',
      caption: `✅ Facebook HD Video\n📥 Quality: HD\n👤 By: ${json.author || 'Unknown'}`
    }, { quoted });
  } catch (e) {
    console.log(e);
    reply("❌ HD Video download එක fail වුණා!");
  }
});

// 📼 FB SD VIDEO
cmd({
  pattern: 'fbsd',
  desc: 'Download Facebook SD Video',
  category: 'download',
  use: '.fbsd <facebook url>',
  filename: __filename
}, async (message, match, m, { from, quoted, q, reply }) => {
  try {
    if (!q) return reply("🔗 Facebook link එකක් දාපං!");
    const res = await fetch(API_BASE + encodeURIComponent(q));
    const json = await res.json();

    const sdVideo = json?.result?.videoFormats?.find(v => v.quality === 'SD');
    if (!sdVideo?.url) return reply("❌ SD Video link එකක් හම්බුනේ නෑ!");

    await message.sendMessage(from, {
      video: { url: sdVideo.url },
      mimetype: 'video/mp4',
      caption: `✅ Facebook SD Video\n📥 Quality: SD\n👤 By: ${json.author || 'Unknown'}`
    }, { quoted });
  } catch (e) {
    console.log(e);
    reply("❌ SD Video download එක fail වුණා!");
  }
});

// 🎧 FB AUDIO MP3
cmd({
  pattern: 'fbmp3',
  desc: 'Download Facebook Audio (MP3)',
  category: 'download',
  use: '.fbmp3 <facebook url>',
  filename: __filename
}, async (message, match, m, { from, quoted, q, reply }) => {
  try {
    if (!q) return reply("🔗 Facebook link එකක් දාපං!");
    const res = await fetch(API_BASE + encodeURIComponent(q));
    const json = await res.json();

    const audio = json?.result?.audioFormats?.find(a => a.ext === 'mp3');
    if (!audio?.url) return reply("❌ MP3 Audio link එකක් හම්බුනේ නෑ!");

    await message.sendMessage(from, {
      audio: { url: audio.url },
      mimetype: 'audio/mpeg',
      ptt: false
    }, { quoted });
  } catch (e) {
    console.log(e);
    reply("❌ MP3 Download එක fail වුණා!");
  }
});
