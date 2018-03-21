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

function Player1ChooseCharacter() {

    
   
    this.mPlayer1Msg = null
    this.mPlayer2Msg = null
    this.mCharacters = null
    this.mFontCamera = null

    
}
gEngine.Core.inheritPrototype(Player1ChooseCharacter, Scene)

Player1ChooseCharacter.prototype.initialize = function () {
   
    
    //this.mMsg = new FontRenderable(this.mResult)
    this.mFontCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        100,                     // width of camera
        [0, 300, 650, 200]         // viewport (orgX, orgY, width, height)
    )
    this.mFontCamera.setBackgroundColor([0.9, 0.9, 0.9, 1])
    this.mCharacters = new SkinObjects()
    let str = 'Player1:'
    str += this.mCharacters.getCurrentSkinName()
    this.mPlayer1Msg = new FontRenderable(str)
    this.mPlayer1Msg.getXform().setPosition(-30, 5)
    this.mPlayer1Msg.setTextHeight(6)

    this.mPlayer2Msg = new FontRenderable('Player2:Waiting')
    this.mPlayer2Msg.getXform().setPosition(-30, -5)
    this.mPlayer2Msg.setTextHeight(6)
   
    
    
}

Player1ChooseCharacter.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]) // clear to light gray
    
    
    this.mCharacters.draw()
    
    this.mFontCamera.setupViewProjection()
   
    this.mPlayer1Msg.draw(this.mFontCamera)
    this.mPlayer2Msg.draw(this.mFontCamera)
  
    //this.mMsg.draw(this.mCamera)
    
    
    
}
Player1ChooseCharacter.prototype.update = function () {
    
    // select which character to work with
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
        gEngine.GameLoop.stop()
    this.mCharacters.updateForPlayer1 ()
    
    let str = 'Player1:'
    str += this.mCharacters.getCurrentSkinName()
    this.mPlayer1Msg = new FontRenderable(str)
    this.mPlayer1Msg.getXform().setPosition(-30, 5)
    //this.mPlayer1Msg.getXform().setSize(100,100)
    this.mPlayer1Msg.setTextHeight(6)
    
    
}

/* global gSkinAssets*/
Player1ChooseCharacter.prototype.loadScene = function () {
    //gEngine.Textures.loadTexture(this.kPlayer1Texture)
    for(let path in gSkinAssets){
        let texture = gSkinAssets[path]
        gEngine.Textures.loadTexture(texture)
    }
}

Player1ChooseCharacter.prototype.unloadScene = function() {
    for(let path in gSkinAssets){
        let texture = gSkinAssets[path]
        gEngine.Textures.unloadTexture(texture)
    }
    let next = new Player1ChooseScene(this.mCharacters.getCurrentSkinPath(),this.mCharacters.getCurrentSkinName())
    gEngine.Core.startScene(next)
}