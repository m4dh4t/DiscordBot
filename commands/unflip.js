module.exports = {
    name: 'unflip',
    description: 'Sends an unflip',
    cooldown: 0.5,
    args: false,
    execute(message, args) {
        message.channel.send('┬─┬ ノ( ゜-゜ノ)');
    },
}