/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Level(currentLevel, levelName, lightPref, gamePref) {  
    this.kMaze_sprite = "assets/maze_sprite.png";
    this.kMaze_sprite_Normal = "assets/maze_sprite_normal.png";
    this.kDoor = "assets/RigidShape/wall.png";
    this.kDoor_Normal = "assets/RigidShape/wall_normal.png";

    this.kWall_Tex = "assets/wall_sprite_sheet.png";
    this.kWall_Tex_Normal = "assets/wall_sprite_sheet_normal.png";
    this.kFloor_Tex = "assets/floor_tex.jpg";
    this.kFloor_Tex_Normal = "assets/floor_tex_normal2.jpg";
    this.kSceneFile = "assets/"+levelName+".json";
    this.hero_Tex = "assets/llama_moving_sprite.png";
    //this.hero_Tex_Moves = "assets/llamas_move.png";
    this.hero_Tex_Normal = "assets/llama_moving_sprite_normal.png";

    this.mCurrentLevel = currentLevel;
    this.mLevel = levelName;
    this.mLightPref = lightPref;
    this.mGamePref = gamePref;
    
    //Physics stuff
    this.mCollisionInfos = [];
    this.mPhysObjs = null;
    
    // The cameras to view the level
    this.mCamera = null;
    this.mSmallCam = null; 

    //this.mDoorsContrapsion = null;
    this.mCollObjs = new GameObjectSet();
    this.mDoorSet = null;
    this.mButtonSet = null;
    this.mLeverSet = null;
    this.mSprite = null;
    this.mExit = null;

    this.mMinimap = null;
    this.mGameTimer = null;
    
    // The Player Character
    this.mHero = null;
    // The Objects within the Level.
    this.mButtonSet = null;
    this.mExit = null;
    this.mWallSet = null;
    this.mFloorTile = null;
    this.mFloor = null;

    this.GameOver = false;
    this.mNextLoad = null;
    this.mSpriteEnd = false;    //end game when sprite catches 
    //this.mButtonTemp = null;
    this.mGlobalLightSet = null;
    
}
gEngine.Core.inheritPrototype(Level, Scene);


Level.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMaze_sprite);

    gEngine.Textures.loadTexture(this.kDoor);
    gEngine.Textures.loadTexture(this.kWall_Tex);
    gEngine.Textures.loadTexture(this.kFloor_Tex);
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile, gEngine.TextFileLoader.eTextFileType.eJSONFile);
    gEngine.Textures.loadTexture(this.hero_Tex);
    //Normal Maps
    gEngine.Textures.loadTexture(this.kWall_Tex_Normal);
    gEngine.Textures.loadTexture(this.kFloor_Tex_Normal);
    gEngine.Textures.loadTexture(this.hero_Tex_Normal);
    gEngine.Textures.loadTexture(this.kMaze_sprite_Normal);
    gEngine.Textures.loadTexture(this.kDoor_Normal);
};

Level.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMaze_sprite);

    gEngine.Textures.unloadTexture(this.kDoor);

    gEngine.Textures.unloadTexture(this.kWall_Tex);
    gEngine.Textures.unloadTexture(this.kFloor_Tex);
    gEngine.Textures.unloadTexture(this.hero_Tex);
    //Normal Maps
    gEngine.Textures.unloadTexture(this.kWall_Tex_Normal);
    gEngine.Textures.unloadTexture(this.kFloor_Tex_Normal);
    gEngine.Textures.unloadTexture(this.hero_Tex_Normal);
    gEngine.Textures.unloadTexture(this.kMaze_sprite_Normal);
    gEngine.Textures.loadTexture(this.kDoor_Normal);
    
    //Game Over
    var nextlevel = null;
//    nextlevel = new GameOver(this.mNextLoad, this.mLevel, this.mGameTimer.getTime());
    if(this.mNextLoad === "lose" || this.mNextLoad === "won"){
        nextlevel = new GameOver(this.mCurrentLevel, this.mNextLoad, this.mLevel, this.mGameTimer.getTime(), this.mLightPref, this.mGamePref);
    } else {
        nextlevel = new Level(this.mCurrentLevel, this.mNextLoad, this.mLightPref, this.mGamePref);
    }
    gEngine.Core.startScene(nextlevel);
};

