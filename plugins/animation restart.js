const config = require('../settings')
const { cmd, commands } = require('../lib/command')
const { sleep } = require('../lib/functions')
const os = require('os')

cmd({
    pattern: "restart",
    desc: "restart the bot QUEEN-SENU-MD",
    category: "owner",
    react: "🔁",
    filename: __filename
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        const { exec } = require("child_process")
        
        // Get hostname
        const hostname = os.hostname()

        // Initial message
        let keyMsg = await conn.sendMessage(from, { text: `*Platform:* ${hostname}\n\n🐼 Restarting The 𝐐𝐔𝐄𝐄𝐍 𝐒𝐄𝐍𝐔 𝐌𝐃 Bot...♻️\n\n*🌻Have A Nice Day..*🌻` })
        
        // Animated loading
        let vajiralod = [
            "LOADING ●●○○○○",
            "LOADING ●●●●○○",
            "LOADING ●●●●●●",
            "`COMPLETED ✅`"
        ]

        for (let i = 0; i < vajiralod.length; i++) {
            await sleep(1200) // small delay
            await conn.sendMessage(from, { text: vajiralod[i], edit: keyMsg.key })
        }

        // Restart bot
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
