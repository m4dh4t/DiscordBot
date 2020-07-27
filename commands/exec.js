module.exports = {
	name: 'exec',
    description: 'WARNING: This command is for debug purpose only, it directly executes the given js commands.',
    adminOnly: true,
	async execute(message, args) {
        function clean(text) {
            if (typeof(text) === 'string') {
                return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
            } else {
                return text;
            }
        }

        try {
            const code = args.join(' ');
            let evaled = eval(code);
        
            if (typeof evaled !== 'string') {
                evaled = require('util').inspect(evaled);
            }

            message.channel.send(clean(evaled), {code:'xl'});
        } catch (err) {
            message.channel.send(`\`\`\`xl\n${clean(err)}\n\`\`\``);
        }
	},
};