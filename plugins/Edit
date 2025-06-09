const fs = require('fs');
const path = require('path');
const config = require('../settings');
const { cmd } = require("../lib/command");

const messageStorePath = path.join(__dirname, '../lib/messageStore');

function getStorageFilePath(jid) {
  return path.join(messageStorePath, `${jid}.json`);
}

function loadMessageHistory(jid) {
  const file = getStorageFilePath(jid);
  if (!fs.existsSync(file)) return [];
  try {
    return JSON.parse(fs.readFileSync(file));
  } catch (e) {
    console.error("Error reading history:", e);
    return [];
  }
}

// 🔧 Save all incoming messages to a JSON file
function storeMessage(jid, msg) {
  const file = getStorageFilePath(jid);
  let messages = [];
  if (fs.existsSync(file)) {
    try {
      messages = JSON.parse(fs.readFileSync(file));
    } catch {
      messages = [];
    }
  }
  messages.push(msg);
  fs.writeFileSync(file, JSON.stringify(messages.slice(-50), null, 2)); // keep last 50
}

// 🧠 Detect and respond to edited messages
async function handleAntiEdit(conn, mek) {
  if (!config.ANTI_EDIT) return;
  if (!mek.message || !mek.message.protocolMessage || mek.message.protocolMessage.type !== 2) return;

  const jid = mek.key.remoteJid;
  const messageId = mek.message.protocolMessage.key.id;
  const chatHistory = loadMessageHistory(jid);

  const originalMessage = chatHistory.find(msg => msg.key.id === messageId);
  if (!originalMessage || !originalMessage.message) return;

  const editedContent =
    mek.message.protocolMessage.editedMessage?.conversation ||
    mek.message.protocolMessage.editedMessage?.extendedTextMessage?.text;

  const originalContent =
    originalMessage.message.conversation ||
    originalMessage.message.extendedTextMessage?.text;

  if (!editedContent || !originalContent || editedContent === originalContent) return;

  const from = mek.key.remoteJid;
  const sender = mek.participant || mek.key.participant || mek.key.remoteJid;
  const editedBy = sender.split('@')[0];
  const sentBy = originalMessage.key?.participant?.split('@')[0] || editedBy;

  const msg = `✏️ *Message Edited!*\n\n👤 *Edited by:* _${editedBy}_\n📝 *Original Message:* \`\`\`${originalContent}\`\`\``;

  await conn.sendMessage(from, { text: msg }, { quoted: mek });
}

// 📥 Register all incoming messages
cmd({ on: 'message' }, async (conn, m) => {
  if (!m.message) return;
  const jid = m.key.remoteJid;
  storeMessage(jid, m);
});

// 🧪 Register anti-edit handler
cmd({ on: 'message.update' }, async (conn, m) => {
  try {
    await handleAntiEdit(conn, m);
  } catch (e) {
    console.error("Error in anti-edit:", e);
  }
});
