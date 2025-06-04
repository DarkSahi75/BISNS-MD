const axios = require("axios");
const { cmd } = require("../lib/command");
const config = require('../settings');
const prefix = config.PREFIX || ".";

cmd({
  pattern: "tiklist",
  alias: ["tlist", "ttlist"],
  react: '🎵',
  desc: "TikTok Song Downloader with List Only",
  category: "tiktok",
  use: ".tiklist <TikTok URL>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const url = args[0];
    if (!url || !url.includes("tiktok.com")) return reply("🥲 කරුණාකර වලංගු TikTok ලින්ක් එකක් දෙන්න.");

    await conn.sendMessage(from, { react: { text: "🧠", key: m.key } });

    const api = `https://api.nexoracle.com/downloader/tiktok-nowm?apikey=free_key@maher_apis&url=${encodeURIComponent(url)}`;
    const res = await axios.get(api);
    const { title, thumbnail } = res.data.result;

    const listMsg = {
      title: "╭─❖ 𝚃𝙸𝙺𝚃𝙾𝙺 𝚂𝙾𝙽𝙶 𝙵𝙾𝚁𝙼𝙰𝚃 ❖──╮",
      sections: [{
        title: "📥 Choose Your Format",
        rows: [
          {
            title: "🎧 Voice Note (ptt)",
            description: "Download as WhatsApp voice message",
            id: `${prefix}ytvoice ${url}`
          },
          {
            title: "📁 Document (Audio)",
            description: "Download as audio file (document type)",
            id: `${prefix}ytdoc ${url}`
          },
          {
            title: "🎶 Audio (Normal)",
            description: "Download as standard audio",
            id: `${prefix}ytaud ${url}`
          }
        ]
      }]
    };

    await conn.sendMessage(from, {
      image: { url: thumbnail },
      caption: `🎵 *TikTok Song Downloader*\n\n📝 *Title:* ${title}\n\n👇 පහළින් format එකක් තෝරන්න`,
      footer: "〽️ade By Dinuwh Bbh",
      buttonText: "🔘 Choose Format",
      sections: listMsg.sections,
      viewOnce: true,
    }, { quoted: mek });

  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e.message}`);
  }
});
