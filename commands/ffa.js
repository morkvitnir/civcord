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


            // create an embed message
            let messageEmbed = {
                color: 0x0099ff,
                title: "FFA",
                fields: [

                ]
            };

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
                });
            }


            message.channel.send({ embed: messageEmbed });

        }
        catch (error) {
            message.reply(error.message);
        }
    }
}