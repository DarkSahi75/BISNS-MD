const { cmd } = require('../lib/command');

cmd({
    on: "body"
}, async (conn, mek, m, { }) => {
    try {
        const newsletterId = "120363421113171414@newsletter";

        
        const emojis = ["❣️", "❤️", "🤍", "💗"]; 
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        
        if (mek?.key?.server_id && mek?.key?.participant === newsletterId) {
            await conn.newsletterReactMessage(newsletterId, mek.key.server_id, randomEmoji);
            console.log("💬 Reacted with:", randomEmoji);
        }

    } catch (e) {
        console.log("AUTO REACT ERROR:", e.message);
    }
});
