const config = require('../settings');
const { cmd, commands } = require('../lib/command');

cmd({
  pattern: "ping",
  alias: "dinuping",
  desc: "Check bot's response time.",
  category: "main",
  use: ".ping",
  react: "🍂",
  filename: __filename
}, async (conn, mek, m, { from, pushname, reply }) => {
  try {
    // Get current date and time
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-CA'); // YYYY-MM-DD
    const timeStr = now.toLocaleTimeString('en-GB'); // HH:mm:ss

    // Send greeting message with name, date & time
    const infoMessage = await conn.sendMessage(from, { 
      text: `👋 *Hello ${pushname || 'Dinuwah'}!*\n\n📆 *Date:* ${dateStr}\n⏰ *Time:* ${timeStr}` 
    });

    // Measure ping
    const startTime = Date.now();
    await conn.sendMessage(from, { text: '> *PINGING...*' });
    const endTime = Date.now();
    const ping = endTime - startTime;

    // Send ping result quoted to info message
    await conn.sendMessage(from, { 
      text: `> *Dinuwah MD Speed:*\n\`🚫 ${ping} Ms 🚫 \`` 
    }, { quoted: infoMessage.key });

  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e}`);
  }
});
