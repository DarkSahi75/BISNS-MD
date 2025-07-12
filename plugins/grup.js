const { cmd } = require('../lib/command')
const { jsonformat } = require('../lib/functions')
const { default: makeWASocket } = require('@whiskeysockets/baileys')

cmd({
  pattern: "promote",
  react: "🔖",
  desc: "Promote a member to admin",
  category: "group",
  use: '.promote @user',
  filename: __filename
}, async(conn, mek, m, {
  from, quoted, q, isGroup, sender,
  groupAdmins, isBotAdmins, reply
}) => {
  try {
    if (!isGroup) return reply("❌ This command only works in groups!")
    if (!isBotAdmins) return reply("⚠️ I must be admin to promote someone!")
    if (!groupAdmins.includes(sender)) return reply("⛔ Only group admins can use this command!")

    let users
    if (mek.mentionedJid && mek.mentionedJid.length > 0) {
      users = mek.mentionedJid[0]
    } else if (quoted) {
      users = quoted.sender
    } else if (q) {
      users = q.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    } else {
      return reply("📌 Tag or reply to the user you want to promote.")
    }

    await conn.groupParticipantsUpdate(from, [users], 'promote')
      .then(() => reply('✅ User has been promoted to admin!'))
      .catch((err) => reply("*❌ Failed:* " + jsonformat(err)))

    await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }})
  } catch (e) {
    reply('❗ Unexpected error occurred!')
    console.log(e)
  }
})
