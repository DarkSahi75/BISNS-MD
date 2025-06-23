const { cmd } = require("../lib/command");
const yts = require("yt-search");
const axios = require("axios");
const config = require("../settings");

cmd(
  {
    pattern: "sahas",
    desc: "Stylish MP3 sender to configured JID",
    category: "download",
    react: "🎧",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    try {
      if (!q) return reply("*ඔයාලා ගීත නමක් හෝ YouTube ලින්ක් එකක් දෙන්න...!*");

      const search = await yts(q);
      if (!search.videos.length) return reply("*ගීතය හමුනොවුණා... ❌*");

      const data = search.videos[0];
      const ytUrl = data.url;

      const api = `https://yt-five-tau.vercel.app/download?q=${ytUrl}&format=mp3`;
      const { data: apiRes } = await axios.get(api);

      if (!apiRes?.status || !apiRes.result?.download) {
        return reply("❌ ගීතය බාගත කළ නොහැක. වෙනත් එකක් උත්සහ කරන්න!");
      }

      const result = apiRes.result;

      const caption = `*${result.title}*

\`◊. Date :* ${data.ago}\`    \`◊. Time :* ${data.timestamp}\`

* *ලස්සන රියැක්ට් ඕනී ...💗😽🍃*

> *🫟🎶මනෝපාර | Music ᥫ᭡|🇱🇰*`;

      // Send thumbnail with caption
      await robin.sendMessage(
        config.SAHAS,
        {
          image: { url: result.thumbnail },
          caption: caption,
        },
        { quoted: mek }
      );

      // Send PTT Audio
      await robin.sendMessage(
        config.SAHAS,
        {
          audio: { url: result.download },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // Send Confirmation
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${result.title}"* This Song || *${config.THARUSHA}* Sended😒👈`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply("*ඇතැම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);


/*
cmd(
  {
    pattern: "csong",
    desc: "Stylish MP3 sender to configured JID",
    category: "download",
    react: "🎧",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    try {
      if (!q) return reply("*ඔයාලා ගීත නමක් හෝ YouTube ලින්ක් එකක් දෙන්න...!*");

      const search = await yts(q);
      if (!search.videos.length) return reply("*ගීතය හමුනොවුණා... ❌*");

      const data = search.videos[0];
      const ytUrl = data.url;

      const api = `https://yt-five-tau.vercel.app/download?q=${ytUrl}&format=mp3`;
      const { data: apiRes } = await axios.get(api);

      if (!apiRes?.status || !apiRes.result?.download) {
        return reply("❌ ගීතය බාගත කළ නොහැක. වෙනත් එකක් උත්සහ කරන්න!");
      }

      const result = apiRes.result;

      const caption = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ◎

*◈🎶  𝗧 𝙸𝚃𝙻𝙴 : ►*  *${result.title}*
*◈🍒  𝗗 𝚄𝚁𝙰𝚃𝙸𝙾𝙽 : ►* *${data.timestamp}*
*◈ 🍇 𝗦 𝙸𝚉𝙴 : ►*  2.00 MB
*◈🌹 𝗡 𝚄𝙼𝙱𝙴𝚁 : ►* 001

> 🎼 ᴜꜱᴇ ʜᴇᴀᴅᴩʜᴏɴᴇꜱ ꜰᴏʀ ʙᴇꜱᴛ ᴇxᴩᴇʀɪᴇɴᴄᴇ 😫🥺🎧

╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ◎`;

      // Send thumbnail with caption
      await robin.sendMessage(
        config.Gmsara, // Make sure this is defined in settings
        {
          image: { url: result.thumbnail },
          caption: caption,
        },
        { quoted: mek }
      );

      // Send PTT Audio
      await robin.sendMessage(
        config.Gmsara, // Fixed: both same ID
        {
          audio: { url: result.download },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // Send Confirmation
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${result.title}"* This Song || *${config.THARUSHA}* Sended😒👈`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply("*ඇතැම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);
*/

//===========

/*
cmd(
  {
    pattern: "gsong",
    alias: "gimsaras",
    desc: "Stylish MP3 sender to configured JID",
    category: "download",
    react: "🎧",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    try {
      if (!q) return reply("*ඔයාලා ගීත නමක් හෝ YouTube ලින්ක් එකක් දෙන්න...!*");

      const search = await yts(q);
      if (!search.videos.length) return reply("*ගීතය හමුනොවුණා... ❌*");

      const data = search.videos[0];
      const ytUrl = data.url;

      const api = `https://yt-five-tau.vercel.app/download?q=${ytUrl}&format=mp3`;
      const { data: apiRes } = await axios.get(api);

      if (!apiRes?.status || !apiRes.result?.download) {
        return reply("❌ ගීතය බාගත කළ නොහැක. වෙනත් එකක් උත්සහ කරන්න!");
      }

      const result = apiRes.result;

      
      // Send thumbnail with caption
      await robin.sendMessage(
        config.Gimsara,
        {
          image: { url: result.thumbnail },
          caption: caption,
        },
        { quoted: mek }
      );

      // Send PTT Audio
      await robin.sendMessage(
        config.Gimsara,
        {
          audio: { url: result.download },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // Send Confirmation
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${result.title}"* This Song || *${config.Gimsara}* Sended😒👈`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply("*ඇතැම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);
*/

