module.exports = {
	name: 'timer',
	description: 'sets a timer',
    cooldown: 5,
	args: true,
	usage: '[hh mm ss | mm ss | ss]',
	execute(message, args) {
        let structure1 = /\d\d \d\d \d\d/;
		let structure2 = /\d\d \d\d/;
		let structure3 = /\d\d/;

		if (!message.content.match(structure1) && !message.content.match(structure2) && !message.content.match(structure3)) {
			throw new Error('InvalidArgument');
		}

		let hours   = 0;
		let minutes = 0;
		let seconds = 0
        const time = args.toString().split(',');

		switch(time.length)  {
			case 3:
				hours   = parseInt(time[0]);
				minutes = parseInt(time[1]);
				seconds = parseInt(time[2]);
				break;

			case 2:
				minutes = parseInt(time[0]);	
				seconds = parseInt(time[1]);
				break;

			case 1:
				seconds = parseInt(time[0]);
				break;
		}

		message.channel.send(`\`\`\`fix\nTimer set for${hours != 0 ? ' ' + hours + 'h' : ''}${minutes != 0 ? ' ' + minutes + 'min' : ''}${seconds != 0 ? ' ' + seconds + 's' : ''}\n\`\`\``);

		let chrono;
		let totalTime = hours*3600 + minutes*60 + seconds;

		(function() {
			clearInterval(chrono)
			let laDate = new Date();
			t0 = laDate.getTime();
			chrono = setInterval(lectureChrono, 10);
		}());

		function lectureChrono () {
			let laDate = new Date();
			let t = laDate.getTime();
			let dt = Math.floor((t-t0) / 1000);

			if (dt >= totalTime) {
				message.reply("TIMER IS OVER !");
				clearInterval(chrono);
			}
		}
	}
};