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
const SceneState = {
    'StartGame' : 1,
    'AboutUs'   : 2
}



function StartScene() {

    
    this.mCamera = null
    this.mMsg = null
    //this.mMsg1 = null
    this.mSceneState = SceneState.StartGame
    
    this.mMsg1 = null
    this.mMsg2 = null

    this.mMsg3 = null

    this.mBackground = null
    this.mBackgroundTexture='assets/FirstBackground.png'

    
}
gEngine.Core.inheritPrototype(StartScene, Scene)

StartScene.prototype.initialize = function () {
    // gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1])
    // gEngine.ResourceMap.store('Save', [0,0,0,0])
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        100,                        // width of camera
        [0, 0, 1000, 500],         // viewport (orgX, orgY, width, height)
        2
    )
    this.mCamera.setBackgroundColor([1, 1, 1, 1])

    this.mMsg = new FontRenderable('FURIOUS STRIKE ')
    this.mMsg.getXform().setPosition(30, 49)
    this.mMsg.setTextHeight(4)
     
    this.mMsg1 = new FontRenderable('Start Game ')
    this.mMsg1.getXform().setPosition(32, 38)
    this.mMsg1.setTextHeight(4)

    this.mMsg2 = new FontRenderable('About us ')
    this.mMsg2.getXform().setPosition(32, 32)
    this.mMsg2.setTextHeight(2)
    

    this.mMsg3 = new FontRenderable('<PRESS: SPACE BAR  CONTROL:ARROW KEY> ')
    this.mMsg3.getXform().setPosition(26, 27)
    this.mMsg3.setTextHeight(2)

    this.mBackground = new SpriteRenderable(this.mBackgroundTexture)
    this.mBackground.getXform().setPosition(50,50)
    this.mBackground.getXform().setSize(100,50)
    
    
}

StartScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]) // clear to light gray
    
    this.mCamera.setupViewProjection()
    
    
    this.mBackground.draw(this.mCamera)
  
    this.mMsg.draw(this.mCamera)
    
    /* this.mMsg1 = new FontRenderable('Press <Space Bar> to begin')
    this.mMsg1.getXform().setPosition(14, 30)
    this.mMsg1.setTextHeight(5) */

    this.mMsg1.draw(this.mCamera)
    this.mMsg2.draw(this.mCamera)
    this.mMsg3.draw(this.mCamera)
    
   
    
    
    
    
    

  
  
   
}
StartScene.prototype.update = function () {
    
    // select which character to work with
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
        gEngine.GameLoop.stop()
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)){
        if(this.mSceneState === SceneState.StartGame){
            //this.mMsg1.getXform().setPosition(26, 40)
            this.mMsg1.setTextHeight(2)
            //this.mMsg2.getXform().setPosition(26, 30)
            this.mMsg2.setTextHeight(4)
            this.mSceneState = SceneState.AboutUs
        }else if(this.mSceneState === SceneState.AboutUs){
             
            this.mMsg1.setTextHeight(4)
            
            this.mMsg2.setTextHeight(2)
            this.mSceneState = SceneState.StartGame
        }
    }
    

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)){
        if(this.mSceneState === SceneState.StartGame){
            //this.mMsg1.getXform().setPosition(26, 40)
            this.mMsg1.setTextHeight(2)
            //this.mMsg2.getXform().setPosition(26, 30)
            this.mMsg2.setTextHeight(4)
            this.mSceneState = SceneState.AboutUs
        }else if(this.mSceneState === SceneState.AboutUs){
             
            this.mMsg1.setTextHeight(4)
            
            this.mMsg2.setTextHeight(2)
            this.mSceneState = SceneState.StartGame
        }
    }
    
    
    
}

StartScene.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.mBackgroundTexture)
}

StartScene.prototype.unloadScene = function() {
    gEngine.Textures.unloadTexture(this.mBackgroundTexture)
    let next = null
    if(this.mSceneState === SceneState.StartGame)
        next = new RuleScene()
    else
        next = new AboutScene()
    gEngine.Core.startScene(next)
}