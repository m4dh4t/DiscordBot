module.exports = {
	name: 'bot-admin',
    description: 'Allow the mentionned user to be a bot administrator',
    usage: '[add | remove @User] or [list | l]',
    args: true,
    adminOnly: true,
	execute(message, args) {
        const data = [];
        const viewAdmins = ['list', 'l'];

        if (message.mentions.users.size) {
            const user = message.mentions.users.first();
            const botUsers = message.client.botusers;
            switch (args[0]) {
                case ('add'):
                    if (!botUsers.includes('admins', user.id)){
                        botUsers.push('admins', user.id);
                        message.channel.send(`${user} has been added to the bot admins list.`);
                    } else {
                        message.channel.send(`${user} is already in the bot admins list.`);
                    }
                    break;
                case ('remove'):
                    if (botUsers.includes('admins', user.id)){
                        botUsers.remove('admins', user.id);
                        message.channel.send(`${user} has been removed from the bot admins list.`);
                    } else {
                        message.channel.send(`${user} is not in the bot admins list.`);
                    }
                    break;
                default:
                    message.channel.send('You did not provide any valid arguments with the username.');
            }
        } else if (viewAdmins.includes(args[0])) {
            data.push('**Bot admins:**');
            botUsers.get('admins').map( adminId => data.push(message.client.users.cache.get(adminId)));

            message.channel.send(data);
        } else {
            throw new Error('InvalidArgument');
        }
	},
};