//import leaders
import ShuffledLeaders from "../ShuffledLeaders";

// import interfaces
import { Command, EmbedResponse, Leader } from "../interfaces";


const command: Command = {
    name: "team",
    format: "civ team <количество игроков> (collective)",
    description: `*<количество игроков>* - общее количество игроков от 2 до 6 на команду включительно
    *collective* - опциональный аргумент, при использовании которого на команду выдается общий пул лидеров\n
    *Примеры использования:
    civ team 4
    civ team 3 collective*`,
    execute(message, args) {

        try {

            // check if argument array is not empty
            if (args.length == 0) {
                message.reply(`неправильный формат ввода.\n Корректный: ${this.format}.`);
                return;
            }
            // check if number of players is correct
            else if (Number(args[0]) > 12 || Number(args[0]) < 2) {
                message.reply("набрано неправильное количество игроков.\n Значение должно быть от 2 до 6 для каждой команды включительно.");
                return;
            }

            // initialize with a ShuffledLeaders class
            let shuffledLeaders = new ShuffledLeaders();

            // create an embed message
            let messageEmbed: EmbedResponse = {
                color: 0x0099ff,
                title: "FFA",
                fields: [
                ]
            };

            // colective pull or not
            if (args[1] == "collective") {

                // iterate of each team
                for (let teamNumber: number = 1; teamNumber <= 2; teamNumber++) {

                    let leaderString: string;

                    for (let leaderNumber = 1; leaderNumber <= 2 * Number(args[0]); leaderNumber++) {
                        const leaderObject: Leader = shuffledLeaders.getLeader();

                        leaderString += `${leaderObject.avatarId} ${leaderObject.name} (${leaderObject.country})\n`;
                    }

                    messageEmbed.fields.push({
                        name: `Команда ${teamNumber}`,
                        value: leaderString
                    });
                }

            }
            else {
                // iterate of each team
                for (let teamNumber: number = 1; teamNumber <= 2; teamNumber++) {
                    messageEmbed.fields.push({
                        name: "\u200B",
                        value: `**Команда ${teamNumber}**`
                    });

                    // iterate over each player
                    for (let playerNumber: number = 1; playerNumber <= Number(args[0]); playerNumber++) {

                        let leaderString: string;

                        for (let leaderNumber: number = 1; leaderNumber <= 2; leaderNumber++) {
                            const leaderObject: Leader = shuffledLeaders.getLeader();

                            leaderString += `${leaderObject.avatarId} ${leaderObject.name} (${leaderObject.country})\n`;
                        }

                        messageEmbed.fields.push({
                            name: `Игрок ${playerNumber}`,
                            value: leaderString
                        });
                    }
                }
            }

            message.channel.send({ embed: messageEmbed });

        }
        catch (error) {
            console.log(error.message);
        }
    }
};

export default command;