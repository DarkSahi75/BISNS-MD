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

    const cap = `𝙷𝙴𝚈 *" ${pushname} "* 🫣💗

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
⚠️ *Proceed here only if you are placing a promotional ad ☺️🪄*`;

    const sections = [
      {
        title: "📋 Choose Your Command Menu Below",
        rows: [
          { title: "1. Downloader Menu", rowId: prefix + 'downmenu', description: 'Download-related commands' },
          { title: "2. Search Menu", rowId: prefix + 'searchmenu', description: 'Search-related commands' },
          { title: "3. Convert Menu", rowId: prefix + 'convertmenu', description: 'Convert tools' },
          { title: "4. Logo Menu", rowId: prefix + 'logomenu', description: 'Stylish logo generators' },
          { title: "5. Main Menu", rowId: prefix + 'mainmenu', description: 'Main system commands' },
          { title: "6. Group Menu", rowId: prefix + 'groupmenu', description: 'Group management' },
          { title: "7. Bug Menu", rowId: prefix + 'bugmenu', description: 'Bug report tools' },
          { title: "8. Movie Menu", rowId: prefix + 'moviemenu', description: 'Movie and series tools' },
          { title: "9. Other Menu", rowId: prefix + 'othermenu', description: 'Other helpful features' }
        ]
      }
    ];

    const listMessage = {
  caption: 'cap', // <-- FIXED HERE
  footer: '⚡ POWERED BY DINUWH MD ⚡',
  title: '💸 PROMOTION PLANS',
  buttonText: '🧾 CLICK TO SEE COMMANDS',
  sections,
  image: { url: 'https://i.ibb.co/TDNMgMzX/5945.jpg' } // Image is okay here
};

    await conn.sendMessage(from, listMessage, { quoted: m });

  } catch (e) {
    console.error(e);
    await m.reply('❌ *ERROR SENDING LIST MESSAGE!*');
  }
});
