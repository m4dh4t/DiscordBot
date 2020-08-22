module.exports = {
	name: 'minigame',
	description: 'minigame to get free of mute',
    aliases: ['game', 'minijeu'],
    //cooldown: 180,
	execute(message, args) {
        const randomWords = require('random-words');
        const timeToResolve = 30;
        var correctWord = randomWords();
        var mixedWord = '';
        var compteur = 0;
        var t0;
        //******************************************************************************************************************************************************************************************************* Règles

        const gameEmbed = new Discord.MessageEmbed()
            .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
            .setTitle('ÉPREUVE !')
            .setDescription(message.author.username + ', tu as **' + timeToResolve + ' secondes** pour réussir ce challenge. Pour ce faire, tu dois réarranger les lettres ci-dessous pour former un mot ANGLAIS existant.\nBonne chance !');

        do {
            var tCorrectWord = correctWord.split('');
            while (tCorrectWord.length) {
                const random = Math.floor(Math.random() * tCorrectWord.length);
                mixedWord += tCorrectWord[random];
                tCorrectWord.splice(random, 1);
                compteur++;
            }
        } while (mixedWord === correctWord);
        gameEmbed.addField('Lettres:', mixedWord);

        message.channel.send(gameEmbed);
        startChrono();
        awaitMessage();
        //******************************************************************************************************************************************************************************************************* Réponse

        const answerEmbed = new Discord.MessageEmbed()
            .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
            .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true }))
            .setTitle('RÉSULTAT:')

        function startChrono () {
            var date = new Date();
            t0 = date.getTime();
        }

        function readChrono () {
            var date = new Date();
            var t = date.getTime();
            var dT = Math.floor((t-t0));
            return dT;
        }

        function awaitMessage () {
            message.channel.awaitMessages(m => m.author.id == message.author.id, // waits for player to put an answer
                { max: 1, time: ((timeToResolve * 1000) - readChrono()) }).then(collected => {
                    var answer = collected.first().toString();
                    testAnswer(answer);
                }).catch(() => {
                    answerEmbed.addField('Raté !', 'Le mot à trouver était **' + correctWord + '** :(');
                    message.channel.send(answerEmbed);
                });
        }

        function testAnswer (answer) {
            if (answer === correctWord) {
                answerEmbed.addField('Bravo !', 'Le mot était bien **' + correctWord + '** !');
                message.channel.send(answerEmbed);
            } else {
                awaitMessage();
            }
        }
	},
};