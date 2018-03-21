//    Copyright 2017 XieJinChi ChenYiXiu
// 
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
// 
//        http://www.apache.org/licenses/LICENSE-2.0
// 
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.






'use strict'
/*global gEngine*/ 
function StartGame(player1,player2,player1Texture,player2Texture,player1WinTimes = 0, player2WinTimes = 0){
    //this.kMinionSprite = 'assets/minion_sprite.png'
    //this.kPlatformTexture = 'assets/platform.png'
    //this.kWallTexture = 'assets/wall.png'
    this.kPlayer1Texture = player1Texture
    this.kPlayer2Texture = player2Texture

    this.mCamera = null
    this.mGamePlayers = null
    this.mCollisionInfos = []

    this.mPlayer1 = null
    this.mPlayer2 = null

    this.mBoundline = null

    this.mResult = null

    this.mPlayer1Character = player1
    this.mPlayer2Character = player2

    this.mBoundSet = new GameObjectSet()
    this.mBoundTop = null
    this.mBoundBottom = null
    this.mBoundLeft = null
    this.mBoundRight = null

    this.mObstacles = new GameObjectSet()

    this.mPlayer1SkillMsg = null
    this.mPlayer2SkillMsg = null
    
    this.mPlayer1WinTimes = player1WinTimes
    this.mPlayer2WinTimes = player2WinTimes

    this.mScoreMsg = null

    this.mBackgroundTexture = 'assets/map1.png'



}

gEngine.Core.inheritPrototype(StartGame, Scene)

StartGame.prototype.generateRandomObstacle = function(){
    let random = (min, max) => {
        return Math.random() * (max - min) + min
    }
    let obsacle1 = new Obstacle([30,-15],[random(3,10),random(3,10)],[random(1,2),random(1,2)])
    let obsacle2 = new Obstacle([-30,15],[random(3,10),random(3,10)],[random(1,2),random(1,2)])
    let obsacle3 = new Obstacle([0,0],[random(3,10),random(3,10)],[random(1,2),random(1,2)])
    this.mObstacles.addToSet(obsacle1)
    this.mObstacles.addToSet(obsacle2)
    this.mObstacles.addToSet(obsacle3)
}

StartGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kPlayer1Texture)
    gEngine.Textures.loadTexture(this.kPlayer2Texture)
    gEngine.Textures.loadTexture(this.mBackgroundTexture)
  
}

StartGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kPlayer1Texture)
    gEngine.Textures.unloadTexture(this.kPlayer2Texture)
    gEngine.Textures.unloadTexture(this.mBackgroundTexture)
    let canvas = document.getElementById('GLCanvas')
    canvas.width = '1000'
    canvas.height = '500'
    let next = null
    if(this.mPlayer1WinTimes === 3){
        this.mResult = this.kPlayer1Texture
        next = new EndScene(this.mResult,this.kPlayer2Texture,true,this.mPlayer1Character,this.mPlayer2Character)
    }else if(this.mPlayer2WinTimes === 3){
        this.mResult = this.kPlayer2Texture
        next = new EndScene(this.mResult,this.kPlayer1Texture,false,this.mPlayer1Character,this.mPlayer2Character)
    }else{
        next = new StartGame(this.mPlayer1Character,this.mPlayer2Character,this.kPlayer1Texture,this.kPlayer2Texture,
            this.mPlayer1WinTimes,this.mPlayer2WinTimes)
    }
    gEngine.Core.startScene(next)
   
}




StartGame.prototype.initialize = function(){
    
    
    

    let canvas = document.getElementById('GLCanvas')
    canvas.width = '1200'
    canvas.height = '850'
    document.getElementById('game-contain').style.border='0px groove #666666'
   


    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        100,                     // width of camera
        [0, 50, 1000, 800]         // viewport (orgX, orgY, width, height)
    )

    this.mCamera.setBackgroundColor([1, 1, 1, 1])
    this.mPlayer1 = new Player1(this.kPlayer1Texture,this.mPlayer1Character)
    this.mPlayer2 = new Player2(this.kPlayer2Texture,this.mPlayer2Character)
    this.mGamePlayers = new GameObjectSet()
    this.mGamePlayers.addToSet(this.mPlayer1)
    this.mGamePlayers.addToSet(this.mPlayer2)

    this.mGameArea = new SpriteRenderable(this.mBackgroundTexture)
    this.mGameArea.setColor([17/255,141/255,1,0])
    let xf = this.mGameArea.getXform()
    xf.setPosition(0,0)
    xf.setSize(100,50)
    //let pos = xf.getPosition()
    // let size = xf.getSize()
    this.mBoundTop = new BoundLine([0,25],[100,2])
    this.mBoundBottom = new BoundLine([0,-25],[100,2])
    this.mBoundLeft = new BoundLine([-50,0],[2,50])
    this.mBoundRight = new BoundLine([50,0],[2,50])
    this.mBoundSet.addToSet(this.mBoundTop)
    this.mBoundSet.addToSet(this.mBoundBottom)
    this.mBoundSet.addToSet(this.mBoundLeft)
    this.mBoundSet.addToSet(this.mBoundRight)
    this.generateRandomObstacle()


    let str = this.mPlayer1.getStateString()
    this.mPlayer1SkillMsg = new FontRenderable(str)
    this.mPlayer1SkillMsg.getXform().setPosition(-18, 35)
    this.mPlayer1SkillMsg.setTextHeight(5)

    str = this.mPlayer2.getStateString()
    this.mPlayer2SkillMsg = new FontRenderable(str)
    this.mPlayer2SkillMsg.getXform().setPosition(-18,30)
    this.mPlayer2SkillMsg.setTextHeight(5)

    let scoreStr = ''
    scoreStr += this.mPlayer1WinTimes
    scoreStr += ' : '
    scoreStr += this.mPlayer2WinTimes
    this.mScoreMsg = new FontRenderable(scoreStr)
    this.mScoreMsg.getXform().setPosition(-35,32.5)
    this.mScoreMsg.setTextHeight(5)
    
}

