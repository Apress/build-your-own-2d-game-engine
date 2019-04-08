/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
 FontRenderable, SpriteRenderable, LineRenderable,
 GameObject, Block */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Puzzle() {
    this.kUIButton = "assets/UI/button.png";
    this.BgClip = "assets/Sounds/InfinitePath.mp3";
    this.kBg = "assets/UI/bg.png";
    this.bingo0 = "assets/RigidShape/Bingo/BallBlank.png";
    this.bingo1 = "assets/RigidShape/Bingo/BallBlank.png";
    this.bingo2 = "assets/RigidShape/Bingo/Ball-L.png";
    this.bingo3 = "assets/RigidShape/Bingo/Ball-T.png";
    this.bingo4 = "assets/RigidShape/Bingo/Ball-Sq.png";
    this.bingo5 = "assets/RigidShape/Bingo/Ball-Z.png";
    this.bingo6 = "assets/RigidShape/Bingo/Ball-I.png";
    this.bingo7 = "assets/RigidShape/Bingo/Ball-BackL.png";
    this.bingo8 = "assets/RigidShape/Bingo/BallBlank.png";
    this.bingo9 = "assets/RigidShape/Bingo/Ball-S.png";
    this.light = null;
    // The camera to view the scene
    this.backgroundsqr = null;
    this.mCamera = null;
    this.mNextBlocksCamera = null;
    this.score = 0;
    this.UIText = null;
    this.leftBlockInstructions = null;
    this.rightBlockInstructions = null;
    //this.BgColor = BgColor;
    
    this.border = new Border();
    this.blockSize = 5;

    this.numberOfGridX = ((this.border.right) - this.border.left) / this.blockSize;
    this.numberOfGridY = ((this.border.top + 2 * this.blockSize) - this.border.bottom) / this.blockSize;
    this.lightObject = null;
    this.leftSpawnPoint = 3;
    this.rightSpawnPoint = 13;
    this.checkMiddle = false;
    this.timer = 0;
    this.allblocks = [];
    this.properPosition = [];
    this.properPosition2 = [];
    this.nextLeftBlock = null;
    this.nextRightBlock = null;
    this.testBlock = null;
    this.testBlock2 = null;
    this.allowRSpeed = true;
    this.allowLSpeed = true;
    this.paused = false;
    this.detector = new Renderable();
    this.detector.setColor([1, 0, 0, 1]);
    this.detectorObject = new GameObject(this.detector);
    this.detectorObject.getXform().setSize(this.blockSize, this.blockSize);
    this.detectorObject.getXform().setPosition(this.border.getLeft() + (this.blockSize) / 2, this.border.getTop() - (this.blockSize) / 2);
    this.occupied = [];
    this.fixedTimer = null;
    this.startTimer = null;
    this.particleTimer = [];
    this.oldStateTimer = null;
    this.delaySeconds = gEngine.GameLoop.getSpeed();
    //xDelta, yDelta, shakeFrequency, shakeDuration
    this.xDelta = 0;
    this.yDelta = 0.3;
    this.shakeFrequency = 0.001;
    this.shakeDuration = 360;
    this.shakeEngine = new ShakePosition(this.xDelta, this.yDelta, this.shakeFrequency, this.shakeDuration);
    this.shakeEngine.stopShake();
    this.shakeEngine2 = new ShakePosition(this.xDelta,this.yDelta, this.shakeFrequency, this.shakeDuration);
    this.shakeEngine2.stopShake();
    this.mFire = [];
    this.renderFire = false;
    this.physics1 = null;
    this.physics2 = null;
    this.nextScene = null;
    this.scoreCamera = null;
    this.ballL = null;
    this.ballR = null;
    this.coll = null;
    this.mShapes = null;
};
gEngine.Core.inheritPrototype(Puzzle, Scene);

Puzzle.prototype.getRandomBlock = function (posX, posY, sizeOfBlock) {
    var blocks = [
        new Block2(posX, posY, sizeOfBlock),
        new Block3(posX, posY, sizeOfBlock),
        new Block4(posX, posY, sizeOfBlock),
        new Block5(posX, posY, sizeOfBlock),
        new Block6(posX, posY, sizeOfBlock),
        new Block7(posX, posY, sizeOfBlock),
        new Block9(posX, posY, sizeOfBlock)];
    var rand = Math.round((Math.random() * (blocks.length - 1)));
    //return blocks[2];
    var bl = blocks[rand];
    bl.updateBlock();
    bl.setID(rand);
    return bl;
};


