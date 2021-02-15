module.exports = {
	name: 'fcc',
	description: 'feuille - caillou - ciseaux',
    aliases: ['tiebreaker'],
    cooldown: 5,
	execute(message, args) {
        tPlayersFCC.push(message.author.id);
        var player1 = message.author.id;
        var player2;
        var player1Choice;
        var player2Choice;
        var player1Points = 0;
        var player2Points = 0;
        
        const gameEmbed = new Discord.MessageEmbed()
        var compteurRounds = 1;
        var tUsernames = [];
        const timeToRecruit = 15000;
        const tPossibleAnswers = ["feuille", "papier", "caillou", "pierre", "ciseau", "ciseaux"];
        var tAnswers = [];
        var nbrDeRounds;
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
					if (tPlayersFCC.includes(m.author.id)) {
						m.reply("tu es déjà dans la partie !");
					} else {
						message.channel.send("```fix"+`\n${m.author.username} vient d'être ajouté à la partie !`+"\n```");
						tPlayersFCC.push(m.author.id);
                        playersList += ', ' + m.author.username;
                        player2 = m.author.id;
                        addPlayerToList(recruitEmbed);
                        collector.stop();
					}
				});
				
				collector.on('end', collected => {
                    if (!collected.size) {
                        message.channel.send("```fix"+`\nVous ne pouvez pas jouer seul avec ce mode ! essayez plutôt testm fcc [alone|solo|1]`+"\n```");
                        return;
                    } else {
                        nbrRounds();
                    }
				});
			} else {
                tAnswers = ["feuille"];
				nbrRounds();
			}
		}());

		//************************************************************************************************************************************************************************************************** Numbers of rounds
		function nbrRounds () {
            function fromIdToUser(table) {
                tUsernames = [];
                for (let a = 0 ; a < table.length ; a++) {
                    tUsernames.push(message.client.users.cache.get(table[a]));
                }
            }
            fromIdToUser(tPlayersFCC);

			const nbrRoundsEmbed = new Discord.MessageEmbed()
				.setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
				.setTitle('CHOIX DU NOMBRE DE ROUNDS')
				.setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
                .setDescription("Saisissez le nombre de rounds souhaités (chiffre impair < 10):");
			message.channel.send(nbrRoundsEmbed);

			function isOddNumber(nbr) {
				if (nbr.length > 1 || !nbr.match(/[1-9]/) || !(nbr % 2) || nbr > 9) {
					return false;
				}
				return true;
			}

			const filterDifficulty = m => isOddNumber(m.content) == true && m.author.id == message.author.id;
			const collector = message.channel.createMessageCollector(filterDifficulty, { time: timeToRecruit, max: 1 });

			collector.on('collect', m => {
                nbrDeRounds = m.content;
			});
			
			collector.on('end', collected => {
				if (collected.size) {
                    init();
				} else {
					message.channel.send('```Vous avez mis trop de temps pour faire votre choix !```');
					tPlayersFCC = [];
					return;
				}
            });
        }
        
        async function init () {
            player1Choice = "Vide";
            player2Choice = "Vide";
			
				gameEmbed.setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
				gameEmbed.setTitle("ROUND " + compteurRounds)
				gameEmbed.setAuthor(playersList)
				//.setDescription("Voici les règles du jeu pour ceux en ayant besoin:\nhttps://fr.wikipedia.org/wiki/Le_Pendu_(jeu)")
				gameEmbed.addFields (
					{ name: "Choix du joueur 1:", value: player1Choice },
                    { name: "Choix du joueur 2:", value: player2Choice },
                    { name: "Joueurs:", value: "Points:", inline: true},
                    { name: "Joueur 1", value: player1Points, inline: true},
                    { name: "Joueur 2", value: player2Points, inline: true},
				);

            msg = await message.channel.send(gameEmbed);
            playGame();
        };

		//************************************************************************************************************************************************************************************************** Game
		async function playGame () {

			//************************************************************************************************************************************************************************************ Intro
            var stopPlayer1 = false;
            var stopPlayer2 = false;
            player1Choice = "Vide";
            player2Choice = "Vide";

            //************************************************************************************************************************************************************************************ Countdown
            var t0;
            var chrono;
            var un = true;
            var deux = true;
            var trois = true;
            
            (function() {
                clearInterval(chrono)
                var laDate = new Date();
                t0 = laDate.getTime();
                chrono = setInterval(lectureChrono, 10);
            }());

            function lectureChrono () {
                var laDate = new Date();
                var t = laDate.getTime();
                var dt = Math.floor((t-t0)/1000);

                    switch (dt) {
                        case 5:
                            if (trois) message.channel.send('3');
                            trois = false;
                            break;

                        case 6:
                            if (deux) message.channel.send('2');
                            deux = false;
                            break;

                        case 7:
                            if (un) message.channel.send('1');
                            un = false;
                            break;
                    }

                    if (dt >= 8) {
                        message.channel.send("GO !");
                        clearInterval(chrono);
                        collect();
                    }
            }

            //************************************************************************************************************************************************************************************ Collect answer
            function collect() {
                const filterAnswer = m => tPlayersFCC.includes(m.author.id) == true && tPossibleAnswers.includes(m.content.toLowerCase());
                const collector = message.channel.createMessageCollector(filterAnswer, { max: 2, time: 1500 });

                collector.on('collect', m => {
                    switch (m.author.id) {
                        case player1:
                            if (!stopPlayer1) {
                                tAnswers.unshift(m.content.toLowerCase());
                                player1Choice = m.content.toUpperCase();
                                stopPlayer1 = true;
                                
                                for (var a = 0; a < tPlayersFCC.length; ++a) {
                                    if (tPlayersFCC[a] == m.author.id) tPlayersFCC.splice(a, 1);
                                }
                            }
                            break;
                        
                        case player2:
                            if (!stopPlayer2) {
                                tAnswers.push(m.content.toLowerCase());
                                player2Choice = m.content.toUpperCase();
                                stopPlayer2 = true;
                                
                                for (var b = 0; b < tPlayersFCC.length; ++b) {
                                    if (tPlayersFCC[b] == m.author.id) tPlayersFCC.splice(b, 1);
                                }
                            }
                            break;
                    }
                });
                
                collector.on('end', m => {
                    tPlayersFCC.unshift(player1);
                    tPlayersFCC.push(player2);

                    const receivedEmbed = gameEmbed;
                    receivedEmbed.fields = [];
                    const edittedEmbed = new Discord.MessageEmbed(receivedEmbed)
                        .setTitle(player1Points > nbrDeRounds / 2 || player2Points > nbrDeRounds / 2 ? "ROUND " + (compteurRounds - 1) : "ROUND " + compteurRounds)
                        .addFields (
                            { name: "Choix du joueur 1:", value: player1Choice },
                            { name: "Choix du joueur 2:", value: player2Choice },
                            { name: "Joueurs:", value: "Points:"    , inline: true},
                            { name: "Joueur 1", value: player1Points, inline: true},
                            { name: "Joueur 2", value: player2Points, inline: true},
                    );
                    msg.edit(edittedEmbed);

                    fight();
                });
            }

            //************************************************************************************************************************************************************************************ Who wins
            function fight () {
                var answerPlayer1;
                var answerPlayer2;
                var winner = "";

                for (let i = 0; i < 2; ++i) {
                    for (let j = 0; j < tPossibleAnswers.length; ++j) {
                        if (tAnswers[i] == tPossibleAnswers[j]) {
                            switch (j) {
                                case 0:
                                case 1:
                                    i == 0 ? answerPlayer1 = 0 : answerPlayer2 = 0;
                                    break;
    
                                case 2:
                                case 3:
                                    i == 0 ? answerPlayer1 = 1 : answerPlayer2 = 1;
                                    break;
    
                                case 4:
                                case 5:
                                    i == 0 ? answerPlayer1 = 2 : answerPlayer2 = 2;
                                    break;
                            }
                            break;
                        }
                    }
                }
                
                if (player1Choice == "Vide" && player2Choice == "Vide")  {
                    message.channel.send("Match nul !");
                    playGame();
                    return;
                } else if (player1Choice == "Vide") {
                    winner = tUsernames[1];
                } else if (player2Choice == "Vide") {
                    winner = tUsernames[0];
                } else if (answerPlayer1 == 0 && answerPlayer2 == 1) {
                    winner = tUsernames[0];
                } else if (answerPlayer1 == 1 && answerPlayer2 == 0) {
                    winner = tUsernames[1];
                } else if (answerPlayer1 == 0 && answerPlayer2 == 2) {
                    winner = tUsernames[1];
                } else if (answerPlayer1 == 2 && answerPlayer2 == 0) {
                    winner = tUsernames[0];
                } else if (answerPlayer1 == 1 && answerPlayer2 == 2) {
                    winner = tUsernames[0];
                } else if (answerPlayer1 == 2 && answerPlayer2 == 1) {
                    winner = tUsernames[1];
                } else {
                    message.channel.send("Match nul !");
                    playGame();
                    return;
                }

                winner == tUsernames[0] ? ++player1Points : ++player2Points;
                ++compteurRounds;

                const receivedEmbed = gameEmbed;
                receivedEmbed.fields = [];
                const edittedEmbed = new Discord.MessageEmbed(receivedEmbed)
                    .setTitle(player1Points > nbrDeRounds / 2 || player2Points > nbrDeRounds / 2 ? "ROUND " + (compteurRounds - 1) : "ROUND " + compteurRounds)
                    .addFields (
                        { name: "Choix du joueur 1:", value: player1Choice },
                        { name: "Choix du joueur 2:", value: player2Choice },
                        { name: "Joueurs:", value: "Points:", inline: true},
                        { name: "Joueur 1", value: player1Points, inline: true},
                        { name: "Joueur 2", value: player2Points, inline: true},
                );
                msg.edit(edittedEmbed);

                tAnswers = [];
                if (player1Points > nbrDeRounds / 2 || player2Points > nbrDeRounds / 2) {
                    showResults();
                } else {
                    playGame();
                }
            }
            
            //************************************************************************************************************************************************************************************ Show results
            function showResults () {
                var bigWinner = player1Points > player2Points ? tUsernames[0] : tUsernames[1];
                const resultsEmbed = new Discord.MessageEmbed()
                    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
                    .setTitle('VAINQUEUR')
                    .setDescription(bigWinner);
                message.channel.send(resultsEmbed);
                tPlayersFCC = [];
            }
		}
    }
};