const config = require('../settings');
const prefix = config.PREFIX;
const { cmd } = require('../lib/command');

cmd({
  pattern: "𝙿𝚁𝙾𝙼𝙾𝚃𝙴-𝙼𝚈-𝙰𝙳𝙳🗣️❗",
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
      buttons: [
        { buttonId: prefix + '1hour', buttonText: { displayText: '📁 Want 1h Plan' }, type: 1 },
        { buttonId: prefix + '2hour', buttonText: { displayText: '📁 Want 2h Plan' }, type: 1 },
        { buttonId: prefix + '3hour', buttonText: { displayText: '📁 Want 3h Plan' }, type: 1 },
        { buttonId: prefix + '8hour', buttonText: { displayText: '📁 Want 8h (Night) Plan' }, type: 1 },
        { buttonId: prefix + 'gfull', buttonText: { displayText: '📁 Want Group Full Plan' }, type: 1 }
      ],
      headerType: 4,
      viewOnce: true
    }, { quoted: m });

  } catch (e) {
    await m.reply('*ERROR !!*');
    console.error(e);
  }
});

//පැය ප්ලැන් එක

cmd({
  pattern: "1hour",
  react: "🧚‍♂️",
  desc: "Render 1 Hour Promotion Plan",
  category: "main",
  use: '.render',
  filename: __filename
}, async (conn, m) => {
  try {
    const from = m.chat;
    const pushname = m.pushName || "User";

    const caption = `🕐 *1HOUR PLAN - NO UPDATES* 🔏

💸 _*PRICE:*_ *RS.300/=*

📌 *SPECIAL NOTE ❗* ⤵️

⭕ *සල්ලි දැමීමට පෙර අපට කෙටි පනිවිඩයක් දමා වෙලාවක් වෙන් කරගන්න..!!*  
⏰ *අදාල වේලාවන්:* _8.00 AM - 10.00 PM_

⚠️ *ප්‍රමෝශන් ඇඩ් එක්ක් දාගන්නවානම් පමණක් මෙතනින් එහා ඉදිරියට යන්න ☺️🪄*  
⚠️ *Proceed here only if you are placing a promotional ad ☺️🪄*`;

    await conn.sendMessage(from, {
      image: { url: "https://i.ibb.co/TDNMgMzX/5945.jpg" },
      caption: caption,
      buttons: [
        { buttonId: prefix + 'pay', buttonText: { displayText: '💳 HOW TO PAYMENT' }, type: 1 },
        { buttonId: prefix + '1hbuy', buttonText: { displayText: '🛒 BUY 1H PLAN' }, type: 1 }
      ],
      headerType: 4,
      viewOnce: true
    }, { quoted: m });

  } catch (e) {
    await m.reply('*ERROR !!*');
    console.error(e);
  }
});

//2hourplan

cmd({
  pattern: "2hour",
  react: "🧚‍♂️",
  desc: "Render 2 Hour Promo Plan",
  category: "main",
  use: '.2hour',
  filename: __filename
}, async (conn, m) => {
  try {
    const from = m.chat;
    const pushname = m.pushName || "User";

    const caption = `*2HOUR PLAN NO UPDATES 🔏*
    
* _*PRICE - RS.500*_

* SPECAIL NOTE ❗⤵️

*⭕සල්ලි දැමීමට පෙර අපට කෙටි පනිවිඩයක් දමා වෙලාවක් වෙන් කරගන්න..!!*

*⭕8.00 a.m - 10.00 p.m දක්වා කාලය තුල ඔබට වේලාවක් වෙන් කරගත හැකිය..!!*
      
⚠️ *ප්‍රමෝශන් ඇඩ් එක්ක් දාගන්නවානම් පමණක් මෙතනින් එහා ඉදිරියට යන්න ☺️🪄*  

⚠️ *Proceed here only if you are placing a promotional ad ☺️🪄*`;

    await conn.sendMessage(from, {
      image: { url: "https://i.ibb.co/TDNMgMzX/5945.jpg" },
      caption: caption,
      buttons: [
        { buttonId: prefix + 'pay', buttonText: { displayText: '📁 HOW TO PAYMENT' }, type: 1 },
        { buttonId: prefix + '2hbuy', buttonText: { displayText: '📁 BUY PLAN' }, type: 1 }
      ],
      headerType: 4,
      viewOnce: true
    }, { quoted: m });

  } catch (e) {
    await m.reply('*ERROR !!*');
    console.error(e);
  }
});

//3hourplan

