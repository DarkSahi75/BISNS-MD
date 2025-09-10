const {cmd} = require("../lib/command")

cmd(
  {
    pattern: "alive2",
    alias: ["al"],
    desc: "Check bot alive status",
    category: "general",
    react: "💚",
    filename: __filename,
  },
  async (robin, mek, m, { reply }) => {
    try {
      const interactiveButtons = [
        {
          name: "single_select",
          buttonParamsJson: JSON.stringify({
            title: "💠 DINUWH MD 💠",
            sections: [
              {
                title: "⚡ MENU ⚡",
                highlight_label: "Select Option",
                rows: [
                  {
                    header: "💚 Bot Info",
                    title: "STATUS",
                    description: "Check bot status",
                    id: "alive_status",
                  },
                  {
                    header: "📂 Plugins",
                    title: "COMMANDS",
                    description: "Show command list",
                    id: "alive_commands",
                  }
                ]
              }
            ]
          })
        }
      ];

      const interactiveMessage = {
        text: "✅ Bot is Alive!",
        title: "⚡ DINUWH MD ⚡",
        footer: "POWERED BY DINUWH MD",
        interactiveButtons
      };

      await robin.sendMessage(m.chat, interactiveMessage, { quoted: mek });

    } catch (e) {
      reply("❌ Error in alive command");
    }
  }
);
