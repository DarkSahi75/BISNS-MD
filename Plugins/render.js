const config = require('../settings');
const prefix = config.PREFIX;
const { cmd } = require('../lib/command');

cmd({
  pattern: "render",
  react: "⚡",
  alias: ["renderfree", "rfree", "freehost"],
  desc: "Render Free Hosting Plan info",
  category: "main",
  use: '.render',
  filename: __filename
}, async (conn, m) => {
  try {
    const from = m.chat;
    const caption = `_✨ *Render Free Plan — Deploy Your Bots & Projects for Free!*_

*©WHAT IS RENDER?* ⤵️

> *Render කියන්නේ  Hosting Platform එකක්. ඔබට අවශ්‍ය Bot එකක්, API එකක්, Web App එකක් හෝ Backend එකක්* deploy කරන්න පුළුවන් 

──────────────

*©RENDER FREE PLAN FETURE* ⤵️

> ✔️ Build from GitHub Repo  

> ✔️ Node.js, Python, Go, PHP Support  

> ✔️ Free SSL Certificates (https://)  

> ✔️ Global Fast CDN + PostgreSQL DB

> ✔️ No Account Suspend Unlimited Run Time

> ✔️ *ඔබගේ WhatsApp Bot උනත් හෙරොකු වලට සාපේක්ශව ස්පීඩ් එකක් ගන්න පුලුවන්...*

_🔥 Buy කරාට පසුව Render එකේ Deploy කරද්දි ඔබට ගැටළු තියෙනවා නම් අපි Support කරන්නම්..!_

──────────────

*RS. 200/= Full Guide & Setup Support ⤵️*`;

    await conn.sendMessage(from, {
      image: { url: "https://i.ibb.co/VWM2sQzV/2533.jpg" },
      caption: caption,
      buttons: [
        { buttonId: prefix + 'payment', buttonText: { displayText: 'HOW TO PAY' }, type: 1 },
        { buttonId: prefix + 'start', buttonText: { displayText: 'RESTART' }, type: 1 }
      ],
      headerType: 4,
      viewOnce: true
    }, { quoted: m });

  } catch (e) {
    await m.reply('*ERROR !!*');
    console.error(e);
  }
});