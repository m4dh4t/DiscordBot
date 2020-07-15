module.exports = {
	name: 'argsinfo',
    description: 'Arguments handling poc',
    args: true,
    usage: '[random argument]',
	execute(message, args) {
		if (args[0] === 'foo') {
			return message.channel.send('bar');
		}

		message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
	},
};