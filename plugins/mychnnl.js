//onst { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const { cmd, commands } = require("../lib/command");
//const { cmd } = require("../lib/command");
const yts = require("yt-search");
const axios = require("axios");
const config = require("../settings");


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

      const api = `https://yt-five-tau.vercel.app/download?q=${ytUrl}&format=mp3`;
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
