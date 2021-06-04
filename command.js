const Discord = require("discord.js");
class Cmd {
	/**
	 * Create a new command using call command! args and callback are optional
	 * Args: Input all args required as array: ["name", "id"] These will be sent back with their response in callback
	 * Callback: On call (message, args);
	 */
	constructor(caller, args, callback) {
		args = args || [];
		callback = callback || function non(msg, args) {};
		this.caller = caller;
		this.callback = callback;
		this.args = [];
		args.forEach((arg) => {
			this.args.push(arg.trim());
		});
		this.permissions = ["SEND_MESSAGES"];
		this.deleteOnCall = false;
	}

	/**
	 * Get the name of the command
	 */
	get name() {
		return this.caller;
	}

	/**
	 * Call this command
	 * @param {Discord.Message} message
	 */
	call(message) {
		if (this.deleteOnCall) {
			if (message.deletable) message.delete();
		}
		const content = message.content.toLowerCase();
		if (message.author.bot) return this.callback(message, ["@ERR"]);
		let pCheck = true;
		// Permissions check
		for (let pC = 0; pC < this.set_permissions.length; pC++) {
			if (!message.member.hasPermission(this.set_permissions[pC]))
				pCheck = false;
		}
		if (!pCheck) return;
		const argReq = content.split(/\s/).slice(1);
		let argFetch = {};

		if (this.args.length !== 0) {
			if (this.args.length > argReq.length) {
				return message.channel.send(
					`Invalid arguments provided! Minimum: ${
						this.args.length
					} as ${this.args.join(", ")}`
				);
			}
			for (let i = 0; i < this.args.length; i++) {
				argFetch[this.args[i]] = argReq[i];
			}
		}

		this.callback(message, argFetch); // Call user specified callback
		return this;
	}

	/**
	 * Select to respond with a string when a command is called
	 * @param {String} text Text to be output to the user when command called
	 * @returns Command
	 */
	reply(text) {
		this.callback = (message, args) => {
			message.channel.send(text);
		};
		return this;
	}

	/**
	 * Select which permissions can use this command
	 * @param {Array} values Input which permissions that can use this command
	 * @returns Command
	 */
	set_permissions(values) {
		this.permissions = values;
		return this;
	}

	/**
	 * Delete the command call message by user whenever the command is triggered
	 * @returns Command
	 */
	delete_on_call() {
		this.deleteOnCall = true;
		return this;
	}
}

module.exports = Cmd;
