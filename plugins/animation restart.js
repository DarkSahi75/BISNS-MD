const { cmd } = require('../lib/command')
const { sleep } = require('../lib/functions')
const os = require('os')
const { exec } = require("child_process")
const { config } = require("../settings")
const PREFIX = config.PREFIX
cmd({
    pattern: "rrrt",
    desc: "Restart the bot QUEEN-SENU-MD",
    category: "owner",
    react: "🥺",
    filename: __filename
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        const hostname = os.hostname()

        // Send initial message and capture key for edit
        let keyMsg = await conn.sendMessage(from, { 
            text: `*Platform:* ${hostname}\n\n🐼 Restarting The 𝐐𝐔𝐄𝐄𝐍 𝐒𝐄𝐍𝐔 𝐌𝐃 Bot...♻️\n\n*🌻Have A Nice Day..*🌻`
        })

        // Loading animation
        let vajiralod = [
            "LOADING ●●○○○○",
            "LOADING ●●●●○○",
            "LOADING ●●●●●●",
            "`COMPLETED ✅`"
        ]

        for (let i = 0; i < vajiralod.length; i++) {
            await sleep(1200) // 1.2 second delay per frame
            await conn.sendMessage(from, { text: vajiralod[i], edit: keyMsg.key })
        }

        // Wait 1 second before restart to ensure user sees final message
        await sleep(1000)

        // Restart the bot using PM2 AFTER message is fully sent
        exec("pm2 restart all", (err, stdout, stderr) => {
            if (err) {
                console.log(err)
                reply(`❌ Error: ${err.message}`)
            }
        })

    } catch (e) {
        console.log(e)
        reply(`❌ Error: ${e}`)
    }
})



cmd({
    pattern: "restart",
    desc: "Check if the bot is alive with animated message",
    category: "info",
    react: "💫",
    filename: __filename
},
async (conn, mek, m, { from }) => {
    try {
        const hostname = os.hostname()

        // Initial message
        let keyMsg = await conn.sendMessage(from, { 
            text: `🐼 Checking The 𝐐𝐔𝐄𝐄𝐍 𝐒𝐄𝐍𝐔 𝐌𝐃 Bot Status...\n\n*Platform:* ${hostname}`
        })

        // Animated sequence
        let aliveAnim = [
            `${PREFIX}rrrt`, // fixed template string
            "🟢 BOT STATUS: LOADING ●●○○○○",
            "🟢 BOT STATUS: LOADING ●●●●○○",
            "🟢 BOT STATUS: LOADING ●●●●●●",
            "✅ BOT STATUS: ONLINE AND ACTIVE"
        ]

        for (let i = 0; i < aliveAnim.length; i++) {
            await sleep(1200) // 1.2 sec delay per frame
            await conn.sendMessage(from, { text: aliveAnim[i], edit: keyMsg.key })
        }

        // Final detailed alive message
        let finalMsg = `
💻 *Bot:* 𝐐𝐔𝐄𝐄𝐍 𝐒𝐄𝐍𝐔 𝐌𝐃
🟢 *Status:* Online
🌐 *Platform:* ${hostname}
🎵 *Features:* 100+ Commands, Logo, Thumbnail, Banner Maker, AI Chatbot
🌸 *Message:* Have a Nice Day!`
        
        await conn.sendMessage(from, { text: finalMsg, edit: keyMsg.key })

    } catch (e) {
        console.log(e)
        await conn.sendMessage(from, { text: `❌ Error: ${e}` })
    }
})
