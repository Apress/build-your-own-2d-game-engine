
/* global Command, gEngine */

function JumpCommand(hero) {
    this.mHero = hero;
};

gEngine.Core.inheritPrototype(JumpCommand, Command);

JumpCommand.prototype.excute = function(){

    this.mHero.Jump();
};

