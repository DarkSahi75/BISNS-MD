const config = require('../settings')
const { cmd } = require('../lib/command')
const os = require("os")
const { runtime } = require('../lib/functions')

cmd({
    pattern: "κιησηαπαωι ραιδ🫟",
    alias: ["paidlist"],
    desc: "Displays the bot menu",
    react: "📜",
    category: "main"
},
async (conn, mek, m, { from, pushname, reply }) => {
    try {
        let desc = `𝙷𝙴𝚈 *" ${pushname} "* 🫣💗

*🤖 𝐈 𝐚𝐦 \`🫟 Kingනරාවි | Status 🇱🇰❞\` 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 !*

*Mყ ραιԃ ρɾσɱσƚισɳ ρɾιƈҽ ʅιαƚ ⤵️*

*_⏰1 Hour :- RS 800/=_*
*_⏰2 Hour :- RS 1600/=_*
*_⏰3 Hour :- RS 2500/=_*
*_👥 GROUP FULL :- Rs 3500/=_*

*🖇️ 𝗖𝗵𝗮𝗻𝗻𝗲𝗹 𝗹𝗶𝗻𝗸* :-  
\`https://whatsapp.com/channel/0029VbATX43Likg3rkyTQD3s\`

 *🫟𝙵𝙾𝙻𝙻𝙾𝚆𝙴𝚁 𝙲𝙾𝚄𝙽𝚃 :- 100𝗞 💀💥*

⚠️ *ප්‍රමෝශන් ඇඩ් එකක් දාගන්නවානම් පමණක් මෙතනින් එහා ඉදිරියට යන්න ☺️🪄*  

⚠️ *Proceed here only if you are placing a promotional ad ☺️🪄*

* *᚜Reply Below you Want Plan Number᚛*
* *᚜ඔයාට ඕනී ප්ලෑන් එකට අදාල අන්කය රිප්ලයි එකක් ලෙස යොමු කරන්න 🤐᚛*

1 = ᚜_1Hour Plan_᚛
2 = ᚜_2Hour Plan_᚛
3 = ᚜_3Hour Plan_᚛

4= ᚜_Grup Full Plan_᚛

 `;

        // Send the menu with an image
        const menuMessage = await conn.sendMessage(from, { 
            image: { url: "https://i.ibb.co/B5FNcGYD/Queen-Rashu-Md.jpg" }, 
            caption: desc 
        }, { quoted: mek });

        // Listen for the reply
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;
            
            const selectedOption = msg.message.extendedTextMessage.text.trim();

            // Check if the reply is in response to the menu message
            if (msg.message.extendedTextMessage.contextInfo?.stanzaId === menuMessage.key.id) {
                let response = "";

                switch (selectedOption) {
                    case '1':
                        response = `🕐 *1HOUR PLAN - NO UPDATES* 

*_💰💸PRICE :- RS.800/=_*

*📌SPECIAL NOTE ❗ ⤵️*

⭕ *සල්ලි දැමීමට පෙර අපට කෙටි පනිවිඩයක් දමා වෙලාවක් වෙන් කරගන්න..!!*  

*⏰ අදාල වේලාවන් :- 8.00 AM - 10.00 PM*

⚠️ *ප්‍රමෝශන් ඇඩ් එක්ක් දාගන්නවානම් පමණක් මෙතනින් එහා ඉදිරියට යන්න ☺️🪄*  

⚠️ *Proceed here only if you are placing a promotional ad ☺️🪄*

> Payment Method || ගෙවීම් ක්‍රම සදහා

◻️ *.payment*  යනුවෙන් ටයිප් කර එවන්න`;
                        break;
                    case '2':
                        response = `🕐 *2 HOUR PLAN - NO UPDATES* 

*_💰💸PRICE :- RS.1600/=_*

*📌SPECIAL NOTE ❗ ⤵️*

⭕ *සල්ලි දැමීමට පෙර අපට කෙටි පනිවිඩයක් දමා වෙලාවක් වෙන් කරගන්න..!!*  

*⏰ අදාල වේලාවන් :- 8.00 AM - 10.00 PM*

⚠️ *ප්‍රමෝශන් ඇඩ් එක්ක් දාගන්නවානම් පමණක් මෙතනින් එහා ඉදිරියට යන්න ☺️🪄*  

⚠️ *Proceed here only if you are placing a promotional ad ☺️🪄*

> Payment Method || ගෙවීම් ක්‍රම සදහා

◻️ *.payment*  යනුවෙන් ටයිප් කර එවන්න`;
                        break;
                    case '3':
                        response = `🕐 *3 HOUR PLAN - NO UPDATES* 

*_💰💸PRICE :- RS.2500/=_*

*📌SPECIAL NOTE ❗ ⤵️*

⭕ *සල්ලි දැමීමට පෙර අපට කෙටි පනිවිඩයක් දමා වෙලාවක් වෙන් කරගන්න..!!*  

*⏰ අදාල වේලාවන් :- 8.00 AM - 10.00 PM*

⚠️ *ප්‍රමෝශන් ඇඩ් එක්ක් දාගන්නවානම් පමණක් මෙතනින් එහා ඉදිරියට යන්න ☺️🪄*  

⚠️ *Proceed here only if you are placing a promotional ad ☺️🪄*

> Payment Method || ගෙවීම් ක්‍රම සදහා

◻️ *.payment*  යනුවෙන් ටයිප් කර එවන්න`;
                        break;
                    case '4':
                        response = `🕐 *Group Full PLAN*

*_💰💸PRICE :- RS.3500/=_*

⚠️ *ප්‍රමෝශන් ඇඩ් එක්ක් දාගන්නවානම් පමණක් මෙතනින් එහා ඉදිරියට යන්න ☺️🪄*  

⚠️ *Proceed here only if you are placing a promotional ad ☺️🪄*
> Payment Method || ගෙවීම් ක්‍රම සදහා

◻️ *.payment*  යනුවෙන් ටයිප් කර එවන්න`;
                        break;
                    default:
                        response = "❌ *Invalid option. Please select a valid number.*";
                }

                await conn.sendMessage(from, { text: response }, { quoted: msg });
            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('⚠️ *An error occurred while processing your request.*');
    }
});


//3=33=3=3=3=3=3=33=333=====33=3====
//3-3-3-3-3-3-3----3-3-3-3-3-3--3-3-3

cmd({
    pattern: "payment",
    alias: ["list"],
    desc: "Displays the bot menu",
    react: "📜",
    category: "main"
},
async (conn, mek, m, { from, pushname, reply }) => {
    try {
        let desc = `💸 *PAYMENT METHODS* 💸

*Dear ${pushname}, please use one of the following methods to make the payment before confirming your plan.*

───────────────

🏦 *Bank Transfer And Ez Cash*
➤ *Reply 👉 1  below to view bank details.*
───────────────`;

        // Send the menu with an image
        const menuMessage = await conn.sendMessage(from, { 
            image: { url: "https://i.ibb.co/B5FNcGYD/Queen-Rashu-Md.jpg" }, 
            caption: desc 
        }, { quoted: mek });

        // Listen for the reply
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;
            
            const selectedOption = msg.message.extendedTextMessage.text.trim();

            // Check if the reply is in response to the menu message
            if (msg.message.extendedTextMessage.contextInfo?.stanzaId === menuMessage.key.id) {
                let response = "";

                switch (selectedOption) {
                    case '1':
                        response = `🏦 *BANK PAYMENT METHOD*

━━━━━━━━━━━━━━━
🏛️ *Bank:* BOC  
🔢 *Acc No:* 72208643  
👤 *Name:* Mrs.M.K.N.N Senevirathna 
🏬 *Branch:* Neluwa
━━━━━━━━━━━━━━━

💸 *EZ CASH PAYMENT METHOD*

* *0765792040 (Ez Cash Number ✨)*

*⭕සල්ලි දැමීමට පෙර අපට කෙටි පනිවිඩයක් දමා වෙලාවක් වෙන් කරගන්න..!!*

*\`⭕8.00 a.m - 10.00 p.m\` දක්වා කාලය තුල ඔබට වේලාවක් වෙන් කරගත හැකිය..!!*

> *අවසාන වතාවට මෙතන අවශ්‍ය පැකේජ් එක තෝරාගෙන මැසේජ් එකක් දාලා තියන්න-සල්ලි දැමූ පසු රිසිට් පතක ෆොටෝ එකක් දාන්න ☺️🤝*

* BUY 1 HR PLAN 
* _wa.me/765792040?text=1hour+plan+want+buy_

* BUY 2 HR PLAN 
* _wa.me/765792040?text=2hour+plan+want+buy_

* BUY 3 HR PLAN 
* _wa.me/765792040?text=3hour+plan+want+buy_

* BUY GRUP FULL PLAN 
* _wa.me/765792040?text=GRUPFULL+plan+want+buy_`;
                        break;

                    default:
                        response = "❌ *Invalid option. Please select a valid number.*";
                }

                await conn.sendMessage(from, { text: response }, { quoted: msg });
            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('⚠️ *An error occurred while processing your request.*');
    }
});

