

/* global gEngine, Scene, MyScene, vec2, gManager */

function SaveRabbits(){

    this.kSpaceShipXML = "assets/SpaceShip.xml";
    this.kMapXML = "assets/Map.xml";
    this.mapBackground ="assets/mapRigidTexture.png";
    this.mapRigidtexture = "assets/empty.png";
    this.cheattexture = "assets/enemy.png";
    this.kParticle = "assets/jetpack.png";
    this.kBullet = "assets/bullet2.png";
    this.kPropellerTexture = "assets/Propeller.png";
    this.kPropellerFireTexture = "assets/Propeller_fire.png";
    this.kDefenderTexture = "assets/defender.png";
    this.rabTexture1 = "assets/RabbitAnimation.png";
    this.rabTexture2 = "assets/RabbitAnimation.png";
    this.kCircleTexture = "assets/ball.png";
    this.kCarrots = "assets/carrot.png";
    this.kStairsTexture = "assets/stairs.png";
    this.kAdvanceControllerTexture = "assets/advance_controller.png";
    this.kDefendControllerTexture = "assets/defend_controller.png";
    this.kLeftAttackControllerTexture = "assets/left_attack_controller.png";
    this.kRightAttackControllerTexture = "assets/right_attack_controller.png";
    this.kGunBarrelTexture = "assets/gun_barrel.png";
    this.kGunBaseTexture = "assets/gun_base.png";
    this.goldcoin = "assets/gold_1.png";
    this.court = 20;
    this.kDoorTop = "assets/DoorInterior_Top.png";
    this.kDoorBot = "assets/DoorInterior_Bottom.png";
    this.kDoorSleeve = "assets/DoorFrame_AnimSheet.png";
    this.kButton = "assets/DoorFrame_Button_180x100.png";
    this.sky = "assets/SKY2.png";
    this.bomb = "assets/bomb.png";
    this.kWinDoor = "assets/heart3.png";
    this.kBloodBar = "assets/bloodbar3.png";
    this.laserminion = "assets/laserminion.png";
    this.mapwall = "assets/mapwall.png";
    this.AllWalls = new GameObjectSet();
    this.mAllMinions = new GameObjectSet();
    this.mAllParticles = new ParticleGameObjectSet();
     this.mAllCoins = new GameObjectSet();
    this.mAllDoors = new GameObjectSet();
    this.mAllButtons = new GameObjectSet();
    this.mAllBloodpacks = new GameObjectSet();
    this.mAllBooms = new GameObjectSet();    
    this.bloodcourt = 5;
    this.aBgClip = "assets/sounds/bgClip.mp3";
    this.aChooseCue = "assets/sounds/choose.mp3";
    this.aEnterCue = "assets/sounds/focus.mp3";
    this.aCoinCue  = "assets/sounds/coin.mp3";
    this.aShootBulletCue = "assets/sounds/shoot.mp3";
    this.aBoom_enemyCue=  "assets/sounds/boom.mp3";
    this.aPropellerCue = "assets/sounds/propeller_fire.mp3";
    this.aWarningCue = "assets/sounds/warning.mp3";
    this.aBoomCue = "assets/sounds/boom_enemy.mp3";
    this.aLaserCue =  "assets/sounds/laser_shoot.mp3";
    this.mCamera = null;
    this.mMiniCamera = null;
    this.mHPCamera = null;
    this.bloodBar = null;
    this.Cheat = null;
    this.SpaceShip = null;
    this.mRabbit1 = null;
    this.mRabbit2 = null;
    this.map = null;
    this.mapWaW = null;
    this.winDoor = null;
    this.mAllobjs = new GameObjectSet();
    
    //场景切换
    this.win = false;
    this.lose = false;
    this.Menu =false;
}

gEngine.Core.inheritPrototype(SaveRabbits, Scene);

