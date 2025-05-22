const config = require('../settings');
const prefix = config.PREFIX;
const { cmd } = require('../lib/command');

cmd({
  pattern: "botdeploy",
  react: "☠️",
//  alias: ["renderfree", "rfree", "freehost"],
  desc: "Render Free Hosting Plan info",
  category: "main",
  use: '.render',
  filename: __filename
}, async (conn, m) => {
  try {
    const from = m.chat;
    const caption = `*WHATSAPP BOT DEPLOY SERVICE*

AVAIBLE BOTS ,

* 🔌_MANU MD
* 🔌_ASITHA MD
* 🔌_PRABATH MD
* _And Other Bots...._


> *Price 💰 = RS.200*
> *RunTime ⌛* = *30 Day Work And || 30 Day Warranty*
> *Flatfoarm 👨‍💻* = *HEROKU || PANNEL || RENDER (DEFULT HEROKU)*
> *ඔයා බොට් කියන්නෙ මොකද්ද කියල දන්නැත්තම් "WHAT BOT?" කියන බටන් එක ප්‍රෙස් කරන්න...⛓️‍💥*

> *ඔයා බොට්ව වට්සැප් එකට ලින්ක් කරගෙන සීසන් ID ගන්න දන්නැත්නම් "GET ID" බටන් එක ප්‍රෙස් කරන්න*

*#Specail :-*

_බොට් ක්‍රියාකරද්දි ඔබගෙ වට්සැප් ගිනුම තාවකාලිකව බැන්ඩ් වෙන්න පුලුවන් ... 2-5% දෙනෙක්ට තමා හැමෝටම වෙන්නෙත් නෑ..._
*_එහෙම උනොත් වග කියන්නෙත් නැති බව මතක තබාගන්න එය මාගේ වරදක් නෙවේ.. බොට් සෑදීම නොසෑදීමෙ තීරණය ඔබ සතුයි...❌||😓👊_*

*Press You Want Bot Name 👊||⤵️*
   `;

    await conn.sendMessage(from, {
      image: { url: "https://i.ibb.co/gFRBmqF8/1587.jpg" },
      caption: caption,
      buttons: [
      { buttonId: prefix + 'prabath', buttonText: { displayText: '⎙ 𝙿𝚁𝙰𝙱𝙰𝚃𝙷-𝙼𝙳 𝙱𝙾𝚃🚀' }, type: 1 },
      { buttonId: prefix + 'asitha', buttonText: { displayText: '⎙ 𝙰𝚂𝙸𝚃𝙷𝙰-𝙼𝙳 𝙱𝙾𝚃🚀' }, type: 1 },
       { buttonId: prefix + 'manu', buttonText: { displayText: '⎙ 𝙼𝙰𝙽𝚄-𝙼𝙳 𝙱𝙾𝚃🚀' }, type: 1 },
      { buttonId: prefix + 'other', buttonText: { displayText: '⎙ 𝙾𝚃𝙷𝙴𝚁 𝙱𝙾𝚃🚀' }, type: 1 },
      { buttonId: prefix + 'getid', buttonText: { displayText: '⎙ 𝙶𝙴𝚃 𝚂𝙴𝚂𝚂𝙾𝙸𝙽 𝙸𝙳 🔌' }, type: 1 },
      { buttonId: prefix + 'whobot', buttonText: { displayText: '⎙ 𝚆𝙷𝙰𝚃 𝙸𝚂 𝙱𝙾𝚃 ? 📲' }, type: 1 },
        { buttonId: prefix + 'payment', buttonText: { displayText: '⎙ 𝙷𝙾𝚆 𝚃𝙾 𝙿𝙰𝚈 💰' }, type: 1 },
        { buttonId: prefix + 'start', buttonText: { displayText: '⎙ 𝙱𝙰𝙲𝙺 🤚' }, type: 1 }
      ],
      headerType: 4,
      viewOnce: true
    }, { quoted: m });

  } catch (e) {
    await m.reply('*ERROR !!*');
    console.error(e);
  }
});






//GETSESSOIN-ID==========

