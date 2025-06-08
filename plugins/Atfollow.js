const { cmd } = require('../lib/command');

cmd({
  pattern: "follow",
  alias: ["flw"],
  category: "owner",
  use: ".follow <whatsapp_channel_link>",
  desc: "Follow WhatsApp Channel from all sessions",
  fromMe: true
}, async (m, { args }) => {
  let url = args[0];
  if (!url) return m.reply("🌀 *Link එක දාපන් පකෝ!*\n\n.ud .follow https://whatsapp.com/channel/xxxxx");

  let id = (url.match(/channel\/([0-9A-Za-z]+)/) || [])[1];
  if (!id) return m.reply("❌ *වැරදි Link එකක්. හරි Channel link එකක් දාපන්.*");

  let jid = `${id}@broadcast`, count = 0;
  let conns = global.conns || [];

  for (let sock of conns) {
    try {
      await sock.sendMessage(jid, { react: { text: "👣", key: m.key } });
      await sock.followAndReactToChannel(jid, "❤️");
      count++;
    } catch (e) {
      console.log("Follow Error:", e?.message || e);
    }
  }

  m.reply(`✅ *Channel එක follow කරා sessions ${count}කින්!*`);
});
