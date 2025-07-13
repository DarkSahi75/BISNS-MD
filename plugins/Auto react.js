const { cmd } = require('../lib/command');

// Define emoji config
const Config = {
    heart: "💗",
    fire: "🔥",
    cool: "😎",
    top: "💯",
    sad: "🥺"
};

cmd({
    on: "body"
}, async (conn, mek, m, { }) => {
    try {
        const text = m.text || "";

        // Match the pattern in message body
        const match = text.match(/https:\/\/whatsapp\.com\/channel\/([^/]+)\/(\d+),(\w+)/);
        if (!match) return;

        const channelId = match[1]; // raw ID
        const messageId = match[2]; // message number
        const category = match[3]; // emoji category name

        const newsletterJID = `${channelId}@newsletter`; // construct JID
        const emoji = Config[category.toLowerCase()]; // get emoji

        if (!emoji) return console.log("⛔ Invalid emoji category");

        // Send only the react, no follow
        await conn.newsletterReactMessage(newsletterJID, messageId, emoji);
        console.log(`✅ Reacted with ${emoji} to message ${messageId} in ${newsletterJID}`);

    } catch (e) {
        console.log("❌ AUTO LINK REACT ERROR:", e.message);
    }
});
