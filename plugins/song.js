const sadiya_md_footer = "🌀 Powered by DINUWH MD";
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions')
const { cmd, commands } = require("../lib/command");
const yts = require("yt-search");
const config = require("../settings");

// Get prefix dynamically from settings or fallback
const prefix = config.PREFIX || ".";

cmd({
  pattern: "dsong",
  alias: "song",
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
    const cap = `〲 Dinu-x Beta YT Song Downloader

\`✗ Title\`    : ${data.title}
\`✗ Url\`      : ${data.url}
\`✗ Time\`     : ${data.timestamp} (${data.seconds} sec)    
\`✗ Upload\`   : ${data.ago}
\`✗ Views\`    : ${data.views}
 

\`\`\`ƒσℓℓσω υѕ мυѕι¢ ¢нαηηєℓ🧚‍♂️\`\`\`
https://whatsapp.com/channel/0029Vb3mqn5H5JLuJO3s3Z1J`;

    // nonbutton mode - list message
    if (config.MODE === "nonbutton") {
      const sections = [{
        title: "",
        rows: [
          { title: "1. Voice🎧", rowId: `${prefix}ytvoice ${data.url}|${data.title}`, description: "Voice Note type song" },
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
              id: `${prefix}ytvoice ${data.url}`
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
        footer:  "> 〽️ade By Dinuwh Bbh",
        buttons: [
          {
            buttonId: `${prefix}ytvoice ${data.url}`,
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

//video


cmd({
  pattern: "v144",
  //lias: ["yt144"],
  react: "📹",
  desc: "Download 144p video",
  category: "download",
  filename: __filename,
}, async (robin, mek, m, { q, reply }) => {
  try {
    if (!q) return reply("🔗 YouTube ලින්ක් එකක් හරි නමක් හරි දෙන්න");
    const search = await require("yt-search")(q);
    if (!search.videos.length) return reply("❌ Video not found!");

    const url = search.videos[0].url;
    const data = await fetchJson(`https://manul-official-new-api-site.vercel.app/convert?mp4=${encodeURIComponent(url)}&quality=144p&apikey=Manul-Official`);

    await robin.sendMessage(m.chat, {
      video: { url: data.data.url },
      caption: "",
    }, { quoted: mek });
  } catch (e) {
    reply(`❌ Error: ${e.message}`);
  }
});

//ytv

//const { cmd } = require("../command");
const axios = require("axios");

cmd({
  pattern: "yt144",
  react: "💗",
  category: "download",
  desc: "Download YouTube video 144p",
  filename: __filename,
}, async (robin, mek, m, { q, from, reply }) => {
  if (!q) return reply("🔗 YouTube ලින්ක් එකක් දෙන්න!");
  try {
    const res = await axios.get(`https://yt-five-tau.vercel.app/download?q=${q}&format=144`);
    if (!res.data?.result?.download) return reply("❌ Link එක හොයාගන්න බැරිවුණා!");
    await robin.sendMessage(from, {
      video: { url: res.data.result.download },
      caption: "🎥 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝙳 - 144p",
    }, { quoted: mek });
  } catch (e) {
    reply("❌ Error: " + e.message);
  }
});



  //Sadiya
cmd({
    pattern: "ytmp4-240",
    dontAddCommandList: true,
    filename: __filename
  },
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
  try {
    const ytdl = await fetchJson(`https://sadiya-tech-apis.vercel.app/download/ytdl?url=${q}&apikey=sadiya&format=240`);
    const dllink = ytdl.result.download;
    await conn.sendMessage(from, {
      video: { url: dllink },
      mimetype: "video/mp4",
      caption: sadiya_md_footer
    }, { quoted: mek });
  } catch (e) {
    console.log(e);
    reply("🚫 Error: " + e.message);
  }
});

//const { fetchJson } = require('../lib/functions');
//onst { cmd } = require('../command');
//onst yts = require("yt-search");

cmd(
  {
    pattern: "giftv",
    alias: ["ytvideo", "giftedyt"],
    react: "🎬",
    desc: "Download YouTube Video (MP4)",
    category: "download",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      q,
      reply
    }
  ) => {
    try {
      if (!q) return reply("🔎 YouTube නමක් හෝ ලින්ක් එකක් දෙන්න!");

      const search = await yts(q);
      if (!search.videos.length) return reply("❌ වීඩියෝවක් හමුනොවුණා!");

      const data = search.videos[0];
      const url = data.url;

      const api = `https://api.giftedtech.my.id/api/download/ytmp4?apikey=gifted&url=${encodeURIComponent(url)}`;
      const res = await fetchJson(api);

      if (!res || !res.data?.url) return reply("❌ බාගත කිරීම අසාර්ථකයි!");

      const caption = `🎥 *𝚈𝚃 𝚅𝙸𝙳𝙴𝙾 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳*

📌 *Title:* ${data.title}
⏱ *Duration:* ${data.timestamp}
👁 *Views:* ${data.views}
🌐 *Link:* ${data.url}

> *𝙳𝙸 𝙽 𝚄 𝚆 𝙷 - 𝙼 𝙳 || 𝑴𝑼𝑺𝑰𝑪 𝑽𝑰𝑫𝑬𝑶 𝑺𝑻𝒀𝑳𝑬 💚*
`;

      await conn.sendMessage(
        from,
        {
          image: { url: data.thumbnail },
          caption,
        },
        { quoted: mek }
      );

      await conn.sendMessage(
        from,
        {
          video: { url: res.data.url },
          mimetype: "video/mp4",
          caption: "✅ Video බාගන්න ලැබුණා!",
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply("❌ අවුලක් ආවා බං! " + e.message);
    }
  }
);
