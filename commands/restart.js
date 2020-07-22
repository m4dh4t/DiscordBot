module.exports = {
	name: 'restart',
    description: 'Restart the bot to take into account the git repository changes',
    adminOnly: true,
	async execute(message, args) {
        await message.reply('Restarting...');
        //Sending a message in DMs or in a guild is not done with the same commands
        switch (message.channel.type) {
            case ('text'): //The message was sent in a guild
                await message.client.cache.set('isTextChannel', true);
                await message.client.cache.set('restartNoticeChannelId', message.channel.id); //Store the channel id where the bot was restarted
                break;
            case ('dm'): //The message was sent in DMs
                await message.client.cache.set('isTextChannel', false);
                await message.client.cache.set('restartNoticeAuthorId', message.author.id); //Store the id of the author that restarted the bot
                break;
            default:
                await console.log('Unexpected channel type');
        }
        await message.client.cache.set('hasRestarted', true);
        process.exit(); //Kills the process, but the bot is automatically restarted by pm2
	},
};