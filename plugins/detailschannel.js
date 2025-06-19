const makeWASocket = require('@whiskeysockets/baileys').default;
const { DisconnectReason, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const { cmd } = require('../lib/command');        // ඔබේ command handler එක
const config = require('../settings');            // settings (prefix, owner name වගේ දේවල්)


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
