module.exports = {
    name: 'gayest',
    description: 'Picks the gayest thing in the given list.',
    usage: '[A list of things to test]',
    cooldown: 2,
    args: true,
    execute(message, args) {
        // Construct an array including only the uniques arguments
        var unique = [];
        for (let i = 0; i < args.length; ++i) {
            if (!unique.includes(args[i])) {
                unique.push(args[i]);
            }
        }

        const gayest = Math.ceil(Math.random() * unique.length) - 1;

        if (unique.length < 2) {
            throw new Error('InvalidArgument');
        } else {
            message.channel.send(unique[gayest] + ' is the gayest. :rainbow_flag:');
        }
    },
};