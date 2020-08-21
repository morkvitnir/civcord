"use strict";
const Discord = require('discord.js');
const fs = require("fs");

const ShuffledLeaders = require("../leaders/ShuffledLeaders");

module.exports = {
    name: "tm",
    description: "Lists 2 random leaders for each player in TM",
    execute(message, args) {

        try {

            // check if argument array is not empty
            if (args.length == 0) {
                throw new Error("неправильный формат ввода.\n Коректный: civ tm <количество игроков в каждой команде>.");
            }
            // check if number of players is correct
            else if (args[0] > 12 || args[0] < 2) {
                throw new Error("набрано неправильное количество игроков.\n Значение должно быть от 2 до 6 для каждой команды включительно.");
            }

            // initialize with a ShuffledLeaders class
            let shuffledLeaders = new ShuffledLeaders();

            // a string holding all results
            let resultingText = "**TM**\n\n";

            // colective pull or not
            if (args[1] == "collective") {

                // iterate of each team
                for (let commandNumber = 1; commandNumber <= 2; commandNumber++) {
                    resultingText += `**Команда ${commandNumber}**\n`;

                    for (let leaderNumber = 1; leaderNumber <= 2 * args[0]; leaderNumber++) {
                        const leaderObject = shuffledLeaders.getLeader();

                        resultingText += `${leaderObject.avatarId} ${leaderObject.name} (${leaderObject.country})\n`;
                    }

                    resultingText += "\n";
                }
            }
            else {
                // iterate of each team
                for (let commandNumber = 1; commandNumber <= 2; commandNumber++) {
                    resultingText += `**Команда ${commandNumber}**\n`;

                    // iterate over each player
                    for (let playerNumber = 1; playerNumber <= args[0]; playerNumber++) {
                        resultingText += `**Игрок ${playerNumber}**\n`;

                        for (let leaderNumber = 1; leaderNumber <= 2; leaderNumber++) {
                            const leaderObject = shuffledLeaders.getLeader();

                            resultingText += `${leaderObject.avatarId} ${leaderObject.name} (${leaderObject.country})\n`;
                        }
                    }

                    resultingText += "\n";
                }
            }

            message.channel.send(resultingText);

        }
        catch (error) {
            message.reply(error.message);
        }
    }
}