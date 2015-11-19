/*
	this bot is a ping pong bot, and every time a message
	beginning with "ping" is sent, it will reply with
	"pong".
*/

var Discord = require("../");
var client = require('google-images')

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

Array.prototype.chooseRandom = function() {
  return this[Math.floor(Math.random() * this.length)];
};

bot.on("message", function (msg) {
  var content = msg.content
	if (content.substring(0, 9) === "image me ") {
    var query = content.substring(9);
    console.log("received: " + query)
    client.search(query, function(err, images) {
      var response = ""
      if (images.length > 0) {
        response = images.chooseRandom().unescapedUrl
      } else {
        response = "no images for" + query
      }
      console.log("response: " + response)
      bot.sendMessage(msg, response);
    })
	}

  if (content.substring(0, 6) === "gg me ") {
    var response = "http://champion.gg/champion/" + content.substring(6);
    bot.sendMessage(msg, response)
  }
});

bot.login(AuthDetails.email, AuthDetails.password);
