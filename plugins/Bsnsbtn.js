const { cmd } = require("../lib/command");

cmd({
  pattern: "buttondemo",
  react: "🤭",
  desc: "Simple Button Menu",
  category: "menu",
  filename: __filename,
}, async (m, conn, msgInfo) => {
  await conn.sendMessage(m.chat, {
    text: "ඔයාට මොකක්ද ඕනෙ? 😊",
    footer: "Bot by Dineth",
    buttons: [
      { buttonId: "id_song", buttonText: { displayText: "🎧 Song" }, type: 1 },
      { buttonId: "id_image", buttonText: { displayText: "📸 Image" }, type: 1 },
      { buttonId: "id_info", buttonText: { displayText: "ℹ️ Info" }, type: 1 },
    ],
    headerType: 1,
  });
});
