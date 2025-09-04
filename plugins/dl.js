const { cmd } = require('../lib/command');
const ytdl = require("xproverce-youtubedl");

cmd({
    pattern: "mp3dl",
    desc: "Download YouTube as MP3 and show direct link",
    category: "download",
    react: "🎶",
    filename: __filename
},
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("👉 *කරුණාකර YouTube Link එකක් දාන්න !*");

        // YouTube → MP3 convert
        let data = await ytdl.downloadMp3(q);

        if (!data || !data.download_url) {
            return reply("❌ Direct link එක generate වෙලා නෑ !");
        }

        // Console log
        console.log("🎧 Title:", data.title);
        console.log("⬇️ Direct Download Link:", data.download_url);

        // Send to chat
        let caption = `🎶 *YT to MP3*  
        
*🎧 Title:* ${data.title}  
*⬇️ Direct Link:* ${data.download_url}`;

        await conn.sendMessage(m.chat, { text: caption }, { quoted: mek });

    } catch (e) {
        console.error("❌ Error:", e);
        reply("❌ Error: " + e.message);
    }
});
