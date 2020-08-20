// Adds required modules
global.Discord = require('discord.js');
const { mainPrefix, overridenPrefixes, token, ownerId } = require('./config.json');
const Enmap = require('enmap');
const fs = require('fs');

// Creates required variables
const client = new Discord.Client(); 
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const cooldowns = new Discord.Collection();

// Creates required enmap databases
client.restart = new Enmap({name: 'restart'});
client.botUsers = new Enmap({name: 'botusers'});

// Builds the command collection based on the files in the ./commands folder
client.commands = new Discord.Collection();
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready!');

    // Checks for the enmap database to correctly initialize
    client.restart.defer.then( async () => {
        console.log(client.restart.size + ' keys loaded in restart enmap');
        // If the bot has been restarted, sends a notice at the right place when ready
        if (client.restart.has('restarted')) {
            switch (client.restart.get('channelType')) {
                case ('guild'):
                    const restartNoticeChannel = client.channels.cache.get(client.restart.get('noticeChannelId'));
                    await restartNoticeChannel.send('Restarted successfully !');
                    break;
                case ('dm'):
                    const restartNoticeAuthor = client.users.cache.get(client.restart.get('noticeAuthorId'));
                    await restartNoticeAuthor.send('Restarted successfully !');
                    break;
                default:
                    console.log('Restarted in an undefined channel type');
            }
        }
        client.restart.clear();
    });

    // Checks for the enmap database to correctly initialize
    client.botUsers.defer.then( () => {
        console.log(client.botUsers.size + ' keys loaded in botusers enmap');
        // Ensures that the bot admins array load at least the bot owner set in config.json
        client.botUsers.ensure("admins", [ownerId]);
    });
});

client.on('message', message => {
    console.log(message.content);

    // Checks for multiple possible prefixes, as the bot needs to be able modify answer from other bots
    var prefix;
    const messageSent = message.content.toString().toLowerCase();
    if (!message.author.bot) {
        if (!message.content.startsWith(mainPrefix)) {
            for (let i = 0; i < overridenPrefixes.length; ++i) {
                if (messageSent.startsWith(overridenPrefixes[i])) {
                    prefix = overridenPrefixes[i];
                    break;
                } 
            }
            if (!prefix) return;
        } else {
            prefix = mainPrefix;
        }
    } else return;

    // Separates the command name and arguments from the prefix
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Checks if the given command command exists in the command collection or is an alias, else exit
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    // Checks if the given prefix is the default one, and if not, check if the given command is supposed to override another bot
    if (prefix !== mainPrefix && prefix !== command.overridenPrefix) return;

    // Checks if the user has the rights to execute the command
    if (command.adminOnly && !client.botUsers.includes('admins', message.author.id)) {
        return message.channel.send('You must be a bot administrator to use this command !');
    }

    // Checks if the command is valid for DMs usage
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I cannot execute that command inside DMs.');
    }

    // Checks if the command args are valid
    if (command.args && !args.length) {
        let reply = `You did not provide any arguments, ${message.author}.`;

		if (command.usage) {
            reply += `\nUsage: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
    }

     // Remove the cooldown in a private chat with the bot
    if (message.channel.type !== 'dm') {
        // Setups the cooldown and verification before execution
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }
        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        
        const cooldownAmount = (command.cooldown || 3) * 1000; // Default the command cooldown to 3 if not specified in the command set
        if (timestamps.has(message.author.id)) { // Timestamp verification linked to the author id to allow other to still use the command
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            }
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }
    
    // Command execution and bug handler
    try {
        command.execute(message, args);
    } catch (error) {
        if (error.message === 'InvalidArgument') {
            let reply = `You did not provide any valid arguments, ${message.author}.`;

            if (command.usage) {
                reply += `\nUsage: \`${prefix}${command.name} ${command.usage}\``;
            }

            message.channel.send(reply);
        } else {
            console.error(error);
            message.channel.send('There was an error trying to execute that command.');
        }
    }
});

client.login(token);