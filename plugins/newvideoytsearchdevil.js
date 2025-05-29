
//onst yts = require("yt-search");
const { cmd } = require('../command')
const fetch = require("node-fetch");
const ytsearch = require("yt-search");

cmd({ 
    pattern: "devilnewv", 
   // alias: ["video2", "play"], 
    react: "🗞️", 
    desc: "Download YouTube video", 
    category: "download", 
    use: '.video <YouTube URL or Name>', 
    filename: __filename 
}, async (conn, mek, m, { from, q, reply }) => { 
    try { 
        if (!q) return await reply("\`⚠️ Give Link Or Text\`");

        const yt = await ytsearch(q);
        if (yt.videos.length < 1) return reply("\`❌ Not Result || හමු නොවීය\`");

        let yts = yt.videos[0];  
        let apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(yts.url)}`;

        let response = await fetch(apiUrl);
        let data = await response.json();

        if (!data || data.status !== 200 || !data.result || !data.result.download_url) {
            return reply("\`⚠️ Download Link Not || ගැටලුවක්...😴\`");
        }

        
         // Send as video
        await conn.sendMessage(from, { 
            video: { url: data.result.download_url }, 
            mimetype: "video/mp4" 
        }, { quoted: mek });
        

    } catch (e) {
        console.error(e);
        reply("\`❌ Download ERROR- TRY ANOTHER TIME|| යම් කිසි ගැටලුවක්🤧.\`");
    }
});
