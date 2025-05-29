const { cmd } = require('../lib/command'); // plugin handler එකට connect
const fetch = require('node-fetch'); // API call කිරීම සඳහා

const apikey = '8510ebee8a059cab'; // Your API key

cmd({
    pattern: "shanmp4",
    alias: ["mp4"],
    use: ".ytmp4 <YouTube URL>",
    react: "🎥",
    desc: "Download YouTube video in MP4 format (240p only)",
    category: "download",
    filename: __filename
},
    async (conn, m, mek, { from, q, reply }) => {
        try {
            if (!q) return await reply("*📎 කරුණාකර YouTube ලින්ක් එකක් දෙන්න!*");

            const apiUrl = `https://api-dark-shan-yt.koyeb.app/download/ytmp4?url=${encodeURIComponent(q)}&apikey=${apikey}`;
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (!data.status || !data.data?.result) {
                return await reply("*❌ Video එක ලබාගැනීම අසාර්ථකයි. යලි උත්සාහ කරන්න!*");
            }

            const { title, uploader, duration, quality, format, thumbnail, download } = data.data.result;

            if (!quality.includes("240")) {
                return await reply("*🛑 මෙම video එකට 240p version එක නොමැත!*");
            }

            const caption = `*🎬 YouTube MP4 Downloader 🎬*\n\n`
                + `> 📃 *Title:* ${title}\n`
                + `> 🎤 *Uploader:* ${uploader}\n`
                + `> ⌚ *Duration:* ${duration}\n`
                + `> 📹 *Quality:* ${quality}\n`
                + `> 🎞️ *Format:* ${format}\n\n`
                + `_🔥 Powered by @darkshanyt1_`;

            // Send thumbnail and info
            await conn.sendMessage(from, {
                image: { url: thumbnail },
                caption: caption
            }, { quoted: mek });

            // Send the 240p video
            await conn.sendMessage(from, {
                video: { url: download },
                mimetype: "video/mp4",
                fileName: `${title}.mp4`
            }, { quoted: mek });

        } catch (e) {
            console.error(e);
            await reply("*⚠️ විඩියෝව download කරන්න ගිය අවස්ථාවේ error එකක් ආවා!*");
        }
    });
