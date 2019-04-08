/* global gEngine, Scene, vec2 */

function Instructions(){
    this.mMsg1 = null;
    this.mGhost = null;
    this.mPlayer = null;
    this.mOtherRenders = [];
    this.mSpikes = [];
    this.mCollectible=null;
    this.mCamera = null;
    this.mMsg2 = null;
    this.mMsg3 = null;
    this.mMsg4 = null;
    this.mMsg5= null;
    this.mMsg6 = null;
    this.mMsg7 = null;
    this.mMsg8 = null;
    this.mMsg9=null;
    this.mMsg10 = null;
    this.mPlatform = null;
    this.kUIButton = "assets/UI/button.png";
    this.kPlatformTexture = "assets/RigidShape/Wood.png";
    this.kSpikeTexture = "assets/spike.png";
    this.mButton1 = null;
    this.mButton2 = null;
    this.mButton3 = null;
    this.mButton4 = null;
    this.mPage = 1;
}

gEngine.Core.inheritPrototype(Instructions,Scene);

Instructions.prototype.loadScene = function(){
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kSpikeTexture);
};

Instructions.prototype.unloadScene = function(){
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
    gEngine.Textures.unloadTexture(this.kSpikeTexture);
    var nextLevel = new MyGame();
    gEngine.Core.startScene(nextLevel);
};

Instructions.prototype.initialize = function(){
    this.mCamera = new Camera(
        vec2.fromValues(50, 37.5),   // position of the camera
        100,                       // width of camera
        [0, 0, 1000, 750]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.5, 0.5, 1, 1]);
    this.mGhost = new Ghost();
    this.mGhost.setSpeed(0);
    this.mGhost.getXform().setPosition(15,68);
    this.mMsg1 = new UIText("This is the ghost, don't touch it!",[300,700],2.8,0,0,[0,0,0,1]);
    this.mPlayer= new Renderable();
    this.mPlayer.setColor([1,0,0,1]);
    this.mPlayer.getXform().setSize(5,5);
    this.mPlayer.getXform().setPosition(15,58);
    this.mOtherRenders[0] = new Renderable();
    this.mOtherRenders[0].setColor([1,1,1,1]);
    this.mOtherRenders[0].getXform().setSize(4,4);
    this.mOtherRenders[0].getXform().setPosition(15,58);
    this.mOtherRenders[1] = new Renderable();
    this.mOtherRenders[1].setColor([1,0,0,1]);
    this.mOtherRenders[1].getXform().setSize(3,3);
    this.mOtherRenders[1].getXform().setPosition(15,58);
    this.mOtherRenders[2]= new Renderable();
    this.mOtherRenders[2].setColor([1,1,1,1]);
    this.mOtherRenders[2].getXform().setSize(2,2);
    this.mOtherRenders[2].getXform().setPosition(15,58);
    this.mOtherRenders[3]= new Renderable();
    this.mOtherRenders[3].setColor([1,0,0,1]);
    this.mOtherRenders[3].getXform().setSize(1,1);
    this.mOtherRenders[3].getXform().setPosition(15,58);
    this.mMsg2 = new UIText("This is you! Don't bottom of the screen",[300,615],2.8,0,0,[0,0,0,1]);
    this.mMsg3 = new UIText("Don't touch the left of the screen either",[300,585],2.8,0,0,[0,0,0,1]);
    this.mPlatform= new LevelRenderable(this.kPlatformTexture);
    this.mPlatform.getXform().setSize(10,6);
    this.mPlatform.setColor([0.9,0.8,0.8,0]);
    this.mPlatform.getXform().setPosition(15,46);
    this.mMsg4 = new UIText("This is a platform! Jump on these!",[300,485],2.8,0,0,[0,0,0,1]);
    this.mSpikes[0]= new LevelRenderable(this.kSpikeTexture);
    this.mSpikes[1] = new LevelRenderable(this.kSpikeTexture);
    this.mSpikes[0].getXform().setSize(3,10);
    this.mSpikes[1].getXform().setSize(3,10);
    this.mSpikes[0].setColor([0.8,0.8,0.8,0]);
    this.mSpikes[1].setColor([0.8,0.8,0.8,0]);
    this.mSpikes[0].getXform().setPosition(14,30);
    this.mSpikes[1].getXform().setPosition(17,30);
    this.mSpikes[0].setType(2);
    this.mSpikes[1].setType(2);
    this.mMsg5 = new UIText("These are spikes! Avoid these!",[300,350],2.8,0,0,[0,0,0,1]);
    this.mButton1 = new UIButton(this.kUIButton,this.MAINMENU,this,[250,75],[250,100],"Back",8,[1,1,1,1],[0,0,0,1]);
    this.mButton2 = new UIButton(this.kUIButton,this.NEXTPAGE,this,[750,75],[250,100],"Next",8,[1,1,1,1],[0,0,0,1]);
    this.mButton3 = new UIButton(this.kUIButton,this.PREVPAGE,this,[250,75],[250,100],"Prev",8,[1,1,1,1],[0,0,0,1]);
    this.mButton4 = new UIButton(this.kUIButton,this.MAINMENU,this,[750,75],[250,100],"Exit",8,[1,1,1,1],[0,0,0,1]);
    this.mMsg6 = new UIText("Press A/D to move left and right",[100,650],4,0,0,[0,0,0,1]);
    this.mMsg7 = new UIText("Left Click to make a platform",[100,550],4,0,0,[0,0,0,1]);
    this.mMsg8 = new UIText("Press Space to jump",[100,450],4,0,0,[0,0,0,1]);
    this.mMsg9 = new UIText("Collect this to make more platforms!",[301,225],2.8,0,0,[0,0,0,1]);
    this.mCollectible= new Renderable();
    this.mCollectible.setColor([0.933,0.921,0.184,1]);
    this.mCollectible.getXform().setSize(2,2);
    this.mCollectible.getXform().setPosition(15,20);
    this.mMsg10 = new UIText("Press M to bring up the minimap",[100,350],4,0,0,[0,0,0,1]);
};

