const fetch = require('node-fetch');
const { cmd } = require('../lib/command');
const { fetchJson } = require('../lib/functions'); // මේක තියෙන්නේ නම්
const config = require('../settings');

cmd({
  pattern: "fb",
  react: '#️⃣',
  alias: ["fbdl", "facebook"],
  desc: "Facebook වීඩියෝවක් download කරන්න",
  category: "download",
  use: '.fb <Fb video link>',
  filename: __filename
},
async (conn, mek, m, {
  from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender,
  senderNumber, botNumber2, botNumber, pushname, isMe, isOwner,
  groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    if (!q || !q.includes('facebook.com')) return reply("*🥲 Plz provide a valid Facebook video link!*");

    const response = await fetchJson(`https://api-mainh-20a12b683c39.herokuapp.com/download/fbdown?url=${q}`);

    if (!response?.result) return reply("*❌ විඩියෝව ලබාගත නොහැක. සෙවූ ලින්ක් එකට විශේෂ වරදක් ඇත.*");

    const result = response.result;

    let dat = `🎥 *Facebook Downloader*

*📌 Title:* ${result.title || "No title available"}
📝 *Description:* ${result.description || "No description"}
🔗 *URL:* ${q}`;

    if (config.MODE === 'nonbutton') {

      const sections = [
        {
          title: "SD TYPE 🪫",
          rows: [
            { title: "1.1", rowId: prefix + 'fbsd ' + q, description: '🪫 SD QUALITY VIDEO' },
            { title: "1.2", rowId: prefix + 'fbsdd ' + q, description: '📂 SD QUALITY DOCUMENT' },
          ]
        },
        {
          title: "HD TYPE 🔋",
          rows: [
            { title: "2.1", rowId: prefix + 'fbhd ' + q, description: '🔋 HD QUALITY VIDEO' },
            { title: "2.2", rowId: prefix + 'fbhdd ' + q, description: '📂 HD QUALITY DOCUMENT' },
          ]
        },
        {
          title: "VOICE CUT TYPE 🎶",
          rows: [
            { title: "3.1", rowId: prefix + 'fba ' + q, description: '🎶 Audio file' },
            { title: "3.2", rowId: prefix + 'fbd ' + q, description: '📂 Document file' }
          ]
        }
      ];

      const listMessage = {
        image: { url: result.thumb || config.LOGO },
        caption: dat,
        footer: config.FOOTER,
        title: '',
        buttonText: '*🔢 Reply below number*',
        sections
      };

      return await conn.replyList(from, listMessage, { quoted: mek });

    } else if (config.MODE === 'button') {

      const sections = [
        {
          title: "SD TYPE 🪫",
          rows: [
            { header: "", title: "", description: "🪫 SD QUALITY VIDEO", id: `${prefix}fbsd ${q}` },
            { header: "", title: "", description: "📂 SD QUALITY DOCUMENT", id: `${prefix}fbsdd ${q}` }
          ]
        },
        {
          title: "HD TYPE 🔋",
          rows: [
            { header: "", title: "", description: "🔋 HD QUALITY VIDEO", id: `${prefix}fbhd ${q}` },
            { header: "", title: "", description: "📂 HD QUALITY DOCUMENT", id: `${prefix}fbhdd ${q}` }
          ]
        },
        {
          title: "VOICE CUT TYPE 🎶",
          rows: [
            { header: "", title: "", description: "🎶 Audio file", id: `${prefix}fba ${q}` },
            { header: "", title: "", description: "📂 Document file", id: `${prefix}fbd ${q}` }
          ]
        }
      ];

      const listMessage = {
        title: 'Click Here⎙',
        sections
      };

      conn.sendMessage(from, {
        image: { url: result.thumb || config.LOGO },
        caption: dat,
        footer: config.FOOTER,
        buttons: [
          {
            buttonId: `${prefix}fbsd ${q}`,
            buttonText: { displayText: '🪫 SD QUALITY VIDEO' }
          },
          {
            buttonId: `${prefix}fbhd ${q}`,
            buttonText: { displayText: '🔋 HD QUALITY VIDEO' }
          },
          {
            buttonId: `${prefix}fba ${q}`,
            buttonText: { displayText: '🎶 Audio file' }
          },
          {
            buttonId: 'action',
            buttonText: { displayText: 'ini pesan interactiveMeta' },
            type: 4,
            nativeFlowInfo: {
              name: 'single_select',
              paramsJson: JSON.stringify(listMessage)
            }
          }
        ],
        headerType: 1,
        viewOnce: true
      }, {
        quoted: mek
      });
    }

  } catch (e) {
    reply('*🚨 ERROR !! විඩියෝව download කිරීමේදී දෝෂයක් ඇතිවිය.*');
    l(e);
  }
});
