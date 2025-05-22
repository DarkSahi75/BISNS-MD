const config = require('../settings');
const prefix = config.PREFIX;
const { cmd } = require('../lib/command');

cmd({
  pattern: "ytpro",
  react: "⚡",
  alias: ["online", "bot", "test"],
  desc: "Check if bot is alive",
  category: "main",
  use: '.ytpro',
  filename: __filename
}, async (conn, m) => {
  try {
    const from = m.chat;
    const caption = `_✨ *YouTube Premium — Unlimited Entertainment Without Limits!*_

*©YouTube Premiume Feture ⤵️*

> ✔️ Ad-Free Experience – දැන් Video එකක් බලද්දි ඇඩ් වැටෙන්නෙ නෑ  

> ✔️ Background Play – තවත් apps පාවිච්චි කරද්දිත් music, videos play වෙයි  

> ✔️ Download Videos – Offline වලට ඔබේ ප්‍රියතම content එක save කරගන්න  

> ✔️ YouTube Music Premium – Extra එකක් විදිහට Music player එකක්  

> ✔️ Picture-in-Picture Mode – Mini screen එකෙන් බලන්න පුලුවන්

──────────────
*© Specail Note ...❗⤵️*

> _YouTube Premium LIFE TIME (APK එකක් නමුත් අලුතින් එන හැම update එකක්ම කිසි වෙනසක් නැතුව ඔටෝම හම්බෙනවා)_

> 🔥 *මේකට හැබයි updates ගන්නනම් ඔයා telegram වල ඉන්න ඕනි...*

*ඇයි අපෙන් ගන්න ඕනෙ?*

> ✅ Trusted Seller  

> ✅ Lowest Price Guarantee  

> ✅ 100% Safe | Trusted Service

*BUY NOW ⤵️ Only Rs.300 /= Life Time*`;

    await conn.sendMessage(from, {
      image: { url: "https://i.ibb.co/hx5jvBRR/4566.jpg" },
      caption,
      buttons: [
        { buttonId: prefix + 'payment', buttonText: { displayText: 'HOW TO PAY' }, type: 1 },
        { buttonId: prefix + 'start', buttonText: { displayText: 'RESTART' }, type: 1 }
      ],
      headerType: 4,
      viewOnce: true
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    await m.reply('*ERROR !! Something went wrong.*');
  }
});