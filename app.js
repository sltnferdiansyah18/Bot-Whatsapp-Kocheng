const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

const SESSION_FILE_PATH = './whatsapp-session.json';
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionCfg = require(SESSION_FILE_PATH);
}

const client = new Client({ puppeteer: { headless: true }, session: sessionCfg });

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr);
});

client.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session);
    sessionCfg=session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
    });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == 'p') {
        msg.reply('salam yang bener dong brodi');
    }else if (msg.body == 'assalamualaikum') {
         msg.reply(`waalaikumsalam brader`);        
    }else if (msg.body == 'mikkum'){
        msg.reply('calam');
    }else if (msg.body == 'samlekom') {
        msg.reply('komsalam');
    }else if (msg.body == 'samlikum'){
        msg.reply('kumsalam')
    }else if (msg.body == 'Punten'){
        msg.reply(`halo kakak`);
    }else if (msg.body == 'punten'){
        msg.reply(`halo kakak`);
    }else if (msg.body == 'P'){
        msg.reply(`salam yang bener dong brodi`);
    }else if (msg.body == 'Assalamualaikum'){
        msg.reply(`Waalaikumsalam`);
    }else if (msg.body == 'kontol'){
        msg.reply(`astaghfirullahhiladim, kamu ini berdosa banget`);
    }else if (msg.body == 'bgst'){
        msg.reply(`astaghfirullahhiladim, kamu ini berdosa banget`);
    }else if (msg.body == 'memek'){
        msg.reply(`astaghfirullahhiladim, kamu ini berdosa banget`);
    }else if (msg.body == 'anjing'){
        msg.reply(`santai dong tolol`);
    }else if (msg.body == 'anjink'){
        msg.reply(`santai dong tolol`);
    }else if (msg.body == 'bangsat'){
        msg.reply(`astaghfirullahhiladim, kamu ini berdosa banget`);
    }else if (msg.body == 'puki'){
        msg.reply(`astaghfirullahhiladim, kamu ini berdosa banget`);
    }else if (msg.body == 'ajg'){
        msg.reply(`santai dong tolol`);
    }else if (msg.body == 'tolol'){
        msg.reply(`santai dong tolol`);
    }else if (msg.body == 'goblok'){
        msg.reply(`lu yang goblok kontol`);
    }else if (msg.body == 'gblg'){
        msg.reply(`lu yang goblok kontol`);
    }else if (msg.body == 'goblog'){
        msg.reply(`lu yang goblok kontol`);
    }else if (msg.body == 'gblk'){
        msg.reply(`lu yang goblok kontol`);
    }
});

client.on('message', msg =>{
    if (msg.body == 'dev'){
    msg.reply(`*#DEVELOPER CONTACT*

*whatsapp*  : https://wa.me/+6285236474051
*instagram* : https://instagram.com/sltnferdiansyah`);
	}
});

client.on('message', msg =>{
	if (msg.body == 'about'){
        msg.reply(`*Bot Kocheng*
bot masih dalam tahap awal
bot belum dapat bekerja secara maksimal dan mungkin akan ada bug yang tersedia.
dan bot blum bisa aktif secara optimal.

saat ini developer sedang mencoba untuk mengembangkan bot ini

hubungi developer jika ada masalah dalam bot atau ingin memberi saran`)};
});

client.on('message', async msg => {
	console.log('MESSAGE RECEIVED', msg);

	if (msg.body == 'meong leave') {
        let chat = await msg.getChat();
        if (chat.isGroup) {
            chat.leave();
        } else {
            msg.reply('perintah ini hanya dapat dijalankan di dalam grup!');
        }
    } else if (msg.body.startsWith('meong join ')) {
        const inviteCode = msg.body.split(' ')[2];
        try {
            await client.acceptInvite(inviteCode.replace('https://chat.whatsapp.com/', ''));
            msg.reply('berhasil bergabung dengan grup!');
        } catch (e) {
            msg.reply('tautan grup telah di setel ulang.');
        }
    } else if (msg.body == 'meong grup info') {
        let chat = await msg.getChat();
        if (chat.isGroup) {
            msg.reply(`*${chat.name}*
Desc: ${chat.description}
Created At: ${chat.createdAt.toString()}
Created By: ${chat.owner.user}
Participant count: ${chat.participants.length}`);
        } else {
            msg.reply('perintah ini hanya dapat dijalankan di dalam grup!');
        }
    } else if (msg.body == 'meong info') {
        let info = client.info;
        client.sendMessage(msg.from, `*Connection info*
User name: ${info.pushname}
My number: ${info.me.user}
Platform: ${info.platform}
WhatsApp version: ${info.phone.wa_version}
`);
    } else if (msg.body == 'meong play'){
    	let chat = await msg.getChat();
    	if (chat.isGroup){
        msg.reply(`fitur ini masih dalam tahap pengembangan
ketik *about* untuk info tentang bot
ketik *contact dev* untuk menghubungi developer
            `);
    	}else {
            msg.reply('perintah ini hanya dapat dijalankan di dalam grup!');
        }
    }
});