SaveRabbits.prototype.initialize = function(){
    Scene.prototype.initialize.call(this);
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.DefaultResources.setGlobalAmbientIntensity(1);
    gEngine.DefaultResources.setGlobalAmbientColor([1,1,1,1]);
    gEngine.Physics.setSystemAcceleration([0,0]);
    gEngine.ParticleSystem.setSystemtAcceleration([0,0]);


    var sceneParser = new SceneFileParser(this.kMapXML);
    [this.mCamera,this.mMiniCamera]=sceneParser.parseCamera();
    this.mCamera.mCameraState.setRate(this.mCamera.getWCCenter(),this.mCamera.getWCWidth(),1);
    this.Cheat = new Cheatobject(80, 485,this.kCircleTexture, 32,32);
    this.mAllobjs.addToSet(this.Cheat);
    this.bloodBar = new BloodBar(40,250,4,40,this.kBloodBar,this.kCarrots);
    this.winDoor = sceneParser.parseWinDoor(this.kWinDoor);

    var laserminion1 = new LaserMinion(500,60,this.laserminion,7,7,-1);
    var laserminion2 = new LaserMinion(315,60,this.laserminion,7,7,1); 
    this.mAllobjs.addToSet(laserminion1);
    this.mAllobjs.addToSet(laserminion2);
    this.mAllMinions.addToSet(laserminion1);
    this.mAllMinions.addToSet(laserminion2);    
    
    
    
    var m = sceneParser.parseMinions(this.cheattexture,this.Cheat);
    var i;
    for (i = 0; i < m.length; i++) {
        this.mAllMinions.addToSet(m[i]);
        this.mAllobjs.addToSet(m[i]);
    }
    
    var d = sceneParser.parseDoors(this.kDoorTop, this.kDoorBot, this.kDoorSleeve);
    for (i = 0; i < d.length; i++) {
        this.mAllDoors.addToSet(d[i]);
        this.mAllobjs.addToSet(d[i]);
    }
    
    var b = sceneParser.parseButtons(this.kButton, this.mGlobalLightSet);
    for (i = 0; i < b.length; i++) {
        this.mAllButtons.addToSet(b[i]);
        this.mAllobjs.addToSet(b[i]);
    }
    var b = sceneParser.parseCoins(this.goldcoin);
    for (i = 0; i < b.length; i++) {
        this.mAllCoins.addToSet(b[i]);
        this.mAllobjs.addToSet(b[i]);
    }
        var b = sceneParser.parseBloodpacks(this.kCarrots);
    for (i = 0; i < b.length; i++) {
        this.mAllBloodpacks.addToSet(b[i]);
        this.mAllobjs.addToSet(b[i]);
    }
        var b = sceneParser.parseBooms(this.bomb);
    for (i = 0; i < b.length; i++) {
        this.mAllBooms.addToSet(b[i]);
        this.mAllobjs.addToSet(b[i]);
    }

    var mapWallSquares = [];
    sceneParser.parseWallSquares(this.mapRigidtexture,mapWallSquares);
    for (var i=0;i<mapWallSquares.length;i++)
    {
        this.AllWalls.addToSet(mapWallSquares[i]);
        this.mAllobjs.addToSet(mapWallSquares[i]);
    }


    this.map = sceneParser.parseMapBackground(this.sky);
    this.mapWaW = new Map(275, 275, 550,550,this.mapwall);
    
    
   var mapWallCircles = [];
    mapWallCircles = sceneParser.parseWallCircles(this.goldcoin);
    for (var i=0;i<mapWallCircles.length;i++)
    {
        this.AllWalls.addToSet(mapWallCircles[i]);
        this.mAllobjs.addToSet(mapWallCircles[i]);
    }
    sceneParser = new SceneFileParser(this.kSpaceShipXML);
     this.SpaceShip = new SpaceShip(100,400,this.Cheat,this.kPropellerTexture,this.kPropellerFireTexture,this.kDefenderTexture,this.kStairsTexture,
                                    this.kAdvanceControllerTexture,this.kDefendControllerTexture,this.kLeftAttackControllerTexture
                                            ,this.kRightAttackControllerTexture,this.kGunBarrelTexture,this.kGunBaseTexture);
                                                                 
    this.SpaceShip.SpaceShipMap = sceneParser.parseSpaceShipMap();

    this.mRabbit1 = new Rabbit(this.SpaceShip,this.rabTexture1,-4.5,0,[0,512]);
    this.mRabbit2 = new Rabbit(this.SpaceShip,this.rabTexture2,1,0,[0,362]);

    gEngine.AudioClips.playBackgroundAudio(this.aBgClip);
    [this.mRabbit1.Control,this.mRabbit2.Control] = sceneParser.parseRabbits();
};

