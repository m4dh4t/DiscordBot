module.exports = {
	name: 'nuke',
    description: 'Nuke the current channel entire chat history',
    guildOnly: true,
    aliases: ['💣'],
	async execute(message, args) {
        if(message.channel.id == '730207114399580161'){
            var nbMessages = 100;
            while (nbMessages === 100) {
                await message.channel.bulkDelete(100).then(messages => nbMessages = messages.size);
            }
            message.channel.send(`<@${message.author.id}>\n> ${message.content}`, { files: ['http://www.quickmeme.com/img/cf/cfe8938e72eb94d41bbbe99acad77a50cb08a95e164c2b7163d50877e0f86441.jpg'] });
        } else {
            message.channel.send('This command is not authorized outside of the bots sandbox !');
        }
	},
};