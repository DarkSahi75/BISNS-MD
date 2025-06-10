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

    const caption = `𝙷𝙴𝚈 *" ${pushname} "* 🫣💗

🤖 I Am The Bezzz Channel Chat Bot!  
🛠️ MADE BY 𝙳𝙸 𝙽 𝚄 𝚆 𝙷 (728899640)

*му ραι∂ ρ𝚁σмσтιση ρ𝚁ι¢є ℓιѕт ⤵️*

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

    const listMessage = {
      title: "🪄 PROMO PLAN SELECTION",
      text: caption,
      footer: '𝗣𝗢𝗪𝗘𝗥𝗘𝗗 𝗕𝗬 𝙳𝙸 𝙽 𝚄 𝚆 𝙷 - 𝙼 𝙳',
      buttonText: "📋 Choose Plan",
      sections: [
        {
          title: "📁 Select a Promo Plan Below",
          rows: [
            {
              title: "1. 📁 Want 1 Hour Plan",
              rowId: prefix + '1hour'
            },
            {
              title: "2. 📁 Want 2 Hour Plan",
              rowId: prefix + '2hour'
            },
            {
              title: "3. 📁 Want 3 Hour Plan",
              rowId: prefix + '3hour'
            },
            {
              title: "4. 📁 Want 8H (Night) Plan",
              rowId: prefix + '8hour'
            },
            {
              title: "5. 📁 Want Group Full Plan",
              rowId: prefix + 'gfull'
            }
          ]
        }
      ]
    };

    await conn.sendMessage(from, listMessage, { quoted: m });

  } catch (e) {
    await m.reply('*ERROR !!*');
    console.error(e);
  }
});