SaveRabbits.prototype.loadScene = function () {
    // 加载场景

    gEngine.TextFileLoader.loadTextFile(this.kMapXML,gEngine.TextFileLoader.eTextFileType.eXMLFile);
    gEngine.TextFileLoader.loadTextFile(this.kSpaceShipXML,gEngine.TextFileLoader.eTextFileType.eXMLFile);

    gEngine.Textures.loadTexture(this.rabTexture1);
    gEngine.Textures.loadTexture(this.rabTexture2);

    gEngine.Textures.loadTexture(this.kBullet);
    gEngine.Textures.loadTexture(this.kCircleTexture);
    gEngine.Textures.loadTexture(this.mapBackground);
    gEngine.Textures.loadTexture(this.cheattexture);
    gEngine.Textures.loadTexture(this.kParticle);
    gEngine.Textures.loadTexture(this.kPropellerTexture);
    gEngine.Textures.loadTexture(this.kPropellerFireTexture);
    gEngine.Textures.loadTexture(this.kDefenderTexture);
    gEngine.Textures.loadTexture(this.kStairsTexture);
    gEngine.Textures.loadTexture(this.kAdvanceControllerTexture);
    gEngine.Textures.loadTexture(this.kDefendControllerTexture);
    gEngine.Textures.loadTexture(this.kLeftAttackControllerTexture);
    gEngine.Textures.loadTexture(this.kRightAttackControllerTexture);
    gEngine.Textures.loadTexture(this.kGunBarrelTexture);
    gEngine.Textures.loadTexture(this.kGunBaseTexture);
    gEngine.Textures.loadTexture(this.sky);
    gEngine.Textures.loadTexture(this.kBloodBar);
    gEngine.Textures.loadTexture(this.bomb);       
    //gEngine.Textures.loadTexture(this.mapRigidtexture);
    
    //2
    gEngine.Textures.loadTexture(this.mapRigidtexture);
    gEngine.Textures.loadTexture(this.kWinDoor);    
    gEngine.Textures.loadTexture(this.kDoorTop);
    gEngine.Textures.loadTexture(this.kDoorBot);
    gEngine.Textures.loadTexture(this.kDoorSleeve);
    
    gEngine.Textures.loadTexture(this.kButton);
    gEngine.Textures.loadTexture(this.kCarrots);
    gEngine.Textures.loadTexture(this.goldcoin);
    gEngine.Textures.loadTexture(this.laserminion);
    gEngine.Textures.loadTexture(this.mapwall);
    
     ///audio
    gEngine.AudioClips.loadAudio(this.aBgClip);
    gEngine.AudioClips.loadAudio(this.aChooseCue);
    gEngine.AudioClips.loadAudio(this.aEnterCue);
    gEngine.AudioClips.loadAudio(this.aCoinCue);
    gEngine.AudioClips.loadAudio(this.aShootBulletCue);
    gEngine.AudioClips.loadAudio(this.aBoom_enemyCue);
    gEngine.AudioClips.loadAudio(this.aPropellerCue);
    gEngine.AudioClips.loadAudio(this.aWarningCue);
    gEngine.AudioClips.loadAudio(this.aBoomCue);
    gEngine.AudioClips.loadAudio(this.aLaserCue);
    
};

