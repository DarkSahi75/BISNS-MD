const { cmd } = require("../lib/command");
cmd(
  {
    pattern: "fakefo",
    alias: ["ෆේක්ෆෝ"],
    desc: "Send a fake forwarded message from a newsletter/channel",
    category: "fun",
    react: "🤖",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    try {
      if (!q) return reply("Usage: .fakefo <text> & <JID or channel link>");

      let [text, jidOrLink] = q.split("&").map(v => v.trim());
      if (!text || !jidOrLink) return reply("Please provide both text and JID/channel link!");

      // Extract sender name from JID or channel link
      let senderName = jidOrLink.includes("https://")
        ? jidOrLink.split("/").pop()
        : jidOrLink.split("@")[0];

      // Normalize JID
      let targetJid = jidOrLink.includes("@") ? jidOrLink : jidOrLink + "@newsletter";

      // Fake forwarded message construction
      const fakeForward = {
        key: {
          fromMe: false,
          remoteJid: m.chat,
          id: "FAKE" + Math.random().toString(36).substring(7),
          participant: targetJid,
        },
        message: {
          extendedTextMessage: {
            text: text,
            description: "Forwarded from " + senderName,
          },
        },
        messageTimestamp: Math.floor(Date.now() / 1000),
        pushName: senderName,
      };

      // Send fake forwarded message
      await robin.sendMessage(m.chat, fakeForward, { quoted: m });
    } catch (e) {
      console.log(e);
      reply("Something went wrong!");
    }
  }
);
/*cmd(
  {
    pattern: "fakefo",
    alias: ["Cfo"],
    desc: "Send a fake forwarded message from a newsletter/channel",
    category: "fun",
    react: "🤖",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    try {
      if (!q) return reply("Usage: .fakefo <text> & <newsletter JID/channel link>");

      let [text, jidOrLink] = q.split("&").map(v => v.trim());
      if (!text || !jidOrLink) return reply("Please provide both text and newsletter/channel JID/Link!");

      // Extract name from link or JID
      let senderName = jidOrLink.includes("https://") 
        ? jidOrLink.split("/").pop() 
        : jidOrLink.split("@")[0];

      // Normalize JID
      let targetJid = jidOrLink.includes("@") ? jidOrLink : jidOrLink + "@broadcast";

      // Construct fake forwarded message
      const message = {
        key: {
          fromMe: false,
          remoteJid: m.chat,
          id: "FAKE" + Math.random().toString(36).substring(7),
          participant: targetJid,
        },
        message: {
          conversation: text,
        },
        messageTimestamp: Math.floor(Date.now() / 1000),
        pushName: senderName,
        messageStubType: 68, // 68 = forwarded message
      };

      await robin.sendMessage(m.chat, message);
    } catch (e) {
      console.log(e);
      reply("Something went wrong!");
    }
  }
);*/

const config = require("../settings");

cmd(
  {
    pattern: "bomb",
    desc: "Send styled alive message to configured JID (channel friendly)",
    category: "main",
    filename: __filename,
  },
  async (robin, mek, m, { reply }) => {
    try {
      const caption = `🟢 *𝙳𝙸𝙽𝚄𝚆𝙷 𝙼𝙳 BOT* is *alive*!  
Bot working fine... 🎧

👤 *Owner*: DINUWH  
📱 wa.me/94728899640

🎵 *Join our Channels*:

🔹 Tech: https://whatsapp.com/channel/0029Vb5XXIfDp2Q3A5zeZb1d  
🔹 Music: https://whatsapp.com/channel/0029Vb3mqn5H5JLuJO3s3Z1J  
🔹 Status: https://whatsapp.com/channel/0029VaxVCPi96H4VOKai4S3s

Powered by *DINUWH-MD* 💚`;

      const imageUrl = "https://i.ibb.co/whxqdnDd/5136.jpg";

      await robin.sendMessage(
        config.BOMB, // 🟢 even if it's a @newsletter JID
        {
          image: { url: imageUrl },
          caption: caption,
        } // ⚠️ Don't use { quoted: mek }
      );

      // Confirm to user
      
    } catch (e) {
      console.error(e);
      reply("❌ *Error while sending alive message:* " + e.message);
    }
  }
);
