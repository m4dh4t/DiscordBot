module.exports = {
    name: 'kaomoji',
    description: 'Sends a text animation depending on the argument used with the command',
    cooldown: 2,
    args: true,
    usage: '[shrug / tableflip / unflip]',
    execute(message, args) {
        var txt = '';
        const argus = args.toString().toLowerCase();

        switch (argus) {
            case 'shrug':
                txt = '¯\\_(ツ)_/¯';
                break;

            case 'tableflip':
                txt = '(╯°□°）╯︵ ┻━┻';
                break;

            case 'unflip':
                txt = '┬─┬ ノ( ゜-゜ノ)';
                break;

            case 'magician':
                txt = '(∩^o^)⊃━☆゜.*';
                break;

            case 'lennyface':
                txt = '( ͡° ͜ʖ ͡°)';
                break;

            case 'ladarakent':
                txt = '＿|￣|○';
                break;

            default:
                txt = 'This command does not accept "' + args + '" as an argument.';
        }
        message.channel.send(txt);
    },
}