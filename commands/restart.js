module.exports = {
	name: 'restart',
    description: 'Restart the bot to take into account the git repository changes',
    adminOnly: true,
	async execute(message, args) {
        await message.reply('Restarting...');
        // Sending a message in DMs or in a guild is not done with the same commands
        switch (message.channel.type) {
            case ('text'): // The message was sent in a guild
                message.client.restart.set('channelType', 'guild');
                message.client.restart.set('noticeChannelId', message.channel.id); // Stores the channel id where the bot was restarted
                break;
            case ('dm'): // The message was sent in DMs
                message.client.restart.set('channelType', 'dm');
                message.client.restart.set('noticeAuthorId', message.author.id); // Stores the id of the author that restarted the bot
                break;
            default:
                console.log('Restart command issued in an unexpected channel type');
        }
        message.client.restart.set('restarted');
        process.exit(); // Kills the process, but the bot is automatically restarted by pm2
	},
};