const { cmd } = require('../lib/command');

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
