
const { cmd } = require('../lib/command');

// THIS IS A REAL BODY-TYPE MESSAGE DETECTOR PLUGIN
cmd({
  on: "text", // this is the 'body' type trigger
  fromMe: false
}, async (conn, m, msg, { }) => {
  try {
    const newsletterId = "120363417770748049@newsletter";
    
    // Check if message from that specific newsletter
    if (m.key.remoteJid !== newsletterId) return;

    const metadata = await conn.newsletterMetadata("jid", newsletterId);
    if (metadata.viewer_metadata === null) {
      await conn.newsletterFollow(newsletterId);
      console.log("✅ FOLLOWED: ASITHA MD");
    }

    const id = m.key.id || m.key.server_id;
    if (id) {
      await conn.newsletterReactMessage(newsletterId, id, "❤️");
      console.log(`❤️ Reacted to ASITHA MD msg ${id}`);
    }

  } catch (e) {
    console.log("❌ ASITHA MD BODY-TYPE ERROR:", e.message);
  }
});
