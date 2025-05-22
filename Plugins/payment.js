

const config = require('../settings');
const prefix = config.PREFIX;
const { cmd } = require('../lib/command');




cmd({
  pattern: "payment",
  react: "🔏",
  alias: ["renderfree", "rfree", "freehost"],
  desc: "Render Free Hosting Plan info",
  category: "main",
  use: '.render',
  filename: __filename
}, async (conn, m) => {
  try {
    const from = m.chat;
    const caption = `> ╔════◇ ☆ ◇════╗  

> 💰 PAYMENT METHOD 💰  

> ╚════◇ ☆ ◇════╝

> *Choose your preferred payment method⤵️:*

_*➤ 🏦 ||Bank Transfer  ✔️*_

*➤ 🔁 ||Reload  ✔️*

_*➤ 📡 ||HUTCH Normal Card  ✔️*_

*➤ 🎉 ||Get Paid Promotion for FREE!  ✔️*

*⟣ Please tap a button to continue ⟢*

──────────────

*© Specail Note ...❗⤵️*

> ගෙවීම් සිදුකලාට පසු SS හෝ PHOTO එකක් පැහදිලිව දැමීමට කාරුණික වියාම් 😒💔

Please send a screenshot or clear photo after payment is made.`;

    await conn.sendMessage(from, {
      image: { url: "https://i.ibb.co/RRkvK4w/8746.jpg" },
      caption: caption,
      buttons: [
      { buttonId: prefix + 'promo', buttonText: { displayText: '*📁 𝙵𝚁𝙴𝙴 𝚆𝙸𝚃𝙷 𝙿𝚁𝙾𝙼𝙾 𝙰𝙳𝚂*' }, type: 1 },
      { buttonId: prefix + 'bank', buttonText: { displayText: '*📁 𝙱𝙰𝙽𝙺  𝚃𝚁𝙰𝙽𝚂𝙵𝙴𝚁*' }, type: 1 },
        { buttonId: prefix + 'reload', buttonText: { displayText: '*📁 𝙷𝚄𝚃𝙲𝙷 𝚁𝙴𝙻𝙾𝙰𝙳*' }, type: 1 },
        { buttonId: prefix + 'hutch', buttonText: { displayText: '*📁 𝙷𝚄𝚃𝙲𝙷 𝙲𝙰𝚁𝙳*' }, type: 1 }
      ],
      headerType: 4,
      viewOnce: true
    }, { quoted: m });

  } catch (e) {
    await m.reply('*ERROR !!*');
    console.error(e);
  }
});

//BANK TRANSFER

