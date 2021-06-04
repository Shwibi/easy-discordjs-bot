/**
 * Main file
 */
const Discord = require(`discord.js`);
const { InvalidInputErr, InvalidRequestErr, Err } = require("./errors");
// Initialise client
const client = new Discord.Client();
client.initialised = false;

/**
 * Start bot process
 * @param {String} token Pass in the bot token to login
 * @param {Function} callback Callback function (err, client)
 * @returns (err, client)
 */
function BeginBot(token, callback) {
	//#region Checking input ###############################################
	if (!token) {
		return callback(new InvalidInputErr("No token provided!"), null);
	}
	if (!(callback instanceof Function)) {
		return new InvalidInputErr("Callback must be a function!");
	}
	//#endregion ###########################################################

	try {
		client.login(token);
		client.initialised = true;
	} catch (err) {
		if (err) {
			return callback(new InvalidInputErr(err), null);
		}
	}

	// Logged in and ready to go
	global.botClient = client;
	callback(null, client);
	return client;
}

/**
 * Call an event handler! Events like messages, ready, etc. The event callback is called whenever an event is triggered.
 * @param {String} event the event to call
 * @param {Function} callback Callback with args related to the event
 * @returns
 */
function Call(event, callback) {
	if (!client.initialised) {
		return new InvalidRequestErr(
			`Client is not initialised! Please use \`Start\` function to initialise!`
		);
	}
	if (!event) {
		return new InvalidInputErr(`No event provided!`);
	}
	if (!callback || !(callback instanceof Function)) {
		return new InvalidInputErr(`Callback must be a function!`);
	}

	// Event
	client.on(event, (...args) => {
		callback(...args);
		return args;
	});
}

/**
 * Simulate emitting an event!
 * @param {String} event The event to simulate
 * @param  {...any} args The args to simulate the event with. For example, message event will be simulated using a new Discord.Message
 * @returns
 */
function Emit(event, ...args) {
	try {
		client.emit(event, ...args);
	} catch (err) {
		if (err) return new Err(`Emit error`, err);
	}
}

module.exports = { BeginBot, Call, Emit };
