// Importing required modules and functions
const { cmd, commands } = require('../lib/command');
const {
  getBuffer,
  getGroupAdmins,
  getRandom,
  h2k,
  isUrl,
  Json,
  runtime,
  sleep,
  fetchJson,
} = require('../lib/functions');
const config = require('../settings');
const fs = require('fs');
const axios = require('axios');
const googleTTS = require('google-tts-api');
const { tmpdir } = require('os');
const translate = require('translate-google-api');
const Crypto = require('crypto');
const imbb = require('darksadasyt-imgbb-scraper');
const fileType = require('file-type');
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

// Converts video buffer to webp image buffer for stickers
async function videoToWebp(videoBuffer) {
  // Create temporary file paths for .webp and .mp4 files
  const webpPath = path.join(
    tmpdir(),
    Crypto.randomBytes(6).readUIntLE(0, 6).toString(36) + '.webp'
  );
  const mp4Path = path.join(
    tmpdir(),
    Crypto.randomBytes(6).readUIntLE(0, 6).toString(36) + '.mp4'
  );

  // Save video buffer as mp4 temporarily
  fs.writeFileSync(mp4Path, videoBuffer);

  // Convert mp4 video to webp format using ffmpeg with options
  await new Promise((resolve, reject) => {
    ffmpeg(mp4Path)
      .on('error', reject)
      .on('end', () => resolve(true))
      .addOutputOptions([
        '-vcodec',
        'libwebp',
        '-vf',
        "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15," +
          "pad=320:320:-1:-1:color=white@0.0,split [a][b]; [a] palettegen=reserve_transparent=on:" +
          "transparency_color=ffffff [p]; [b][p] paletteuse",
        '-loop',
        '0',
        '-ss',
        '00:00:00',
        '-t',
        '00:00:05',
        '-preset',
        'default',
        '-an',
        '-vsync',
        '0',
      ])
      .toFormat('webp')
      .save(webpPath);
  });

  // Read generated webp buffer and delete temp files
  const webpBuffer = fs.readFileSync(webpPath);
  fs.unlinkSync(webpPath);
  fs.unlinkSync(mp4Path);

  return webpBuffer;
}

// Converts input audio/video to mp3 audio
function toAudio(inputPath, outputPath) {
  return ffmpeg(inputPath, ['-vn', '-ac', '2', '-b:a', '128k', '-ar', '44100', '-f', 'mp3'], outputPath, 'mp3');
}

// Converts input audio/video to opus PTT (push to talk) audio format
function toPTT(inputPath, outputPath) {
  return ffmpeg(inputPath, [
    '-vn',
    '-c:a',
    'libopus',
    '-b:a',
    '128k',
    '-vbr',
    'on',
    '-compression_level',
    '10',
  ], outputPath, 'opus');
}

// Converts input video to mp4 format with specified settings
function toVideo(inputPath, outputPath) {
  return ffmpeg(inputPath, [
    '-c:v',
    'libx264',
    '-c:a',
    'aac',
    '-ab',
    '128k',
    '-ar',
    '44100',
    '-crf',
    '32',
    '-preset',
    'slow',
  ], outputPath, 'mp4');
}

// Command: .img2url - converts an image to an image URL (using imgbb)
cmd(
  {
    pattern: 'img2url',
    react: '🖼️',
    alias: ['tourl', 'imgurl', 'telegraph', 'imgtourl'],
    desc: 'Convert image to URL',
    category: 'convert',
    use: '.img2url <reply to image>',
    filename: __filename,
  },
  async (conn, message, args, { quoted, reply }) => {
    try {
      // Check if the message or quoted message contains an image
      const isQuotedImage = quoted && (quoted.type === 'imageMessage' || (quoted.type === 'viewOnceMessage' && quoted.msg.type === 'imageMessage'));
      if (message.type === 'imageMessage' || isQuotedImage) {
        const randomFilename = getRandom('');
        // Download the image buffer (quoted or direct)
        const imageBuffer = isQuotedImage ? await quoted.download(randomFilename) : await message.download(randomFilename);
        // Get file type info
        const typeInfo = await fileType.fromBuffer(imageBuffer);
        // Save image temporarily
        await fs.promises.writeFile('./' + typeInfo.ext, imageBuffer);
        // Upload to imgbb and get URL
        const imageUrl = await imbb('./' + typeInfo.ext);
        // Send back the URL
        await reply('*🖼️ Here is the image URL:* \n' + imageUrl);
      } else {
        return reply('Please reply to an image or send an image.');
      }
    } catch (error) {
      reply("Sorry, I couldn't process the image.");
      console.error(error);
    }
  }
);

