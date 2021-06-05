const Cmd = require("./command");
const Create = require("./easy");
const { BeginBot, Call, Emit } = require("./index.raw");
const Discord = require("discord.js");
const { InvalidInputErr, InvalidRequestErr, Err } = require("./errors");

/**
 * Set a welcome message for whenever a user joins!
 * @param {Discord.Snowflake} channelId The channel where to send the message
 * @param {String} text The message to send when a user joins. Use @user to mention the user who joined, and @guild to mention the name of the guild. NOTE: @user and @guild MUST be all lowercase
 */
function Welcome(text = "Welcome @user!") {
	if (text.length == 0)
		return new InvalidInputErr("Text must be at least 1 character long!");
	Call("guildMemberAdd", (member) => {
		const guild = member.guild;
		const channel = guild.channels.cache.find((ch) =>
			ch.name.includes("welcome")
		);
		if (guild && channel) {
			let messageToSend = text.includes("@user")
				? text.split("@user").join(`<@${member.id}>`)
				: text;
			messageToSend = messageToSend.includes("@guild")
				? messageToSend.split("@guild").join(guild.name)
				: messageToSend;
			channel.send(messageToSend);
		}
	});
}

module.exports = {
	Cmd,
	Create,
	BeginBot,
	Call,
	Emit,
	Discord,
	Welcome,
	errors: { InvalidRequestErr, InvalidInputErr, Err },
};