client.on('message', async msg => {
    console.log('MESSAGE RECEIVED', msg);
    if (msg.body == 'help'){
    	msg.reply(`#Help
Bot KOCHENG
ketik *meong info*
untuk info tentang bot
ketik *meong join*
untuk mengundang bot masuk ke dalam grup
contoh: meong join (link grup)
ketik *meong leave*
untuk mengeluarkan bot dari grup
ketik *grup menu*
untuk fitur grup

ketik *about*
untuk mengetahui tentang Bot Kocheng
ketik *don*
untuk donasi
ketik *dev*
untuk menghubungi developer`);
    }else if (msg.body == 'grup menu'){
        let chat = await msg.getChat();
        if (chat.isGroup) {
            msg.reply(`#Grup Menu
ketik *meong grup info*
untuk info tentang grup

ketik *meong play*
untuk bermain

ketik *meong all*
untuk mention semua peserta grup`);
        }else {
            msg.reply('perintah ini hanya dapat dijalankan di dalam grup!');
        }
    }else if (msg.body == 'meong join'){
        msg.reply(`perintah salah

tolong masukan link grup anda
contoh:
meong join https://chat.whatsapp.com/abcdefghij
        `);
    }else if (msg.body == 'halo') {
        const contact = await msg.getContact();
        const chat = await msg.getChat();
        chat.sendMessage(`halo ${contact.pushname}!
saya Bot Kocheng. 
        
ketik *help*
untuk melihat fitur dalam bot`, {
            mentions: [contact]
        });
    }else if (msg.body == 'meong') {
        const contact = await msg.getContact();
        const chat = await msg.getChat();
        chat.sendMessage(`meong meong ${contact.pushname}!,
saya Bot Kocheng. 
        
ketik *help*
untuk melihat fitur dalam bot`, {
            mentions: [contact]
        });
    }else if (msg.body == 'halo bot') {
        const contact = await msg.getContact();
        const chat = await msg.getChat();
        chat.sendMessage(`halo ${contact.pushname}!,
saya Bot Kocheng. 
        
ketik *help*
untuk melihat fitur dalam bot`, {
            mentions: [contact]
        });
    }else if (msg.body == 'hai bot') {
        const contact = await msg.getContact();
        const chat = await msg.getChat();
        chat.sendMessage(`halo ${contact.pushname}!,
saya Bot Kocheng. 
        
ketik *help*
untuk melihat fitur dalam bot`, {
            mentions: [contact]
        });
    }else if (msg.body == 'bot') {
        const contact = await msg.getContact();
        const chat = await msg.getChat();
        chat.sendMessage(`halo ${contact.pushname}!,
saya Bot Kocheng. 
        
ketik *help*
untuk melihat fitur dalam bot`, {
            mentions: [contact]
        });
    }else if (msg.body == 'hi') {
        const contact = await msg.getContact();
        const chat = await msg.getChat();
        chat.sendMessage(`halo ${contact.pushname}!,
saya Bot Kocheng. 
        
ketik *help*
untuk melihat fitur dalam bot`, {
            mentions: [contact]
        });
    }else if(msg.body == 'meong all') {
        const chat = await msg.getChat();
        
        let text = "";
        let mentions = [];

        for(let participant of chat.participants) {
            const contact = await client.getContactById(participant.id._serialized);
            
            mentions.push(contact);
            text += `@${participant.id.user}
`;
        }

        client.sendMessage(msg.from, text, { mentions });
    }else if (msg.body == 'don') {
        const contact = await msg.getContact();
        const chat = await msg.getChat();
        chat.sendMessage(`#DONATION
halo ${contact.pushname}!,
pilih metode donasi!

VIA 
GOPAY       = +6285236474051
Trakteer ID = https://trakteer.id/sltnferdiansyah/showcase/bot-kocheng-OjZkl
DANA        = https://link.dana.id/qr/26apgmqf

*TERIMA KASIH*`, {
            mentions: [contact]
        });
    } 
});

client.initialize();