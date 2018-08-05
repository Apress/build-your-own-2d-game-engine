

/* global gEngine, Scene, MyScene, vec2, gManager */

function NewPlayerLevel() {
    this.kSpaceShipXML = "assets/SpaceShip.xml";
    this.kMapXML = "assets/Map.xml";
    this.mapBackground = "assets/SKY2.png";
    this.mapRigidtexture = "assets/mapRigidTexture.png";
    this.cheattexture = "assets/enemy.png";
    this.kParticle = "assets/jetpack.png";
    this.kPropellerTexture = "assets/Propeller.png";
    this.kPropellerFireTexture = "assets/Propeller_fire.png";
    this.kDefenderTexture = "assets/defender.png";
    this.rabTexture1 = "assets/RabbitAnimation.png";
    this.rabTexture2 = "assets/RabbitAnimation.png";
    this.kCircleTexture = "assets/ball.png";
    this.kStairsTexture = "assets/stairs.png";
    this.kAdvanceControllerTexture = "assets/advance_controller.png";
    this.kDefendControllerTexture = "assets/defend_controller.png";
    this.kLeftAttackControllerTexture = "assets/left_attack_controller.png";
    this.kRightAttackControllerTexture = "assets/right_attack_controller.png";
    this.kGunBarrelTexture = "assets/gun_barrel.png";
    this.kGunBaseTexture = "assets/gun_base.png";
    this.kTips1Texture = "assets/Tip1.png";
    this.kTips2Texture = "assets/Tip2.png";
    this.kTips3Texture = "assets/Tip3.png";
    this.kTip4Texture = "assets/Tip4.png";
    this.kcoinTexture = "assets/gold_1.png";
    this.kwindoorTexture = "assets/heart3.png";
    this.khighlightTexture = "assets/highlight.png";
    this.kCarrots = "assets/carrot.png";
    this.kBloodBar = "assets/bloodbar3.png";
    
    //audio
    
    this.aBgClip = "assets/sounds/bgClip.mp3";
    this.aChooseCue = "assets/sounds/choose.mp3";
    this.aEnterCue = "assets/sounds/focus.mp3";
    this.aCoinCue  = "assets/sounds/coin.mp3";
    this.aShootBulletCue = "assets/sounds/shoot.mp3";
    this.aBoom_enemyCue=  "assets/sounds/boom_enemy.mp3";
    this.aPropellerCue = "assets/sounds/propeller_fire.mp3";
    
    this.mAllParticles = new ParticleGameObjectSet();
    this.kTipsTexture =[this.kTips1Texture,this.kTips2Texture,this.kTips3Texture,this.kTip4Texture];
    this.mAllMinions = new GameObjectSet();
    this.mAllObjs = new GameObjectSet ();
    this.highlight = new GameObjectSet();
    this.showTip =1;
    this.mCamera = null;
    this.mMiniCamera = null;
    this.mBarCamera = null;
    this.CoinCamera = null;
    this.bloodBar = null;
    this.Cheat = null;
    this.SpaceShip = null;
    this.mRabbit1 = null;
    this.mRabbit2 = null;
    this.mTips = null;
    this.coin = null;
    this.windoor = null;
    this.bloodBar = null;
    this.mBgTexture = null;
    this.map = null;
    this.minioncourt = 1;
    this.coincourt = 1;
    this.windoorcourt = 1;
    this.highlightstate = 0;
    this.coinset = new GameObjectSet();
    //场景切换
    this.Menu =false;

    this.cueCount = 1;

 
}

gEngine.Core.inheritPrototype(NewPlayerLevel, Scene);

