const config = require('../settings');
const prefix = config.PREFIX;
const { cmd } = require('../lib/command');

cmd({
  pattern: "PAIDHUTTO",
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

    await conn.sendMessage(from, {
      image: { url: "https://i.ibb.co/TDNMgMzX/5945.jpg" },
      caption: caption,
      footer: "🧾 Choose a Plan Below 👇",
      listMessage: {
        title: "💼 Promotion Plan Menu",
        description: "📢 Select your preferred ad plan",
        buttonText: "📑 View Plans",
        sections: [
          {
            title: "🕐 Hourly Plans",
            rows: [
              { title: "📁 1 Hour Plan", rowId: prefix + "1hour", description: "Rs. 300 - Basic promo" },
              { title: "📁 2 Hour Plan", rowId: prefix + "2hour", description: "Rs. 500 - Better visibility" },
              { title: "📁 3 Hour Plan", rowId: prefix + "3hour", description: "Rs. 800 - High reach" }
            ]
          },
          {
            title: "🌙 Night & Group Plans",
            rows: [
              { title: "🌙 8 Hour Full Night", rowId: prefix + "8hour", description: "Rs. 1900 - Overnight promo" },
              { title: "👥 Group Full Plan", rowId: prefix + "gfull", description: "Rs. 3500 - Flood group views" }
            ]
          }
        ]
      },
      viewOnce: true
    }, { quoted: m });

  } catch (e) {
    await m.reply('*ERROR ❗ Something went wrong*');
    console.error(e);
  }
});
