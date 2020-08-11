module.exports = {
    name: 'penis',
    description: 'Gives your penis size (100% accurate).',
	usage: '[@Username]',
    cooldown: 3,
    aliases: ['pp', 'pepou', 'dingdong'],
    overridingBotPrefix: 'pls',
	execute(message, args) {
        const { prefixes } = require('../config.json');
        
        const taggedUser = message.mentions.users.first();
        const delay = 100;
        
        let random = Math.floor(Math.random() * 11); //Nombre de "=" -> entre 0 et [nombre-1]
        let txt = '';
        let msgToSend = '';
        let argsTxt = '';
        let replace = false;
        let a = 0;
        
        if (message.content.startsWith(prefixes[0])) { //*...
            if (!message.mentions.users.size) { //*penis
                if (!args.length) {
                    txt = `${message.author.username}'s penis\n8`;
                
                    switch (message.author.id) {
                        case '219175344199041035': //Micha
                            random = 30;
                            break;

                        case '321006216887402496': //Kento
                            random = 0;
                            break;
                    }
                } else { //*penis + args
                    let arguments = args.toString().toLowerCase();
                    switch (arguments) {
                        case "noich":
                            random = 0;
                            break;
                    }

                    for (let i = 0 ; i < args.length ; i++) {
                        argsTxt += args[i];
                        if (i < (args.length-1)) {
                            argsTxt += ' ';
                        }
                    }
                    txt = `${argsTxt}'s penis\n8`;
                }
            } else { //*penis @...
                txt = `${taggedUser.username}'s penis\n8`;
                
                switch (taggedUser.id) {
                    case '219175344199041035': //Micha
                        random = 30;
                        break;

                    case '321006216887402496': //Kento
                        random = 0;
                        break;
                }
            }
            
            //txt writing
            while (a < random) {
                txt += '=';
                a++;
            }
            txt += 'D';
            
            const penisEmbed = new Discord.MessageEmbed()
                .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
                .setTitle('real peepee size machine')
                .setDescription(txt);
            
            message.channel.send(penisEmbed);
        } else if (message.content.startsWith(prefixes[1])) { //pls...
            if (!message.mentions.users.size) { //pls penis
                if (message.author.id === '321006216887402496') { //Kento
                    setTimeout(function() {
                        message.channel.bulkDelete(1, true);
                        
                        msgToSend = `${message.author.username}'s penis\n8D`;
                        replace = true;
                    }, delay);
                }
            } else { //pls penis @...
                if (taggedUser.id === '321006216887402496') { //Kento
                    setTimeout(function() {
                        message.channel.bulkDelete(1, true);
                        
                        msgToSend = `${taggedUser.username}'s penis\n8D`;
                        replace = true;
                    }, delay);
                }
            }
            
            setTimeout(function() {
                if (replace) {
                    const plsPenisEmbed = new Discord.MessageEmbed()
                        .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
                        .setTitle('real peepee size machine')
                        .setDescription(msgToSend);

                    message.channel.send(plsPenisEmbed);
                }
            }, delay + 50);
        }
	},
};