// WhatsApp bot command context එකේ poll plugin එකේ
// මේවා අවශ්‍යයි:

// 1️⃣ Command system එකෙන් context
// (ඔයා CMD structure එකේ තිබ්බේ මේක)
//const { cmd } = require('../lib/command'); 
// ඔබේ command handler path එකට adjust කරන්න

// 2️⃣ Node.js built-in
const fs = require('fs'); // optional, file handling නම්
const path = require('path'); // optional

// 3️⃣ Bot object (Baileys connection) - command handler එකෙන් pass කරනවා
// async function(robin, mek, m, { q, reply }) => { ... }

// 4️⃣ Poll යැවීමේ structure Baileys object use කරන්න
// (දැමපු code එකේ poll: { name, values, selectableCount })




const { cmd } = require('../lib/command'); // path according to your project

cmd(
  {
    pattern: "poll",
    desc: "Create poll with question & options",
    category: "group",
    react: "📊",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    try {
      if (!q.includes("&")) {
        return reply(
          "*📊 Usage:* \n.poll ප්‍රශ්නය & option1, option2, option3...\n\nඋදා: .poll ඔබේ කැමති App එක කුමක්ද? & YouTube, Spotify, TikTok, Facebook"
        );
      }

      // Split question and options
      let [question, optionsText] = q.split("&");
      let pollQuestion = question.trim();
      let pollOptions = optionsText.split(",").map(o => o.trim()).filter(o => o.length > 0);

      if (!pollQuestion || pollOptions.length < 2) {
        return reply("❌ Question එක හෝ Options 2කට වඩා තිබිය යුතුයි!");
      }

      // Send poll
      await robin.sendMessage(m.chat, {
        poll: {
          name: pollQuestion,
          values: pollOptions,
          selectableCount: 1, // single select
        },
      }, { quoted: m });

    } catch (e) {
      console.log(e);
      reply("❌ Poll එක යවද්දි error එකක් ආවා!");
    }
  }
);
