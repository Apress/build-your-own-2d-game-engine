/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function GameState(mainHero) 
{
    this.mTreasureCollected = 0;
    this.mHero = mainHero;
    this.mGameWin = false;
    this.mGameOver = false;
    this.mTimer = 0;
}

GameState.prototype.update = function()
{
    //Update timer
    this.mTimer++;
    
    if(this.isGameFinished()) 
    {
        gEngine.GameLoop.stop();
    }
    if(this.mHero.getHealth() <= 0) 
    {
        this.setGameOver(true);
    }
    if(this.mTreasureCollected >= 7)
    {
        this.setGameWin(true);
    }
    if((this.mTimer % 60) === 0) 
    {
        //this.mHero.regenHealth();
    }
};

//A function that returns a string displaying the current damage and number of
// treasures collected.
GameState.prototype.displayStatus = function() 
{
    var status = "Health: " + this.mHero.getHealth() + "  Treasure: " 
            + this.mTreasureCollected;
    return status;
};

GameState.prototype.addTreasure = function() 
{
    this.mTreasureCollected++;
};

// Returns a boolean to tell whether the game is over
GameState.prototype.isGameOver = function() 
{
    return this.mGameOver;
};

// Takes in a boolean and sets it to be the value of the 
GameState.prototype.setGameOver = function(gameStatus)
{
    this.mGameOver = gameStatus;
};

// Returns a boolean to tell whether the game has been won
GameState.prototype.isGameWin = function() 
{
    return this.mGameWin;
};

// Takes in a boolean and sets it to be the value of the GameWin status
GameState.prototype.setGameWin = function(gameStatus)
{
    this.mGameWin = gameStatus;
};

//A function that checks if the game is finished (playerr has lost or 
//player has won)
GameState.prototype.isGameFinished = function()
{
    return (this.isGameOver() || this.isGameWin());
};