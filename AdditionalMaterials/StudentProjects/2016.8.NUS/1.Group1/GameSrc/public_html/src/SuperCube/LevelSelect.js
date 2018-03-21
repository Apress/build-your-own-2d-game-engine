/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


LevelSelect.eRowStatus = Object.freeze(
    [
       {  width:30, 
           height:59 },
       {  width:30, 
           height:54 },
       {  width:30, 
           height:49 },
       {  width:30, 
           height:44 },
       {  width:30, 
           height:39 },
       {  width:30, 
           height:34 },
       {  width:30, 
           height:29 }
    ]
);

LevelSelect.eMessage = Object.freeze(
    [
        "Level 1: Hello, Cube",
        "Level 2: Sticky wall",
        "Level 3: Ladder to the hell",
        "Level 4: World of Gears",
        "Level 5: Travel to Space",
        "Level 6: World of Gears(dark night)",
        "Back(Press Q)"
    ]
);

LevelSelect.eSelectStatus = Object.freeze({
    eLevel1:0,
    eLevel2:1,
    eLevel3:2,
    eLevel4:3,
    eLevel5:4,
    eLevel6:5
    
});


function LevelSelect() {
    // The camera to view the scene
    this.kSuperCube = "assets/cube.png" ;
    
    this.mCamera = null;
    this.mMsg = null;
    
    this.mCube = null;
    
    this.mSelectCube = null;
    this.mSelectState = 0;
    this.back = false;
    
}
gEngine.Core.inheritPrototype(LevelSelect, Scene);

LevelSelect.prototype.initialize = function () {
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    gEngine.ResourceMap.store("Save", [0,0,0,0]);
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
    this.mSelectCube.getXform().setPosition(LevelSelect.eRowStatus[this.mSelectState].width-6, LevelSelect.eRowStatus[this.mSelectState].height-0.5);
    this.mSelectCube.getXform().setSize(3, 2.5);
    
    
};

LevelSelect.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    
    
    
    for(var i = 0; i < 7; i++){
        this.mMsg.setText(LevelSelect.eMessage[i]);
        this.mMsg.getXform().setPosition(LevelSelect.eRowStatus[i].width, LevelSelect.eRowStatus[i].height);
        this.mMsg.setTextHeight(3);
        this.mMsg.draw(this.mCamera);
    }
    
    this.mMsg.setText("Level       Select");
    this.mMsg.getXform().setPosition(26, 70);
    this.mMsg.setTextHeight(5);
    this.mMsg.draw(this.mCamera);
    
    this.mCube.draw(this.mCamera);
    
    this.mSelectCube.getXform().setPosition(LevelSelect.eRowStatus[this.mSelectState].width-6, LevelSelect.eRowStatus[this.mSelectState].height-0.5);
    this.mSelectCube.draw(this.mCamera);
   
};
LevelSelect.prototype.update = function () {
    
    // select which character to work with
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
        gEngine.GameLoop.stop();
    
    
    
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)){
        this.mSelectState = (this.mSelectState-1+6)%6;
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)){
        this.mSelectState = (this.mSelectState+1)%6;
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)){
        this.back = true;
        gEngine.GameLoop.stop();
    }
    
    
    
};

LevelSelect.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kSuperCube);
};

LevelSelect.prototype.unloadScene = function() {
    // Step B: starts the next level
    // starts the next level
    gEngine.Textures.unloadTexture(this.kSuperCube);
    
    var next;
    if(this.back){
        next = new StartScene;
    }
    else{
        if(this.mSelectState === LevelSelect.eSelectStatus.eLevel1)
            next = new Level0;  // next level to be loaded
        if(this.mSelectState === LevelSelect.eSelectStatus.eLevel2)
            next = new Level1;  // next level to be loaded
        if(this.mSelectState === LevelSelect.eSelectStatus.eLevel3)
            next = new Level2;  // next level to be loaded
        if(this.mSelectState === LevelSelect.eSelectStatus.eLevel4)
            next = new Level3;  // next level to be loaded
        if(this.mSelectState === LevelSelect.eSelectStatus.eLevel5)
            next = new Level4;  // next level to be loaded
        if(this.mSelectState === LevelSelect.eSelectStatus.eLevel6)
            next = new Level5;  // next level to be loaded
    }
    
    gEngine.Core.startScene(next);
    
    
};