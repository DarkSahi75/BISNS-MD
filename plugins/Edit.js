const fs = require('fs');
const path = require('path');
const config = require('./config'); // make sure config.ANTI_EDIT is defined
const { cmd } = require("../lib/command");
function getStorageFilePath(jid) {
  return path.join(__dirname, `./lib/messageStore/${jid}.json`);
}

function loadMessageHistory(jid) {
  const file = getStorageFilePath(jid);
  if (!fs.existsSync(file)) return [];
  try {
    return JSON.parse(fs.readFileSync(file));
  } catch (e) {
    return [];
  }
}

function handleAntiEdit(conn, mek) {
  if (!config.ANTI_EDIT) return;
  if (!mek.message || !mek.message.protocolMessage || mek.message.protocolMessage.type !== 2) return;

  const jid = mek.key.remoteJid;
  const messageId = mek.message.protocolMessage.key.id;
  const chatHistory = loadMessageHistory(jid);

  const originalMessage = chatHistory.find(msg => msg.key.id === messageId);
  if (!originalMessage || !originalMessage.message) return;

  const editedContent = mek.message.protocolMessage.editedMessage?.conversation ||
                        mek.message.protocolMessage.editedMessage?.extendedTextMessage?.text;

  const originalContent = originalMessage.message.conversation ||
                          originalMessage.message.extendedTextMessage?.text;

  if (!editedContent || !originalContent || editedContent === originalContent) return;

  const from = mek.key.remoteJid;
  const sender = mek.participant || mek.key.participant || mek.key.remoteJid;
  const editedBy = sender.split('@')[0];
  const sentBy = originalMessage.key?.participant?.split('@')[0] || editedBy;

  const msg = `✏️ *Message Edited!*\n\n👤 *Edited by:* _${editedBy}_\n📝 *Original Message:* \`\`\`${originalContent}\`\`\``;

  conn.sendMessage(from, { text: msg }, { quoted: mek });
}
