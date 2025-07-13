const { getContentType } = require('@whiskeysockets/baileys')

module.exports = async (conn, m) => {
  try {
    if (!m.message || m.key.fromMe) return

    let type = getContentType(m.message)
    let body = (type === 'conversation') ? m.message.conversation
             : (type === 'extendedTextMessage') ? m.message.extendedTextMessage.text
             : ''
    if (!body.includes('https://whatsapp.com/channel/') || !body.includes(',')) return

    let [urlPart, categoryRaw] = body.split(',')
    if (!urlPart || !categoryRaw) return

    let matches = urlPart.match(/channel\/([a-zA-Z0-9]+)\/(\d+)/)
    if (!matches) return

    let jid = matches[1] + '@broadcast'
    let msgId = matches[2]
    let category = categoryRaw.trim().toLowerCase()

    // ✅ Emoji config right inside
    const emojiConfig = {
      heart: '❤️',
      like: '👍',
      fire: '🔥',
      laugh: '😂',
      sad: '😢',
      wow: '😮',
      angry: '😡',
      cry: '😭',
      clap: '👏',
      star: '⭐'
    }

    let emoji = emojiConfig[category]
    if (!emoji) return await conn.sendMessage(m.key.remoteJid, { text: `❌ Unknown category: *${category}*` }, { quoted: m })

    await conn.sendMessage(jid, {
      react: {
        text: emoji,
        key: {
          id: msgId,
          remoteJid: jid,
          fromMe: false
        }
      }
    })

    console.log(`[🎯 Auto Reacted] ${emoji} to ${urlPart}`)

  } catch (err) {
    console.error('[💥 CmdOnBody React Error]', err)
  }
}
