const cmd = require('../lib/command');
const fetch = require('node-fetch');
const fs = require('fs-extra');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const path = require('path');

ffmpeg.setFfmpegPath(ffmpegPath);

cmd(
  {
    pattern: 'igmp3ff',
    desc: 'To get the Instagram video/audio.',
    react: '📸',
    use: '.ig <Link>',
    category: 'download',
    filename: __filename,
  },
  async (
    conn,
    msg,
    args,
    { from, quoted, body, isCmd, command, args: argList, q, reply }
  ) => {
    try {
      if (!q) return reply('Please Give Me a valid Instagram Link...');

      reply.react('⌛');

      let response = await fetch(`https://darksadasyt-igdl.vercel.app/api/download?q=${q}`);
      let data = await response.json();
      let videoUrl = data.result.data[0].downloadUrl;

      // Temp file paths
      const filename = `insta_${Date.now()}`;
      const videoPath = path.join(__dirname, `${filename}.mp4`);
      const audioPath = path.join(__dirname, `${filename}.mp3`);

      // Download video
      const vidBuffer = await fetch(videoUrl).then(res => res.buffer());
      await fs.writeFile(videoPath, vidBuffer);

      // Convert video to mp3
      await new Promise((resolve, reject) => {
        ffmpeg(videoPath)
          .toFormat('mp3')
          .on('end', resolve)
          .on('error', reject)
          .save(audioPath);
      });

      // Send video
      await conn.sendMessage(from, {
        video: { url: videoUrl },
        mimetype: 'video/mp4',
        caption: '🎬 Here is your Instagram video.',
      }, { quoted: msg });

      // Send audio
      await conn.sendMessage(from, {
        audio: { url: audioPath },
        mimetype: 'audio/mp4',
        ptt: false,
        caption: '🎵 Extracted Audio (MP3)',
      }, { quoted: msg });

      reply.react('✅');

      // Clean up temp files
      await fs.unlink(videoPath);
      await fs.unlink(audioPath);

    } catch (err) {
      console.error(err);
      reply('⚠️ Error downloading video or converting to MP3.');
    }
  }
);
