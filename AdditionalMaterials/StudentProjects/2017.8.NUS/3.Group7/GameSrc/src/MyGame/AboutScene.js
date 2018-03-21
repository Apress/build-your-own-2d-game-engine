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




function AboutScene() {

    
    this.mCamera = null
    this.mMsg = null
    this.mGithubMsg = null
    this.mGithubPic = null
    this.mReferenceMsg = null
    this.mQRTexture = 'assets/QR.png'
    this.mHintMsg = null
    
}
gEngine.Core.inheritPrototype(AboutScene, Scene)

AboutScene.prototype.initialize = function () {
    
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        1000,                        // width of camera
        [0, 0, 1000, 500],         // viewport (orgX, orgY, width, height)
        2
    )
    this.mCamera.setBackgroundColor([1, 1, 1, 1])

    this.mMsg = new FontRenderable('Member: ChenYiXiu XieJinChi ChenXinHao   ')
    this.mMsg.getXform().setPosition(-300, 200)
    this.mMsg.setTextHeight(20)

    this.mGithubMsg = new FontRenderable('Github: https://github.com/hhh111119/FuriousStrike')
    this.mGithubMsg.getXform().setPosition(-300,170)
    this.mGithubMsg.setTextHeight(20)

    this.mGithubPic = new SpriteRenderable('assets/QR.png')
    this.mGithubPic.getXform().setPosition(-258,70)
    this.mGithubPic.getXform().setSize(100,100)
   
    this.mReferenceMsg = new FontRenderable('Some resource source: wwww.ui.cn')
    this.mReferenceMsg.getXform().setPosition(-300,0)
    this.mReferenceMsg.setTextHeight(20)

    this.mHintMsg = new FontRenderable('<PRESS SPACE BAR BACK>')
    this.mHintMsg.getXform().setPosition(-300, -50)
    this.mHintMsg.setTextHeight(30)
  
    
    
}

AboutScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]) // clear to light gray
    
    this.mCamera.setupViewProjection()
    
    
    
  
    this.mMsg.draw(this.mCamera)
    this.mGithubMsg.draw(this.mCamera)
    this.mGithubPic.draw(this.mCamera)
    this.mReferenceMsg.draw(this.mCamera)
    this.mHintMsg.draw(this.mCamera)
    
    
    
   
    
}
AboutScene.prototype.update = function () {
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
        gEngine.GameLoop.stop()
    
    
}

AboutScene.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.mQRTexture)
}

AboutScene.prototype.unloadScene = function() {
    
    
    gEngine.Textures.unloadTexture(this.mQRTexture)
    let next = new StartScene()
    gEngine.Core.startScene(next)
}