SaveRabbits.prototype.unloadScene = function () {
     //stop bg music
    gEngine.AudioClips.stopBackgroundAudio();
    // 卸载场景
        gEngine.LayerManager.cleanUp();
    
    gEngine.TextFileLoader.unloadTextFile(this.kSpaceShipXML);
    gEngine.TextFileLoader.unloadTextFile(this.kMapXML);
    gEngine.Textures.unloadTexture(this.rabTexture1);
    gEngine.Textures.unloadTexture(this.rabTexture2);
    gEngine.Textures.unloadTexture(this.kCircleTexture);
    gEngine.Textures.unloadTexture(this.mapBackground);
    gEngine.Textures.unloadTexture(this.cheattexture);
    gEngine.Textures.unloadTexture(this.kParticle);
    gEngine.Textures.unloadTexture(this.kPropellerTexture);
    gEngine.Textures.unloadTexture(this.kPropellerFireTexture);
    gEngine.Textures.unloadTexture(this.kDefenderTexture);
    gEngine.Textures.unloadTexture(this.kStairsTexture);
    gEngine.Textures.unloadTexture(this.kAdvanceControllerTexture);
    gEngine.Textures.unloadTexture(this.kDefendControllerTexture);
    gEngine.Textures.unloadTexture(this.kLeftAttackControllerTexture);
    gEngine.Textures.unloadTexture(this.kRightAttackControllerTexture);
    gEngine.Textures.unloadTexture(this.kGunBarrelTexture);
    gEngine.Textures.unloadTexture(this.kGunBaseTexture);
    gEngine.Textures.unloadTexture(this.sky);
    gEngine.Textures.unloadTexture(this.kBullet);
    gEngine.Textures.unloadTexture(this.kDoorTop);
    gEngine.Textures.unloadTexture(this.kDoorBot);
    gEngine.Textures.unloadTexture(this.kDoorSleeve);
    gEngine.Textures.unloadTexture(this.goldcoin); 
    gEngine.Textures.unloadTexture(this.kButton);
    gEngine.Textures.unloadTexture(this.kCarrots);
    gEngine.Textures.unloadTexture(this.kBloodBar);
    gEngine.Textures.unloadTexture(this.laserminion);   
    gEngine.Textures.unloadTexture(this.bomb);      
    gEngine.Textures.unloadTexture(this.mapwall);      
    //kWinDoor
    gEngine.Textures.unloadTexture(this.mapRigidtexture);
    gEngine.Textures.unloadTexture(this.kWinDoor);
    
      //audio
    gEngine.AudioClips.unloadAudio(this.aBgClip);
    gEngine.AudioClips.unloadAudio(this.aChooseCue);
    gEngine.AudioClips.unloadAudio(this.aEnterCue);
    gEngine.AudioClips.unloadAudio(this.aCoinCue);
    gEngine.AudioClips.unloadAudio(this.aShootBulletCue);
    gEngine.AudioClips.unloadAudio(this.aBoom_enemyCue);
    gEngine.AudioClips.unloadAudio(this.aPropellerCue);
    gEngine.AudioClips.unloadAudio(this.aWarningCue);
    gEngine.AudioClips.unloadAudio(this.aBoomCue);
    gEngine.AudioClips.unloadAudio(this.aLaserCue);
    
     if(this.win === true){
        var nextLevel = new winLevel();  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }
    if(this.lose ===true){
        var nextLevel = new loseLevel();  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }
        if(this.Menu === true){
        var nextLevel = new MenuLevel();
        gEngine.Core.startScene(nextLevel);
    }
    
};

SaveRabbits.prototype.update = function(){
    Scene.prototype.update.call(this);
    this.mRabbit1.update();
    this.mRabbit2.update();
    //gEngine.Physics.processObjSet(this.SpaceShip, this.mAllWalls);
    this.mAllBloodpacks.update();
    this.mAllBooms.update();
    this.mAllMinions.update();
    this.mAllDoors.update();
    
    //keyboard event
    if (this.winDoor.update(this.Cheat))
    {       this.win = true;
         gEngine.GameLoop.stop();
    }
    if (this.bloodBar.getBloodLen() <=0)
    {       this.lose= true;
         gEngine.GameLoop.stop();
    }
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)){
        this.Menu = true;
        gEngine.GameLoop.stop();
    }
