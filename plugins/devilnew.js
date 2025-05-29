const { cmd } = require('../lib/command');
const fetch = require("node-fetch");
const ytsearch = require("yt-search");

cmd({ 
    pattern: "devilnew", 
    alias: ["video2", "play"], 
    react: "🎥", 
    desc: "Download YouTube video", 
    category: "download", 
    use: '.video <YouTube URL or Name>', 
    filename: __filename 
}, async (conn, mek, m, { from, q, reply }) => { 
    try { 
        if (!q) return await reply("⚠️ කරුණාකර YouTube ලින්ක් එකක් හෝ ගීත නමක් දෙන්න!");

        const yt = await ytsearch(q);
        if (yt.videos.length < 1) return reply("❌ ප්‍රතිඵල නැහැ!");

        let yts = yt.videos[0];  
        let apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(yts.url)}`;

        let response = await fetch(apiUrl);
        let data = await response.json();

        if (!data || data.status !== 200 || !data.result || !data.result.download_url) {
            return reply("⚠️ විඩියෝ එක ගන්න බැරුව ගියා. ටික වෙලාවකින් නැවත උත්සාහ කරන්න.");
        }

        // Send as video
        await conn.sendMessage(from, { 
            video: { url: data.result.download_url }, 
            mimetype: "video/mp4" 
        }, { quoted: mek });

        // Send as document
        await conn.sendMessage(from, { 
            document: { url: data.result.download_url }, 
            mimetype: "video/mp4", 
            fileName: `${yts.title}.mp4` 
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply("❌ වැරදි ආව බං. ටිකකින් අරන් බල.");
    }
});
