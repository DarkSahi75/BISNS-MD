const config = require('../settings');
const prefix = config.PREFIX;
const { cmd } = require('../lib/command');

cmd({
  pattern: "ttpro",
  react: "⚡",
  alias: ["tiktok", "tt", "premium"],
  desc: "TikTok Premium info",
  category: "main",
  use: '.ttpro',
  filename: __filename
}, async (conn, m) => {
  try {
    const from = m.chat;
    const caption = `✨ *TikTok Premium — Unlock All Features & Boost Experience!*

*©TikTok Premium Feture ⤵️*

> ✔️ No Watermark – Video Download කරන්නෙ Clean version එක  

> ✔️ Ad-Free Experience – Scroll කරන්නෙ අඩු නැතිව  

> ✔️ Region Unlock – කිසිම limit එකක් නැතුව හැම video එකම බලන්න පුළුවන්  

> ✔️ Trending Boost – FYP reach වැඩි කරලා  

> *වට්සැප් චැනල් කරන අයට වෝටර්මාක් නැතුව ඔනිම පොස්ට් එකක් ගන්න පුලුවන් විශේෂයෙන්ම*

*©Specail Note ...❗⤵️*

> _අකවුන්ට් එකටවත් කිසි දෙකටවත් කිසිම දෙයක් වෙන්නෑ කියලා 100% Sure_

> 🔥 *මේකට updates ගන්නනම් ඔයාට telegram එකේ support channel එක ඕනේ...*

*ඇයි අපෙන් ගන්න ඕනෙ?*

> ✅ Trusted Seller  

> ✅ Low Cost & Quick Delivery  

> ✅ 100% Safe | Trusted Service


*BUY NOW ⤵️ Only Rs.300 /= Life Time*`;

    await conn.sendMessage(from, {
      image: { url: "https://i.ibb.co/YHS5W1S/8825.jpg" },
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