Puzzle.prototype.detectedSomething = function () {
    var table = new Object();

    for (var i = 0; i < this.occupied.length; i += 2) {
        var temp = [this.occupied[i], this.occupied[i + 1]];
        if (table.hasOwnProperty(temp[1])) {
            table[temp[1]] += 1;
            if (table[temp[1]] === this.numberOfGridX) {
                for (var j = 0; j < this.allblocks.length; j++) {
                    this.checkMiddle = true;
                    if(this.allblocks[j].deleteRowAtPosition(temp[1]))
                        this.score += 50;
                }
                for (var j = 0; j < this.allblocks.length; j++) {
                    var split = this.allblocks[j].splitFix();
                    if (split !== null) {
                        //console.log("Split successful");
                        this.allblocks.push(split);
                    }
                }
                this.enableFire(temp[1]);
            }
        } else {
            table[temp[1]] = 1;
        }
    }
    return table;
};

Puzzle.prototype.spawnHelper = function (posX, posY, spawnPoint) {
    var nextBlock = null;
    if (spawnPoint === this.leftSpawnPoint) {
        if (!this.nextLeftBlock) {
            this.nextLeftBlock = this.getRandomBlock(posX, posY, this.blockSize);
        }
        nextBlock = this.nextLeftBlock;
        this.nextLeftBlock = this.getRandomBlock(posX, posY, this.blockSize);
        //var block1 = this.nextLeftBlock.getAllBlocks()[0];
        //this.physics1 = new RigidRectangle(block1.getXform(), this.blockSize, this.blockSize);
        
        //this.createBall(posX, posY, this.blockSize, 0);
        this.createBall(50, 40, this.blockSize * 3, 0, this.nextLeftBlock.getID());
   
    } else {
        if (!this.nextRightBlock) {
            this.nextRightBlock = this.getRandomBlock(posX, posY, this.blockSize);
        }
        nextBlock = this.nextRightBlock;
        this.nextRightBlock = this.getRandomBlock(posX, posY, this.blockSize);
        //var block1 = this.nextRightBlock.getAllBlocks()[0];
        //this.physics2 = new RigidRectangle(block1.getXform(), this.blockSize, this.blockSize);
        
        //this.createBall(posX, posY, this.blockSize, 1);
          this.createBall(50, 40, this.blockSize * 3, 1, this.nextRightBlock.getID());
   
    
    }
    return nextBlock;
};

Puzzle.prototype.spawn = function (gridCellX) {
    if (gridCellX < this.numberOfGridX) {
        var posX = this.border.left + (this.blockSize / 2);
        var posY = this.border.top + 2 * this.blockSize;
        for (var i = 0; i < gridCellX; i++) {
            posX += this.blockSize;
        }
        
       
        
        var result = this.spawnHelper(posX, posY, gridCellX);
        
         if(gridCellX === this.leftSpawnPoint){
            
        this.ballL.setPosition(posX + this.blockSize, posY);
        }
        else{
            
        this.ballR.setPosition(posX + this.blockSize,posY);
            
        }
        
        if (gridCellX === this.leftSpawnPoint && this.properPosition.length > 0) {
            this.properPosition[0] = posX;
            this.properPosition[1] = posY;
        } else if (this.properPosition2.length > 0) {
            this.properPosition2[0] = posX;
            this.properPosition2[1] = posY;
        }
        this.allblocks.push(result);
        return result;
    }
};


Puzzle.prototype.updateMoves = function () {
    this.occupied = [];
    for (var i = 0; i < this.allblocks.length; i++) {
        var temp = this.allblocks[i].getAllBlocks();
        if(temp !== null) {
            for (var j = 0; j < temp.length; j++) {
                this.occupied.push(temp[j].getXform().getPosition()[0]);
                this.occupied.push(temp[j].getXform().getPosition()[1]);
            }
        }
    }
    
    //gUpdateScore(this.score);
};

