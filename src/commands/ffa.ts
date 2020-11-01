//import leaders
import ShuffledLeaders from "../ShuffledLeaders";

// import interfaces
import { Command, EmbedResponse, Leader } from "../interfaces";


const command: Command = {
    name: "ffa",
    format: "civ ffa <количество игроков>",
    description: `*<количество игроков>* - общее количество игроков от 2 до 12 включительно\n
    *Пример использования:
    civ ffa 8*`,
    execute(message, args) {

        try {

            // check if argument array is not empty
            if (args.length == 0) {
                message.reply(`неправильный формат ввода.\n Корректный: ${this.format}.`);
                return;
            }
            // check if number of players is correct
            else if (Number(args[0]) > 12 || Number(args[0]) < 2) {
                message.reply("набрано неправильное количество игроков.\n Значение должно быть от 2 до 12 включительно.");
                return;
            }

            // initialize a ShuffledLeaders class
            let shuffledLeaders = new ShuffledLeaders();


            // create an embed message
            let messageEmbed: EmbedResponse = {
                color: 0x0099ff,
                title: "FFA",
                fields: [
                ]
            };

            // iterate over each player
            for (let playerNumber: number = 1; playerNumber <= Number(args[0]); playerNumber++) {

                let leaderString: string = "";

                for (let leaderNumber: number = 1; leaderNumber <= 2; leaderNumber++) {
                    const leaderObject: Leader = shuffledLeaders.getLeader();

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
            console.log(error.message);
        }
    }
};

export default command;