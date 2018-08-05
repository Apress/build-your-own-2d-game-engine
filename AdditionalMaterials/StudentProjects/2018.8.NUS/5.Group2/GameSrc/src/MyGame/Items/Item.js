"use strict";

function GameItem(name) {
    this.mName = name;
    this.mAmount = 0;
}

GameItem.prototype.statusString = function () {
    return this.mName + " x" + this.mAmount;
}
