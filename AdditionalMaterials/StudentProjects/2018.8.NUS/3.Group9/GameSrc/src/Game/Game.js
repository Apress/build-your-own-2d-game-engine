"use strict";

Game.eGameState = Object.freeze({
    eGameStart: 0,
    ePlayer1_Turn: 1,
    ePlayer2_Turn: 2,
    ePlayer1_Win: 3,
    ePlayer2_Win: 4,
    eGamePause: 5,
    eGameOver: 6
});

function Game() {
    this.mPlayers = [];

    this.mCurrentPlayer = null;

    this.mCurrentState = null;

    this.mCurrentScene = null;

    this.mSpaceLimit = null;
    this.mTurns = null;

    // ugly code here
    Timer.loadAssets();

    this.mCurrentState = Game.eGameState.eGameStart;
    this.mCurrentScene = new MyMenu(this);
    gEngine.Core.initializeEngineCore('GLCanvas', this.mCurrentScene);
}

Game.prototype.setCurrentPlayer = function (index) {
    this.mTurns++;
    this.mPlayers[0].incTurns();
    this.mPlayers[1].incTurns();
    if (this.mTurns % 2 === 0) {
        this.decreaseSpaceLimit(15);
    }
    this.mCurrentPlayer = this.mPlayers[index];
    this.mCurrentPlayer.setState(Player.ePlayerState.eReady);
    this.mCurrentPlayer.resetTimer();
    for (i = 0; i < 5; i++)
        this.mCurrentPlayer.resetCamera();

    var i;
    if (index === 0) {
        this.mPlayers[1].setState(Player.ePlayerState.eWait);
        this.mCurrentState = Game.eGameState.ePlayer1_Turn;
    }
    else if (index === 1) {
        this.mPlayers[0].setState(Player.ePlayerState.eWait);
        this.mCurrentState = Game.eGameState.ePlayer2_Turn;
    }
};

Game.prototype.setState = function (state) {
    this.mCurrentState = state;
};
Game.prototype.getState = function () {
    return this.mCurrentState;
};
Game.prototype.getAllPlayers = function () {
    return this.mPlayers;
};
Game.prototype.getPlayerAt = function (index) {
    return this.mPlayers[index];
};
Game.prototype.getCurrentPlayer = function () {
    return this.mCurrentPlayer;
};

Game.prototype.getTurns = function () {
    return this.mTurns;
};

Game.prototype.initialize = function (aAllObjs, aAllObstacles, aDestroyable, aProps, aBackground) {
    this.mPlayers[0] = new Player(this, 0, aAllObjs, aAllObstacles, aDestroyable, aProps, aBackground);
    this.mPlayers[1] = new Player(this, 1, aAllObjs, aAllObstacles, aDestroyable, aProps, aBackground);

    this.mSpaceLimit = {
        upLimit: 250,
        downLimit: -125,
        leftLimit: -250,
        rightLimit: 250
    };

    this.mTurns = 0;
    this.setCurrentPlayer(0);
    this.mCurrentPlayer.resetTimer();
};

Game.prototype.getSpaceLimit = function () {
    return this.mSpaceLimit;
};

