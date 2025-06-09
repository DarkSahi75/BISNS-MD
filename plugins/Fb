const cmd = require('../lib/command');
const { fetchJson } = require('../lib/function');

cmd({
  pattern: "fbl",
  alias: ["fbinfo", "fbdata"],
  category: "downloader",
  desc: "Facebook Video Details Only",
  use: '.fbdetail <facebook url>',
  filename: __filename
}, async (conn, m, { q }) => {
  if (!q || !q.includes("facebook.com")) {
    return m.reply("📌 *කරුණාකර වලංගු Facebook වීඩියෝ ලින්ක් එකක් දෙන්න!*\nตัวอย่าง:\n.fbdetail https://www.facebook.com/username/videos/1234567890")
  }

  try {
    const json = await fetchJson(`https://vajira-api-0aaeb51465b5.herokuapp.com/download/fbdown?url=${q}`);
    const res = json?.result;
    
    if (!res) return m.reply("❌ විස්තර ලබාගත නොහැක.");

    let { title, desc, thumb, sd, hd } = res;

    let msg = `🎬 *Facebook Video Info*

📌 *Title:* ${title || "No title"}
📝 *Description:* ${desc || "No description"}

🎞️ *Available Qualities:*
🔹 SD: ${sd ? `[Download](${sd})` : "Unavailable"}
🔸 HD: ${hd ? `[Download](${hd})` : "Unavailable"}

🔗 *Source URL:* ${q}

💠 *Powered by:* @DINUWH_MD`;

    await conn.sendMessage(m.chat, {
      image: { url: thumb },
      caption: msg,
      jpegThumbnail: Buffer.alloc(0)
    }, { quoted: m });
    
  } catch (e) {
    console.error(e);
    m.reply("⚠️ එකක් ඇරියා වගේ! නැවත උත්සාහ කරන්න.");
  }
});
