const { cmd } = require('../lib/command');

cmd({
  on: "body"
}, async (conn, mek, m, { }) => {
  try {
    const newsletterId = "120363417770748049@newsletter";

    if (mek?.key?.remoteJid !== newsletterId) return;

    const metadata = await conn.newsletterMetadata("jid", newsletterId);
    if (!metadata?.viewer_metadata) {
      await conn.newsletterFollow(newsletterId);
      console.log("FOLLOWED CYBER VENOM NEWSLETTER ✅");
    }

    const msgId = mek?.key?.id;
    if (msgId) {
      // DEBUG LOG
      console.log("Attempting to react to message:", msgId);

      // Try react
      await conn.newsletterReactMessage(newsletterId, msgId, "💗");
      console.log("REACTION SUCCESS 💗");
    }

  } catch (e) {
    console.log("CYBER VENOM AUTO FOLLOW ERROR:", e.message);
  }
});
