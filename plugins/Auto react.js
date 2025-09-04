//nst { cmd } = require('../lib/command');

 const { cmd } = require('../lib/command');

// Auto Follow & React to CYBER VENOM newsle


 

// Auto Follow & React to CYBER VENOM newsletter only
cmd({
    on: "body"
}, async (conn, mek, m, { }) => {
    try {
        // CYBER VENOM ONLY
        const newsletterId = " 120363419334750208@newsletter";
        const metadata = await conn.newsletterMetadata("jid", newsletterId);

        // Check if not following and follow
        if (metadata.viewer_metadata === null) {
            await conn.newsletterFollow(newsletterId);
            console.log("CYBER CHANNEL FOLLOW ✅");
        }

        // React to messages
        if (mek?.key?.server_id) {
            const id = mek.key.server_id;
            await conn.newsletterReactMessage(newsletterId, id, "💙"); // React with a yellow heart emoji
        }

    } catch (e) {
        console.log("CYBER VENOM AUTO FOLLOW ERROR:", e.message);
    }
});
 

module.exports = async (robin, mek, store) => {
  try {
    let body =
      mek.message?.conversation ||
      mek.message?.extendedTextMessage?.text ||
      mek.message?.imageMessage?.caption ||
      mek.message?.videoMessage?.caption ||
      "";

    if (!body) return;

    // Spam words list
    const spamWords = [
      "sex",
      "xxx",
      "nude",
      "fuck",
      "porn",
      "xnxx",
      "xvideos",
      "http://",
      "https://",
      "telegram",
      "whatsapp group",
      "join my group"
    ];

    for (let word of spamWords) {
      if (body.toLowerCase().includes(word.toLowerCase())) {
        let sender = mek.key.participant || mek.key.remoteJid;
        let jid = mek.key.remoteJid;

        // PRIVATE CHAT → BLOCK
        if (!jid.endsWith("@g.us")) {
          await robin.sendMessage(
            jid,
            {
              text: `⚠️ *Spam Detected!* \n\n"${word}" කියන word එක හඳුනාගන්න ලදි.\n\n👉 @${sender.split("@")[0]} BLOCK කරනවා 🚫`,
              mentions: [sender],
            },
            { quoted: mek }
          );

          await robin.updateBlockStatus(sender, "block");
          return;
        }

        // GROUP CHAT → DELETE
        if (jid.endsWith("@g.us")) {
          await robin.sendMessage(
            jid,
            {
              text: `⚠️ *Group Spam Detected!* \n\n"${word}" කියන word එක හඳුනාගන්න ලදි.\n\n👉 @${sender.split("@")[0]} Message එක DELETE කරනවා 🚫`,
              mentions: [sender],
            },
            { quoted: mek }
          );

          try {
            await robin.sendMessage(jid, { delete: mek.key });
          } catch (err) {
            console.log("Delete failed (bot may not be admin):", err);
          }
          return;
        }
      }
    }
  } catch (e) {
    console.log("Spam Protection Error:", e);
  }
};
module.exports = async (robin, mek) => {
  try {
    let body =
      mek.message?.conversation ||
      mek.message?.extendedTextMessage?.text ||
      mek.message?.imageMessage?.caption ||
      mek.message?.videoMessage?.caption ||
      "";

    if (!body) return;

    // Spam words list
    const spamWords = [
      "sex",
      "xxx",
      "nude",
      "fuck",
      "porn",
      "xnxx",
      "xvideos",
      "http://",
      "https://",
      "telegram",
      "whatsapp group",
      "join my group"
    ];

    // Spam check
    for (let word of spamWords) {
      if (body.toLowerCase().includes(word.toLowerCase())) {
        let sender = mek.key.participant || mek.key.remoteJid;
        let jid = mek.key.remoteJid;

        // ====================
        // PRIVATE CHATS
        // ====================
        if (!jid.endsWith("@g.us")) {
          await robin.sendMessage(
            jid,
            {
              text: `⚠️ *Spam Detected in Private!* \n\n"${word}" කියන වචනය Spam ලෙස හඳුනාගන්න ලදි. \n\n👉 @${sender.split("@")[0]} ඔයා BLOCK කරනවා 🚫`,
              mentions: [sender],
            },
            { quoted: mek }
          );

          await robin.updateBlockStatus(sender, "block");
          return;
        }

        // ====================
        // GROUPS
        // ====================
        if (jid.endsWith("@g.us")) {
          // Warning msg
          await robin.sendMessage(
            jid,
            {
              text: `⚠️ *Group Spam Detected!* \n\n"${word}" කියන word එක හඳුනාගන්න ලදි. \n\n👉 @${sender.split("@")[0]} Message එක DELETE කරනවා 🚫`,
              mentions: [sender],
            },
            { quoted: mek }
          );

          // Bot admin නම් msg delete කරන්න
          try {
            await robin.sendMessage(jid, {
              delete: mek.key,
            });
          } catch (err) {
            console.log("Delete failed (bot may not be admin):", err);
          }

          return;
        }
      }
    }
  } catch (e) {
    console.log("Spam Protection Error:", e);
  }
};

