// ✅ REQUIRED PACKAGES
const {
  jidDecode
} = require("@whiskeysockets/baileys");
const cmd = require("../lib/command");
// ✅ PLUGIN START
cmd({
  pattern: "kthis",
  alias: ["remove"],
  desc: "Tag කරන ලද userලා group එකෙන් ඉවත් කරයි.",
  category: "group",
  use: ".kick @user",
  filename: __filename
}, async (m, conn, { isAdmin, isBotAdmin }) => {

  // ✅ GROUP ONLY CHECK
  if (!m.isGroup) return m.reply("⚠️ මේ කමාන්ඩ් එක group chats වලට විතරයි!");

  // ✅ ADMIN CHECK
  if (!isAdmin) return m.reply("🚫 ඔයා group එකේ admin කෙනෙක් වෙන්න ඕනේ මේක භාවිතා කරන්න.");

  // ✅ BOT ADMIN CHECK
  if (!isBotAdmin) return m.reply("🤖 මම admin නෙමෙයි! මට user kick කරන්න බැහැ.");

  // ✅ TAG CHECK
  if (!m.mentionedJid || m.mentionedJid.length === 0) {
    return m.reply("🔖 කරුණාකර kick කරන්න ඕන user එක tag කරන්න!\n\nตัวอย่าง: `.kick @user`");
  }

  // ✅ REMOVE MENTIONED USERS
  let kicked = [];
  for (let user of m.mentionedJid) {
    if (user.endsWith("@g.us")) continue; // group tag වලින් ආවොත් skip
    try {
      await conn.groupParticipantsUpdate(m.chat, [user], "remove");
      kicked.push(user.split("@")[0]);
    } catch (e) {
      m.reply(`❌ ${user.split("@")[0]} එක kick කරන්න බැරිවුණා!`);
    }
  }

  // ✅ SUCCESS MESSAGE
  if (kicked.length > 0) {
    await m.reply(`✅ Successfully kicked:\n\n🦶 ${kicked.map(x => `@${x}`).join("\n🦶 ")}`, {
      mentions: m.mentionedJid
    });
  }

});
