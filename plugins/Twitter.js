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

const gis = require("g-i-s");
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require('@whiskeysockets/baileys');

//nst { generateWAMessageFromContent, proto, prepareWAMessageMedia } = await import('baileys');

cmd({
  pattern: 'tw11',
  alias: ['x', 'twit', 'twitterdl', 'tw'],
  react: '❤️‍🩹',
  desc: 'Download from Twitter',
  category: 'download',
  filename: __filename,
}, async (conn, msg, msgInfo, { prefix, q, reply }) => {
  try {
    if (!q) return reply('*❌ Please give me Twitter URL*');

    const api = await fetchJson(`https://sadiya-tech-apis.vercel.app/download/twitterdl?url=${q}&apikey=${sadiya_apikey}`);
    const result = api?.result;
    if (!result?.thumb) return reply('❌ Video info not found.');

    const caption =
      `\`乂 Ｄ𝚒ｎｕｗｈ Чт Ｄｏｗｎ⟩⟩⟩\`\n╭────────✦✧✦────────╯\n\n*★ Title:* ${result.desc || 'Unknown'}`;

    const media = await prepareWAMessageMedia({ image: { url: result.thumb } }, { upload: conn.waUploadToServer });

    const cards = [
      {
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: '📥 SD Quality Options',
          hasMediaAttachment: true,
          ...media
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [
            {
              name: "quick_reply",
              buttonParamsJson: JSON.stringify({
                display_text: "1. SD Normal Video",
                id: `${prefix}twsd ${q}`
              })
            },
            {
              name: "quick_reply",
              buttonParamsJson: JSON.stringify({
                display_text: "2. SD Video Note",
                id: `${prefix}twsdptv ${q}`
              })
            },
            {
              name: "quick_reply",
              buttonParamsJson: JSON.stringify({
                display_text: "3. SD Document Video",
                id: `${prefix}twsddoc ${q}`
              })
            }
          ]
        })
      },
      {
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: '📥 HD Quality Options',
          hasMediaAttachment: true,
          ...media
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [
            {
              name: "quick_reply",
              buttonParamsJson: JSON.stringify({
                display_text: "1. HD Normal Video",
                id: `${prefix}twhd ${q}`
              })
            },
            {
              name: "quick_reply",
              buttonParamsJson: JSON.stringify({
                display_text: "2. HD Video Note",
                id: `${prefix}twhdptv ${q}`
              })
            },
            {
              name: "quick_reply",
              buttonParamsJson: JSON.stringify({
                display_text: "3. HD Document Video",
                id: `${prefix}twhddoc ${q}`
              })
            }
          ]
        })
      },
      {
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: '🎧 Audio Options',
          hasMediaAttachment: true,
          ...media
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [
            {
              name: "quick_reply",
              buttonParamsJson: JSON.stringify({
                display_text: "1. Audio Normal",
                id: `${prefix}twaud ${q}`
              })
            },
            {
              name: "quick_reply",
              buttonParamsJson: JSON.stringify({
                display_text: "2. Audio Document",
                id: `${prefix}twauddoc ${q}`
              })
            },
            {
              name: "quick_reply",
              buttonParamsJson: JSON.stringify({
                display_text: "3. Audio Voice Note",
                id: `${prefix}twaudptt ${q}`
              })
            }
          ]
        })
      }
    ];

    const msgContent = await generateWAMessageFromContent(msg.chat, {
      ephemeralMessage: {
        message: {
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: { text: caption },
            carouselMessage: { cards }
          })
        }
      }
    }, { userJid: msg.chat, quoted: msg });

    await conn.relayMessage(msg.chat, msgContent.message, { messageId: msgContent.key.id });

  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e.message}`);
  }
});

cmd({
  pattern: "gimgsidebtn",
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


cmd({
    pattern: "spotify",
    category: "download",
    react: "🎬",
    desc: "spotify downloader",
    use: ".spotify lelena",
    filename: __filename   
},
    async (conn, mek, m, { reply, isDev, from, l, q, prefix }) => {
        try {
        
        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
    // Mock API response (Replace this with the actual API endpoint if needed)
    
const links = await fetchJson(`https://nethu-api-ashy.vercel.app/search/spotify?q=${q}`)

