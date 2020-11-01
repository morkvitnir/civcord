import * as shuffle from "shuffle-array";
import * as fs from "fs";

import { Leader } from "./interfaces";

export default class {

    // array containing all leaders
    private _leaders: Array<Leader | Leader[]> = JSON.parse(fs.readFileSync("./src/assets/leaders.json") as any);

    // Eleanor uniqueness flag
    private _eleanorPopped: boolean = false;


    public constructor() {
        shuffle(this._leaders);
    }


    // return a random leader
    public getLeader(): Leader {

        let popped: Leader | Leader[] = this._leaders.pop();

        // if a popped is an Array (country), then return one leader randomly from it, the other ones are discarded
        if (Array.isArray(popped)) {

            // create a temporary popped value and assign a random leader from a country to it
            let poppedTemp: Leader = shuffle(popped).pop();

            // Eleanor uniqueness check
            // if a random leader from a country is the first occurence of Eleanor then return her
            if (poppedTemp.name == "Алиенора Аквитанская" && !this._eleanorPopped) {
                this._eleanorPopped = true;
                popped = poppedTemp;
                console.log("Eleanor popped first time");
            }
            // if Eleanor has already been returned, then push Eleanor's country back, reshuffle the deck and pick again
            else if (poppedTemp.name == "Алиенора Аквитанская" && this._eleanorPopped) {
                console.log("Eleanor second time");
                this._leaders.push(popped);
                shuffle(this._leaders);
                popped = this.getLeader();
            }
            // assign to the popped for all other leaders
            else {
                popped = poppedTemp;
            }
        }


        return popped;
    }

};