cmd({
  pattern: "getid",
  react: "✔️",
  //alias: ["tiktok", "tt", "premium"],
  desc: "TikTok Premium info",
  category: "main",
  use: '.ttpro',
  filename: __filename
}, async (conn, m) => {
  try {
    const from = m.chat;
    const caption = `*©Example:- මුලින්ම ඔයා asitha.top/pair ඔන්න ඔය සයිට් එකට යන්න...(හදන බොට් අනුව සයිට් එක වෙනස් විය හැක)*
    
*🔌.ඒ සයිට් එක ලොඩ් උනාම නම්බර් එකක් ගහන්න තැනක් එයි එතනට ඔයාට බොට් හදන්න ඔනි නම්බර් එක ටයිප් කරන්න EG 94761344523*

*🔌.Submit කලහම කෝඩ් එකක් පෙන්නයි ඒක එක වතාවක් ටච් කලාම කොපි වෙනවා...*

*🔌.දැන් ඔයා එතනට ගහපු නම්බරයෙන් හදපු වට්සැප් එක ඕපන් කරගෙන*
  *DOTS 3 TOUCH >>>> LINK DEVICE >>>> Camera Open වෙන තැනක් එයි එතන යට Phone Number Insert >>>> කෝඩ් එකක් ගහන්න තැනක් ඇති අර කොපි කරන් ආව කෝඩ් එක ඔතනට පෙස්ට් කරන්න*
  Safari Os එකක් කනෙක්ට් වෙයි ඒ එක්කම Sessoin Id එක ඔයාගෙම වට්සැප් නම්බර් එකෙන් ඔයාටම සෙන්ඩ් වෙලා ඇති...
  
 *🔌.ඔන්ලයින් ඉන්න වෙලාවක Payment කලාට පස්සෙ ඒ Sessoin Id එක එවන්න විනාඩි 5 කින් Bot Active වෙයි ...*`;

    await conn.sendMessage(from, {
      image: { url: "https://i.ibb.co/MyYrR0H2/608.jpg" },
      caption,
      buttons: [
        { buttonId: prefix + 'deploybot', buttonText: { displayText: 'I WANT BOT ✔️' }, type: 1 }
      ],
      headerType: 4,
      viewOnce: true
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    await m.reply('*ERROR !! Something went wrong.*');
  }
});

//WHOIS THIS BOT===================


cmd({
  pattern: "whobot",
  react: "📲",
  //alias: ["tiktok", "tt", "premium"],
  desc: "TikTok Premium info",
  category: "main",
  use: '.ttpro',
  filename: __filename
}, async (conn, m) => {
  try {
    const from = m.chat;
    const caption = `*WHAT IS WHATSAPP BOT?*
    
     වට්සැප් බොට් කෙනෙක් කියන්නේ...?
     
      *ඔනම මීඩියා එකක් වට්සැප් එකෙන්ම ඩව්න්ලෝඩ් කරගන්න|| ස්ටේට්ස් ඔටෝ සීන් කරගන්න වගෙ දෙවල් වල ඉදන් 300ක් 400ක් විතර වැඩ වට්සැප් එකේ ඉදන්ම කරගන්න පුලුවන් දේකට...*
      

©Specail Feture 📲

* Delet Msg Recover ✔️
* Song Status Upload ✔️
* 1 Time View Media Recover ✔️
* Song/Video Download ✔️
* Convert Commands (mp4 To Mp3 වගේ) ✔️
* (තව දේවල් Socail Media වලින් හොයලා බලන්න) 

*PAIR CODE SITE :- asitha.top/pair*`;

    await conn.sendMessage(from, {
      image: { url: "https://i.ibb.co/QvM9JfNp/26.jpg" },
      caption,
      buttons: [
        { buttonId: prefix + 'deploybot', buttonText: { displayText: 'I WANT BOT 📲' }, type: 1 }
      ],
      headerType: 4,
      viewOnce: true
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    await m.reply('*ERROR !! Something went wrong.*');
  }
});


//𝙾𝚃𝙷𝙴𝚁𝙱𝙾𝚃=========


cmd({
  pattern: "other",
  react: "🔎",
  //alias: ["tiktok", "tt", "premium"],
  desc: "TikTok Premium info",
  category: "main",
  use: '.ttpro',
  filename: __filename
}, async (conn, m) => {
  try {
    const from = m.chat;
    const caption = `❂ *OTHER BOTS AVAILABLE - DONE ✔️*

**ඕනෙ බොට් එකක් හදලා දෙන්න පුළුවන්!**  
_Repository එකක් තියනව නම් ලේසියි!_

*උඩ තියෙන Bot වලට අමතරව,* 
*වෙන Bot එකක් connect කරනකොට බැන් වෙන්න අවදානම 10% - 30% වගේ වැඩියි!*

╭─────────────∘  
│ *AVAILABLE BOTS:*  
│  
│ • 𝐁𝐖𝐌 𝐌𝐃  
│ • 𝐁𝐔𝐆 𝐁𝐎𝐓  
│ • 𝐒𝐋 𝐀𝐋𝐋 𝐁𝐎𝐓  
│ • 𝐆𝐈𝐅𝐓𝐄𝐃 𝐁𝐎𝐓 𝐌𝐃  
╰─────────────∘

**PRICE:** *250 - 300/=* (Per Month) 

* _𝙿𝙰𝙸𝚁 𝚂𝙸𝚃𝙴 𝚆𝙴𝙱 𝚂𝙸𝚃𝙴 උනත් ඩිප්ලොයි කල්ලා දෙන්න පුලුවන්..!_
  
* _ඔයාගෙ ප්‍රයිවට් බොට් කෙනෙක් උනත් හදල දෙන්න පුලුවන් ඕනිනම්..._


> ✅ Trusted Seller  

> ✅ Low Cost 

> ✅ 100% Safe | Trusted Service

──────────────

*BUY NOW ⤵*`;

    await conn.sendMessage(from, {
      image: { url: "https://i.ibb.co/Vpww4ZYr/8175.jpg" },
      caption,
      buttons: [
        { buttonId: prefix + 'payment', buttonText: { displayText: '𝙷𝙾𝚆 𝚃𝙾 𝙿𝙰𝚈𝙼𝙴𝙽𝚃 💰' }, type: 1 },
        { buttonId: prefix + 'start', buttonText: { displayText: '𝙱𝙰𝙲𝙺 𝙿𝙰𝙶𝙴🤚' }, type: 1 }
      ],
      headerType: 4,
      viewOnce: true
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    await m.reply('*ERROR !! Something went wrong.*');
  }
});




//𝙿𝚁𝙰𝙱𝙰𝚃𝙷 𝙼𝙳 //////////////////////

cmd({
  pattern: "prabath",
  react: "📲",
  desc: "𝙿𝚁𝙰𝙱𝙰𝚃𝙷 𝙼𝙳 Bot info",
  category: "main",
  use: '.prabathmd',
  filename: __filename
}, async (conn, m, { prefix }) => {
  try {
    const from = m.chat;
    const caption = `⚙️ *𝙿𝚁𝙰𝙱𝙰𝚃𝙷 𝙼𝙳 WHATSAPP BOT*

*💠 WHATSAPP MULTI-FUNCTION POWER BOT*
*💠 DOWNLOAD ANY SOCIAL MEDIA VIDEOS/AUDIO*
*💠 AUTO STATUS VIEW, REACT SYSTEM ENABLED*
*💠 DELETED MESSAGE + VIEW ONCE RECOVERY*
*💠 AI TOOLS | STICKERS | GROUP MANAGE CMDS*

🔗 *PAIR SITE:* _asitha.top/pair_ Or _https://prabath-md-pair-web-v2-slk.koyeb.app/pair_  
🔗 *QR PAIR SITE:* _asitha.top/qr_

🛡️ *PREMIUM SERVICE BY PRABATH*  
💰 *PRICE: Rs. 200/= Only*  
📥 *SEND SESSION ID + YOUR NAME TO ACTIVATE*

──────────────
*✅ Trusted | Fast Setup | 100% Safe & Reliable*
`;

    await conn.sendMessage(from, {
      image: { url: "https://i.ibb.co/hRn0HK6W/5571.jpg" },
      caption,
      buttons: [
        { buttonId: prefix + 'payment', buttonText: { displayText: '💳 𝙷𝙾𝚆 𝚃𝙾 𝙿𝙰𝚈' }, type: 1 },
        { buttonId: prefix + 'start', buttonText: { displayText: '📂𝚁𝙴𝚂𝚃𝙰𝚁𝚃' }, type: 1 }
      ],
      headerType: 4,
      viewOnce: true
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    await m.reply('*ERROR !! Something went wrong.*');
  }
});

//ASITHA MD==========

cmd({
  pattern: "asitha",
  react: "⚔️",
  desc: "𝙰𝚂𝙸𝚃𝙷𝙰 𝙼𝙳 Bot info",
  category: "main",
  use: '.asithamd',
  filename: __filename
}, async (conn, m, { prefix }) => {
  try {
    const from = m.chat;
    const caption = `⚔️ *𝙰𝚂𝙸𝚃𝙷𝙰 𝙼𝙳 WHATSAPP BOT*

*💠 SOCIAL MEDIA VIDEO/AUDIO DOWNLOADS*
*💠 STATUS AUTO SEEN, REACT FEATURES*
*💠 DELETE MESSAGE & VIEW ONCE MEDIA RECOVERY*
*💠 GROUP TOOLS | FUN | MUSIC | STICKERS & MORE*

🔗 *PAIR SITE:* _https://asitha.top/pair_  
🔗 *QR PAIR SITE:* _https://asitha.top/qr_

🛡️ *TRUSTED BOT SERVICE*  
💰 *PRICE: Rs. 200/= Only*  
📥 *SEND YOUR SESSION + NAME TO GET STARTED*

──────────────
*✅ 100% Safe | Fast Activation | Premium Features*
`;

    await conn.sendMessage(from, {
      image: { url: "https://i.ibb.co/sdv66vsQ/3747.jpg" },
      caption,
      buttons: [
        { buttonId: prefix + 'payment', buttonText: { displayText: '💳 𝙷𝙾𝚆 𝚃𝙾 𝙿𝙰𝚈' }, type: 1 },
        { buttonId: prefix + 'start', buttonText: { displayText: '📂 𝚁𝙴𝚂𝚃𝙰𝚁𝚃' }, type: 1 }
      ],
      headerType: 4,
      viewOnce: true
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    await m.reply('*ERROR !! Something went wrong.*');
  }
});

//==============MANU-MD