Puzzle.prototype.approximate = function (inputVector, inputVector2) {
    var temp = Math.pow(Math.abs((inputVector[0] - inputVector2[0])), 2);
    var temp2 = Math.pow(Math.abs((inputVector[1] - inputVector2[1])), 2);
    Math.sqrt(temp + temp2);
};


Puzzle.prototype.loadScene = function () {
    gEngine.AudioClips.loadAudio(this.BgClip);
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.bingo0);
    gEngine.Textures.loadTexture(this.bingo1);
    gEngine.Textures.loadTexture(this.bingo2);
    gEngine.Textures.loadTexture(this.bingo3);
    gEngine.Textures.loadTexture(this.bingo4);
    gEngine.Textures.loadTexture(this.bingo5);
    gEngine.Textures.loadTexture(this.bingo6);
    gEngine.Textures.loadTexture(this.bingo7);
    gEngine.Textures.loadTexture(this.bingo8);
    gEngine.Textures.loadTexture(this.bingo9);
    gEngine.Textures.loadTexture(this.kBg);
};

Puzzle.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.bingo0);
    gEngine.Textures.unloadTexture(this.bingo1);
    gEngine.Textures.unloadTexture(this.bingo2);
    gEngine.Textures.unloadTexture(this.bingo3);
    gEngine.Textures.unloadTexture(this.bingo4);
    gEngine.Textures.unloadTexture(this.bingo5);
    gEngine.Textures.unloadTexture(this.bingo6);
    gEngine.Textures.unloadTexture(this.bingo7);
    gEngine.Textures.unloadTexture(this.bingo8);
    gEngine.Textures.unloadTexture(this.bingo9);
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.BgClip);
    gEngine.Core.startScene(this.nextScene);
};

Puzzle.prototype.initialize = function () {    
    //play background music
    gEngine.AudioClips.playBackgroundAudio(this.BgClip);
    //function UIText(text, position, size, hAlign, vAlign, color) 
    this.leftBlockInstructions = new UIText("Lit Block: W(Rotate), A, S, D", [1, 50], 2, 0, 0, [0.3, 0.3, 0.6, 1]);
    this.rightBlockInstructions = new UIText("Unlit Block: Up(Rotate), Left, Down, Right", [590, 50], 2, 0, 0, [0.3, 0.3, 0.6, 1]);
    this.backgroundsqr = new Renderable();
    this.backgroundsqr.setColor([0.098, 0.45, 0.82, 1]);
    this.backgroundsqr.getXform().setPosition(50, 41.25);
    this.backgroundsqr.getXform().setSize(90, 67.25);
    
    
    this.light = new Light();
    this.light.setRadius(10);
    this.light.setZPos(2);
    this.light.setXPos(50);
    this.light.setYPos(40);
    this.light.setColor([1, 1, 1, 1]);
    
   
    // the Background
    var lightRenderer = new LightRenderable(this.kBg);
    lightRenderer.setElementPixelPositions(0, 1024, 0, 765);
    lightRenderer.getXform().setSize(90, 67.25);
    lightRenderer.getXform().setPosition(50, 41.25);
    lightRenderer.addLight(this.light);
    this.lightObject = new GameObject(lightRenderer);
    
    //this.lightRenderer = new LightRenderable(this.light);
    
    
    // Step A: set up the cameras
    this.mCamera = new Camera(
            vec2.fromValues(50, 40), // position of the camera
            100, // width of camera
            [0, 0, 1200, 900]         // viewport (orgX, orgY, width, height)
            );
    //this.mCamera.setBackgroundColor([0.5, 0.5, 0.4, 1]);
    //this.mCamera.setBackgroundColor(this.BgColor);
    
    this.mNextBlocksCamera = new Camera(
            vec2.fromValues(50, 40),
            80,
            [1237.5, 652.5, 225, 225]
            );
    this.mNextBlocksCamera.setBackgroundColor(0.8, 0.8, 0.8, 1);
    // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.scoreCamera = new Camera(
            vec2.fromValues(60,40),
            80,
            [1237.5, 100, 225, 225]
            );
    
    this.scoreCamera.setBackgroundColor([0.9,0.9,0.9,1]);
    
    //text, position, size, hAlign, vAlign, color
    this.UIText = new UIText("Score: ",[0,150],10,0,0,[0,0,0,1]);

    this.startTimer = Date.now();
    this.fixedTimer = 0;
    this.oldStateTimer = 0;
    this.inputTimer = 0;
    this.inputStartTimer = 0;
    this.testBlock = this.spawn(this.leftSpawnPoint);
    this.testBlock2 = this.spawn(this.rightSpawnPoint);
    this.properPosition.push(this.testBlock.getPositionX());
    this.properPosition.push(this.testBlock.getPositionY());
    this.properPosition2.push(this.testBlock2.getPositionX());
    this.properPosition2.push(this.testBlock2.getPositionY());
    this.platformAt(0, 0, 1000, 0, 0.6, 0.5, this.kBg);
    //alert("Input: " + "\n" + "A/D Move Left Block" + "\n" + "W Rotate Left Block" + "\n" + "S Place Left Block" + "\n" + "Left/Right Move Right Block" + "\n" + "Up Rotate Right Block" + "\n" + "Down Place Right Block");
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Puzzle.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.mCamera.setupViewProjection();
    this.leftBlockInstructions.draw(this.mCamera);
    this.rightBlockInstructions.draw(this.mCamera);
    this.border.draw(this.mCamera);
    
    
    this.backgroundsqr.draw(this.mCamera);
    this.lightObject.draw(this.mCamera);
    
    
    
    for (var i = 0; i < this.allblocks.length; i++) {
        this.allblocks[i].draw(this.mCamera);
    }

    //this.border.draw(this.mNextBlocksCamera);

    if (this.renderFire) {
        for(var i = 0; i < this.mFire.length; i++) {
            this.mFire[i].draw(this.mCamera);
        }
    }

    

    this.mNextBlocksCamera.setupViewProjection();
    
    /*if (this.nextLeftBlock) {
        this.nextLeftBlock.draw(this.mNextBlocksCamera);
    }
    if (this.nextRightBlock) {
        this.nextRightBlock.draw(this.mNextBlocksCamera);
    }*/
    if(this.mShapes)
        this.mShapes.draw(this.mNextBlocksCamera);

      
    this.scoreCamera.setupViewProjection();
    
    this.UIText.draw(this.scoreCamera);
  
    
    
};

