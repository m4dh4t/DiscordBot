module.exports = {
	name: 'random',
	description: 'Displays a random number between 1 and the number you choose (10 by default)',
    aliases: ['rand'],
	execute(message, args) {
        const Discord = require('discord.js');
        
        var random;
        var borneMax = 10;
        const randomEmbed = new Discord.MessageEmbed()
                .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
                .setTitle('RANDOM NUMBER GENERATOR');
        
        if (!args.length) { //*random
            borneMax = 10;
        } else { //*random + args
            var arguments = Number(args);

            if (isNaN(arguments)) {
                randomEmbed.setTitle('ERROR !');
                randomEmbed.setDescription('The input you tried to submit was not a number !');
                message.channel.send(randomEmbed);
                return false;
            }

            borneMax = parseInt(arguments);
        }

        (function () {
            random = Math.floor(Math.random() * borneMax) + 1;

            randomEmbed.addField(`Your number (between 1 and ${borneMax}):`, random);
            message.channel.send(randomEmbed);
        }());
	},
};