cmd({
  pattern: "bank",
  react: "💡",
  //alias: ["tiktok", "tt", "premium"],
  desc: "TikTok Premium info",
  category: "main",
  use: '.ttpro',
  filename: __filename
}, async (conn, m) => {
  try {
    const from = m.chat;
    const caption =`> #𝙱𝙰𝙽𝙺 𝚙𝚊𝚢𝚖𝚎𝚗𝚝 𝙼𝙴𝚃𝙷𝙾𝙳
    
    *BOC  === BANK*
    
     *Bank Pay කරන්න කැමතිනම් සහ පුළුවන්නම් කියන්න🫵*
     
      *ඉතිරි Details දෙන්නම්...නැත්නම් වෙනත් PayMent Method එකක් Try කරන්න උනත් පුලුවන්🫵*`;

    await conn.sendMessage(from, {
      image: { url: "https://i.ibb.co/RRkvK4w/8746.jpg" },
      caption,
      buttons: [
        { buttonId: prefix + 'payment', buttonText: { displayText: '📁𝙾𝚃𝙷𝙴𝚁 𝙿𝙰𝚈 𝙾𝙿𝚃𝙸𝙾𝙽✔️' }, type: 1 }
      ],
      headerType: 4,
      viewOnce: true
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    await m.reply('*ERROR !! Something went wrong.*');
  }
});

//RELOAD PAY OPTION

cmd({
  pattern: "reload",
  react: "🖥",
  //alias: ["tiktok", "tt", "premium"],
  desc: "TikTok Premium info",
  category: "main",
  use: '.ttpro',
  filename: __filename
}, async (conn, m) => {
  try {
    const from = m.chat;
    const caption =`> #𝚁𝙴𝙻𝙾𝙰𝙳 𝙿𝙰𝚈𝙼𝙴𝙽𝚃 𝙾𝙿𝚃𝙸𝙾𝙽🔌
   
    Reload Send Number :- 0728899640
    *රීලෝඩ් දාද්දි ඔය නම්බර් එකට දාන්න ✔️*`;

    await conn.sendMessage(from, {
      image: { url: "https://i.ibb.co/RRkvK4w/8746.jpg" },
      caption,
      buttons: [
        { buttonId: prefix + 'payment', buttonText: { displayText: '📁𝙾𝚃𝙷𝙴𝚁 𝙿𝙰𝚈 𝙾𝙿𝚃𝙸𝙾𝙽✔️' }, type: 1 }
      ],
      headerType: 4,
      viewOnce: true
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    await m.reply('*ERROR !! Something went wrong.*');
  }
});

//CARDRELOAD PAY 

cmd({
  pattern: "hutch",
  react: "📍",
  //alias: ["tiktok", "tt", "premium"],
  desc: "TikTok Premium info",
  category: "main",
  use: '.ttpro',
  filename: __filename
}, async (conn, m) => {
  try {
    const from = m.chat;
    const caption =`HUTCH CARD PAYMENT
    
    _HUTCH NORML CARD ONLY👀_
    
    *wa.me/728899640 ඔය නම්බර් එකට PHOTO හරි නම්බර් ටයිප් කරලා හරි දෑවනම් Okay 👀*`;

    await conn.sendMessage(from, {
      image: { url: "https://i.ibb.co/RRkvK4w/8746.jpg" },
      caption,
      buttons: [
        { buttonId: prefix + 'payment', buttonText: { displayText: '📁𝙾𝚃𝙷𝙴𝚁 𝙿𝙰𝚈 𝙾𝙿𝚃𝙸𝙾𝙽✔️' }, type: 1 }
      ],
      headerType: 4,
      viewOnce: true
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    await m.reply('*ERROR !! Something went wrong.*');
  }
});

//FREE FOR PAID PROMO

cmd({
  pattern: "promo",
  react: "✨",
  //alias: ["tiktok", "tt", "premium"],
  desc: "TikTok Premium info",
  category: "main",
  use: '.ttpro',
  filename: __filename
}, async (conn, m) => {
  try {
    const from = m.chat;
    const caption =`> *PROMOTE ADS AND GET FREE SERVICE*
    
   *ඔයාට ෆලොවර්ස්ලා හෝ මට වාසියක් වෙන් විදිහක දෙයක් කරන්න පුලුවන්නම් මටත් ඔයාටත් සාදාරන ක්‍රමයකට මේ සර්විස් එකෙන් PAY කරගැනිම කරගන්න තියෙන්නේ🌝💕*
   
   *දෙන්නම එකඟ වුනොත් මේ විදිහට... මේ ක්‍රමයට ඔයාට ඕනි Service එක දෙන්න පුලුවන් 😩🫵*
    `;

    await conn.sendMessage(from, {
      image: { url: "https://i.ibb.co/RRkvK4w/8746.jpg" },
      caption,
      buttons: [
        { buttonId: prefix + 'payment', buttonText: { displayText: '📁𝙾𝚃𝙷𝙴𝚁 𝙿𝙰𝚈 𝙾𝙿𝚃𝙸𝙾𝙽✔️' }, type: 1 }
      ],
      headerType: 4,
      viewOnce: true
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    await m.reply('*ERROR !! Something went wrong.*');
  }
});