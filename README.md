# easy-discordjs-bot/v1.2.2-alpha.1

Make discord bots with ease! <br>
To make a simple discord bot, you can use this package to create basic discord bot commands! <br>
If you want to go the extra step, you can always implement your custom callback ;) <br>

[Installation](#install) \
[How to Use](#how-to-use) \
[Updates](#updates) \
[Commands](#commands)

- [reply](#reply)
- [set_permissions](#permissions)
- [delete on call](#delete)
- [args and callback](#args_callback)

[Mentioning users and channels in args](#mentions) \
[Setting a welcome message](#welcome) \
[How to start from scratch (For absolute beginners to js and making bots)](#scratch)

This module is created on the [discord.js](https://discord.js.org/#/) module by Discord. Please refer to its documentation for further advanced functionality. Yes, you can use both in this module. Yes, the `Discord` object is exported as `Discord` in the easy module. You can access it using `easyDjs.Discord`. :)

## <a name="install"></a>Installation

```
npm i easy-discordjs-bot
```

## <a name="updates"></a>Updates

These are all the updates for the current version!

1. Added users and channels mentions for args (outputs the respective class)

## <a name="how-to-use"></a>How to use

Reuire the module using require statement! <br>

```js
const easyDjs = require("easy-discordjs-bot");
```

To create your bot, all you have to do is run the `Create()` function! <br>

```js
easyDjs.Create(your_bot_token, your_bot_prefix, your_commands, your_callback);
```

Now, you may be wondering, what's a bot token? What commands? And what is back and why are you calling it?
<br>
Well, worry not! <br>
Your bot token is a token you can get on your [Discord Developer page](https://discord.com/developers/applications) <br>
Once you're on the developer applications page, just create a new app. Then go to the `Bot` section and click on "Add bot"! Now you can get your bot token from there!
<br>
What are the commands? <br>
There is an inbuilt class for commands! Here's how it works: <br>

```js
const easyDjs = require("easy-discordjs-bot");
const myCommand = new easyDjs.Cmd("name", ["args"], function callback(
	message,
	args
) {});
easyDjs.Create(token, "prefix", [myCommand], function callback(err) {});
```

You need to create your own commands, to do that you can use the `Cmd` class inbuilt. Check Commands section for more info. <br>
The "name" will be the string value that you want the user to type in to call that command. <br>
The "prefix" is the string value of your bot prefix. (So the user will have to type "prefix""name" to call the command, like ?test => ? is prefix, test is name) <br>
The "[myCommand]" is the array of Cmds, of the commands you built earlier! <br>
The "callback(err)" is the function you can use to handle errors. NOTE: This is NOT required. <br>

## <a name="commands"></a>Commands

The `Cmd` class has a few options you can add to make your life easier. <br>

### <a name="reply"></a>reply(String)

This one is straight forward. It makes the command reply the given text when the command is called. For example <br>

```js
const easyDjs = require("easy-discordjs-bot");
const myCommand = new easyDjs.Cmd("test").reply("Test!");
easyDjs.Create(token, "?", [myCommand]);
```

This will make the bot reply with "Test!" when the user types "?test" message in a channel. <br>

### <a name="permissions"></a>set_permissions(Array)

This one, too, is straight forward. It sets the permissions for the command, basically telling the command that only people with specified permissions can use this command. Check Discord API Documentation for all the permissions. <br>

```js
const easyDjs = require("easy-discordjs-bot");
const myCommand = new easyDjs.Cmd("test")
	.reply("Test!")
	.set_permissions("ADMINISTRATOR");
easyDjs.Create(token, "?", [myCommand]);
```

This will make the command only respond if the user using the command is an admin.

### <a name="delete"></a>delete_on_call()

This makes the command delete the original call message when called. <br>
For example, if user uses `?test` to call the test command, and you have the test command delete on call, it will delete the user `?test` message; <br>

```js
const easyDjs = require("easy-discordjs-bot");
const myCommand = new easyDjs.Cmd("test").reply("Test!");
myCommand.delete_on_call();
easyDjs.Create(token, "?", [myCommand]);
```

### <a name="args_callback"></a>args and callback

The args provided into the command, in order of occurence. Suppose you want the user to also pass in a name along with the test command, you can do so by passing ["name"] into the args property. This can only be used by your custom callback as such:

```js
const easyDjs = require("easy-discordjs-bot");
function myFunction(message, args) {
	// args is an array of objects
	const name = args.name;
	message.channel.send(`Hello ${name}!`);
}
const myCommand = new easyDjs.Cmd("hello", ["name"], myFunction);
easyDjs.Create(token, "?", [myCommand]);
```

This will result in bot replying with "Hello (provided name)" whenever user uses `?hello name` command. For example:

```
User: ?hello shwi
Bot: Hello shwi!
```

NOTE: The args is an object with all the args along with their names, so the above args object would be `{ name: "shwi" }` \
The callback is always triggered, while passing the message and args fetched. So you can always add your own custom callbacks whenever you want ;) <br>

## <a name="mentions"></a> Mentioning users/channels in args

NOTE: This feature is still in alpha release. Some of the things might not work properly, they are being worked on. \
A new feature (from v1.0.4-alpha) is the ability to ask for user/channel mentions in args! \
To do so, you can use the `@` and `#` keywords. For example:

```js
const easyDjs = require("easy-discordjs-bot");
function myFunction(message, args) {
	const person = args.person;
	message.reply("Mentioned " + person.user.username);
	message.reply("Also mentioned " + args.person_two.user.username);
}
const myCommand = new easyDjs.Cmd(
	"mention",
	["@person", "#channel", "help", "@person_two"],
	myFunction
);
easyDjs.Create(token, "?", [myCommand]);
```

This code will reply "Mentioned person-name" whenver a user mentions a person in the command. So:

```
User: ?mention
Bot: Invalid arguments provided! Minimum: 4 as @person, #channel, help, @person_two
User: ?mention @Shwi #log nohelp @Alt
Bot: Mentioned Shwi
Bot: Also mentioned Alt
```

The same goes for channels, instead of `@` use `#`. You can ask for as many users and channels as you want and at as many places as you want.

## <a name="welcome"></a> Setting a welcome message

**_Under production, alpha release._**
`v1.2.2-alpha.1^`
You can set a welcome message using the `Welcome(...)` function! It is firectly inside of the root module, aka:

```js
const easyDjs = require("easy-discordjs-bot");
//... other code
easyDjs.Welcome(welcome_message);
//... other code
easyDjs.Create(...);
```

You can pass in only the welcome message for now, and the bot will look for a channel that is named "welcome" (or includes the word welcome in it) and send the message there. \
To mention a user, you can use the `@user` keyword. To mention the guild name, you can use the `@guild` keyword. \
NOTE: You do NOT need to include anything in the `Create(...)` function. \
So, for example:

```js
const easyDjs = require("easy-discordjs-bot");
//... other code
easyDjs.Welcome("Hello @user! Welcome to **@guild**!");
//... other code
easyDjs.Create(...);
```

This will send a message of a user joining a guild as follows:

```txt
Shwi joined the server 'Cool'
Bot (in #welcome-new-people channel, or #welcome channel, etc.): Hello @Shwi! Welcome to **Cool**!
```

The `**Cool**` will be actually bold, as discord uses markdown for its messages. So it will look like **Cool** this.

## <a name="scratch"></a> How to build one from scratch

In short: \
Download [NodeJS](https://nodejs.org/en/) > Download [Visual Studio Code](https://code.visualstudio.com/download) > In a folder of your choice, run `npm init -y` in console > run `npm i easy-discordjs-bot` in same console > run `code .` in same console > Start coding using the docs above

---

Alright, so you're new. You have no clue what the above said things mean. The questions in your mind are, "How do I create a file?" "How do I get this module?" "How do I code" "Is it in javacript?" "What is javacript?" "Help! javacript cannot run!" "Help! How do I run the beautiful code I made?" and possibly "Where is my shoe?" \
This section will answer those questions. Except for the shoe. Look for it under your desk. \
So, getting started with javacript. You can look at the official JS website [here](https://www.javascript.com/) \
Originally, javacript only ran in browsers. But, after the introduction of [NodeJS](https://nodejs.org/en/), javacript was much more! \
You could now run javacript _outside_ of browsers! How cool is that? Okay, it's nerdy. But still. \
So, how do you get started? all you need is to download nodejs! You can do so by going on their official website [NodeJs](https://nodejs.org/en/) and clicking the "LTS" download. Then go through and install it. _Yes, it's free._ \
Now that you've installed node.js, you can get started! That's the theory, at least. The general way is to download a code editor. The most preferred nowadays is [Visual Studio Code](https://code.visualstudio.com/download) \
Now that you have Node.JS and Visual Studio Code, you can finally get started! Hooray! \
\
So first, start vscode. It will open a new window and there, you can create a new file, or open a folder. I'm sure you can figure that out because of the Bright Blue Link that says "Create a new file" on vscode startup. \
After clicking on that, give whatever name you want to the file, and make sure to save it as ".js" extension. JS stands for JavaScript. \
Now, you can start coding. But first, you need to initialise node.js. To do that, open up the terminal in vscode by pressing "Ctrl + \`" The "\`" key is the one left to the "1" key on your keyboard. Now, you have a terminal. There, type: \
`npm init -y` \
The npm stands for "Node Package Manager" which comes with nodejs (unless you ticked it off while downloading). You can visit the Official Website [here](https://www.npmjs.com/) \
The init stands for initialise. \
The -y stands for yes to all the questions. The questions will come if you don't press the y. \
NOTE: Make sure the name logged after you went with this command doesn't have any spaces, and is all lower caps. If not, you can open the package.json file (generated automatically in the same folder you are in) and change the name there. \
Now you can install node modules! To install easy-discordjs-bot, run the following command: \
`npm i easy-discordjs-bot` \
This will install the module for you! Now that you have the module, you can create your bot! \
In the js file you created, type in the following: \

```js
const easyDjs = require("easy-discordjs-bot");
```

You can name the "easyDjs" anything. That's a variable. This statement imports the easy-discordjs-bot module for you. \
Now you can create a bot using the docs uptop! Yay!

### Thank you for visiting, have fun!