const search = links.result
    if (config.MODE === 'nonbutton') {
if (search.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )		
	

var srh = [];  		
	
for (var i = 0; i < search.length; i++) {
srh.push({
title: i + 1,	
description: `${search[i].title}`,
rowId: prefix + 'spotifydl ' + search[i].url
});

	
}		
const sections = [
	{
title: "*Spotify*\n",
rows: srh
}
]

    const listMessage = {
text: `VAJIRA MD SPOTIFY-DL\n`,	    
footer: 'Test Htto',
title: '',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })


} if (config.MODE === 'button') {


            if (search.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )

var sections = []
        for (var i = 0; i < search.length; i++) {
        //if(data[i].thumb && !data[i].views.includes('Follow')){
          sections.push({
            rows: [{
              title: i + 1,
	      description:  search[i].title,
              id: prefix + 'spotifydl ' + search[i].url
            }]
          })
      }
//}

                let buttons = [{
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: 'Join Our Channel',
                        url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`,
                        merchant_url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`
                    }),
                },
                {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                        title: 'Result from Spotify. 📲',
                        sections
                    })
                }]
    
        let message = {
            image: config.LOGO,
            header: '',
            footer: config.FOOTER,
            body: ''
        }
return await conn.sendButtonMessage(from, buttons, m, message, { quoted: mek});


}	
	
		
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})
    



cmd({
    pattern: "spotify2",
    category: "download",
    react: "🎬",
    desc: "spotify downloader",
    use: ".spotify song name",
    filename: __filename   
},
async (conn, mek, m, { reply, isDev, from, l, q, prefix }) => {
    try {
        if (!q) return await reply('*🖊️ කරුණාකර ගීත නමක් දෙන්න!*');

        const links = await fetchJson(`https://nethu-api-ashy.vercel.app/search/spotify?q=${q}`);
        const search = links.result;

        if (!search || search.length === 0) {
            return await reply('😓 මට කිසිවක් සොයාගත නොහැකි විය!');
        }

        if (config.MODE === 'nonbutton') {
            let srh = [];  		
            for (let i = 0; i < search.length; i++) {
                srh.push({
                    title: `${i + 1}. ${search[i].title}`,
                    rowId: `${prefix}spotifydl ${search[i].url}`
                });
            }

            const sections = [{
                title: "🔎 Spotify Search Results",
                rows: srh
            }];

            const listMessage = {
                text: `🎧 *Spotify Downloader*`,
                footer: config.FOOTER,
                title: '',
                buttonText: '📥 ගීතය තෝරන්න',
                sections
            };

            return await conn.replyList(from, listMessage, { quoted: mek });

        } else if (config.MODE === 'button') {
            let sections = [{
                title: "🔎 Spotify Search Results",
                rows: []
            }];

            for (let i = 0; i < search.length; i++) {
                sections[0].rows.push({
                    title: `${i + 1}. ${search[i].title}`,
                    id: `${prefix}spotifydl ${search[i].url}`
                });
            }

            const buttons = [
                {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                        title: '📥 ගීතය තෝරන්න',
                        sections
                    })
                },
                {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: '📢 අපේ චැනලය Join වන්න',
                        url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`,
                        merchant_url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`
                    }),
                }
            ];

            const message = {
                image: config.LOGO,
                header: '🎧 Spotify Downloader',
                footer: config.FOOTER,
                body: `⬇️ ගීතය තෝරාගන්න\n\n🔍 Search: ${q}`
            };

            return await conn.sendButtonMessage(from, buttons, m, message, { quoted: mek });
        }

    } catch (e) {
        l(e);
        return reply('😵‍💫 *Error: Something went wrong!*');
    }
});
				