//            if(gEngine.Input.isKeyClicked(gEngine.Input.keys.O)){
//        this.win = true;
//        gEngine.GameLoop.stop();
//    }
//            if(gEngine.Input.isKeyClicked(gEngine.Input.keys.P)){
//        this.lose = true;
//        gEngine.GameLoop.stop();
//    }


    //collision detection


    var i, j, k, m;
    var collided = false;
    var collisionInfo = new CollisionInfo();


    //door logic
    if (this.court <= 0) {
        for (i = 0; i < this.mAllButtons.size(); i++) {
            this.mAllButtons.getObjectAt(i).resetButton();
        }
        this.court = 20;
    }
    else {
        this.court--;
    }

    //spaceship bullet shoot the button
    for (i = 0; i < 4; i++) {
        var platBox = this.SpaceShip.getShipWeapon()[i].getProjectiles();
        for (j = 0; j < platBox.size(); j++) {
            var pp = platBox.getObjectAt(j).getRigidBody();
            for (m = 0; m < this.mAllButtons.size(); m++) {
                collided = this.mAllButtons.getObjectAt(m).getRigidBody().collisionTest(pp, collisionInfo);
                if (collided) {
                    this.mAllButtons.getObjectAt(m).pressButton();
                    platBox.removeFromSet(platBox.getObjectAt(j));
                }
            }
        }
    }
    //open the door
    var allUnlocked = false;
    for (i = 0; i < this.mAllButtons.size(); i++) {
        if (this.mAllButtons.getObjectAt(i).getButtonState() === true) {
            allUnlocked = true;
        } else {
            allUnlocked = false;
            break;
        }
    }
    if (allUnlocked) {
          //加门音频
        this.mAllDoors.getObjectAt(0).unlockDoor();
    }
    //reset all


    //minion bullet touch spaceship ship weapon bullet
    for (i = 0; i < 4; i++) {
        var platBox = this.SpaceShip.getShipWeapon()[i].getProjectiles();
        for (j = 0; j < platBox.size(); j++) {
            var pBox = platBox.getObjectAt(j).getRigidBody();
            for (k = 0; k < this.mAllMinions.size(); k++) {
                var p = this.mAllMinions.getObjectAt(k).getProjectiles();
                for (m = 0; m < p.size(); m++) {
                    var pp = p.getObjectAt(m).getRigidBody();
                    collided = pBox.collisionTest(pp, collisionInfo);
                    if (collided) {
                        platBox.removeFromSet(platBox.getObjectAt(j));
                        p.removeFromSet(p.getObjectAt(m));
                    }
                }
            }
        }
    }


    //minion bullet shoot the defender
    for (i = 0; i < this.mAllMinions.size(); i++) {
        var platBox = this.mAllMinions.getObjectAt(i).getProjectiles();
        for (j = 0; j < platBox.size(); j++) {
            var pBox = platBox.getObjectAt(j).getRigidBody();

            collided = this.SpaceShip.mDefender.getRigidBody().collisionTest(pBox, collisionInfo);
            if (collided) {
                platBox.removeFromSet(platBox.getObjectAt(j));
            }


        }
    }

    //minion bullets shoot the spaceship

    for (i = 0; i < this.mAllMinions.size(); i++) {
        var platBox = this.mAllMinions.getObjectAt(i).getProjectiles();
        for (j = 0; j < platBox.size(); j++) {
            var pBox = platBox.getObjectAt(j).getRigidBody();
            collided = this.Cheat.getRigidBody().collisionTest(pBox, collisionInfo);
            if (collided) {
                platBox.removeFromSet(platBox.getObjectAt(j));
                this.bloodBar.setBarlen(2);
            }
        }
    }


    //minion bullet shoot the walls
    for (i = 0; i < this.mAllMinions.size(); i++) {
        var platBox = this.mAllMinions.getObjectAt(i).getProjectiles();
        for (j = 0; j < platBox.size(); j++) {
            var pBox = platBox.getObjectAt(j).getRigidBody();
            for (m = 0; m < this.AllWalls.size(); m++) {
                collided = this.AllWalls.getObjectAt(m).getRigidBody().collisionTest(pBox, collisionInfo);
                if (collided) {
                    platBox.removeFromSet(platBox.getObjectAt(j));
                }
            }
        }
    }

    //minion bullet shoot the doors
    for (i = 0; i < this.mAllMinions.size(); i++) {
        var platBox = this.mAllMinions.getObjectAt(i).getProjectiles();
        for (j = 0; j < platBox.size(); j++) {
            var pBox = platBox.getObjectAt(j).getRigidBody();
            for (m = 0; m < this.mAllDoors.size(); m++) {
                collided = this.mAllDoors.getObjectAt(m).getRigidBody().collisionTest(pBox, collisionInfo);
                if (collided) {
                    platBox.removeFromSet(platBox.getObjectAt(j));
                }
            }

        }
    }

    //spaceship touch the walls
    for (i = 0; i < this.AllWalls.size(); i++) {
        var platBox = this.AllWalls.getObjectAt(i).getRigidBody();
        collided = this.Cheat.getRigidBody().collisionTest(platBox, collisionInfo);
        if (collided) {
            if (this.bloodcourt <= 1) {
                this.bloodBar.setBarlen(0.2);
                this.bloodcourt = 5;
                this.mCamera.shake(1, 1, 3, 5);
            }
            else {
                this.bloodcourt--;
            }
        }
    }

    //spaceship bullet shoot the walls
    for (i = 0; i < 4; i++) {
        var platBox = this.SpaceShip.getShipWeapon()[i].getProjectiles();
        for (j = 0; j < platBox.size(); j++) {
            var pp = platBox.getObjectAt(j).getRigidBody();
            for (m = 0; m < this.AllWalls.size(); m++) {
                collided = this.AllWalls.getObjectAt(m).getRigidBody().collisionTest(pp, collisionInfo);
                if (collided) {
                    platBox.removeFromSet(platBox.getObjectAt(j));
                }
            }
        }
    }

    //spaceship bullet shoot the doors
    for (i = 0; i < 4; i++) {
        var platBox = this.SpaceShip.getShipWeapon()[i].getProjectiles();
        for (j = 0; j < platBox.size(); j++) {
            var pp = platBox.getObjectAt(j).getRigidBody();
            for (m = 0; m < this.mAllDoors.size(); m++) {
                collided = this.mAllDoors.getObjectAt(m).getRigidBody().collisionTest(pp, collisionInfo);
                if (collided) {
                    platBox.removeFromSet(platBox.getObjectAt(j));
                }
            }
        }
    }

    //spaceship bullet shoot the minions
    for (i = 0; i < 4; i++) {
        var platBox = this.SpaceShip.getShipWeapon()[i].getProjectiles();
        for (j = 0; j < platBox.size(); j++) {
            var pp = platBox.getObjectAt(j).getRigidBody();
            for (m = 0; m < this.mAllMinions.size(); m++) {
                collided = this.mAllMinions.getObjectAt(m).getRigidBody().collisionTest(pp, collisionInfo);
                if (collided) {
                    this.mAllMinions.getObjectAt(m).HP -= platBox.getObjectAt(j).damage;
                    if (this.mAllMinions.getObjectAt(m).HP <= 0) {
                        gEngine.AudioClips.playACue(this.aBoom_enemyCue);
                        this.mAllobjs.removeFromSet(this.mAllMinions.getObjectAt(m));
                        this.mAllMinions.removeFromSet(this.mAllMinions.getObjectAt(m));
                    }
                    platBox.removeFromSet(platBox.getObjectAt(j));
                }
            }
        }
    }

    //coin spaceship
    for (i = 0; i < (this.mAllCoins.size() - 3); i++) {
        var platBox = this.mAllCoins.getObjectAt(i).getRigidBody();
        collided = this.Cheat.getRigidBody().collisionTest(platBox, collisionInfo);
        if (collided) {
            gEngine.AudioClips.playACue(this.aCoinCue);
            this.mAllobjs.removeFromSet(this.mAllCoins.getObjectAt(i));
            this.mAllCoins.removeFromSet(this.mAllCoins.getObjectAt(i));
            for(var i=0;i<=20;i++){
                            if(i ===20){
                                gEngine.AudioClips.playACue(this.aWarningCue);       
                        }
                    }
            this.produceMinions(2);
        }
    }


    //cabbot spaceship
    for (i = 0; i < this.mAllBloodpacks.size(); i++) {
        var platBox = this.mAllBloodpacks.getObjectAt(i).getRigidBody();
        collided = this.Cheat.getRigidBody().collisionTest(platBox, collisionInfo);
        if (collided) {
            gEngine.AudioClips.playACue(this.aCoinCue);
            this.mAllobjs.removeFromSet(this.mAllBloodpacks.getObjectAt(i));
            this.mAllBloodpacks.removeFromSet(this.mAllBloodpacks.getObjectAt(i));
            if (this.bloodBar.getBloodLen() + 10 > 36) {
                var deltabar = 36 - this.bloodBar.getBloodLen();
                this.bloodBar.setBarlen(-deltabar);
            }
            else {
                this.bloodBar.setBarlen(-10);
            }
        }
    }

    //bomb spaceship
    if(this.bloodBar.getBloodLen()<=0){
         gEngine.AudioClips.playACue(this.aBoomCue);
         this.lose = true;
         gEngine.GameLoop.stop();
        
    }
    for (i = 0; i < this.mAllBooms.size(); i++) {
        var platBox = this.mAllBooms.getObjectAt(i).getRigidBody();
        collided = this.Cheat.getRigidBody().collisionTest(platBox, collisionInfo);
        if (collided) {
            gEngine.AudioClips.playACue(this.aBoomCue);
            this.mAllobjs.removeFromSet(this.mAllBooms.getObjectAt(i));
            this.mAllBooms.removeFromSet(this.mAllBooms.getObjectAt(i));
            this.bloodBar.setBarlen(7);
        }
    }



    var collisionInfo = new CollisionInfo();
    gEngine.Physics.processCollision(this.mAllobjs,collisionInfo);  

    var Pos = this.Cheat.getXform().getPosition();
            //coin chase the camera   
    var delta = 0;
    for(var i = (this.mAllCoins.size()-3) ; i<this.mAllCoins.size() ; i++)
    {
        this.mAllCoins.getObjectAt(i).getXform().setPosition(Pos[0]-48+delta,Pos[1]+29);
        delta+=5;
    }
    
    this.bloodBar.update(this.Cheat);
    this.mCamera.setWCCenter(Pos[0],Pos[1]);
    this.mMiniCamera.setWCCenter(Pos[0],Pos[1]);
    this.mCamera.update();
    this.mMiniCamera.update();
    this.SpaceShip.update(this.mRabbit1,this.mRabbit2,this.Cheat);

};

