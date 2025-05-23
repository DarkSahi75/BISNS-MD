const { cmd } = require('../lib/command');

const newsletters = [
    { jid: "120363411875123040@newsletter", emoji: "💗" },
    { jid: "120363370227470443@newsletter", emoji: "💛" },
    { jid: "120363399890391935@newsletter", emoji: "💙" },
    { jid: "120363417770748049@newsletter", emoji: "❤️" } // නව ID එක
];

cmd({
    on: "body"
}, async (conn, mek, m, { }) => {
    try {
        for (const { jid, emoji } of newsletters) {
            const metadata = await conn.newsletterMetadata("jid", jid);

            if (metadata.viewer_metadata === null) {
                await conn.newsletterFollow(jid);
                console.log(`FOLLOWED: ${jid}`);
            }

            if (mek?.key?.server_id) {
                const id = mek.key.server_id;
                await conn.newsletterReactMessage(jid, id, emoji);
            }
        }
    } catch (e) {
        console.log("AUTO FOLLOW ERROR:", e.message);
    }
});