// Command: .sticker - converts image or video to sticker
cmd(
  {
    pattern: 'sticker',
    react: '🎭',
    alias: ['s', 'stic'],
    desc: 'Convert to sticker',
    category: 'convert',
    use: '.sticker <reply to image or video>',
    filename: __filename,
  },
  async (conn, message, args, { from, quoted, reply, command, q, pushname }) => {
    try {
      const isViewOnce = quoted ? quoted.type === 'viewOnceMessage' : false;
      const isQuotedImage = quoted ? quoted.type === 'imageMessage' || (isViewOnce ? quoted.msg.type === 'imageMessage' : false) : false;
      const isQuotedVideo = quoted ? quoted.type === 'videoMessage' || (isViewOnce ? quoted.msg.type === 'videoMessage' : false) : false;
      const isQuotedSticker = quoted ? quoted.type === 'stickerMessage' : false;

      if (message.type === 'imageMessage' || isQuotedImage) {
        const randomFileName = getRandom('');
        // Download the image buffer
        if (isQuotedImage) await quoted.download(randomFileName);
        else await message.download(randomFileName);

        // Create sticker object
        let sticker = new Sticker(randomFileName + '.jpg', {
          pack: pushname,
          author: '©MOVIE-VISPER',
          type: q.includes('--crop') || q.includes('-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
          categories: ['🎨', '🖼️'],
          id: '12345',
          quality: 75,
          background: 'transparent',
        });

        // Get sticker buffer and send
        const stickerBuffer = await sticker.toBuffer();
        return conn.sendMessage(from, { sticker: stickerBuffer }, { quoted: message });
      } else if (isQuotedSticker) {
        // If quoted message is a sticker, send it back
        const randomFileName = getRandom('');
        await quoted.download(randomFileName);
        let sticker = new Sticker(randomFileName + '.webp', {
          pack: pushname,
          author: '',
          type: q.includes('--crop') || q.includes('-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
          categories: ['🎨', '🖼️'],
          id: '12345',
          quality: 75,
          background: 'transparent',
        });
        const stickerBuffer = await sticker.toBuffer();
        return conn.sendMessage(from, { sticker: stickerBuffer }, { quoted: message });
      } else {
        return await reply('Please reply to an image, video, or sticker.');
      }
    } catch (error) {
      await reply('*Error !!*');
      console.error(error);
    }
  }
);

// Command: .attp - creates a text to sticker GIF (animated text sticker)
cmd(
  {
    pattern: 'attp',
    react: '✨',
    alias: ['texttogif'],
    desc: 'Convert text to animated sticker',
    category: 'convert',
    use: '.attp <text>',
    filename: __filename,
  },
  async (conn, message, args, { from, reply, q }) => {
    try {
      if (!q) return await reply('Please provide some text.');

      // Fetch animated sticker buffer from external API
      let buffer = await getBuffer('https://api-fix.onrender.com/api/maker/attp?text=' + encodeURIComponent(q));
      // Convert to webp format sticker buffer
      const webpSticker = await videoToWebp(buffer);
      // Send sticker back
      await conn.sendMessage(from, { sticker: webpSticker }, { quoted: message });
    } catch (error) {
      console.log(error);
    }
  }
);

cmd(
  {
    pattern: 'tts',
    react: '🎞️',
    desc: 'text to speech.',
    category: 'convert',
    filename: __filename,
    use: '.tts hi',
  },
  async (
    conn,      // WhatsApp connection object
    msg,       // Message object
    chat,      // Chat object
    { from, quoted, body, isCmd, command, args, q, reply }
  ) => {
    try {
      if (!q) {
        return chat.reply('Please give me a sentence to convert into audio.');
      }
      let textToSpeak = q;
      // Generate Google TTS audio URL
      const audioUrl = googleTTS.getAudioUrl(textToSpeak, {
        lang: 'en',
        slow: false,
        host: 'https://translate.google.com',
      });

      // Send audio message with the TTS URL
      return conn.sendMessage(
        chat.chat,
        {
          audio: { url: audioUrl },
          mimetype: 'audio/mpeg',
          fileName: 'ttsAudio.m4a',
        },
        { quoted: msg }
      );
    } catch (error) {
      reply('*Error !!*');
      console.error(error);
    }
  }
);

cmd(
  {
    pattern: 'toptt',
    react: '🎞️',
    alias: ['toaudio', 'tomp3'],
    desc: 'convert video reply to audio',
    category: 'convert',
    use: '.toptt <Reply to video>',
    filename: __filename,
  },
  async (
    conn,
    msg,
    chat,
    { from, l, quoted, body, isCmd, command, args, q, reply }
  ) => {
    try {
      // Check if quoted message is a video
      let isVideo =
        quoted
          ? quoted.type === 'videoMessage'
          : msg
          ? msg.type === 'videoMessage'
          : false;

      if (!isVideo) {
        return await reply('Please reply to a video message.');
      }

      // Download video content
      let videoBuffer = quoted
        ? await quoted.download()
        : await msg.download();

      // Convert video to push-to-talk (PTT) audio
      let pttAudio = await toPTT(videoBuffer, 'mp4');

      // Send audio message with converted audio
      let sentMsg = await conn.sendMessage(
        chat.chat,
        {
          audio: pttAudio.options,
          mimetype: 'audio/mpeg',
        },
        { quoted: msg }
      );

      // React with checkmark
      await conn.sendMessage(from, {
        react: {
          text: '✅',
          key: sentMsg.key,
        },
      });
    } catch (error) {
      reply('*Error !!*');
      console.error(error);
    }
  }
);

cmd(
  {
    pattern: 'boom',
    desc: 'forward message multiple times',
    alias: ['bbb'],
    category: 'convert',
    use: '.boom <jid> & <count>',
    filename: __filename,
  },
  async (
    conn,
    msg,
    chat,
    { from, l, quoted, body, isCmd, command, args, q, reply }
  ) => {
    if (!q || !msg.quoted) return reply('*Give me message & count*');

    const jid = q.split(' & ')[0];
    const count = parseInt(q.split(' & ')[1]);

    let sentCount = 0;

    // Prepare message object to forward
    let msgToForward = {
      key: msg.quoted?.fakeObj?.key,
      message: msg.quoted,
    };

    // Handle document with caption rename if exists
    if (msg.quoted?.documentWithCaptionMessage?.message?.documentMessage) {
      let mime = msg.quoted.documentWithCaptionMessage.message.documentMessage.mimetype;
      const mimeTypes = require('mime-types');
      let ext = mimeTypes.extension(mime);
      msg.quoted.documentWithCaptionMessage.message.documentMessage.fileName =
        (msgToForward.message.caption || 'file') + '.' + ext;
    }

    // Forward the message specified times
    while (sentCount < count) {
      await conn.forwardMessage(jid, msgToForward, false);
      sentCount++;
    }

    return reply(`*🚀 Boom sender to:*\n\n ${jid}`);
  }
);


// Readmore command: Sends a message with a large hidden text part (to create "read more" effect)
cmd(
  {
    pattern: 'readmore',
    desc: 'Readmore message',
    category: 'convert',
    use: '.readmore <text>',
    react: '🔗',
    filename: __filename,
  },
  async (conn, msg, chat, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
      // If no text is provided, default message is 'No text provided'
      let text = q ? q : 'No text provided';

      // This special Unicode character repeated many times creates the "read more" effect on WhatsApp
      let readMore = '\u2063'.repeat(4000); 

      // Combine the invisible readMore and the text to send
      let sendText = readMore + text;

      // Send the message quoting the original message
      await conn.sendMessage(from, { text: sendText }, { quoted: msg });

      // Optionally react to the message (empty reaction here)
      await conn.sendMessage(from, {
        react: {
          text: '',
          key: msg.key,
        },
      });
    } catch (error) {
      console.log(error);
      reply('Error: ' + error.message);
    }
  }
);

// JS Obfuscator command: Obfuscate JavaScript code sent by the user
cmd(
  {
    pattern: 'jsobfus',
    desc: 'Js code obfuscator',
    alias: ['encript', 'obfus'],
    react: '🛡️',
    use: '.jsobfus <js code>',
    category: 'convert',
    filename: __filename,
  },
  async (conn, msg, chat, { from, q, args, reply }) => {
    try {
      // Use JavaScriptObfuscator library to obfuscate the code
      var obfuscated = JavaScriptObfuscator.obfuscate(q);
      reply(obfuscated.getObfuscatedCode());
    } catch (error) {
      console.error(error);
      reply('An error occurred: ' + error.message);
    }
  }
);

// Translate command: Translate given text to a specified language
cmd(
  {
    pattern: 'translate',
    alias: ['trt'],
    react: '🌐',
    desc: 'Translate text to a specified language',
    category: 'convert',
    use: '.translate <text> to <language>',
    filename: __filename,
  },
  async (conn, msg, chat, { from, reply, q }) => {
    try {
      // Split input by ' to ' to separate text and target language
      const [text, lang] = q.split(' to ');
      if (!text || !lang) {
        return await reply('.trt How are you to si');
      }
      // Call translate function (assumed imported) to translate the text
      const translated = await translate(text, { to: lang });
      await reply('*🌐 Translated Text*\n\n' + translated);
    } catch (error) {
      console.error(error);
      reply('An error occurred while translating the text. Please try again later.');
    }
  }
);

cmd(
  {
    pattern: 'gitclone',
    alias: ['gitdl'],
    react: '🗫',
    desc: 'Download git repos',
    category: 'convert',
    use: '.gitclone <repo link>',
    filename: __filename,
  },
  async (
    conn,
    message,
    args,
    { from, quoted, body, isCmd, command, q, reply }
  ) => {
    try {
      if (!q) return await reply('Please provide a GitHub repository link.');

      let repoLink = q;

      // Validate GitHub URL format
      const match = repoLink.match(/(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i);
      if (!match) {
        return reply('❌ *Please Give Me Valid GitHub Repo Link!*');
      }

      let [, owner, repoName] = match;
      repoName = repoName.replace(/.git$/, ''); // Remove .git suffix if present

      // Construct GitHub API URL to download zipball archive
      let zipUrl = `https://api.github.com/repos/${owner}/${repoName}/zipball`;

      // Fetch headers to get filename from content-disposition
      let res = await fetch(zipUrl, { method: 'HEAD' });
      let contentDisposition = res.headers.get('content-disposition');
      let fileName = contentDisposition.match(/attachment; filename=(.*)/)[1];

      let caption = config.FOOTER || '';

      // Send ZIP file as a document
      await conn.sendMessage(
        from,
        {
          document: { url: zipUrl },
          mimetype: 'application/zip',
          fileName: fileName,
          caption: caption,
        },
        { quoted: message }
      );
    } catch (error) {
      reply('Failed to download GitHub repo.');
      console.log(error);
    }
  }
);

cmd(
  {
    pattern: 'npm',
    desc: 'Search for a package on npm.',
    react: '📦',
    use: '.npm <package name>',
    category: 'convert',
    filename: __filename,
  },
  async (
    conn,
    message,
    args,
    { from, args: packageArgs, reply }
  ) => {
    if (!packageArgs.length) {
      return reply('Please provide the name of the npm package you want to search for. Example: .npm express');
    }

    const packageName = packageArgs.join(' ');
    const apiUrl = 'https://registry.npmjs.org/' + encodeURIComponent(packageName);

    try {
      let res = await fetch(apiUrl);
      if (!res.ok) throw new Error('Package not found or an error occurred.');

      let data = await res.json();

      const latestVersion = data['dist-tags'].latest;
      const description = data.description || 'No description available.';
      const homepage = data.homepage || 'No homepage available.';
      const packageUrl = 'https://www.npmjs.com/package/' + packageName;
      const author = data.author ? data.author.name || 'Unknown' : 'Unknown';
      const license = data.license || 'Unknown';
      const repository = data.repository ? data.repository.url || 'Not available' : 'Not available';
      const keywords = data.keywords ? data.keywords.join(', ') : 'No keywords provided';

      let replyText = `*📦 VISPER NPM SEARCH 📦*\n\n` +
        `• Npm name: ${packageName}\n` +
        `• Description: ${description}\n` +
        `• Latest version: ${latestVersion}\n` +
        `• License: ${license}\n` +
        `• Repository: ${repository}\n` +
        `• Url: ${packageUrl}\n` +
        `• Author: ${author}\n` +
        `• Keywords: ${keywords}`;

      await conn.sendMessage(from, { text: replyText }, { quoted: message });
    } catch (error) {
      console.error(error);
      reply('An error occurred: ' + error.message);
    }
  }
);

cmd(
  {
    pattern: 'ss',
    alias: ['webss'],
    react: '📸',
    desc: 'Web screenshot',
    category: 'convert',
    use: '.ss <url>',
    filename: __filename,
  },
  async (
    conn,
    message,
    args,
    { from, reply, q }
  ) => {
    try {
      if (!q) {
        return await reply('Please provide a search query!');
      }

      // API call to screenshot service
      const response = await axios.get(
        'https://api.pikwy.com/?tkn=125&d=3000&u=' +
          encodeURIComponent(q) +
          '&fs=0&w=1280&h=1200&s=100&z=100&f=jpg&rt=jweb'
      );

      await conn.sendMessage(
        from,
        {
          image: { url: response.data.iurl },
          caption: config.FOOTER || '',
        },
        { quoted: message }
      );
    } catch (error) {
      console.error(error);
      reply('An error occurred while processing your request. Please try again later.');
    }
  }
);

cmd(
  {
    pattern: 'vv',
    alias: ['retrive', 'viewonce'],
    react: '👁️',
    desc: 'Fetch and resend a ViewOnce message content (image/video/voice).',
    category: 'misc',
    use: '<reply to a view once message>',
    filename: __filename,
  },
  async (
    conn,
    message,
    args,
    { from, reply }
  ) => {
    try {
      if (!message.quoted) {
        return reply('Please reply to a ViewOnce message.');
      }

      const quotedType = message.quoted.type;
      let fileExtension, mediaType;

      if (quotedType === 'imageMessage') {
        fileExtension = 'jpg';
        mediaType = 'image';
      } else if (quotedType === 'videoMessage') {
        fileExtension = 'mp4';
        mediaType = 'video';
      } else if (quotedType === 'audioMessage') {
        fileExtension = 'mp3';
        mediaType = 'audio';
      } else {
        return reply('Please reply to an image, video, or audio message 👁️.');
      }

      // Download media content from quoted message
      let mediaBuffer = await message.quoted.download();
      let tempFileName = Date.now() + '.' + fileExtension;

      // Save to file
      fs.writeFileSync(tempFileName, mediaBuffer);

      let mediaContent = {};
      mediaContent[mediaType] = fs.readFileSync(tempFileName);

      // Send media back to chat
      await conn.sendMessage(from, mediaContent);

      // Delete temp file
      fs.unlinkSync(tempFileName);
    } catch (error) {
      console.log('Error:', error);
      reply('An error occurred while fetching the ViewOnce message.');
    }
  }
);

cmd({
  pattern: "ali",
  category: "main",
  react: "👋",
  desc: "Auto resend user message except command",
  use: ".alive [your message]",
  filename: __filename
},
async (conn, mek, m, { from }) => {
  try {
    const fullText = m.text || ""; // full incoming message (e.g. '.alive Hello')
    
    // regex එකෙන් `.alive` අරගෙන balance msg එක retain කරනවා
    const userMsg = fullText.replace(/^([!.]alive)\s*/i, "").trim();

    if (userMsg.length > 0) {
      // .alive එකට පසුව තියෙන කෑල්ල යවන්න
      await conn.sendMessage(from, { text: userMsg }, { quoted: mek });
    }

    // මැසෙජ් එකක් නැති නම් කිසිවක් කරන්න එපා
    return;

  } catch (err) {
    console.error("Alive Command Error:", err);
  }
});
