const config = require('../settings');
const prefix = config.PREFIX;
const { cmd } = require('../lib/command');

cmd({
  pattern: "pannel",
  react: "📂",
  //alias: ["tiktok", "tt", "premium"],
  desc: "TikTok Premium info",
  category: "main",
  use: '.ttpro',
  filename: __filename
}, async (conn, m) => {
  try {
    const from = m.chat;
    const caption = ` > 𝙱𝙾𝚃 𝙷𝙾𝚂𝚃𝙸𝙽𝙶 𝙿𝙰𝙽𝙴𝙻 🌐⚡  

- › RAM: 2GB  
- › DISK: 2GB  
- › CPU: 100%  
- › SUSPEND වෙන්නෙ නෑ — දිගටම වැඩ

- _අවුලකට තියෙන්නෙ ඇඩ්ස් ප්ලේ වෙන එක විතරයි — ADS BLOCKER එකක් දැම්මම හරි✔️!_

*› RS. 200*
*› HEROKU වලට වඩා වේගවත්*

BUY NOW — BIG OFFER 📍 `;

    await conn.sendMessage(from, {
      image: { url: "https://i.ibb.co/Y4Qw75JD/1543.jpg" },
      caption,
      buttons: [
         { buttonId: prefix + 'payment', buttonText: { displayText: '𝙷𝙾𝚆 𝚃𝙾 𝙿𝙰𝚈 💰' }, type: 1 },
        { buttonId: prefix + 'start', buttonText: { displayText: '𝙱𝙰𝙲𝙺 ✗' }, type: 1 }
      ],
      headerType: 4,
      viewOnce: true
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    await m.reply('*ERROR !! Something went wrong.*');
  }
});


//prooffff


cmd({
  pattern: "proof",
  react: "☰",
  //alias: ["tiktok", "tt", "premium"],
  desc: "TikTok Premium info",
  category: "main",
  use: '.ttpro',
  filename: __filename
}, async (conn, m) => {
  try {
    const from = m.chat;
    const caption = ` *පොඩ්ඩක් දැම්මා මේවාගෙන් ගිහින්න් බලන්න ඔනිනම් 🤭🫶*
 
_Sale කල හෑමදේම දාන්න තිබ්බනම් දානවා ගොඩක් ඒවාගෙ SS එම නෑ ඒකයි 🫵_

*1️⃣ || https://i.ibb.co/5gkZJh4/7655.jpg*
> *2️⃣ || https://i.ibb.co/XfTCcXm/8374.jpg*  
*3️⃣ || https://i.ibb.co/Xf5CRnK/3948.jpg*  
> *4️⃣ || https://i.ibb.co/rjS05dz/1492.jpg*  
*5️⃣ || https://i.ibb.co/kg0qtLB/2722.jpg*  
> *6️⃣ ||  https://i.ibb.co/Sw4sC6N/9910.jpg*  
*7️⃣ || https://i.ibb.co/JwXDnQJ/3991.jpg* 
> *8️⃣ || https://i.ibb.co/hJBGCFc/7730.jpg*
*9️⃣ ||  https://i.ibb.co/gbRB4x3/3188.jpg*
> *🔟 ||  https://i.ibb.co/cGLv7D0/8497.jpg*
*1️⃣1️⃣ || https://i.ibb.co/bMz8Jbhy/2665.jpg*
> *1️⃣2️⃣ || https://i.ibb.co/cGLv7D0/8497.jpg*

*ඔයාට ඔනි විදිහකට උනත් හදල දෙන්න පුලුවන් බොට් කෙනෙක් වෙබ් එකක් එහෙම*

> itz Me dinuwh `;

    await conn.sendMessage(from, {
      image: { url: "https://i.ibb.co/DDMD8WYQ/177.jpg" },
      caption,
      buttons: [
         { buttonId: prefix + 'payment', buttonText: { displayText: '𝙷𝙾𝚆 𝚃𝙾 𝙿𝙰𝚈 💰' }, type: 1 },
        { buttonId: prefix + 'start', buttonText: { displayText: '𝙱𝙰𝙲𝙺 ✗' }, type: 1 }
      ],
      headerType: 4,
      viewOnce: true
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    await m.reply('*ERROR !! Something went wrong.*');
  }
});