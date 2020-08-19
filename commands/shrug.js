module.exports = {
    name: 'shrug',
    description: 'Sends a shrug',
    cooldown: 0.5,
    args: false,
    execute(message, args) {
        message.channel.send('¯\\_(ツ)_/¯');
    },
}