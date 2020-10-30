// import modules
import * as Discord from "discord.js";
import * as config from "./config.json";
import * as fs from "fs";

// import interfaces
import { Command } from "./interfaces";

// import commands
const commands: Map<string, Command> = new Map();
const commandFiles: string[] = fs.readdirSync("./commands").filter(file => file.endsWith(".ts"));

for (const file of commandFiles) {
    import(`./commands/${file}`)
        .then((command: Command) => {
            commands.set(command.name, command);
        });
    // end of promise chain
}



// initialize the bot
const client: Discord.Client = new Discord.Client();
client.login(config.token);


client.once("ready", () => {

    console.log("Bot is running.");

});


client.on('message', (message) => {

    try {
        // ignore messages not starting with civ prefix or from other bots
        if (!message.content.startsWith(config.prefix) || message.author.bot) return;

        // get words coming after the prefix
        const args: string[] = message.content.slice(config.prefix.length + 1).trim().split(/ +/);
        // get a command right after the prefix
        const commandName: string = args.shift().toLowerCase();

        // if the command does not exist
        if (commands.has(commandName)) {
            message.reply("No such command message");
            return;
        }

        // get and execute the command
        const command: Command = commands.get(commandName);
        command.execute(message, args);
    }
    catch (error) {
        message.reply(error.message);
    }


}); 