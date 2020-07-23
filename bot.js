const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client(); 
const { prefix, token } = require('./config.json');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const cooldowns = new Discord.Collection();
const Enmap = require('enmap');
client.cache = new Enmap({name: 'cache'});
client.admins = new Enmap({name: 'admins'});

//Build the command collection based on the files in the ./commands folder
client.commands = new Discord.Collection();
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', async () => {
    console.log('Ready!');

    //Check for the enmap database to correctly initialize
    client.cache.defer.then( () => {
        console.log(client.cache.size + ' keys loaded');
        //If the bot has been restarted, send a notice at the right place when ready
        if (client.cache.get('hasRestarted') && client.cache.has('isTextChannel')) {
            if (client.cache.get('isTextChannel')) {
                const restartNoticeChannel = client.channels.cache.get(client.cache.get('restartNoticeChannelId'));
                restartNoticeChannel.send('Restarted successfully !');
            } else {
                const restartNoticeAuthor = client.users.cache.get(client.cache.get('restartNoticeAuthorId'));
                restartNoticeAuthor.send('Restarted successfully !');
            }
        }
        client.cache.clear();
    });
});

client.on('message', message => {
    console.log(message.content);

    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Check if the given command command exists in the command collection or is an alias, else exit
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;
    
    //Check if the user has the rights to execute the command
    if (command.adminOnly && !client.admins.get('adminsList').includes(message.author.id)) {
        return message.channel.send('You must be a bot administrator to use this command !');
    }

    //Check if the command is valid for DMs usage
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I cannot execute that command inside DMs.');
    }

    //Check if the command args are valid
    if (command.args && !args.length) {
        let reply = `You did not provide any arguments, ${message.author}.`;

		if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
    }

    //Setup the cooldown and verification before execution
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000; //Default the command cooldown to 3 if not specified in the command set
    if (timestamps.has(message.author.id)) { //Timestamp verification linked to the author id to allow other to still use the command
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    //Command execution and bug handler
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command.');
    }
});

client.login(token);