const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });
function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}


module.exports = {
SESSION_ID: process.env.SESSION_ID === undefined ? 'DINUWH-MD=etIWSDTC#_k3duthblbbr9ZLfDsqP8a3n7TfgqCx40u9v_Yl_xfU' : process.env.SESSION_ID,
OWNER_NUMBER: process.env.OWNER_NUMBER === undefined ? '' : process.env.OWNER_NUMBER,
N_JID: process.env.N_JID=== undefined ? '‌': process.env.N_JID,    
PREFIX: process.env.PREFIX || '.' ,
POSTGRESQL_URL: process.env.POSTGRESQL_URL === undefined ? 'postgres://vajiratech_user:oSIFl2xmSojMZ0rkzdd0g0W6msuVTpNN@dpg-cpd7fjv109ks73e5gtig-a.frankfurt-postgres.render.com/vajiratech' : process.env.POSTGRESQL_URL,   
MAX_SIZE: 500,
TMJID: process.env.TMJID || "120363389338541551@newsletter",
 //"120363418532826629@newsletter",
JIDPASINDU: process.env.JIDPASINDU ||"__",
CARTOON: process.env.CARTOON ||"120363419668799590@newsletter",
ALONE: process.env.ALONE || "120363421003781261@newsletter",
ANTI_EDIT: process.env.ANTI_EDIT|| "true",
DINUWH: process.env.DINUWH ||"120363411875123040@newsletter",
JIDBEZ: process.env.JIDBEZ || "120363378149186656@newsletter",
ANTI_DELETE: process.env.ANTI_DELETE || "true",
LANG: process.env.LANG || "SI",
Gimsara: process.env.Gimsara || "120363399737889216@newsletter",
DENU: process.env.DENU || "120363420030122239@newsletter",
BOOT: process.env.BOOT || "120363419802728983@newsletter",
SAHAS: process.env.SAHAS || "120363398273303226@newsletter",
ANTI_CALL: process.env.ANTI_CALL || "true",
MODE: process.env.MODE === undefined ? 'nonbutton' : process.env.MODE,
STATUS_REPLY_MESSAGE: 'ʏᴏᴜʀ ꜱᴛᴀᴛᴜꜱ ᴊᴜꜱᴛ ɴᴏᴡ ꜱᴇᴇɴ ʙʏ Qᴜᴇᴇɴ ᴅᴇᴡᴍɪɴɪ ᴍᴅ',    
ALIVE:  process.env.ALIVE  || '> QUEEN DEWMINI MD'  , 
FOOTER: process.env.FOOTER || '> ∂ιηυω-χ вєтα✔️',
Freedom: process.env.Freedom ||"120363370227470443@newsletter",
DELETEMSGSENDTO : process.env.DELETEMSGSENDTO === undefined ? '' : process.env.DELETEMSGSENDTO        
};
