/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


About.eRowStatus = Object.freeze(
    [
        {  width:15, 
           height:57 },
        {  width:15, 
           height:51 },
       {  width:25, 
           height:45 },
       {  width:3, 
           height:39 },
       {  width:35, 
           height:33 }
    ]
);

About.eMessage = Object.freeze(
    [
        "Team Member: Lijiankuan Liyueheng Hezitong Youxiangyu",
        "Normal map : http://cpetry.github.io/NormalMap-Online/",
        "Some imgs  : http://opengameart.org/",
        "http://images.my-addr.com/resize_png_online_tool-free_png_resizer_for_web.php",
        "Back(Press Q)"
        
    ]
);

About.eSelectStatus = Object.freeze({
    eLevel0:0,
    eLevel1:1,
    eLevel2:2,
    eLevel3:3
});


function About() {
    // The camera to view the scene
    this.kSuperCube = "assets/cube.png" ;
    
    this.mCamera = null;
    this.mMsg = null;
    
    this.mCube = null;
    
    this.mSelectCube = null;
    this.mSelectState = 0;
    this.back = false;
    
}
gEngine.Core.inheritPrototype(About, Scene);

About.prototype.initialize = function () {
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        100,                        // width of camera
        [0, 0, 1000, 500],         // viewport (orgX, orgY, width, height)
        2
    );
    this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);

    this.mMsg = new FontRenderable("Level Select");
    this.mMsg.setColor([0.1, 0.1, 0.8, 1]);
    this.mMsg.getXform().setPosition(15, 70);
    this.mMsg.setTextHeight(5);
    
    this.mCube = new TextureRenderable(this.kSuperCube);
    this.mCube.setColor([0, 0, 0, 0]);
    this.mCube.getXform().setPosition(50, 70);
    this.mCube.getXform().setSize(12, 10);
    
    this.mSelectCube = new TextureRenderable(this.kSuperCube);
    this.mSelectCube.setColor([0, 0, 0, 0]);
    this.mSelectCube.getXform().setPosition(About.eRowStatus[this.mSelectState].width-6, About.eRowStatus[this.mSelectState].height-0.5);
    this.mSelectCube.getXform().setSize(3, 2.5);
    
    
};

About.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    
    
    
    for(var i = 0; i < 5; i++){
        this.mMsg.setText(About.eMessage[i]);
        this.mMsg.getXform().setPosition(About.eRowStatus[i].width, About.eRowStatus[i].height);
        this.mMsg.setTextHeight(2);
        this.mMsg.draw(this.mCamera);
    }
    

    
    this.mMsg.setText("Level       Select");
    this.mMsg.getXform().setPosition(26, 70);
    this.mMsg.setTextHeight(5);
    this.mMsg.draw(this.mCamera);
    
    this.mCube.draw(this.mCamera);
    
    this.mSelectCube.getXform().setPosition(About.eRowStatus[this.mSelectState].width-6, About.eRowStatus[this.mSelectState].height-0.5);
    this.mSelectCube.draw(this.mCamera);
   
};
About.prototype.update = function () {
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)){
        this.back = true;
        gEngine.GameLoop.stop();
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)){
        this.mSelectState = (this.mSelectState-1+4)%4;
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)){
        this.mSelectState = (this.mSelectState+1)%4;
    }
    
    
};

About.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kSuperCube);
};

About.prototype.unloadScene = function() {
    // Step B: starts the next level
    // starts the next level
    gEngine.Textures.unloadTexture(this.kSuperCube);

    var next;
    next = new StartScene;

    gEngine.Core.startScene(next);
        
};