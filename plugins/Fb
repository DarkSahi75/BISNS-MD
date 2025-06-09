const { cmd } = require('../lib/command')
const { fetchJson } = require('../lib/function')

cmd({
  pattern: "fbdetail",
  alias: ["fbinfo"],
  category: "downloader",
  desc: "Facebook video details only",
  use: '.fbdetail <facebook video url>',
  filename: __filename
}, async (conn, m, { q }) => {
  if (!q) return m.reply("📌 *කරුණාකර Facebook video link එකක් ලබාදෙන්න!*");

  try {
    const response = await fetchJson(`https://vajira-api-0aaeb51465b5.herokuapp.com/download/fbdown?url=${q}`);
    
    if (!response || !response.result) {
      return m.reply("⚠️ වීඩියෝ විස්තර ලබාගැනීමට අසාර්ථකයි.");
    }

    const { title, desc, thumb, sd, hd } = response.result;

    let caption = `🎬 *Facebook Video Details*

📌 *Title:* ${title || "Unavailable"}
📝 *Description:* ${desc || "Unavailable"}

🎞️ *Download Links:*
🔹 [SD Video](${sd})
🔸 [HD Video](${hd})

🔗 *Original URL:* ${q}

📸 *Thumbnail Below*`;

    await conn.sendMessage(m.chat, {
      image: { url: thumb },
      caption
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    m.reply("❌ දෝෂයක් ඇතිවුණා. කරුණාකර link එක සොයා බලන්න හෝ නැවත උත්සාහ කරන්න.");
  }
});
