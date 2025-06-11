const config = require('../settings');
const prefix = config.PREFIX;
const { cmd } = require('../lib/command');
// config = require("config");
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
//const { cmd } = require("../command");
const yts = require("yt-search");
//onst config = require("../config");

cmd(
  {
    pattern: "alone",
    //alias: "ytmp3",
    react: "🎵",
    desc: "Download Song and send to JID",
    category: "download",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    {
      from,
      q,
      reply,
    }
  ) => {
    try {
      if (!q) return reply("නමක් හරි ලින්ක් එකක් හරි දෙන්න 🌚❤️");

      const search = await yts(q);
      if (!search.videos.length) return reply("❌ Video not found!");

      const data = search.videos[0];
      const url = data.url;

      // Song Description Format
      const desc = `🌀 Tɪᴛʟᴇ : ${data.title}

▫️📅 Rᴇʟᴇᴀꜱᴇ Dᴀᴛᴇ : ${data.ago}
▫️⏱️ Dᴜʀᴀᴛɪᴏɴ : ${data.timestamp}
▫️👀 Vɪᴇᴡꜱ : ${data.views.toLocaleString()}

▫️ 𝚛𝚎𝚊𝚌𝚝 කරන්න ළමයෝ...🥹💗`;
//> *මනෝපාරක් ගහන්න මෙහාටත් එන්නහ්💆‍♂️*
//> https://whatsapp.com/channel/0029Vb3mqn5H5JLuJO3s3Z1J
      // Send song detail with thumbnail to config.JID
      await robin.sendMessage(
        config.JIDPASINDU,
        {
          image: { url: data.thumbnail },
          caption: desc,
        },
        { quoted: mek }
      );

      // Duration check
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

      // Send audio to config.JID
      await robin.sendMessage(
        config.JIDPASINDU,
        {
          audio: { url: dl_link },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // Notify user
      reply(`🎵 SONG AND SONG DETAIL SENT TO\n=> ${config.JIDPASINDU}`);

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);
