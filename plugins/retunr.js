const { cmd } = require('../lib/command');

cmd({
    pattern: "return",
    alias: ["ret"],
    desc: "Detect and resend text after 'return'",
    category: "fun",
    react: "🔄",
    filename: __filename
},
async (conn, m, { args, q, reply }) => {
    try {
        if (!q) return reply("⚠️ *කරුණාකර 'return' පස්සේ යමක් දාන්න!*");

        // return commandට පස්සේ තියෙන කොටස
        const text = q.trim();

        // ආයෙම send කරන්න
        await reply(`🔁 *Returned Text:* ${text}`);

    } catch (e) {
        console.log(e);
        reply("❌ Error while processing return command!");
    }
});
