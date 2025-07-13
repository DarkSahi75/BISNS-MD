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





const { getContentType } = require('@whiskeysockets/baileys');

cmd({
    pattern: "forward",
    desc: "Forward any quoted message to target JID",
    alias: ["fo"],
    category: "owner",
    use: '.forward <jid> (quote any msg)',
    filename: __filename
}, async (conn, m, msg, { q, reply }) => {

    if (!q) return reply("🧾 *Provide the JID to forward to!*\n\n_Example:_ `.fo 947xxxxxxxx@s.whatsapp.net`");
    if (!m.quoted) return reply("💬 *Quote a message to forward!*");

    try {
        const quoted = m.quoted;

        // Check for fakeObj
        const forwardable = quoted.fakeObj;
        if (!forwardable) return reply("❌ *This message type cannot be forwarded.*");

        // Forward the message
        await conn.forwardMessage(q, forwardable, true);

        return reply(`✅ *Successfully forwarded to:* ${q}`);
    } catch (err) {
        console.error(err);
        return reply("⚠️ *Failed to forward message.*\n" + err.message);
    }
});
