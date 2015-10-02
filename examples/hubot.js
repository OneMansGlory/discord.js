/*
	this bot is a ping pong bot, and every time a message
	beginning with "ping" is sent, it will reply with
	"pong".
*/

var Discord = require("../");

// Get the email and password
var AuthDetails = require("./auth.json");

var bot = new Discord.Client();

bot.on("ready", function () {
	console.log("Ready to begin! Serving in " + bot.channels.length + " channels");
});

bot.on("disconnected", function () {

	console.log("Disconnected!");
	process.exit(1); //exit node.js with an error
	
});

bot.on("message", function (msg) {
  var content = msg.content
	if (content.substring(0, 9) === "image me ") {
    var query = content.substring(9)
		
		bot.sendMessage(msg.channel, "pong!");
    bot
	}
});

bot.login(AuthDetails.email, AuthDetails.password);