cmd({
    pattern: "spotifydl",
    react: "📥",
    filename: __filename
}, async (conn, mek, m, { from, q, isDev, reply }) => {
	
    if (!q) { 
	return await reply('*Please provide a direct URL!*')}
    try {

const response = await fetchJson(`https://vajira-official-api.vercel.app/download/spotifydl?url=${q}`)
const details = response.result
  
const cap = `
🎵 *Spotify Track Details* 🎵

📌 *Title*: ${details.title}
🎤 *Artist*: ${details.artis}
⏱️ *Durasi*: ${details.durasi}
🔗 *Type*: ${details.type}

🔍 *Powered by* ${config.FOOTER}
    `;

    


	    
var vajiralod = [
"《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
"《 ████▒▒▒▒▒▒▒▒》30%",
"《 ███████▒▒▒▒▒》50%",
"《 ██████████▒▒》80%",
"《 ████████████》100%",
"𝙸𝙽𝙸𝚃𝙸𝙰𝙻𝙸𝚉𝙴𝙳 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳 🦄..."
]
let { key } = await conn.sendMessage(from, {text: 'ᴜᴘʟᴏᴀᴅɪɴɢ ᴍᴏᴠɪᴇ...'})

for (let i = 0; i < vajiralod.length; i++) {
await conn.sendMessage(from, {text: vajiralod[i], edit: key })
}



await conn.sendMessage(from, { image: { url: details.image }, caption: cap }, { quoted: mek });

	    
        const message = {
            audio: await getBuffer(details.download),
	        caption: "*ᴠᴀᴊɪʀᴀ-ᴍᴅ ʙʏʙᴛᴅᴅ ɢᴀɴɢꜱ*",
            mimetype: "audio/mpeg",
            fileName: `${details.title}\nVAJIRA-MD.mp3`,
        };

	    
	const message1 = {
            document: await getBuffer(details.download),
	        caption: "*ᴠᴀᴊɪʀᴀ-ᴍᴅ ʙʏʙᴛᴅᴅ ɢᴀɴɢꜱ*",
            mimetype: "audio/mpeg",
            fileName: `${details.title}\nVAJIRA-MD.mp3`,
        };    

        await conn.sendMessage(from, message );
await conn.sendMessage(from, message1 );
        
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
      //  await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});

cmd({
  pattern: "spotify3",
  category: "download",
  react: "🎧",
  desc: "Spotify Downloader",
  use: ".spotify song name",
  filename: __filename,
},
  async (conn, mek, m, { reply, isDev, from, l, q, prefix }) => {
    try {
      if (!q) return await reply('*🖊️ කරුණාකර ගීත නමක් දෙන්න!*');

      const links = await fetchJson(`https://nethu-api-ashy.vercel.app/search/spotify?q=${q}`);
      const search = links.result;

      if (!search || search.length === 0)
        return await reply('😓 මට කිසිවක් සොයාගත නොහැකි විය!');

      // INLINE BUTTONS MODE (recommended)
      if (config.MODE === 'button') {
        const buttons = search.slice(0, 3).map((item, i) => ({
          buttonId: `${prefix}spotifydl ${item.url}`,
          buttonText: { displayText: `${i + 1}. ${item.title}` },
          type: 1
        }));

        return await conn.sendMessage(from, {
          image: config.LOGO,
          caption: `🎧 *Spotify Downloader*\n\n🔍 Search: *${q}*\n\n👇 *ගීතයක් තෝරන්න:*`,
          footer: config.FOOTER,
          buttons,
          headerType: 4
        }, { quoted: mek });
      }

      // NORMAL LIST MODE
      if (config.MODE === 'nonbutton') {
        const srh = search.map((item, i) => ({
          title: `${i + 1}. ${item.title}`,
          rowId: `${prefix}spotifydl ${item.url}`
        }));

        const sections = [{
          title: "🎧 Spotify Search Result",
          rows: srh
        }];

        const listMessage = {
          text: `🎧 *Spotify Downloader*`,
          footer: config.FOOTER,
          title: '',
          buttonText: '📥 ගීතය තෝරන්න',
          sections
        };

        return await conn.replyList(from, listMessage, { quoted: mek });
      }

    } catch (e) {
      console.log(e);
      return reply('😵‍💫 *Error: Something went wrong!*');
    }
  });



