const { getBuffer, getGroupAdmins, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const { cmd, commands } = require("../lib/command");
//const { cmd } = require("../lib/command");
const yts = require("yt-search");
const axios = require("axios");
const config = require("../settings");
const { ytmp3 } = require("@vreden/youtube_scraper");


cmd(
  {
    pattern: "nada",
    desc: "Send song as PTT with styled details and thumbnail",
    category: "download",
    react: "🎧",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    try {
      if (!q) return reply("*🎧 Please provide a song name or YouTube link...*");

      const search = await yts(q);
      if (!search.videos.length) return reply("*❌ Song not found... Try another one.*");

      const data = search.videos[0];
      const title = data.title;
      const timestamp = data.timestamp;
      const ago = data.ago;
      const ytUrl = data.url;
      const thumbnail = data.thumbnail;

      const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(ytUrl)}&apikey=Manul-Official`;
      const res = await fetchJson(api);

      if (!res?.status || !res?.data?.url) {
        return reply("❌ Unable to download this song. Please try another one!");
      }

      const audioUrl = res.data.url;

      const styledCaption = `\`☘️ ᴛɪᴛʟᴇ\` :${title}


\`00:00\` ━━━━▶──────── \`${timestamp}\`
🎧 Use headphones for best experience

 \`පාට පාටීන් ලස්සනට REACT කරන්න ලමයෝ.🥺😙💕\`

> 🫟🎶 නාද | Music Vibe ᥫ᭡|🇱🇰`;

      // Send image + styled caption
      await robin.sendMessage(
        config.ADHI_NADA,
        {
          image: { url: thumbnail },
          caption: styledCaption,
        },
        { quoted: mek }
      );

      // Send audio as PTT (voice note)
      await robin.sendMessage(
        config.ADHI_NADA,
        {
          audio: { url: audioUrl },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // Confirmation to sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${title}"* has been successfully sent to *${config.ADHI_RAP || "REMIX HUB"}* 🎧`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply("*😓 An unexpected error occurred! Please try again later.*");
    }
  }
);


cmd(
  {
    pattern: "rap",
    desc: "Send song as PTT with styled details and thumbnail",
    category: "download",
    react: "🎧",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    try {
      if (!q) return reply("*🎧 Please provide a song name or YouTube link...*");

      const search = await yts(q);
      if (!search.videos.length) return reply("*❌ Song not found... Try another one.*");

      const data = search.videos[0];
      const title = data.title;
      const timestamp = data.timestamp;
      const ago = data.ago;
      const ytUrl = data.url;
      const thumbnail = data.thumbnail;

      const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(ytUrl)}&apikey=Manul-Official`;
      const res = await fetchJson(api);

      if (!res?.status || !res?.data?.url) {
        return reply("❌ Unable to download this song. Please try another one!");
      }

      const audioUrl = res.data.url;

      const styledCaption = `\`☘️ ᴛɪᴛʟᴇ\` :${title}

\`00:00\` ━━━━▶──────── \`${timestamp}\`
_🎧 Use headphones for best experience 🎸🩵_

\`මේ වගේ සුපිරි රැප් හැමදාම අහන්න මෙන්න මෙහෙට වරෙන් 😈🔮..\`

> 🎸🔮 රැප් | පිස්සෝ |ᥫ᭡ 🇱🇰
`;

      // Send image + styled caption
      await robin.sendMessage(
        config.ADHI_RAP,
        {
          image: { url: thumbnail },
          caption: styledCaption,
        },
        { quoted: mek }
      );

      // Send audio as PTT (voice note)
      await robin.sendMessage(
        config.ADHI_RAP,
        {
          audio: { url: audioUrl },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // Confirmation to sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${title}"* has been successfully sent to *${config.ADHI_RAP || "REMIX HUB"}* 🎧`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply("*😓 An unexpected error occurred! Please try again later.*");
    }
  }
);

//gimsarayata thava ekak😒

cmd(
  {
    pattern: config.Gimsaracommand,
    desc: "Send song as PTT with styled details and thumbnail",
    category: "download",
    react: "🎧",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    try {
      if (!q) return reply("*🎧 කරුණාකර ගීත නමක් හෝ YouTube ලින්ක් එකක් ලබාදෙන්න...*");

      const search = await yts(q);
      if (!search.videos.length) return reply("*❌ ගීතය හමුනොවුණා... වෙනත් එකක් උත්සහ කරන්න.*");

      const data = search.videos[0];
      const title = data.title;
      const timestamp = data.timestamp;
      const ago = data.ago;
      const ytUrl = data.url;
      const thumbnail = data.thumbnail;

      const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(ytUrl)}&apikey=Manul-Official`;
      const res = await fetchJson(api);

      if (!res?.status || !res?.data?.url) {
        return reply("❌ ගීතය බාගත කළ නොහැක. වෙනත් එකක් උත්සහ කරන්න!");
      }

      const audioUrl = res.data.url;

      const styledCaption = `❝ *\`🥺❤️‍🩹${title}\`*🙇‍♂️🎧🕊️"

~*ꜱʟᴏᴠᴇᴅ + ʀᴇᴠᴇʀʙᴇᴅ ꜱᴏɴɢ'ꜱ…🚶🥀*~

~\`ᴜꜱᴇ ᴛʜᴇ ʜᴇᴀᴅᴘʜᴏɴᴇ ꜰᴏʀ ʙᴇᴛᴛᴇʀ ᴇxᴘᴇʀɪᴇɴᴄᴇ 🎧💗\`~

> https://whatsapp.com/channel/0029VbBH0oEKAwEq3o12ym1F

*🍄🍃මනෝපාරකට සෙට්වෙන්න Sloved Boot සිංදු අහන්න එකතුවෙලා ඉන්න🥹💗🎧*
`;

      // Send image + styled caption
      await robin.sendMessage(
        config.NIMANTHA,
        {
          image: { url: thumbnail },
          caption: styledCaption,
        },
        { quoted: mek }
      );

      // Send audio as PTT (voice note)
      await robin.sendMessage(
        config.NIMANTHA,
        {
          audio: { url: audioUrl },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // Confirmation to sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${title}"* නම් ගීතය සාර්ථකව *${config.NIMANTHA || "REMIX HUB"}* වෙත යවන්න ලදි 🎧`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply("*😓 උණුසුම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);

cmd(
  {
    pattern: "tsong",
    desc: "Send song as PTT with styled details and thumbnail",
    category: "download",
    react: "🎧",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    try {
      if (!q) return reply("*🎧 කරුණාකර ගීත නමක් හෝ YouTube ලින්ක් එකක් ලබාදෙන්න...*");

      const search = await yts(q);
      if (!search.videos.length) return reply("*❌ ගීතය හමුනොවුණා... වෙනත් එකක් උත්සහ කරන්න.*");

      const data = search.videos[0];
      const title = data.title;
      const timestamp = data.timestamp;
      const ago = data.ago;
      const ytUrl = data.url;
      const thumbnail = data.thumbnail;

      const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(ytUrl)}&apikey=Manul-Official`;
      const res = await fetchJson(api);

      if (!res?.status || !res?.data?.url) {
        return reply("❌ ගීතය බාගත කළ නොහැක. වෙනත් එකක් උත්සහ කරන්න!");
      }

      const audioUrl = res.data.url;

      const styledCaption = `☘️ *Tɪᴛʟᴇ :* ${title}

▫️📅 *Rᴇʟᴇᴀꜱᴇ Dᴀᴛᴇ :* ${ago}
▫️⏱️ *Dᴜʀᴀᴛɪᴏɴ :* ${timestamp}

> 🫟🎶තාල | Music officialᥫ᭡|🇱🇰

> 🔹.◦◦◦ \`[💜||💛||🩷||🤍||💚]\`
_*රියැට් කරන්න ළමයෝ 🥹❣️◦◦◦*_
`;

      // Send image + styled caption
      await robin.sendMessage(
        config.DE_THA,
        {
          image: { url: thumbnail },
          caption: styledCaption,
        },
        { quoted: mek }
      );

      // Send audio as PTT (voice note)
      await robin.sendMessage(
        config.DE_THA,
        {
          audio: { url: audioUrl },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // Confirmation to sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${title}"* නම් ගීතය සාර්ථකව *${config.NIMANTHA || "REMIX HUB"}* වෙත යවන්න ලදි 🎧`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply("*😓 උණුසුම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);

cmd(
  {
    pattern: "panda",
    desc: "Send song as PTT with styled details and thumbnail",
    category: "download",
    react: "🎧",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    try {
      if (!q) return reply("*🎧 කරුණාකර ගීත නමක් හෝ YouTube ලින්ක් එකක් ලබාදෙන්න...*");

      const search = await yts(q);
      if (!search.videos.length) return reply("*❌ ගීතය හමුනොවුණා... වෙනත් එකක් උත්සහ කරන්න.*");

      const data = search.videos[0];
      const title = data.title;
      const timestamp = data.timestamp;
      const ago = data.ago;
      const ytUrl = data.url;
      const thumbnail = data.thumbnail;

      const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(ytUrl)}&apikey=Manul-Official`;
      const res = await fetchJson(api);

      if (!res?.status || !res?.data?.url) {
        return reply("❌ ගීතය බාගත කළ නොහැක. වෙනත් එකක් උත්සහ කරන්න!");
      }

      const audioUrl = res.data.url;

      const styledCaption = `
┏━━━━━━━━━━━━━━━━━━┓
┃ ☘️ \`𝚃𝙸𝚃𝙻𝙴\` : *${title}*
┃ 📆 \`𝚄𝙿𝙻𝙾𝙰𝙳\` : *${ago}*
┗━━━━━━━━━━━━━━━━━━┛
\`00:00\` *─────●──────────* \`${timestamp}\`

*|| HeadPhones For Best Experience 🎧🙇‍♂️*

> *🫟🎶 හිත නිවන || M U S I C 🙇‍♂️🇱🇰*

\`🔮🪄 ආසම පාටින් රියැක්ට් එකක් දාගෙන යමුහ් 😩💗\`
`;

      // Send image + styled caption
      await robin.sendMessage(
        config.PANDATM,
        {
          image: { url: thumbnail },
          caption: styledCaption,
        },
        { quoted: mek }
      );

      // Send audio as PTT (voice note)
      await robin.sendMessage(
        config.PANDATM,
        {
          audio: { url: audioUrl },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // Confirmation to sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${title}"* නම් ගීතය සාර්ථකව *${config.BOOT || "REMIX HUB"}* වෙත යවන්න ලදි 🎧`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply("*😓 උණුසුම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);

cmd(
  {
    pattern: "vibes",
    alias: "vibe",
    desc: "Send caption, thumbnail and song to JID",
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
      const title = data.title;
      const timestamp = data.timestamp;
      const ago = data.ago;
      const ytUrl = data.url;
      const thumbnail = data.thumbnail;

      const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(ytUrl)}&apikey=Manul-Official`;
      const res = await fetchJson(api);

      if (!res?.status || !res?.data?.url) {
        return reply("❌ ගීතය බාගත කළ නොහැක. වෙනත් එකක් උත්සහ කරන්න!");
      }

      const audioUrl = res.data.url;

      const styledCaption = `
*\`🥺🫀"${title}🚶‍♂️🌊"]\`*

*ᴜꜱᴇ ᴛʜᴇ ʜᴇᴀᴅᴘʜᴏɴᴇ ꜰᴏʀ ʙᴇᴛᴛᴇʀ ᴇxᴘᴇʀɪᴇɴᴄᴇ 🎧💗*

> 🙇‍♂️♥️✨මතක අලුත් කරන Centigradz Sloved + Reverbed සිංදු දෙන එකම චැනල් එකට එකතුවෙලා ඉන්න🙇‍♂️🔥👇

*https://whatsapp.com/channel/0029VaweEBX7z4kXPkq54Y2p* 

🫟Ｍ𝚄𝚂𝙸𝙲 Ｖ𝙸𝙱𝙴𝚂 | 🎧`;

      // Send thumbnail + caption to target JID
      await robin.sendMessage(
        config.GIMSARA,
        {
          image: { url: thumbnail },
          caption: styledCaption,
        },
        { quoted: mek }
      );

      // Send audio as PTT
      await robin.sendMessage(
        config.GIMSARA,
        {
          audio: { url: audioUrl },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // Confirmation message to original sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${title}"* නම් ගීතය සාර්ථකව *${config.BOOT || "channel එකට"}* යවලා තියෙන්නෙ.`,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error(e);
      reply("*😓 උණුසුම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);


cmd(
  {
    pattern: "remix",
    desc: "Send song as PTT with styled details and thumbnail",
    category: "download",
    react: "🎧",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    try {
      if (!q) return reply("*🎧 කරුණාකර ගීත නමක් හෝ YouTube ලින්ක් එකක් ලබාදෙන්න...*");

      const search = await yts(q);
      if (!search.videos.length) return reply("*❌ ගීතය හමුනොවුණා... වෙනත් එකක් උත්සහ කරන්න.*");

      const data = search.videos[0];
      const { title, timestamp, ago, url: ytUrl, thumbnail, views } = data;

      const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(ytUrl)}&apikey=Manul-Official`;
      const res = await fetchJson(api);

      if (!res?.status || !res?.data?.url) {
        return reply("❌ ගීතය බාගත කළ නොහැක. වෙනත් එකක් උත්සහ කරන්න!");
      }

      const audioUrl = res.data.url;

      const styledCaption = `
*🍀 \`Tɪᴛʟᴇ :\` ${title}*

▫️ 📆 *Rᴇʟᴇᴀsᴇᴅ :* ${ago}
▫️ *👀 Vɪᴇᴡꜱ :* ${views}
▫️ *⏰ Dᴜʀᴀᴛɪᴏɴ :* ${timestamp}

🎧🎶 *Use headphones for best experience....*

▫️ *සින්දු වලට රිඇක්ට් කරන්න ළමයෝ 🙂‍↔👇🏻*

> *🫟 Beat Music 🎧 | 🇱🇰*
`;

      // Send thumbnail and details
      await robin.sendMessage(
        config.Team_REMIX,
        {
          image: { url: thumbnail },
          caption: styledCaption,
        },
        { quoted: mek }
      );

      // Send song as PTT (voice note)
      await robin.sendMessage(
        config.Team_REMIX,
        {
          audio: { url: audioUrl },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // Notify user
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${title}"* 🎵 නම් ගීතය සාර්ථකව *${config.BOOT || "REMIX HUB"}* වෙත යවා ඇත!`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply("*😓 උණුසුම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);



cmd(
  {
    pattern: "slowed",
    alias: "slowerb",
    desc: "Send song as PTT with styled details and thumbnail",
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
      const title = data.title;
      const timestamp = data.timestamp;
      const ago = data.ago;
      const ytUrl = data.url;
      const thumbnail = data.thumbnail;

      const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(ytUrl)}&apikey=Manul-Official`;
      const res = await fetchJson(api);

      if (!res?.status || !res?.data?.url) {
        return reply("❌ ගීතය බාගත කළ නොහැක. වෙනත් එකක් උත්සහ කරන්න!");
      }

      const audioUrl = res.data.url;
const styledCaption = `
\`🫐 ᴛɪᴛʟᴇ :\` *${title}*

\`🪲 ᴠɪᴇᴡꜱ :\` *${data.views}*          \`🔖ᴜᴘʟᴏᴀᴅᴇᴅ :\` *${ago}*

\`00:00 ────○─────── ${timestamp}\`


> 🫟 *Slowerb සිංදු 🍃😽💗"*
`;

      // Send image + styled caption
      await robin.sendMessage(
        config.SLOWED,
        {
          image: { url: thumbnail },
          caption: styledCaption,
        },
        { quoted: mek }
      );

      // Send audio as PTT
      await robin.sendMessage(
        config.SLOWED,
        {
          audio: { url: audioUrl },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // Confirmation to sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${title}"* නම් ගීතය සාර්ථකව *${config.SLOWED || "channel එකට"}* යවලා තියෙන්නෙ.`,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error(e);
      reply("*😓 උණුසුම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);

cmd(
  {
    pattern: "thala",
    alias: "තාල",
    desc: "Send song as PTT with styled details and thumbnail",
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
      const title = data.title;
      const timestamp = data.timestamp;
      const ago = data.ago;
      const ytUrl = data.url;
      const thumbnail = data.thumbnail;

      const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(ytUrl)}&apikey=Manul-Official`;
      const res = await fetchJson(api);

      if (!res?.status || !res?.data?.url) {
        return reply("❌ ගීතය බාගත කළ නොහැක. වෙනත් එකක් උත්සහ කරන්න!");
      }

      const audioUrl = res.data.url;
const styledCaption = `
\`🫐 ᴛɪᴛʟᴇ :\` *${title}*

\`🪲 ᴠɪᴇᴡꜱ :\` *${data.views}*          \`🔖ᴜᴘʟᴏᴀᴅᴇᴅ :\` *${ago}*

\`00:00 ────○─────── ${timestamp}\`


> 🫟 *බෙහෙත |Music 🍃😽💗"*
`;

      // Send image + styled caption
      await robin.sendMessage(
        config.තාල,
        {
          image: { url: thumbnail },
          caption: styledCaption,
        },
        { quoted: mek }
      );

      // Send audio as PTT
      await robin.sendMessage(
        config.තාල,
        {
          audio: { url: audioUrl },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // Confirmation to sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${title}"* නම් ගීතය සාර්ථකව *${config.BOOT || "channel එකට"}* යවලා තියෙන්නෙ.`,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error(e);
      reply("*😓 උණුසුම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);

cmd(
  {
    pattern: "kavi2",
    desc: "Send caption, thumbnail and song to JID",
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
      const title = data.title;
      const timestamp = data.timestamp;
      const ago = data.ago;
      const ytUrl = data.url;
      const thumbnail = data.thumbnail;

      const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(ytUrl)}&apikey=Manul-Official`;
      const res = await fetchJson(api);

      if (!res?.status || !res?.data?.url) {
        return reply("❌ ගීතය බාගත කළ නොහැක. වෙනත් එකක් උත්සහ කරන්න!");
      }

      const audioUrl = res.data.url;

      const styledCaption = `
☘️ *Tɪᴛʟᴇ :* ${title}

▫️📅 *Rᴇʟᴇᴀꜱᴇ Dᴀᴛᴇ :* ${ago}
▫️⏱️ *Dᴜʀᴀᴛɪᴏɴ :* ${timestamp}
▫️🎭 *Wɪᴇᴡꜱ :* ${data.views || "N/A"}
▫️🔗 *Lɪɴᴋ :* \`${ytUrl}\`

*𝐌𝐈𝐍𝐃 𝐒𝐎𝐍𝐆𝐒…||😫💗*
\`Use headphones for best experience.🙇‍♂️🎧"🫀\`

  ♡          ⎙          ➦ 
ʳᵉᵃᶜᵗ      ˢᵃᵛᵉ       ˢʰᵃʳᵉ`;

      // Send thumbnail + caption to target JID
      await robin.sendMessage(
        config.KAVI_SONG2,
        {
          image: { url: thumbnail },
          caption: styledCaption,
        },
        { quoted: mek }
      );

      // Send audio as PTT
      await robin.sendMessage(
        config.KAVI_SONG2,
        {
          audio: { url: audioUrl },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // Confirmation message to original sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${title}"* නම් ගීතය සාර්ථකව *${config.BOOT || "channel එකට"}* යවලා තියෙන්නෙ.`,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error(e);
      reply("*😓 උණුසුම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);
cmd(
  {
    pattern: "kavi1",
    desc: "Send caption, thumbnail and song to JID",
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
      const title = data.title;
      const timestamp = data.timestamp;
      const ago = data.ago;
      const ytUrl = data.url;
      const thumbnail = data.thumbnail;

      const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(ytUrl)}&apikey=Manul-Official`;
      const res = await fetchJson(api);

      if (!res?.status || !res?.data?.url) {
        return reply("❌ ගීතය බාගත කළ නොහැක. වෙනත් එකක් උත්සහ කරන්න!");
      }

      const audioUrl = res.data.url;

      const styledCaption = `
☘️ *Tɪᴛʟᴇ :* ${title}

▫️📅 *Rᴇʟᴇᴀꜱᴇ Dᴀᴛᴇ :* ${ago}
▫️⏱️ *Dᴜʀᴀᴛɪᴏɴ :* ${timestamp}
▫️🎭 *Wɪᴇᴡꜱ :* ${data.views || "N/A"}
▫️🔗 *Lɪɴᴋ :* \`${ytUrl}\`

*𝐌𝐈𝐍𝐃 𝐒𝐎𝐍𝐆𝐒…||😫💗*
\`Use headphones for best experience.🙇‍♂️🎧"🫀\`

  ♡          ⎙          ➦ 
ʳᵉᵃᶜᵗ      ˢᵃᵛᵉ       ˢʰᵃʳᵉ`;

      // Send thumbnail + caption to target JID
      await robin.sendMessage(
        config.KAVI_SONG1,
        {
          image: { url: thumbnail },
          caption: styledCaption,
        },
        { quoted: mek }
      );

      // Send audio as PTT
      await robin.sendMessage(
        config.KAVI_SONG1,
        {
          audio: { url: audioUrl },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // Confirmation message to original sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${title}"* නම් ගීතය සාර්ථකව *${config.BOOT || "channel එකට"}* යවලා තියෙන්නෙ.`,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error(e);
      reply("*😓 උණුසුම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);

cmd(
  {
    pattern: "songx",
    desc: "Send song with styled caption to DEWC JID",
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
      const title = data.title;
      const timestamp = data.timestamp;
      const ago = data.ago;
      const ytUrl = data.url;
      const thumbnail = data.thumbnail;
      const views = data.views?.toLocaleString() || "N/A";

      const durationParts = timestamp.split(":").map(Number);
      const totalSeconds =
        durationParts.length === 3
          ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
          : durationParts[0] * 60 + durationParts[1];

      if (totalSeconds > 1800) {
        return reply("⏱️ Audio limit is 30 minutes!");
      }

      const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(
        ytUrl
      )}&apikey=Manul-Official`;
      const res = await fetchJson(api);

      if (!res?.status || !res?.data?.url) {
        return reply("❌ ගීතය බාගත කළ නොහැක. වෙනත් එකක් උත්සහ කරන්න!");
      }

      const audioUrl = res.data.url;

      // 🆕 Sinhala style caption design
      const caption = `☘️ *Tɪᴛʟᴇ :* *${title}* 🙇‍♂️💗

▫️⏱️ *Dᴜʀᴀᴛɪᴏɴ :* ${timestamp}

▫️ *React කරන්න ලමයෝ* 🇱🇰💗`;

      // Send image with caption to DEWC JID
      await robin.sendMessage(
        config.VISHVA,
        {
          image: { url: thumbnail },
          caption: caption,
        },
        { quoted: mek }
      );

      // Send audio (voice)
      await robin.sendMessage(
        config.VISHVA,
        {
          audio: { url: audioUrl },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // Confirmation to sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${title}"* නම් ගීතය සාර්ථකව යවා ඇත.`,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error(e);
      reply("*😓 උණුසුම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);

cmd(
  {
    pattern: "songs",
    desc: "Send song with styled caption to DEWC JID",
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
      const title = data.title;
      const timestamp = data.timestamp;
      const ago = data.ago;
      const ytUrl = data.url;
      const thumbnail = data.thumbnail;
      const views = data.views?.toLocaleString() || "N/A";

      //⏱️ Audio duration check (max 30 mins)
      const durationParts = timestamp.split(":").map(Number);
      const totalSeconds =
        durationParts.length === 3
          ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
          : durationParts[0] * 60 + durationParts[1];

      if (totalSeconds > 1800) {
        return reply("⏱️ Audio limit is 30 minutes!");
      }

      //🎧 Get MP3 URL
      const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(
        ytUrl
      )}&apikey=Manul-Official`;
      const res = await fetchJson(api);

      if (!res?.status || !res?.data?.url) {
        return reply("❌ ගීතය බාගත කළ නොහැක. වෙනත් එකක් උත්සහ කරන්න!");
      }

      const audioUrl = res.data.url;

      //🖼️ Modified stylish caption with Sinhala design
      const caption = `🍀 *Tɪᴛʟᴇ :* ${title}
▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬

▫️📆 *Rᴇʟᴇᴀsᴇᴅ :* ${ago}
▫️👀 *Vɪᴇᴡꜱ :* ${views}
▫️⏰ *Dᴜʀᴀᴛɪᴏɴ :* ${timestamp}

▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬

🔗 *Follow the සිංහල සින්දු 🎧🩶🎶🇱🇰 channel on WhatsApp:*
https://whatsapp.com/channel/0029VbBKxWaEwEjzzcqhRA2Q`;

      //📤 Send to JID "DEWC"
      await robin.sendMessage(
        config.SI_SONG,
        {
          image: { url: thumbnail },
          caption: caption,
        },
        { quoted: mek }
      );

      await robin.sendMessage(
        config.SI_SONG,
        {
          audio: { url: audioUrl },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      //✅ Confirmation to sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${title}"* නම් ගීතය සාර්ථකව යවා ඇත.`,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error(e);
      reply("*😓 උණුසුම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);

cmd(
  {
    pattern: "alone",
    desc: "Send song with styled caption to DEWC JID",
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
      const title = data.title;
      const timestamp = data.timestamp;
      const ago = data.ago;
      const ytUrl = data.url;
      const thumbnail = data.thumbnail;
      const views = data.views?.toLocaleString() || "N/A";

      //⏱️ Audio duration check (max 30 mins)
      const durationParts = timestamp.split(":").map(Number);
      const totalSeconds =
        durationParts.length === 3
          ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
          : durationParts[0] * 60 + durationParts[1];

      if (totalSeconds > 1800) {
        return reply("⏱️ Audio limit is 30 minutes!");
      }

      //🎧 Get MP3 URL
      const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(ytUrl)}&apikey=Manul-Official`;
      const res = await fetchJson(api);

      if (!res?.status || !res?.data?.url) {
        return reply("❌ ගීතය බාගත කළ නොහැක. වෙනත් එකක් උත්සහ කරන්න!");
      }

      const audioUrl = res.data.url;

      //🖼️ Modified stylish caption
      const caption = `🌀 *𝐓𝐢𝐭𝐥𝐞 :* ${title}

▫️📅 *𝐑𝐞𝐥𝐞𝐚𝐬 𝐃𝐚𝐭𝐞* : ${ago}
▫️⏱️ *𝐃𝐮𝐫𝐚𝐭𝐢𝐨𝐧* : ${timestamp}
▫️🎭 *𝐕𝐢𝐞𝐰𝐬* : ${views}

\`\`\` ᴜꜱᴇ ʜᴇᴀᴅᴘʜᴏɴᴇꜱ ꜰᴏʀ ʙᴇꜱᴛ ᴇxᴘᴇʀɪᴇɴᴄᴇ...☊\`\`\`

▫️ *සින්දුවට 𝚛𝚎𝚊𝚌𝚝 100 ක් ඕනෙ ලමායී...*
*😫💖👇🏻*

> *@Alone Music Vibes..☊ ❞`;

      //📤 Send to JID "DEWC"
      await robin.sendMessage(
        config.ALONE1,
        {
          image: { url: thumbnail },
          caption: caption,
        },
        { quoted: mek }
      );

      await robin.sendMessage(
        config.ALONE1,
        {
          audio: { url: audioUrl },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      //✅ Confirmation to sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${title}"* නම් ගීතය සාර්ථකව යවා ඇත.`,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error(e);
      reply("*😓 උණුසුම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);

cmd(
  {
    pattern: "dew2",
    desc: "Send song with styled caption to DEWC JID",
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
      const title = data.title;
      const timestamp = data.timestamp;
      const ago = data.ago;
      const ytUrl = data.url;
      const thumbnail = data.thumbnail;
      const views = data.views?.toLocaleString() || "N/A";

      //⏱️ Audio duration check (max 30 mins)
      const durationParts = timestamp.split(":").map(Number);
      const totalSeconds =
        durationParts.length === 3
          ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
          : durationParts[0] * 60 + durationParts[1];

      if (totalSeconds > 1800) {
        return reply("⏱️ Audio limit is 30 minutes!");
      }

      //🎧 Get MP3 URL
      const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(ytUrl)}&apikey=Manul-Official`;
      const res = await fetchJson(api);

      if (!res?.status || !res?.data?.url) {
        return reply("❌ ගීතය බාගත කළ නොහැක. වෙනත් එකක් උත්සහ කරන්න!");
      }

      const audioUrl = res.data.url;

      //🖼️ Stylish caption
      const caption = `☘️ *Tɪᴛʟᴇ :* ${title}

▫️⏱️ *Dᴜʀᴀᴛɪᴏɴ :* ${timestamp}

▫️ *𝚛𝚎𝚊𝚌𝚝 ඕන ළමයි 🤍🎧*`;

      //📤 Send to JID "DEWC"
      await robin.sendMessage(
        config.DEWC,
        {
          image: { url: thumbnail },
          caption: caption,
        },
        { quoted: mek }
      );

      await robin.sendMessage(
        config.DEWC,
        {
          audio: { url: audioUrl },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      //✅ Confirmation to sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${title}"* නම් ගීතය සාර්ථකව *DEWC* group එකට යවා ඇත.`,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error(e);
      reply("*😓 උණුසුම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);

cmd(
  {
    pattern: "shan",
    desc: "Send caption, thumbnail and song to JID",
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
      const title = data.title;
      const timestamp = data.timestamp;
      const ago = data.ago;
      const ytUrl = data.url;
      const thumbnail = data.thumbnail;
      const views = data.views?.toLocaleString() || "N/A";

      // Duration Check
      const durationParts = timestamp.split(":").map(Number);
      const totalSeconds =
        durationParts.length === 3
          ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
          : durationParts[0] * 60 + durationParts[1];

      if (totalSeconds > 1800) {
        return reply("⏱️ Audio limit is 30 minutes!");
      }

      // Download API
      const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(ytUrl)}&apikey=Manul-Official`;
      const res = await fetchJson(api);

      if (!res?.status || !res?.data?.url) {
        return reply("❌ *😓 PAID එකක් දාල ඕනි මටහ්😪 😌✌️.hadaa🥲?*");
      }

      const audioUrl = res.data.url;

      // 📥 Caption Format
      const caption = `☘️ *Tɪᴛʟᴇ :* ${title}

▫️📅 *Rᴇʟᴇᴀꜱᴇ Dᴀᴛᴇ :* ${ago}
▫️⏱️ *Dᴜʀᴀᴛɪᴏɴ :* ${timestamp}
▫️🎭 *Vɪᴇᴡꜱ :* ${views}
▫️🔗 *Lɪɴᴋ :* \`\`\`https://whatsapp.com/channel/0029Vb3mqn5H5JLuJO3s3Z1J\`\`\`

\`Use headphones for best experience.🙇‍♂️🎧\`

  ♡          ⎙          ➦ 
ʳᵉᵃᶜᵗ       ˢᵃᵛᵉ       ˢʰᵃʳᵉ`;

      // 🖼️ Send Thumbnail + Caption to MENTAL Channel
      await robin.sendMessage(
        config.MUSIC_WORLD,
        {
          image: { url: thumbnail },
          caption: caption,
        },
        { quoted: mek }
      );

      // 🎧 Send Audio as PTT (voice message)
      await robin.sendMessage(
        config.MUSIC_WORLD,
        {
          audio: { url: audioUrl },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // ✅ Notify sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `*😓 PAID එකක් දාල ඕනි මටහ්😪 😌✌️.hadaa🥲?*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error(e);
      reply("*😓 PAID එකක් දාල ඕනි මටහ්😪 😌✌️.hadaa🥲?.*");
    }
  }
);
cmd(
  {
    pattern: "mental",
    desc: "Send caption, thumbnail and song to JID",
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
      const title = data.title;
      const timestamp = data.timestamp;
      const ago = data.ago;
      const ytUrl = data.url;
      const thumbnail = data.thumbnail;

      const durationParts = timestamp.split(":").map(Number);
      const totalSeconds =
        durationParts.length === 3
          ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
          : durationParts[0] * 60 + durationParts[1];

      if (totalSeconds > 1800) {
        return reply("⏱️ Audio limit is 30 minutes!");
      }

      const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(ytUrl)}&apikey=Manul-Official`;
      const res = await fetchJson(api);

      if (!res?.status || !res?.data?.url) {
        return reply("❌ ගීතය බාගත කළ නොහැක. වෙනත් එකක් උත්සහ කරන්න!");
      }

      const audioUrl = res.data.url;

      // 🖼️ Send thumbnail + styled caption
      const caption = `*~⋆｡˚☁︎｡⋆｡__________________________⋆｡☁︎˚｡⋆~*

\`❍. Song ➙\` :- ${title}

\`❍.Time ➙\` :-  ${timestamp}          \`❍.Uploaded ➙\` :- ${ago}

*ඔයාගේ ආසම පාටින්  පාට පාට රියැක්ට් ගොඩක් දාගෙන යමු ළමයෝ...😽🤍🙇🏻‍♂️*`;

      await robin.sendMessage(
        config.MENTAL,
        {
          image: { url: thumbnail },
          caption: caption,
        },
        { quoted: mek }
      );

      // 🎧 Send song after thumbnail + caption
      await robin.sendMessage(
        config.MENTAL,
        {
          audio: { url: audioUrl },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // ✅ Confirmation to sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${title}"* නම් ගීතය සාර්ථකව *${config.THARUSHA || "channel එකට"}* යවලා තියෙන්නෙ.`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply("*😓 උණුසුම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);


cmd(
  {
    pattern: "pakapaka",
    desc: "Download YouTube MP3 and send to user",
    category: "download",
    react: "🎧",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    try {
      if (!q) return reply("*🎧 නමක් හෝ YouTube link එකක් දෙන්න...*");

      const search = await yts(q);
      if (!search.videos.length) return reply("❌ *Video එක හමුනොවුණා!*");

      const data = search.videos[0];
      const ytUrl = data.url;

      const api = `https://sadas-ytmp3-new-2.vercel.app/convert?url=${ytUrl}`;
      const { data: apiRes } = await axios.get(api);

      if (!apiRes?.success || !apiRes.data?.link) {
        return reply("❌ *ගීතය බාගත කළ නොහැක!*");
      }

      const result = apiRes.data;

      // duration check (30 min max)
      if (result.duration && result.duration > 1800) {
        return reply("⏱️ *Audio time limit is 30 minutes!*");
      }

      const caption = `\`||🧘‍♂️ ${result.title}\`

* \`❍.Time ➙\` *${data.timestamp}*
* \`❍.Uploaded to YouTube ➙\` *${data.ago}*


> ❝♬.*බූට් |* \`\`\`S O N G S ofc\`\`\` *💗😽🍃*❞

> 🔹.◦◦◦ \`[💜||💛||🩷||🤍||💚]\` 
_*රියැට් කරන්න ළමයෝ 🥹❣️◦◦◦*_`;

      const thumb = `https://i.ytimg.com/vi/${data.videoId}/hqdefault.jpg`;

      // Send thumbnail + caption
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          image: { url: thumb },
          caption,
        },
        { quoted: mek }
      );

      // Send audio
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          audio: { url: result.link },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );
    } catch (err) {
      console.error(err);
      reply("❌ *Error එකක්! පසුව උත්සහ කරන්න.*");
    }
  }
);
cmd(
  {
    pattern: "vre",
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

      const desc = `〲🎶𝙽𝙾𝚆 𝚄𝙿𝙻𝙾𝙰𝙳𝙸𝙽𝙶 𝚂𝙾𝙽𝙶👆...㋞||🕊️

♧ ||𝚃𝙸𝙼𝙴    : *${data.timestamp}*      
♢ ||𝚄𝙿𝙻𝙾𝙰𝙳  : *${data.ago}*
♡ ||𝚅𝙸𝙴𝚆𝚂   : *${data.views}*

> ලස්සන සින්දු 🩵🇱🇰

`;

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
      const songData = await ytmp3(url, quality);

      if (!songData || !songData.download || !songData.download.url) {
        return reply("❌ Failed to download the song!");
      }

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
          audio: { url: songData.download.url },
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


cmd(
  {
    pattern: "boot3",
    alias: "ytmp3",
    react: "🎵",
    desc: "Download YouTube MP3 and send with styled details to BOOT JID",
    category: "download",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    try {
      if (!q) return reply("🎧 *සින්දුවක නමක් හෝ YouTube ලින්ක් එකක් දෙන්න...*");

      const search = await yts(q);
      if (!search.videos.length) return reply("❌ *Video එක හමුනොවුණා!*");

      const data = search.videos[0];
      const url = data.url;
      const thumb = data.thumbnail;

      const quality = "64";
      const songData = await ytmp3(url, quality);

      if (!songData || !songData.download?.url) {
        return reply("❌ *ගීතය බාගත කළ නොහැක!*");
      }

      // duration check
      let durationParts = data.timestamp.split(":").map(Number);
      let totalSeconds =
        durationParts.length === 3
          ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
          : durationParts[0] * 60 + durationParts[1];

      if (totalSeconds > 1800) {
        return reply("⏱️ *Audio limit minutes 30යි!*");
      }

      const title = songData.title || data.title;

      const caption = `\`||🧘‍♂️ ${title}\`

* \`❍.Time ➙\` *${data.timestamp}*
* \`❍.Uploaded to YouTube ➙\` *${data.ago}*


> ❝♬.*බූට් |* \`\`\`S O N G S ofc\`\`\` *💗😽🍃*❞

> 🔹.◦◦◦ \`[💜||💛||🩷||🤍||💚]\` 
_*රියැට් කරන්න ළමයෝ 🥹❣️◦◦◦*_`;

      // Send thumbnail with styled caption to BOOT JID
      await robin.sendMessage(
        config.BOOT,
        {
          image: { url: thumb },
          caption,
        },
        { quoted: mek }
      );

      // Send audio to BOOT JID
      await robin.sendMessage(
        config.BOOT,
        {
          audio: { url: songData.download.url },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // Confirm back to user
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${title}"* BOT එකට සාර්ථකව යැවිලා තියෙන්නේ!`,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);





cmd(
  {
    pattern: "denuwa",
    alias: ["ytptt", "vreptt"],
    react: "🎶",
    desc: "Download MP3 & send as Voice Note using KaliyaX API",
    category: "download",
    filename: __filename,
  },
  async (robin, mek, m, { from, q, reply }) => {
    try {
      if (!q) return reply("🧠 නමක් හරි YouTube ලින්ක් එකක් හරි දෙන්න");

      const search = await yts(q);
      if (!search.videos.length) return reply("❌ Video not found!");

      const video = search.videos[0];
      const videoUrl = video.url;

      // 📜 Styled caption
      const caption = `*~⋆｡˚☁︎｡⋆｡__________________________⋆｡☁︎˚｡⋆~*

\`❍. Song ➙\` :- *${video.title}*

\`❍.Time ➙\` :-  *${video.timestamp}*          \`❍.Uploaded ➙\` :- *${video.ago}*
\`❍.Views ➙\` :- *${video.views}*

> ❝♬.itz Me Denuwan Bbh😽💗🍃❞  
> 🔹.◦◦◦ \`[💜||💛||🩷||🤍||💚]\`  
_*ඔයාහේ ආසම පාටිම් ලස්සන හාර්ට් එකක් දාගෙන යමු ළමයෝ 😇💗◦◦◦*_`;

      // 🖼️ Send thumbnail + caption to target JID
      await robin.sendMessage(
        config.DENU,
        {
          image: { url: video.thumbnail },
          caption: caption,
        },
        { quoted: mek }
      );

      // 🔗 Fetch MP3 from API
      const apiURL = `https://kaliyax-yt-api.vercel.app/api/ytmp3?url=${encodeURIComponent(videoUrl)}`;
      const res = await fetchJson(apiURL);

      if (!res?.status || !res?.data?.download?.url) {
        return reply("⚠️ Cannot fetch audio from KaliyaX API");
      }

      const audioLink = res.data.download.url;

      // 🎧 Send audio to target JID as voice note
      await robin.sendMessage(
        config.DENU,
        {
          audio: { url: audioLink },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // ✅ Notify sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${video.title}"* නම් ගීතය සාර්ථකව *${config.DENU || "JID"}* වෙත යවා ඇත.`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);


cmd(
  {
    pattern: "gsong",
    desc: "Send caption, thumbnail and song to JID",
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
      const title = data.title;
      const timestamp = data.timestamp;
      const ago = data.ago;
      const ytUrl = data.url;
      const thumbnail = data.thumbnail;

      const durationParts = timestamp.split(":").map(Number);
      const totalSeconds =
        durationParts.length === 3
          ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
          : durationParts[0] * 60 + durationParts[1];

      if (totalSeconds > 1800) {
        return reply("⏱️ Audio limit is 30 minutes!");
      }

      const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(ytUrl)}&apikey=Manul-Official`;
      const res = await fetchJson(api);

      if (!res?.status || !res?.data?.url) {
        return reply("❌ ගීතය බාගත කළ නොහැක. වෙනත් එකක් උත්සහ කරන්න!");
      }

      const audioUrl = res.data.url;

      // 🖼️ Send thumbnail + styled caption
      const caption = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ◎

*◈🎶  𝗧 𝙸𝚃𝙻𝙴 : ►*  *${data.title}*

*◈🍒  𝗗 𝚄𝚁𝙰𝚃𝙸𝙾𝙽 : ►* *${data.timestamp}*
*◈ 🍇 𝗦 𝙸𝚉𝙴 : ►*  2.00 MB
*◈🌹 𝗡 𝚄𝙼𝙱𝙴𝚁 : ►* 001

> 🎼 ᴜꜱᴇ ʜᴇᴀᴅᴩʜᴏɴᴇꜱ ꜰᴏʀ ʙᴇꜱᴛ ᴇxᴩᴇʀɪᴇɴᴄᴇ 😫🥺🎧

*𝐑𝐞𝐚𝐜𝐭 100 ඕනෙ ළමායි🚶💌 👇🏻*
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ◎`;

      await robin.sendMessage(
        config.Gimsara,
        {
          image: { url: thumbnail },
          caption: caption,
        },
        { quoted: mek }
      );

      // 🎧 Send song after thumbnail + caption
      await robin.sendMessage(
        config.Gimsara,
        {
          audio: { url: audioUrl },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // ✅ Confirmation to sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${title}"* නම් ගීතය සාර්ථකව *${config.BOOT || "channel එකට"}* යවලා තියෙන්නෙ.`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply("*😓 උණුසුම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);

cmd(
  {
    pattern: "gsong2",
    desc: "Send caption, thumbnail and song to JID",
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
      const title = data.title;
      const timestamp = data.timestamp;
      const ago = data.ago;
      const ytUrl = data.url;
      const thumbnail = data.thumbnail;

      const durationParts = timestamp.split(":").map(Number);
      const totalSeconds =
        durationParts.length === 3
          ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
          : durationParts[0] * 60 + durationParts[1];

      if (totalSeconds > 1800) {
        return reply("⏱️ Audio limit is 30 minutes!");
      }

      const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(ytUrl)}&apikey=Manul-Official`;
      const res = await fetchJson(api);

      if (!res?.status || !res?.data?.url) {
        return reply("❌ ගීතය බාගත කළ නොහැක. වෙනත් එකක් උත්සහ කරන්න!");
      }

      const audioUrl = res.data.url;

      // 🖼️ Send thumbnail + styled caption
      const caption = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ◎

*◈🎶  𝗧 𝙸𝚃𝙻𝙴 : ►*  *${data.title}*

*◈🍒  𝗗 𝚄𝚁𝙰𝚃𝙸𝙾𝙽 : ►* *${data.timestamp}*
*◈ 🍇 𝗦 𝙸𝚉𝙴 : ►*  2.00 MB
*◈🌹 𝗡 𝚄𝙼𝙱𝙴𝚁 : ►* 001

> 🎼 ᴜꜱᴇ ʜᴇᴀᴅᴩʜᴏɴᴇꜱ ꜰᴏʀ ʙᴇꜱᴛ ᴇxᴩᴇʀɪᴇɴᴄᴇ 😫🥺🎧

*𝐑𝐞𝐚𝐜𝐭 100 ඕනෙ ළමායි🚶💌 👇🏻*
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ◎`;

      await robin.sendMessage(
        config.Gimsara2,
        {
          image: { url: thumbnail },
          caption: caption,
        },
        { quoted: mek }
      );

      // 🎧 Send song after thumbnail + caption
      await robin.sendMessage(
        config.Gimsara2,
        {
          audio: { url: audioUrl },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // ✅ Confirmation to sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${title}"* නම් ගීතය සාර්ථකව *${config.BOOT || "channel එකට"}* යවලා තියෙන්නෙ.`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply("*😓 උණුසුම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);

cmd(
{
    pattern: "තාල1",
    desc: "Send caption, thumbnail and song to JID",
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
      const title = data.title;
      const timestamp = data.timestamp;
      const ago = data.ago;
      const ytUrl = data.url;
      const thumbnail = data.thumbnail;

      

      const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(ytUrl)}&apikey=Manul-Official`;
      const res = await fetchJson(api);

      if (!res?.status || !res?.data?.url) {
        return reply("❌ ගීතය බාගත කළ නොහැක. වෙනත් එකක් උත්සහ කරන්න!");
      }

      const audioUrl = res.data.url;

      // 🖼️ Send thumbnail + styled caption
      const caption = `\`||${data.title} 🧘\`

* \`❍.Time ➙\` *${data.timestamp}*
* \`❍.Uploaded to YouTube ➙\` *${data.ago}*

> 🫟🎶තාල | Music  officialᥫ᭡|🇱🇰

> 🔹.◦◦◦ \`[💜||💛||🩷||🤍||💚]\` 
_*රියැට් කරන්න ළමයෝ 🥹❣️◦◦◦*_`;

      await robin.sendMessage(
        config.BOOT,
        {
          image: { url: thumbnail },
          caption: caption,
        },
        { quoted: mek }
      );

      // 🎧 Send song after thumbnail + caption
      await robin.sendMessage(
        config.BOOT,
        {
          audio: { url: audioUrl },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // ✅ Confirmation to sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${title}"* නම් ගීතය සාර්ථකව *${config.BOOT || "channel එකට"}* යවලා තියෙන්නෙ.`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply("*😓 උණුසුම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);

//=============383====3=3=3=3=3=3=3=3==3=


/*
cmd(
  {
    pattern: "denu2",
    desc: "Send caption, thumbnail and song to JID",
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
      const title = data.title;
      const timestamp = data.timestamp;
      const ago = data.ago;
      const ytUrl = data.url;
      const thumbnail = data.thumbnail;

      const durationParts = timestamp.split(":").map(Number);
      const totalSeconds =
        durationParts.length === 3
          ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
          : durationParts[0] * 60 + durationParts[1];

      if (totalSeconds > 1800) {
        return reply("⏱️ Audio limit is 30 minutes!");
      }

      const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(ytUrl)}&apikey=Manul-Official`;
      const res = await fetchJson(api);

      if (!res?.status || !res?.data?.url) {
        return reply("❌ ගීතය බාගත කළ නොහැක. වෙනත් එකක් උත්සහ කරන්න!");
      }

      const audioUrl = res.data.url;

      // 🖼️ Send thumbnail + styled caption
  
  const caption = `*~⋆｡˚☁︎｡⋆｡__________________________⋆｡☁︎˚｡⋆~*

\`❍. Song ➙\` :- *${result.title}*

\`❍.Time ➙\` :-  *${result.timestamp}*          \`❍.Uploaded ➙\` :- *${result.ago}*


> ❝♬.itz Me Denuwan Bbh😽💗🍃❞

> 🔹.◦◦◦ \`[💜||💛||🩷||🤍||💚]\` 
_*ඔයාහේ ආසම පාටිම් ලස්සන හාර්ට් එකක් දාගෙන යමු ළමයෝ 😇💗◦◦◦*_`;
 await robin.sendMessage(
        config.DENU,
        {
          image: { url: thumbnail },
          caption: caption,
        },
        { quoted: mek }
      );

      // 🎧 Send song after thumbnail + caption
      await robin.sendMessage(
        config.DENU,
        {
          audio: { url: audioUrl },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // ✅ Confirmation to sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${title}"* නම් ගීතය සාර්ථකව *${config.DENU || "channel එකට"}* යවලා තියෙන්නෙ.`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply("*😓 උණුසුම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);
*/

cmd(
  {
    pattern: "dinuwa2",
    desc: "Send caption, thumbnail and song to JID",
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
      const title = data.title;
      const timestamp = data.timestamp;
      const ago = data.ago;
      const ytUrl = data.url;
      const thumbnail = data.thumbnail;

      const durationParts = timestamp.split(":").map(Number);
      const totalSeconds =
        durationParts.length === 3
          ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
          : durationParts[0] * 60 + durationParts[1];

      if (totalSeconds > 1900) {
        return reply("⏱️ Audio limit is 30 minutes!");
      }

      const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(ytUrl)}&apikey=Manul-Official`;
      const res = await fetchJson(api);

      if (!res?.status || !res?.data?.url) {
        return reply("❌ ගීතය බාගත කළ නොහැක. වෙනත් එකක් උත්සහ කරන්න!");
      }

      const audioUrl = res.data.url;

      // 🖼️ Send thumbnail + styled caption
      const caption = `\`00:00\` *─────●──────────* \`${timestamp}\`
      
      *${title}*
      
      > ❝ *ආසම පාටින් රියැක්ට් කරන් යමු හැමෝමහ්... 👇🏻ןן🐼💗* ❞`;

      await robin.sendMessage(
        config.DINUWH,
        {
          image: { url: thumbnail },
          caption: caption,
        },
        { quoted: mek }
      );

      // 🎧 Send song after thumbnail + caption
      await robin.sendMessage(
        config.DINUWH,
        {
          audio: { url: audioUrl },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // ✅ Confirmation to sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${title}"* නම් ගීතය සාර්ථකව *${config.THARUSHA || "channel එකට"}* යවලා තියෙන්නෙ.`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply("*😓 උණුසුම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);
cmd(
  {
    pattern: "dinuwaso",
    desc: "Send YouTube MP3 only (no details)",
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

      // Send only audio to config.DINUWH
      await robin.sendMessage(
        config.DINUWH,
        {
          audio: { url: result.download },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // Optional: Confirmation to sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${result.title}"* ගීතය සාර්ථකව යවා ඇත.`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply("*ඇතැම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);
cmd(
  {
    pattern: "dinuwa",
    desc: "Send YouTube MP3 to a specific JID",
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

      const caption = `*~⋆｡˚☁︎｡⋆｡__________________________⋆｡☁︎˚｡⋆~*

\`❍. Song ➙\` :- *${result.title}*

\`❍.Time ➙\` :-  *${data.timestamp}*          \`❍.Uploaded ➙\` :- *${data.ago}*


> ❝♬.itz Me Dinuw Bbh😽💗🍃❞

> 🔹.◦◦◦ \`[💜||💛||🩷||🤍||💚]\` 
_*ඔයාහේ ආසම පාටිම් ලස්සන හාර්ට් එකක් දාගෙන යමු ළමයෝ 🫠💗◦◦◦*_`;

      // Send thumbnail and caption to configured JID
      await robin.sendMessage(
        config.DINUWH,
        {
          image: { url: result.thumbnail },
          caption: caption,
        },
        { quoted: mek }
      );

      // Send audio to the same JID
      await robin.sendMessage(
        config.DINUWH,
        {
          audio: { url: result.download },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // Confirmation message to command sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${result.title}"* නම් ගීතය *${config.THARUSHA}* වෙත සාර්ථකව යවනු ලැබීය.`,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error(e);
      reply("*ඇතැම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);


cmd(
  {
    pattern: "boot",
    desc: "Send YouTube MP3 to a specific JID",
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

      const caption = `\`||🧘‍♂️ ${result.title}\`

* \`❍.Time ➙\` *${data.timestamp}*
* \`❍.Uploaded to YouTube ➙\` *${data.ago}*


> ❝♬.*බූට් |* \`\`\`S O N G S ofc\`\`\` *💗😽🍃*❞

> 🔹.◦◦◦ \`[💜||💛||🩷||🤍||💚]\` 
_*රියැට් කරන්න ළමයෝ 🥹❣️◦◦◦*_`;

      // Send thumbnail and caption to configured JID
      await robin.sendMessage(
        config.BOOT,
        {
          image: { url: result.thumbnail },
          caption: caption,
        },
        { quoted: mek }
      );

      // Send audio to the same JID
      await robin.sendMessage(
        config.BOOT,
        {
          audio: { url: result.download },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // Confirmation message to command sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${result.title}"* නම් ගීතය *${config.BOOT}* වෙත සාර්ථකව යවනු ලැබීය.`,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error(e);
      reply("*ඇතැම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);


//=3=3=3=3=3=33=3=3=33=3=3=3==3=3=3=3=3=3=3=3=3==3=3=3=

/* 
Thenux-AI 
   Give credit.*/



//const { cmd } = require('../command');const axios = require('axios');

/*cmd({
    pattern: "tikmanu",
    alias: ["tiktokdl"],
    react: "🎬",
    desc: "Download TikTok video using the provided URL",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
    try {
        // Check if URL is provided
        if (!args[0]) {
            return await reply("📥 Please provide a TikTok video URL.");
        }

        const tiktokUrl = args[0];
        const apiUrl = `https://manul-official-api.vercel.app/scrape-tiktok?url=${encodeURIComponent(tiktokUrl)}&apikey=Manul-Official`;

        // Send request to the API
        const response = await axios.get(apiUrl);

        // Check if the response is successful
        if (response.data.status) {
            const data = response.data.data.data;

            // Prepare the message with video details and options
            const message = `
🎬 *乂 THENU-MD TIKTOK DOWNLOADER ◉◉►*

┏━━━━━━━━━━━━━━━━━━━━━━━━━━┓
1. *Title:* ${data.title}\n
2. *Author:* ${data.author}
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

*乂◉◉► REPLY THE DOWNLOAD OPTION* 

┌───────────────────────────────────

📥 *Download Options:*

1. *No Watermark Video*

2. *Watermark Video*

3. *Audio*

4. *Thumbnail*

└───────────────────────────────────

Reply with the number of the option you want to download.

> ©ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ʙʏ Thenu-MD (WOLF-MD)
> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ Thenux AI*`;

            // Send the message and save the message ID
            const sentMsg = await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: message }, { quoted: mek });
            const messageID = sentMsg.key.id; // Save the message ID for later reference

            // Listen for the user's response
            conn.ev.on("messages.upsert", async (messageUpdate) => {
                const mek = messageUpdate.messages[0];
                if (!mek.message) return;
                const messageType =
                    mek.message.conversation ||
                    mek.message.extendedTextMessage?.text;
                const from = mek.key.remoteJid;

                // Check if the message is a reply to the previously sent message
                const isReplyToSentMsg =
                    mek.message.extendedTextMessage &&
                    mek.message.extendedTextMessage.contextInfo.stanzaId ===
                        messageID;

                if (isReplyToSentMsg) {
                    // React to the user's reply (the "1", "2", "3", or "4" message)
                    await conn.sendMessage(from, {
                        react: { text: "🌟", key: mek.key },
                    });

                    switch (messageType) {
                        case '1':
                            // Handle option 1 (No Watermark Video)
                            await conn.sendMessage(
                                from,
                                { video: { url: data.nowm }, caption: "Here's your TikTok video without watermark.\n> 👾 THENUX  |   AI ジ" },
                                { quoted: mek }
                            );
                            break;
                        case '2':
                            // Handle option 2 (Watermark Video)
                            await conn.sendMessage(
                                from,
                                { video: { url: data.watermark }, caption: "Here's your TikTok video with watermark.\n> 👾 THENUX  |   AI ジ" },
                                { quoted: mek }
                            );
                            break;
                        case '3':
                            // Handle option 3 (Audio)
                            await conn.sendMessage(
                                from,
                                { audio: { url: data.audio }, mimetype: 'audio/mp4', caption: "Here's the TikTok audio." },
                                { quoted: mek }
                            );
                            break;
                        case '4':
                            // Handle option 4 (Thumbnail)
                            await conn.sendMessage(
                                from,
                                { image: { url: data.thumbnail }, caption: "Here's the TikTok thumbnail.\n> 👾 THENUX  |   AI ジ" },
                                { quoted: mek }
                            );
                            break;
                        default:
                            // Handle invalid input (not 1, 2, 3, or 4)
                            await conn.sendMessage(from, {
                                react: { text: "❓", key: mek.key },
                            });
                            await reply("❌ Invalid option. Please reply with a number between 1 and 4.");
                            break;
                    }

                    // React to the successful completion of the task
                    await conn.sendMessage(from, {
                        react: { text : "✅", key: mek.key },
                    });

                    // Clear the stored TikTok data
                    delete conn.tiktokData;
                }
            });
        } else {
            await reply("❌ Unable to fetch TikTok video details. Please check the URL.");
        }
    } catch (error) {
        console.error("Error fetching TikTok video:", error);

        // Enhanced error handling
        if (error.response) {
            await reply(`❌ Error: ${error.response.data.message || 'Unable to fetch TikTok video.'}`);
        } else if (error.request) {
            await reply("❌ Error: No response received from the TikTok API. Please check your internet connection.");
        } else {
            await reply(`❌ Error: ${error.message}`);
        }
    }
});


const fetch = require('node-fetch');

const fetchJson = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
  return await res.json();
};

cmd({
  pattern: "ta",
  react: "⬇",
  filename: __filename
},
async(conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return reply("📌 කරුණාකර TikTok ලින්ක් එකක් දෙන්න!\nඋදා: *.ta https://vm.tiktok.com/xxxx*");

    const api = `https://api-mainh-20a12b683c39.herokuapp.com/download/tiktokdl?url=${q}`;
    const res = await fetchJson(api);

    if (!res.result || !res.result.audio) {
      return reply("❌ MP3 link එක හමුවුනේ නැහැ. ලින්ක් එක හරිද බලන්න!");
    }

    const mp3Link = res.result.audio;

    // React with ⬆ before sending
    await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }});

    // Send as PTT (voice message)
    await conn.sendMessage(from, {
      audio: { url: mp3Link },
      mimetype: 'audio/mpeg',
      ptt: true
    }, { quoted: mek });

    // React with ✔ after sent
    await conn.sendMessage(from, { react: { text: '✔', key: mek.key }});

  } catch (e) {
    await conn.sendMessage(from, { react: { text: '❌', key: mek.key }});
    console.error(e);
    reply(`😵 Error!\n\n*${e.message || e}*`);
  }
});*/




cmd(
  {
    pattern: "freedom",
    desc: "Send YouTube MP3 to a specific JID",
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

      const api = `https://sadas-ytmp3-new-2.vercel.app/convert?url=${ytUrl}`;
      const { data: apiRes } = await axios.get(api);

      if (!apiRes?.status || !apiRes.result?.download) {
        return reply("❌ ගීතය බාගත කළ නොහැක. වෙනත් එකක් උත්සහ කරන්න!");
      }

      const result = apiRes.result;

      const caption = `*~⋆｡˚☁︎｡⋆｡__________________________⋆｡☁︎˚｡⋆~*

\`❐. Song ➛\` :- *${result.title}*

\`❐.Time ➛\` :-  *${data.timestamp}*          \`❐.Uploaded ➛\` :- *${data.ago}*


> ❝♬.itz Me Dinuw Bbh😽💗🍃❞

_*✧ලස්සන හාට් ටිකක් ඕනී ❤️😽☘️✧*_`;

      // Send thumbnail and caption to configured JID
      await robin.sendMessage(
        config.Freedom,
        {
          image: { url: result.thumbnail },
          caption: caption,
        },
        { quoted: mek }
      );

      // Send audio to the same JID
      await robin.sendMessage(
        config.Freedom,
        {
          audio: { url: result.download },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // Confirmation message to command sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${result.title}"* නම් ගීතය *${config.Freedom}* වෙත සාර්ථකව යවනු ලැබීය.`,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error(e);
      reply("*ඇතැම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);


//=3=3.0=3.03=3.033=3.0333=3.03333=3.033333=3.0333333=3.03333333=3.03333333=3.03333333=3.03333333


let autoSenders = {};
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

cmd(
  {
    pattern: "autosongd",
    desc: "Send random YouTube MP3 to a specific JID every 30 seconds based on keyword",
    category: "download",
    react: "🎧",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    try {
      if (!q.includes("&")) return reply("*📌 උදාහරණය: .autosongd boot song & 9476xxxxxxx@s.whatsapp.net*");

      const [keyword, jid] = q.split("&").map(i => i.trim());

      if (!keyword || !jid) return reply("*❌ ගීත keyword එක හෝ JID එක අඩුයි...!*");

      if (autoSenders[jid]) {
        return reply("*⏳ මේ JID එකට දැනටමත් auto song sender එකක් ක්‍රියාත්මකයි...*");
      }

      reply(`✅ *"${keyword}"* keyword එකෙන් ගීත රැඳවීම් auto-send ක්‍රමය *${jid}* වෙත ක්‍රියාත්මකයි. සෑම තත්පර 30කට වරක් හුම් random song එකක් යවෙයි.`);

      autoSenders[jid] = setInterval(async () => {
        try {
          const search = await yts(keyword);
          if (!search.videos.length) return;

          const data = getRandom(search.videos);
          const ytUrl = data.url;

          const api = `https://yt-five-tau.vercel.app/download?q=${ytUrl}&format=mp3`;
          const { data: apiRes } = await axios.get(api);

          if (!apiRes?.status || !apiRes.result?.download) return;

          const result = apiRes.result;

          const caption = `*🎧 Auto Song From Dinuwh:*

\`📝 Title:\` ${result.title}
\`🕒 Duration:\` ${data.timestamp}
\`📅 Uploaded:\` ${data.ago}

_🟢 Powered By: Dinuwh MD Bot_`;

          await robin.sendMessage(
            jid,
            { image: { url: result.thumbnail }, caption },
            { quoted: mek }
          );

          await robin.sendMessage(
            jid,
            {
              audio: { url: result.download },
              mimetype: "audio/mpeg",
              ptt: true,
            },
            { quoted: mek }
          );
        } catch (e) {
          console.error("[AutoSong Error]", e);
        }
      }, 30 * 1000); // 30 seconds
    } catch (e) {
      console.error(e);
      reply("*🥺 වැරදියක් දැනගන්න ලැබුනා!*");
    }
  }
);

// Stop command
cmd(
  {
    pattern: "stopautosong",
    desc: "Stop AutoSong by JID",
    category: "download",
    react: "🛑",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    if (!q) return reply("*📌 උදා: .stopautosong 9476xxxxxxx@s.whatsapp.net*");

    const jid = q.trim();
    if (autoSenders[jid]) {
      clearInterval(autoSenders[jid]);
      delete autoSenders[jid];
      reply(`✅ AutoSong sender එක *${jid}* සඳහා නවතා දමා ඇත.`);
    } else {
      reply("❌ මේ JID එකට කිසිම AutoSong sender එකක් ක්‍රියාත්මක නොවෙයි.");
    }
  }
);

//=3==3.03=3.033=3.033=3.033=3.0333=3.03333=3.03333=3.03333


cmd(
  {
    pattern: "minddcm",
    desc: "Send YouTube MP3 to a specific JID",
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

      // 🖼️ Stylish Caption
      const caption = `🔮 *Tɪᴛʟᴇ :* ${result.title}

▫️📆 *Rᴇʟᴇᴀꜱᴇᴅ :* ${data.ago}
▫️⏱️ *Dᴜʀᴀᴛɪᴏɴ :* ${data.seconds} seconds (${data.timestamp})
▫️🎭 *Vɪᴇᴡꜱ :* ${data.views.toLocaleString()}

\`▫️ඔයා ආස පාටකිම් හාට් එකක් දාන් යමූ ❤‍🩹😽🍃*\`

> 𝙈 𝘪 𝘯 𝘥  𝙁 𝘳 𝘦 𝘦 𝘥 𝘰 𝘮 💆🤍 | 🇱🇰*
`;

      // 🖼️ Send Thumbnail + Caption to Target JID
      await robin.sendMessage(
        config.TMJID,
        {
          image: { url: result.thumbnail },
          caption,
        },
        { quoted: mek }
      );

      // 🔊 Send MP3 Audio to same JID
      await robin.sendMessage(
        config.TMJID,
        {
          audio: { url: result.download },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // ✅ Confirmation to sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${result.title}"* නම් ගීතය *${config.TMJID}* වෙත සාර්ථකව යවනු ලැබීය.`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply("*🥲 උත්සහය අසාර්ථක වුණා! වෙනස් එකක් දාන්න හොඳයි.*");
    }
  }
);


//==3=3=3=3=3===
/**වැඩඩ දන්නෙ නෑ හෙන පරන එකක් මේක😓*
`𝐅𝐁 𝐃𝐋 𝐏𝐋𝐔𝐆𝐈𝐍`

const axios = require("axios");
const { fetchJson } = require("../lib/functions");
const { cmd, commands } = require('../command');*/

cmd({ pattern: "fbtest",
 alias: ["facebook"], 
desc: "Download Facebook videos", category: "download",
 filename: __filename },
 async (conn, m, store, { from, quoted, args, q, reply }) => { try { if (!q || !q.startsWith("https://")) { return conn.sendMessage(from, { text: "Need URL" }, { quoted: m }); }

await conn.sendMessage(from, {
  react: { text: '⏳', key: m.key }
});

const response = await fetch(`https://bk9.fun/download/fb?url=${encodeURIComponent(q)}`);
const fbData = await response.json();

if (!fbData.status) {
  return reply("❌ Error fetching the video. Please try again.");
}

const caption = `╭━〔🐉 *FB DOWNLOADER*🐉 〕━\n`
  + `┃▸ *Title*: ${fbData.BK9.title}\n`
  + `╰━━━━━━━━━\n\n`
  + `🩵 *Download Options:*\n\n`
  + `1  *SD Quality*\n`
  + `2  *HD Quality*\n\n`
  + `🩵 *Audio Options:*\n\n`
  + `3  *Audio (SD)*\n`
  + `4  *Document (MP3)*\n`
  + `5  *Voice (PTT)*\n\n`
  + `🔢 REPLY THE NUMBER.*

> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ`;

const sentMsg = await conn.sendMessage(from, {
  image: { url: fbData.BK9.thumb },
  caption: caption
}, { quoted: m });

const messageID = sentMsg.key.id;

conn.ev.on("messages.upsert", async (msgData) => {
  const receivedMsg = msgData.messages[0];
  if (!receivedMsg.message) return;
  
  const receivedText = receivedMsg.message.conversation || receivedMsg.message.extendedTextMessage?.text;
  const senderID = receivedMsg.key.remoteJid;
  const isReplyToBot = receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;
  
  if (isReplyToBot) {
    await conn.sendMessage(senderID, {
      react: { text: '⬇️', key: receivedMsg.key }
    });
    
    switch (receivedText) {
      case "1":
        await conn.sendMessage(senderID, {
          video: { url: fbData.BK9.sd },
          caption: "> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ"
        }, { quoted: receivedMsg });
        break;

      case "2":
        await conn.sendMessage(senderID, {
          video: { url: fbData.BK9.hd },
          caption: "> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ"
        }, { quoted: receivedMsg });
        break;

      case "3":
        await conn.sendMessage(senderID, {
          audio: { url: fbData.BK9.sd },
          mimetype: "audio/mpeg"
        }, { quoted: receivedMsg });
        break;

      case "4":
        await conn.sendMessage(senderID, {
          document: { url: fbData.BK9.sd },
          mimetype: "audio/mpeg",
          fileName: "Facebook_Audio.mp3",
          caption: "> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ"
        }, { quoted: receivedMsg });
        break;

      case "5":
        await conn.sendMessage(senderID, {
          audio: { url: fbData.BK9.sd },
          mimetype: "audio/mp4",
          ptt: true
        }, { quoted: receivedMsg });
        break;

      default:
        reply("❌ Invalid option! Please reply with 1, 2, 3, 4, or 5.");
    }
  }
});

} catch (error) { console.error("Error:", error); reply("❌ Error fetching the video. Please try again."); } });



cmd(
  {
    pattern: "denu",
    desc: "Send YouTube MP3 to a specific JID",
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

      const caption = `*~⋆｡˚☁︎｡⋆｡__________________________⋆｡☁︎˚｡⋆~*

\`❍. Song ➙\` :- *${result.title}*

\`❍.Time ➙\` :-  *${data.timestamp}*          \`❍.Uploaded ➙\` :- *${data.ago}*


> ❝♬.itz Me Denuwan Bbh😽💗🍃❞

> 🔹.◦◦◦ \`[💜||💛||🩷||🤍||💚]\` 
_*ඔයාහේ ආසම පාටිම් ලස්සන හාර්ට් එකක් දාගෙන යමු ළමයෝ 😇💗◦◦◦*_`;

      // Send thumbnail and caption to configured JID
      await robin.sendMessage(
        config.DENU,
        {
          image: { url: result.thumbnail },
          caption: caption,
        },
        { quoted: mek }
      );

      // Send audio to the same JID
      await robin.sendMessage(
        config.DENU,
        {
          audio: { url: result.download },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // Confirmation message to command sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${result.title}"* නම් ගීතය *${config.DENU}* වෙත සාර්ථකව යවනු ලැබීය.`,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error(e);
      reply("*ඇතැම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);




cmd(
  {
    pattern: "fr2",
    desc: "Send YouTube MP3 to a specific JID",
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

      const api = `https://sadas-ytmp3-new-2.vercel.app/convert?url=${ytUrl}`;
      const { data: apiRes } = await axios.get(api);

      if (!apiRes?.success || !apiRes.data?.link) {
        return reply("❌ ගීතය බාගත කළ නොහැක. වෙනත් එකක් උත්සහ කරන්න!");
      }

      const result = apiRes.data;

      const caption = `\`||🧘‍♂️ ${result.title}\`

* \`❍.Time ➙\` *${data.timestamp}*
* \`❍.Uploaded to YouTube ➙\` *${data.ago}*


> ❝♬.*බූට් |* \`\`\`S O N G S ofc\`\`\` *💗😽🍃*❞

> 🔹.◦◦◦ \`[💜||💛||🩷||🤍||💚]\` 
_*රියැට් කරන්න ළමයෝ 🥹❣️◦◦◦*_`;

      // Send thumbnail and caption to configured JID
      await robin.sendMessage(
        config.Freedom,
        {
          image: { url: `https://i.ytimg.com/vi/${data.videoId}/hqdefault.jpg` },
          caption: caption,
        },
        { quoted: mek }
      );

      // Send audio to the same JID
      await robin.sendMessage(
        config.Freedom,
        {
          audio: { url: result.link },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // Confirmation message to command sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${result.title}"* නම් ගීතය *${config.BOOT}* වෙත සාර්ථකව යවනු ලැබීය.`,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error(e);
      reply("*ඇතැම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);
