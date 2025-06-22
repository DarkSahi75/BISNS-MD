const fetch = require("node-fetch");
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions')
const { cmd, commands } = require("../lib/command");
const yts = require("yt-search");
const config = require("../settings");
const cheerio = require('cheerio');
const axios = require("axios");
const prefix = config.PREFIX || ".";
const { Buffer } = require('buffer');
const { igdl, ttdl } = require('ruhend-scraper');
const fg = require('api-dylux');
const mimeTypes = require('mime-types');
const gis = require("g-i-s");
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require('@whiskeysockets/baileys');
//const prefix = config.PREFIX || ".";
const sadiya_apikey = 'sadiya-key-666';
const shan_apikey = 'ae56006bcfe029bd';
const sadiya_md_footer = '> *〽️ade By Dinuwh Bbh*';
const desc = 'DINUWH-HTO';





cmd({
  pattern: "gimg",
  react: "😫",
  desc: "Google Image Search via g-i-s",
  category: "search",
  use: ".gimg dog",
  filename: __filename
}, async (conn, m, msg, { q, reply }) => {
  if (!q) return reply("🔍 උදාහරණයක්: .gimg cat");

  try {
    gis(q, async (error, results) => {
      if (error || !results || results.length === 0) return reply("😢 කිසිම ප්‍රතිඵලයක් හමු නොවිනි!");

      const top3 = results.slice(0, 3);
      const cards = [];

      for (let img of top3) {
        const media = await prepareWAMessageMedia(
          { image: { url: img.url } },
          { upload: conn.waUploadToServer }
        );

        cards.push({
          header: proto.Message.InteractiveMessage.Header.fromObject({
            title: q.substring(0, 30) + ' 🔍',
            hasMediaAttachment: true,
            ...media
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
            buttons: [{
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "🌐 View Image",
                url: img.url,
                merchant_url: img.url
              })
            }]
          })
        });
      }

      const msgContent = await generateWAMessageFromContent(m.chat, {
        ephemeralMessage: {
          message: {
            interactiveMessage: proto.Message.InteractiveMessage.fromObject({
              body: { text: `🖼️ Google Image Results for *"${q}"*` },
              carouselMessage: { cards }
            })
          }
        }
      }, { userJid: m.chat, quoted: m });

      await conn.relayMessage(m.chat, msgContent.message, { messageId: msgContent.key.id });
    });
  } catch (e) {
    console.error(e);
    return reply("💥 කෑවෙ පකෝ. නැවත උත්සහ කරන්න.");
  }
});


