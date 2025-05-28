
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions')
const { cmd, commands } = require("../lib/command");
const yts = require("yt-search");
const config = require("../settings");

// Get prefix dynamically from settings or fallback
const prefix = config.PREFIX || ".";

cmd({
  pattern: "song",
  alias: "ytmp3",
  react: "🎵",
  desc: "Download Song",
  category: "download",
  filename: __filename,
}, async (robin, mek, m, { from, q, reply }) => {
  try {
    if (!q) return reply("නමක් හරි ලින්ක් එකක් හරි දෙන්න 🌚❤️");

    const search = await yts(q);
    if (!search.videos.length) return reply("❌ Video not found!");

    const data = search.videos[0];
    const cap = `〲🎶𝙽𝙾𝚆 𝚄𝙿𝙻𝙾𝙰𝙳𝙸𝙽𝙶...㋞||🕊️

🖇️𝚃𝙸𝚃𝙻𝙴     : ${data.title}
✄𝚄𝚁𝙻         : ${data.url}
✨𝚃𝙸𝙼𝙴       : ${data.timestamp}      
✰𝚄𝙿𝙻𝙾𝙰𝙳  : ${data.ago}
◲𝚅𝙸𝙴𝚆𝚂◱  : ${data.views}

> #DιηᵤW 🅱🅱🅷 ɱυʂιƈ ѕтуℓє㋛☚

*||අනිවාරෙන්ම රියැක්ට් කරන්න ළමයෝ...🕊️🌼 ඔයාගෙ ආසම සින්දු අහන්න සෙට් වෙලා ඉන්න...😚💖*
> *𝙷𝙴𝙰𝙳𝙿𝙷𝙾𝙽𝙴 O𝚗 𝙵𝙴𝙴𝙻 𝚃𝙷𝙴 𝚅𝙸𝙱𝙴!*

🖇️ALL MUSIC PLAY LIST 👇
https://whatsapp.com/channel/0029Vb3mqn5H5JLuJO3s3Z1J/2311`;

    // nonbutton mode - list message
    if (config.MODE === "nonbutton") {
      const sections = [{
        title: "",
        rows: [
          { title: "1. Voice🎧", rowId: `${prefix}ytptt ${data.url}|${data.title}`, description: "Voice Note type song" },
          { title: "2. Audio 🎧", rowId: `${prefix}ytaud ${data.url}|${data.title}`, description: "Normal type song" },
          { title: "3. Document 📂", rowId: `${prefix}ytdoc ${data.url}|${data.title}`, description: "Document type song" }
        ]
      }];
      const listMessage = {
        text: "*SELECT SONG TYPE*",
        footer: "*DINUWH MD V2 BOT*\n*POWERED BY CYBER VENOM*",
        buttonText: "```🔢 Reply below number you need song type```",
        sections
      };
      return await robin.sendMessage(from, listMessage, { quoted: mek });
    }

    // button mode - with single_select (nativeFlowInfo)
    if (config.MODE === "button") {
      const listData = {
        title: "Click Here⎙",
        sections: [{
          title: "DINUWH MD",
          rows: [
            {
              title: "Voice 💡",
              description: "Download as Voice Note",
              id: `${prefix}ytptt ${data.url}`
            },
            {
              title: "Audio 🎧",
              description: "Download as audio",
              id: `${prefix}ytaud ${data.url}`
            },
            {
              title: "Document 📁",
              description: "Download as document",
              id: `${prefix}ytdoc ${data.url}`
            }
          ]
        }]
      };

      return await robin.sendMessage(from, {
        image: { url: data.thumbnail },
        caption: cap,
        footer: config.FOOTER || "Powered by DINUWH MD",
        buttons: [
          {
            buttonId: `${prefix}ytptt ${data.url}`,
            buttonText: { displayText: "Voice Note 🎧" },
          },
          {
            buttonId: `${prefix}ytaud ${data.url}`,
            buttonText: { displayText: "Audio 🎧" },
          },
          {
            buttonId: `${prefix}ytdoc ${data.url}`,
            buttonText: { displayText: "Document 📁" },
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
//Ptt



cmd({
  pattern: "ytptt",
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

