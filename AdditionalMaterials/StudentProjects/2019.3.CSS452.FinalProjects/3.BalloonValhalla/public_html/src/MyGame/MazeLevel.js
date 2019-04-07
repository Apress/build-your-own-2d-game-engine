/*
 * File: MazeLevel.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable, Light,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MazeLevel(levelName) {
    this.kBalloonTex = "assets/balloon_lres.png";
    this.kBalloonNormalTex = "assets/balloon_normals.png";
    this.kSpikeTex = "assets/spike_lres.png";
    this.kGateTex = "assets/gate_sheet.png";
    this.kKeyTex = "assets/key.png";
    this.kSkyTex = "assets/sky.png";
    this.kMazeEdge = "assets/maze_edge.png";
    this.kMazeEdgeNormals = "assets/maze_edge_normals.png";
    this.kBalloonParticle = "assets/balloon_scrap.png";
    this.kUIButton = "assets/cloud.png";
    
    this.kLevelName = levelName;
    this.kMazePixels = "assets/Maze/" + levelName + "/maze_pixels.png";
    this.kMazeWalls = "assets/Maze/" + levelName + "/maze_clouds.png";
    this.kMazeNormals = "assets/Maze/" + levelName + "/maze_normals.png";
    
    this.kWinHeight = 120; // height balloons must reach to win
    
    // The camera to view the scene
    this.mLeftCamera = null;
    this.mRightCamera = null;
    this.mMapCamera = null;
    this.mUICamera = null;
    
    this.mLeftBalloon = null;
    this.mRightBalloon = null;
    
    this.mLabels = null;
    
    this.mSky = null;
    this.world = null;
    
    this.mValhallaLight = null;
    
    this.mTargetAngle = 0;
    this.mSmoothAngle = null;
    
    this.mNextState = "Lose";
    this.mEnding = false;
    this.mCountdown = 120;
    
    this.UIButtons = [];
    this.UIKeys = [];
    this.isPaused = false;
}
gEngine.Core.inheritPrototype(MazeLevel, Scene);


MazeLevel.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMazePixels);
    gEngine.Textures.loadTexture(this.kMazeWalls);
    gEngine.Textures.loadTexture(this.kMazeNormals);
    gEngine.Textures.loadTexture(this.kBalloonTex);
    gEngine.Textures.loadTexture(this.kBalloonNormalTex);
    gEngine.Textures.loadTexture(this.kSpikeTex);
    gEngine.Textures.loadTexture(this.kGateTex);
    gEngine.Textures.loadTexture(this.kKeyTex);
    gEngine.Textures.loadTexture(this.kSkyTex);
    gEngine.Textures.loadTexture(this.kMazeEdge);
    gEngine.Textures.loadTexture(this.kMazeEdgeNormals);
    gEngine.Textures.loadTexture(this.kBalloonParticle);
    gEngine.Textures.loadTexture(this.kUIButton);
};

MazeLevel.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBalloonTex);
    gEngine.Textures.unloadTexture(this.kBalloonNormalTex);
    gEngine.Textures.unloadTexture(this.kSpikeTex);
    gEngine.Textures.unloadTexture(this.kMazePixels);
    gEngine.Textures.unloadTexture(this.kMazeWalls);
    gEngine.Textures.unloadTexture(this.kGateTex);
    gEngine.Textures.unloadTexture(this.kKeyTex);
    gEngine.Textures.unloadTexture(this.kSkyTex);
    gEngine.Textures.unloadTexture(this.kMazeNormals);
    gEngine.Textures.unloadTexture(this.kMazeEdge);
    gEngine.Textures.unloadTexture(this.kMazeEdgeNormals);
    gEngine.Textures.unloadTexture(this.kBalloonParticle);
    gEngine.Textures.unloadTexture(this.kUIButton);
    
    if (this.mNextState === "Win") {
        gEngine.Core.startScene(new WinScreen(this.kLevelName));
    }
    else if (this.mNextState === "Lose") {
        gEngine.Core.startScene(new LoseScreen(this.kLevelName));
    }
    else if (this.mNextState === "Restart") {
        gEngine.Core.startScene(new MazeLevel(this.kLevelName));
    }
    else {
        gEngine.Core.startScene(new LevelSelect());
    }
};

MazeLevel.prototype.initialize = function () {
    
    if (!gEngine.ResourceMap.isAssetLoaded(this.kMazePixels) ||
        !gEngine.ResourceMap.isAssetLoaded(this.kMazeWalls) ||
        !gEngine.ResourceMap.isAssetLoaded(this.kMazeNormals)) {
        console.log("Failed to load level");
        gEngine.GameLoop.stop();
    }
    
    // Step A: set up the cameras
    this.mLeftCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        50,                     // width of camera
        [0, 0, 396, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mLeftCamera.setBackgroundColor([1, 0.8, 0.8, 1]);
    
    this.mRightCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        50,                     // width of camera
        [404, 0, 396, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mRightCamera.setBackgroundColor([0.8, 1, 0.8, 1]);
    
    this.mMapCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        150,                     // width of camera
        [150, 50, 450, 500]         // viewport (orgX, orgY, width, height)
    );
    this.mMapCamera.setBackgroundColor([0.8, 0.8, 1, 1]);
    
    this.mUICamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mUICamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    this.mSmoothAngle = new Interpolate(0, 60, 0.1);
    
    // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    this.world = new Maze(this.kMazePixels, this.kMazeWalls, this.kMazeEdge, this.kMazeNormals, this.kMazeEdgeNormals, this.kSpikeTex, this.kGateTex, this.kKeyTex, 0,0,100,100,.3,.7,true); 
    
    this.mLeftBalloon = new Balloon(this.kBalloonTex, this.kBalloonNormalTex, -30, -40);
    this.mLeftBalloon.getRenderable().setColor([1,0,0,0.5]);
    this.mLeftBalloon.setUpVector(this.mLeftCamera.getUpVector());
    this.world.mShapes.addToSet(this.mLeftBalloon);
    
    this.mRightBalloon = new Balloon(this.kBalloonTex, this.kBalloonNormalTex, 30, -40);
    this.mRightBalloon.getRenderable().setColor([0,1,0,0.5]);
    this.mRightBalloon.setUpVector(this.mRightCamera.getUpVector());
    this.world.mShapes.addToSet(this.mRightBalloon);
    
    this.mSky = new ScrollRenderable(this.kSkyTex, 0.02);
    this.mSky.getXform().setPosition(0, 0);
    this.mSky.getXform().setSize(600, 300);
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    this.mValhallaLight = new Light();
    this.mValhallaLight.setLightType(Light.eLightType.eDirectionalLight);
    this.mValhallaLight.set2DPosition([0, 90]);
    this.mValhallaLight.setDirection([0, -1, 0]);
    this.mValhallaLight.setColor([1, 1, 0, 2]);
    
    this.world.addLight(this.mValhallaLight);
    this.mLeftBalloon.addLight(this.mValhallaLight);
    this.mRightBalloon.addLight(this.mValhallaLight);
    
    this.mLabels = new GameObjectSet();
    
    this.UIButtons.push(new UIButton(this.kUIButton,this.resume,this,[400,400],[600,100],"Resume",8,[1,1,1,1],[0,0,0,1]));
    this.UIButtons.push(new UIButton(this.kUIButton,this.back,this,[400,300],[600,100],"Level Select",8,[1,1,1,1],[0,0,0,1]));
    this.UIButtons.push(new UIButton(this.kUIButton,this.restart,this,[400,200],[600,100],"Restart",8,[1,1,1,1],[0,0,0,1]));
};

MazeLevel.prototype.addLabel = function(text, color, x, y, h) {
    var m = new FontRenderable(text);
    m.setColor(color);
    m.getXform().setPosition(x, y);
    m.setTextHeight(h);
    this.mLabels.addToSet(m);
};

MazeLevel.prototype.drawView = function(aCamera) {
    aCamera.setupViewProjection();
    this.mSky.draw(aCamera);
    this.world.draw(aCamera);
    this.mLabels.draw(aCamera);
};

MazeLevel.prototype.drawUI = function() {
    this.mUICamera.setupViewProjection();
    this.mSky.draw(this.mUICamera);
    for (var i in this.UIButtons)
        this.UIButtons[i].draw(this.mUICamera);
};

MazeLevel.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    // Draw the left/right views
    this.drawView(this.mLeftCamera);
    this.drawView(this.mRightCamera);
    
    // Draw the map if 'M' is pressed
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.M))
        this.drawView(this.mMapCamera);
    
    if (this.isPaused)
        this.drawUI();
};

MazeLevel.prototype.updateCameras = function () {
    var worldHeight = this.mSky.getXform().getHeight();
    function followBalloon(cam, balloon, angle) {
        cam.update();
        cam.setRotation(angle);
        var worldLimit = worldHeight / 3;
        var camLimit = cam.getWCWidth() / 2;
        cam.getWCCenter()[0] = Math.max(-worldLimit + cam.getWCWidth() / 2, 
                                Math.min(worldLimit - cam.getWCWidth() / 2,
                                balloon.getXform().getXPos()));
        cam.getWCCenter()[1] = Math.max(-worldLimit + cam.getWCHeight() / 2, 
                                Math.min(worldLimit - cam.getWCHeight() / 2,
                                balloon.getXform().getYPos()));
    }
    var angle = this.mSmoothAngle.getValue();
    if (!this.mLeftBalloon.isWin || this.mRightBalloon.isWin)
        followBalloon(this.mLeftCamera, this.mLeftBalloon, angle);
    if (!this.mRightBalloon.isWin || this.mLeftBalloon.isWin)
        followBalloon(this.mRightCamera, this.mRightBalloon, angle);
    this.mMapCamera.setRotation(angle);
    this.mMapCamera.update();
    
    var up = this.mLeftCamera.getUpVector();
    var down = [-up[0], -up[1], 0];
    this.mValhallaLight.setDirection(down);
};

MazeLevel.prototype.popBalloon = function (balloon) {
    this.mNextState = "Lose";
    this.mSky.setColor([1, 0, 0, 0.4]);
    balloon.setVisibility(false);
    var x = balloon.getXform().getXPos();
    var y = balloon.getXform().getYPos();
    for (var i = 0; i < 40; ++i) {
        var p = this.world.createParticle(x + 3.0 * (Math.random() - 0.5), 
                                          y + 3.0 * (Math.random() - 0.5), 
                                          this.kBalloonParticle);
        p.getRenderable().setColor(balloon.getRenderable().getColor());
        
        var up = this.mLeftCamera.getUpVector();
        var grav = [-up[0], -up[1], up[2]];
        vec2.scale(grav, grav, 20);
        p.getParticle().mAcceleration = grav;
        
        this.world.mPset.addToSet(p);
    }
    this.mEnding = true;
};

MazeLevel.prototype.win = function () {
    this.mNextState = "Win";
    this.mEnding = true;
};

MazeLevel.prototype.back = function () {
    this.mNextState = null;
    gEngine.GameLoop.stop();
};

MazeLevel.prototype.restart = function () {
    console.log("Restarting level " + this.kLevelName);
    this.mNextState = "Restart";
    gEngine.GameLoop.stop();
};

MazeLevel.prototype.resume = function () {
    this.isPaused = false;
};

MazeLevel.prototype.update = function () {
        
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Escape))
        this.isPaused = !this.isPaused;
    
    if (!this.isPaused) {
        if (this.mEnding && this.mCountdown-- <= 0) {
            gEngine.GameLoop.stop();
        }

        // Rotation controls
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Left)) {
            this.mTargetAngle += Math.PI / 4;
            this.mSmoothAngle.setFinalValue(this.mTargetAngle);
        }
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Right)) {
            this.mTargetAngle -= Math.PI / 4;
            this.mSmoothAngle.setFinalValue(this.mTargetAngle);
        }
        this.mSmoothAngle.updateInterpolation();

        // Update gameobjects
        this.world.update();

        if (!this.mEnding) {
            // Test for collisions between balloons and spikes
            var wcCoord = [0,0];
            if (this.world.testHazards(this.mLeftBalloon, wcCoord))
                this.popBalloon(this.mLeftBalloon);
            if (this.world.testHazards(this.mRightBalloon, wcCoord))
                this.popBalloon(this.mRightBalloon);

            var openedGate = this.world.bumpIntoGates(this.mLeftBalloon);
            openedGate = this.world.bumpIntoGates(this.mRightBalloon) || openedGate;
            if (openedGate) {
                // shake the camera after opening a gate
                var x = 0.5, y = 0.5, freq = 0.25, dur = 60;
                this.mLeftCamera.shake(x, y, freq, dur);
                this.mRightCamera.shake(x, y, freq, dur);
                this.mMapCamera.shake(x, y, freq, dur);
            };

            this.world.pickupKeys(this.mLeftBalloon);
            this.world.pickupKeys(this.mRightBalloon);

            // Test balloon heights for win condition
            var up = this.mLeftCamera.getUpVector();
            var offset = [0,0];
            vec2.subtract(offset, this.mLeftBalloon.getXform().getPosition(), this.world.pos);
            var leftHeight = vec2.dot(offset, up);
            vec2.subtract(offset, this.mRightBalloon.getXform().getPosition(), this.world.pos);
            var rightHeight = vec2.dot(offset, up);
            if (leftHeight > this.kWinHeight) {
                this.world.mShapes.removeFromSet(this.mLeftBalloon);
                this.mLeftBalloon.isWin = true;
            }
            if (rightHeight > this.kWinHeight) {
                this.world.mShapes.removeFromSet(this.mRightBalloon);
                this.mRightBalloon.isWin = true;
            }
            if (this.mLeftBalloon.isWin && this.mRightBalloon.isWin)
                this.win();

            this.mSky.update();
        }
    } else {
        // if isPaused
        for (var i in this.UIButtons)
            this.UIButtons[i].update();
    }
    // Move cameras
    this.updateCameras();
    this.mSky.getXform().setRotationInRad(this.mSmoothAngle.getValue());
};
