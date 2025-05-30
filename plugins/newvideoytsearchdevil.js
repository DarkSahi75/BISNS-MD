
//onst yts = require("yt-search");
const { cmd } = require('../lib/command')
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


cmd({ 
    pattern: "devilnewd", 
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

        
         
        // Send as document
        await conn.sendMessage(from, { 
            document: { url: data.result.download_url }, 
            mimetype: "video/mp4", 
            fileName: `${yts.title}.mp4` 
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply("\`❌ Download ERROR- TRY ANOTHER TIME|| යම් කිසි ගැටලුවක්🤧.\`");
    }
});

//onst yts = require("@dark-yasiya/scraper").yts; // confirm your yts import here

cmd({
  pattern: "devilv",
  alias: ["devilvideo", "ytdlvideo"],
  react: "📽️",
  desc: "Download YouTube Video",
  category: "download",
  filename: __filename,
}, async (robin, mek, m, { from, q, prefix, reply }) => {
  try {
    if (!q) return reply("🔍 නමක් හෝ YouTube ලින්ක් එකක් දෙන්න!");

    const search = await yts(q);
    if (!search.videos.length) return reply("❌ Video not found!");

    const data = search.videos[0];
    const cap = `\`\`\`乂 Ｄ𝚒ｎｕｗｈ Чт Ｄｏｗｎ⟩⟩⟩\`\`\`

📌 *Title:* ${data.title}
⏰ *Duration:* ${data.timestamp}
📥 *Views:* ${data.views}
🔗 *URL:* ${data.url}

✧––––––––––––––✧
*Please choose the video type to download.*`;

    if (config.MODE === "nonbutton") {
      const sections = [
        {
          title: "DINUWH MD VIDEO OPTIONS",
          rows: [
            {
              title: "📥 Normal Video",
              description: "Download as regular video file",
              rowId: `${prefix}devilnewv ${data.url}`
            },
            {
              title: "📁 Document Video",
              description: "Download as document",
              rowId: `${prefix}devilnewd ${data.url}`
            }
          ]
        }
      ];

      const listMessage = {
        text: cap,
        footer: config.FOOTER,
        title: "Choose Format Below ⬇️",
        buttonText: "🔘 Select Option",
        sections,
        image: { url: data.thumbnail }
      };

      return await robin.sendMessage(from, listMessage, { quoted: mek });
    }

    if (config.MODE === "button") {
      const listData = {
        title: "◎ Choose Format ◎",
        sections: [{
          title: "DINUWH MD OPTIONS",
          rows: [
            {
              title: "[Video 🎥]",
              description: "Download as normal video file",
              id: `${prefix}devilnewv ${data.url}`
            },
            {
              title: "[Document 📂]",
              description: "Download as document video file",
              id: `${prefix}devilnewd ${data.url}`
            }
          ]
        }]
      };

      return await robin.sendMessage(from, {
        image: { url: data.thumbnail },
        caption: cap,
        footer: config.FOOTER,
        buttons: [
          {
            buttonId: `${prefix}devilnewv ${data.url}`,
            buttonText: { displayText: "📥 Video" },
            type: 1
          },
          {
            buttonId: `${prefix}devilnewd ${data.url}`,
            buttonText: { displayText: "📁 Document" },
            type: 1
          },
          {
            buttonId: "action",
            buttonText: { displayText: "🔘 Choose Format" },
            type: 4,
            nativeFlowInfo: {
              name: "single_select",
              paramsJson: JSON.stringify(listData),
            },
          }
        ],
        headerType: 1,
        viewOnce: true,
      }, { quoted: mek });
    }

  } catch (e) {
    console.error(e);
    reply("❌ Video එක process කරන්න ගිය දේවල් වල error එකක් තියෙනවා. ටික වෙලාවක් බලා try කරන්න!");
  }
});
