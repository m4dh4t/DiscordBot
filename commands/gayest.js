module.exports = {
    name: 'gayest',
    description: 'Picks the gayest person in the given list',
    cooldown: 2,
    usage: '[args (including @s)]',
    execute(message, args) {
        const gayest = Math.ceil(Math.random() * args.length) - 1;

        if(args.length)
            message.channel.send(args[gayest] + ' is the gayest. :rainbow_flag:');
        else
            throw new Error('InvalidArgument');
    },
};