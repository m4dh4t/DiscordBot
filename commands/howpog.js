module.exports = {
	name: 'howpog',
	description: '',
	usage: '[@Username]',
	cooldown: 3,
	overridenPrefix: 'pls',

	execute(message, args) {
		const messageSent = message.content.toString().toLowerCase();
		if (messageSent.startsWith('*')) { // S'assure que le préfixe est bien "pls"
			return;
		}

		const taggedUser = message.mentions.users.first();         // Identifier taggedUser
		const maxPercent = 100;
		let random = Math.floor(Math.random() * (maxPercent + 1)); // Pourcentage -> entre 0 et [nombre-1]
		let txt          = '';
		let argsTxt      = '';
		let avatarName   = message.author.username; // Utile pour affichage avatar final
		let avatarImage  = message.author;			// Pareil

		if (!message.mentions.users.size) { // pls pd
			if (!args.length) {
				txt = "You are ";

				switch (message.author.id) {
					case '219175344199041035': // Micha
						random = 100;
						break;

					/*
					case '321006216887402496': // Kento
						random = 0;
						break;
					*/
				}
			} else { // pls pd + args
				const arguments = args.toString().toLowerCase();
				switch (arguments) {
					case 'noich':
						random = 0;
						break;
                    
                    case 'this':
                        random = 100;
                        break;

					case 'One Piece':
					case 'op':
						random = 200;
						break;
				}

				for (let i = 0 ; i < args.length ; ++i) { // Séparation des arguments
					argsTxt += args[i];
					if (i < (args.length - 1)) {
						argsTxt += ' ';
					}
				}
				txt = `${argsTxt} is `;
			}
		} else { // pls pd @...
			txt = `${taggedUser.username} is `;
			avatarName = taggedUser.username;
			avatarImage = taggedUser;

			switch (taggedUser.id) {
				case '219175344199041035': // Micha
					random = 100;
					break;

				/*
				case '321006216887402496': // Kento
					random = 0;
					break;
				*/
			}
		}

		// Txt writing
		txt += `${random}% POG :frog:\n\n`;

		// Txt sending
		const pdEmbed = new Discord.MessageEmbed()
			.setColor('#' + (Math.random() * 0xFFFFFF << 0).toString(16))
			.setAuthor(avatarName, avatarImage.displayAvatarURL({ format: 'png', dynamic: true }))
			.setTitle("BRO THAT'S POG")
			.setDescription(txt);

		message.channel.send(pdEmbed);
	},
};