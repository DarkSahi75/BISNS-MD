const config = require('../settings');
const prefix = config.PREFIX;
const { cmd } = require('../lib/command');

cmd({
  pattern: "testc",
  react: "⚡",
  alias: ["online", "bot", "start"],
  desc: "Check if bot is alive",
  category: "main",
  use: '.live',
  filename: __filename
}, async (conn, m) => {
  try {
    const from = m.chat;
    const caption = `
🐼 *WELCOME TO MY BUSINESS ACCOUNT..📍*

*_• Low Prices_*  
*• Fast Response*  
*_• 100% Genuine Service_*  
*• Guaranteed Satisfaction*

──────────────

*How to Get Started:*  
1️⃣ Choose the service you need  
2️⃣ Select your preferred payment method  

──────────────

> _ඔබට අවශ්‍ය සේවාව තෝරාගන්න. ගෙවීම් ක්‍රමය තෝරන්න. විශ්වාසයෙන් සහ වේගයෙන් සේවාව ලබාගන්න..._

──────────────

*Powered by 𝘋𝘐 𝘕 𝘜 𝘞 𝘏 - 𝘔 𝘋 🎚️*  
*⚠️ Please don't call or spam 🫩*

──────────────

> Additionally, to find out more details, click the *EXTRA DETAILS* button.

*Check Real Proof Below — Press Button ⤵️*
    `;

    await conn.sendMessage(from, {
      image: { url: "https://i.ibb.co/ZR2mLNXY/3522.jpg" },
      caption: caption,
      buttons: [
        { buttonId: prefix + 'proof', buttonText: { displayText: 'PROOF CHECK📲' }, type: 1 },
        { buttonId: prefix + 'botdeploy', buttonText: { displayText: 'BOT DEPLOY⛓️‍💥' }, type: 1 },
        { buttonId: prefix + 'render', buttonText: { displayText: 'RENDER ACC 📲' }, type: 1 },
        { buttonId: prefix + 'ytpro', buttonText: { displayText: 'YOUTUBE PRO 📳' }, type: 1 },
        { buttonId: prefix + 'ttpro', buttonText: { displayText: 'TIKTOK PRO 📽️' }, type: 1 },
        { buttonId: prefix + 'botpannel', buttonText: { displayText: 'BOT PANNEL 📹' }, type: 1 },
        { buttonId: prefix + 'vercel', buttonText: { displayText: 'VERCEL ACC 🔌' }, type: 1 },
        { buttonId: prefix + 'payment', buttonText: { displayText: 'PAYMENT METHOD 💰' }, type: 1 }
      ],
      headerType: 4,
      viewOnce: true
    }, { quoted: m });

  } catch (e) {
    await m.reply('*ERROR !!*');
    console.error(e);
  }
});