Level.prototype.initialize = function () {
    //Get the Scene Info
    var sceneInfo = gEngine.ResourceMap.retrieveAsset(this.kSceneFile);
    
    //Physics set!
    this.mPhysObjs = new GameObjectSet();
    //Temp Physics button is your friend addition.
    ;
    //Create the cameras
    this.mCamera = new Camera(
    sceneInfo.Camera.Center,
    sceneInfo.Camera.Width,
    sceneInfo.Camera.Viewport
    );
    this.mCamera.setBackgroundColor(sceneInfo.Camera.BgColor);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    //Create the UI Elements
    this.mGameTimer = new GameTimer(sceneInfo.GameTimer.time);
    
    
    //Added Floor to reflect light 
    this.mFloorTile = new IllumRenderable(this.kFloor_Tex, this.kFloor_Tex_Normal);
    this.mFloorTile.setElementPixelPositions(0, 512, 0, 512);
    this.mFloorTile.getXform().setSize(20, 20);
    this.mFloorTile.getXform().setPosition(0, 0);
    this.mFloorTile.getMaterial().setSpecular([1, 0, 0, 1]);
    this.mFloor = new TiledGameObject(this.mFloorTile);

    //Create the walls
    this.mWallSet = new WallSet(this.kWall_Tex,this.kWall_Tex_Normal,sceneInfo.MapInfo.wallx,sceneInfo.MapInfo.wally,sceneInfo.MapInfo.wallgrid);
    for(var i = 0; i < sceneInfo.Wall.length; i++) {
        if(Object.keys(sceneInfo.Wall[i]).length !== 0) {
            this.mWallSet.addWall(sceneInfo.Wall[i].Pos[0],sceneInfo.Wall[i].Pos[1],sceneInfo.Wall[i].Orientation);
        } else {
            this.mWallSet.addSpace();
        }
    }
    //Create the Doors
    this.mDoorSet = new DoorSet(this.kDoor,this.kDoor_Normal);
    for(var i =0; i < sceneInfo.Door.length; i++) {
        this.mDoorSet.createDoor(
        sceneInfo.Door[i].DoorX,
        sceneInfo.Door[i].DoorY,
        sceneInfo.Door[i].DoorW,
        sceneInfo.Door[i].DoorH,
        sceneInfo.Door[i].DoorRot,
        sceneInfo.Door[i].DoorNum
        );
    }
    //this.mButtonTemp = new PushButtonPhysics(this.kMaze_sprite,this.kMaze_sprite_Normal,4.5,65,5,5,this.mDoorSet.getObjectAt(0));
    //this.mButtonTemp.setRot(270);
    //this.mPhysObjs.addToSet(this.mButtonTemp)
    
    //Setup the GameObjects
    this.mLeverSet = new LeverSet(this.kMaze_sprite, this.kMaze_sprite_Normal);
    //Create the levers
    for(var i =0; i < sceneInfo.Lever.length; i++) {
        this.mLeverSet.createLever(
        sceneInfo.Lever[i].LeverX,
        sceneInfo.Lever[i].LeverY,
        sceneInfo.Lever[i].LeverW,
        sceneInfo.Lever[i].LeverH,
        sceneInfo.Lever[i].LeverRot,
        sceneInfo.Lever[i].DoorIndex
        );
    }
    this.mSprite = new Sprite(sceneInfo.Sprite.spritex,sceneInfo.Sprite.spritey);
    this.mExit = new Exit(this.kMaze_sprite,this.kMaze_sprite_Normal, sceneInfo.Exit.exitx,sceneInfo.Exit.exity);
    //this.mDoorsContrapsion = new DoorsContrapsion(this.kMaze_sprite, this.kMaze_sprite_Normal, this.kDoor, this.kDoor_Normal);
    this.mButtonSet = new PushButtonSet(this.kMaze_sprite, this.kMaze_sprite_Normal);
    //Create the Buttons
    for(var i =0; i < sceneInfo.Button.length; i++) {
        this.mButtonSet.createButton(
        sceneInfo.Button[i].ButtonX,
        sceneInfo.Button[i].ButtonY,
        sceneInfo.Button[i].ButtonW,
        sceneInfo.Button[i].ButtonH,
        sceneInfo.Button[i].ButtonRot,
        this.mDoorSet.getObjectAt(sceneInfo.Button[i].DoorIndex)
        );
        var tempButton = this.mButtonSet.getObjectAt(i);
        this.mPhysObjs.addToSet(tempButton);
    }
    this.mHero = new Hero(this.hero_Tex,this.hero_Tex_Normal,
    sceneInfo.MapInfo.width,
    sceneInfo.MapInfo.height,
    sceneInfo.Hero.herox,
    sceneInfo.Hero.heroy
    );
    this.mPhysObjs.addToSet(this.mHero);
    
    this.mMinimap = new Minimap(sceneInfo.MapInfo.width,sceneInfo.MapInfo.height);
    this.mSmallCam = this.mMinimap.getMinimap();
    
  
    //Lights go to Level_Lights
    this.createLights(this.mHero.getXform().getPosition(), this.mExit.getXform().getPosition()); 
    //light preference
    if (this.mLightPref === "bright")
    {
        gEngine.DefaultResources.setGlobalAmbientIntensity(3);
        for (var i = 0; i < 4; i++)
        {
            this.mGlobalLightSet.getLightAt(i).setLightTo(false);
        }
    }
    else if (this.mLightPref === "dim")
    {
        gEngine.DefaultResources.setGlobalAmbientIntensity(1);
        for (var i = 0; i < 4; i++)
        {
            this.mGlobalLightSet.getLightAt(i).setLightTo(true);
        }
    }
    else if (this.mLightPref === "dark")
    {
        gEngine.DefaultResources.setGlobalAmbientIntensity(0);
        for (var i = 0; i < 4; i++)
        {
            this.mGlobalLightSet.getLightAt(i).setLightTo(true);
        }
    }
    if (this.mGamePref === "time")
        this.mSpriteEnd = false;
    else if (this.mGamePref === "chase")
        this.mSpriteEnd = true;
};

