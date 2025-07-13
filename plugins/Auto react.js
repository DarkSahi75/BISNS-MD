const { cmd } = require('../lib/command');

cmd({
  on: "body", // Trigger on any inbox message
}, async (conn, mek, m, {}) => {
  try {
    const text = m.text || "";
    const fromUser = mek.key.remoteJid;

    // Check for valid format
    if (!text.includes("https://whatsapp.com/channel/") || !text.includes(",")) return;

    const [linkPart, categoryRaw] = text.split(",");
    if (!linkPart || !categoryRaw) return;

    // Extract channel ID and message ID from link
    const match = linkPart.match(/channel\/([a-zA-Z0-9]+)\/(\d+)/);
    if (!match) return;

    const channelId = match[1]; // e.g., 0029VbATsZ20gcfR157hMB3C
    const messageId = match[2]; // e.g., 484
    const jid = `${channelId}@broadcast`;
    const category = categoryRaw.trim().toLowerCase();

    // Emoji config inside same file
    const emojiConfig = {
      heart: "❤️",
      like: "👍",
      fire: "🔥",
      laugh: "😂",
      sad: "😢",
      cry: "😭",
      angry: "😡",
      wow: "😮",
      clap: "👏",
      star: "⭐",
    };

    const emoji = emojiConfig[category];
    if (!emoji) {
      await conn.sendMessage(fromUser, { text: `❌ Unknown category: *${category}*` }, { quoted: mek });
      return;
    }

    // Send the reaction
    await conn.sendMessage(jid, {
      react: {
        text: emoji,
        key: {
          id: messageId,
          remoteJid: jid,
          fromMe: false,
        },
      },
    });

    console.log(`[✅ Reacted] ${emoji} to message ${messageId} in ${jid}`);

  } catch (err) {
    console.error("[❌ Reaction Error]:", err);
  }
});
