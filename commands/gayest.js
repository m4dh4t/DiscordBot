module.exports = {
    name: 'gayest',
    description: 'Picks the gayest element in the given list',
    usage: '[A list of elements to test]',
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
            message.channel.send('You only provided one element'); 
        } else {
            message.channel.send(unique[gayest] + ' is the gayest. :rainbow_flag:');
        }
    },
};