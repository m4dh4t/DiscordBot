module.exports = {
	name: 'nuke',
    description: 'Nuke the current channel entire chat history',
    guildOnly: true,
    aliases: ['💣'],
	execute(message, args) {
        if(message.channel.id == '730207114399580161'){
            async function wipe() {
                var message_size = 100;
                while (message_size == 100) {
                    await message.channel.bulkDelete(100)
                .then(messages => message_size = messages.size)
                .catch(console.error);
                }
                message.channel.send(`<@${message.author.id}>\n> ${message.content}`, { files: ['http://www.quickmeme.com/img/cf/cfe8938e72eb94d41bbbe99acad77a50cb08a95e164c2b7163d50877e0f86441.jpg'] })
            }
            wipe()
        } else {
            message.channel.send('This command is not authorized outside of the bots sandbox !');
        }
	},
};