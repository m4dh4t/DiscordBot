module.exports = {
	name: 'timer',
	description: 'sets a timer',
    cooldown: 5,
	args: true,
	usage: '[h min s]',
	execute(message, args) {
        let structure = /\d\d \d\d \d\d/;

		if (!message.content.match(structure)) {
			throw new Error('InvalidArgument');
		}

        const time = args.toString().split(',');
        hours   = parseInt(time[0]);
        minutes = parseInt(time[1]);
        seconds = parseInt(time[2]);
		message.channel.send(`\`\`\`fix\nTimer set for${hours != 0 ? ' ' + hours + 'h' : ''}${minutes != 0 ? ' ' + minutes + 'min' : ''}${seconds != 0 ? ' ' + seconds + 's' : ''}\n\`\`\``);

		var chrono;
		let totalTime = hours*3600 + minutes*60 + seconds;

		(function() {
			clearInterval(chrono)
			var laDate = new Date();
			t0 = laDate.getTime();
			chrono = setInterval(lectureChrono, 10);
		}());

		function lectureChrono () {
			var laDate = new Date();
			var t = laDate.getTime();
			var dt = Math.floor((t-t0)/1000);

			if (dt >= totalTime) {
				message.reply("TIMER IS OVER !");
				clearInterval(chrono);
			}
		}
	}
};