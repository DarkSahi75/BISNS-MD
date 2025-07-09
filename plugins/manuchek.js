const { cmd } = require('../lib/command'); // cmd function එක import
const { default: makeWASocket, useSingleFileAuthState } = require('@whiskeysockets/baileys'); // බොට් base එකට අනුව
const fs = require('fs'); // File handling (අවශ්‍ය නම්)
const axios = require('axios'); // image URLs check කරන්න (ඔනි නම්)

cmd({
    pattern: "system",
    react: "🧬",
    desc: "Check bot online or no.",
    category: "other",
    use: '.alive',
    filename: __filename
}, async (conn, mek, m, { from, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const sssf = `*┌─────────────────────────────*
*└─────────────────────────────*`;
        
        
const buttons = [
  { buttonId: `${prefix}ping`, buttonText: { displayText: 'PING 📌' }, type: 1 },
  { buttonId: `${prefix}system`, buttonText: { displayText: 'SYSTEM ⭐' }, type: 1 }
]

const buttonMessage = {
    image: { url: "https://telegra.ph/file/49e1bb852fe8292c2614a.jpg" }, // image: buffer or path
    caption: sssf,
    footer: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - :*`,
    buttons,
    headerType: 1,
    viewOnce: true
}

return await conn.sendMessage(from, buttonMessage, { quoted: mek })
        

    } catch (e) {
        reply(`${e}`);
        console.log(e);
    }
});
