const config = require('../settings');
const prefix = config.PREFIX;
const { cmd } = require('../lib/command');

cmd({
  pattern: "𝙿𝚁𝙾𝙼𝙾𝚃𝙴-𝙼𝚈-𝙰𝙳𝙳",
  react: "🧚‍♂️",
  desc: "Render Paid Promotion Plans",
  category: "main",
  use: '.render',
  filename: __filename
}, async (conn, m) => {
  try {
    const from = m.chat;
    const pushname = m.pushName || "User";

    const text = `𝙷𝙴𝚈 *" ${pushname} "* 🫣💗

🤖 I Am The Bezzz Channel Chat Bot!  
🛠️ MADE BY 𝙳𝙸 𝙽 𝚄 𝚆 𝙷 (728899640)

*μү ραі∂ ρяσмσтιση ρяι¢є ℓιѕт ⤵️*

⏰ *1 Hour* :- _RS 300/=_
⏰ *2 Hour* :- _RS 500/=_
⏰ *3 Hour* :- _RS 800/=_
🌙 *8 Hour (Full Night)* :- _RS 1900/=_
👥 *GROUP FULL* :- _Rs 3500/_

🔗 *C̲H̲A̲N̲N̲E̲L̲ L̲I̲N̲K̲ ❗* :-  
https://whatsapp.com/channel/0029VazV7oYBVJl03iU3au1a

📊 *F͟O͟L͟L͟O͟W͟E͟R͟S͟ C͟O͟U͟N͟T͟:* 17k+ ❗

⚠️ *ප්‍රමෝශන් ඇඩ් එක්ක් දාගන්නවානම් පමණක් මෙතනින් එහා ඉදිරියට යන්න ☺️🪄*  
⚠️ *Proceed here only if you are placing a promotional ad ☺️🪄*
`;

    const sections = [
      {
        title: "📋 Select Option Below",
        rows: [
          { title: "1. Menu 📜", rowId: prefix + 'menu', description: '📌 COMMANDS MENU' },
          { title: "2. Ping 📶", rowId: prefix + 'ping', description: '⚡ VAJIRA-MD SPEED' }
        ]
      }
    ];

    const listMessage = {
      text: text,
      footer: '🔥 POWERED BY DINUWH MD 🔥',
      title: '💸 PROMOTION PLANS',
      buttonText: '🧾 CLICK TO SEE OPTIONS',
      sections: sections
    };

    await conn.sendMessage(from, listMessage, { quoted: m });

  } catch (e) {
    console.error(e);
    await m.reply('*❌ ERROR occurred while sending list!*');
  }
});