Instructions.prototype.draw = function(){
    gEngine.Core.clearCanvas([.9,.9,.9,1]);
    this.mCamera.setupViewProjection();
    if(this.mPage === 1){
    this.mGhost.draw(this.mCamera);
    this.mMsg1.draw(this.mCamera);
    this.mPlayer.draw(this.mCamera);
    this.mOtherRenders[0].draw(this.mCamera);
    this.mOtherRenders[1].draw(this.mCamera);
    this.mOtherRenders[2].draw(this.mCamera);
    this.mOtherRenders[3].draw(this.mCamera);
    this.mMsg2.draw(this.mCamera);
    this.mMsg3.draw(this.mCamera);
    this.mMsg4.draw(this.mCamera);
    this.mMsg5.draw(this.mCamera);
    this.mPlatform.draw(this.mCamera);
    this.mSpikes[0].draw(this.mCamera);
    this.mSpikes[1].draw(this.mCamera);
    this.mButton1.draw(this.mCamera);
    this.mButton2.draw(this.mCamera);
    this.mCollectible.draw(this.mCamera);
    this.mMsg9.draw(this.mCamera);
    }else{
        this.mMsg6.draw(this.mCamera);
        this.mMsg7.draw(this.mCamera);
        this.mMsg8.draw(this.mCamera);
        this.mButton3.draw(this.mCamera);
        this.mButton4.draw(this.mCamera);
        this.mMsg10.draw(this.mCamera);
    }
};

Instructions.prototype.update = function(){
    if(this.mPage===1){
        this.mButton1.update();
        this.mButton2.update();
        this.mGhost.update();
    }else{
        this.mButton3.update();
        this.mButton4.update();
    }
};

Instructions.prototype.MAINMENU = function(){
    gEngine.GameLoop.stop();
};

Instructions.prototype.NEXTPAGE = function(){
    this.mPage = 2;
};

Instructions.prototype.PREVPAGE = function(){
    this.mPage = 1;
};