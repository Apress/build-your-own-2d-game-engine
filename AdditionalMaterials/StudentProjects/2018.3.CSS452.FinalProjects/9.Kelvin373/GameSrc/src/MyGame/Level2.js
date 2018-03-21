/*
Level 2

This is the scene for the second level

will use the level that is defined in another level, but this will allow for having
a different boss


 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */

"use strict";

function Level2()
{


    // level assets
    this.kPlatform = "assets/bluegridplat_512x128.png";

    // background
    this.kBackground = "assets/background_purple.png";
    this.kBackgroundNormal = "assets/background_purple_normal.png";

    // shared player assets
    this.kHobbesSpriteSheet = "assets/hobbes.png";
    this.kSquirtGunShotSprite = "assets/squirtgunshot.png";
    this.kWaterBalloonSprite = "assets/Balloon.png";
    this.kProjectileTexture = "assets/particle.png";
    this.mParticleSet = null;

    // square box sprite sheet
    this.kSquareBossSpriteSheet = "assets/squareboss_sprites.png";

    this.kBGM = "assets/sounds/kelvin_373_main_theme.ogg";
    this.kZapSFX = "assets/sounds/zap.ogg";
    this.kHurtSFX = "assets/sounds/hurt.ogg";

    this.mainCamera = null;

    this.mLevel = null;

    this.mNextScene = null;
};


gEngine.Core.inheritPrototype(Level2, Scene);

Level2.prototype.loadScene = function()
{
    gEngine.Textures.loadTexture(this.kPlatform);
    gEngine.Textures.loadTexture(this.kBackground);
    gEngine.Textures.loadTexture(this.kBackgroundNormal);
    gEngine.Textures.loadTexture(this.kHobbesSpriteSheet);
    gEngine.Textures.loadTexture(this.kSquirtGunShotSprite);
    gEngine.Textures.loadTexture(this.kProjectileTexture);
    gEngine.Textures.loadTexture(this.kWaterBalloonSprite);
    gEngine.Textures.loadTexture(this.kSquareBossSpriteSheet);

    gEngine.AudioClips.loadAudio(this.kZapSFX);
    gEngine.AudioClips.loadAudio(this.kHurtSFX);
    gEngine.AudioClips.loadAudio(this.kBGM);
};

Level2.prototype.unloadScene = function()
{
    gEngine.Textures.unloadTexture(this.kPlatform);
    gEngine.Textures.unloadTexture(this.kBackground);
    gEngine.Textures.unloadTexture(this.kBackgroundNormal);
    gEngine.Textures.unloadTexture(this.kHobbesSpriteSheet);
    gEngine.Textures.unloadTexture(this.kSquirtGunShotSprite);
    gEngine.Textures.unloadTexture(this.kWaterBalloonSprite);
    gEngine.Textures.unloadTexture(this.kSquareBossSpriteSheet);
    gEngine.Textures.unloadTexture(this.kProjectileTexture);

    gEngine.AudioClips.unloadAudio(this.kZapSFX);
    gEngine.AudioClips.unloadAudio(this.kHurtSFX);
    gEngine.AudioClips.unloadAudio(this.kBGM);
    gEngine.AudioClips.stopBackgroundAudio();

    gEngine.Core.startScene(this.mNextScene);
};

Level2.prototype.initialize = function()
{
     this.mParticleSet =  new GameObjectSet();
    gEngine.AudioClips.playBackgroundAudio(this.kBGM);
    // define all of the level specifics, like all of the objects
    // and positions
    this.mLevel = new AnotherLevel();

    // define the main camera
    var center = vec2.fromValues(this.mLevel.mCameraCenter[0], this.mLevel.mCameraCenter[1]);
    var camWidth = 300;
    var camHeight = 210;

    this.mainCamera = new Camera(
        center,
        camWidth,
        [0, 0, 1000, 700]
    );
    this.mainCamera.setBackgroundColor([0,0,0,1]);

    // share the reference with the level
    this.mLevel.setActiveCamera(this.mainCamera);

    // define the player object4
    this.mPlayer = new Hobbes(this.kHobbesSpriteSheet,
        this.mLevel.mPlayerSpawn[0],
        this.mLevel.mPlayerSpawn[1]);

    // define the health bar
    this.mPlayerHealthBar = new HealthBar(
        vec2.fromValues(-135, 60),
        2, 20,
        "vertical",
        this.mPlayer
    );

    // define all of the objects that will collide with each other
    this.mObjects = new GameObjectSet();

    // append all of the platforms
    // and the player
    this.mObjects.appendSet(this.mLevel.mPlatforms);
    this.mObjects.addToSet(this.mPlayer);



    // make a gameobjectset that tracks all of the enemies
    this.mMinions = new GameObjectSet();

    // game object set for all of the squirt gun shots
    this.mSquirtGunShots = new GameObjectSet();

    // make a boss and add it to the minion set
    this.mMinions.addToSet(new SquareBoss(
        this.kSquareBossSpriteSheet,
        150, 180, 1, 0
    ));

};

