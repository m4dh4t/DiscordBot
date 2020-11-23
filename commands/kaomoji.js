module.exports = {
    name: 'kaomoji',
    description: 'Sends a text animation depending on the argument used with the command',
    cooldown: 2,
    args: true,
    aliases: ['kao'],
    usage: '[shrug / tableflip / unflip / magician / lennyface / ladarakent / xdoubt / boobs]',
    execute(message, args) {
        message.delete();

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
                txt = '＿|￣|○>';
                break;

            case 'xdoubt':
                txt = '( ͠° ͟ʖ ͡°)';
                break;

            case 'boobs':
            case 'boobies':
                txt = '( • )( • )ԅ(≖‿≖ԅ)';
                break;

            default:
                txt = 'This command does not accept "' + args + '" as an argument.';
        }
        message.channel.send(txt);
    },
}