/*
cmd(
  {
    pattern: 'twitter',
    alias: ['x', 'twit', 'twitterdl', 'tw'],
    react: '❤️‍🩹',
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
        '\`乂 Ｄ𝚒ｎｕｗｈ Чт Ｄｏｗｎ⟩⟩⟩\`\n╭────────✦✧✦────────╯\n\n*★| Title :* ' +
        (apiResponse.result.desc || '');
  if (config.MODE === 'nonbutton') {
  const sections = [
  {
    title: "📹 𝐕𝐢𝐝𝐞𝐨 𝐖𝐢𝐭𝐡 𝐒𝐃",
    rows: [
      {
        title: "1.1",
        rowId: `${prefix}twsd ${q}`,
        description: 'SD Normal Video 📹'
      },
      {
        title: "1.2",
        rowId: `${prefix}twsdptv ${q}`,
        description: '\`SD video Note 📹\`'
      },
      {
        title: "1.3",
        rowId: `${prefix}twsddoc ${q}`,
        description: 'SD Document Video 📄'
      }
    ] 
  },
  {
    title: "🎞️ 𝐕𝐢𝐝𝐞𝐨 𝐖𝐢𝐭𝐡 𝐇𝐃",
    rows: [
      {
        title: "2.1",
        rowId: `${prefix}twhd ${q}`,
        description: 'HD Normal Video 📹'
      },
     {
        title: "2.2",
        rowId: `${prefix}twhdptv ${q}`,
        description: '\`HD Video Note 📹\`'
      }, 
      {
        title: "2.3",
        rowId: `${prefix}twhddoc ${q}`,
        description: 'HD Document Video 📄'
      }
    ]
  },
  {
    title: "🎧 𝐀𝐮𝐝𝐢𝐨 𝐎𝐩𝐭𝐢𝐨𝐧𝐬",
    rows: [
      {
        title: "3.1",
        rowId: `${prefix}twaud ${q}`,
        description: 'Audio With Normal File 🎵'
      },
      {
        title: "3.2",
        rowId: `${prefix}twauddoc ${q}`,
        description: '\`Audio With Document File 📄\`'
      },
      {
        title: "3.3",
        rowId: `${prefix}twaudptt ${q}`,
        description: 'Audio With Voice Note 🎤'
      }
    ]
  }
];
const listMessage = {
  caption: caption,
  image: { url: apiResponse.result.thumb },
  footer: '> *〽️ade By Dinuwh Bbh*',
  title: '',
  buttonText: '> *◎Reply Below Number ⇲◎*',
  sections
};

return await conn.replyList(from, listMessage, { quoted: msg });
	//button
} if (config.MODE === 'button') {
      const listData = {
  title: "𝐕𝐢𝐝𝐞𝐨 𝐒𝐞𝐥𝐞𝐜𝐭𝐢𝐨𝐧 ツ",
  sections: [
    {
      title: "⥥ Sd Qulity ᴠɪᴅᴇᴏ ᴄᴏʟʟᴇᴄᴛɪᴏɴ ⇲",
      rows: [
        {
          title: "SD Normal Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}twsd ${q}`
        },
        {
          title: "SD Document Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}twsddoc ${q}`
        },
	{
          title: "SD Video Note",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}twsdptv ${q}`
	}
      ]
    },
    {
      title: "⥥ Hd Qulity ᴠɪᴅᴇᴏ ᴄᴏʟʟᴇᴄᴛɪᴏɴ ⇲",
      rows: [
        {
          title: "HD Normal Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}twhd ${q}`
        },
	{
          title: "HD Document Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}twhddoc ${q}`
        },
	{
          title: "HD Video Note",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}twhdptv ${q}`
        }
        
      ]
    }
  ]
};
const listData2 = {
        title: "𝐀𝐮𝐝𝐢𝐨 𝐒𝐞𝐥𝐞𝐜𝐭𝐢𝐨𝐧 ツ",
        sections: [{
          title: "Twitter Audio Down Section 🎧",
          rows: [
            
            {
              title: "\`Twitter Audio With Normal\`",
              description: "〽️ade By Dinuwh Bbh",
              id: `${prefix}twaud ${q}`
            },
            {
              title: "\`Twitter Audio With Document\`",
              description: "〽️ade By Dinuwh Bbh",
              id: `${prefix}twauddoc ${q}`
            },
            {
              title: "\`Twitter Audio With Voice Note\`",
              description: "〽️ade By Dinuwh Bbh",
              id: `${prefix}twaudptt ${q}`
            }
          ]
        }]
      };

      return await conn.sendMessage(from, {
      image: { url: apiResponse.result.thumb },
       caption: caption,
       footer: "> *〽️ade By Dinuwh Bbh*",
        buttons: [
          {
            buttonId: "action",
            buttonText: { displayText: "🔘" },
            type: 4,
            nativeFlowInfo: {
              name: "single_select",
              paramsJson: JSON.stringify(listData),
            },
          },
          {
            buttonId: "action",
            buttonText: { displayText: "🔘" },
            type: 4,
            nativeFlowInfo: {
              name: "single_select",
              paramsJson: JSON.stringify(listData2),
            },
          }
        ],
        headerType: 1,
        viewOnce: true,
      }, { quoted: msg });
    }

  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e.message}`);
  }
});

      
// Handler for SD video download from Twitter
cmd(
  {
    pattern: 'twsd',
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


cmd(
  {
    pattern: 'twsdptv',
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
          ptv: 'true',
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

cmd(
  {
    pattern: 'twsddoc',
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
          document: { url: apiResponse.result.video_sd },
          mimetype: 'video/mp4',
          fileName: 'twitter_sd_video.mp4',
          caption: '📁 SD Twitter Video\n\n' + sadiya_md_footer,
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
    pattern: 'twhd',
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

cmd(
  {
    pattern: 'twhdptv',
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
	  ptv: 'true',
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

cmd(
  {
    pattern: 'twhddoc',
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
          document: { url: apiResponse.result.video_hd },
          mimetype: 'video/mp4',
          fileName: 'twitter_hd_video.mp4',
          caption: '📁 HD Twitter Video\n\n' + sadiya_md_footer,
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
    pattern: 'twaud',
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


cmd(
  {
    pattern: 'twaudptt',
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




cmd(
  {
    pattern: 'twauddoc',
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
          document: { url: apiResponse.result.audio },
          mimetype: 'audio/mpeg',
          fileName: 'twitter_audio.mp3',
          caption: '🎧 Twitter Audio\n' + config.footer
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



//yttttt

cmd({
  pattern: "song",
  alias: "ytmp3",
  react: "🎵",
  desc: "Download Song",
  category: "download",
  filename: __filename,
}, async (robin, mek, m, { from, q, prefix, reply }) => {
  try {
    if (!q) return reply("\`Give Me SONG NAME OR LINK || නමක් දියන්😓❤️\`");

    const search = await yts(q);
    if (!search.videos.length) return reply("\`❌ Video not found!\`");
    const data = search.videos[0];

    const cap = `\`乂 Ｄ𝚒ｎｕｗｈ Чт Ｄｏｗｎ⟩⟩⟩\`
╭────────✦✧✦────────╯

* \`✦ 𝚃𝚒𝚝𝚕𝚎\`     :  _*${data.title}*_
\`╭───────────────✿\` 

* \`✦ 𝙳𝚞𝚛𝚊𝚝𝚒𝚘𝚗\`  : _*${data.timestamp} (${data.seconds} sec)*_  
* \`✦ 𝚄𝚙𝚕𝚘𝚊𝚍𝚎𝚍\`  : _${data.ago}_  
* \`✦ Channel\`   : *_${data.author.name}_*
* \`✦ 𝚅𝚒𝚎𝚠𝚜\`     : _${data.views}_
* \`✦ 𝚄𝚁𝙻\`       : *_${data.url}_*

\`╰───────────────✿\`
╭───────────────✿  
│ 🎶 *ƒσℓℓσω υѕ мυѕι¢ ¢нαηηєℓ* 🧚‍♂️  
╰───────────────✿  
🔗 https://whatsapp.com/channel/0029Vb3mqn5H5JLuJO3s3Z1J

> *Send You Want Song Formate ⤵️*`;

    // ✳️ If nonbutton mode
if (config.MODE === 'nonbutton') {
  const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: `${prefix}ytaud ${data.url}`, description: '\`❲ Audio File ❳\` 🎧'},
	    {title: "2", rowId: `${prefix}ytdoc ${data.url}`, description: '\`❲ Document File ❳\` 📄'} ,
            {title: "3", rowId: `${prefix}ytvoice ${data.url}`, description: '\`❲ Voice Note (ptt) ❳\` 🎤'} ,
            {title: "4", rowId: `${prefix}devilv ${data.url}`, description: '\`❲ Video File (mp4) ❳\` 📽️'} ,
	]
    } 
]
const listMessage = {
caption: cap,
image: { url: data.thumbnail },  // <-- use YouTube thumbnail here
footer: '> 〽️ade By Dinuwh Bbh',
title: '',
buttonText: '> *◎Power Full Whatsapp bot Make By Dinuwh◎*',
sections
}
	
return await robin.replyList(from, listMessage ,{ quoted : mek })

	//button
if (config.MODE === 'button') {
  const listData = {
    title: "◎ 𝙲𝙷𝙾𝙾𝚂 𝙵𝙾𝚁𝙼𝙰𝚃𝙴 ◎",
    sections: [{
      title: "DINUWH MD OPTIONS",
      rows: [
        {
          title: "[Audio 🎧]",
          description: "Download as audio\n〽️ade By Dinuwh Bbh",
          id: `${prefix}ytaud ${data.url}`
        },
        {
          title: "[Document 📁]",
          description: "Download as document\n〽️ade By Dinuwh Bbh",
          id: `${prefix}ytdoc ${data.url}`
        },
        {
          title: "[Voice (ptt) 💡]",
          description: "Download as Voice Note\n〽️ade By Dinuwh Bbh",
          id: `${prefix}ytvoice ${data.url}`
        }
      ]
    }]
  };

  return await robin.sendMessage(from, {
    image: { url: data.thumbnail },
    caption: cap,
    footer: "> 〽️ade By Dinuwh Bbh",
    buttons: [
      {
        buttonId: "action",
        buttonText: { displayText: "🔘 Choose Song Type" },
        type: 4,
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify(listData),
        },
      },
    ],
    headerType: 1,
    viewOnce: true,
  }, { quoted: mek });
}
//videoinfosendjs=========================-====--%=%=%--%-%-%-$-#-#-#=##=$-$-#9#9=9.0=9.0-$839#=$-$738#=738.0$-%*$8##-%748$=$-%7$8$=$-%-

//Voice j=%=%=%==%=%=%==%=%=%==%%%=%==%=%=
cmd({
  pattern: "ytvoice",
  //alias: ["ytmp3"],
  desc: "Download YouTube song (no caption, audio only)",
  category: "download",
  react: "🎤",
  filename: __filename,
}, async (robin, mek, m, { q, reply }) => {
  try {
    if (!q) return reply("SONG NAME 😒?");
    const search = await yts(q);
    if (!search.videos.length) return reply("Yt search Fail🤧!");
    const data = search.videos[0];
    const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(data.url)}&apikey=Manul-Official`;
    const result = await fetchJson(api);
    const dl_url = result.data.url;
    await robin.sendMessage(m.chat, {
      audio: { url: dl_url },
      mimetype: 'audio/mpeg',
      ptt: true,
      fileName: `${data.title}.mp3`
    }, { quoted: m });
  } catch (e) {
    reply("*🛑 ERROR! Something went wrong*");
    console.log(e);
  }
});
//ytdoc=====
cmd({
  pattern: "ytdoc",
 // alias: ["ytmp3"],
  desc: "Download YouTube song as document only",
  category: "download",
  react: "📄",
  filename: __filename,
}, async (robin, mek, m, { q, reply }) => {
  try {
    if (!q) return reply("📁 Song name Error");
    const search = await yts(q);
    if (!search.videos.length) return reply("Yt search Fail🤧!");
    const data = search.videos[0];
    const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(data.url)}&apikey=Manul-Official`;
    const result = await fetchJson(api);
    const dl_url = result.data.url;
    await robin.sendMessage(m.chat, {
      document: { url: dl_url },
      mimetype: 'audio/mpeg',
      fileName: `${data.title}.mp3`
    }, { quoted: m });
  } catch (e) {
    reply("❌ *ERROR! Something went wrong*");
    console.log(e);
  }
});
//=======
cmd({
  pattern: "ytaud",
  //alias: ["ytmp3"],
  desc: "Download YouTube song (no caption, audio only)",
  category: "download",
  react: "🎶",
  filename: __filename,
}, async (robin, mek, m, { q, reply }) => {
  try {
    if (!q) return reply("SONG NAME 😒?");
    const search = await yts(q);
    if (!search.videos.length) return reply("Yt search Fail🤧!");
    const data = search.videos[0];
    const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(data.url)}&apikey=Manul-Official`;
    const result = await fetchJson(api);
    const dl_url = result.data.url;
    await robin.sendMessage(m.chat, {
      audio: { url: dl_url },
      mimetype: 'audio/mpeg',
      ptt: false,
      fileName: `${data.title}.mp3`
    }, { quoted: m });
  } catch (e) {
    reply("*🛑 ERROR! Something went wrong*");
    console.log(e);
  }
});


//Music End Now Video Plugins ☝ All Erro Fixed all Up Plugins



cmd({
  pattern: "video",
  alias: "ytmp4",
  react: "🎵",
  desc: "Download Song",
  category: "download",
  filename: __filename,
}, async (robin, mek, m, { from, q, prefix, reply }) => {
  try {
    if (!q) return reply("\`Give Me  NAME OR LINK || නමක් දියන්😓❤️\`");

    const search = await yts(q);
    if (!search.videos.length) return reply("\`❌ Video not found!\`");
    const data = search.videos[0];

    const cap = `\`乂 Ｄ𝚒ｎｕｗｈ Чт Ｄｏｗｎ⟩⟩⟩\`
╭────────✦✧✦────────╯

* \`✦ 𝚃𝚒𝚝𝚕𝚎\`     :  _*${data.title}*_
\`╭───────────────✿\` 

* \`✦ 𝙳𝚞𝚛𝚊𝚝𝚒𝚘𝚗\`  : _*${data.timestamp} (${data.seconds} sec)*_  
* \`✦ 𝚄𝚙𝚕𝚘𝚊𝚍𝚎𝚍\`  : _${data.ago}_  
* \`✦ Channel\`   : *_${data.author.name}_*
* \`✦ 𝚅𝚒𝚎𝚠𝚜\`     : _${data.views}_
* \`✦ 𝚄𝚁𝙻\`       : *_${data.url}_*

\`╰───────────────✿\`
╭───────────────✿  
│ 🎶 *ƒσℓℓσω υѕ мυѕι¢ ¢нαηηєℓ* 🧚‍♂️  
╰───────────────✿  
🔗 https://whatsapp.com/channel/0029Vb3mqn5H5JLuJO3s3Z1J

> *Send You Want Video Formate ⤵️*`;

    


if (config.MODE === 'nonbutton') {
  const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: `${prefix}normalv ${data.url}`, description: '\`❲ Normal Type Videos ❳\` 📽️'},
	    {title: "2", rowId: `${prefix}documentv ${data.url}`, description: '\`❲ Document Type Videos ❳\` 📄'} ,
            
	]
    } 
]
const listMessage = {
caption: cap,
image: { url: data.thumbnail },  // <-- use YouTube thumbnail here
footer: '> 〽️ade By Dinuwh Bbh',
title: '',
buttonText: '> *◎Power Full Whatsapp bot Make By Dinuwh◎*',
sections
}
	
return await robin.replyList(from, listMessage ,{ quoted : mek })

	//button
} if (config.MODE === 'button') {
      const listData = {
        title: "◎ 𝙲𝙷𝙾𝙾𝚂 Video 𝙵𝙾𝚁𝙼𝙰𝚃𝙴 ◎",
        sections: [{
          title: "Video Type OPTIONS",
          rows: [
            {
              title: "*❨ Normal Quality Files ❩*",
              description: "*Normal  Type Videos*\n〽️ade By Dinuwh Bbh",
              id: `${prefix}normalv ${data.url}`
            },
            
            {
              title: "*❨ Document Quality Files ❩*",
              description: "*Document Type Videos*\n〽️ade By Dinuwh Bbh",
              id: `${prefix}documentv ${data.url}`
            }
          ]
        }]
      };

      return await robin.sendMessage(from, {
        image: { url: data.thumbnail },
        caption: cap,
        footer: "> 〽️ade By Dinuwh Bbh",
        buttons: [
          {
            buttonId: `${prefix}normalv ${data.url}`,
            buttonText: { displayText: "`\`❲ Normal Quality Files 📽️❳\``" },
            type: 1
          },
          {
            buttonId: `${prefix}documentv ${data.url}`,
            buttonText: { displayText: "`\`❲ Document Quality Files 📄❳\``" },
            type: 1
          },

          {
            buttonId: "action",
            buttonText: { displayText: "🔘 Choose Type" },
            type: 4,
            nativeFlowInfo: {
              name: "single_select",
              paramsJson: JSON.stringify(listData),
            },
          },
        ],
        headerType: 1,
        viewOnce: true,
      }, { quoted: mek });
    }
  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e.message}`);
  }
});


//Auto Song Js=3=3.03=3.03=3.03=3.033=3.0333=3.03333=3.033333=3.033333=3.0333333=3.033333=3.0333333=3.03333333=3.03333333

let autoSenders = {};
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

cmd(
  {
    pattern: "autosongd",
    desc: "Auto-send random YouTube MP3 to a JID every 30 seconds based on keyword",
    category: "download",
    react: "🎧",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    try {
      if (!q.includes("&")) return reply("📌 Example: .autosongd boot song & 9476xxxxxxx@s.whatsapp.net");

      const [keyword, jid] = q.split("&").map(i => i.trim());

      if (!keyword || !jid) return reply("❌ Missing song keyword or JID.");

      if (autoSenders[jid]) {
        return reply("⏳ Auto-song sender is already running for this JID.");
      }

      reply(`✅ Auto-song sender activated for *${jid}* using keyword: *"${keyword}"*. Songs will be sent every 30 seconds.`);

      autoSenders[jid] = setInterval(async () => {
        try {
          const search = await yts(keyword);
          if (!search.videos.length) return;

          const data = getRandom(search.videos);
          const ytUrl = data.url;

          const api = `https://yt-five-tau.vercel.app/download?q=${ytUrl}&format=mp3`;
          const { data: apiRes } = await axios.get(api);

          if (!apiRes?.status || !apiRes.result?.download) return;

          const result = apiRes.result;

          const caption = `🎧 *Auto Song From Dinuwh*\n\n📝 *Title:* ${result.title}\n🕒 *Duration:* ${data.timestamp}\n📅 *Uploaded:* ${data.ago}\n\n_🔗 Powered by Dinuwh MD Bot_`;

          await robin.sendMessage(
            jid,
            { image: { url: result.thumbnail }, caption },
            { quoted: mek }
          );

          await robin.sendMessage(
            jid,
            {
              audio: { url: result.download },
              mimetype: "audio/mpeg",
              ptt: true,
            },
            { quoted: mek }
          );
        } catch (err) {
          console.error("[AutoSong Error]", err);
        }
      }, 30 * 60 * 1000); // every 30 seconds
    } catch (err) {
      console.error(err);
      reply("❌ An unexpected error occurred!");
    }
  }
);


cmd(
  {
    pattern: "stopautosong",
    desc: "Stop AutoSong for a given JID",
    category: "download",
    react: "🛑",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    if (!q) return reply("📌 Example: .stopautosong 9476xxxxxxx@s.whatsapp.net");

    const jid = q.trim();
    if (autoSenders[jid]) {
      clearInterval(autoSenders[jid]);
      delete autoSenders[jid];
      reply(`✅ Auto-song sender has been stopped for *${jid}*.`);
    } else {
      reply("❌ No auto-song sender is active for this JID.");
    }
  }
);

//3=3.03=3.033=3.0333=3.03333=3.033333=3.033333=3.03333=3.03333=3.033333
//TIKTOK TIKTOK TIKTOK TIKTOK TIKTOK TIKTOK TIKTOK TIKTOK TIKTOK TIKTOK 
//3=3.03=3.033=3.0333=3.03333=3.03333=3.03333=3.033332=3.0333322=3.03333223


cmd({
  pattern: "tikaud",
 // alias: ["tt", "ttdl", "tiktokdl"],
  react: '🎧',
  desc: "Download TikTok video (WM) + Audio",
  category: "download",
  use: '.tiktok <tiktok url>',
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return await reply('*Error*');
    if (!q.includes("tiktok")) return await reply("*Url Error*.");

    const res = await fetch(`https://darksadasyt-tiktokdl.vercel.app/api/tiktok?q=${q}`);
    const data = await res.json();


    // Send audio as voice message (PTT)
    await conn.sendMessage(from, { audio: { url: data.music }, mimetype: 'audio/mp4', ptt: false }, { quoted: mek });

  } catch (e) {
    console.log(e);
    return reply(`*Download Error*\n\n${e.message}`);
  }
});

//=======TiktokAud-Document


cmd({
  pattern: "tikauddoc",
//  alias: ["tt", "ttdl", "tiktokdl"],
  react: '🎧',
  desc: "Download TikTok audio (MP3 as document)",
  category: "download",
  use: '.tiktoksv <tiktok url>',
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return await reply('*Error*');
    if (!q.includes("tiktok")) return await reply("*🔗 Url Error*");

    const res = await fetch(`https://darksadasyt-tiktokdl.vercel.app/api/tiktok?q=${q}`);
    const data = await res.json();

    // Send audio as document
    await conn.sendMessage(from, {
      document: { url: data.music },
      mimetype: 'audio/mp3',
      fileName: `${data.title || 'tiktok'}.mp3`,
      caption: '> *〽️ade By Dinuwh Bbh*'
    }, { quoted: mek });

  } catch (e) {
    console.log(e);
    return reply(`*Download Error*\n\n${e.message}`);
  }
});

//=====Tik-Aud-Ptt=3=3.03=3.03=3.033=3.03333


cmd({
  pattern: "tikaudptt",
//  alias: ["tt", "ttdl", "tiktokdl"],
  react: '🎧',
  desc: "Download TikTok video (WM) + Audio",
  category: "download",
  use: '.tiktok <tiktok url>',
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return await reply('*Error*');
    if (!q.includes("tiktok")) return await reply("*Url Error*");

    const res = await fetch(`https://darksadasyt-tiktokdl.vercel.app/api/tiktok?q=${q}`);
    const data = await res.json();


    // Send audio as voice message (PTT)
    await conn.sendMessage(from, { audio: { url: data.music }, mimetype: 'audio/mp4', ptt: true }, { quoted: mek });

  } catch (e) {
    console.log(e);
    return reply(`*Download Error*\n\n${e.message}`);
  }
});

//=====Tik-Watermark-norml


cmd({
  pattern: "tikwm",
 // alias: ["tt", "ttdl", "tiktokdl"],
  react: '📹',
  desc: "Download TikTok video (WM) + Audio",
  category: "download",
  use: '.tiktok <tiktok url>',
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return await reply('*Error*');
    if (!q.includes("tiktok")) return await reply("*Url Error*");

    const res = await fetch(`https://darksadasyt-tiktokdl.vercel.app/api/tiktok?q=${q}`);
    const data = await res.json();

    // Send watermark video
    await conn.sendMessage(from, { video: { url: data.watermark }, caption: "> *〽️ade By Dinuwh Bbh*" }, { quoted: mek });


  } catch (e) {
    console.log(e);
    return reply(`❌ Error\n\n${e.message}`);
  }
});

//=Watermark-doc=======


cmd({
  pattern: "tikwmdoc",
 // alias: ["tt", "ttdl", "tiktokdl"],
  react: '📹',
  desc: "Download TikTok video (WM) as Document",
  category: "download",
  use: '.tiktoksv <tiktok url>',
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return await reply('*Error*');
    if (!q.includes("tiktok")) return await reply("*Url Error*");

    const res = await fetch(`https://darksadasyt-tiktokdl.vercel.app/api/tiktok?q=${q}`);
    const data = await res.json();

    // Send watermark video as document
    await conn.sendMessage(from, {
      document: { url: data.watermark },
      mimetype: 'video/mp4',
      fileName: `${data.title || 'tiktok'}.mp4`,
      caption: '> *〽️ade By Dinuwh Bbh*'
    }, { quoted: mek });

  } catch (e) {
    console.log(e);
    return reply(`❌ Error\n\n${e.message}`);
  }
});

//Tik-Nonwatermark-norml



cmd({
  pattern: "tiknowm",
 // alias: ["tt", "ttdl", "tiktokdl"],
  react: '📹',
  desc: "Download TikTok video (WM) + Audio",
  category: "download",
  use: '.tiktok <tiktok url>',
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return await reply('*Error*');
    if (!q.includes("tiktok")) return await reply("*Url Error*");

    const res = await fetch(`https://darksadasyt-tiktokdl.vercel.app/api/tiktok?q=${q}`);
    const data = await res.json();

    // Send watermark video
    await conn.sendMessage(from, { video: { url: data.no_watermark }, caption: "> *〽️ade By Dinuwh Bbh*" }, { quoted: mek });

    

  } catch (e) {
    console.log(e);
    return reply(`❌ Error\n\n${e.message}`);
  }
});

//==tik-no wm Doc



cmd({
  pattern: "tiknowmdoc",
 // alias: ["tt", "ttdl", "tiktokdl"],
  react: '📹',
  desc: "Download TikTok video (No Watermark) as Document",
  category: "download",
  use: '.tiktoksv <tiktok url>',
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return await reply('*Error*');
    if (!q.includes("tiktok")) return await reply("*Url Error*");

    const res = await fetch(`https://darksadasyt-tiktokdl.vercel.app/api/tiktok?q=${q}`);
    const data = await res.json();

    // Send video as document (no watermark)
    await conn.sendMessage(from, {
      document: { url: data.no_watermark },
      mimetype: 'video/mp4',
      fileName: `${data.title || 'tiktok'}.mp4`,
      caption: '> *〽️ade By Dinuwh Bbh*'
    }, { quoted: mek });

  } catch (e) {
    console.log(e);
    return reply(`*❌ Error*\n\n${e.message}`);
  }
});


//====3==3=3=3.03=3.03=3.03=3.033-=3-



cmd({
  pattern: "tt",
  alias: ["ttinfo", "ttdetails", "tiktok"],
  react: '🔎',
  desc: "Get TikTok video details only.",
  category: "tools",
  use: ".tiok <TikTok video URL>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const tiktokUrl = args[0];
    if (!tiktokUrl || !tiktokUrl.includes("tiktok.com")) {
      return reply('```🥲 කරුණාකර වලංගු TikTok ලින්ක් එකක් දෙන්න.\nඋදාහරණයක්: .tiok https://www.tiktok.com/@user/video/123...```');
    }

    await conn.sendMessage(from, { react: { text: '🔍', key: m.key } });

    const apiUrl = `https://api.nexoracle.com/downloader/tiktok-nowm?apikey=free_key@maher_apis&url=${encodeURIComponent(tiktokUrl)}`;
    const response = await axios.get(apiUrl);

    const { title, thumbnail, author, metrics } = response.data.result;

    const detailsMsg = `乂 ᗪIᑎᑌᗯᕼ TIKTOK ᗪOᗯᑎ ⟩⟩⟩
\`╭───────────────✿\`

- \`D\` ᴏᴡɴʟᴏᴀᴅꜱ : _${metrics.download_count}_
- \`C\` ᴏᴍᴍᴇɴᴛꜱ  : _*${metrics.comment_count}*_
- \`S\` ʜᴀʀᴇꜱ    : _${metrics.share_count}_
- \`P\` ʟᴀʏꜱ     : _${metrics.play_count}_
- \`L\` ɪᴋᴇꜱ     : _*${metrics.digg_count}*_
- \`L\` ɪɴᴋ      : _${tiktokUrl}_
✠.Aᴜᴛʜᴏʀ :
- Nɪᴄᴋ Nᴀᴍᴇ :- *${author.nickname}*
- Uꜱᴇʀɴᴀᴍᴇ   :- *@${author.username}*

\`╰───────────────✿\``;

    // ✳️ If nonbutton mode
if (config.MODE === 'nonbutton') {
  const sections = [
  {
    title: "📹 𝐕𝐢𝐝𝐞𝐨 𝐖𝐢𝐭𝐡 𝐖𝐚𝐭𝐞𝐫𝐦𝐚𝐫𝐤",
    rows: [
      {
        title: "1.",
        rowId: `${prefix}tikwm ${tiktokUrl}`,
        description: '`❲ With Watermark Normal ❳` 📹'
      },
      {
        title: "2.",
        rowId: `${prefix}tikwmdoc ${tiktokUrl}`,
        description: '`❲ With Watermark Document ❳` 📄'
      }
    ] },
  {
    title: "🎞️ 𝐕𝐢𝐝𝐞𝐨 𝐍𝐨 𝐖𝐚𝐭𝐞𝐫𝐦𝐚𝐫𝐤",
    rows: [
      {
        title: "3.",
        rowId: `${prefix}tiknowm ${tiktokUrl}`,
        description: '`❲ No Watermark Normal ❳` 📹'
      },
      {
        title: "4.",
        rowId: `${prefix}tiknowmdoc ${tiktokUrl}`,
        description: '`❲ No Watermark Document ❳` 📄'
      }
    ]
  },
  {
    title: "🎧 𝐀𝐮𝐝𝐢𝐨 𝐎𝐩𝐭𝐢𝐨𝐧𝐬",
    rows: [
      {
        title: "5.",
        rowId: `${prefix}tikaud ${tiktokUrl}`,
        description: '`❲ Audio With Normal File ❳` 🎵'
      },
      {
        title: "6.",
        rowId: `${prefix}tikauddoc ${tiktokUrl}`,
        description: '`❲ Audio With Document File ❳` 📄'
      },
      {
        title: "7.",
        rowId: `${prefix}tikaudptt ${tiktokUrl}`,
        description: '`❲ Audio With Voice Note ❳` 🎤'
      }
    ]
  }
];
const listMessage = {
caption: detailsMsg,
image: { url:thumbnail },  // <-- use YouTube thumbnail here
footer: '> *〽️ade By Dinuwh Bbh*',
title: '',
buttonText: '> *◎Reply Below Number ⇲◎*',
sections
}
	
return await conn.replyList(from, listMessage ,{ quoted : mek })

	//button
} if (config.MODE === 'button') {
      const listData = {
  title: "𝐕𝐢𝐝𝐞𝐨 𝐒𝐞𝐥𝐞𝐜𝐭𝐢𝐨𝐧 ツ",
  sections: [
    {
      title: "📽️ Non-Watermark ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ⇲",
      rows: [
        {
          title: "NonWaterMark Normal Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}tiknowm ${tiktokUrl}`
        },
        {
          title: "NonWaterMark Document Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}tiknowmdoc ${tiktokUrl}`
        }
      ]
    },
    {
      title: "💧 With-Watermark ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ⇲",
      rows: [
        {
          title: "WithWaterMark Normal Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}tikwm ${tiktokUrl}`
        },
        {
          title: "WithWaterMark Document Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}tikwmdoc ${tiktokUrl}`
        }
      ]
    }
  ]
};
const listData2 = {
        title: "𝐀𝐮𝐝𝐢𝐨 𝐒𝐞𝐥𝐞𝐜𝐭𝐢𝐨𝐧 ツ",
        sections: [{
          title: "TikTok Audio Down Section 🎧",
          rows: [
            
            {
              title: "\`Audio With Normal\`",
              description: "〽️ade By Dinuwh Bbh",
              id: `${prefix}tikaud ${tiktokUrl}`
            },
            {
              title: "\`Audio With Document\`",
              description: "〽️ade By Dinuwh Bbh",
              id: `${prefix}tikauddoc ${tiktokUrl}`
            },
            {
              title: "\`Audio With Voice Note\`",
              description: "〽️ade By Dinuwh Bbh",
              id: `${prefix}tikaudptt ${tiktokUrl}`
            }
          ]
        }]
      };

      return await conn.sendMessage(from, {
        image: { url: thumbnail },
        caption: detailsMsg,
        footer: "> *〽️ade By Dinuwh Bbh*",
        buttons: [
          {
            buttonId: "action",
            buttonText: { displayText: "🔘e" },
            type: 4,
            nativeFlowInfo: {
              name: "single_select",
              paramsJson: JSON.stringify(listData),
            },
          },
          {
            buttonId: "action",
            buttonText: { displayText: "🔘e" },
            type: 4,
            nativeFlowInfo: {
              name: "single_select",
              paramsJson: JSON.stringify(listData2),
            },
          }
        ],
        headerType: 1,
        viewOnce: true,
      }, { quoted: mek });
    }

  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e.message}`);
  }
});


//Yt video ============8==========88===888-8=88==4=4=4=4=



cmd(
  {
    pattern: "144v",
    react: "🎥",
    desc: "Download YouTube Video",
    category: "download",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }
  ) => {
    try {
      if (!q) return reply("*Provide a name or a YouTube link.* 🎥❤️");

      // Search for the video
      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      // Video download function
      const downloadVideo = async (url, quality) => {
        const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${quality}&url=${encodeURIComponent(
          url
        )}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

        const response = await axios.get(apiUrl);

        if (response.data && response.data.success) {
          const { id, title } = response.data;

          // Wait for download URL generation
          const progressUrl = `https://p.oceansaver.in/ajax/progress.php?id=${id}`;
          while (true) {
            const progress = await axios.get(progressUrl);
            if (progress.data.success && progress.data.progress === 1000) {
              const videoBuffer = await axios.get(progress.data.download_url, {
                responseType: "arraybuffer",
              });
              return { buffer: videoBuffer.data, title };
            }
            await new Promise((resolve) => setTimeout(resolve, 5000));
          }
        } else {
          throw new Error("Failed to fetch video details.");
        }
      };

      // Specify desired quality
      const quality = "144";

      // Download and send video only
      const video = await downloadVideo(url, quality);
      await robin.sendMessage(
        from,
        {
          video: video.buffer,
          caption: `🎥 *${video.title}*`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);

//==========================*=*=*=*--*-*=*=*-*==*=**=*=*==*==*=*=*=*=*=

cmd(
  {
    pattern: "240v",
    react: "🎥",
    desc: "Download YouTube Video",
    category: "download",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }
  ) => {
    try {
      if (!q) return reply("*Provide a name or a YouTube link.* 🎥❤️");

      // Search for the video
      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      // Video download function
      const downloadVideo = async (url, quality) => {
        const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${quality}&url=${encodeURIComponent(
          url
        )}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

        const response = await axios.get(apiUrl);

        if (response.data && response.data.success) {
          const { id, title } = response.data;

          // Wait for download URL generation
          const progressUrl = `https://p.oceansaver.in/ajax/progress.php?id=${id}`;
          while (true) {
            const progress = await axios.get(progressUrl);
            if (progress.data.success && progress.data.progress === 1000) {
              const videoBuffer = await axios.get(progress.data.download_url, {
                responseType: "arraybuffer",
              });
              return { buffer: videoBuffer.data, title };
            }
            await new Promise((resolve) => setTimeout(resolve, 5000));
          }
        } else {
          throw new Error("Failed to fetch video details.");
        }
      };

      // Specify desired quality
      const quality = "240";

      // Download and send video only
      const video = await downloadVideo(url, quality);
      await robin.sendMessage(
        from,
        {
          video: video.buffer,
          caption: `🎥 *${video.title}*`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);

//==========================*=*=*=*--*-*=*=*-*==*=**=*=*==*==*=*=*=*=*=
cmd(
  {
    pattern: "360v",
    react: "🎥",
    desc: "Download YouTube Video",
    category: "download",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }
  ) => {
    try {
      if (!q) return reply("*Provide a name or a YouTube link.* 🎥❤️");

      // Search for the video
      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      // Video download function
      const downloadVideo = async (url, quality) => {
        const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${quality}&url=${encodeURIComponent(
          url
        )}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

        const response = await axios.get(apiUrl);

        if (response.data && response.data.success) {
          const { id, title } = response.data;

          // Wait for download URL generation
          const progressUrl = `https://p.oceansaver.in/ajax/progress.php?id=${id}`;
          while (true) {
            const progress = await axios.get(progressUrl);
            if (progress.data.success && progress.data.progress === 1000) {
              const videoBuffer = await axios.get(progress.data.download_url, {
                responseType: "arraybuffer",
              });
              return { buffer: videoBuffer.data, title };
            }
            await new Promise((resolve) => setTimeout(resolve, 5000));
          }
        } else {
          throw new Error("Failed to fetch video details.");
        }
      };

      // Specify desired quality
      const quality = "360";

      // Download and send video only
      const video = await downloadVideo(url, quality);
      await robin.sendMessage(
        from,
        {
          video: video.buffer,
          caption: `🎥 *${video.title}*`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);

//==*=6=6.06=6.066=6.066=6.0666=6.06666=6.06666*=*=*==*=*=*=*=6=6.06=6.06=6.066=6.0666=6.06666=6.06666*=*==*=

cmd(
  {
    pattern: "480v",
    react: "🎥",
    desc: "Download YouTube Video",
    category: "download",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }
  ) => {
    try {
      if (!q) return reply("*Provide a name or a YouTube link.* 🎥❤️");

      // Search for the video
      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      // Video download function
      const downloadVideo = async (url, quality) => {
        const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${quality}&url=${encodeURIComponent(
          url
        )}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

        const response = await axios.get(apiUrl);

        if (response.data && response.data.success) {
          const { id, title } = response.data;

          // Wait for download URL generation
          const progressUrl = `https://p.oceansaver.in/ajax/progress.php?id=${id}`;
          while (true) {
            const progress = await axios.get(progressUrl);
            if (progress.data.success && progress.data.progress === 1000) {
              const videoBuffer = await axios.get(progress.data.download_url, {
                responseType: "arraybuffer",
              });
              return { buffer: videoBuffer.data, title };
            }
            await new Promise((resolve) => setTimeout(resolve, 5000));
          }
        } else {
          throw new Error("Failed to fetch video details.");
        }
      };

      // Specify desired quality
      const quality = "480";

      // Download and send video only
      const video = await downloadVideo(url, quality);
      await robin.sendMessage(
        from,
        {
          video: video.buffer,
          caption: `🎥 *${video.title}*`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);


//=$==%=&=55=55.06=55.066=55.0666=55.0666=55.06666=55.066666=55.0666666=55.06666666=55.066666666=55.06666666666=55.06666666666

cmd(
  {
    pattern: "720v",
    react: "🎥",
    desc: "Download YouTube Video",
    category: "download",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }
  ) => {
    try {
      if (!q) return reply("*Provide a name or a YouTube link.* 🎥❤️");

      // Search for the video
      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      // Video download function
      const downloadVideo = async (url, quality) => {
        const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${quality}&url=${encodeURIComponent(
          url
        )}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

        const response = await axios.get(apiUrl);

        if (response.data && response.data.success) {
          const { id, title } = response.data;

          // Wait for download URL generation
          const progressUrl = `https://p.oceansaver.in/ajax/progress.php?id=${id}`;
          while (true) {
            const progress = await axios.get(progressUrl);
            if (progress.data.success && progress.data.progress === 1000) {
              const videoBuffer = await axios.get(progress.data.download_url, {
                responseType: "arraybuffer",
              });
              return { buffer: videoBuffer.data, title };
            }
            await new Promise((resolve) => setTimeout(resolve, 5000));
          }
        } else {
          throw new Error("Failed to fetch video details.");
        }
      };

      // Specify desired quality
      const quality = "720";

      // Download and send video only
      const video = await downloadVideo(url, quality);
      await robin.sendMessage(
        from,
        {
          video: video.buffer,
          caption: `🎥 *${video.title}*`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);

//=$==$=$=%=%==%=%=%($(($93($($(=3=3.04=3.04=3.044=3.0444=3.04444=3.044444=3.04444=3.04444
cmd(
  {
    pattern: "1080v",
    react: "🎥",
    desc: "Download YouTube Video",
    category: "download",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }
  ) => {
    try {
      if (!q) return reply("*Provide a name or a YouTube link.* 🎥❤️");

      // Search for the video
      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      // Video download function
      const downloadVideo = async (url, quality) => {
        const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${quality}&url=${encodeURIComponent(
          url
        )}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

        const response = await axios.get(apiUrl);

        if (response.data && response.data.success) {
          const { id, title } = response.data;

          // Wait for download URL generation
          const progressUrl = `https://p.oceansaver.in/ajax/progress.php?id=${id}`;
          while (true) {
            const progress = await axios.get(progressUrl);
            if (progress.data.success && progress.data.progress === 1000) {
              const videoBuffer = await axios.get(progress.data.download_url, {
                responseType: "arraybuffer",
              });
              return { buffer: videoBuffer.data, title };
            }
            await new Promise((resolve) => setTimeout(resolve, 5000));
          }
        } else {
          throw new Error("Failed to fetch video details.");
        }
      };

      // Specify desired quality
      const quality = "1080";

      // Download and send video only
      const video = await downloadVideo(url, quality);
      await robin.sendMessage(
        from,
        {
          video: video.buffer,
          caption: `🎥 *${video.title}*`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);


//=$=$-$===Document-Type

cmd(
  {
    pattern: "144vd",
    react: "🎥",
    desc: "Download YouTube Video",
    category: "download",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }
  ) => {
    try {
      if (!q) return reply("*📥 Please provide a name or a YouTube link.*");

      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      const downloadVideo = async (url, quality) => {
        const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${quality}&url=${encodeURIComponent(
          url
        )}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

        const response = await axios.get(apiUrl);

        if (response.data && response.data.success) {
          const { id, title } = response.data;
          const progressUrl = `https://p.oceansaver.in/ajax/progress.php?id=${id}`;

          while (true) {
            const progress = await axios.get(progressUrl);
            if (progress.data.success && progress.data.progress === 1000) {
              const videoBuffer = await axios.get(progress.data.download_url, {
                responseType: "arraybuffer",
              });
              return { buffer: videoBuffer.data, title };
            }
            await new Promise((resolve) => setTimeout(resolve, 5000));
          }
        } else {
          throw new Error("📛 Failed to fetch video details.");
        }
      };

      const quality = "144";
      const video = await downloadVideo(url, quality);

      await robin.sendMessage(
        from,
        {
          document: video.buffer,
          mimetype: "video/mp4",
          fileName: `${video.title}.mp4`,
          caption: `🎥 *${video.title}*\n\n*MADE BY - DINUWH-MD🖇️*`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);

//=%=%=-%=%=%=%==3=3.0$==$=%=%=%=%==3=3.03=3.03=3.033=3.0333=3.03333=3.033333=3.033333

cmd(
  {
    pattern: "240vd",
    react: "🎥",
    desc: "Download YouTube Video",
    category: "download",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }
  ) => {
    try {
      if (!q) return reply("*📥 Please provide a name or a YouTube link.*");

      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      const downloadVideo = async (url, quality) => {
        const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${quality}&url=${encodeURIComponent(
          url
        )}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

        const response = await axios.get(apiUrl);

        if (response.data && response.data.success) {
          const { id, title } = response.data;
          const progressUrl = `https://p.oceansaver.in/ajax/progress.php?id=${id}`;

          while (true) {
            const progress = await axios.get(progressUrl);
            if (progress.data.success && progress.data.progress === 1000) {
              const videoBuffer = await axios.get(progress.data.download_url, {
                responseType: "arraybuffer",
              });
              return { buffer: videoBuffer.data, title };
            }
            await new Promise((resolve) => setTimeout(resolve, 5000));
          }
        } else {
          throw new Error("📛 Failed to fetch video details.");
        }
      };

      const quality = "240";
      const video = await downloadVideo(url, quality);

      await robin.sendMessage(
        from,
        {
          document: video.buffer,
          mimetype: "video/mp4",
          fileName: `${video.title}.mp4`,
          caption: `🎥 *${video.title}*\n\n*MADE BY - DINUWH-MD🖇️*`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);

//=$=$=$$=$94=94.0=94.04=94.04=94.04=94.044=94.044=94.0444=94.04444=94.04444=94.044444=94.044444

cmd(
  {
    pattern: "360vd",
    react: "🎥",
    desc: "Download YouTube Video",
    category: "download",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }
  ) => {
    try {
      if (!q) return reply("*📥 Please provide a name or a YouTube link.*");

      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      const downloadVideo = async (url, quality) => {
        const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${quality}&url=${encodeURIComponent(
          url
        )}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

        const response = await axios.get(apiUrl);

        if (response.data && response.data.success) {
          const { id, title } = response.data;
          const progressUrl = `https://p.oceansaver.in/ajax/progress.php?id=${id}`;

          while (true) {
            const progress = await axios.get(progressUrl);
            if (progress.data.success && progress.data.progress === 1000) {
              const videoBuffer = await axios.get(progress.data.download_url, {
                responseType: "arraybuffer",
              });
              return { buffer: videoBuffer.data, title };
            }
            await new Promise((resolve) => setTimeout(resolve, 5000));
          }
        } else {
          throw new Error("📛 Failed to fetch video details.");
        }
      };

      const quality = "360";
      const video = await downloadVideo(url, quality);

      await robin.sendMessage(
        from,
        {
          document: video.buffer,
          mimetype: "video/mp4",
          fileName: `${video.title}.mp4`,
          caption: `🎥 *${video.title}*\n\n*MADE BY - DINUWH-MD🖇️*`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);

//-$=3=3.03=3.03=3.033=3.033=3.033=2=2.02=2.022=2.0222=2.0222

cmd(
  {
    pattern: "480vd",
    react: "🎥",
    desc: "Download YouTube Video",
    category: "download",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }
  ) => {
    try {
      if (!q) return reply("*📥 Please provide a name or a YouTube link.*");

      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      const downloadVideo = async (url, quality) => {
        const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${quality}&url=${encodeURIComponent(
          url
        )}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

        const response = await axios.get(apiUrl);

        if (response.data && response.data.success) {
          const { id, title } = response.data;
          const progressUrl = `https://p.oceansaver.in/ajax/progress.php?id=${id}`;

          while (true) {
            const progress = await axios.get(progressUrl);
            if (progress.data.success && progress.data.progress === 1000) {
              const videoBuffer = await axios.get(progress.data.download_url, {
                responseType: "arraybuffer",
              });
              return { buffer: videoBuffer.data, title };
            }
            await new Promise((resolve) => setTimeout(resolve, 5000));
          }
        } else {
          throw new Error("📛 Failed to fetch video details.");
        }
      };

      const quality = "480";
      const video = await downloadVideo(url, quality);

      await robin.sendMessage(
        from,
        {
          document: video.buffer,
          mimetype: "video/mp4",
          fileName: `${video.title}.mp4`,
          caption: `🎥 *${video.title}*\n\n*MADE BY - DINUWH-MD🖇️*`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);

//=33=3.03=3.03=3.033=3.033=3.0333=3.03333=3.033333=3.033333=3.0333333=3.03333333=3.033333333=3.033333333==

cmd(
  {
    pattern: "720vd",
    react: "🎥",
    desc: "Download YouTube Video",
    category: "download",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }
  ) => {
    try {
      if (!q) return reply("*📥 Please provide a name or a YouTube link.*");

      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      const downloadVideo = async (url, quality) => {
        const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${quality}&url=${encodeURIComponent(
          url
        )}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

        const response = await axios.get(apiUrl);

        if (response.data && response.data.success) {
          const { id, title } = response.data;
          const progressUrl = `https://p.oceansaver.in/ajax/progress.php?id=${id}`;

          while (true) {
            const progress = await axios.get(progressUrl);
            if (progress.data.success && progress.data.progress === 1000) {
              const videoBuffer = await axios.get(progress.data.download_url, {
                responseType: "arraybuffer",
              });
              return { buffer: videoBuffer.data, title };
            }
            await new Promise((resolve) => setTimeout(resolve, 5000));
          }
        } else {
          throw new Error("📛 Failed to fetch video details.");
        }
      };

      const quality = "720";
      const video = await downloadVideo(url, quality);

      await robin.sendMessage(
        from,
        {
          document: video.buffer,
          mimetype: "video/mp4",
          fileName: `${video.title}.mp4`,
          caption: `🎥 *${video.title}*\n\n*MADE BY - DINUWH-MD🖇️*`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);


//=3=3.03=3.033=3.033=3.033=3.0333=3.03333=3.033333=3.0333333=3.03333333=3.03333333


cmd(
  {
    pattern: "1080vd",
    react: "🎥",
    desc: "Download YouTube Video",
    category: "download",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }
  ) => {
    try {
      if (!q) return reply("*📥 Please provide a name or a YouTube link.*");

      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      const downloadVideo = async (url, quality) => {
        const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${quality}&url=${encodeURIComponent(
          url
        )}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

        const response = await axios.get(apiUrl);

        if (response.data && response.data.success) {
          const { id, title } = response.data;
          const progressUrl = `https://p.oceansaver.in/ajax/progress.php?id=${id}`;

          while (true) {
            const progress = await axios.get(progressUrl);
            if (progress.data.success && progress.data.progress === 1000) {
              const videoBuffer = await axios.get(progress.data.download_url, {
                responseType: "arraybuffer",
              });
              return { buffer: videoBuffer.data, title };
            }
            await new Promise((resolve) => setTimeout(resolve, 5000));
          }
        } else {
          throw new Error("📛 Failed to fetch video details.");
        }
      };

      const quality = "1080";
      const video = await downloadVideo(url, quality);

      await robin.sendMessage(
        from,
        {
          document: video.buffer,
          mimetype: "video/mp4",
          fileName: `${video.title}.mp4`,
          caption: `🎥 *${video.title}*\n\n*MADE BY - DINUWH-MD🖇️*`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);

//VideoDownload Main


cmd({
  pattern: "normalv",
  alias: "song",
  react: "🎵",
  desc: "Download Song",
  category: "download",
  filename: __filename,
}, async (robin, mek, m, { from, q, prefix, reply }) => {
  try {
    if (!q) return reply("\`Give Me SONG NAME OR LINK || නමක් දියන්😓❤️\`");

    const search = await yts(q);
    if (!search.videos.length) return reply("\`❌ Video not found!\`");
    const data = search.videos[0];

    const cap = `\`乂 Ｄ𝚒ｎｕｗｈ Чт Ｄｏｗｎ⟩⟩⟩\`
╭────────✦✧✦────────╯

> \`╭───────────────✿\` 
> *Same The Old Details 😴🖇️*
> \`╰───────────────✿\`
╭───────────────✿  
│ *Select You Want Video quality* 🧚‍♂️
│ *ඔබට අවශ්‍ය වීඩියෝ ගුණාත්මක තත්වය තෝරන්න 😴🖇️*
╰───────────────✿`;

    // ✳️ If nonbutton mode
if (config.MODE === 'nonbutton') {
  const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: `${prefix}144v ${data.url}`, description: '\`❲ 144p Normal Video File ❳\` 📽️'},
	    {title: "2", rowId: `${prefix}240v ${data.url}`, description: '\`❲ 240p Normal Video File ❳\` 📽️'} ,
      {title: "3", rowId: `${prefix}360v ${data.url}`, description: '\`❲ 360p Normal Video File ❳\` 📽️'} ,
      {title: "4", rowId: `${prefix}480v ${data.url}`, description: '\`❲ 480p Normal Video File ❳\` 📽️'} ,
      {title: "5", rowId: `${prefix}720v ${data.url}`, description: '\`❲ 720p Normal Video File ❳\` 📽️'} ,
      {title: "6", rowId: `${prefix}1080v ${data.url}`, description: '\`❲ 1080 Normal Video File ❳\` 📽️'} ,
	]
    } 
]
const listMessage = {
caption: cap,
image: { url: data.thumbnail },  // <-- use YouTube thumbnail here
footer: '> 〽️ade By Dinuwh Bbh',
title: '',
buttonText: '> *◎Power Full Whatsapp bot Make By Dinuwh◎*',
sections
}
	
return await robin.replyList(from, listMessage ,{ quoted : mek })

	//button
} if (config.MODE === 'button') {
      const listData = {
        title: "◎ ❨𝙲𝙷𝙾𝙾𝚂 𝚅𝙸𝙳𝙴𝙾 𝚀𝚄𝙰𝙻𝙸𝚃𝚈❩ ◎",
        sections: [{
          title: "NORMAL VIDEO OPTIONS",
          rows: [
            {
              title: "\`❨ 144p Normal Video File ❩\` 📽️",
              description: "*Download as Normal.Type 144p*\n> *〽️ade By Dinuwh Bbh*",
              id: `${prefix}144v ${data.url}`
            },
            {
              title: "\`❨ 240p Normal Video File ❩\` 📽️",
              description: "*Download as Normal.Type 240p*\n> *〽️ade By Dinuwh Bbh*",
              id: `${prefix}240v ${data.url}`
            },
            {
              title: "\`❨ 360p Normal Video File ❩\` 📽️",
              description: "*Download as Normal.Type 360p*\n> *〽️ade By Dinuwh Bbh*",
              id: `${prefix}360v ${data.url}`
            },
            {
              title: "\`❨ 480p Normal Video File ❩\` 📽️",
              description: "*Download as Normal.Type 480p*\n> *〽️ade By Dinuwh Bbh",
              id: `${prefix}480v ${data.url}`
            },
	    {
              title: "\`❨ 720p Normal Video File ❩\` 📽️",
              description: "*Download as Normal.Type 720p*\n> *〽️ade By Dinuwh Bbh*",
              id: `${prefix}720v ${data.url}`
            },
            {
              title: "\`❨ 1080p Normal Video File ❩\` 📽️",
              description: "*Download as Normal.Type 1080p*\n> *〽️ade By Dinuwh Bbh",
              id: `${prefix}1080v ${data.url}`
            }
          ]
        }]
      };

      return await robin.sendMessage(from, {
        image: { url: data.thumbnail },
        caption: cap,
        footer: "> 〽️ade By Dinuwh Bbh",
        buttons: [
          
          {
            buttonId: `${prefix}dinuping`,
            buttonText: { displayText: "`[CHECK BOT SPEED 📍]`" },
            type: 1
          },

          {
            buttonId: "action",
            buttonText: { displayText: "🔘" },
            type: 4,
            nativeFlowInfo: {
              name: "single_select",
              paramsJson: JSON.stringify(listData),
            },
          },
        ],
        headerType: 1,
        viewOnce: true,
      }, { quoted: mek });
    }
  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e.message}`);
  }
});


//=======3=3.04=3.044=3.0444=3.0444=3.04444=3.044443=3.044443=3.0444434=3.04444344=3.044443444=3.0444434444

cmd({
  pattern: "documentv",
  alias: "song",
  react: "🎵",
  desc: "Download Song",
  category: "download",
  filename: __filename,
}, async (robin, mek, m, { from, q, prefix, reply }) => {
  try {
    if (!q) return reply("\`Give Me SONG NAME OR LINK || නමක් දියන්😓❤️\`");

    const search = await yts(q);
    if (!search.videos.length) return reply("\`❌ Video not found!\`");
    const data = search.videos[0];

    const cap = `\`乂 Ｄ𝚒ｎｕｗｈ Чт Ｄｏｗｎ⟩⟩⟩\`
╭────────✦✧✦────────╯

> \`╭───────────────✿\` 
> *Same The Old Details 😴🖇️*
> \`╰───────────────✿\`
╭───────────────✿  
│ *Select You Want Video quality* 🧚‍♂️
│ *ඔබට අවශ්‍ය වීඩියෝ ගුණාත්මක තත්වය තෝරන්න 😴🖇️*
╰───────────────✿`;

    // ✳️ If nonbutton mode
if (config.MODE === 'nonbutton') {
  const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: `${prefix}144vd ${data.url}`, description: '\`❲ 144p Document Video File ❳\` 📽️'},
	    {title: "2", rowId: `${prefix}240vd ${data.url}`, description: '\`❲ 240p Document Video File ❳\` 📽️'} ,
      {title: "3", rowId: `${prefix}360vd ${data.url}`, description: '\`❲ 360p Document Video File ❳\` 📽️'} ,
      {title: "4", rowId: `${prefix}480vd ${data.url}`, description: '\`❲ 480p Document Video File ❳\` 📽️'} ,
      {title: "5", rowId: `${prefix}720vd ${data.url}`, description: '\`❲ 720p Document Video File ❳\` 📽️'} ,
      {title: "6", rowId: `${prefix}1080vd ${data.url}`, description: '\`❲ 1080 Document Video File ❳\` 📽️'} ,
	]
    } 
]
const listMessage = {
caption: cap,
image: { url: data.thumbnail },  // <-- use YouTube thumbnail here
footer: '> 〽️ade By Dinuwh Bbh',
title: '',
buttonText: '> *◎Power Full Whatsapp bot Make By Dinuwh◎*',
sections
}
	
return await robin.replyList(from, listMessage ,{ quoted : mek })

	//button
} if (config.MODE === 'button') {
      const listData = {
        title: "◎ ❨𝙲𝙷𝙾𝙾𝚂 𝚅𝙸𝙳𝙴𝙾 𝚀𝚄𝙰𝙻𝙸𝚃𝚈❩ ◎",
        sections: [{
          title: "DOCUMENT VIDEO OPTIONS",
          rows: [
            {
              title: "\`❨ 144p Document Video File ❩\` 📽️",
              description: "*Download as Document.Type 144p*\n> *〽️ade By Dinuwh Bbh*",
              id: `${prefix}144vd ${data.url}`
            },
            {
              title: "\`❨ 240p Document Video File ❩\` 📽️",
              description: "*Download as Document.Type 240p*\n> *〽️ade By Dinuwh Bbh*",
              id: `${prefix}240vd ${data.url}`
            },
            {
              title: "\`❨ 360p Document Video File ❩\` 📽️",
              description: "*Download as Document.Type 360p*\n> *〽️ade By Dinuwh Bbh*",
              id: `${prefix}360vd ${data.url}`
            },
            {
              title: "\`❨ 480p Document Video File ❩\` 📽️",
              description: "*Download as Document.Type 480p*\n> *〽️ade By Dinuwh Bbh",
              id: `${prefix}480vd ${data.url}`
            },
	    {
              title: "\`❨ 720p Document Video File ❩\` 📽️",
              description: "*Download as Document.Type 720p*\n> *〽️ade By Dinuwh Bbh*",
              id: `${prefix}720vd ${data.url}`
            },
            {
              title: "\`❨ 1080p Document Video File ❩\` 📽️",
              description: "*Download as Document.Type 1080p*\n> *〽️ade By Dinuwh Bbh",
              id: `${prefix}1080vd ${data.url}`
            }
          ]
        }]
      };

      return await robin.sendMessage(from, {
        image: { url: data.thumbnail },
        caption: cap,
        footer: "> 〽️ade By Dinuwh Bbh",
        buttons: [
          
          {
            buttonId: `${prefix}ping ${data.url}`,
            buttonText: { displayText: "`[CHECK BOT SPEED 📍]`" },
            type: 1
          },

          {
            buttonId: "action",
            buttonText: { displayText: "🔘 Choose Song Type" },
            type: 4,
            nativeFlowInfo: {
              name: "single_select",
              paramsJson: JSON.stringify(listData),
            },
          },
        ],
        headerType: 1,
        viewOnce: true,
      }, { quoted: mek });
    }
  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e.message}`);
  }
});
	  



//Fbbbbbb



const api = `https://nethu-api-ashy.vercel.app`;

//01.Facebook Download
cmd({
  pattern: "fb",
  react: "🎥",
  alias: ["fbbbb", "fbvideo", "fb"],
  desc: "ddesc",
  category: "download",
  use: '.facebook <facebook_url>',
  filename: __filename
},
async(conn, mek, m, {
    from, prefix, q, reply
}) => {
  try {
  if (!q) return reply("Please provide a Facebook video URL.");

  const fb = await fetchJson(`${api}/download/fbdown?url=${encodeURIComponent(q)}`);

if (!fb.result || (!fb.result.sd && !fb.result.hd)) {
  return reply("Video not found or not downloadable. Please check the URL.");
}

let result = fb.result; // <== මෙතන result එක assign කරපන්

let caption = `\`乂 Ｄ𝚒ｎｕｗｈ 𝐹𝛣 Ｄｏｗｎ⟩⟩⟩\`
╭────────✦✧✦────────╯


* *▣ \`T\` itle* : ${result.title || 'N/A'}
* *▣ \`D\` esc* : ${result.desc || 'N/A'}
* *▣ \`U\` RL*   : ${q}
╭────────✦✧✦────────╯

╭───────────────✿  
│ 🎶 *ƒσℓℓσω υѕ мυѕι¢ ¢нαηηєℓ* 🧚‍♂️  
╰───────────────✿  
🔗 https://whatsapp.com/channel/0029Vb3mqn5H5JLuJO3s3Z1J
`;
  if (config.MODE === 'nonbutton') {
  const sections = [
  {
    title: "📹 𝐕𝐢𝐝𝐞𝐨 𝐖𝐢𝐭𝐡 𝐒𝐃",
    rows: [
      {
        title: "1",
        rowId: `${prefix}downfb_sd ${q}`,
        description: 'SD Normal Video 📹'
      },
      {
        title: "2",
        rowId: `${prefix}downfb_sdd ${q}`,
        description: '\`SD video Note 📹\`'
      },
      {
        title: "3",
        rowId: `${prefix}downfb_sdp ${q}`,
        description: 'SD Document Video 📄'
      }
    ] 
  },
  {
    title: "🎞️ 𝐕𝐢𝐝𝐞𝐨 𝐖𝐢𝐭𝐡 𝐇𝐃",
    rows: [
      {
        title: "4",
        rowId: `${prefix}downfb_hd ${q}`,
        description: 'HD Normal Video 📹'
      },
     {
        title: "5",
        rowId: `${prefix}downfb_hdd ${q}`,
        description: '\`HD Video Note 📹\`'
      }, 
      {
        title: "6",
        rowId: `${prefix}downfb_hdp ${q}`,
        description: 'HD Document Video 📄'
      }
    ]
  },
  {
    title: "🎧 𝐀𝐮𝐝𝐢𝐨 𝐎𝐩𝐭𝐢𝐨𝐧𝐬",
    rows: [
      {
        title: "7",
        rowId: `${prefix}fb_sd_audio ${q}`,
        description: 'Audio With Normal File 🎵'
      },
      {
        title: "8",
        rowId: `${prefix}fb_sd_doc ${q}`,
        description: '\`Audio With Document File 📄\`'
      },
      {
        title: "9",
        rowId: `${prefix}fb_sd_ptt ${q}`,
        description: 'Audio With Voice Note 🎤'
      }
    ]
  }
];
const listMessage = {
  caption: caption,
  image: { url: fb.result.thumb }, // ✅ fixed line
  footer: '> *〽️ade By Dinuwh Bbh*',
  title: '',
  buttonText: '> *◎Reply Below Number ⇲◎*',
  sections
};

return await conn.replyList(from, listMessage, { quoted: mek });
	//button
} if (config.MODE === 'button') {
      const listData = {
  title: "𝐕𝐢𝐝𝐞𝐨 𝐒𝐞𝐥𝐞𝐜𝐭𝐢𝐨𝐧 ツ",
  sections: [
    {
      title: "⥥ Sd Qulity ᴠɪᴅᴇᴏ ᴄᴏʟʟᴇᴄᴛɪᴏɴ ⇲",
      rows: [
        {
          title: "SD Normal Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}downfb_sd ${q}`
        },
        {
          title: "SD Document Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}downfb_sdd ${q}`
        },
	{
          title: "SD Video Note",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}downfb_sdp ${q}`
	}
      ]
    },
    {
      title: "⥥ Hd Qulity ᴠɪᴅᴇᴏ ᴄᴏʟʟᴇᴄᴛɪᴏɴ ⇲",
      rows: [
        {
          title: "HD Normal Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}downfb_hd ${q}`
        },
	{
          title: "HD Document Video",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}downfb_hdd ${q}`
        },
	{
          title: "HD Video Note",
          description: "〽️ade By Dinuwh Bbh",
          id: `${prefix}downfb_hdp ${q}`
        }
        
      ]
    }
  ]
};
const listData2 = {
        title: "𝐀𝐮𝐝𝐢𝐨 𝐒𝐞𝐥𝐞𝐜𝐭𝐢𝐨𝐧 ツ",
        sections: [{
          title: "TikTok Audio Down Section 🎧",
          rows: [
            
            {
              title: "\`Fb Audio With Normal\`",
              description: "〽️ade By Dinuwh Bbh",
              id: `${prefix}fb_sd_audio ${q}`
            },
            {
              title: "\`Fb Audio With Document\`",
              description: "〽️ade By Dinuwh Bbh",
              id: `${prefix}fb_sd_doc ${q}`
            },
            {
              title: "\`Fb Audio With Voice Note\`",
              description: "〽️ade By Dinuwh Bbh",
              id: `${prefix}fb_sd_ptt ${q}`
            }
          ]
        }]
      };

      return await conn.sendMessage(from, {
        image: { url: fb.result.thumb },
        caption: caption,
        footer: "> *〽️ade By Dinuwh Bbh*",
        buttons: [
          {
            buttonId: "action",
            buttonText: { displayText: "🔘" },
            type: 4,
            nativeFlowInfo: {
              name: "single_select",
              paramsJson: JSON.stringify(listData),
            },
          },
          {
            buttonId: "action",
            buttonText: { displayText: "🔘" },
            type: 4,
            nativeFlowInfo: {
              name: "single_select",
              paramsJson: JSON.stringify(listData2),
            },
          }
        ],
        headerType: 1,
        viewOnce: true,
      }, { quoted: mek });
    }

  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e.message}`);
  }
});
*/

