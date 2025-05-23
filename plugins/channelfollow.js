const { cmd } = require('../lib/command');

cmd({
  on: "body"
}, async (conn, mek, m, { }) => {
  try {
    const newsletterId = "120363417770748049@newsletter";

    // Only run if the message came from the newsletter itself
    if (mek?.key?.remoteJid !== newsletterId) return;

    // Follow the channel if not already
    const metadata = await conn.newsletterMetadata("jid", newsletterId);
    if (metadata?.viewer_metadata === null) {
      await conn.newsletterFollow(newsletterId);
      console.log("CYBER CHANNEL FOLLOW ✅");
    }

    // React only to messages from that channel
    const msgId = mek?.key?.id;
    if (msgId) {
      await conn.newsletterReactMessage(newsletterId, msgId, "💗");
      console.log("CYBER CHANNEL REACTED 💗");
    }

  } catch (e) {
    console.log("CYBER VENOM AUTO FOLLOW ERROR:", e.message);
  }
});
