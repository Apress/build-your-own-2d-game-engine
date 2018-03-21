/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function ChooseHero() {
    // The camera to view the scene
    this.mCamera = null;
    this.mHero1_animation = null;
    this.mHero2_animation = null;
    this.mHero3_animation = null;
    this.mHero1 = null;
    this.mHero2 = null;
    this.mHero3 = null;
    this.mBg = null;
    this.mMsg = null;
    this.mConfirmButton = null;
    this.heroTexture1 = "assets/Hero1.1.png";
    this.heroTexture2 = "assets/Hero2.1.png";
    this.heroTexture3 = "assets/Hero3.1.png";
    this.kBg = "assets/ChooseHero.png";
    this.p1 = 0;   //player1尚未选择
    this.p2 = 0;   //player2尚未选择
    this.choose = 0;
}
gEngine.Core.inheritPrototype(ChooseHero, Scene);

ChooseHero.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.heroTexture1);
    gEngine.Textures.loadTexture(this.heroTexture2);
    gEngine.Textures.loadTexture(this.heroTexture3);
    gEngine.Textures.loadTexture(Hero1_animation);
    gEngine.Textures.loadTexture(Hero2_animation);
    gEngine.Textures.loadTexture(Hero3_animation);
    gEngine.Textures.loadTexture(this.kBg);    
};

ChooseHero.prototype.unloadScene = function() {
    gEngine.Textures.unloadTexture(this.heroTexture1);
    gEngine.Textures.unloadTexture(this.heroTexture2);
    gEngine.Textures.unloadTexture(this.heroTexture3);
    gEngine.Textures.unloadTexture(Hero1_animation);
    gEngine.Textures.unloadTexture(Hero2_animation);
    gEngine.Textures.unloadTexture(Hero3_animation);
    gEngine.Textures.unloadTexture(this.kBg);

    // Step B: starts the next level
    // starts the next level
    var start = new MyGame();  // next level to be loaded
    var rechoose = new ChooseHero();
    if (this.choose === 0)
    {
        gEngine.Core.startScene(start);
    }
    else if (this.choose === 1)
    {
        gEngine.Core.startScene(rechoose);
    }
    
};

ChooseHero.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(80, 45), // position of the camera
        160,                        // width of camera
        [0, 0, 1280, 720],         // viewport (orgX, orgY, width, height)
        2
    );
    gEngine.DefaultResources.setGlobalAmbientIntensity(3.6);
    this.mCamera.setBackgroundColor([0.5, 0.9, 0.8, 1]);
    
    this.mBg = new TextureRenderable(this.kBg);;
    this.mBg.getXform().setPosition(80, 45);
    this.mBg.getXform().setSize(160, 90);
    
    this.mHero1 = new TextureRenderable(this.heroTexture1);
    //this.mHero1.setColor([1, 1, 1, 0]);
    this.mHero1.getXform().setPosition(15, 75);
    this.mHero1.getXform().setSize(22, 22);
    
    this.mHero2 = new TextureRenderable(this.heroTexture2);
    //this.mPlayer1Hero2.setColor([0.8, 0.8, 0.8, 1]);
    this.mHero2.getXform().setPosition(15, 45);
    this.mHero2.getXform().setSize(22, 22);
    
    this.mHero3 = new TextureRenderable(this.heroTexture3);
    //this.mPlayer1Hero3.setColor([0.8, 0.8, 0.8, 1]);
    this.mHero3.getXform().setPosition(15, 15);
    this.mHero3.getXform().setSize(22, 22);
    
    this.mHero1_animation = new SpriteAnimateRenderable(Hero1_animation);
    this.mHero1_animation.setSpriteSequence(126, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
                                 124, 128,       // widthxheight in pixels
                                 2,              // number of elements in this sequence
                                 0);             // horizontal padding in between
    this.mHero1_animation.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mHero1_animation.getXform().setPosition(200, 45);
    this.mHero1_animation.getXform().setSize(30, 30);
    this.mHero1_animation.setAnimationSpeed(10);

    this.mHero2_animation = new SpriteAnimateRenderable(Hero2_animation);
    this.mHero2_animation.setSpriteSequence(256, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
                                 124, 128,       // widthxheight in pixels
                                 2,              // number of elements in this sequence
                                 0);             // horizontal padding in between
    this.mHero2_animation.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mHero2_animation.getXform().setPosition(200, 45);
    this.mHero2_animation.getXform().setSize(30, 30);
    this.mHero2_animation.setAnimationSpeed(10);
    
    this.mHero3_animation = new SpriteAnimateRenderable(Hero3_animation);
    this.mHero3_animation.setSpriteSequence(256, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
                                 124, 128,       // widthxheight in pixels
                                 2,              // number of elements in this sequence
                                 0);             // horizontal padding in between
    this.mHero3_animation.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mHero3_animation.getXform().setPosition(200, 45);
    this.mHero3_animation.getXform().setSize(30, 30);
    this.mHero3_animation.setAnimationSpeed(10);

    this.mMsg = new FontRenderable("This is splash screen");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(10, 50);
    
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
ChooseHero.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.mBg.draw(this.mCamera);
    
    this.mMsg.setColor([0, 1, 0, 1]);
    this.mMsg.setTextHeight(3);
    this.mMsg.setText("Archer");
    this.mMsg.getXform().setPosition(30, 80);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setTextHeight(2);
    this.mMsg.setText("Princess of the Kingdom of ShotWood");
    this.mMsg.getXform().setPosition(30, 75);
    this.mMsg.draw(this.mCamera);

    this.mMsg.setTextHeight(2);
    this.mMsg.setText("Gift: the trace-route arrows");
    this.mMsg.getXform().setPosition(30, 72);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setTextHeight(3);
    this.mMsg.setText("Soldier");
    this.mMsg.getXform().setPosition(30, 50);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setTextHeight(2);
    this.mMsg.setText("Prince of the Kingdom of MachineWorld");
    this.mMsg.getXform().setPosition(30, 45);
    this.mMsg.draw(this.mCamera);

    this.mMsg.setTextHeight(2);
    this.mMsg.setText("Gift: powerful sniper fire");
    this.mMsg.getXform().setPosition(30, 42);
    this.mMsg.draw(this.mCamera);
    
     this.mMsg.setTextHeight(3);
    this.mMsg.setText("Wizard");
    this.mMsg.getXform().setPosition(30, 20);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setTextHeight(2);
    this.mMsg.setText("Wizard of the MonsterForest");
    this.mMsg.getXform().setPosition(30, 15);
    this.mMsg.draw(this.mCamera);

    this.mMsg.setTextHeight(2);
    this.mMsg.setText("Gift: magic impack");
    this.mMsg.getXform().setPosition(30, 12);
    this.mMsg.draw(this.mCamera);   
 
    this.mMsg.setTextHeight(5);
    this.mMsg.setText("Player1");
    this.mMsg.getXform().setPosition(93, 68);
    this.mMsg.draw(this.mCamera);    
    
    this.mMsg.setTextHeight(5);
    this.mMsg.setText("Player2");
    this.mMsg.getXform().setPosition(133, 68);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setTextHeight(3);
    this.mMsg.setText("Press C to confirm your role choice and start to play!");
    this.mMsg.getXform().setPosition(90, 20);
    this.mMsg.draw(this.mCamera);
    this.mMsg.setText("start to play!");
    this.mMsg.getXform().setPosition(90, 16);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setTextHeight(3);
    this.mMsg.setText("Press R to rechoose the role!");
    this.mMsg.getXform().setPosition(90, 10);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setTextHeight(3);
    this.mMsg.setText("Choose a hero by clicking on it");
    this.mMsg.getXform().setPosition(90, 5);
    this.mMsg.draw(this.mCamera);
    
    this.mHero1.draw(this.mCamera);
    this.mHero2.draw(this.mCamera);
    this.mHero3.draw(this.mCamera);
    this.mHero1_animation.draw(this.mCamera);
    this.mHero2_animation.draw(this.mCamera);
    this.mHero3_animation.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