NewPlayerLevel.prototype.initialize = function () {
    Scene.prototype.initialize.call(this);
    var sceneParser = new SceneFileParser(this.kMapXML);
    //this.mCamera = sceneParser.parseCamera();
    [this.mCamera, this.mMiniCamera, this.mBarCamera, this.CoinCamera] = sceneParser.parseCamera();
    
    this.mCamera = new Camera(
        vec2.fromValues(100, 400), // position of the camera
        140,                        // width of camera
        [0, 0, 1280, 720],         // viewport (orgX, orgY, width, height)
    );
    this.mMiniCamera = new Camera(
        vec2.fromValues(100, 400), // position of the camera
        240,                        // width of camera
        [19.2,19.2, 121.6, 121.6],         // viewport (orgX, orgY, width, height)
    );
    this.mMiniCamera.setBackgroundColor([0.5, 0.5, 0.5, 1]);
    
    
    this.Cheat = new Cheatobject(80, 500, this.kCircleTexture, 32, 32);
    this.map = sceneParser.parseMapBackground(this.mapBackground);
    sceneParser = new SceneFileParser(this.kSpaceShipXML);
    this.SpaceShip = new SpaceShip(100,400,this.Cheat,this.kPropellerTexture,this.kPropellerFireTexture,this.kDefenderTexture,this.kStairsTexture,
                                    this.kAdvanceControllerTexture,this.kDefendControllerTexture,this.kLeftAttackControllerTexture
                                            ,this.kRightAttackControllerTexture,this.kGunBarrelTexture,this.kGunBaseTexture);
          
    this.SpaceShip.SpaceShipMap = sceneParser.parseSpaceShipMap();

    this.mRabbit1 = new Rabbit(this.SpaceShip,this.rabTexture1,-4.5,0,[0,512]);
    this.mRabbit2 = new Rabbit(this.SpaceShip,this.rabTexture2,1,0,[0,362]);
    [this.mRabbit1.Control, this.mRabbit2.Control] = sceneParser.parseRabbits();
  
    var shipPos = this.Cheat.getXform().getPosition();
    this.mTips1Texture = new Tips(this.kTipsTexture[0],shipPos);
    this.mTips2Texture = new Tips(this.kTipsTexture[1],shipPos);
    shipPos = [shipPos[0]-60,shipPos[1]];
    this.mTips3Texture = new Tips(this.kTipsTexture[2],shipPos);
    this.mTips4Texture = new Tips(this.kTipsTexture[3],shipPos);
    
    this.mTips = new FontRenderable("Hello");
    this.mTips.setColor([0, 0, 0, 1]);
    this.mTips.getXform().setSize(40,20);
    this.mTips.getXform().setPosition(105, 430);
    this.mTips.setTextHeight(2);
    
    this.coin = new Coin(10,10,10,this.kcoinTexture);
    this.coinset.addToSet(this.coin);
    this.windoor = new WinDoor(10,10,15,15,this.kwindoorTexture);
    
    var highlight1 = new Wall(10,10,7,7,0,this.khighlightTexture);
    var highlight2 = new Wall(10,10,7,7,0,this.khighlightTexture);
    var highlight3 = new Wall(10,10,7,7,0,this.khighlightTexture);
    var highlight4 = new Wall(10,10,7,7,0,this.khighlightTexture);
    var highlight5 = new Wall(10,10,7,7,0,this.khighlightTexture);
    var highlight6 = new Wall(10,10,7,7,0,this.khighlightTexture);
    this.highlight.addToSet(highlight1);
    this.highlight.addToSet(highlight2);
    this.highlight.addToSet(highlight3);
    this.highlight.addToSet(highlight4);
    this.highlight.addToSet(highlight5);
    this.highlight.addToSet(highlight6);
    
    this.bloodBar = new BloodBar(40,250,4,40,this.kBloodBar,this.kCarrots);
        
    //var showminion = new FireMinion(this.Cheat);
    //audio
    gEngine.AudioClips.playBackgroundAudio(this.aBgClip);
    
};
NewPlayerLevel.prototype.loadScene = function () {
    // Load scene
    gEngine.TextFileLoader.loadTextFile(this.kMapXML, gEngine.TextFileLoader.eTextFileType.eXMLFile);
    gEngine.TextFileLoader.loadTextFile(this.kSpaceShipXML, gEngine.TextFileLoader.eTextFileType.eXMLFile);
    gEngine.Textures.loadTexture(this.rabTexture1);
    gEngine.Textures.loadTexture(this.rabTexture2);
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
    gEngine.Textures.loadTexture(this.kTipsTexture[0]);
    gEngine.Textures.loadTexture(this.kTipsTexture[1]);
    gEngine.Textures.loadTexture(this.kTipsTexture[2]);
    gEngine.Textures.loadTexture(this.kTipsTexture[3]);
    gEngine.Textures.loadTexture(this.kcoinTexture);
    gEngine.Textures.loadTexture(this.kwindoorTexture);
    gEngine.Textures.loadTexture(this.khighlightTexture);
    gEngine.Textures.loadTexture(this.kCarrots);
    gEngine.Textures.loadTexture(this.kBloodBar);
    //gEngine.Textures.loadTexture(this.mapRigidtexture);
 ///audio
    gEngine.AudioClips.loadAudio(this.aBgClip);
    gEngine.AudioClips.loadAudio(this.aChooseCue);
    gEngine.AudioClips.loadAudio(this.aEnterCue);
    gEngine.AudioClips.loadAudio(this.aCoinCue);
    gEngine.AudioClips.loadAudio(this.aShootBulletCue);
    gEngine.AudioClips.loadAudio(this.aBoom_enemyCue);
    gEngine.AudioClips.loadAudio(this.aPropellerCue);

};

