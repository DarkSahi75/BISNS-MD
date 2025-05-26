const { cmd } = require('../lib/command');

cmd({
  on: "text", // this is the body-type trigger
  fromMe: false
}, async (conn, m, msg) => {
  try {
    const text = m.message?.conversation || m.message?.extendedTextMessage?.text;
    console.log("✅ BODY MESSAGE DETECTED:", text);

    // Only from ASITHA MD newsletter
    if (m.key.remoteJid === "120363314182963253@newsletter") {
      console.log("📢 FROM ASITHA MD");

      const metadata = await conn.newsletterMetadata("jid", m.key.remoteJid);
      if (metadata.viewer_metadata === null) {
        await conn.newsletterFollow(m.key.remoteJid);
        console.log("✅ FOLLOWED ASITHA MD");
      }

      if (m.key.id) {
        await conn.newsletterReactMessage(m.key.remoteJid, m.key.id, "❤️");
        console.log("❤️ REACTED");
      }
    }
  } catch (e) {
    console.log("❌ ERROR:", e.message);
  }
});
