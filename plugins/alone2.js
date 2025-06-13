const config = require('../settings');
const prefix = config.PREFIX;
const { cmd } = require('../lib/command');
const {
  getBuffer,
  getGroupAdmins,
  getRandom,
  h2k,
  isUrl,
  Json,
  runtime,
  sleep,
  fetchJson
} = require('../lib/functions');

const yts = require("yt-search");

cmd(
  {
    pattern: "alone",
    react: "🎵",
    desc: "Download Song and send to JID",
    category: "download",
    filename: __filename,
  },
  async (robin, mek, m, { from, q, reply }) => {
    try {
      if (!q) return reply("නමක් හරි ලින්ක් එකක් හරි දෙන්න 🌚❤️");

      const search = await yts(q);
      if (!search.videos.length) return reply("❌ Video not found!");

      const data = search.videos[0];
      const url = data.url;

      const desc = `🌀 *𝐓𝐢𝐭𝐥𝐞 : ${data.title}*

▫️📅 *𝐑𝐞𝐥𝐞𝐚𝐬 𝐃𝐚𝐭𝐞* : ${data.ago}
▫️⏱️ *𝐃𝐮𝐫𝐚𝐭𝐢𝐨𝐧* : ${data.timestamp}
▫️🎭 *𝐕𝐢𝐞𝐰𝐬* : ${data.views.toLocaleString()}

\`\`\` ᴜꜱᴇ ʜᴇᴀᴅᴘʜᴏɴᴇꜱ ꜰᴏʀ ʙᴇꜱᴛ ᴇxᴘᴇʀɪᴇɴᴄᴇ...☊\`\`\`

▫️ *සින්දුවට 𝚛𝚎𝚊𝚌𝚝 100 ක් ඕනෙ ලමායී...*
*😫💖👇🏻*

> *@Alone Music Vibes..☊ ❞*`;

      // Send song details
      await robin.sendMessage(
        config.ALONE,
        {
          image: { url: data.thumbnail },
          caption: desc,
        },
        { quoted: mek }
      );

      // Duration check (limit 30 mins)
      const durationParts = data.timestamp.split(":").map(Number);
      const totalSeconds =
        durationParts.length === 3
          ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
          : durationParts[0] * 60 + durationParts[1];

      if (totalSeconds > 1800) {
        return reply("⏱️ Audio limit is 30 minutes!");
      }

      // MP3 Download
      const dataa = await fetchJson(`https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(url)}&apikey=Manul-Official`);
      const dl_link = dataa.data.url;

      // Send mp3 audio
      await robin.sendMessage(
        config.ALONE,
        {
          audio: { url: dl_link },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      reply(`🎵 SONG AND SONG DETAIL SENT TO\n=> ${config.ALONE}`);

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);
