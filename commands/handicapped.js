module.exports = {
	name: 'handicapped',
	description: 'pédales',
    cooldown: 3,
    aliases: ['hc'],
	execute(message, args) {
        const Discord = require('discord.js');
        
        const taggedUser = message.mentions.users.first();
        
        let random = Math.floor(Math.random() * 101); //Nombre de "=" -> entre 0 et [nombre-1]
        let confirm = false;
        let msgToSend = '';
        let argsTxt = '';
        
        //members' handicap (in %)
        let kento = 200;
        let pace = 100;
        let bot = 0;
        
        if (!message.mentions.users.size) { //*handicapped
            if (!args.length) { //*handicapped
                switch (message.author.id) {
                    case '321006216887402496': //Kento
                        random = kento;
                        break;

                    case '268061959235174420': //Pace
                        random = pace;
                        break;
                }
                msgToSend = `${message.author.username} is `+random+'% handicapped';
                confirm = true;
            } else { //*handicapped + args
                let arguments = args.toString().toLowerCase();
                switch (arguments) {
                    case "yone":
                    case "yasuo":
                        random = 69420;
                        break;
                        
                    case "nunu,mid":
                        random = 420;
                        break;
                }
                
                for (let i = 0 ; i < args.length ; i++) {
                    argsTxt += args[i];
                    if (i < (args.length-1)) {
                        argsTxt += ' ';
                    }
                }
                msgToSend = `${argsTxt} is `+random+'% handicapped';
                confirm = true;
            }
        } else { //*handicapped @...
            switch (taggedUser.id) {
                case '732680410643038209': //Bot
                    random = bot;
                    break;

                case '321006216887402496': //Kento
                    random = kento;
                    break;

                case '268061959235174420': //Pace
                    random = pace;
                    break;
            }
            msgToSend = `${taggedUser.username} is `+random+'% handicapped';
            confirm = true;
        }
        
        if (confirm) {
            const handicappedEmbed = new Discord.MessageEmbed()
                .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
                .setTitle("retard-o-meter")
                .setDescription(msgToSend + ' :wheelchair:');

            message.channel.send(handicappedEmbed);
        }
	},
};