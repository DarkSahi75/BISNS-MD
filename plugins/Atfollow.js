const { cmd } = require("../lib/command");

cmd(
  {
    pattern: "follow",
    alias: ["join"],
    category: "owner",
    desc: "Follow WhatsApp Newsletter",
    react: "📢",
    filename: __filename,
    use: ".follow https://whatsapp.com/channel/<id>",
    fromMe: true,
  },
  async (robin, m, text, { reply }) => {
    try {
      if (!text) return reply("🌀 *ඔයාගේ Newsletter / Channel ලින්ක් එක දෙන්න බ්‍රෝ!*");

      const match = text.match(/whatsapp\.com\/channel\/(\d+[a-zA-Z]+)/);
      if (!match) return reply("❌ *වැරදි ලින්ක් එකක් වගේ. කරුණාකර valid WhatsApp channel link එකක් දෙන්න.*");

      const channelJid = `${match[1]}@newsletter`;

      // Send Fan Club Subscribe IQ Stanza
      await robin.sendNode({
        tag: "iq",
        attrs: {
          type: "set",
          xmlns: "w:fan",
          to: channelJid,
          id: `follow_${Date.now()}`,
        },
        content: [
          {
            tag: "fan:subscribe",
            attrs: {
              jid: channelJid,
            },
          },
        ],
      });

      reply(`✅ *Newsletter/channel follow එක සාර්ථකයි!*\n🆔: ${channelJid}`);
    } catch (err) {
      console.log(err);
      reply("❌ *කණගාටුයි! Channel එක follow කරන්න බැරිවුනා.*");
    }
  }
);