NewPlayerLevel.prototype.unloadScene = function () {
    
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
    gEngine.Textures.unloadTexture(this.kTipsTexture[0]);
    gEngine.Textures.unloadTexture(this.kTipsTexture[1]);
    gEngine.Textures.unloadTexture(this.kTipsTexture[2]);
    gEngine.Textures.unloadTexture(this.kTipsTexture[3]);
    gEngine.Textures.unloadTexture(this.kcoinTexture);
    gEngine.Textures.unloadTexture(this.kwindoorTexture);
    gEngine.Textures.unloadTexture(this.khighlightTexture);
    gEngine.Textures.unloadTexture(this.kCarrots);
    gEngine.Textures.unloadTexture(this.kBloodBar);
    
     //audio
    gEngine.AudioClips.unloadAudio(this.aBgClip);
    gEngine.AudioClips.unloadAudio(this.aChooseCue);
    gEngine.AudioClips.unloadAudio(this.aEnterCue);
    gEngine.AudioClips.unloadAudio(this.aCoinCue);
    gEngine.AudioClips.unloadAudio(this.aShootBulletCue);
    gEngine.AudioClips.unloadAudio(this.aBoom_enemyCue);
    gEngine.AudioClips.unloadAudio(this.aPropellerCue);

    if(this.Menu === true){
        var nextLevel = new MenuLevel();
        gEngine.Core.startScene(nextLevel);
    }
};

