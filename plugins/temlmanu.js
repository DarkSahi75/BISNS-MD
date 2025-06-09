const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const { cmd, commands } = require("../lib/command");
const yts = require("yt-search");
cmd(
  {
    pattern: "chnnel2",
    alias: "ytmp3",
    react: "🎵",
    desc: "Download Song",
    category: "download",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    {
      from,
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
    try {
      if (!q) return reply("නමක් හරි ලින්ක් එකක් හරි දෙන්න 🌚❤️");

      const search = await yts(q);
      if (!search.videos.length) return reply("❌ Video not found!");

      const data = search.videos[0];
      const url = data.url;

      const desc = `〲🎶𝙽𝙾𝚆 𝚄𝙿𝙻𝙾𝙰𝙳𝙸𝙽𝙶...㋞||🕊️

🖇️𝚃𝙸𝚃𝙻𝙴     : ${data.title}
✄𝚄𝚁𝙻         : ${data.url}
✨𝚃𝙸𝙼𝙴       : ${data.timestamp}      
✰𝚄𝙿𝙻𝙾𝙰𝙳  : ${data.ago}
◲𝚅𝙸𝙴𝚆𝚂◱  : ${data.views}

> #DιηᵤW 🅱🅱🅷 ɱυʂιƈ ѕтуℓє㋛☚

*||අනිවාරෙන්ම රියැක්ට් කරන්න ළමයෝ...🕊️🌼 ඔයාගෙ ආසම සින්දු අහන්න සෙට් වෙලා ඉන්න...😚💖*
> *𝙷𝙴𝙰𝙳𝙿𝙷𝙾𝙽𝙴 O𝚗 𝙵𝙴𝙴𝙻 𝚃𝙷𝙴 𝚅𝙸𝙱𝙴!*

*🖇️ALL MUSIC PLAY LIST 👇*
_https://whatsapp.com/channel/0029Vb3mqn5H5JLuJO3s3Z1J/2311_`;

      // Send thumbnail + metadata
      await robin.sendMessage(
        from,
        {
          image: { url: data.thumbnail },
          caption: desc,
        },
        { quoted: mek }
      );

      // Download song (only send as PTT)
      const quality = "64";
      const dataa = await fetchJson(`https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(data.url)}&apikey=Manul-Official`); // Make an API request to get the search results
      const dl_link = dataa.data.url;

      let durationParts = data.timestamp.split(":").map(Number);
      let totalSeconds =
        durationParts.length === 3
          ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
          : durationParts[0] * 60 + durationParts[1];

      if (totalSeconds > 1800) {
        return reply("⏱️ Audio limit is 30 minutes!");
      }

      await robin.sendMessage(
        from,
        {
          audio: { url: dl_link },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);
