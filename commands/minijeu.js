module.exports = {
	name: 'minigame',
	description: 'minigame to get free of mute',
    aliases: ['game', 'minijeu'],
    // cooldown: 30,
	execute(message, args) {
        // Global
        const axios = require('axios');
        const cheerio = require('cheerio');
        const timeToResolve = 30;
        // var correctWord;
        const correctWord = { content:'' };
        var t0;
        //var remainingTime;

        // French
        // function getRandomWord(language, obj) {
        //     axios.get(language)
        //         .then( response => {
        //             if(response.status === 200) {
        //                 const html = response.data;
        //                 const $ = cheerio.load(html);
        //                 obj.content = $('#firstHeading').text();
        //             }
        //         })
        //         .catch( error => {
        //             console.log(error);
        //         });
        // }

        function getRandomWord(language, obj) {
            axios.get(language)
                .then(function(response) {
                    if(response.status === 200) {
                        const html = response.data;
                        const $ = cheerio.load(html);
                        obj.content = ($('#firstHeading').text());
                        // message.channel.send($('#firstHeading').text().toString());
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
        const french = 'https://fr.wiktionary.org/wiki/Sp%C3%A9cial:Page_au_hasard_dans_une_cat%C3%A9gorie/Noms_communs_en_fran%C3%A7ais';
        //******************************************************************************************************************************************************************************************************* Règles

        const gameEmbed = new Discord.MessageEmbed()
            .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
            .setTitle('ÉPREUVE !')
            .setDescription(message.author.username + ', tu as **' + timeToResolve + ' secondes** pour réussir ce challenge. Pour ce faire, tu dois réarranger les lettres ci-dessous pour former un mot ANGLAIS existant.\nBonne chance !');

        // switch (args[0]) {
        //     case ('fr'):
        //         getRandomWord(french, correctWord);
        //         // correctWord.content = 'ok';
        //         break;

        //     case ('eng'):
        //         const randomWords = require('random-words');
        //         correctWord.content = randomWords();
        //         break;

        //     default:
        //         throw new Error('InvalidArgument');
        // }

        const randomWords = require('random-words');
        correctWord.content = randomWords();

        do {
            const tCorrectWord = correctWord.content.split('');
            var mixedWord = '';
            var compteur = 0;
            while (tCorrectWord.length) {
                const random = Math.floor(Math.random() * tCorrectWord.length);
                mixedWord += tCorrectWord[random];
                tCorrectWord.splice(random, 1);
                compteur++;
            }
        } while (mixedWord === correctWord.content);
        gameEmbed.addField('Lettres:', mixedWord);

        message.channel.send(gameEmbed);
        startChrono();
        awaitMessage();
        //******************************************************************************************************************************************************************************************************* Réponse

        const answerEmbed = new Discord.MessageEmbed()
            .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
            .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
            .setTitle('RÉSULTAT:');

        function startChrono () {
            var date = new Date();
            t0 = date.getTime();
        }

        function readChrono () {
            var date = new Date();
            var t = date.getTime();
            var dT = Math.floor((t-t0));
            const remainingTime = ((timeToResolve * 1000) - dT);
            return remainingTime;
        }

        function awaitMessage () {
            message.channel.awaitMessages(m => m.author.id == message.author.id, // waits for player to put an answer
                { max: 1, time: readChrono() }).then(collected => {
                    var answer = collected.first().toString().toLowerCase();
                    testAnswer(answer);
                }).catch(() => {
                    answerEmbed.addField('Raté !', 'Le mot à trouver était **' + correctWord.content + '** :(');
                    message.channel.send(answerEmbed);
                });
        }

        function testAnswer (answer) {
            if (answer.startsWith('testm game')) return;

            if (answer === correctWord.content) {
                const remainingTimeInSeconds = (readChrono() / 1000).toFixed(1);
                answerEmbed.addField('Bravo !', 'Le mot était bien **' + correctWord.content + '** !');
                answerEmbed.setFooter('Temps restant: ' + remainingTimeInSeconds + 's');
                message.channel.send(answerEmbed);
            } else {
                awaitMessage();
            }
        }
	},
};