/**
 * All error classes reqed
 */

class Err {
	static DefaultLog = true;
	constructor(name, details, toLog) {
		toLog = toLog || Err.DefaultLog;
		this.name = name;
		this.details = details;
		if (Err.DefaultLog && toLog) {
			console.log(this.as_string());
		}
	}
	as_string() {
		return `${this.name}: ${this.details}`;
	}
}

class InvalidInputErr extends Err {
	constructor(details, toLog) {
		super(`Invalid input!`, details, toLog);
	}
}

class InvalidRequestErr extends Err {
	constructor(details, toLog) {
		super(`Invalid request!`, details, toLog);
	}
}

module.exports = {
	Err,
	InvalidInputErr,
	InvalidRequestErr,
};
