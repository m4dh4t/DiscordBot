module.exports = {
    name: 'kaomoji',
    description: 'Sends a text animation depending on the argument used with the command',
    cooldown: 2,
    args: true,
    aliases: ['kao'],
    usage: '[shrug / tableflip / unflip / magician / lennyface / ladarakent / xdoubt / boobs, pervers, run, snorlax]',
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
            case 'lenny':
                txt = '( ͡° ͜ʖ ͡°)';
                break;

            case 'ladarakent':
            case 'naomi':
            case 'naomi-san':
            case 'naomi san':
                txt = '＿|￣|○>';
                break;

            case 'xdoubt':
                txt = '( ͠° ͟ʖ ͡°)';
                break;

            case 'boobs':
            case 'boobies':
            case 'tits':
            case 'titties':
                txt = '( • )( • )ԅ(≖‿≖ԅ)';
                break;

            case 'pervers':
            case 'hentai':
                txt = '( ͡⚆ ͜ʖ ͡⚆)';
                break;

            case 'run':
                txt = '┌( ಠ_ಠ)┘';
                break;

            case 'snorlax':
                txt = 'Ƶƶ(￣▵—▵￣)';
                break;

            default:
                txt = 'This command does not accept "' + args + '" as an argument.';
        }
        message.channel.send(txt);
    },
}