const { cmd, commands } = require('../lib/command');
const { fetchJson } = require('../lib/functions');
const { Buffer } = require('buffer');
const { igdl, ttdl } = require('ruhend-scraper');
//const apkdl = require('../lib/apkdl');
const fg = require('api-dylux');
const axios = require('axios');
const mimeTypes = require('mime-types');

const sadiya_apikey = 'sadiya-key-666';
const shan_apikey = 'ae56006bcfe029bd';
const sadiya_md_footer = '> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ꜱᴀᴅɪʏᴀ ᴛᴇᴄʜ*';

cmd(
  {
    pattern: 'twitter',
    alias: ['x', 'twit', 'twitterdl', 'tw'],
    desc: 'Download from Twitter',
    category: 'download',
    filename: __filename,
  },
  async (conn, msg, msgInfo, { from, prefix, quoted, body, isCmd, command, args, q, reply }) => {
    try {
      if (!q) {
        return await reply('*❌ Please give me twitter url*');
      }
      
      // Call API to get twitter video info
      const apiResponse = await fetchJson(
        'https://sadiya-tech-apis.vercel.app/download/twitterdl?url=' + q + '&apikey=' + sadiya_apikey
      );

      // Prepare caption with title
      const caption =
        '📹 𝗧𝗪𝗜𝗧𝗧𝗘𝗥 𝗩𝗜𝗗𝗘𝗢 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥 📥\n\n*★| Title :* ' +
        (apiResponse.result.desc || '');

      // Create button list for SD, HD, and Audio download options
      const sections = [
        {
          title: '',
          rows: [
            { title: '1', rowId: prefix + 'twitsd ' + q, description: '🎬 SD Video' },
            { title: '2', rowId: prefix + 'twithd ' + q, description: '📙 HD Video' },
            { title: '3', rowId: prefix + 'twitaudio ' + q, description: '🎧 Audio File' },
          ],
        },
      ];

      const buttonsMessage = {
        image: { url: apiResponse.result.thumb || '' },
        caption: caption,
        buttonText: '*🔢 Reply below number,*',
        footer: sadiya_md_footer,
        headerType: 4,
        sections: sections,
      };

      await conn.sendMessage(from, buttonsMessage, msgInfo);
    } catch (err) {
      console.log(err);
      reply("❌ *I Couldn't find anything. Please try again later...*");
      await conn.sendMessage(
        conn.user.jid, // bot's own jid
        { text: '❗ *Error Info:* ' + err },
        { quoted: msgInfo }
      );
    }
  }
);

// Handler for SD video download from Twitter
cmd(
  {
    pattern: 'twitsd',
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, msg, msgInfo, { from, prefix, quoted, body, isCmd, command, args, q, reply }) => {
    try {
      const apiResponse = await fetchJson(
        'https://sadiya-tech-apis.vercel.app/download/twitterdl?url=' + q + '&apikey=' + sadiya_apikey
      );

      await conn.sendMessage(
        from,
        {
          video: { url: apiResponse.result.video_sd },
          mimetype: 'video/mp4',
          caption: 'SD VIDEO ✅\n\n' + sadiya_md_footer,
        },
        { quoted: msgInfo }
      );
    } catch (err) {
      console.log(err);
      reply("❌ *I Couldn't find anything. Please try again later...*");
      await conn.sendMessage(
        conn.user.jid,
        { text: '❗ *Error Info:* ' + err },
        { quoted: msgInfo }
      );
    }
  }
);

// Handler for HD video download from Twitter
cmd(
  {
    pattern: 'twithd',
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, msg, msgInfo, { from, prefix, quoted, body, isCmd, command, args, q, reply }) => {
    try {
      const apiResponse = await fetchJson(
        'https://sadiya-tech-apis.vercel.app/download/twitterdl?url=' + q + '&apikey=' + sadiya_apikey
      );

      await conn.sendMessage(
        from,
        {
          video: { url: apiResponse.result.video_hd },
          mimetype: 'video/mp4',
          caption: 'HD VIDEO ✅\n\n' + sadiya_md_footer,
        },
        { quoted: msgInfo }
      );
    } catch (err) {
      console.log(err);
      reply("❌ *I Couldn't find anything. Please try again later...*");
      await conn.sendMessage(
        conn.user.jid,
        { text: '❗ *Error Info:* ' + err },
        { quoted: msgInfo }
      );
    }
  }
);

// Handler for audio download from Twitter
cmd(
  {
    pattern: 'twitaudio',
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, msg, msgInfo, { from, prefix, quoted, body, isCmd, command, args, q, reply }) => {
    try {
      const apiResponse = await fetchJson(
        'https://sadiya-tech-apis.vercel.app/download/twitterdl?url=' + q + '&apikey=' + sadiya_apikey
      );

      await conn.sendMessage(
        from,
        {
          audio: { url: apiResponse.result.audio },
          mimetype: 'audio/mpeg',
        },
        { quoted: msgInfo }
      );
    } catch (err) {
      console.log(err);
      reply("❌ *I Couldn't find anything. Please try again later...*");
      await conn.sendMessage(
        conn.user.jid,
        { text: '❗ *Error Info:* ' + err },
        { quoted: msgInfo }
      );
    }
  }
);