cmd({
  pattern: "3hour",
  react: "🧚‍♂️",
  desc: "Render 3 Hour Promo Plan",
  category: "main",
  use: '.3hour',
  filename: __filename
}, async (conn, m) => {
  try {
    const from = m.chat;
    const pushname = m.pushName || "User";

    const caption = `*3HOUR PLAN NO UPDATES 🔏*
    
* _*PRICE - RS.800*_

* SPECAIL NOTE ❗⤵️

*⭕සල්ලි දැමීමට පෙර අපට කෙටි පනිවිඩයක් දමා වෙලාවක් වෙන් කරගන්න..!!*

*⭕ඔබට වේලාවක් වෙන් කරගත හැක්කේ \`8.00 a.m - 10.00 p.m\` අතරය..!!*
      
⚠️ *ප්‍රමෝශන් ඇඩ් එක්ක් දාගන්නවානම් පමණක් මෙතනින් එහා ඉදිරියට යන්න ☺️🪄*  

⚠️ *Proceed here only if you are placing a promotional ad ☺️🪄*`;

    await conn.sendMessage(from, {
      image: { url: "https://i.ibb.co/TDNMgMzX/5945.jpg" },
      caption: caption,
      buttons: [
        { buttonId: prefix + 'pay', buttonText: { displayText: '📁 HOW TO PAYMENT' }, type: 1 },
        { buttonId: prefix + '3hbuy', buttonText: { displayText: '📁 BUY PLAN' }, type: 1 }
      ],
      headerType: 4,
      viewOnce: true
    }, { quoted: m });

  } catch (e) {
    await m.reply('*ERROR !!*');
    console.error(e);
  }
});

//8hour plan

cmd({
  pattern: "8hour",
  react: "🧚‍♂️",
  desc: "Render 8 Hour Promo Plan",
  category: "main",
  use: '.8hour',
  filename: __filename
}, async (conn, m) => {
  try {
    const from = m.chat;
    const pushname = m.pushName || "User";

    const caption = `*🌙 8HOUR PLAN (FULL NIGHT) 🔏*

* _*PRICE - RS.1900*_

* SPECAIL NOTE ❗⤵️

*⭕ සල්ලි දැමීමට පෙර අපට කෙටි පනිවිඩයක් දමා වෙලාවක් වෙන් කරගන්න..!!*

*⭕ ඔබට වේලාවක් වෙන් කරගත හැක්කේ \`8.00 p.m - 8.00 a.m\` අතරය..!!*

⚠️ *ප්‍රමෝශන් ඇඩ් එක්ක් දාගන්නවානම් පමණක් මෙතනින් එහා ඉදිරියට යන්න ☺️🪄*  

⚠️ *Proceed here only if you are placing a promotional ad ☺️🪄*`;

    await conn.sendMessage(from, {
      image: { url: "https://i.ibb.co/TDNMgMzX/5945.jpg" },
      caption: caption,
      buttons: [
        { buttonId: prefix + 'pay', buttonText: { displayText: '📁 HOW TO PAYMENT' }, type: 1 },
        { buttonId: prefix + '8hbuy', buttonText: { displayText: '📁 BUY PLAN' }, type: 1 }
      ],
      headerType: 4,
      viewOnce: true
    }, { quoted: m });

  } catch (e) {
    await m.reply('*ERROR !!*');
    console.error(e);
  }
});

//gfull

cmd({
  pattern: "gfull",
  react: "🧚‍♂️",
  desc: "Render Group Full Promo Plan",
  category: "main",
  use: '.gfull',
  filename: __filename
}, async (conn, m) => {
  try {
    const from = m.chat;
    const pushname = m.pushName || "User";

    const caption = `*👥 GROUP FULL PLAN 🔏*
    
 _ඔයාට ඕනි ගෘප් එක ෆුල් කරලා දෙනවා👍_

* _*PRICE - RS.3500*_

* SPECAIL NOTE ❗⤵️

*⭕ සල්ලි දැමීමට පෙර අපට කෙටි පනිවිඩයක් දමා වෙලාවක් වෙන් කරගන්න..!!*

*⭕ ඔබට ඔබේ GROUP එක පුරා Promo එකක් දැමීමට අප හා සම්බන්ධ වන්න..!*

⚠️ *ප්‍රමෝශන් ඇඩ් එක්ක් දාගන්නවානම් පමණක් මෙතනින් එහා ඉදිරියට යන්න ☺️🪄*  

⚠️ *Proceed here only if you are placing a promotional ad ☺️🪄*`;

    await conn.sendMessage(from, {
      image: { url: "https://i.ibb.co/TDNMgMzX/5945.jpg" },
      caption: caption,
      buttons: [
        { buttonId: prefix + 'pay', buttonText: { displayText: '📁 HOW TO PAYMENT' }, type: 1 },
        { buttonId: prefix + 'gfullbuy', buttonText: { displayText: '📁 BUY PLAN' }, type: 1 }
      ],
      headerType: 4,
      viewOnce: true
    }, { quoted: m });

  } catch (e) {
    await m.reply('*ERROR !!*');
    console.error(e);
  }
});

