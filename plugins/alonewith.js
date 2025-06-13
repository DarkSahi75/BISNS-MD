const config = require('../settings')
const { cmd } = require('../lib/command')
const os = require("os")
const { runtime } = require('../lib/functions')

cmd({
    pattern: "paidtest2",
    alias: ["list"],
    desc: "Displays the bot menu",
    react: "📜",
    category: "main"
},
async (conn, mek, m, { from, pushname, reply }) => {
    try {
        let desc = `𝙷𝙴𝚈 *" ~The bezZZ - owner "* 🫣💗

*🤖 𝐈 𝐚𝐦 \`𝐀𝐥𝐨𝐧𝐞 𝐌𝐮𝐬𝐢𝐜 𝐕𝐢𝐛𝐞𝐬\` 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 !*

🛠️ MADE BY 𝙳𝙸 𝙽 𝚄 𝚆 𝙷 (728899640)

*Mყ ραιԃ ρɾσɱσƚισɳ ρɾιƈҽ ʅιαƚ ⤵️*

*_⏰1 Hour :- RS 1000/=_*
*_⏰2 Hour :- RS 1900/=_*
*_⏰3 Hour :- RS 2900/=_*
*_👥 GROUP FULL :- Rs 3500/=_*

*🖇️ 𝗖𝗵𝗮𝗻𝗻𝗲𝗹 𝗹𝗶𝗻𝗸* :-  
\`https://whatsapp.com/channel/0029VbAyb783WHTXjAXc0i0i\`

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
            image: { url: "https://i.ibb.co/ZzNM8kZb/DiNuWhMd.jpg" }, 
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

*_💰💸PRICE :- RS.1000/=_*

*📌SPECIAL NOTE ❗ ⤵️*

⭕ *සල්ලි දැමීමට පෙර අපට කෙටි පනිවිඩයක් දමා වෙලාවක් වෙන් කරගන්න..!!*  

*⏰ අදාල වේලාවන් :- 8.00 AM - 11.00 PM*

⚠️ *ප්‍රමෝශන් ඇඩ් එක්ක් දාගන්නවානම් පමණක් මෙතනින් එහා ඉදිරියට යන්න ☺️🪄*  

⚠️ *Proceed here only if you are placing a promotional ad ☺️🪄*

> Payment Method || ගෙවීම් ක්‍රම සදහා

◻️ *.payment*  යනුවෙන් ටයිප් කර එවන්න`;
                        break;
                    case '2':
                        response = `🕐 *2HOUR PLAN - NO UPDATES* 

*_💰💸PRICE :- RS.1900/=_*

*📌SPECIAL NOTE ❗ ⤵️*

⭕ *සල්ලි දැමීමට පෙර අපට කෙටි පනිවිඩයක් දමා වෙලාවක් වෙන් කරගන්න..!!*  

*⏰ අදාල වේලාවන් :- 8.00 AM - 11.00 PM*

⚠️ *ප්‍රමෝශන් ඇඩ් එක්ක් දාගන්නවානම් පමණක් මෙතනින් එහා ඉදිරියට යන්න ☺️🪄*  

⚠️ *Proceed here only if you are placing a promotional ad ☺️🪄*

> Payment Method || ගෙවීම් ක්‍රම සදහා

◻️ *.payment*  යනුවෙන් ටයිප් කර එවන්න`;
                        break;
                    case '3':
                        response = `🕐 *3HOUR PLAN - NO UPDATES* 

*_💰💸PRICE :- RS.2900/=_*

*📌SPECIAL NOTE ❗ ⤵️*

⭕ *සල්ලි දැමීමට පෙර අපට කෙටි පනිවිඩයක් දමා වෙලාවක් වෙන් කරගන්න..!!*  

*⏰ අදාල වේලාවන් :- 8.00 AM - 11.00 PM*

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
