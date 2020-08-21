module.exports = {
	name: 'minigame',
	description: 'minigame to get free of mute',
    aliases: ['game', 'minijeu'],
    //cooldown: 180,
	execute(message, args) {
        const randomWords = require('random-words');
        const timeToResolve = 30;
        var correctWord = randomWords();
        var tCorrectWord = correctWord.split('');
        var mixedWord = '';
        var compteur = 0;
        var answerFound = false;

        const gameEmbed = new Discord.MessageEmbed()
            .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
            .setTitle('ÉPREUVE !')
            .setDescription(message.author.username + ', tu as **' + timeToResolve + ' secondes** pour réussir ce challenge. Pour ce faire, tu dois réarranger les lettres ci-dessous pour former un mot ANGLAIS existant.\nBonne chance !');

        const answerEmbed = new Discord.MessageEmbed()
            .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
            .setAuthor(message.author.username)
            .setTitle('Résultat:');
        //******************************************************************************************************************************************************************************************************* Règles

        while (tCorrectWord.length) {
            const random = Math.floor(Math.random() * tCorrectWord.length);
            mixedWord += tCorrectWord[random];
            tCorrectWord.splice(random, 1);
            compteur++;
        }
        gameEmbed.addField('Lettres:', mixedWord);

        message.channel.send(gameEmbed);
        //******************************************************************************************************************************************************************************************************* Réponse

        message.channel.awaitMessages(m => m.author.id == message.author.id, // waits for player to put an answer
            { max: 1, time: (timeToResolve * 1000) }).then(collected => {
                var answer = collected.first().toString();

                if (answer === correctWord) {
                    //answerEmbed.title = 'Bravo !';
                    answerEmbed.addField('Bravo !', 'Le mot était bien **' + correctWord + '** !');
                    answerFound = true;
                } else {
                    //answerEmbed.title = 'Raté !';
                    answerEmbed.addField('Raté !', 'Le mot à trouver était **' + correctWord + '** :(');
                    //answerEmbed.description = 'Le mot à trouver était "' + correctWord + '" :(';
                }
    
                message.channel.send(answerEmbed);
            }).catch(() => {
                timeout();
            });

        function timeout () {
            if (!answerFound) {
                answerEmbed.title = 'RATÉ !';
                answerEmbed.description = 'Tu as pris trop de temps pour donner ta réponse !\nLe mot à trouver était **' + correctWord + '** :(';
                message.channel.send(answerEmbed);
            }
        }
	},
};