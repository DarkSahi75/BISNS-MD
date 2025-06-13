const config = require('../settings')
const {
    cmd,
    commands
} = require('../lib/command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, jsonformat} = require('../lib/functions')
const axios = require('axios')
const cheerio = require('cheerio')
const fg = require('api-dylux');
const si = require('systeminformation')
const os = require('os')
var { get_set , input_set } = require('../lib/set_db') 
const  bot = `94765527900`



var BOTOW = ''
if(config.LANG === 'SI') BOTOW = "*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ !*"
else BOTOW = "*You are not bot\'s owner or moderator !*"



cmd({
    pattern: "setp",
    react: "🗣️",
    desc: "To Activate auto news",
    category: "main",
    use: '.setprefix .',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!isOwner) return await reply(BOTOW)
    if ( config.PREFIX == q) return reply(`Succesfully Song Change To This Section`)
  await input_set('PREFIX' , q)
  return reply(`PREFIX was changed`)
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "anti_dell",
    react: "🗣️",
    desc: "To Activate auto news",
    category: "main",
    use: '.setprefix .',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!isOwner) return await reply(BOTOW)
    if ( config.PREFIX == q) return reply(`Succesfully Anti Delete Change To This Section`)
  await input_set('ANTI_DELETE' , q)
  return reply(`Anti Delete Mode was changed`)
} catch (e) {
reply('*Error !!*')
l(e)
}
})


cmd({
    pattern: "run",
    react: "🗣️",
    desc: "To Activate auto news",
    category: "main",
    use: '.setprefix .',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!isOwner) return await reply(BOTOW)
    if ( config.PREFIX == q) return reply(`Succesfully Mode Changed To This Section`)
  await input_set('MODE' , q)
  return reply(`run Mode was changed`)
} catch (e) {
reply('*Error !!*')
l(e)
}
})


cmd({
    pattern: "call_reject",
    react: "🗣️",
    desc: "To Activate auto news",
    category: "main",
    use: '.setprefix .',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!isOwner) return await reply(BOTOW)
    if ( config.ANTI_CALL == q) return reply(`Succesfully Mode Changed To This Section`)
  await input_set('ANTI_CALL' , q)
  return reply(`anti call Mode was changed`)
} catch (e) {
reply('*Error !!*')
l(e)
}
})
