const { cmd } = require("../lib/command");
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