Game.prototype.update = function () {
    this.mPlayers[0].update();
    this.mPlayers[1].update();

    switch (this.mCurrentState) {
        case Game.eGameState.eGameStart: {
            if (this.mCurrentPlayer.getCurrentState() === Player.ePlayerState.eReady) {
                this.mCurrentState = Game.eGameState.ePlayer1_Turn;
                this.setCurrentPlayer(0);
            }
            break;
        }
        case Game.eGameState.ePlayer1_Turn: {
            switch (this.mCurrentPlayer.getCurrentState()) {
                case Player.ePlayerState.eWait: {
                    this.setCurrentPlayer(1);

                    if (this.mCurrentScene.mProps.size() < 10) {
                        var xpos = Math.floor(Game.random(0, 480)) - 240;
                        var ypos = Math.floor(Game.random(40, 200));
                        var propRand = Math.floor(Game.random(0, 5));
                        if (propRand < 2) {
                            var newLifePotion = LifePotion.randomLifePotion(
                                xpos, ypos,
                                this.mCurrentScene.mAllObjs,
                                this.mCurrentScene.mAllObstacles,
                                this.mCurrentScene.mDestroyable
                            );
                            this.mCurrentScene.mAllObjs.addToSet(newLifePotion);
                            this.mCurrentScene.mDestroyable.addToSet(newLifePotion);
                            this.mCurrentScene.mProps.addToSet(newLifePotion);
                        }
                        else if (propRand >= 2 && propRand < 5) {
                            var newBow = Bow.randomBow(xpos, ypos);
                            this.mCurrentScene.mAllObjs.addToSet(newBow);
                            this.mCurrentScene.mDestroyable.addToSet(newBow);
                            this.mCurrentScene.mProps.addToSet(newBow);
                        }
                    }

                    break;
                }
                case Player.ePlayerState.eDie: {
                    this.mCurrentState = Game.eGameState.ePlayer2_Win;
                    gEngine.GameLoop.stop();
                    break;
                }
            }
            if (this.mPlayers[1].mCurrentState === Player.ePlayerState.eDie) {
                this.mCurrentState = Game.eGameState.ePlayer1_Win;
                gEngine.GameLoop.stop();
            }
            break;
        }
        case Game.eGameState.ePlayer2_Turn: {
            switch (this.mCurrentPlayer.getCurrentState()) {
                case Player.ePlayerState.eWait: {
                    this.setCurrentPlayer(0);

                    if (this.mCurrentScene.mProps.size() < 10) {
                        var xpos = Math.floor(Game.random(-240, 240));
                        var ypos = Math.floor(Game.random(40, 200));
                        var propRand = Math.floor(Game.random(0, 5));
                        if (propRand < 2) {
                            var newLifePotion = LifePotion.randomLifePotion(
                                xpos, ypos,
                                this.mCurrentScene.mAllObjs,
                                this.mCurrentScene.mAllObstacles,
                                this.mCurrentScene.mDestroyable
                            );
                            this.mCurrentScene.mAllObjs.addToSet(newLifePotion);
                            this.mCurrentScene.mDestroyable.addToSet(newLifePotion);
                            this.mCurrentScene.mProps.addToSet(newLifePotion);
                            newLifePotion = LifePotion.randomLifePotion(
                                -xpos, ypos,
                                this.mCurrentScene.mAllObjs,
                                this.mCurrentScene.mAllObstacles,
                                this.mCurrentScene.mDestroyable
                            );
                            this.mCurrentScene.mAllObjs.addToSet(newLifePotion);
                            this.mCurrentScene.mDestroyable.addToSet(newLifePotion);
                            this.mCurrentScene.mProps.addToSet(newLifePotion);
                        }
                        else if (propRand >= 2 && propRand < 5) {
                            var newBow = Bow.randomBow(xpos, ypos);
                            this.mCurrentScene.mAllObjs.addToSet(newBow);
                            this.mCurrentScene.mDestroyable.addToSet(newBow);
                            this.mCurrentScene.mProps.addToSet(newBow);
                            newBow = Bow.randomBow(-xpos, ypos);
                            this.mCurrentScene.mAllObjs.addToSet(newBow);
                            this.mCurrentScene.mDestroyable.addToSet(newBow);
                            this.mCurrentScene.mProps.addToSet(newBow);
                        }
                    }

                    break;
                }
                case Player.ePlayerState.eDie: {
                    this.mCurrentState = Game.eGameState.ePlayer1_Win;
                    gEngine.GameLoop.stop();
                    break;
                }
            }
            if (this.mPlayers[0].mCurrentState === Player.ePlayerState.eDie) {
                this.mCurrentState = Game.eGameState.ePlayer2_Win;
                gEngine.GameLoop.stop();
            }
            break;
        }
        case Game.eGameState.ePlayer1_Win: {
            break;
        }
        case Game.eGameState.ePlayer2_Win: {
            break;
        }
        case Game.eGameState.eGamePause: {
            break;
        }
        case Game.eGameState.eGameOver: {
            break;
        }
    }
};

Game.prototype.decreaseSpaceLimit = function (delta) {
    this.mSpaceLimit.upLimit -= 2 * delta;
    this.mSpaceLimit.leftLimit += delta;
    this.mSpaceLimit.rightLimit -= delta;
};

Game.random = function (min, max) {
    parseInt(Math.random() * (max - min) + min, 10);
    return Math.floor(Math.random() * (max - min) + min);
};