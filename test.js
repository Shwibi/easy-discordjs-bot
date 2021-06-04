const easyDB = require("./index");

const myCommand = new easyDB.Cmd("test").reply("Test!");
const newCommand = new easyDB.Cmd("new").reply("HELLO!");

easyDB.Create(
	"ODQzNTM5MTQ0NjM3Njc3NjA4.YKFVDA.zvhD1RmTAM2lqX4oINhY-TqXjtE",
	[myCommand, newCommand],
	(err) => {
		if (err) console.log(err);
	}
);
