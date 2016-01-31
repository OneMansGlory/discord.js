var Discord = require("../");
var client = require('google-images')

var Bing = require('node-bing-api')({accKey: "your bing apikey here"});
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
    Bing.images(query, {skip: 50}, function(error, res, body){
      var results = body['d']['results'];
      var response = results.chooseRandom()['MediaUrl'];
      bot.sendMessage(msg, response)
    });
  }

  if (content.substring(0, 6) === "gg me ") {
    var response = "http://champion.gg/champion/" + content.substring(6);
    bot.sendMessage(msg, response)
  }
});

bot.login(AuthDetails.email, AuthDetails.password);