Level.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.drawCamera(this.mCamera, true);      //draw floor
    this.drawMiniMap(this.mSmallCam);                //set up minimap view
};
Level.prototype.drawCamera = function(camera, floor) {
    //Setup the camera
    camera.setupViewProjection();
    if (floor)
        this.mFloor.draw(this.mCamera);
    //Draw the map
    this.mWallSet.draw(camera);
    
    //Draw the objects
    this.mLeverSet.draw(camera);
    this.mDoorSet.draw(camera);
    this.mButtonSet.draw(camera);
    this.mSprite.draw(camera);
    this.mExit.draw(camera);
    //this.mButtonTemp.draw(camera);
    
    //Draw the UI
    this.mGameTimer.draw(camera);
    this.mHero.draw(camera);
};
Level.prototype.drawMiniMap = function(camera) {
    camera.setupViewProjection();
    this.mSprite.draw(camera);
    this.mHero.draw(camera);
    this.mExit.draw(camera);
};
Level.prototype.update = function () {

    //Update the UI
    var time = this.mGameTimer.update();
    if (this.mLightPref === "dark")     //only when dark
        this.updateValue(time);
    //Update the objects
    var heroPos = this.mHero.getXform().getPosition();
    this.mCamera.setWCCenter(heroPos[0],heroPos[1]);
    this.mCamera.update();
    this.mSmallCam.update();
    this.mHero.update(this.mWallSet,this.mDoorSet,this.mButtonSet, this.mGlobalLightSet);
    this.mButtonSet.update(this.mCamera,this.mSprite);
    //this.mLeverSet.update(this.mCamera, this.mHero);
    
    this.mExit.update();
    //this.mDoorsContrapsion.update(this.mHero);
    this.mDoorSet.update();
    //this.mButtonSet.update();
    this.checkInput();
    gEngine.Physics.processCollision(this.mPhysObjs, this.mCollisionInfos);
    
};
Level.prototype.updateValue = function(time){
    document.getElementById("time").innerHTML = time;
};