NewPlayerLevel.prototype.update = function () {

    this.mCamera.update();
    this.mMiniCamera.update();
    Scene.prototype.update.call(this);
    //gEngine.Physics.processObjSet(this.SpaceShip, this.mAllWalls);
    this.SpaceShip.update(this.mRabbit1, this.mRabbit2, this.Cheat);
    var shipPos = this.Cheat.getXform().getPosition();
//     this.mTips1Texture.update(shipPos);
    this.mRabbit1.update();
    this.mRabbit2.update();
    this.bloodBar.update(this.Cheat);
    
    //next tip
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)){
        gEngine.AudioClips.playACue(this.aEnterCue);
        if(this.showTip<8)
        this.showTip++;
    }
    if(gEngine.Input.isKeyClicked((gEngine.Input.keys.Q))){
        
        this.Menu = true;
        gEngine.GameLoop.stop();
    }
    if((this.showTip === 3)&&gEngine.Input.isKeyClicked((gEngine.Input.keys.G))){
        this.showTip++;
    }
    if((this.showTip === 3)&&gEngine.Input.isKeyClicked((gEngine.Input.keys.Dian))){
        this.showTip++;
    }
    
    
    if (this.windoor.update(this.Cheat))
    {       this.Menu = true;
         gEngine.GameLoop.stop();
    }

  
    
            var i,j,k,m;
    var collided = false;
    var collisionInfo = new CollisionInfo();
    
    //spaceship touch the coin
    for( i =0 ;i<this.coinset.size();i++){
                var platBox = this.coinset.getObjectAt(i).getRigidBody();
                collided = this.Cheat.getRigidBody().collisionTest(platBox, collisionInfo);
                if (collided) {
                    //if(this.cueCount){
                            gEngine.AudioClips.playACue(this.aCoinCue);
//                            this.cueCount = 0;
                       // }
                            this.mAllObjs.removeFromSet(this.coin);
                            this.coinset.removeFromSet(this.coin);
                            
//                            this.showTip++;
                }
            } 
                
            //minion bullet shoot the defender 
        for(i=0 ; i<this.mAllMinions.size();i++){
        var platBox = this.mAllMinions.getObjectAt(i).getProjectiles();
        for (j = 0; j < platBox.size(); j++) {
            var pBox = platBox.getObjectAt(j).getRigidBody();
                
                collided = this.SpaceShip.mDefender.getRigidBody().collisionTest(pBox, collisionInfo);
                if (collided) {
                    
                    //gEngine.AudioClips.playACue(this.aShootBulletCue);
                    platBox.removeFromSet(platBox.getObjectAt(j));
//                    this.showTip++;
                }
                
        
        }   
    }
    
        //minion bullets shoot the spaceship
    if(this.bloodBar.getBloodLen()<=0){
         gEngine.AudioClips.playACue(this.aBoom_enemyCue);
         this.Menu = true;
         gEngine.GameLoop.stop();
        
    }
        for(i=0 ; i<this.mAllMinions.size();i++){
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
        
                //spaceship bullet shoot the minions
        for (i = 0; i < 4; i++) {
        var platBox = this.SpaceShip.getShipWeapon()[i].getProjectiles();
        for(j=0 ; j<platBox.size();j++){
        var pp = platBox.getObjectAt(j).getRigidBody();
        for (m = 0; m < this.mAllMinions.size(); m++) {
                collided = this.mAllMinions.getObjectAt(m).getRigidBody().collisionTest(pp, collisionInfo);
                if (collided) {     
                            //gEngine.AudioClips.playACue(this.aShootBulletCue);
                            this.mAllMinions.getObjectAt(m).HP -= platBox.getObjectAt(j).damage;
                            if (this.mAllMinions.getObjectAt(m).HP <= 0)
                            {
                                gEngine.AudioClips.playACue(this.aBoom_enemyCue);

                                //
                                this.mAllMinions.removeFromSet(this.mAllMinions.getObjectAt(m));
                                
                                this.showTip++;
                            }
                            platBox.removeFromSet(platBox.getObjectAt(j));
                        }
                    }   
                }
            }
    
            
            
    
    this.shipPos = this.Cheat.getXform().getPosition();
    
    this.highlight.getObjectAt(0).getXform().setPosition(this.shipPos[0]+9,this.shipPos[1]+8);
    this.highlight.getObjectAt(1).getXform().setPosition(this.shipPos[0]-1,this.shipPos[1]+1);
    this.highlight.getObjectAt(2).getXform().setPosition(this.shipPos[0]-13,this.shipPos[1]+1); 
    this.highlight.getObjectAt(3).getXform().setPosition(this.shipPos[0]+13,this.shipPos[1]+1); 
    this.highlight.getObjectAt(4).getXform().setPosition(this.shipPos[0]-2,this.shipPos[1]+13); 
    this.highlight.getObjectAt(5).getXform().setPosition(this.shipPos[0]+1,this.shipPos[1]-12); 
        if(this.showTip === 7 &&this.coincourt)
    {
        //gEngine.AudioClips.playACue(this.aCoinCue);
        
        this.mAllObjs.addToSet(this.coin);
        this.coin.getXform().setPosition(shipPos[0]+30,shipPos[1]-30);
        this.coincourt--;
    }
    
    if(this.showTip === 8 &&this.windoorcourt)
    {
        this.mAllObjs.addToSet(this.windoor);
        this.windoor.winDoor.getXform().setPosition(shipPos[0]+30,shipPos[1]-30);
        this.windoorcourt--;
    }
        if(this.showTip === 4 &&this.minioncourt)
    {
        this.produceMinions(1);
        this.minioncourt--;
    }
    
    this.mCamera.setWCCenter(this.shipPos[0], this.shipPos[1]);
    this.mAllMinions.update();
    this.showTipsTexture(this.showTip,'update');
    this.mMiniCamera.setWCCenter(this.shipPos[0], this.shipPos[1]);
};

