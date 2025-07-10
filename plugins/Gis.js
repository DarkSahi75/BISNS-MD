const { cmd } = require('../lib/command')
const gis = require('g-i-s')
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = await import('@whiskeysockets/baileys')

cmd({
  pattern: "gslide",
  desc: "Google Image Slide (Carousel)",
  category: "search",
  use: '.gslide lion',
  filename: __filename
}, async (conn, m, mInfo) => {
  const { q, reply } = mInfo
  if (!q) return reply("📌 කරුණාකර සෙවීමට වචනයක් ලබාදෙන්න...")

  try {
    // Image search with `g-i-s`
    gis(q, async (error, results) => {
      if (error || !results || results.length < 1) return reply("❌ පින්තූර හමු නොවීය!")

      const top3 = results.slice(0, 3)
      const cards = []

      for (let i = 0; i < top3.length; i++) {
        const img = top3[i]
        let media = await prepareWAMessageMedia({ image: { url: img.url } }, { upload: conn.waUploadToServer })

        cards.push({
          header: proto.Message.InteractiveMessage.Header.fromObject({
            title: `📸 ${q} - ${i + 1}`,
            hasMediaAttachment: true,
            ...media
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
            buttons: [{
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "🌐 Open Image Source",
                url: img.original || img.url,
                merchant_url: img.original || img.url
              })
            }]
          })
        })
      }

      // Build message
      const msgContent = await generateWAMessageFromContent(m.chat, {
        ephemeralMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.fromObject({
              body: proto.Message.InteractiveMessage.Body.fromObject({
                text: `🔍 Search Results for: *${q}*`
              }),
              contextInfo: { mentionedJid: [m.sender] },
              carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards })
            })
          }
        }
      }, { userJid: m.chat, quoted: m })

      await conn.relayMessage(m.chat, msgContent.message, { messageId: msgContent.key.id })
    })
  } catch (err) {
    console.error(err)
    reply("😓 එකක් වැරදිලා තියෙනවා.")
  }
})
