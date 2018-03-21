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

function Player2ChooseCharacter(plyer1Name,player1Character,player1Texture) {

    this.mPlyer1Name = plyer1Name
    this.mPlayer1Character = player1Character
    this.mPlayer1Texture = player1Texture
   
    this.mPlayer1Msg = null
    this.mPlayer2Msg = null
    this.mCharacters = null
    this.mFontCamera = null

    
}
gEngine.Core.inheritPrototype(Player2ChooseCharacter, Scene)

Player2ChooseCharacter.prototype.initialize = function () {
   
    
    //this.mMsg = new FontRenderable(this.mResult)
    this.mFontCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        100,                     // width of camera
        [0, 300, 650, 200]         // viewport (orgX, orgY, width, height)
    )
    this.mFontCamera.setBackgroundColor([0.9, 0.9, 0.9, 1])
    this.mCharacters = new SkinObjects()
    let str = 'Player2:'
    str += this.mCharacters.getCurrentSkinName()
    this.mPlayer2Msg = new FontRenderable(str)
    this.mPlayer2Msg.getXform().setPosition(-30, -5)
    this.mPlayer2Msg.setTextHeight(6)

    let str1 = 'Player1:'
    str1 += this.mPlyer1Name
    this.mPlayer1Msg = new FontRenderable(str1)
    this.mPlayer1Msg.getXform().setPosition(-30, 5)
    this.mPlayer1Msg.setTextHeight(6)
   
    
    
}

Player2ChooseCharacter.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]) // clear to light gray
    
    
    this.mCharacters.draw()
    
    this.mFontCamera.setupViewProjection()
   
    this.mPlayer1Msg.draw(this.mFontCamera)
    this.mPlayer2Msg.draw(this.mFontCamera)
  
    //this.mMsg.draw(this.mCamera)
    
    
    
}
Player2ChooseCharacter.prototype.update = function () {
    
    // select which character to work with
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
        gEngine.GameLoop.stop()
    this.mCharacters.updateForPlayer2()
    
    let str = 'Player2:'
    str += this.mCharacters.getCurrentSkinName()
    this.mPlayer2Msg = new FontRenderable(str)
    this.mPlayer2Msg.getXform().setPosition(-30, -5)
    //this.mPlayer1Msg.getXform().setSize(100,100)
    this.mPlayer2Msg.setTextHeight(6)
    
    
}

/* global gSkinAssets*/
Player2ChooseCharacter.prototype.loadScene = function () {
    //gEngine.Textures.loadTexture(this.kPlayer1Texture)
    for(let path in gSkinAssets){
        let texture = gSkinAssets[path]
        gEngine.Textures.loadTexture(texture)
    }
}

Player2ChooseCharacter.prototype.unloadScene = function() {
    for(let path in gSkinAssets){
        let texture = gSkinAssets[path]
        gEngine.Textures.unloadTexture(texture)
    }
    let next = new Player2ChooseScene(this.mPlayer1Character,this.mCharacters.getCurrentSkinPath(),this.mPlayer1Texture,this.mPlyer1Name)
    gEngine.Core.startScene(next)
}