NewPlayerLevel.prototype.draw = function () {
    //Scene.prototype.draw.call(this);
    gEngine.Core.clearCanvas([0, 0, 0, 1]);

    this.mCamera.setupViewProjection();
    this.map.draw(this.mCamera);
    this.mAllObjs.draw(this.mCamera);
    this.mAllMinions.draw(this.mCamera);
    this.mAllParticles.draw(this.mCamera);
    this.bloodBar.draw(this.mCamera);
    this.SpaceShip.draw(this.mCamera, this.Cheat);
    this.mRabbit1.draw(this.mCamera);
    this.mRabbit2.draw(this.mCamera);

    this.showTipsTexture(this.showTip,'draw');
    this.showTips(this.showTip);
    switch(this.highlightstate){
            case 0:
                break;
            case 1:
                 this.highlight.getObjectAt(0).draw(this.mCamera);
                break;
            case 2:
                this.highlight.getObjectAt(2).draw(this.mCamera);
                this.highlight.getObjectAt(3).draw(this.mCamera);
                this.highlight.getObjectAt(4).draw(this.mCamera);
                this.highlight.getObjectAt(5).draw(this.mCamera);
                break;
            case 3:
                 this.highlight.getObjectAt(1).draw(this.mCamera);
                break;
        }
    
    // gEngine.LayerManager.drawAllLayers(this.mCamera);
//    this.mMiniCamera.setupViewProjection();
//    this.mAllParticles.draw(this.mMiniCamera);
//    this.SpaceShip.draw(this.mMiniCamera, this.Cheat);
//    this.mRabbit1.draw(this.mMiniCamera);
//    this.mRabbit2.draw(this.mMiniCamera);
//    gEngine.LayerManager.drawAllLayers(this.mMiniCamera);
};

NewPlayerLevel.prototype.setText = function (text,posX,posY){
    this.mTips.setText(text);
    this.mTips.getXform().setPosition(posX, posY);
    this.mTips.draw(this.mCamera);
};
NewPlayerLevel.prototype.showTipsTexture = function(showTips,op){
    if(op==="draw"){
        switch(showTips){
            case 1:
            case 2:
                 this.mTips1Texture.draw(this.mCamera);
                 break;
            case 3:
            case 4:
                this.mTips1Texture.draw(this.mCamera);
                break;
            case 5:
                 this.mTips1Texture.draw(this.mCamera);
                 break;
            case 6:
                 this.mTips3Texture.draw(this.mCamera);
                 break;
            case 7:
                this.mTips1Texture.draw(this.mCamera);
                break;
            case 8:
                 this.mTips4Texture.draw(this.mCamera);
                 break;
        }
    }
    else{
        switch(showTips){
            case 1:
            case 2:
                 this.mTips1Texture.getXform().setPosition(this.shipPos[0]+45, this.shipPos[1]+25);
                 break;
            case 3:
            case 4:
                this.mTips1Texture.getXform().setPosition(this.shipPos[0]+45, this.shipPos[1]+25);
                break;
            case 5:
                 this.mTips1Texture.getXform().setPosition(this.shipPos[0]+45, this.shipPos[1]+25);
                 break;
            case 6:
                 this.mTips3Texture.getXform().setPosition(this.shipPos[0]-40, this.shipPos[1]+25);
                 break;
            case 7:
                this.mTips1Texture.getXform().setPosition(this.shipPos[0]+45, this.shipPos[1]+25);
                break;
            case 8:
                 this.mTips4Texture.getXform().setPosition(this.shipPos[0]-45, this.shipPos[1]+25);
                 break;
        }
    }
}

