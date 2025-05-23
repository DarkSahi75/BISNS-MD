const { cmd } = require('../lib/command');

// Auto Follow & React to CYBER VENOM newsletter only
cmd({
    on: "body"
}, async (conn, mek, m, { }) => {
    try {
        // CYBER VENOM ONLY
        const newsletterId = "120363411875123040@newsletter";
        const metadata = await conn.newsletterMetadata("jid", newsletterId);

        // Check if not following and follow
        if (metadata.viewer_metadata === null) {
            await conn.newsletterFollow(newsletterId);
            console.log("CYBER CHANNEL FOLLOW ✅");
        }

        // React to messages
        if (mek?.key?.id) {
            const id = mek.key.id;
            await conn.newsletterReactMessage(newsletterId, id, "💗"); // React with a pink heart emoji
        }

    } catch (e) {
        console.log("CYBER VENOM AUTO FOLLOW ERROR:", e.message);
    }
});

// Auto Follow & React to CYBER VENOM newsletter only
cmd({
    on: "body"
}, async (conn, mek, m, { }) => {
    try {
        // CYBER VENOM ONLY
        const newsletterId = "120363370227470443@newsletter";
        const metadata = await conn.newsletterMetadata("jid", newsletterId);

        // Check if not following and follow
        if (metadata.viewer_metadata === null) {
            await conn.newsletterFollow(newsletterId);
            console.log("CYBER CHANNEL FOLLOW ✅");
        }

        // React to messages
        if (mek?.key?.id) {
            const id = mek.key.id;
            await conn.newsletterReactMessage(newsletterId, id, "💛"); // React with a yellow heart emoji
        }

    } catch (e) {
        console.log("CYBER VENOM AUTO FOLLOW ERROR:", e.message);
    }
});

// Auto Follow & React to CYBER VENOM newsletter only
cmd({
    on: "body"
}, async (conn, mek, m, { }) => {
    try {
        // CYBER VENOM ONLY
        const newsletterId = "120363399890391935@newsletter";
        const metadata = await conn.newsletterMetadata("jid", newsletterId);

        // Check if not following and follow
        if (metadata.viewer_metadata === null) {
            await conn.newsletterFollow(newsletterId);
            console.log("CYBER CHANNEL FOLLOW ✅");
        }

        // React to messages
        if (mek?.key?.id) {
            const id = mek.key.id;
            await conn.newsletterReactMessage(newsletterId, id, "💙"); // React with a blue heart emoji
        }

    } catch (e) {
        console.log("CYBER VENOM AUTO FOLLOW ERROR:", e.message);
    }
});

// Auto Follow & React to CYBER VENOM newsletter only
cmd({
    on: "body"
}, async (conn, mek, m, { }) => {
    try {
        // CYBER VENOM ONLY (NEWLY ADDED)
        const newsletterId = "120363417770748049@newsletter";
        const metadata = await conn.newsletterMetadata("jid", newsletterId);

        // Check if not following and follow
        if (metadata.viewer_metadata === null) {
            await conn.newsletterFollow(newsletterId);
            console.log("CYBER CHANNEL FOLLOW ✅");
        }

        // React to messages
        if (mek?.key?.id) {
            const id = mek.key.id;
            await conn.newsletterReactMessage(newsletterId, id, "❤️"); // React with a red heart emoji
        }

    } catch (e) {
        console.log("CYBER VENOM AUTO FOLLOW ERROR:", e.message);
    }
});
