module.exports = {
	name: 'bot-admin',
    description: 'Allow the mentionned user to be a bot administrator',
    usage: '[@UserToAdd]',
    adminOnly: true,
	execute(message, args) {
        const data = [];
        const viewAdmins = [
            'view',
            'v',
            'list',
            'l',
            'show',
            's'
        ];

        if (message.mentions.users.size) {
            if (!message.client.admins.get('adminsList').includes(message.mentions.users.first().id)){
                message.client.admins.push('adminsList', message.mentions.users.first().id);
                message.channel.send(`The user ${message.mentions.users.first()} has been added to the bot admins list.`);
            } else {
                message.channel.send(`The user ${message.mentions.users.first()} is already in the bot admins list.`);
            }
        } else if (args.length === 0) {
            message.reply('you did not provide any user to add as a bot admin.');
        }

        if (viewAdmins.includes(args[0])) {
            data.push('**Bot admins:**');
            message.client.admins.get('adminsList').map( adminId => data.push(message.client.users.cache.get(adminId)));

            message.channel.send(data);
        }
	},
};