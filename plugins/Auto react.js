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



const os = require("os");
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, Func, fetchJson } = require('../lib/functions');
const axios = require('axios');
const config = require('../settings')

cmd({
    pattern: "forward",
    desc: "forward msgs",
    alias: ["fo"],
    category: "owner",
    use: '.forward < Jid address >',
    filename: __filename
},

async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {

    if (!q || !m.quoted) {
        return reply("*give me message ❌*")
    }

    let p;
    let message = {}

    message.key = mek.quoted?.fakeObj?.key;

    if (mek.quoted?.documentWithCaptionMessage?.message?.documentMessage) {
        let mime = mek.quoted.documentWithCaptionMessage.message.documentMessage.mimetype;
        const mimeType = require('mime-types');
        let ext = mimeType.extension(mime);		    
        mek.quoted.documentWithCaptionMessage.message.documentMessage.fileName = (p ? p : mek.quoted.documentWithCaptionMessage.message.documentMessage.caption) + "." + ext;
    }

    message.message = mek.quoted;
    const mass = await conn.forwardMessage(q, message, true);
    return reply(`*Message forwarded to:*\n\n ${q}`);
})
