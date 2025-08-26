const { cmd } = require("../lib/command");

cmd({
  pattern: "send",
  alias: ["sendme", 'save'],
  react: '📤',
  desc: "Forwards quoted message back to user",
  category: "utility",
  filename: __filename
}, async (client, message, match, { from }) => {
  try {
    if (!match.quoted) {
      return await client.sendMessage(from, {
        text: "*🍁 Please reply to a message!*"
      }, { quoted: message });
    }

    const buffer = await match.quoted.download();
    const mtype = match.quoted.mtype;
    const options = { quoted: message };

    let messageContent = {};
    switch (mtype) {
      case "imageMessage":
        messageContent = {
          image: buffer,
          caption: match.quoted.text || '',
          mimetype: match.quoted.mimetype || "image/jpeg"
        };
        break;
      case "videoMessage":
        messageContent = {
          video: buffer,
          caption: match.quoted.text || '',
          mimetype: match.quoted.mimetype || "video/mp4"
        };
        break;
      case "audioMessage":
        messageContent = {
          audio: buffer,
          mimetype: "audio/mp4",
          ptt: match.quoted.ptt || false
        };
        break;
      default:
        return await client.sendMessage(from, {
          text: "❌ Only image, video, and audio messages are supported"
        }, { quoted: message });
    }

    await client.sendMessage(from, messageContent, options);
  } catch (error) {
    console.error("Forward Error:", error);
    await client.sendMessage(from, {
      text: "❌ Error forwarding message:\n" + error.message
    }, { quoted: message });
  }
});


//const { cmd } = require('../command');

cmd({
    pattern: "sv",
    react: "🔖",
    desc: "Save or forward replied status",
    category: "main",
    use: '.sv (reply to status)',
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        // Check if message is a reply
        if (!mek.quoted) {
            return reply("*❌ Please reply to a WhatsApp status message!*");
        }

        // Forward the replied status
        await conn.sendMessage(from, { forward: mek.quoted }, { quoted: mek });

        // Success reaction
        await conn.sendMessage(from, { react: { text: `✅`, key: mek.key } });

    } catch (e) {
        reply('*⚠️ Error occurred !!*');
        console.log(e);
    }
});
