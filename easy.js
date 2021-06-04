const Raw = require(`./index.raw`);
const { InvalidInputErr, InvalidRequestErr } = require(`./errors`);
const { Cmd } = require("./command");
const PREFIX = "?";
// Easiest way to create a bot
function Create(token, prefix, commands, callback) {
	if (!token || !commands || commands?.length == 0)
		return callback(new InvalidInputErr("Invalid token or commands!"));
	callback =
		callback ||
		function non(err) {
			throw err;
		};
	prefix = prefix || PREFIX;
	Raw.BeginBot(token, (err, client) => {
		if (err) return callback(err);
		Raw.Call("ready", () => {
			console.log(`Bot ready and online! As: ${client.user.tag}`);
		});
		Raw.Call("message", (message) => {
			// Perform commands
			if (message.author.bot) return;

			let content = message.content.toLowerCase().split(/\s/)[0];
			if (!content.startsWith(prefix)) return;
			content = content.slice(prefix.length);
			for (let i = 0; i < commands.length; i++) {
				if (commands[i].caller == content) {
					commands[i].call(message);
				}
			}
		});
		return callback(null);
	});
}

module.exports = Create;
