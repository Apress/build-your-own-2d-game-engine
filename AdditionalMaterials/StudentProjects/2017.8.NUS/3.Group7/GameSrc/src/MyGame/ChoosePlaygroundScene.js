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



function ChoosePlayground(player1GameCharacter,player2GameCharacter,player1Texture,player2Texture){
    this.mPlayer1GameCharacter = player1GameCharacter
    this.mPlayer2GameCharacter = player2GameCharacter
    this.mPlayer1Texture = player1Texture
    this.mPlayer2Texture = player2Texture

    this.mCamera = null
    this.mPlayground1 = null
    this.mPlayground2 = null
    this.mPlayground3 = null
    this.mPlaygroundSet = []

    this.mMsg  = null
    this.mMsg1 = null
    this.mCurrentPlayground = 1
}

gEngine.Core.inheritPrototype(ChoosePlayground, Scene)

ChoosePlayground.prototype.initialize = function () {
    
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        1000,                        // width of camera
        [0, 0, 1000, 500],         // viewport (orgX, orgY, width, height)
        2
    )
    this.mCamera.setBackgroundColor([1, 1, 1, 1])

    this.mMsg = new FontRenderable('Choose a arena ')
    this.mMsg.getXform().setPosition(-300, 200)
    this.mMsg.setTextHeight(70)

    this.mPlayground1 = new FontRenderable('Kennel')
    this.mPlayground1.getXform().setPosition(-200, 100)
    this.mPlayground1.setTextHeight(60)

    this.mPlayground2 = new FontRenderable('Minions')
    this.mPlayground2.getXform().setPosition(-200,0)
    this.mPlayground2.setTextHeight(40)

 
   
    this.mPlayground3 = new FontRenderable('PokeBall')
    this.mPlayground3.getXform().setPosition(-200,-100)
    this.mPlayground3.setTextHeight(40)

    this.mPlaygroundSet.push(this.mPlayground1)
    this.mPlaygroundSet.push(this.mPlayground2)
    this.mPlaygroundSet.push(this.mPlayground3)

    this.mMsg1 = new FontRenderable('<PRESS: SPACE BAR  CONTROL:ARROW KEY> ')
    this.mMsg1.getXform().setPosition(-300, -150)
    this.mMsg1.setTextHeight(20)

  
    
    
}

ChoosePlayground.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]) // clear to light gray
    
    this.mCamera.setupViewProjection()
    
    
    
    this.mMsg.draw(this.mCamera)
    this.mPlayground1.draw(this.mCamera)
    this.mPlayground2.draw(this.mCamera)
    this.mPlayground3.draw(this.mCamera)
    this.mMsg1.draw(this.mCamera)
    
    
    
   
    
}
ChoosePlayground.prototype.update = function () {
    
    this.mPlaygroundSet[this.mCurrentPlayground-1].setTextHeight(40)
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
        gEngine.GameLoop.stop()
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)){
        if(this.mCurrentPlayground === 1){
            this.mCurrentPlayground = 3
        }else{
            this.mCurrentPlayground -= 1
        }
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)){
        if(this.mCurrentPlayground === 3){
            this.mCurrentPlayground = 1
        }else{
            this.mCurrentPlayground += 1
        }
    }
    this.mPlaygroundSet[this.mCurrentPlayground-1].setTextHeight(60)
    
    
}

ChoosePlayground.prototype.loadScene = function () {
   
}

ChoosePlayground.prototype.unloadScene = function() {
    
    let next = null
    if(this.mCurrentPlayground === 1){
        next = new StartGame(this.mPlayer1GameCharacter,this.mPlayer2GameCharacter,this.mPlayer1Texture,this.mPlayer2Texture)
    }else if(this.mCurrentPlayground === 2){
        next = new StartGame2(this.mPlayer1GameCharacter,this.mPlayer2GameCharacter,this.mPlayer1Texture,this.mPlayer2Texture)
    }else{
        next = new StartGame3(this.mPlayer1GameCharacter,this.mPlayer2GameCharacter,this.mPlayer1Texture,this.mPlayer2Texture)
    }
   
    gEngine.Core.startScene(next)
}