const { Message } = require("discord.js");

module.exports = {
	name: 'admin',
    description: 'Allow the given user to be a bot administrator',
    usage: '[@UserToAdd]',
    adminOnly: true,
	execute(message, args) {
        if (message.mentions.users.size) {
            message.client.admins.set('adminsList', message.mentions.users.first().id);
            message.reply(`The user ${message.mentions.users.first()} has been added to the bot admins list.`);
        } else {
            message.reply('You did not provide any user to add as a bot administrator.');
        }
	},
};