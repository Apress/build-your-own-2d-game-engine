/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Control.eRowStatus = Object.freeze(
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
     
    ]
);

Control.eMessage = Object.freeze(
    [
        "Left  : Move left",
        "Right : Move right",
        "Space : Jump",
        "Shift : Speed up",
        "  Q   : Level Select"
        
    ]
);

function Control() {
    // The camera to view the scene
    this.kControl = "assets/control.jpg" ;
    
    this.mCamera = null;
    this.mMsg = null;
    
    this.mControl = null
    
}
gEngine.Core.inheritPrototype(Control, Scene);

Control.prototype.initialize = function () {
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        100,                        // width of camera
        [0, 0, 1000, 500],         // viewport (orgX, orgY, width, height)
        2
    );
    this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);
    
//    this.mControl = new TextureRenderable(this.kControl);
//    this.mControl.setColor([0, 0, 0, 0]);
//    this.mControl.getXform().setPosition(50, 65);
//    this.mControl.getXform().setSize(78, 60);
    
    this.mMsg = new FontRenderable("Level Select");
    this.mMsg.setColor([0.1, 0.1, 0.8, 1]);
    this.mMsg.getXform().setPosition(90, 20);
    this.mMsg.setTextHeight(3);
    


    
};

Control.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    
    
    
    for(var i = 0; i < 5; i++){
        this.mMsg.setText(Control.eMessage[i]);
        this.mMsg.getXform().setPosition(Control.eRowStatus[i].width, Control.eRowStatus[i].height);
        this.mMsg.setTextHeight(3);
        this.mMsg.draw(this.mCamera);
    }
    

    
    
    
    this.mMsg.setText("Back(Press Q)");
    this.mMsg.getXform().setPosition(70, 30);
    this.mMsg.setTextHeight(3);
    this.mMsg.draw(this.mCamera);
    
   
};
Control.prototype.update = function () {
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)){
        gEngine.GameLoop.stop();
    }
};

Control.prototype.loadScene = function () {
    //gEngine.Textures.loadTexture(this.kControl);
};

Control.prototype.unloadScene = function() {
    // Step B: starts the next level
    // starts the next level
    //gEngine.Textures.unloadTexture(this.kControl);
    
    var next;
    
    next = new StartScene;
    gEngine.Core.startScene(next);
  
};