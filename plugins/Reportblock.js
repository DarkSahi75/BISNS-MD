const { cmd } = require("../lib/command"); // ඔබේ cmd wrapper එක මෙතනින්

cmd({
  pattern: "report",
  react: "🚫",
  desc: "Block and report a user (simulate report)",
  category: "admin",
  filename: __filename
}, async (conn, m, text, { q, reply }) => {
  const jid = q || m.quoted?.sender;
  if (!jid) return reply("⚠️ Report කරන්න user JID එකක් හෝ reply එකක් දෙන්න!");

  const targetJid = jid.includes("@s.whatsapp.net") ? jid : jid + "@s.whatsapp.net";

  try {
    // Block the user
    await conn.updateBlockStatus(targetJid, "block");

    // Simulate a report (send to owner log)
    const ownerJid = "9471XXXXXXX@s.whatsapp.net"; // <-- ඔබේ JID එක
    await conn.sendMessage(ownerJid, {
      text: `🚨 *Report Log*\n\n🧑‍💻 Reported: ${targetJid}\n👤 By: ${m.sender}`
    });

    await reply(`✅ *${targetJid}* blocked and reported!`);

  } catch (e) {
    console.error(e);
    reply("❌ Error occurred while blocking/reporting.");
  }
});