Puzzle.prototype.createBall = function(x,y,size,side,texID){
    /*var blocks = [
    new Block2(posX, posY, sizeOfBlock),
    new Block3(posX, posY, sizeOfBlock),
    new Block4(posX, posY, sizeOfBlock),
    new Block5(posX, posY, sizeOfBlock),
    new Block6(posX, posY, sizeOfBlock),
    new Block7(posX, posY, sizeOfBlock),
    new Block9(posX, posY, sizeOfBlock)];*/
    var tex = this.bingo0;
    if(texID === 0) {
        tex = this.bingo2;
    } else if (texID === 1) {
        tex = this.bingo3;
    } else if (texID === 2) {
        tex = this.bingo4;
    } else if (texID === 3) {
        tex = this.bingo5;
    } else if (texID === 4) {
        tex = this.bingo6;
    } else if (texID === 5) {
        tex = this.bingo7;
    } else if (texID === 6) {
        tex = this.bingo9;
    }
    var m = new Minion(tex, x, y, 1, size);
    m.getRigidBody().setRestitution(.7);
    m.getRigidBody().setFriction(.6);
    
    m.toggleDrawRenderable();
    m.toggleDrawRigidShape();
    if(side === 0) {
        this.ballL = m;
    }
    else {
        this.ballR = m;
    }
};

Puzzle.prototype.platformAt = function (x, y, w, rot, res, frct, art) {
    var h = 3;
    var p = new TextureRenderable(art);
    var xf = p.getXform();
    xf.setSize(w, h);
    xf.setPosition(x, y);
    var g = new GameObject(p);
    var r = new RigidRectangle(xf, w, h);
    g.setRigidBody(r);
    g.toggleDrawRigidShape();
    
    r.setMass(0);
    r.setRestitution(res);
    r.setFriction(frct);
    xf.setSize(w, h);
    xf.setPosition(x, y);
    xf.setRotationInDegree(rot);
    this.coll = g;
};

Puzzle.prototype.enableFire = function () {
    this.mFire.push(new Fire(50, 10, 45, 40, 20, 0, 12, 4, 23, 8, 5, 0));
    this.particleTimer.push(2);
    this.renderFire = true;
};

