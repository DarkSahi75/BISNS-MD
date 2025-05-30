const fetch = require("node-fetch");
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions')
const { cmd, commands } = require("../lib/command");
const yts = require("yt-search");
const config = require("../settings");
// Get prefix dynamically from settings or fallback
const prefix = config.PREFIX || ".";
const cheerio = require('cheerio'); // For HTML scraping from AN1
const { JSDOM } = require('jsdom'); // For DOM parsing from HTML
const axios = require("axios");

cmd({
  pattern: "dsong",
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
} if (config.MODE === 'button') {
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
            },
            {
              title: "[Video File 📽️]",
              description: "Download as Video\n〽️ade By Dinuwh Bbh",
              id: `${prefix}devilv ${data.url}`
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
            buttonId: `${prefix}ytvoice ${data.url}`,
            buttonText: { displayText: "`[Voice Note(Ptt) 🎧]`" },
            type: 1
          },
          {
            buttonId: `${prefix}ytaud ${data.url}`,
            buttonText: { displayText: "`[Audio Type 🎧]`" },
            type: 1
          },
          {
            buttonId: `${prefix}ytdoc ${data.url}`,
            buttonText: { displayText: "`[Document 📁]`" },
            type: 1
          },
          {
            buttonId: `${prefix}devilv ${data.url}`,
            buttonText: { displayText: "`[Video 📽️]`" },
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




//videoinfosendjs=========================-====--%=%=%--%-%-%-$-#-#-#=##=$-$-#9#9=9.0=9.0-$839#=$-$738#=738.0$-%*$8##-%748$=$-%7$8$=$-%-

cmd({
  pattern: "devilv",
  //alias: "song",
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

*Details :- Same The Old Details 📽️*
╭───────────────✿  
│ *Send You Want Song Formate ⤵️*
╰───────────────✿`;

    // ✳️ If nonbutton mode
if (config.MODE === 'nonbutton') {
  const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: `${prefix}devilnewv ${data.url}`, description: '\`❲ Normal Video File ❳\` 📽️'},
	    {title: "2", rowId: `${prefix}devilnewd ${data.url}`, description: '\`❲ Document Video File ❳\` 📄'} ,
        
	]
    } 
]
const listMessage = {
caption: cap,
image: { url: data.thumbnail },  // <-- use YouTube thumbnail here
footer: '> 〽️ade By Dinuwh Bbh',
title: '',
buttonText: '> *◎PowerFull Whatsapp Bot Make By Dinuwh◎*',
sections
}
	
return await robin.replyList(from, listMessage ,{ quoted : mek })

	//button
} if (config.MODE === 'button') {
      const listData = {
        title: "◎ Choose Format ◎",
        sections: [{
          title: "DINUWH MD OPTIONS",
          rows: [
            {
              title: "[Normle Video📽️]",
              description: "Download as audio\n〽️ade By Dinuwh Bbh",
              id: `${prefix}devilnewv ${data.url}`
            },
            {
              title: "[Document Video📁]",
              description: "Download as document\n〽️ade By Dinuwh Bbh",
              id: `${prefix}devilnewd ${data.url}`
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
            buttonId: `${prefix}devilnewv ${data.url}`,
            buttonText: { displayText: "`[Normal Video 📽️]`" },
            type: 1
          },
          {
            buttonId: `${prefix}devilnewd ${data.url}`,
            buttonText: { displayText: "`[Document Video 📄]`" },
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

    

    // ✳️ If nonbutton mode
/*if (config.MODE === 'nonbutton') {
  const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: `${prefix}normalv ${data.url}`, description: '\`❲ Normal Video Files ❳\` 📽️'},
	    {title: "2", rowId: `${prefix}documentv ${data.url}`, description: '\`❲ Document Video Files ❳\` 📄'} ,
        
	]
    } 
]
const listMessage = {
caption: cap,
image: { url: data.thumbnail },  // <-- use YouTube thumbnail here
footer: '> 〽️ade By Dinuwh Bbh',
title: '',
buttonText: '> *◎PowerFull Whatsapp Bot Make By Dinuwh◎*',
sections
}
	
return await robin.replyList(from, listMessage ,{ quoted : mek })

	//button
	} if (config.MODE === 'button') {
      const listData = {
        title: "◎ 𝙲𝙷𝙾𝙾𝚂 𝙵𝙸𝙻𝙴 𝙵𝙾𝚁𝙼𝙰𝚃𝙴 ◎",
        sections: [{
          title: "DINUWH MD OPTIONS",
          rows: [
            {
              title: "[Normal Video file List 📽️]",
              description: "Download as Normal Video\n〽️ade By Dinuwh Bbh",
              id: `${prefix}normalv ${data.url}`
            },
            
	   
            {
              title: "[Document Video File List 📄]",
              description: "Download as Document Video\n〽️ade By Dinuwh Bbh",
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
                    buttonId: `${prefix}ping`,
                    buttonText: {
                        displayText: 'CHECK PING 📍'
                    },
                },
		
            ],
            headerType: 1,
            viewOnce: true
        }, {
            quoted: m
        });
        

}


	
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})
*/

if (config.MODE === 'nonbutton') {
  const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: `${prefix}normalv ${data.url}`, description: '\`❲ Normal Type Videos ❳\` 📽️'},
	    {title: "2", rowId: `${prefix}documentv ${data.url}`, description: '\`❲ Document Typr Videos ❳\` 📄'} ,
            
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

//Apkdl-js

//const { cmd } = require('../command')
//const { fetchJson } = require('../lib/functions')

const apilink = 'https://www.dark-yasiya-api.site' 




cmd({
    pattern: "apk",
    alias: ["app","ps","playstore"],
    react: "🕹️",
    desc: "Download App APK ",
    category: "download",
    use: '.apk < text >',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply, q }) => {
try{

  if(!q) return await reply("Please give me few word !")
    
const apk_search = await fetchJson(`${apilink}/search/apk?text=${q}`)
if(apk_search.result.data.length < 0) return await reply("Not results found !")

const apk_info = await fetchJson(`${apilink}/download/apk?id=${apk_search.result.data[0].id}`)
    
  // GET FIRST APK
  
const apkcaption =`\`乂 Ｄｉｎｕ 𝑿 Ａｐｋ Ｄｏｗｎｌｏａｄｅｒ ⚙️📥\`
\`\`\`◎.LastUpdate\`\`\` = ❨${apk_info.result.lastUpdate}❩

\`\`\`◎. Apk Name \`\`\` = ❨${apk_info.result.name}❩

\`\`\`◎.Package\`\`\` = ❨${apk_info.result.package}❩

\`\`\`◎.Size\`\`\` = ❨${apk_info.result.size}❩

_ƒσℓℓσω тσ ℓєαяη тє¢н 👨‍💻 :-_
 _https://whatsapp.com/channel/0029Vb5XXIfDp2Q3A5zeZb1d_`
await conn.sendMessage( from, { image: { url: apk_info.result.image || '' }, caption: apkcaption }, { quoted: mek })

// SEND APK
await conn.sendMessage(from, { document: { url: apk_info.result.dl_link }, mimetype: "application/vnd.android.package-archive", fileName: apk_info.result.name , caption: apk_info.result.name }, { quoted: mek });


} catch (error) {
console.log(error)
reply(error)
}
});


//fancy js===4=4.04=4.044=4.0444=4.04444=4.044444=4.04444444=4.044444444=4.0444444444
//onst { cmd } = require('../command');
//const { fetchJson } = require('../lib/functions');
//const axios = require('axios'); // For API and scraping requests

async function stylizeText(text) {
    let res = await fetch('http://qaz.wtf/u/convert.cgi?text=' + encodeURIComponent(text));
    let html = await res.text();
    let dom = new JSDOM(html);
    let table = dom.window.document.querySelector('table').children[0].children;
    let obj = {};
    
    for (let tr of table) {
        let content = tr.children[1].textContent.replace(/^\n/, '').replace(/\n$/, '');
        obj[content] = content; // Use content as key and value
    }
    
    return Object.values(obj); // Return only the values
}

cmd({
    pattern: "fancy",
    react: "🔮",
    alias: ["stylefont", "style"],
    desc: "It converts your replied sticker to video.",
    category: "convert",
    use: '.fancy *<Your Text>*',
    filename: __filename
},   
  async (
    conn,
    mek,
    m,
    {
      from,
      prefix,
      l,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isPreUser,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    if (!q) return reply("🚩 *Please give me words to style that text*");
    
    try {
      var rows = [];
      let res = await stylizeText(q);
      res.map((v) => {
        rows.push({
          buttonId: prefix + `gettext ${v}`,
          buttonText: { displayText: `${v}` },
          type: 1,
        });
      });

      const buttonMessage = {
        image: `https://cdn.textstudio.com/output/sample/normal/4/7/8/7/fonts-style-changer-logo-832-17874.png`,
        caption: `乂 *F O N T - C H A N G E R*`,
        footer: config.FOOTER,
        buttons: rows,
        headerType: 4,
      };
      return await conn.buttonMessage(from, buttonMessage, mek);
    } catch (e) {
        reply('*Error !!*');
        console.error(e);
    }
});
cmd({
    pattern: "gettext",
    react: "🚩",
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
    
    try {
        await reply(q)
    } catch (e) {
        reply('*Error !!*');
        console.error(e);
    }
});

async function ans(q) {
    const url = `https://an1.com/tags/MOD/?story=${q}&do=search&subaction=search`;

    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        let results = [];

        $("body > div.page > div > div > div.app_list > div").each((i, el) => {
            let title = $(el).find("div.cont > div.data > div.name > a > span").text().trim() || "N/A";
            let dev = $(el).find("div.cont > div.data > div.developer.xsmf.muted").text().trim() || "N/A";
            let rating = $(el).find("div > ul > li.current-rating").text().trim() || "N/A";
            let thumb = $(el).find("div.img > img").attr("src") || "N/A";
            let link = $(el).find("div.cont > div.data > div.name > a").attr("href") || "N/A";

            results.push({ title, dev, rating, thumb, link });
        });

        results = results.filter(item => item.title !== "N/A" && item.dev !== "N/A" && item.rating !== "N/A");

        return results
    } catch (error) {
        console.error("error:", error);
        return [];
    }
}
//removebg


cmd({
    pattern: "removebg",
    alias: ["nobg", "transparent"],
    use: ".removebg (reply to image)",
    react: "🖼️",
    desc: "Remove image background",
    category: "tools",
    filename: __filename
},
async (conn, m, mek, { from, reply, tr }) => {
    try {
        let target = m.quoted ? m.quoted : m;
        
        const isImage = () => {
            if (target.imageMessage) return true;
            if (target.msg?.imageMessage) return true;
            if (target.mimetype?.startsWith('image/')) return true;
            if (target.msg?.mimetype?.startsWith('image/')) return true;
            return false;
        };

        if (!isImage()) {
            return await reply(await tr("*Please reply to an image!*"));
        }

        await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });

        const imageBuffer = await target.download();

        const base64Image = imageBuffer.toString('base64');

        const response = await axios.post(
            "https://us-central1-ai-apps-prod.cloudfunctions.net/restorePhoto", 
            {
                image: `data:image/png;base64,${base64Image}`,
                model: "fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003",
            }
        );

        const resultUrl = response.data?.replace(/"/g, '');
        if (!resultUrl) {
            throw new Error("Background removal failed");
        }
        await conn.sendMessage(
            from,
            {
                image: { url: resultUrl },
                caption: "*Background removed by DARK SHAN MD*"
            },
            { quoted: mek }
        );

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (e) {
        console.error('Error in removebg command:', e);
        await reply(await tr("*Error occurred while removing background!*"));
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
    }
});
//translate 

//onst axios = require('axios');
//onst { cmd } = require('../command');

cmd({
    pattern: "trt",
    desc: "🌍 Translate text between languages",
    react: "🌐",
    category: "other",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const args = q.split(' ');
        if (args.length < 2) return reply("❗ Please provide a language code and text. Usage: .translate [language code] [text]");

        const targetLang = args[0];
        const textToTranslate = args.slice(1).join(' ');

        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=en|${targetLang}`;

        const response = await axios.get(url);
        const translation = response.data.responseData.translatedText;

        const translationMessage = `
🌍 *Translation* 🌍

🔤 *Original*: ${textToTranslate}
🔠 *Translated*: ${translation}
🌐 *Language*: ${targetLang.toUpperCase()}

*©Qᴜᴇᴇɴ ᴋʏʟɪᴇ-ᴍᴅ ʙʏ ꜱᴀʜᴀꜱ ᴛᴇᴄʜッ*`;

        return reply(translationMessage);
    } catch (e) {
        console.log(e);
        return reply("⚠️ αη єяяσя σ¢¢υяяє∂ ωнιℓє тяαηѕℓαтιηg тнє тєχт. ρℓєαѕє тяу αgαιη ℓαтєя.");
    }
});

//onst { cmd } = require('../command');
//st yts = require('yt-search');

cmd({
    pattern: "yts",
    alias: ["youtubesearch", "ytsearch"],
    desc: "Search for YouTube videos",
    category: "search",
    react: "🔍",
    filename: __filename,
    use: '<search query>'
},
async (conn, mek, m, { from, args, reply }) => {
    if (!args[0]) return reply('Please provide a search query !');

    const query = args.join(' ');

    try {
        const results = await yts(query);
        
        if (!results.videos.length) {
            return reply('No videos found for the given query.');
        }

        let response = '*YouTube Search Results:*\n\n';
        results.videos.slice(0, 20).forEach((video, index) => {
            response += `${index + 1}. *${video.title}*\n`;
            response += `   Channel: ${video.author.name}\n`;
            response += `   Duration: ${video.duration.timestamp}\n`;
            response += `   Views: ${formatNumber(video.views)}\n`;
            response += `   Uploaded: ${video.ago}\n`;
            response += `   Link: ${video.url}\n\n`;
        });

        response += `\nShowing top 20 results for "${query}"\n`;
        response += `To watch, click on the video link or use the command:\n`;

        await conn.sendMessage(from, { text: response }, { quoted: mek });
    } catch (error) {
        console.error('Error in YouTube search:', error);
        reply('❌ An error occurred while searching YouTube. Please try again later.');
    }
});

// Helper function to format large numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}



