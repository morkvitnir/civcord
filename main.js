"use strict";

// import modules
const Discord = require('discord.js');
const config = require("./config.json");
const fs = require('fs');

// start discord bot
const client = new Discord.Client();
client.login(config.token);


// import all commands into "commands" Collection
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}



//activates once on discord bot startup
client.once('ready', () => {

    console.log('Bot is running');

});


client.on('message', (message) => {

    // ignore messages not starting with civ prefix or from other bots
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    // get words coming after the prefix
    const args = message.content.slice(config.prefix.length + 1).trim().split(/ +/);
    // get a command right after the prefix
    const commandName = args.shift().toLowerCase();

    // if the command does not exist
    if (!client.commands.has(commandName)) {
        message.reply(`there is no such command. Correct template is "civ <command>".\n\nTo get the full command list write "civ help".`);

        return;
    }

    // get and execute the command
    const command = client.commands.get(commandName);
    command.execute(message, args);

});