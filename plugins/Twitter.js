const { cmd, commands } = require('../lib/command');
const { fetchJson } = require('../lib/functions');
const { Buffer } = require('buffer');
const { igdl, ttdl } = require('ruhend-scraper');
//const apkdl = require('../lib/apkdl');
const fg = require('api-dylux');
const axios = require('axios');
const mimeTypes = require('mime-types');
//const config = require(../settings);
const config = require("../settings");
//const axios = require("axios");
const prefix = config.PREFIX || ".";
const sadiya_apikey = 'sadiya-key-666';
const shan_apikey = 'ae56006bcfe029bd';
const sadiya_md_footer = '> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ꜱᴀᴅɪʏᴀ ᴛᴇᴄʜ*';
const desc = 'DINUE-HTO';
cmd(
  {
    pattern: 'twittr',
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
