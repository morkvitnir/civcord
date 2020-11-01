//import modules
import * as fs from "fs";
import * as path from "path";

// import interfaces
import { Command, EmbedResponse, Leader } from "../interfaces";


// import commands
const ext = path.extname(__filename);
const dir = ext == ".ts" ? "src" : "dist";

const commands: Map<string, Command> = new Map();
const commandFiles: string[] = fs.readdirSync(`./${dir}/commands`).filter((file: string) => file.endsWith(ext) && !file.startsWith("help"));

for (const file of commandFiles) {

    import(`./${file}`)
        .then((defaultImport: { default: Command; }) => {
            commands.set(defaultImport.default.name, defaultImport.default);
        });
    // end of promise chain

}


const command: Command = {
    name: "help",
    format: "",
    description: "",
    execute(message, args) {

        // create an embed message
        let messageEmbed: EmbedResponse = {
            color: 0x0099ff,
            title: "Доступные режимы",
            fields: [

            ]
        };

        // go through commands and push their format and description values
        for (const value of commands.values()) {
            messageEmbed.fields.push({
                name: value.format,
                value: value.description
            });
        }

        message.channel.send({ embed: messageEmbed });

    }
};

export default command;