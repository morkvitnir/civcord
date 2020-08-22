"use strict";

const fs = require("fs");

// import all commands into "commands" Array
let commands = [];
const commandFiles = fs.readdirSync("./commands").filter(file => (file.endsWith(".js") && !file.startsWith("help")));

for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    commands.push(command);
}



module.exports = {
    name: "help",
    description: "",
    execute(message, args) {

        // create an embed message
        let messageEmbed = {
            color: 0x0099ff,
            title: "Доступные режимы",
            fields: [

            ]
        };

        // go through commands and push their format and description values
        for (const value of commands) {
            messageEmbed.fields.push({
                name: value.format,
                value: value.description
            });
        }

        message.channel.send({ embed: messageEmbed });

    }
}