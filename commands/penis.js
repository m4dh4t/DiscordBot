module.exports = {
	name: 'penis',
	description: 'Gives your penis size (100% accurate).',
	usage: '[@Username]',
	cooldown: 3,
	aliases: ['pp', 'pepou', 'dingdong', 'peepee'],
	overridenPrefix: 'pls',

	execute(message, args) {
		const messageSent = message.content.toString().toLowerCase();
		const taggedUser = message.mentions.users.first();
		
		let random = Math.floor(Math.random() * 11); // Nombre de "=" -> entre 0 et [nombre-1]
		let txt = '';
		let argsTxt = '';
		let replace = false;
		let a = 0;

		if (!message.mentions.users.size) { // *penis
			if (!args.length) {
				txt = `${message.author.username}'s penis\n8`;

				switch (message.author.id) {
				case '219175344199041035': // Micha
					random = 55;
					break;

				case '321006216887402496': // Kento
					random = 0;
					replace = true;
					break;
				}
			}
			else { // *penis + args
				if (!messageSent.startsWith('pls')) {
					const arguments = args.toString().toLowerCase();
					switch (arguments) {
					case 'noich':
						random = 0;
						break;
					}

					for (let i = 0 ; i < args.length ; i++) {
						argsTxt += args[i];
						if (i < (args.length - 1)) {
							argsTxt += ' ';
						}
					}
					txt = `${argsTxt}'s penis\n8`;
				}
			}
		}
		else { // *penis @...
			txt = `${taggedUser.username}'s penis\n8`;

			switch (taggedUser.id) {
			case '219175344199041035': // Micha
				random = 55;
				replace = true;
				break;

			case '321006216887402496': // Kento
				random = 0;
				replace = true;
				break;
			}
		}

		if (messageSent.startsWith('pls') && replace) {
			message.channel.awaitMessages(m => m.author.id == '270904126974590976', // bot deletes dank memer's message
				{ max: 1, time: 3000 }).then(collected => {
				collected.first().delete();
			});
		}

		if (!messageSent.startsWith('pls') && message.author.id != '321006216887402496' || replace) {
			// txt writing
			while (a < random) {
				txt += '=';
				a++;
			}
			txt += 'D';

			const penisEmbed = new Discord.MessageEmbed()
				.setColor('#' + (Math.random() * 0xFFFFFF << 0).toString(16))
				.setTitle('real peepee size machine')
				.setDescription(txt);

			message.channel.send(penisEmbed);
		}
	},
};