const { cmd } = require("../lib/command");

cmd(
  {
    pattern: "follow",
    alias: ["join"],
    category: "owner",
    desc: "Follow WhatsApp Channel",
    react: "📢",
    filename: __filename,
    use: ".follow https://whatsapp.com/channel/...",
    fromMe: true,
  },
  async (robin, m, text, { reply }) => {
    try {
      if (!text) return reply("📎 *Channel Link එකක් දෙන්න බ්‍රෝ!*");

      const match = text.match(/(?:whatsapp\.com\/channel\/)([0-9a-zA-Z]+)/);
      if (!match) return reply("❌ *Invalid Channel Link!*");

      const inviteCode = match[1];
      const followRes = await robin.ws.sendNode({
        tag: "iq",
        attrs: {
          type: "set",
          xmlns: "w:fan",
          to: "fanclub",
        },
        content: [
          {
            tag: "fan:subscribe",
            attrs: { id: inviteCode },
          },
        ],
      });

      reply(`✅ *Channel Follow එක සාර්ථකයි!*\n🆔 ${inviteCode}`);
    } catch (e) {
      console.log(e);
      reply("❌ *Channel follow කිරීමේදී දෝෂයක් සිදුවුණා!*");
    }
  }
);