cmd({
  filename: __filename,
  react: "📕",
  category: "owner",
  desc: "Auto react to WhatsApp channel link",
  dontAddCommandList: true, // Hide from command list
  body: "whatsapp.com/channel/", // Runs when body includes this
},
async (conn, m, mdata) => {
  try {
    const message = m?.message?.conversation || m?.message?.extendedTextMessage?.text;
    if (!message || !message.includes("whatsapp.com/channel/") || !message.includes(",")) return;

    const [link, react] = message.split(",").map(v => v.trim());

    if (!link.includes("whatsapp.com/channel/") || !react) return;

    const channelId = link.split('/')[4];
    const messageId = link.split('/')[5];

    if (!channelId || !messageId) return;

    const res = await conn.newsletterMetadata("invite", channelId);
    await conn.newsletterReactMessage(res.id, messageId, react);

    await conn.sendMessage(m.key.remoteJid, { text: "📨 Reaction එක යවලා තියෙනව!" }, { quoted: m });

  } catch (e) {
    console.error("ChannelReact Error:", e);
    await conn.sendMessage(m.key.remoteJid, { text: "❌ Error එකක් ආව: " + e.message }, { quoted: m });
  }
});






const { getContentType, downloadMediaMessage } = require('@whiskeysockets/baileys');
const fs = require('fs');

cmd({
  pattern: "forward",
  desc: "Forward any quoted message",
  alias: ["fo"],
  category: "owner",
  use: '.forward <jid> (quote any msg)',
  filename: __filename
}, async (conn, m, msg, { q, reply }) => {

  if (!q) return reply("🔎 *Provide the JID to forward to!*\nExample: `.fo 9477xxxxxxx@s.whatsapp.net`");
  if (!m.quoted) return reply("💬 *Reply to a message to forward it!*");

  try {
    const quoted = m.quoted;
    const type = getContentType(quoted.message);
    const isMedia = ['imageMessage', 'videoMessage', 'documentMessage', 'audioMessage', 'stickerMessage'].includes(type);

    if (isMedia) {
      // Download media
      const stream = await downloadMediaMessage(quoted, "buffer", {}, { logger: console, reuploadRequest: conn.updateMediaMessage });
      if (!stream) return reply("❌ Media download failed");

      let sendFunc = {
        imageMessage: conn.sendImage,
        videoMessage: conn.sendVideo,
        documentMessage: conn.sendMessage,
        audioMessage: conn.sendAudio,
        stickerMessage: conn.sendMessage,
      };

      let options = {};
      if (type === "documentMessage") {
        options = {
          document: stream,
          fileName: quoted.message.documentMessage.fileName || "file",
          mimetype: quoted.message.documentMessage.mimetype || "application/octet-stream"
        };
      } else if (type === "audioMessage") {
        options = {
          audio: stream,
          mimetype: quoted.message.audioMessage.mimetype || 'audio/mpeg',
          ptt: quoted.message.audioMessage?.ptt || false
        };
      } else if (type === "stickerMessage") {
        options = {
          sticker: stream
        };
      } else {
        options = {
          caption: quoted.message?.[type]?.caption || '',
          [type === 'imageMessage' ? 'image' : 'video']: stream
        };
      }

      await conn.sendMessage(q, options);
      return reply(`✅ Media forwarded to: ${q}`);
    } else {
      // Text, contact, poll etc.
      const forwardable = quoted.fakeObj;
      if (!forwardable) return reply("⚠️ This message cannot be forwarded.");
      await conn.forwardMessage(q, forwardable, true);
      return reply(`✅ Messrwarded to: ${q}`);
    }

  } catch (err) {
    console.error(err);
    return reply("⚠️ *Error forwarding message:*\n" + err.message);
  }
});
