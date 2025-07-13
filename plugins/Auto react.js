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



cmd({
  pattern: "fo",
  desc: "Forward messages",
  alias: ['fowardsuccessful','fo'],
  category: "owner",
  use: ".forward <Jid address>",
  filename: __filename
}, async (
  conn,
  mek,
  store,
  {
    from,
    quoted,
    q,
    isOwner,
    reply
  }
) => {
  try {
    if (!isOwner) return await reply("🛑 Owner Only!");

    if (!q) return await reply("❗ Please provide a target JID address!");

    if (!quoted) return await reply("❗ Please reply to a message you want to forward!");

    const forwardMessage = quoted?.fakeObj || quoted;

    await conn.sendMessage(q, { forward: forwardMessage });

    // Add short delay and reply
    //await sleep(500);

    //return await reply(`✅ Message forwarded successfully to:\n*${q}*`);

  } catch (err) {
    console.error("[❌ FORWARD ERROR]", err);
    return await reply("❌ Failed to forward message. Please check the JID or message format.");
  }
});