ChooseHero.prototype.update = function () {
    this.mCamera.update(); 
    this.mHero1_animation.updateAnimation();
    this.mHero2_animation.updateAnimation();
    this.mHero3_animation.updateAnimation();
    if (this.p1 != 0)
    {
        switch (this.p1)
        {
            case 1: this.mHero1_animation.getXform().setPosition(100, 45);
                    break;
                    
            case 2: this.mHero2_animation.getXform().setPosition(100, 45);
                    break;
            
            case 3: this.mHero3_animation.getXform().setPosition(100, 45);
                    break;
        }
    }
    if (this.p2 != 0)
    {
        switch (this.p2)
        {
            case 1: this.mHero1_animation.getXform().setPosition(140, 45);
                    break;
                    
            case 2: this.mHero2_animation.getXform().setPosition(140, 45);
                    break;
            
            case 3: this.mHero3_animation.getXform().setPosition(140, 45);
                    break;
        }
    }
    
    if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) {
        x = this.mCamera.mouseWCX();
        y = this.mCamera.mouseWCY();
        if ( (x >= 4) && (x <= 26) && (y >= 64) && (y <= 86) )
        {
             if ((this.p1 === 0) && (this.p2 != 1))
             {
                 player1 = 1;
                 this.p1 = 1;
                 this.mHero1.getXform().setSize(28, 28);
             }
             else if ((this.p2 === 0) && (this.p1 != 1))
             {
                 player2 = 1;
                 this.p2 = 1;
                 this.mHero1.getXform().setSize(28, 28);
             }
        }
        else if ( (x >= 4) && (x <= 26) && (y >= 34) && (y <= 56) )
             {
                if ((this.p1 === 0) && (this.p2 != 2))
                {
                    player1 = 2;
                    this.p1 = 2;
                    this.mHero2.getXform().setSize(28, 28);
                }
                else if ((this.p2 === 0) && (this.p1 != 2))
                {
                    player2 = 2;
                    this.p2 = 2;
                    this.mHero2.getXform().setSize(28, 28);
                }
             }
             else if ( (x >= 4) && (x <= 26) && (y >= 4) && (y <= 26) )
                  {
                      if ((this.p1 === 0) && (this.p2 != 3))
                      {
                          player1 = 3;
                          this.p1 = 3;
                          this.mHero3.getXform().setSize(28, 28);
                      }
                      else if ((this.p2 === 0) && (this.p1 != 3))
                      {
                          player2 = 3;
                          this.p2 = 3;
                          this.mHero3.getXform().setSize(28, 28);
                      }
                  }
    }
    
    //按C确认英雄选择
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.C))
    {
        this.choose = 0;
        gEngine.GameLoop.stop();
    }
    
    //按R确认英雄选择
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R))
    {
        this.choose = 1;
        gEngine.GameLoop.stop();
    }
};