StartGame.prototype.draw = function(){
  
   
    gEngine.Core.clearCanvas([1, 1, 1, 1.0]) // clear to light gray
   
    this.mCamera.setupViewProjection()
    this.mGameArea.draw(this.mCamera)
    this.mGamePlayers.draw(this.mCamera)
    // this.mBoundSet.draw(this.mCamera)
    // this.mObstacles.draw(this.mCamera)
    this.mPlayer1SkillMsg.draw(this.mCamera)
    this.mPlayer2SkillMsg.draw(this.mCamera)
    this.mScoreMsg.draw(this.mCamera)
}

StartGame.prototype.update = function(){

    if(this.mPlayer2.getInverse()===true){
        this.mPlayer1.inverseKeyControl()
    }else{
        this.mPlayer1.keyControl()
    }
    if(this.mPlayer1.getInverse()===true){
        // alert('inverse')
        this.mPlayer2.inverseKeyControl()
    }else{
        this.mPlayer2.keyControl()
    }
    //this.mPlayer2.inverseKeyControl()
    //this.mPlayer2.keyControl()
    this.mGamePlayers.update(this.mCamera)
    this.mObstacles.update(this.mCamera)
    gEngine.Physics.processCollision(this.mGamePlayers, this.mCollisionInfos)
    //gEngine.Physics.processCollision(this.mObstacles.concat(this.mBoundSet),this.mCollisionInfos)
    let pos1 = this.mPlayer1.getXform().getPosition()
    let pos2 = this.mPlayer2.getXform().getPosition()
    let boundSize = this.mGameArea.getXform().getSize()
    let p = 900/1024
    if(pos1[0]>(boundSize[0]/2)*p || pos1[0]<-boundSize[0]/2*p){
        //this.mResult = 'player2 wins'
        this.mPlayer2WinTimes += 1
        gEngine.GameLoop.stop()
      
    }else if(pos2[0]>boundSize[0]/2*p|| pos2[0]<-boundSize[0]/2*p){
        // this.mResult = 'player1 wins'
        this.mPlayer1WinTimes += 1
        gEngine.GameLoop.stop()
       
    } else if(pos1[1]>boundSize[1]/2 *p || pos1[1]<-boundSize[1]/2*p ){
        // this.mResult = 'player2 wins'
        this.mPlayer2WinTimes += 1
        gEngine.GameLoop.stop()
        
    } else if(pos2[1]>boundSize[1] /2 * p || pos2[1]<-boundSize[1] /2 * p ){
        //this.mResult = 'player1 wins'
        this.mPlayer1WinTimes += 1
        gEngine.GameLoop.stop()
    }

    /*   if(this.mResult !== null){
        //CameraShake(state, xDelta, yDelta, shakeFrequency, shakeDuration)
        //let shake = new CameraShake(this.mCamera,1,1,1,2)
        //this.mCamera.shake(1,1,1,1000)
      
       // gEngine.GameLoop.stop()
    }*/
    let str = this.mPlayer1.getStateString()
    this.mPlayer1SkillMsg = new FontRenderable(str)
    this.mPlayer1SkillMsg.getXform().setPosition(-18, 35)
    this.mPlayer1SkillMsg.setTextHeight(5)

    str = this.mPlayer2.getStateString()
    this.mPlayer2SkillMsg = new FontRenderable(str)
    this.mPlayer2SkillMsg.getXform().setPosition(-18,30)
    this.mPlayer2SkillMsg.setTextHeight(5)

    
}
