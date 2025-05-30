const fetch = require("node-fetch");
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
}, async (robin, mek, m, { from, q, prefix, reply }) => {
  try {
    if (!q) return reply("නමක් හරි ලින්ක් එකක් හරි දෙන්න 🌚❤️");

    const search = await yts(q);
    if (!search.videos.length) return reply("❌ Video not found!");
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
if (config.MODE === "nonbutton") {
  const sections = [
    {
      title: "🎵 SONG TYPE SELECT",
      rows: [
        {
          title: "🎧 Audio",
          rowId: `${prefix}ytaud ${data.url}|${data.title}`,
          description: "Send as normal audio",
        },
        {
          title: "📂 Document",
          rowId: `${prefix}ytdoc ${data.url}|${data.title}`,
          description: "Send as document type",
        },
        {
          title: "🎙️ Voice Note",
          rowId: `${prefix}ytvoice ${data.url}|${data.title}`,
          description: "Send as PTT (Voice)",
        },
        {
          title: "📽️ Video",
          rowId: `${prefix}devilv ${data.url}|${data.title}`,
          description: "Send as video file",
        },
      ],
    },
  ];

  const listMessage = {
    text: "🔘 *Select the format you want to download the song in:*",
    footer: "乂 DINUWH チ DOWNLOAD\nPowered by CYBER VENOM",
    title: "Download Options 🎵",
    buttonText: "🔽 Choose Format",
    sections: sections,
  };

  await robin.sendMessage(from, listMessage, { quoted: mek });
}
    // ✳️ If button mode
    if (config.MODE === "button") {
      const listData = {
        title: "◎ Choose Format ◎",
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



//devilvideosendjs=========================-====--%=%=%--%-%-%-$-#-#-#=##=$-$-#9#9=9.0=9.0-$839#=$-$738#=738.0$-%*$8##-%748$=$-%7$8$=$-%-


cmd({
  pattern: "devilv",
  alias: ["devilvideo", "ytdlvideo"],
  react: "📽️",
  desc: "Download YouTube Video",
  category: "download",
  filename: __filename,
}, async (robin, mek, m, { from, q, prefix, reply }) => {
  try {
    if (!q) return reply("නමක් හරි ලින්ක් එකක් හරි දෙන්න 🌚❤️");

    const search = await yts(q);
    if (!search.videos.length) return reply("❌ Video not found!");
    const data = search.videos[0];

    const cap = `\`乂 Ｄ𝚒ｎｕｗｈ Чт Ｄｏｗｎ⟩⟩⟩\`
╭────────✦✧✦────────╯
* The same old details.

✗ *Choos You Want Video Type* `;

    if (config.MODE === "nonbutton") {
      const sections = [{
        title: "VIDEO TYPE",
        rows: [
          { title: "1. Normal 🎥", rowId: `${prefix}devilnewv ${data.url}`, description: "Send as Video File" },
          { title: "2. Document 📂", rowId: `${prefix}devilnewd ${data.url}`, description: "Send as Document" }
        ]
      }];
      const listMessage = {
        text: "*SELECT VIDEO TYPE*",
        footer: sadiya_md_footer,
        buttonText: "🔘 Choose Format",
        sections
      };
      return await robin.sendMessage(from, listMessage, { quoted: mek });
    }

    if (config.MODE === "button") {
      const listData = {
        title: "◎ Choose Format ◎",
        sections: [{
          title: "DINUWH MD OPTIONS",
          rows: [
            {
              title: "[Video 🎥]",
              description: "Download as normal video file",
              id: `${prefix}devilnewv ${data.url}`
            },
            {
              title: "[Document 📂]",
              description: "Download as document video file",
              id: `${prefix}devilnewd ${data.url}`
            }
          ]
        }]
      };

      return await robin.sendMessage(from, {
        image: { url: data.thumbnail },
        caption: cap,
        footer: sadiya_md_footer,
        buttons: [
          {
            buttonId: `${prefix}devilnewv ${data.url}`,
            buttonText: { displayText: "📥 Video" },
            type: 1
          },
          {
            buttonId: `${prefix}devilnewd ${data.url}`,
            buttonText: { displayText: "📁 Document" },
            type: 1
          },
          {
            buttonId: "action",
            buttonText: { displayText: "🔘 Choose Format" },
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
    reply("❌ Error while processing the video. Try again later.");
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
  //alias: ["yt144"],
  react: "📹",
  desc: "Download YouTube 144p video",
  category: "download",
  filename: __filename,
},
async (
  conn,
  mek,
  m,
  { from, q, reply }
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
> *𝙳𝙸 𝙽 𝚄 𝚆 𝙷 - 𝙼 𝙳 || 𝑴𝑼𝑺𝑰𝑪 𝑽𝑰𝑫𝑬𝑶 𝑺𝑻𝒀𝑳𝑬 💚*`;

    await conn.sendMessage(
      from,
      { image: { url: data.thumbnail }, caption },
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
});
