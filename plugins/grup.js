const { cmd } = require('../lib/command');
const { jsonformat } = require('../lib/functions');
const { default: makeWASocket } = require('@whiskeysockets/baileys');

cmd({
    pattern: "promote",
    react: "🔖",
    desc: "Promote yourself to admin (if bot is admin)",
    category: "group",
    use: '.promote',
    filename: __filename
}, async (conn, mek, m, {
    from, sender, isGroup, isBotAdmins, reply
}) => {
    try {
        if (!isGroup) return reply("🚫 *This command only works in groups!*");
        if (!isBotAdmins) return reply("❌ *Bot must be admin to promote someone!*");

        // promote the sender (the person who typed the command)
        await conn.groupParticipantsUpdate(from, [sender], 'promote')
            .then(() => reply(`✅ @${sender.split("@")[0]} is now a group admin!`), {
                mentions: [sender]
            })
            .catch((err) => reply("❌ *Failed:* " + jsonformat(err)));

        await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }});
    } catch (e) {
        reply('⚠️ *Unexpected error occurred!*');
        console.log(e);
    }
});
