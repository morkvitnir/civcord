"use strict";


const ShuffledLeaders = require("../leaders/ShuffledLeaders");

module.exports = {
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
                throw new Error("неправильный формат ввода.\n Корректный: civ tm <количество игроков в каждой команде>.");
            }
            // check if number of players is correct
            else if (args[0] > 12 || args[0] < 2) {
                throw new Error("набрано неправильное количество игроков.\n Значение должно быть от 2 до 6 для каждой команды включительно.");
            }

            // initialize with a ShuffledLeaders class
            let shuffledLeaders = new ShuffledLeaders();

            // create an embed message
            let messageEmbed = {
                color: 0x0099ff,
                title: "Командная игра",
                fields: [

                ]
            };

            // colective pull or not
            if (args[1] == "collective") {

                // iterate of each team
                for (let teamNumber = 1; teamNumber <= 2; teamNumber++) {

                    let leaderString = "";

                    for (let leaderNumber = 1; leaderNumber <= 2 * args[0]; leaderNumber++) {
                        const leaderObject = shuffledLeaders.getLeader();

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
                for (let teamNumber = 1; teamNumber <= 2; teamNumber++) {
                    messageEmbed.fields.push({
                        name: "\u200B",
                        value: `**Команда ${teamNumber}**`
                    });

                    // iterate over each player
                    for (let playerNumber = 1; playerNumber <= args[0]; playerNumber++) {

                        let leaderString = "";

                        for (let leaderNumber = 1; leaderNumber <= 2; leaderNumber++) {
                            const leaderObject = shuffledLeaders.getLeader();

                            leaderString += `${leaderObject.avatarId} ${leaderObject.name} (${leaderObject.country})\n`;
                        }

                        messageEmbed.fields.push({
                            name: `Игрок ${playerNumber}`,
                            value: leaderString
                        })
                    }
                }
            }

            message.channel.send({ embed: messageEmbed });

        }
        catch (error) {
            message.reply(error.message);
        }
    }
}