NewPlayerLevel.prototype.showTips = function (showTips){
    switch(showTips){
        case 1: 
            this.setText("Hello, welcome to the game,'Save",this.shipPos[0]+25,this.shipPos[1]+33);
            this.setText("Rabbits', I'm Dr.Rabbit. let me",this.shipPos[0]+25,this.shipPos[1]+30);
            this.setText("show you how to play the game!",this.shipPos[0]+25,this.shipPos[1]+27);
            this.setText("Press [ENTER] to continue...",this.shipPos[0]+25,this.shipPos[1]+24);
            this.highlightstate = 0;
            break;
        case 2:
            this.setText("Move in the spaceship:",this.shipPos[0]+25,this.shipPos[1]+33);
            this.setText("[W,A,S,D] for player 1",this.shipPos[0]+25,this.shipPos[1]+30);
            this.setText("[Up,Left,Down,Right] for player 2",this.shipPos[0]+25,this.shipPos[1]+27);
            this.setText("",this.shipPos[0]+25,this.shipPos[1]+24);
            this.setText("press [ENTER] to continue...",this.shipPos[0]+25,this.shipPos[1]+21);
            this.highlightstate = 0;
            break;
        case 3:
            this.setText("Move to the position of the highlight area:",this.shipPos[0]+23,this.shipPos[1]+33);
            this.setText("[G] to gain or lose control for p1",this.shipPos[0]+23,this.shipPos[1]+30);
            this.setText("[.] to gain or lose control for p2",this.shipPos[0]+23,this.shipPos[1]+27);
            this.setText("",this.shipPos[0]+25,this.shipPos[1]+24);
            this.setText("Press [ENTER] to continue..",this.shipPos[0]+25,this.shipPos[1]+21);
            this.setText("",this.shipPos[0]+25,this.shipPos[1]+18);
            this.highlightstate = 1;
            break;
        case 4:
            
            this.setText("Use defender towards the minion:",this.shipPos[0]+25,this.shipPos[1]+33);
            this.setText("[A,D] to rotate for player 1",this.shipPos[0]+25,this.shipPos[1]+30);
            this.setText("[Left,Right] to rotate for player 2",this.shipPos[0]+25,this.shipPos[1]+27);
            this.setText("",this.shipPos[0]+25,this.shipPos[1]+24);
            this.setText("Press [ENTER] to continue..",this.shipPos[0]+25,this.shipPos[1]+21);
            this.setText("",this.shipPos[0]+25,this.shipPos[1]+18);
            this.highlightstate = 0;
            break;
        case 5:
            this.setText("Use weapons to kill the minion:",this.shipPos[0]+25,this.shipPos[1]+33);
            this.setText("gain the control and rotate it",this.shipPos[0]+25,this.shipPos[1]+30);
            this.setText("[F] to shoot bullets for p1",this.shipPos[0]+25,this.shipPos[1]+27);
            this.setText("[,] to shoot bullets for p2" ,this.shipPos[0]+25,this.shipPos[1]+24);
            this.setText("press [ENTER] to continue..",this.shipPos[0]+25,this.shipPos[1]+21);
            this.setText("",this.shipPos[0]+25,this.shipPos[1]+18);
            this.highlightstate = 2;
            break;
        case 6:
            this.setText("Use Propeller to move the spaceship:",this.shipPos[0]-60,this.shipPos[1]+33);
            this.setText("gain control and rotate it",this.shipPos[0]-60,this.shipPos[1]+30);
            this.setText("      [F] to start Propeller for p1",this.shipPos[0]-60,this.shipPos[1]+27);
            this.setText("          [,] to start Propeller " ,this.shipPos[0]-60,this.shipPos[1]+24);
            this.setText("          for p2",this.shipPos[0]-60,this.shipPos[1]+21);
            this.setText("        press [ENTER] to continue..",this.shipPos[0]-60,this.shipPos[1]+18);
            this.highlightstate = 3;
            break;
        case 7:
            this.setText("Travel in the space:",this.shipPos[0]+25,this.shipPos[1]+35);
            this.setText("You should collect coins",this.shipPos[0]+25,this.shipPos[1]+32);
            this.setText("before passing the level",this.shipPos[0]+25,this.shipPos[1]+29);
            this.setText("",this.shipPos[0]+25,this.shipPos[1]+26);
            this.setText("press [ENTER] to continue..",this.shipPos[0]+25,this.shipPos[1]+23);
            this.highlightstate = 0;
            break;
        case 8:
            this.setText("Move and go to the door:",this.shipPos[0]-65,this.shipPos[1]+35);
            this.setText("If you have collected all the coins",this.shipPos[0]-65,this.shipPos[1]+32);
            this.setText("You can pass the level",this.shipPos[0]-65,this.shipPos[1]+29);
            this.setText("Let's go!" ,this.shipPos[0]-65,this.shipPos[1]+26);
            this.setText("",this.shipPos[0]-65,this.shipPos[1]+23);
            this.highlightstate = 0;
            break;
    }
}


NewPlayerLevel.prototype.produceMinions = function(num){

    //加一个音频
    var Pos = this.Cheat.getXform().getPosition();
    var radius = this.Cheat.getRigidBody().getRadius();
    var x,y,texture,w,h,Cheat,m;
    var rot = Math.random() * Math.PI * 2;
    for (var i=0;i<num;i++)
    {
            x = Pos[0] + 2 * radius * Math.cos(rot);
            y = Pos[1] + 2 * radius *Math.sin(rot);
            m = new FireMinion(x, y,  this.cheattexture, 7, 7 , this.Cheat);
            this.mAllMinions.addToSet(m);
            rot += 2 * Math.PI/num;
    }
};