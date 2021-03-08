module.exports = {
	name: 'howpog',
	description: '',
	usage: '[@Username]',
	cooldown: 3,
	aliases: ['deps'],
	overridenPrefix: 'pls',

	execute(message, args) {
		const messageSent = message.content.toString().toLowerCase();
		if (messageSent.startsWith('*')) { // S'assure que le préfixe est bien "pls"
			return;
		}

		const taggedUser = message.mentions.users.first();         // Identifier taggedUser
		const maxPercent = 100;
		let random = Math.floor(Math.random() * (maxPercent + 1)); // Pourcentage -> entre 0 et [nombre-1]
		let randomSentences; 									   // Choix random des répliques pour chaque palier
		let txt          = '';
		let argsTxt      = '';
		let avatarName   = message.author.username; // Utile pour affichage avatar final
		let avatarImage  = message.author;			// Pareil

		let sentences10  = ["Wow. Straighter than my dick when i'm with your mom", "1/Kento"];
		let sentences25  = ["Part of the elite. Be proud garçon", "How does it feel, having all those women around you ?"];
		let sentences50  = ["Well I guess it's still lower than average..", "Never stop fighting against your dark side soldier !"];
		let sentences80  = ["Bro you're kinda sus ngl", "Caught in 4K"];
		let sentences90  = ["How was the ribs removal surgery ? I hope you're okay !", "I didn't know James Charles had another brother ( ͠° ͟ʖ ͡°)", "Honey could be a good medicine for your sore throat", "You're just cringe at this point"];
		let sentences100 = ["Oh sorry I thought you were Kentchoin", "Kento would be proud"];

		if (!message.mentions.users.size) { // pls pd
			if (!args.length) {
				txt = "You are ";

				switch (message.author.id) {
					case '219175344199041035': // Micha
						random = 100;
						break;

					/*
					case '321006216887402496': // Kento
						random = 200;
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
                        random = 100
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
					random = 200;
					break;
				*/
			}
		}

		// Txt writing
		txt += `${random}% POG :frog:\n\n`;

        /*
		switch (true) {
			case (random < 10):
				randomSentences = Math.floor(Math.random() * sentences10.length);
				txt += sentences10[randomSentences];
				break;

			case (random < 25):
				randomSentences = Math.floor(Math.random() * sentences25.length);
				txt += sentences25[randomSentences];
				break;

			case (random < 50):
				randomSentences = Math.floor(Math.random() * sentences50.length);
				txt += sentences50[randomSentences];
				break;

			case (random == 69):
				txt += "Nice";
				break;

			case (random < 80):
				randomSentences = Math.floor(Math.random() * sentences80.length);
				txt += sentences80[randomSentences];
				break;

			case (random < 90):
				randomSentences = Math.floor(Math.random() * sentences90.length);
				txt += sentences90[randomSentences];
				break;

			case (random <= maxPercent):
				randomSentences = Math.floor(Math.random() * sentences100.length);
				txt += sentences100[randomSentences];
				break;

			default:
				txt += "Kento arrête d'essayer mdr";
		}
        */

		// Txt sending
		const pdEmbed = new Discord.MessageEmbed()
			.setColor('#' + (Math.random() * 0xFFFFFF << 0).toString(16))
			.setAuthor(avatarName, avatarImage.displayAvatarURL({ format: 'png', dynamic: true }))
			.setTitle("BRO THAT'S POG")
			.setDescription(txt);

		message.channel.send(pdEmbed);
	},
};