Puzzle.prototype.enableFire = function (yPos) {
    this.mFire.push(new Fire(50, yPos, 45, 40, 20, 0, 12, 4, 23, 8, 5, 0));
    this.particleTimer.push(2);
    this.renderFire = true;
};
Puzzle.prototype.disableFire = function () {
    if(this.mFire.length > 0) {
        this.mFire.splice(0, 1);
        this.particleTimer.splice(0, 1);
    }
    if(this.mFire.length === 0) {
        this.renderFire = false;
    }
};

Puzzle.prototype.goRight = function (blockInput) {
    blockInput.incPositionBy(this.blockSize, 0, this.checkMiddle);
    this.checkMiddle = false;
};

Puzzle.prototype.goLeft = function (blockInput) {
    blockInput.incPositionBy(-1 * this.blockSize, 0, this.checkMiddle);
    this.checkMiddle = false;
};

Puzzle.prototype.update = function () {
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)) {
        console.log("pause toggled");
        this.paused = !this.paused;
    }
    if (this.paused) {
        return;
    }
    
    if(this.score >= 10000){
        
        //this is where the win logic goes
            this.nextScene = new Win(this.score);
            gEngine.GameLoop.stop();
      
        
    }
    this.mShapes = new GameObjectSet();
    if(this.ballL) {
        this.mShapes.addToSet(this.ballL);
    }
    if(this.ballR) {
        this.mShapes.addToSet(this.ballR);
    }
    if(this.coll) {
        this.mShapes.addToSet(this.coll);
    }
    this.mShapes.update();
    gEngine.Physics.processCollision(this.mShapes,[]);
    
    //console.log(this.ballL.getPosition());
    
     this.UIText = new UIText("Score: " + this.score,[0,150],10,0,0,[0,0,0,1]);

    
    if (this.testBlock === null || this.testBlock.update()) {
        //this is the landing logic code for block 1
        if (this.testBlock2 !== null && this.testBlock.isCollidingWithWallTop(this.border.getTop())) {
            //this is where game over logic should go
            this.nextScene = new GameOver(this.score);

            gEngine.GameLoop.stop();
        } else {
            
            this.detectedSomething();
            this.testBlock = null;
            this.testBlock = this.spawn(this.leftSpawnPoint);
            this.testBlock.rotateDefault();
            if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
                this.allowLSpeed = false;
            }
        }
    }
    if(this.testBlock !== null) {
        this.light.set2DPosition(this.testBlock.getBlockCenter());
    }
    if (this.testBlock2 === null || this.testBlock2.update()) {
        if (this.testBlock2 !== null && this.testBlock2.isCollidingWithWallTop(this.border.getTop())) {
            //This is where game over logic should go
            this.nextScene = new GameOver(this.score);

            gEngine.GameLoop.stop();
        } else {
            
            
            this.detectedSomething();
            this.testBlock2 = null;
            this.testBlock2 = this.spawn(this.rightSpawnPoint);
            this.testBlock2.rotateDefault();
            if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
                this.allowRSpeed = false;
            }
        }
    }
  
    for (var i = 0; i < this.allblocks.length; i++) {
        if (this.allblocks[i] !== this.testBlock
                    && this.allblocks[i] !== this.testBlock2
                    && this.allblocks[i].update()) {
            this.allblocks.splice(i, 1);
            i--;
        }
    }

    if (this.renderFire) {
        for(var i = 0; i < this.mFire.length; i++) {
            gEngine.ParticleSystem.update(this.mFire[i]);
            if(this.particleTimer[i] <= 0) {
                this.disableFire();
            }
        }
    }

    this.fixedTimer = Date.now() - this.startTimer;

   

    //console.log(this.properPosition);

    if (this.shakeEngine.getShakeResults()[0] !== 0 || this.shakeEngine.getShakeResults()[1] !== 0) {
     //   this.testBlock.incPositionBy(this.shakeEngine.getShakeResults()[0], this.shakeEngine.getShakeResults()[1]);
     //   this.testBlock2.incPositionBy(this.shakeEngine.getShakeResults()[0], this.shakeEngine.getShakeResults()[1]);
        for(var i = 0; i < this.allblocks.length;i++){
            
            this.allblocks[i].incPositionBy(this.shakeEngine.getShakeResults()[0], this.shakeEngine.getShakeResults()[1]);
            
        }
    
    } else {
       // this.testBlock.setPosition(this.properPosition[0], this.properPosition[1]);
        //this.testBlock2.setPosition(this.properPosition2[0], this.properPosition2[1]);
    }

    this.timer += gEngine.GameLoop.getTime();
    if (this.oldStateTimer !== Math.floor(this.fixedTimer / (this.delaySeconds * 1000))) {
        this.oldStateTimer = Math.floor(this.fixedTimer / (this.delaySeconds * 1000));
        for(var i = 0; i < this.particleTimer.length; i++) {
            this.particleTimer[i] -= 1;
        }
        //this.timer = 0;
        for (var i = 0; i < this.allblocks.length; i++) {
            if (this.allblocks[i] !== this.testBlock
                    && this.allblocks[i] !== this.testBlock2
                    && !this.allblocks[i].isCollidingWithWallBottom(this.border.getBottom())
                    && this.allblocks[i].isCollidingWithAnythingBelow(this.allblocks, this.allblocks[i]) === null) {
                this.allblocks[i].incPositionBy(0, -1 * this.blockSize, this.checkMiddle);
                this.checkMiddle = false;
            }
        }
        if (!this.testBlock2.isCollidingWithWallBottom(this.border.getBottom()) && this.testBlock2.isCollidingWithAnythingBelow(this.allblocks, this.testBlock) === null) {
            this.testBlock2.incPositionBy(0, -1 * this.blockSize, this.checkMiddle);
            this.properPosition2[1] -= this.blockSize;
            this.checkMiddle = false;
        } else {
            //this is the landing logic code for block 2
            if (this.testBlock2.isCollidingWithWallTop(this.border.getTop())) {
                //This is where game over logic should go
                this.nextScene = new GameOver(this.score);

                gEngine.GameLoop.stop();
            } else {
                this.testBlock2.updateLerp(120, 0.1);
                this.detectedSomething();    
                this.testBlock2 = null;
                this.testBlock2 = this.spawn(this.rightSpawnPoint);
                this.testBlock2.rotateDefault();
                if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
                    this.allowRSpeed = false;
                }
            }
        }

        if (!this.testBlock.isCollidingWithWallBottom(this.border.getBottom()) && this.testBlock.isCollidingWithAnythingBelow(this.allblocks, this.testBlock2) === null) {
            this.testBlock.incPositionBy(0, -1 * this.blockSize, this.checkMiddle);
            this.properPosition[1] -= this.blockSize;
            this.checkMiddle = false;
        } else {
            //this is the landing logic code for block 1
            if (this.testBlock.isCollidingWithWallTop(this.border.getTop())) {
                //this is where game over logic should go
                this.nextScene = new GameOver(this.score);

                gEngine.GameLoop.stop();
            } else {
                this.detectedSomething();    
                this.testBlock.updateLerp(120, 0.1);
                this.testBlock = null;
                this.testBlock = this.spawn(this.leftSpawnPoint);
                this.testBlock.rotateDefault();
                if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
                    this.allowLSpeed = false;
                }
            }
        }
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Right) && !this.testBlock2.isCollidingWithWallRight(this.border.getRight()) && this.testBlock2.isCollidingWithAnythingRight(this.allblocks, this.testBlock2) === null) {
        this.goRight(this.testBlock2);
        this.properPosition2[0] += this.blockSize;
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Left) && !this.testBlock2.isCollidingWithWallLeft(this.border.getLeft()) && this.testBlock2.isCollidingWithAnythingLeft(this.allblocks, this.testBlock2) === null) {
        this.goLeft(this.testBlock2);
        this.properPosition2[0] -= this.blockSize;
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)) {
        this.testBlock2.rotate(90);
        for (var i = 0; i < this.allblocks.length; i++) {
            if (this.allblocks[i] !== this.testBlock2) {
                if (this.testBlock2.isIntersectingBlock(this.allblocks[i])) {
                    this.testBlock2.reverseRotate(90);
                }
                //top,bottom,left,right
                else if (this.testBlock2.isIntersectingWall(this.border.getTop() + 20, this.border.getBottom(), this.border.getLeft(), this.border.getRight())) {
                    this.testBlock2.reverseRotate(90);
                }
            }
        }
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.D) && !this.testBlock.isCollidingWithWallRight(this.border.getRight()) && this.testBlock.isCollidingWithAnythingRight(this.allblocks, this.testBlock) === null) {
        this.goRight(this.testBlock);
        this.properPosition[0] += this.blockSize;
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        if (!this.testBlock2.isCollidingWithWallBottom(this.border.getBottom())
                && this.testBlock2.isCollidingWithAnythingBelow(this.allblocks, this.testBlock2) === null
                && this.allowRSpeed === true) {
            this.testBlock2.incPositionBy(0, -1 * this.blockSize, this.checkMiddle);
            this.testBlock2.updateLerp(120, 0.5);
            this.properPosition2[1] -= this.blockSize;
            this.checkMiddle = false;
            this.score++;
        } else if (this.testBlock2.isCollidingWithWallBottom(this.border.getBottom()) || this.testBlock2.isCollidingWithAnythingBelow(this.allblocks, this.testBlock) !== null) {
            //this is the landing logic code for block 2
            this.score += 10;
            this.allowRSpeed = false;
            this.testBlock2.shake();
            if (this.testBlock2.isCollidingWithWallTop(this.border.getTop())) {
                //This is where game over logic should go
                this.nextScene = new GameOver(this.score);

                gEngine.GameLoop.stop();
            } else {
                this.detectedSomething();
    
                this.testBlock2.updateLerp(120, 0.1);
                this.testBlock2 = null;
                this.testBlock2 = this.spawn(this.rightSpawnPoint);
                this.testBlock2.rotateDefault();
            }
        }
    } else if (gEngine.Input.isKeyReleased(gEngine.Input.keys.Down)) {
        this.allowRSpeed = true;
        this.testBlock2.updateLerp(120, 0.1);
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        if (!this.testBlock.isCollidingWithWallBottom(this.border.getBottom())
                && this.testBlock.isCollidingWithAnythingBelow(this.allblocks, this.testBlock) === null
                && this.allowLSpeed === true) {
            this.testBlock.incPositionBy(0, -1 * this.blockSize, this.checkMiddle);
            this.testBlock.updateLerp(120, 0.5);
            this.properPosition[1] -= this.blockSize;
            this.checkMiddle = false;
            this.score++;
        } else if (this.testBlock.isCollidingWithWallBottom(this.border.getBottom()) || this.testBlock.isCollidingWithAnythingBelow(this.allblocks, this.testBlock2) !== null) {
            //this is the landing logic code for block 1
            this.score += 10;
            this.allowLSpeed = false;
            this.testBlock.shake();
            if (this.testBlock.isCollidingWithWallTop(this.border.getTop())) {
                //this is where game over logic should go
                this.nextScene = new GameOver(this.score);

                gEngine.GameLoop.stop();
            } else {
                
                this.detectedSomething();    
                this.testBlock.updateLerp(120, 0.1);
                this.testBlock = null;
                this.testBlock = this.spawn(this.leftSpawnPoint);
                this.testBlock.rotateDefault();
            }
        }
    } else if (gEngine.Input.isKeyReleased(gEngine.Input.keys.S)) {
        this.allowLSpeed = true;
        this.testBlock.updateLerp(120, 0.1);
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.A) && !this.testBlock.isCollidingWithWallLeft(this.border.getLeft()) && this.testBlock.isCollidingWithAnythingLeft(this.allblocks, this.testBlock) === null) {
        this.goLeft(this.testBlock);
        this.properPosition[0] -= this.blockSize;
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W)) {
        this.testBlock.rotate(90);
        for (var i = 0; i < this.allblocks.length; i++) {
            if (this.allblocks[i] !== this.testBlock) {
                if (this.testBlock.isIntersectingBlock(this.allblocks[i])) {
                    this.testBlock.reverseRotate(90);
                }
                //top,bottom,left,right
                else if (this.testBlock.isIntersectingWall(this.border.getTop() + 20, this.border.getBottom(), this.border.getLeft(), this.border.getRight())) {
                    this.testBlock.reverseRotate(90);
                }
            }
        }
    }
    this.updateMoves();
};