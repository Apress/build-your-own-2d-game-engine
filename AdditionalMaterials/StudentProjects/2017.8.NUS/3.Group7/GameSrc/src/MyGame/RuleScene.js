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




function RuleScene() {

    
    this.mCamera = null
    this.mPlayer1 = null
    this.mPlayer1Control = null
    this.mPlayer1Skill = null


    this.mPlayer2 = null
    this.mPlayer2Control = null
    this.mPlayer2Skill = null
    
}
gEngine.Core.inheritPrototype(RuleScene, Scene)

RuleScene.prototype.initialize = function () {
    
    this.mCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        100,                        // width of camera
        [0, 0, 1000, 500],         // viewport (orgX, orgY, width, height)
        2
    )
    this.mCamera.setBackgroundColor([1, 1, 1, 1])

    this.mMsg = new FontRenderable('For better experience Press F11')
    this.mMsg.getXform().setPosition(15, 65)
    this.mMsg.setTextHeight(4)

   
    this.mPlayer1 = new FontRenderable('Player1')
    this.mPlayer1.getXform().setPosition(26,55)
    this.mPlayer1.setTextHeight(5)
    this.mPlayer1Control = new FontRenderable('Control: W A S D')
    this.mPlayer1Control.getXform().setPosition(26,50)
    this.mPlayer1Control.setTextHeight(5)
    this.mPlayer1Skill = new FontRenderable('Skill key: E')
    this.mPlayer1Skill.getXform().setPosition(26,45)
    this.mPlayer1Skill.setTextHeight(5)

    this.mPlayer2 = new FontRenderable('Player2')
    this.mPlayer2.getXform().setPosition(26,38)
    this.mPlayer2.setTextHeight(5)
    this.mPlayer2Control = new FontRenderable('Control: I J K L')
    this.mPlayer2Control.getXform().setPosition(26,33)
    this.mPlayer2Control.setTextHeight(5)
    this.mPlayer2Skill = new FontRenderable('Skill key: U')
    this.mPlayer2Skill.getXform().setPosition(26,28)
    this.mPlayer2Skill.setTextHeight(5)
    
    
}

RuleScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]) // clear to light gray
    
    this.mCamera.setupViewProjection()
    this.mPlayer1.draw(this.mCamera)
    this.mPlayer1Control.draw(this.mCamera)
    this.mPlayer1Skill.draw(this.mCamera)
    
    this.mPlayer2.draw(this.mCamera)
    this.mPlayer2Control.draw(this.mCamera)
    this.mPlayer2Skill.draw(this.mCamera)
    
    this.mMsg.draw(this.mCamera)
   
    
    
    
   
    
}
RuleScene.prototype.update = function () {
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
        gEngine.GameLoop.stop()
    
    
}

RuleScene.prototype.loadScene = function () {
   
}

RuleScene.prototype.unloadScene = function() {
    
    
   
    // let next = new  Player1ChooseScene()
    let next = new Player1ChooseCharacter()
    gEngine.Core.startScene(next)
}