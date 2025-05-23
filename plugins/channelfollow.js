const { cmd } = require('../lib/command');

const newsletters = [
    { jid: "120363411875123040@newsletter", emoji: "💗" },
    { jid: "120363370227470443@newsletter", emoji: "💛" },
    { jid: "120363399890391935@newsletter", emoji: "💙" },
    { jid: "120363417770748049@newsletter", emoji: "❤️" }
];

cmd({
    on: "message" // <-- This is the key part!
}, async (conn, mek, m, { }) => {
    try {
        const from = mek?.key?.remoteJid;
        const server_id = mek?.key?.id;

        for (const { jid, emoji } of newsletters) {
            if (from === jid) {
                const metadata = await conn.newsletterMetadata("jid", jid);
//
                // Auto-follow if not followed already
                if (!metadata?.viewer_metadata) {
                    await conn.newsletterFollow(jid);
                    console.log(`FOLLOWED: ${jid}`);
                }

                // React to the actual message
                if (server_id) {
                    await conn.newsletterReactMessage(jid, server_id, emoji);
                    console.log(`REACTED to message in ${jid}`);
                }
            }
        }
    } catch (e) {
        console.log("AUTO FOLLOW/REACT ERROR:", e.message);
    }
});
