const { cmd } = require("../lib/command");

cmd(
  {
    pattern: "alive",
    alias: ["al"],
    desc: "Check bot alive status",
    category: "general",
    react: "💚",
    filename: __filename,
  },
  async (robin, mek, m, { reply }) => {
    try {
      const sections = [
        {
          title: "⚡ MENU ⚡",
          rows: [
            {
              title: "💚 STATUS",
              description: "Check bot status",
              rowId: "alive_status",
            },
            {
              title: "📂 COMMANDS",
              description: "Show command list",
              rowId: "alive_commands",
            }
          ],
        },
      ];

      const listMessage = {
        text: "✅ Bot is Alive!",
        footer: "POWERED BY DINUWH MD",
        title: "💠 DINUWH MD 💠",
        buttonText: "CLICK HERE 💚",
        sections,
      };

      await robin.sendMessage(m.chat, listMessage, { quoted: mek });
    } catch (e) {
      console.log(e)
      reply("❌ Error in alive command");
    }
  }
);
