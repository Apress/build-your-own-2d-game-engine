/* global gEngine, Scene, vec2 */

function LevelSelector(){
    this.kUIButton = "assets/UI/button.png";
    this.kLevelOneSceneFile = "assets/levels/one.xml";
    this.kLevelTwoSceneFile = "assets/levels/two.xml";
    this.kLevelThreeSceneFile = "assets/levels/three.xml";
    this.kLevelBgClip = "assets/sounds/BgMusic.mp3";
    this.kCue = "assets/sounds/BlueLevel_cue.wav";
    
    this.mCurrentLevel = 2;
   
    // The camera to view the scene
    this.mCamera = null;
    this.mShapes = new GameObjectSet();
    this.mPlayer = this.mShapes.size();
    
    this.mMsg = null;
    
    this.mLvl1Button = null;
    this.mLvl2Button = null;
    this.mLvl3Button = null;
    this.mBackButton = null;
}

gEngine.Core.inheritPrototype(LevelSelector,Scene);

LevelSelector.prototype.loadScene = function(){
    gEngine.Textures.loadTexture(this.kUIButton);
};

LevelSelector.prototype.unloadScene = function(){
    gEngine.Textures.unloadTexture(this.kUIButton);
    
    var nextLevel = null;
    switch(this.mCurrentLevel) {
        case -1:
            nextLevel = new MyGame();
            break;
        case 1:
            nextLevel = new Level(this.kLevelOneSceneFile, this.kLevelBgClip,this.kCue);
            break;
        case 2:
            nextLevel = new Level(this.kLevelTwoSceneFile, this.kLevelBgClip,this.kCue);
            break;
        case 3:
        default:
            nextLevel = new Level(this.kLevelThreeSceneFile, this.kLevelBgClip,this.kCue);
    }
    gEngine.Core.startScene(nextLevel);
};

LevelSelector.prototype.initialize = function(){
    this.mCamera = new Camera(
        vec2.fromValues(50, 37.5),   // position of the camera
        100,                       // width of camera
        [0, 0, 1000, 750]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    var g = new Player();
    this.mShapes.addToSet(g);
    
    var l = new Renderable();
    l.setColor([0,.5,.5,1]);
    var xf2 = l.getXform();
    xf2.setSize(10,2.5);
    xf2.setPosition(50,20);
    var g2 = new GameObject(l);
    var r2 = new RigidRectangle(xf2,10,2.5);
    
    r2.setMass(0);
    g2.setRigidBody(r2);
    g2.toggleDrawRigidShape();
    this.mShapes.addToSet(g2);
    
    this.mMsg = new UIText("Select Level",[500,750],12,1,0,[0,0,0,1]);
    
    this.mLvl1Button = new UIButton(this.kUIButton,this.playLevel1,this,[200,480],
        [230,100],"Level 1",4,[1,1,1,1],[0,0,0,1]);
    this.mLvl2Button = new UIButton(this.kUIButton,this.playLevel2,this,[500,480],
        [230,100],"Level 2",4,[1,1,1,1],[0,0,0,1]);
    this.mLvl3Button = new UIButton(this.kUIButton,this.playLevel3,this,[800,480],
        [230,100],"Level 3",4,[1,1,1,1],[0,0,0,1]);
        
    this.mBackButton = new UIButton(this.kUIButton,this.back,this,[500,60],
        [150,100],"Back",4,[1,1,1,1],[0,0,0,1]);
};

LevelSelector.prototype.draw = function(){
     gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.mShapes.draw(this.mCamera);
    
    this.mMsg.draw(this.mCamera);
    
    this.mLvl1Button.draw(this.mCamera);
    this.mLvl2Button.draw(this.mCamera);
    this.mLvl3Button.draw(this.mCamera);
    this.mBackButton.draw(this.mCamera);
};

LevelSelector.prototype.update = function(){
    this.mShapes.update();
    var pl = this.mShapes.getObjectAt(0);
    //pl.checkFall();
    var o = this.mShapes.getObjectAt(1);
    var col = new CollisionInfo();
    var ot = o.getRigidBody();
    var status = pl.getRigidBody().collisionTest(ot,col);
    if(status){
        pl.setFall(false);
    }
    
    this.mLvl1Button.update();
    this.mLvl2Button.update();
    this.mLvl3Button.update();
    this.mBackButton.update();
    gEngine.Physics.processCollision(this.mShapes,[]);
};

LevelSelector.prototype.back = function(){
    this.mCurrentLevel = -1;
    gEngine.GameLoop.stop();
};

LevelSelector.prototype.playLevel1 = function(){
    this.mCurrentLevel = 1;
    gEngine.GameLoop.stop();
};

LevelSelector.prototype.playLevel2 = function(){
    this.mCurrentLevel = 2;
    gEngine.GameLoop.stop();
};

LevelSelector.prototype.playLevel3 = function(){
    this.mCurrentLevel = 3;
    gEngine.GameLoop.stop();
};