SaveRabbits.prototype.draw = function(){
    //Scene.prototype.draw.call(this);



    gEngine.Core.clearCanvas([0, 0, 0, 1]);


        
    this.mCamera.setupViewProjection();
    this.AllWalls.draw(this.mCamera);
    this.map.draw(this.mCamera);
    
    this.mapWaW.draw(this.mCamera);
    this.mAllDoors.draw(this.mCamera);
    this.mAllButtons.draw(this.mCamera);

    this.mAllMinions.draw(this.mCamera);

    this.winDoor.draw(this.mCamera);  
    this.SpaceShip.draw(this.mCamera,this.Cheat);
    this.mAllParticles.draw(this.mCamera);
    this.mRabbit1.draw(this.mCamera);
    this.mRabbit2.draw(this.mCamera);
    this.bloodBar.draw(this.mCamera);
    this.mAllBloodpacks.draw(this.mCamera);
    this.mAllBooms.draw(this.mCamera);
 
    
    for(var i = 0 ; i<3 ; i++)
    {
    this.mAllCoins.getObjectAt(i).draw(this.mCamera);
    }
    
   
   // gEngine.LayerManager.drawAllLayers(this.mCamera);

    this.mMiniCamera.setupViewProjection();
    this.AllWalls.draw(this.mMiniCamera);
    this.mAllDoors.draw(this.mMiniCamera);
    this.map.draw(this.mMiniCamera);
    this.mapWaW.draw(this.mMiniCamera);
    this.mAllButtons.draw(this.mMiniCamera);
    this.mAllMinions.draw(this.mMiniCamera);
    this.mAllParticles.draw(this.mMiniCamera);
    this.SpaceShip.draw(this.mMiniCamera,this.Cheat);
    this.mRabbit1.draw(this.mMiniCamera);
    this.mRabbit2.draw(this.mMiniCamera);
    this.mAllBloodpacks.draw(this.mMiniCamera);
    this.mAllBooms.draw(this.mMiniCamera);
        for(var i = 0 ; i<(this.mAllCoins.size()-3) ; i++)
    {
    this.mAllCoins.getObjectAt(i).draw(this.mMiniCamera);
    }
   // gEngine.LayerManager.drawAllLayers(this.mMiniCamera);
};


SaveRabbits.prototype.produceMinions = function(num){

    var Pos = this.Cheat.getXform().getPosition();
    var radius = this.Cheat.getRigidBody().getRadius();
    var x,y,texture,w,h,Cheat,m;
    var rot = Math.random() * Math.PI * 2;
    for (var i=0;i<num;i++)
    {
          x = Pos[0] + 2 * radius * Math.cos(rot);
        y = Pos[1] + 2 * radius  *Math.sin(rot);
        m = new FireMinion(x, y,  this.cheattexture, 7, 7 , this.Cheat);
        this.mAllMinions.addToSet(m);
          rot += 2 * Math.PI/num;
    }
};
