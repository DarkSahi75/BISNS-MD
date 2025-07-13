const { cmd } = require('../lib/command');
const { getContentType } = require('@whiskeysockets/baileys')

conn.ev.on('messages.upsert', async (mek) => {
  try {
    let m = mek.messages[0]
    if (!m.message) return
    if (m.key.fromMe) return

    let type = getContentType(m.message)
    let body = (type === 'conversation') ? m.message.conversation
             : (type === 'extendedTextMessage') ? m.message.extendedTextMessage.text
             : ''

    // 👉 check for valid format
    if (!body.includes('https://whatsapp.com/channel/') || !body.includes(',')) return

    let [urlPart, categoryRaw] = body.split(',')  
    if (!urlPart || !categoryRaw) return

    // 👉 parse link
    let matches = urlPart.match(/channel\/([a-zA-Z0-9]+)\/(\d+)/)
    if (!matches) return

    let jid = matches[1] + '@broadcast'
    let msgId = matches[2]
    let category = categoryRaw.trim().toLowerCase()

    // 👉 category => emoji mapping (local config)
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
      star: '⭐',
    }

    let emoji = emojiConfig[category]
    if (!emoji) return await conn.sendMessage(m.key.remoteJid, { text: `❌ Unknown category: *${category}*` }, { quoted: m })

    // 👉 send reaction
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

    console.log(`[✅ Reacted] ${emoji} => ${urlPart}`)

  } catch (err) {
    console.error('[❌ Auto-React Error]:', err)
  }
})
