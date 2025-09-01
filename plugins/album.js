const cmd = require('../lib/command') // ඔයාගේ bot structure එකේ cmd import එකට 맞춰න්න

cmd({
    pattern: "album",
    react: "🖼️",
    alias: ["multi"],
    desc: "Send random album (image + video)",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from }) => {
    try {
        // Random media sources
        const images = [
            "https://picsum.photos/600/400",
            "https://source.unsplash.com/random/800x600",
            "https://placekitten.com/800/500",
        ];

        const videos = [
            "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
            "https://www.w3schools.com/html/mov_bbb.mp4"
        ];

        // Pick random image + video
        const imageUrl = images[Math.floor(Math.random() * images.length)];
        const videoUrl = videos[Math.floor(Math.random() * videos.length)];

        const media = [
            { image: { url: imageUrl } },
            { video: { url: videoUrl } }
        ];

        await conn.sendMessage(from, { 
            album: media, 
            caption: `✨ DINUWH MD Random Album ✨\n\n🖼️ Image: ${imageUrl}\n🎥 Video: ${videoUrl}`
        }, { quoted: mek });

    } catch (e) {
        console.log(e)
        await conn.sendMessage(from, { text: "❌ Album send error!" }, { quoted: mek });
    }
});
