const makeWASocket = require('@whiskeysockets/baileys').default;
const { DisconnectReason, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const { cmd } = require('../lib/command');        // ඔබේ command handler එක
const config = require('../settings');            // settings (prefix, owner name වගේ දේවල්)


/**
 * Plugin: .fetch
 * Supports: APK, MP4, MP3, PDF, Images (any direct link)
 * Author: DINUWH MD
 */

const axios = require('axios');

cmd({
    pattern: "fetch",
    react: "📥",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    if (!q) return await reply('*Please provide a direct URL!*');

    try {
        const mediaUrl = q.split("|")[0];
        const title = q.split("|")[1] || 'downloaded_file';

        // Progress simulation
        const progressMsgs = [
            "《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
            "《 ████▒▒▒▒▒▒▒▒》30%",
            "《 ███████▒▒▒▒▒》50%",
            "《 ██████████▒▒》80%",
            "《 ████████████》100%",
            "✅ Download Complete!"
        ];

        let { key } = await conn.sendMessage(from, { text: 'Downloading media...' });
        for (let i = 0; i < progressMsgs.length; i++) {
            await conn.sendMessage(from, { text: progressMsgs[i], edit: key });
        }

        // Function to get media buffer
        const getBuffer = async (url) => {
            const res = await axios.get(url, { responseType: 'arraybuffer' });
            return Buffer.from(res.data, 'binary');
        };

        const mediaBuffer = await getBuffer(mediaUrl);

        // Detect mimetype from extension
        const ext = mediaUrl.split('.').pop().toLowerCase();
        let mimeType = "application/octet-stream";
        if (['mp4'].includes(ext)) mimeType = "video/mp4";
        else if (['mp3'].includes(ext)) mimeType = "audio/mpeg";
        else if (['apk'].includes(ext)) mimeType = "application/vnd.android.package-archive";
        else if (['pdf'].includes(ext)) mimeType = "application/pdf";
        else if (['jpg','jpeg'].includes(ext)) mimeType = "image/jpeg";
        else if (['png'].includes(ext)) mimeType = "image/png";

        await conn.sendMessage(from, {
            document: mediaBuffer,
            mimetype: mimeType,
            fileName: `${title}.${ext}`,
            caption: `*Media Downloaded by DINUWH MD*`
        });

        // Reaction ✅
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (error) {
        console.error(error);
        await conn.sendMessage(from, '*Error fetching or sending the media!*', { quoted: mek });
    }
});

const util = require('util');

cmd({
  pattern: 'eval',
  alias: ['e', '>'],
  desc: 'Evaluate JavaScript code',
  category: 'danger',
  filename: __filename,
  use: '.eval <code>',
}, async (conn, msg, { q }) => {
  if (!q) return msg.reply("⚠️ Provide some code to evaluate.\n\nExample: `.eval conn.groupMetadata('120363303954104745@g.us')`");

  try {
    let result = await eval(`(async () => { ${q} })()`);
    if (typeof result !== "string") result = util.inspect(result, { depth: 1 });

    if (result.length > 4000) {
      return await msg.reply("✅ Output too long! Sending as file...", {
        document: Buffer.from(result),
        mimetype: "text/plain",
        fileName: "eval-output.txt",
      });
    }

    await msg.reply("✅ *Eval Result:*\n\n```js\n" + result + "\n```");
  } catch (e) {
    await msg.reply("❌ *Error:*\n\n```js\n" + e + "\n```");
  }
});


cmd({
  pattern: "channeld",
  desc: "Get WhatsApp channel (newsletter) info.",
  category: "other",
  use: '.channel <link | invite | JID>',
  filename: __filename
}, async (conn, msg, m, { from, q, reply }) => {
  try {
    if (!q) {
      return reply(`❌ *Please provide a WhatsApp channel link, invite code or JID.*\n\n📌 Examples:\n.channel https://whatsapp.com/channel/xxxxxx\n.channel xxxxxxx\n.channel xxxxxx@newsletter`);
    }

    // 🔍 Extract invite code from full link if present
    let input = q.trim();
    if (input.includes("whatsapp.com/channel/")) {
      const match = input.match(/channel\/([a-zA-Z0-9_-]+)/);
      if (match) input = match[1]; // extract invite code
    }

    // 🌐 Get metadata from invite or JID
    let metadata;
    if (input.includes("@newsletter")) {
      metadata = await conn.newsletterMetadata("jid", input);
    } else {
      metadata = await conn.newsletterMetadata("invite", input);
    }

    // 📋 Format info text
    let info = `📢 *CHANNEL INFO*\n\n`;
    info += `📛 *Name:* ${metadata.name || "N/A"}\n`;
    info += `🆔 *JID:* ${metadata.id || "N/A"}\n`;
    info += `👤 *Owner:* ${metadata.ownerJid || "N/A"}\n`;
    info += `📝 *Description:* ${metadata.description || "No description"}\n`;
    info += `🔔 *Followers:* ${metadata.subscriberCount || "0"}\n`;
    info += `📅 *Created:* ${metadata.createTs ? new Date(metadata.createTs * 1000).toLocaleString() : "Unknown"}\n\n`;
    info += `⚖️ *Powered By:* Dinuwh Bbh`;

    // 🖼️ Try to fetch profile picture
    let pfp;
    try {
      pfp = await conn.profilePictureUrl(metadata.id, "image");
    } catch {
      pfp = null;
    }

    // 📨 Send reply with image or plain text
    if (pfp) {
      await conn.sendMessage(from, {
        image: { url: pfp },
        caption: info
      }, { quoted: msg });
    } else {
      await conn.sendMessage(from, {
        text: info
      }, { quoted: msg });
    }

  } catch (e) {
    console.error("Channel Info Error:", e);
    reply("❌ Error fetching channel info.\n\n" + (e.message || e));
  }
});

 //=======



cmd({
  pattern: "channeld2",
  desc: "Get WhatsApp channel (newsletter) info with details.",
  category: "other",
  use: '.channel <invite code or JID or link>',
  filename: __filename
}, async (conn, msg, m, { from, q, reply }) => {
  try {
    if (!q) return reply(`❌ Please provide a channel invite code, JID, or link.\nExamples:\n.channel xxxxx\n.channel abcd@newsletter\n.channel https://whatsapp.com/channel/xxxxxx`);

    // Extract invite code if full link is given
    let input = q.trim();
    if (input.includes("whatsapp.com/channel/")) {
      const match = input.match(/channel\/([a-zA-Z0-9_-]+)/);
      if (match) input = match[1];
    }

    // Fetch channel metadata
    let metadata;
    if (input.includes("@newsletter")) {
      metadata = await conn.newsletterMetadata("jid", input);
    } else {
      metadata = await conn.newsletterMetadata("invite", input);
    }

    // Log metadata for debug (remove in production)
    console.log("Channel Metadata:", metadata);

    // Compose info text with as many details as possible
    let info = `📢 *CHANNEL INFO*\n\n`;
    info += `📛 *Name:* ${metadata.name || "N/A"}\n`;
    info += `🆔 *JID:* ${metadata.id || "N/A"}\n`;
    info += `👤 *Owner:* ${metadata.ownerJid || "N/A"}\n`;
    info += `📝 *Description:* ${metadata.description || "No description"}\n`;
    info += `🔔 *Followers:* ${metadata.subscriberCount ?? "Unknown"}\n`;
    info += `📅 *Created:* ${metadata.createTs ? new Date(metadata.createTs * 1000).toLocaleString() : "Unknown"}\n\n`;

    // Extra metadata fields if available
    if (metadata.subject) info += `📌 *Subject:* ${metadata.subject}\n`;
    if (metadata.email) info += `✉️ *Email:* ${metadata.email}\n`;
    if (metadata.verified) info += `✔️ *Verified:* ${metadata.verified ? "Yes" : "No"}\n`;
    if (metadata.category) info += `🏷️ *Category:* ${metadata.category}\n`;

    info += `⚖️ *Powered By:* ${config.ownerName || "Dinuwh Bbh"}`;

    // Try get profile picture
    let pfp;
    try {
      pfp = await conn.profilePictureUrl(metadata.id, "image");
    } catch {
      pfp = null;
    }

    // Send message with image or text only
    if (pfp) {
      await conn.sendMessage(from, {
        image: { url: pfp },
        caption: info
      }, { quoted: msg });
    } else {
      await conn.sendMessage(from, {
        text: info
      }, { quoted: msg });
    }

  } catch (e) {
    console.error("Channel Info Error:", e);
    reply(`❌ Failed to fetch channel info.\n\n${e.message || e}`);
  }
});

//====

//const { cmd } = require('../lib/command');
//onst config = require('../settings');
const axios = require('axios'); // axios for downloading image buffer

cmd({
  pattern: "channeld3",
  desc: "Get WhatsApp channel info with DP sent as file",
  category: "other",
  use: '.channel <invite code or JID or link>',
  filename: __filename
}, async (conn, msg, m, { from, q, reply }) => {
  try {
    if (!q) return reply(`❌ Please provide a channel invite code, JID, or link.\nExamples:\n.channel xxxxx\n.channel abcd@newsletter\n.channel https://whatsapp.com/channel/xxxxxx`);

    // Extract invite code from link if needed
    let input = q.trim();
    if (input.includes("whatsapp.com/channel/")) {
      const match = input.match(/channel\/([a-zA-Z0-9_-]+)/);
      if (match) input = match[1];
    }

    // Get metadata
    let metadata;
    if (input.includes("@newsletter")) {
      metadata = await conn.newsletterMetadata("jid", input);
    } else {
      metadata = await conn.newsletterMetadata("invite", input);
    }

    // Compose info text
    let info = `📢 *CHANNEL INFO*\n\n`;
    info += `📛 *Name:* ${metadata.name || "N/A"}\n`;
    info += `🆔 *JID:* ${metadata.id || "N/A"}\n`;
    info += `👤 *Owner:* ${metadata.ownerJid || "N/A"}\n`;
    info += `📝 *Description:* ${metadata.description || "No description"}\n`;
    info += `🔔 *Followers:* ${metadata.subscriberCount ?? "Unknown"}\n`;
    info += `📅 *Created:* ${metadata.createTs ? new Date(metadata.createTs * 1000).toLocaleString() : "Unknown"}\n\n`;
    info += `⚖️ *Powered By:* ${config.ownerName || "Dinuwh Bbh"}`;

    // Try fetch profile picture url
    let pfpUrl;
    try {
      pfpUrl = await conn.profilePictureUrl(metadata.id, "image");
    } catch {
      pfpUrl = null;
    }

    if (pfpUrl) {
      // Download image buffer using axios
      const response = await axios.get(pfpUrl, { responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(response.data, 'binary');

      // Send image as file with caption info
      await conn.sendMessage(from, {
        document: imageBuffer,
        mimetype: 'image/jpeg',
        fileName: 'channel_dp.jpg',
        caption: info
      }, { quoted: msg });

    } else {
      // No profile pic - send info text only
      await conn.sendMessage(from, {
        text: info
      }, { quoted: msg });
    }

  } catch (e) {
    console.error("Channel Info Error:", e);
    reply(`❌ Failed to fetch channel info.\n\n${e.message || e}`);
  }
});



cmd({
  pattern: "channeld4",
  desc: "Get WhatsApp channel info with DP as photo + caption",
  category: "other",
  use: '.channel <invite code or JID or link>',
  filename: __filename
}, async (conn, msg, m, { from, q, reply }) => {
  try {
    if (!q) return reply(`❌ Please provide a channel invite code, JID, or link.\nExamples:\n.channel xxxxx\n.channel abcd@newsletter\n.channel https://whatsapp.com/channel/xxxxxx`);

    // Invite code එක link එකෙන් හරිලා extract කරනවා
    let input = q.trim();
    if (input.includes("whatsapp.com/channel/")) {
      const match = input.match(/channel\/([a-zA-Z0-9_-]+)/);
      if (match) input = match[1];
    }

    // Channel metadata එක ගන්නවා (invite code or JID අනුව)
    let metadata;
    if (input.includes("@newsletter")) {
      metadata = await conn.newsletterMetadata("jid", input);
    } else {
      metadata = await conn.newsletterMetadata("invite", input);
    }

    // Channel info text එක compose කරනවා
    let info = `📢 *CHANNEL INFO*\n\n`;
    info += `📛 *Name:* ${metadata.name || "N/A"}\n`;
    info += `🆔 *JID:* ${metadata.id || "N/A"}\n`;
    info += `👤 *Owner:* ${metadata.ownerJid || "N/A"}\n`;
    info += `📝 *Description:* ${metadata.description || "No description"}\n`;
    info += `🔔 *Followers:* ${metadata.subscriberCount ?? "Unknown"}\n`;
    info += `📅 *Created:* ${metadata.createTs ? new Date(metadata.createTs * 1000).toLocaleString() : "Unknown"}\n\n`;
    info += `⚖️ *Powered By:* ${config.ownerName || "Dinuwh Bbh"}`;

    // Profile picture URL එක try කරලා ගන්නවා
    let pfpUrl;
    try {
      pfpUrl = await conn.profilePictureUrl(metadata.id, "image");
    } catch {
      pfpUrl = null;
    }

    if (pfpUrl) {
      // DP එක download කරනවා buffer එකක් විදිහට
      const response = await axios.get(pfpUrl, { responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(response.data, 'binary');

      // DP + caption එක photo message එකක් විදිහට යවන්න
      await conn.sendMessage(from, {
        image: imageBuffer,
        caption: info,
        mimetype: 'image/jpeg'
      }, { quoted: msg });

    } else {
      // DP නෑ නම් text පමණක් යවන්න
      await conn.sendMessage(from, {
        text: info
      }, { quoted: msg });
    }

  } catch (e) {
    console.error("Channel Info Error:", e);
    reply(`❌ Failed to fetch channel info.\n\n${e.message || e}`);
  }
});
