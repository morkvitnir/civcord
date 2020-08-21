"use strict";


const ShuffledLeaders = require("../leaders/ShuffledLeaders");

module.exports = {
    name: "ffa",
    format: "civ ffa <количество игроков>",
    description: `*<количество игроков>* - общее количество игроков от 2 до 12 включительно\n
    *Пример использования:
    civ ffa 8*`,
    execute(message, args) {

        try {

            // check if argument array is not empty
            if (args.length == 0) {
                throw new Error("неправильный формат ввода.\n Корректный: civ ffa <количество игроков>.");
            }
            // check if number of players is correct
            else if (args[0] > 12 || args[0] < 2) {
                throw new Error("набрано неправильное количество игроков.\n Значение должно быть от 2 до 12 включительно.");
            }

            // initialize with a ShuffledLeaders class
            let shuffledLeaders = new ShuffledLeaders();

            // a string holding all results
            let resultingText = "**FFA**\n\n";

            // iterate over each player
            for (let playerNumber = 1; playerNumber <= args[0]; playerNumber++) {
                resultingText += `**Игрок ${playerNumber}**\n`;

                for (let leaderNumber = 1; leaderNumber <= 2; leaderNumber++) {
                    const leaderObject = shuffledLeaders.getLeader();

                    resultingText += `${leaderObject.avatarId} ${leaderObject.name} (${leaderObject.country})\n`;
                }
            }


            message.channel.send(resultingText);

        }
        catch (error) {
            message.reply(error.message);
        }
    }
}