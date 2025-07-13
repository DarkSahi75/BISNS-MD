const { cmd } = require("../lib/command");
const config = require("../settings");

cmd(
  {
    pattern: "alive",
    desc: "Check if bot is online and send image with caption",
    category: "main",
    filename: __filename,
  },
  async (robin, mek, m, { reply }) => {
    try {
      const caption = `🟢 *𝙳𝙸𝙽𝚄𝚆𝙷 𝙼𝙳 BOT* is *online*!  
Bot is running smoothly...

👤 *Owner*: DINUWH  
📱 *Contact Owner*: wa.me/94728899640  

🧑‍💻 Free bot service available — DM me!

📢 *Join our official WhatsApp Channels*:

🔹 *Tech Channel*:  
https://whatsapp.com/channel/0029Vb5XXIfDp2Q3A5zeZb1d

🔹 *Music Channel*:  
https://whatsapp.com/channel/0029Vb3mqn5H5JLuJO3s3Z1J

🔹 *Status Video Channel*:  
https://whatsapp.com/channel/0029VaxVCPi96H4VOKai4S3s

━━━━━━━━━━━━━━  
Powered by *DINUWH MD* 💚`;

      const imageUrl = "https://i.ibb.co/whxqdnDd/5136.jpg";
      const targetJid = config.BOMB;

      if (!targetJid || !targetJid.includes("@s.whatsapp.net")) {
        return reply("❌ *Invalid or missing JID in config.SAHAS*");
      }

      await robin.sendMessage(
        targetJid,
        {
          image: { url: imageUrl },
          caption: caption,
        },
        { quoted: mek }
      );

      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ Alive message sent to: *${targetJid}*`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply("❌ *Error while sending alive message:* " + e.message);
    }
  }
);
