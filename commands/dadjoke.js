module.exports = {
	name: 'dadjoke',
	description: 'dicaprio meme collection',
    cooldown: 3,
    aliases: ['dicaprio'],
	execute(message, args) {
        const Discord = require('discord.js');
        
        let tLinks = ['https://i.chzbgr.com/full/9530114816/h6FC9B3EC/suit-rip-big-fart-and-say-does-someone-smell-popcorn-and-they-take-big-sniff',
'https://i.chzbgr.com/full/9530124800/hB265737E/person-ask-if-can-use-bathroom-and-teacher-says-dunno-can-memebase',
'https://i.chzbgr.com/full/9530139648/h78EFD9F2/person-waiting-my-husband-see-meme-texted-him-across-room-lifeandtimesofmom',
'https://i.chzbgr.com/full/9530141440/hB6F5F17C/after-replying-thought-this-rickroll-below-rickroll-comment-so-next-guy-could-get-rickrolled',
'https://i.chzbgr.com/full/9530145280/hE8B318AC/character-has-19-intelligence-but-player-dont-so-have-fumble-way-through-pretending-sound-smart',
'https://i.chzbgr.com/full/9530140416/hC3A535C4/person-dads-on-christmas-open-gift-they-said-they-wasnt-getting',
'https://i.chzbgr.com/full/9530140928/h15B4E413/person-moms-they-yell-dinners-ready-knowing-aint-even-close',
'https://i.chzbgr.com/full/9530141696/h82508283/he-cant-keep-uploading-quality-content-over-decade-pewds-big-pp-sero-bugar-pewdiepie-inergy-drink',
'https://i.chzbgr.com/full/9530126080/h9C27B152/person-teacher-calls-name-during-attendance-and-say-absent-memebase',
'https://i.chzbgr.com/full/9530142720/h05AA82CE/person-substitute-teacher-hands-out-pop-quiz-putting-hugh-janis-as-my-name',
'https://i.chzbgr.com/full/9530142976/h7C02BA2B/person-someone-asks-time-is-and-say-time-get-watch',
'https://i.chzbgr.com/full/9530121728/h14F8B35E/person-tapping-someone-on-their-left-shoulder-but-being-on-right',
'https://i.chzbgr.com/full/9530145024/h3848CE0B/person-moml-deleted-all-games-pc-she-actually-deleted-desktop-icons-not-games-made-with-mematic',
'https://i.chzbgr.com/full/9530145792/h2BD1B99A/drink',
'https://i.chzbgr.com/full/9530145536/h4C734D27/packaged-goods-izzard-ifunnyco'
];
        
        let random = Math.floor(Math.random() * tLinks.length); //Nombre de "=" -> entre 0 et [nombre-1]
        
        const dicaprioEmbed = new Discord.MessageEmbed()
                .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
                .setTitle('dad jokes machine')
                .setDescription(`<@${message.author.id}>`)
                .setImage(tLinks[random]);
            
        message.channel.send(dicaprioEmbed);
	},
};