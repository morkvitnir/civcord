"use strict";

const shuffle = require("shuffle-array");


module.exports = class ShuffledLeaders {

    constructor() {
        shuffle(this._leaders);
    }

    _leaders = require("./leaders.json");

    // Eleanor uniqueness flag
    eleanorPoped = false;

    // return a random leader
    getLeader() {

        let popped = this._leaders.pop();

        // if a popped is an Array (country), then return one leader randomly from it, the other ones are discarded
        if (Array.isArray(popped)) {

            // create a temporary popped value and assign a random leader from a country to it
            let poppedTemp = shuffle(popped).pop();

            // Eleanor uniqueness check
            // if a random leader from a country is the first occurence of Eleanor then return her
            if (poppedTemp.name == "Алиенора Аквитанская" && !this.eleanorPoped) {
                this.eleanorPoped = true;
                popped = poppedTemp;
                console.log("Eleanor popped first time")
            }
            // if Eleanor has already been returned, then push Eleanor's country back, reshuffle the deck and pick again
            else if (poppedTemp.name == "Алиенора Аквитанская" && this.eleanorPoped) {
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