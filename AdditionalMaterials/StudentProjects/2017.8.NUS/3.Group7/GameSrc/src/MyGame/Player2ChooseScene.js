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

'use strict'  // Operate in Strict mode such that variables must be declared before used!

/*const GameCharacter = {
    'BigMan' : 3,
    'FlexMan' : 4,
    'NormalMan' : 5
}*/



function Player2ChooseScene(player1Character,player2Texture,player1Texture,player1Name) {

    this.mCamera = null
    this.mPlayer1GameCharacter = player1Character
    this.mPlayer2GameCharacter =  GameCharacter.BigMan
    this.mCharacter1 = null
    this.mCharacter2 = null
    this.mCharacter3 = null

    this.mMsg = null
    this.mMsg1 = null

    this.mPlayer1Texture = player1Texture
    this.mPlayer2Texture = player2Texture
    
    this.mPlayer1Name = player1Name
    
}
gEngine.Core.inheritPrototype(Player2ChooseScene, Scene)

Player2ChooseScene.prototype.initialize = function () {
    
    this.mCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        100,                        // width of camera
        [0, 0, 1000, 500],         // viewport (orgX, orgY, width, height)
        2
    )
    this.mCamera.setBackgroundColor([1, 1, 1, 1])
    //character1
  
    this.mCharacter1 = new  CharacterInfo()
    this.mCharacter1.setName('Powerful',3,[5,70])
    this.mCharacter1.setColor(this.mPlayer2Texture,[4,4],[6,65])
    this.mCharacter1.setWeight('150kg',2,[5,60])
    this.mCharacter1.setSkill('BACK OFF',2,[5,55])
    this.mCharacter1.setSkillDetail('(rotate)',2,[5,53])
    this.mCharacter1.setFeature('power',2,[5,48])
    //character2
    this.mCharacter2 = new  CharacterInfo()
    this.mCharacter2.setName('Agile',2,[35,70])
    this.mCharacter2.setColor(this.mPlayer2Texture,[3,3],[36,65])
    this.mCharacter2.setWeight('70kg',2,[35,60])
    this.mCharacter2.setSkill('EVEN FASTER',2,[35,55])
    this.mCharacter2.setSkillDetail('(fastest speed)',2,[35,53])
    this.mCharacter2.setFeature('quick',2,[35,48])
    //character3 
    this.mCharacter3 = new  CharacterInfo()
    this.mCharacter3.setName('Balanced',2,[65,70])
    this.mCharacter3.setColor(this.mPlayer2Texture,[3,3],[66,65])
    this.mCharacter3.setWeight('85kg',2,[65,60])
    this.mCharacter3.setSkill('PUZZLE',2,[65,55])
    this.mCharacter3.setSkillDetail('(reverse other control)',2,[65,53])
    this.mCharacter3.setFeature('balance',2,[65,48])
    
    
    let str = 'Player1:'
    /*   if(this.mPlayer1GameCharacter === GameCharacter.BigMan)
        str += 'Player1: Hulk '
    else if(this.mPlayer1GameCharacter === GameCharacter.FlexMan)
        str += 'Player1: Flash '
    else
        str += 'Player1: CaptainAmerica'*/
    str += this.mPlayer1Name
    this.mMsg = new FontRenderable(str)
    this.mMsg.getXform().setPosition(6, 40)
    this.mMsg.setTextHeight(5)
   
    this.mMsg1 = new FontRenderable('Player2: Choosing')
    this.mMsg1.getXform().setPosition(6, 30)
    this.mMsg1.setTextHeight(5)
    
    
}

