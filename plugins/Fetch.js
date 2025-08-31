// Required libraries
const axios = require('axios');

// cmd function comes from your bot base
// Make sure your bot base has something like:
const { cmd } = require('../lib/command'); 

cmd({
    pattern: "fetch",
    react: "📥",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply('*Please provide a direct URL!*');

        const mediaUrl = q.split("|")[0];
        const title = q.split("|")[1] || 'downloaded_file';

        // Progress simulation
        const progressMsgs = [
            "《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
            "《 ████▒▒▒▒▒▒▒▒》30%",
            "《 ███████▒▒▒▒▒》50%",
            "《 ██████████▒▒》80%",
            "《 ████████████》100%",
            "✅ Download Complete!"
        ];

        let key = await conn.sendMessage(from, { text: 'Downloading media...' });
        for (let i = 0; i < progressMsgs.length; i++) {
            await conn.sendMessage(from, { text: progressMsgs[i], edit: key });
        }

        // Download media
        const getBuffer = async (url) => {
            const res = await axios.get(url, { responseType: 'arraybuffer' });
            return Buffer.from(res.data, 'binary');
        };

        const mediaBuffer = await getBuffer(mediaUrl);

        // Detect file extension
        const ext = mediaUrl.split('.').pop().split(/\#|\?/)[0];
        let mimeType = "application/octet-stream";

        if (ext === 'mp4') mimeType = "video/mp4";
        else if (ext === 'mp3') mimeType = "audio/mpeg";
        else if (ext === 'apk') mimeType = "application/vnd.android.package-archive";
        else if (ext === 'pdf') mimeType = "application/pdf";
        else if (['jpg','jpeg'].includes(ext)) mimeType = "image/jpeg";
        else if (ext === 'png') mimeType = "image/png";

        // Send file
        await conn.sendMessage(from, {
            document: mediaBuffer,
            mimetype: mimeType,
            fileName: `${title}.${ext}`,
            caption: `*Media Downloaded by DINUWH MD*`
        });

        // Reaction ✅
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (error) {
        console.error(error);
        await conn.sendMessage(from, '*Error fetching or sending the media!*', { quoted: mek });
    }
});
