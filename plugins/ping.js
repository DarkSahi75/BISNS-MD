const config = require('../settings')
const { cmd, commands } = require('../lib/command')

// Define the ping command
cmd({
    pattern: "ping",
    desc: "Check bot's response time.",
    category: "main",
    react: "✅",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // Start timer to calculate ping
        const startTime = Date.now()

        // Send initial message
        const message = await conn.sendMessage(from, { text: '> *Wait for a small time, Im counting bot responses.*' })

        // End timer and calculate ping
        const endTime = Date.now()
        const ping = endTime - startTime

        // Send the calculated ping time
        await conn.sendMessage(from, { text: `> *☊ 𝙳𝙸𝙽𝚄𝚆-𝙿𝙸𝙽𝙶-𝙸𝚂 ☊* : ${ping}ms` }, { quoted: message })
    } catch (e) {
        // Log any errors to the console and reply with error message
        console.log(e)
        reply(`Error: ${e.message}`)
    }
})
