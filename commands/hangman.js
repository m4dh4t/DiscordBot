module.exports = {
	name: 'hangman',
	description: 'A handmade hangman minigame',
	aliases: ['hm', 'pendu'],
	usage: '[] or [solo | alone | 1]',
	execute(message, args) {
		if (tPlayersHM.length) {
			message.channel.send("```css\n[Une autre session est déjà en cours !]```");
			return;
		}

		tPlayersHM.push(message.author.id);
		const randomWords = require('random-words');
		const correctWord = randomWords();
		const tCorrectWord = correctWord.split('');
		const timeToRecruit = 15000;
		const tDifficultyNames = ['Facile', 'Moyen', 'Difficile', 'Expert', 'Hardcore'];
		const tDifficultyNbr = [10, 7, 5, 3, 1];
		var nbrAttempts;
		var hiddenWord = '';
		var wrongLetters = '';
		var correctAnswer = 0;
		var tHiddenWord = [];
		var tWrongLetters = [];
		var playersList = message.author.username;
		var playSolo = false;
		let list;
		let msg;

		if (args.length) {
			switch (args[0]) {
				case 'alone':
				case 'solo':
				case '1':
					playSolo = true;
					break;
			}
		}

		//************************************************************************************************************************************************************************************************** Recrutement
		function addPlayerToList (embed) {
			const embedToChange = embed;
			embedToChange.fields = [];
			const listEmbed = new Discord.MessageEmbed(embedToChange)
				.addField('Liste des participants:', playersList);

			list.edit(listEmbed);
		}

		(async function() {
			if (!playSolo) {
				const recruitEmbed = new Discord.MessageEmbed()
					.setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
					.setTitle('RECRUTEMENT')
					.setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
					.setDescription("Envoyez **join** pour rejoindre la partie de " + message.author.username + " !")
					.addField('Liste des participants:', playersList);
				list = await message.channel.send(recruitEmbed);
	
				const filterRecruit = m => m.content.toLowerCase().includes('join');
				const collector = message.channel.createMessageCollector(filterRecruit, { time: timeToRecruit });
	
				collector.on('collect', m => {
					if (tPlayersHM.includes(m.author.id)) {
						m.reply("tu es déjà dans la partie !");
					} else {
						message.channel.send("```fix"+`\n${m.author.username} vient d'être ajouté à la partie !`+"\n```");
						tPlayersHM.push(m.author.id);
						playersList += ', ' + m.author.username;
						addPlayerToList(recruitEmbed);
					}
				});
				
				collector.on('end', collected => {
					difficulty();
				});
			} else {
				difficulty();
			}
		}());

		//************************************************************************************************************************************************************************************************** Difficulty selector
		function difficulty () {
			const difficultyEmbed = new Discord.MessageEmbed()
				.setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
				.setTitle('CHOIX DE LA DIFFICULTÉ')
				.setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
				.setDescription("Envoyez le chiffre correspondant au niveau de difficulté souhaité.");
				
			for (let i = 0 ; i < tDifficultyNbr.length ; i++) {
				difficultyEmbed.addField(`${i+1}: ${tDifficultyNames[i]}`, `${tDifficultyNbr[i]} erreur${i === (tDifficultyNbr.length - 1) ? '' : 's'} possible${i === (tDifficultyNbr.length - 1) ? '' : 's'}`);
			}
			message.channel.send(difficultyEmbed);

			function isNumber(nbr) {
				if (nbr.length > 1 || !nbr.match(/[1-5]/)) {
					return false;
				}
				return true;
			}

			const filterDifficulty = m => isNumber(m.content) === true && m.author.id === message.author.id;
			const collector = message.channel.createMessageCollector(filterDifficulty, { time: timeToRecruit, max: 1 });

			collector.on('collect', m => {
				nbrAttempts = tDifficultyNbr[m.content - 1];
			});
			
			collector.on('end', collected => {
				if (collected.size) {
					playGame();
				} else {
					message.channel.send('```Vous avez mis trop de temps pour choisir la difficulté !```');
					tPlayersHM = [];
					return;
				}
			});
		}

		//************************************************************************************************************************************************************************************************** Game
		async function playGame () {

			//************************************************************************************************************************************************************************************ Useful functions
			function escapeMarkdown(text) {
				var unescaped = text.replace(/\\(\*|_|`|~|\\)/g, '$1'); // unescape any "backslashed" character
				var escaped = unescaped.replace(/(\*|_|`|~|\\)/g, '\\$1'); // escape *, _, `, ~, \
				return escaped;
			}

			function isLetter(str) {
				const tStr = str.split('');
				for (let i = 0 ; i < tStr.length ; i++) {
					if (!tStr[i].match(/[a-z]/)) {
						return false;
					}
				}
				return true;
			}

			function hiddenWordWriting () {	
				hiddenWord = '';
				for (let a = 0 ; a < tHiddenWord.length ; a++) {
					hiddenWord += tHiddenWord[a];
				}
				return hiddenWord;
			}

			function wrongLettersWriting () {
				wrongLetters = 'Aucune';
				if (tWrongLetters.length > 0) {
					tWrongLetters.sort();
					for (let b = 0 ; b < tWrongLetters.length ; b++) {
						if (b === 0) {
							wrongLetters = '';
						}
						wrongLetters += tWrongLetters[b];
					}
				}
				return wrongLetters;
			}

			//************************************************************************************************************************************************************************************ Intro
			const underscore = escapeMarkdown('_ ');
			for (let i = 0 ; i < tCorrectWord.length ; i++) {
				tHiddenWord.push(underscore);
			}

			for (let j = 0 ; j < tDifficultyNbr.length ; j++) {
				if (tDifficultyNbr[j] === nbrAttempts) {
					var txt = `PENDU (${tDifficultyNames[j]})`;
					break;
				} 
			}
			
			const gameEmbed = new Discord.MessageEmbed()
				.setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
				.setTitle(txt)
				.setAuthor(playersList)
				.setDescription("Voici les règles du jeu pour ceux en ayant besoin:\nhttps://fr.wikipedia.org/wiki/Le_Pendu_(jeu)")
				.addFields (
					{ name: 'Mot (anglais):', value: hiddenWordWriting() },
					{ name: 'Lettres utilisées:', value: wrongLettersWriting(), inline: true },
					{ name: "Nbr d'erreurs restant:", value: nbrAttempts, inline: true },
				);

			msg = await message.channel.send(gameEmbed);

			//************************************************************************************************************************************************************************************ Collect answer
			const filterAnswer = m => tPlayersHM.includes(m.author.id) && isLetter(m.content) === true;
			const collector = message.channel.createMessageCollector(filterAnswer);

			collector.on('collect', m => {
				testAnswer(m.content.toLowerCase());

				if (correctAnswer === tCorrectWord.length || tWrongLetters.length === nbrAttempts) {
					collector.stop();

					if (correctAnswer === tCorrectWord.length) {
						message.channel.send('```bash\n'+
							`Bravo !\nLe mot était bien "${correctWord}" !`
							+'\n```');
					} else {
						message.channel.send('```bash\n'+
							`Pas ouf, le mot était "${correctWord}" :(`
							+'\n```');
					}
					tPlayersHM = [];
				}
			});

			//************************************************************************************************************************************************************************************ Test answer
			function testAnswer (answerGiven) {
				if (answerGiven === correctWord) {
					for (let i = 0 ; i < tCorrectWord.length ; i++) {
						tHiddenWord[i] = `${tCorrectWord[i]} `;
					}
					correctAnswer = tCorrectWord.length;
				} else if (tCorrectWord.includes(answerGiven)) {
					if (!tHiddenWord.includes(`${answerGiven} `)) {
						for (let j = 0 ; j < tCorrectWord.length ; j++) {
							if (tCorrectWord[j] === answerGiven) {
								tHiddenWord[j] = `${answerGiven} `;
								correctAnswer++;
							}
						}
					}
				} else {
					if (answerGiven.length > 1) {
						nbrAttempts--;
					} else if (!tWrongLetters.includes(' `' + answerGiven.toUpperCase() + '`')) {
						tWrongLetters.push(' `' + answerGiven.toUpperCase() + '`');
					}
				}

				const receivedEmbed = gameEmbed;
				receivedEmbed.fields = [];
				const edittedEmbed = new Discord.MessageEmbed(receivedEmbed)
					.addFields (
						{ name: 'Mot (anglais):', value: hiddenWordWriting() },
						{ name: 'Lettres utilisées:', value: wrongLettersWriting(), inline: true },
						{ name: "Nbr d'erreurs restant:", value: nbrAttempts - tWrongLetters.length, inline: true },
					);

				msg.edit(edittedEmbed);
			}
		}
	},
};