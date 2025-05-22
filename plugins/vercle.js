const config = require('../settings');
const prefix = config.PREFIX;
const { cmd } = require('../lib/command');

cmd({
  pattern: "vercel",
  react: "📂",
  //alias: ["tiktok", "tt", "premium"],
  desc: "TikTok Premium info",
  category: "main",
  use: '.ttpro',
  filename: __filename
}, async (conn, m) => {
  try {
    const from = m.chat;
    const caption = ` *Vercel Free Plan — Effortless Deployment for Developers!*

> *Vercel කියන්නේ Modern Web Applications වලට සුපිරියෙන් Fast Hosting Solution එකක්.*

──────────────

> ✔️ Vercel Account Veryfy 
> ✔️  Build from GitHub/Bitbucket/GitLab  
> ✔️ Node.js, React, Next.js, Vue, Svelte Support  
> ✔️ Free SSL (https://), Global CDN  
> ✔️ Zero Configuration & Fast Deployments  
> ✔️ Unlimited Preview Deployments  
> ✔️ වර්ග කිසිම limit එකක් නැහැ. Suspended වෙන්නෙත් නෑ.

──────────────

> ⚡  *Api/Website/Frontend Projects වලට පට්ටම හොඳ Hosting එකක්!*

──────────────

*රු. 100/= Full Guide & Setup Support ⤵️*
   `;

    await conn.sendMessage(from, {
      image: { url: "https://i.ibb.co/F4FfmP8r/8402.jpg" },
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
