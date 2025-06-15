const cmd = require('../lib/command'); // Bot එකේ structure එකට අනුව වෙනස් වෙනවා
const fetch = require('node-fetch');
const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

const tmpFolder = './tmp';
fs.ensureDirSync(tmpFolder);

// Helper function to download video
async function downloadVideo(url, outputPath) {
  const writer = fs.createWriteStream(outputPath);
  const response = await axios({ url, method: 'GET', responseType: 'stream' });
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

// Helper function to convert video to mp3
async function convertToMp3(videoPath, audioPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .output(audioPath)
      .audioCodec('libmp3lame')
      .on('end', resolve)
      .on('error', reject)
      .run();
  });
}

cmd({
  pattern: "igadumolaya",
  desc: "Instagram video -> voice note",
  category: "download",
  filename: __filename
},
async (conn, mek, m, { q, reply }) => {
  if (!q || !q.includes('instagram.com')) return reply("Give me a valid Instagram link");

  try {
    const res = await fetch(`https://api-dark-shan-yt.koyeb.app/download/instagram?url=${encodeURIComponent(q)}&apikey=edbcfabbca5a9750`);
    const json = await res.json();

    const videoUrl = json?.data?.url?.[0]?.url;
    if (!videoUrl) return reply("Video not found");

    const videoPath = path.join(tmpFolder, 'input.mp4');
    const audioPath = path.join(tmpFolder, 'output.mp3');

    await downloadVideo(videoUrl, videoPath);
    await convertToMp3(videoPath, audioPath);

    await conn.sendMessage(m.chat, {
      audio: fs.readFileSync(audioPath),
      mimetype: 'audio/mpeg',
      ptt: true
    }, { quoted: mek });

    fs.unlinkSync(videoPath);
    fs.unlinkSync(audioPath);

  } catch (err) {
    console.error(err);
    reply("❌ Error converting video to audio.");
  }
});

// Duplicate for igmp3 (normal audio) and igdoc (document audio)
