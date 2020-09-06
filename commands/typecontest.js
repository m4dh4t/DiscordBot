module.exports = {
	name: 'typecontest',
	description: 'minigame to determine who types the fastest',
    aliases: ['tc', 'typegame'],
	execute(message, args) {
        //****************************************************************************************************************************************************************************************************** Général
        var t0;
        var tUsernames;
        const timeToRecruit = 15000;
        const timeToAnswer = 10000;
        var tSuccessId = [];
        var tSuccessTime = [];
        var tFailId = [];
        const randomWords = require('random-words');
        const correctWord = randomWords();

        function fromIdToUser (table) {
            tUsernames = [];
            for (let a = 0 ; a < table.length ; a++) {
                tUsernames.push(message.client.users.cache.get(table[a]));
            }
        }

        //****************************************************************************************************************************************************************************************************** Recrutement
        if (tPlayersTC.length > 1) {
            message.reply('une autre partie est déjà en cours !');
            return;
        }
        tPlayersTC.push(message.author.id);

        const recrutementEmbed = new Discord.MessageEmbed()
            .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
            .setTitle('RÈGLES')
            .setDescription("Ceci est un jeu de rapidité. Dans quelques instants, un deuxième message va apparaître. Il contiendra le mot à recopier."+
                `\nLe but est de reécrire ce mot avant que les autres n'y parviennent (vous avez **${timeToAnswer / 1000}s**).\nPour rejoindre la session de jeu, envoyez **join**`);
        message.channel.send(recrutementEmbed);

        const filter = m => m.content.includes('join') || m.content.includes('Join');
        const collector = message.channel.createMessageCollector(filter, { time: timeToRecruit });

        collector.on('collect', m => {
            if (tPlayersTC.includes(m.author.id)) {
                m.reply("you are already in the game !");
            } else {
                message.channel.send("```fix"+`\n${m.author.username} vient d'être ajouté à la partie !`+"\n```");
                tPlayersTC.push(m.author.id);
            }
        });
        
        collector.on('end', collected => {
            if (tPlayersTC.length > 1) {
                typingGame(endEmbed);
            } else {
                const tAnswers = ["tu dois avoir au moins un adversaire pour jouer à ce jeu !", "il n'y a pas assez de participants pour débuter la partie !", "tu ne peux pas jouer seul à ce jeu !"];
                const random = Math.floor(Math.random() * tAnswers.length);
                message.reply(tAnswers[random]);
                tPlayersTC = [];
            }
        });

        //****************************************************************************************************************************************************************************************************** Game
        const endEmbed = new Discord.MessageEmbed()
        .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
        .setTitle('DÉBUT DU JEU !')

        function startChrono () {
            var date = new Date();
            t0 = date.getTime();
        }

        function readChrono () {
            var date = new Date();
            var t = date.getTime();
            var dT = Math.floor((t-t0));
            const timeToType = (dT / 1000).toFixed(2);
            return timeToType;
        }

        function typingGame (embed) {
            endEmbed.addFields(
                { name: 'Nombre de participants:', value: tPlayersTC.length },
                { name: 'Mot à recopier', value: correctWord },
            );

            message.channel.send(embed).then(() => {
                startChrono();

                const filterAnswer = m => m.content.toLowerCase() === correctWord && tPlayersTC.includes(m.author.id);
                const answerCollector = message.channel.createMessageCollector(filterAnswer, { max: tPlayersTC.length, time: timeToAnswer });

                answerCollector.on('collect', collected => {
                    tSuccessId.push(collected.author.id);
                    tSuccessTime.push(readChrono());
                });

                answerCollector.on('end', collected => {
                    for (let a = 0 ; a < tPlayersTC.length ; a++) {
                        if (!tSuccessId.includes(tPlayersTC[a])) {
                            tFailId.push(tPlayersTC[a]);
                        }
                    }
                    showResults();
                });
            });
        }

        //************************************************************************************************************************************************************************************************** Résultats
        function showResults () {
            const resultEmbed = new Discord.MessageEmbed()
                .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
                .setTitle('RÉSULTATS');

            if (tSuccessId.length) {
                fromIdToUser(tSuccessId);
                for (let a = 0 ; a < tSuccessId.length ; a++) {
                    resultEmbed.addField(`#${a+1}`, `${tUsernames[a]}: ${tSuccessTime[a]}s`);
                }
            }

            if (tFailId.length) {
                fromIdToUser(tFailId);
                for (let b = 0 ; b < tFailId.length ; b++) {
                    resultEmbed.addField(`#Pieruber`, `${tUsernames[b]}: out of time`);
                }
            }

            message.channel.send(resultEmbed);
            tPlayersTC = [];
        }
	},
};