Level2.prototype.draw = function()
{
    // clear the canvas
    gEngine.Core.clearCanvas([0.9,0.9, 0.9, 1.0]);

    this.mainCamera.setupViewProjection();

    this.drawAll(this.mainCamera);
};

Level2.prototype.drawAll = function(camera) {
    // draw background first
    this.mLevel.mBackgroundRenderable.draw(camera);
    this.mParticleSet.draw(camera);
    // draw all of the platforms
    // for(var i = 0; i < this.mLevel.mPlatforms.size(); i++)
    // {
    //     this.mLevel.mPlatforms.getObjectAt(i).draw(camera);
    // }
    //this.mLevel.mPlatforms.draw(camera);


    // draw all of the minions
    //this.mMinions.draw(camera);

    this.mObjects.draw(camera);
    this.mMinions.draw(camera);

    // draw the shots above
    this.mSquirtGunShots.draw(camera);

    // draw the player health bar
    this.mPlayerHealthBar.draw(camera);


};

Level2.prototype.update = function()
{
    // update
    this.mainCamera.update();
    this.mLevel.update();

    this.mMinions.update();

    // update the player

    // the refernce to mMinions just uses pixel collisions and bounce back
    // so is totally ok when using the new square boss
    if(this.mPlayer.update(
        this.mLevel.mPlatforms, this.mMinions, this.mSquirtGunShots,
        this.kSquirtGunShotSprite, this.kWaterBalloonSprite,
            this.kHurtSFX))
    {
        this.mNextScene = new GameOver();
        gEngine.GameLoop.stop();
    }

    this.mSquirtGunShots.update();

    gEngine.Physics.processCollision(this.mObjects,[]);

    // sets of game objects that will be added and removed after this update
    var gameObjectsToRemove = new GameObjectSet();
    var gameObjectsToAdd = new GameObjectSet();

    // process the collisions for all of the squares
    for(var i = 0; i < this.mSquirtGunShots.size(); ++i)
    {
        var shot = this.mSquirtGunShots.getObjectAt(i);
        for(var j = 0; j < this.mMinions.size(); j++)
        {
            var sq = this.mMinions.getObjectAt(j);
            if(shot.pixelTouches(sq, []))
            {
                this.mSquirtGunShots.getObjectAt(i).processHit(this.mParticleSet,this.mMinions);
                // hit the square
                sq.hit();
                // remove the shot
                this.mSquirtGunShots.removeFromSet(shot);
            }

            // check if it is now dead
            if(sq.dead)
            {
                // if it is, check if it should make new squares
                if(sq.shouldMakeNewSquares())
                {
                    // if so, remove sq from the set of game objects
                    var newSquares = sq.makeNewSquares();
                    if(newSquares != undefined)
                    {
                        gameObjectsToAdd.appendSet(newSquares);
                    }


                }

                // and remove sq
                gameObjectsToRemove.addToSet(sq);
            }
        }

        // check to see if the shots collide with the bounds of the world
        for(var j = 0; j < this.mLevel.mPlatforms.size(); j++)
        {
            var platform = this.mLevel.mPlatforms.getObjectAt(j);
            // check for a hit and remove the squirt gun shot if it was hit
            if(shot.pixelTouches(platform, []))
            {
                this.mSquirtGunShots.getObjectAt(i).processHit(this.mParticleSet,this.mMinions);
                this.mSquirtGunShots.removeFromSet(shot);
            }
        }
    }

    // remove the ones that need to be removed
    for(var i = 0; i < gameObjectsToRemove.size(); i++)
    {
        this.mMinions.removeFromSet(gameObjectsToRemove.getObjectAt(i));
    }

    // add the ones that need to be added
    for(var i = 0; i < gameObjectsToAdd.size(); i++)
    {
        this.mMinions.addToSet(gameObjectsToAdd.getObjectAt(i));
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Y))
    {
        this.mMinions = new GameObjectSet();
    }


    // check to see if the objects are empty
    if(this.mMinions.size() <= 0)
    {
        this.mNextScene = new WinScreen();
        gEngine.GameLoop.stop();
    }

    // Hobbes goes out of the world bounds, game over
    if (this.mLevel.mWorldBounds.outsideBounds(this.mPlayer)) {
        this.mNextScene = new GameOver();
        gEngine.GameLoop.stop();
    }

    // Health bars
    this.mPlayerHealthBar.update(this.mainCamera);
    this.mParticleSet.update(this.mainCamera);

};