Player2ChooseScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]) // clear to light gray
    
    this.mCamera.setupViewProjection()
    
    
    
  
    this.mCharacter1.draw(this.mCamera)
    this.mCharacter2.draw(this.mCamera)
    this.mCharacter3.draw(this.mCamera)
    
    this.mMsg.draw(this.mCamera)
    this.mMsg1.draw(this.mCamera)
   
    
}
Player2ChooseScene.prototype.update = function () {
  
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
        gEngine.GameLoop.stop()
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.L)){
        if(this.mPlayer2GameCharacter === GameCharacter.BigMan){
            this.mPlayer2GameCharacter = GameCharacter.FlexMan
            this.mCharacter1.setNameSize(2)
            this.mCharacter1.setColor(this.mPlayer2Texture,[3,3],[6,65])
            this.mCharacter2.setNameSize(3)
            this.mCharacter2.setColor(this.mPlayer2Texture,[4,4],[36,65])
        }else if(this.mPlayer2GameCharacter === GameCharacter.FlexMan){
            this.mPlayer2GameCharacter = GameCharacter.NormalMan
            this.mCharacter2.setNameSize(2)
            this.mCharacter2.setColor(this.mPlayer2Texture,[3,3],[36,65])
            this.mCharacter3.setNameSize(3)
            this.mCharacter3.setColor(this.mPlayer2Texture,[4,4],[66,65])
        }else if(this.mPlayer2GameCharacter === GameCharacter.NormalMan){
            this.mPlayer2GameCharacter = GameCharacter.BigMan
            this.mCharacter3.setNameSize(2)
            this.mCharacter3.setColor(this.mPlayer2Texture,[3,3],[66,65])
            this.mCharacter1.setNameSize(3)
            this.mCharacter1.setColor(this.mPlayer2Texture,[4,4],[6,65])
        }
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.J)){
        if(this.mPlayer2GameCharacter === GameCharacter.BigMan){
            //this.mPlayer2GameCharacter = GameCharacter.FlexMan
            this.mPlayer2GameCharacter = GameCharacter.NormalMan
            this.mCharacter1.setNameSize(2)
            this.mCharacter1.setColor(this.mPlayer2Texture,[3,3],[6,65])
            // this.mCharacter2.setNameSize(3)
            // this.mCharacter2.setColor([1,1,0,1],[4,4],[36,65])
            this.mCharacter3.setNameSize(3)
            this.mCharacter3.setColor(this.mPlayer2Texture,[4,4],[66,65])
        }else if(this.mPlayer2GameCharacter === GameCharacter.FlexMan){
            // this.mPlayer2GameCharacter = GameCharacter.NormalMan
            this.mPlayer2GameCharacter = GameCharacter.BigMan
            this.mCharacter2.setNameSize(2)
            this.mCharacter2.setColor(this.mPlayer2Texture,[3,3],[36,65])
            this.mCharacter1.setNameSize(3)
            this.mCharacter1.setColor(this.mPlayer2Texture,[4,4],[6,65])
            // this.mCharacter3.setNameSize(3)
            //  this.mCharacter3.setColor([1,0,1,1],[4,4],[71,65])
        }else if(this.mPlayer2GameCharacter === GameCharacter.NormalMan){
            this.mPlayer2GameCharacter = GameCharacter.FlexMan
            this.mCharacter3.setNameSize(2)
            this.mCharacter3.setColor(this.mPlayer2Texture,[3,3],[66,65])
            // this.mCharacter1.setNameSize(3)
            //this.mCharacter1.setColor([1,0,0,1],[4,4],[6,65])
            this.mCharacter2.setNameSize(3)
            this.mCharacter2.setColor(this.mPlayer2Texture,[4,4],[36,65])
        }
    }
    
    
}

Player2ChooseScene.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.mPlayer2Texture)
}

Player2ChooseScene.prototype.unloadScene = function() {
    
    gEngine.Textures.unloadTexture(this.mPlayer2Texture)
    
    //let next = new StartGame3(this.mPlayer1GameCharacter,this.mPlayer2GameCharacter,this.mPlayer1Texture,this.mPlayer2Texture)
    let next = new ChoosePlayground(this.mPlayer1GameCharacter,this.mPlayer2GameCharacter,this.mPlayer1Texture,this.mPlayer2Texture)
    gEngine.Core.startScene(next)
}