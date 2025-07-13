const { cmd } = require('../lib/command');

// Emoji Config
const Config = {
    heart: "💗",
    fire: "🔥",
    cool: "😎",
    top: "💯",
    sad: "🥺"
};

// Default emoji if none specified
const DEFAULT_EMOJI = "💗";

cmd({
    on: "body"  // This listens to inbox/incoming messages
}, async (conn, mek, m, { }) => {
    try {
        const text = m.text || "";
        const fromUser = mek.key.remoteJid;

        // Match the link and optional emoji category
        const match = text.match(/https:\/\/whatsapp\.com\/channel\/([^/]+)\/(\d+)(?:,(\w+))?/);
        if (!match) return;

        const channelId = match[1];
        const messageId = match[2];
        const category = match[3];

        const newsletterJID = `${channelId}@newsletter`;
        const emoji = category ? (Config[category.toLowerCase()] || DEFAULT_EMOJI) : DEFAULT_EMOJI;

        // Send the reaction
        await conn.newsletterReactMessage(newsletterJID, messageId, emoji);
        console.log(`✅ Reacted with ${emoji} to message ${messageId} in ${newsletterJID}`);

        // Optional: reply to confirm
        await conn.sendMessage(fromUser, { text: `💬 Reacted to ${messageId} in ${channelId} with ${emoji}` });

    } catch (e) {
        console.log("❌ INBOX LINK REACT ERROR:", e.message);
    }
});
