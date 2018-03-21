/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

'use strict'  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    this.kMinionSprite = 'assets/minion_sprite.png'
    this.kPlatformTexture = 'assets/platform.png'
    this.kWallTexture = 'assets/wall.png'
    this.kTargetTexture = 'assets/target.png'
    
    // The camera to view the scene
    this.mCamera = null

    this.mMsg = null
    this.mShapeMsg = null

    this.mAllObjs = null
    this.mBounds = null
    this.mCollisionInfos = []
    this.mHero = null
    
    this.mNewBounds = null
    
    this.mCurrentObj = 0
    this.mTarget = null
}
gEngine.Core.inheritPrototype(MyGame, Scene)


MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite)
    gEngine.Textures.loadTexture(this.kPlatformTexture)
    gEngine.Textures.loadTexture(this.kWallTexture)
    gEngine.Textures.loadTexture(this.kTargetTexture)
            
}

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMinionSprite)
    gEngine.Textures.unloadTexture(this.kPlatformTexture)
    gEngine.Textures.unloadTexture(this.kWallTexture)
    gEngine.Textures.unloadTexture(this.kTargetTexture)
}

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    )
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1])
    //sets the background to gray
    
    this.mHero = new Hero(this.kMinionSprite)
    //this.mHero = new Player2(this.kTargetTexture)
    this.mAllObjs = new GameObjectSet()

    this.mNewBounds = new GameObjectSet()//creat a ref to wall and platform
    
    this.createBounds()
    this.mFirstObject = this.mAllObjs.size()
    this.mCurrentObj = this.mFirstObject
    
    this.mAllObjs.addToSet(this.mHero)
    var y = 70
    var x = 10
    for (var i = 1; i<=5; i++) {
        var m = new Minion(this.kMinionSprite, x, y, ((i%2)!==0))
        x += 20
        this.mAllObjs.addToSet(m)
    }

    this.mMsg = new FontRenderable('Status Message')
    this.mMsg.setColor([0, 0, 0, 1])
    this.mMsg.getXform().setPosition(5, 7)
    this.mMsg.setTextHeight(3)
    
    this.mShapeMsg = new FontRenderable('Shape')
    this.mShapeMsg.setColor([0, 0, 0, 1])
    this.mShapeMsg.getXform().setPosition(5, 73)
    this.mShapeMsg.setTextHeight(2.5)
}

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]) // clear to light gray

    this.mCamera.setupViewProjection()
    
    this.mNewBounds.draw(this.mCamera)
    this.mAllObjs.draw(this.mCamera)
   
    
    // for now draw these ...
    for (var i = 0; i<this.mCollisionInfos.length; i++) 
        this.mCollisionInfos[i].draw(this.mCamera)
    this.mCollisionInfos = []
    
    this.mTarget.draw(this.mCamera)
    this.mMsg.draw(this.mCamera)   // only draw status in the main camera
    this.mShapeMsg.draw(this.mCamera)
}

MyGame.prototype.increasShapeSize = function(obj, delta) {
    var s = obj.getRigidBody()
    var r = s.incShapeSizeBy(delta)
}

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.kBoundDelta = 0.1
MyGame.prototype.update = function () {
    var msg = ''   
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.P)) {
        gEngine.Physics.togglePositionalCorrection()
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.V)) {
        gEngine.Physics.toggleHasMotion()
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) {
        this.radomizeVelocity()
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Left)) {
        this.mCurrentObj -= 1
        if (this.mCurrentObj < this.mFirstObject)
            this.mCurrentObj = this.mAllObjs.size() - 1
    }            
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Right)) {
        this.mCurrentObj += 1
        if (this.mCurrentObj >= this.mAllObjs.size())
            this.mCurrentObj = this.mFirstObject
    }

    var obj = this.mAllObjs.getObjectAt(this.mCurrentObj)
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Y)) {
        this.increasShapeSize(obj, MyGame.kBoundDelta)
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.U)) {
        this.increasShapeSize(obj, -MyGame.kBoundDelta)
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.F)) {
        var x = 20 + Math.random() * 60
        var y = 75
        var m = new Minion(this.kMinionSprite, x, y, true)
        this.mAllObjs.addToSet(m)
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.G)) {
        var x = 20 + Math.random() * 60
        var y = 75
        var m = new Minion(this.kMinionSprite, x, y, false)
        this.mAllObjs.addToSet(m)
    }
        
    obj.keyControl()
    obj.getRigidBody().userSetsState()
    
    this.mAllObjs.update(this.mCamera)
    this.mNewBounds.update(this.mCamera)
    
    gEngine.Physics.processCollision(this.mAllObjs.concat(this.mNewBounds), this.mCollisionInfos)
    
    var p = obj.getXform().getPosition()
    this.mTarget.getXform().setPosition(p[0], p[1])
    msg += '  P(' + gEngine.Physics.getPositionalCorrection() + 
           ' ' + gEngine.Physics.getRelaxationCount() + ')' +
           ' V(' + gEngine.Physics.getHasMotion() + ')'
    this.mMsg.setText(msg)
    
    this.mShapeMsg.setText(obj.getRigidBody().getCurrentState())
}