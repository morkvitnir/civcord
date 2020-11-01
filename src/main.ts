// import modules
import config from "./discord-config";
import * as Discord from "discord.js";
import * as fs from "fs";
import * as path from "path";


// import interfaces
import { Command } from "./interfaces";

// import commands
const ext = path.extname(__filename);
const dir = ext == ".ts" ? "src" : "dist";

const commands: Map<string, Command> = new Map();
const commandFiles: string[] = fs.readdirSync(`./${dir}/commands`).filter((file: string) => file.endsWith(ext));

for (const file of commandFiles) {

    import(`./commands/${file}`)
        .then((defaultImport: { default: Command; }) => {
            commands.set(defaultImport.default.name, defaultImport.default);
        });
    // end of promise chain
}

// initialize the bot
const client: Discord.Client = new Discord.Client();
client.login(config.token);


client.once("ready", () => {

    // set activity
    client.user.setActivity("with 'civ help'", { type: "PLAYING" });

    // refresh activity every hour
    setInterval(() => client.user.setActivity("with 'civ help'", { type: "PLAYING" }), 360 * 1000);

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
        if (!commands.has(commandName)) {
            message.reply("no such command message");
            return;
        }

        // get and execute the command
        const command: Command = commands.get(commandName);
        command.execute(message, args);
    }
    catch (error) {
        console.log(error.message);
    }


}); 