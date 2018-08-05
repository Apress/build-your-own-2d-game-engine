"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Level0 () {
    this.kBaby = "assets/pictures/Baby.png";
    this.kComp = "assets/pictures/Competitor.png";
    this.kBgClip = "assets/sounds/BGClip.mp3";
    this.kFood = "assets/pictures/food.png";
    this.kBoom = "assets/pictures/boom.png";
    this.kBlackhole = "assets/pictures/Blackhole.png";
    this.kCue = "assets/sounds/cue.wav";
    this.kEat = "assets/sounds/eat.wav";
    
    this.mHero = null;
    this.mtime = 240;
    
    this.foodtime = 600;
    this.splittime = 600;
    this.spittime = 600;
    this.comptime = 600;
    this.boomtime = 600;
    this.blackholetime = 300;
    
    this.mAllComps = null;
    this.mAllHeros = null;
    this.mAllSpitBall = null;
    this.mAllFood = null;
    this.mAllBoom = null;
    this.mAllBlackhole = null;
    
    this.centerX = null;
    this.centerY = null;

    this.mCamera = null;
    this.mMinimap = null;
    this.mMinitxt = null;
    this.mClock = null;
    this.mTime = null;
    this.mBobWeight = null;

    this.skipTime = null;
    this.wFlag = false;
    this.sFlag = false;
    this.dFlag = false;
    this.aFlag = false;
    this.controlFlag = false;
    this.foodFlag = false;
    this.spaceFlag = false;
    this.spacespitFlag = false;
    this.spitFlag = false;
    this.compFlag = false;
    this.boomFlag = false;
    this.blackFlag = false;
    this.splitFlag = false;
    this.weight = 50;

    //判断是否被吃掉
    this.mRestart = false;

    //判断应该跳转到哪个界面，1：level1, 2: level2, 3: level3, 4: level win, 5: level loose
    this.tag = 0;
}

gEngine.Core.inheritPrototype(Level0, Scene);


Level0.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBaby);
    gEngine.Textures.loadTexture(this.kComp);
    gEngine.Textures.loadTexture(this.kFood);
    gEngine.Textures.loadTexture(this.kBoom);
    gEngine.Textures.loadTexture(this.kBlackhole);
    
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kEat);
    gEngine.AudioClips.loadAudio(this.kCue);
};


Level0.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();
    gEngine.Textures.unloadTexture(this.kBaby);
    gEngine.Textures.unloadTexture(this.kComp);
    gEngine.Textures.unloadTexture(this.kFood);
    gEngine.Textures.unloadTexture(this.kBoom);
    gEngine.Textures.unloadTexture(this.kBlackhole); 

    gEngine.AudioClips.unloadAudio(this.kBgClip);
    gEngine.AudioClips.unloadAudio(this.kEat);
    gEngine.AudioClips.unloadAudio(this.kCue);

    if (this.mRestart === true) {
        var nextLevel;  // next level to be loaded
        switch(this.tag)
        {
            case 1:
                nextLevel = new Level1();
                break;
            case 2:
                nextLevel = new Level2();
                break;
            case 4:
                nextLevel = new End("assets/pictures/win.png", 0);
                break;
            case 5:
                nextLevel = new End("assets/pictures/fail.png", 1);
                break;
        }
        gEngine.Core.startScene(nextLevel);
    }
};


Level0.prototype.initialize = function () {
    document.getElementById('info').innerText = "Follow the instructions to learn how to play the game! ";
    this.width = 800;
    this.height = 600;
    this.centerX = 0;
    this.centerY = 0;
    this.mTime = 180;
    this.skipTime = 180;
    this.mClock = new Clock(this.mTime);

    //新建摄像机
    this.mCamera = new Camera(
        vec2.fromValues(this.centerX, this.centerY),
        128,
        [0, 0, this.width, this.height]
    );
    this.mCamera.setBackgroundColor([0.902, 0.839, 0.725, 1]);

    //新建Minimap
    this.mMinimap = new Camera(
        vec2.fromValues(0, 0),
        512,
        [this.width - 128, this.height - 128, 128, 128]
    );
    this.mMinimap.setBackgroundColor([0.922, 0.894, 0.843, 1]);
    //新建minitxt

    // x position of bottom-left corner of the area to be drawn
    // y position of bottom-left corner of the area to be drawn
    // width of the area to be drawn
    // height of the area to be drawn

    this.mMinitxt = new Camera(
        vec2.fromValues(0, 0),
        512,
        [-80, 540, 256, 128]
    );

    this.mMinitxt.setBackgroundColor([0.902, 0.839, 0.725, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    this.mBobWeight = 10;
    this.mAllHeros = new GameObjectSet();
    this.mHero = new Hero(this.kBaby, 10, this.centerX, this.centerY);
    this.mAllHeros.addToSet(this.mHero);

    this.mAllComps = new GameObjectSet();

    this.mAllFood = new GameObjectSet();

    this.mAllBlackhole = new GameObjectSet();

    this.mAllBoom = new GameObjectSet();

    this.mAllSpitBall = new GameObjectSet();
    
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
    this.mMsg = new FontRenderable(" ");
    this.mMsg.setColor([0, 0, 0, 0.5]);
    this.mMsg.getXform().setPosition(-55, 20);
    this.mMsg.setTextHeight(4);
    var msg = "Press W,S,A,D or Up,Down,Left,Right to Control!";
    this.mMsg.setText(msg);
    
    this.mMsgx = new FontRenderable(" ");
    this.mMsgx.setColor([0, 0, 0, 0.5]);
    this.mMsgx.getXform().setPosition(-55, 20);
    this.mMsgx.setTextHeight(4);
};


Level0.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

    //画 mCamera
    this.mCamera.setupViewProjection();
    this.mMsg.draw(this.mCamera);
    this.mMsgx.draw(this.mCamera);
    this.mAllHeros.draw(this.mCamera);
    this.mAllComps.draw(this.mCamera);
    this.mAllBoom.draw(this.mCamera);
    this.mAllFood.draw(this.mCamera);
    this.mAllBlackhole.draw(this.mCamera);
    this.mAllSpitBall.draw(this.mCamera);
    //画 mMinimap
    this.mMinimap.setupViewProjection();
    this.mAllComps.draw(this.mMinimap);
    this.mAllHeros.draw(this.mMinimap);
    this.mAllBoom.draw(this.mMinimap);
    this.mAllFood.draw(this.mMinimap);
    this.mAllBlackhole.draw(this.mMinimap);
    this.mAllSpitBall.draw(this.mMinimap);

    //txt
    //this.mMinitxt.setupViewProjection();
};


Level0.prototype.cameraUpdate = function () {
    this.centerX = 0;
    this.centerY = 0;

    var maxX = this.mAllHeros.getObjectAt(0).getXform().getXPos(),
        minX = this.mAllHeros.getObjectAt(0).getXform().getXPos(),
        maxY = this.mAllHeros.getObjectAt(0).getXform().getYPos(),
        minY = this.mAllHeros.getObjectAt(0).getXform().getYPos(),
        maxR = this.mAllHeros.getObjectAt(0).getHeroRadius();

    for (let i = 0; i < this.mAllHeros.size(); i++) {
        this.centerX += this.mAllHeros.getObjectAt(i).getXform().getXPos();
        this.centerY += this.mAllHeros.getObjectAt(i).getXform().getYPos();

        if (this.mAllHeros.getObjectAt(i).getHeroRadius() > maxR) {
            maxR = this.mAllHeros.getObjectAt(i).getHeroRadius();
        }
        if (this.mAllHeros.getObjectAt(i).getXform().getXPos() > maxX) {
            maxX = this.mAllHeros.getObjectAt(i).getXform().getXPos();
        }
        if (this.mAllHeros.getObjectAt(i).getXform().getXPos() < minX) {
            minX = this.mAllHeros.getObjectAt(i).getXform().getXPos();
        }
        if (this.mAllHeros.getObjectAt(i).getXform().getYPos() > maxY) {
            maxY = this.mAllHeros.getObjectAt(i).getXform().getYPos();
        }
        if (this.mAllHeros.getObjectAt(i).getXform().getXPos() < minY) {
            minY = this.mAllHeros.getObjectAt(i).getXform().getYPos();
        }
    }
    this.centerX /= this.mAllHeros.size();
    this.centerY /= this.mAllHeros.size();

    const deltaX = Math.max(maxX - this.centerX, this.centerX - minX);
    const deltaY = Math.max(maxY - this.centerY, this.centerY - minY);
    const delta = Math.max(2 * deltaY / 3 * 4, 2 * deltaX, Math.pow(maxR, 0.5) * 20);

    if (delta > 98) {
        this.mCamera.setWCWidth(delta + 30);
    } else {
        this.mCamera.setWCWidth(128);
    }

    if (this.centerY >= -256 + 37.5 && this.centerY <= 256 - 37.5) {
        if (this.centerX >= -256 + 50 && this.centerX <= 256 - 50) {
            this.mCamera.setWCCenter(this.centerX, this.centerY);
        } else {
            this.mCamera.setWCCenter(this.mCamera.getWCCenter()[0], this.centerY);
        }
    } else if (this.centerX >= -256 + 50 && this.centerX <= 256 - 50) {
        this.mCamera.setWCCenter(this.centerX, this.mCamera.getWCCenter()[1]);
    }
};

Level0.prototype.controlUpdate = function () {
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W) || gEngine.Input.isKeyPressed(gEngine.Input.keys.Up))
        this.wFlag = true;
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A) || gEngine.Input.isKeyPressed(gEngine.Input.keys.Left))
        this.aFlag = true;
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S) || gEngine.Input.isKeyPressed(gEngine.Input.keys.Down))
        this.sFlag = true;
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D) || gEngine.Input.isKeyPressed(gEngine.Input.keys.Right))
        this.dFlag = true;
    if(this.wFlag && this.aFlag && this.sFlag && this.dFlag)
        this.controlFlag = true;
};

Level0.prototype.foodUpdate = function () {
    //男主吃食物
    var food;
    if(this.controlFlag === true){
        for (let i = 0; i < this.mAllHeros.size(); i++) {
            var hero = this.mAllHeros.getObjectAt(i);
            for (let j = 0; j < this.mAllFood.size(); j++) {
                food = this.mAllFood.getObjectAt(j);
                if (Math.sqrt(Math.pow(hero.getXform().getXPos() - food.getXform().getXPos(), 2) + Math.pow(hero.getXform().getYPos() - food.getXform().getYPos(), 2)) < hero.getHeroRadius() + food.getFoodRadius()) {
                    gEngine.AudioClips.playACue(this.kCue); //播放cue声音
                    hero.incWeight(food.getWeight());
                    this.mAllFood.removeFromSet(food);
                    this.foodFlag = true;
                }
            }
        }
    }
};

Level0.prototype.heroUpdate = function () {
    //分裂
    if(this.splitFlag === true){
        var mNewHero = null;
        var mHeroSetLengthNow = this.mAllHeros.size();
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
            if (mHeroSetLengthNow <= 8) {
                for (var j = 0; j < mHeroSetLengthNow; j++) {
                    var obj = this.mAllHeros.getObjectAt(j);
                    var mHeroWeight = obj.getWeight() / 2;
                    if (mHeroWeight >= 10) {
                        obj.incWeight(-mHeroWeight);
                        var mHeroPosX = obj.getXform().getXPos();
                        var mHeroPosY = obj.getXform().getYPos();
                        var mHeroSize = obj.getXform().getWidth();
                        var mHeroVx = obj.getVX();
                        var mHeroVy = obj.getVY();
                        var mAcceleration = 60;
                        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W) || gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)){
                            if(gEngine.Input.isKeyPressed(gEngine.Input.keys.A) || gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)){
                                var mNewHero = new Hero(this.kBaby, mHeroWeight, mHeroPosX - (mHeroSize/Math.sqrt(2)/2), mHeroPosY + (mHeroSize/Math.sqrt(2)/2));
                                mNewHero.setVX(-mAcceleration/Math.sqrt(2));
                                mNewHero.setVY(mAcceleration/Math.sqrt(2));
                            }
                            else if(gEngine.Input.isKeyPressed(gEngine.Input.keys.D) || gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)){
                                var mNewHero = new Hero(this.kBaby, mHeroWeight, mHeroPosX + (mHeroSize/Math.sqrt(2)/2), mHeroPosY + (mHeroSize/Math.sqrt(2)/2));
                                mNewHero.setVX(mAcceleration/Math.sqrt(2));
                                mNewHero.setVY(mAcceleration/Math.sqrt(2));
                            }
                            else{
                                var mNewHero = new Hero(this.kBaby, mHeroWeight, mHeroPosX, mHeroPosY + (mHeroSize/2));
                                mNewHero.setVX(mHeroVx);
                                mNewHero.setVY(mAcceleration);
                            }
                        }
                        else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S) || gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)){
                            if(gEngine.Input.isKeyPressed(gEngine.Input.keys.A) || gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)){
                                var mNewHero = new Hero(this.kBaby, mHeroWeight, mHeroPosX - (mHeroSize/Math.sqrt(2)/2), mHeroPosY - (mHeroSize/Math.sqrt(2)/2));
                                mNewHero.setVX(-mAcceleration/Math.sqrt(2));
                                mNewHero.setVY(-mAcceleration/Math.sqrt(2));
                            }
                            else if(gEngine.Input.isKeyPressed(gEngine.Input.keys.D) || gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)){
                                var mNewHero = new Hero(this.kBaby, mHeroWeight, mHeroPosX + (mHeroSize/Math.sqrt(2)/2), mHeroPosY - (mHeroSize/Math.sqrt(2)/2));
                                mNewHero.setVX(mAcceleration/Math.sqrt(2));
                                mNewHero.setVY(-mAcceleration/Math.sqrt(2));
                            }
                            else{
                                var mNewHero = new Hero(this.kBaby, mHeroWeight, mHeroPosX, mHeroPosY - (mHeroSize/2));
                                mNewHero.setVX(mHeroVx);
                                mNewHero.setVY(-mAcceleration);
                            }
                        }
                        else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A) || gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)){
                            var mNewHero = new Hero(this.kBaby, mHeroWeight, mHeroPosX - (mHeroSize/2), mHeroPosY);
                            mNewHero.setVX(-mAcceleration);
                            mNewHero.setVY(mHeroVy);
                        }
                        else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D) || gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)){
                            var mNewHero = new Hero(this.kBaby, mHeroWeight, mHeroPosX + (mHeroSize/2), mHeroPosY);
                            mNewHero.setVX(+mAcceleration);
                            mNewHero.setVY(mHeroVy);
                        }
                        else {
                            var mNewHero = new Hero(this.kBaby, mHeroWeight, mHeroPosX + (mHeroSize/4), mHeroPosY);
                            obj.getXform().setPosition(mHeroPosX - (mHeroSize/4), mHeroPosY);
                            mNewHero.setVX(mAcceleration/2);
                            mNewHero.setVY(mHeroVy);
                            obj.setVX(-mAcceleration/2);
                            obj.setVY(mHeroVy);
                        }
                        this.mAllHeros.addToSet(mNewHero);
                        this.spaceFlag = true;
                    }
                    if(this.mAllHeros.size() >= 8) {
                        break;
                    }
                }
            }
        }
    }    
    //聚合
    var info = new CollisionInfo();
    for (let i = 0; i < this.mAllHeros.size(); i++) {
        var objI = this.mAllHeros.getObjectAt(i);
        for (let j = i + 1; j < this.mAllHeros.size(); j++) {
            var objJ = this.mAllHeros.getObjectAt(j);
            if (objI.getRigidBody().collisionTest(objJ.getRigidBody(), info)) {
                this.mAllHeros.removeFromSet(objJ);
                j--;
                objI.incWeight(objJ.getWeight());
            }
        }
    }
 //吐球
    if(this.spacespitFlag === true){
        var mSpitball = null;
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.C)){
            for(var i = 0; i < this.mAllHeros.size(); i++){
                var obj = this.mAllHeros.getObjectAt(i);
                if(obj.getWeight() > 15){
                    var Vx = obj.getVX();
                    var Vy = obj.getVY();
                    var mHeroPosX = obj.getXform().getXPos();
                    var mHeroPosY = obj.getXform().getYPos();
                    var mHeroSize = obj.getXform().getWidth();
                    var DirectionX = Vx/Math.sqrt(Vx*Vx+Vy*Vy);
                    var DirectionY = Vy/Math.sqrt(Vx*Vx+Vy*Vy);
                    mSpitball = new Spitball(this.kFood, (mHeroPosX + DirectionX * (mHeroSize/2 + 2)), (mHeroPosY + DirectionY * (mHeroSize/2 + 2)), DirectionX, DirectionY);
                    obj.incWeight(-mSpitball.getWeight());
                    this.mAllSpitBall.addToSet(mSpitball);
                }
            }
            this.spitFlag = true;
        }        
    }
 
 //吃小球
    var spitball;
    for (let i = 0; i < this.mAllHeros.size(); i++) {
        var hero = this.mAllHeros.getObjectAt(i);
        for (let j = 0; j < this.mAllSpitBall.size(); j++) {
            spitball = this.mAllSpitBall.getObjectAt(j);
            if (Math.sqrt(Math.pow(hero.getXform().getXPos()-spitball.getXform().getXPos(),2)+Math.pow(hero.getXform().getYPos()-spitball.getXform().getYPos(),2)) < hero.getHeroRadius()+spitball.getSpitballRadius()) {
                gEngine.AudioClips.playACue(this.kCue); //播放cue声音
                hero.incWeight(spitball.getWeight());
                this.mAllSpitBall.removeFromSet(spitball);
            }
        }
    }
};

Level0.prototype.detectCollision = function(){
    //碰到敌人
    if(this.spitFlag === true){
    var info = new CollisionInfo();
        for(let j=0; j<this.mAllComps.size(); j++){
            for (let i = 0; i < this.mAllHeros.size(); i++) {
                var hero = this.mAllHeros.getObjectAt(i);
                var comp = this.mAllComps.getObjectAt(j);
                if (hero.getRigidBody().collisionTest(comp.getRigidBody(), info)) {
                    if(hero.radius > comp.radius){
                        hero.incWeight(comp.getWeight());
                        this.mAllComps.removeFromSet(comp);
                        j--;    //从set中删除后在下一轮循环下标会加1，因此提前减1
                        if(this.mBobWeight >= this.weight && this.mAllComps.size() === 0){
                            this.mRestart = true;
                            this.tag = 2;
                            gEngine.AudioClips.stopBackgroundAudio();
                            gEngine.GameLoop.stop();
                        }
                    }else if(hero.radius < comp.radius){
                        comp.incWeight(hero.getWeight());
                        this.mAllHeros.removeFromSet(hero);
                        i--;
                    }
                    this.compFlag = true;
                }
            }
        }
    }
};

Level0.prototype.boomUpdate = function() {
    var info = new CollisionInfo();
    if(this.compFlag === true){
        for(let i = 0; i < this.mAllHeros.size(); i++){
            var hero = this.mAllHeros.getObjectAt(i);
            for(let j = 0; j < this.mAllBoom.size(); j++){
                var boom = this.mAllBoom.getObjectAt(j);
                if(hero.getWeight() > boom.getWeight()){
                    if(hero.getRigidBody().collisionTest(boom.getRigidBody(), info)){
                        this.mAllBoom.removeFromSet(boom);
                        hero.incWeight(20);
                        var heroboom = hero.getWeight()/9;
                        hero.incWeight(-(8 * heroboom));
                        var heroSize = hero.getHeroRadius();
                        var heroPosX = hero.getXform().getXPos();
                        var heroPosY = hero.getXform().getYPos();
                        var heroVX = hero.getVX();
                        var heroVY = hero.getVY();
                        var mAcceleration = 40;
                        var mNewHero = null;
                        //左上
                        mNewHero = new Hero(this.kBaby, heroboom, heroPosX - heroSize/Math.sqrt(2), heroPosY + heroSize/Math.sqrt(2));
                        mNewHero.setVX(heroVX - mAcceleration/Math.sqrt(2));
                        mNewHero.setVY(heroVY + mAcceleration/Math.sqrt(2));
                        this.mAllHeros.addToSet(mNewHero);
                        //上
                        mNewHero = new Hero(this.kBaby, heroboom, heroPosX, heroPosY + heroSize);
                        mNewHero.setVX(heroVX);
                        mNewHero.setVY(heroVY + mAcceleration);
                        this.mAllHeros.addToSet(mNewHero);
                        //右上
                        mNewHero = new Hero(this.kBaby, heroboom, heroPosX + heroSize/Math.sqrt(2), heroPosY + heroSize/Math.sqrt(2));
                        mNewHero.setVX(heroVX + mAcceleration/Math.sqrt(2));
                        mNewHero.setVY(heroVY + mAcceleration/Math.sqrt(2));
                        this.mAllHeros.addToSet(mNewHero);
                        //左
                        mNewHero = new Hero(this.kBaby, heroboom, heroPosX - heroSize, heroPosY);
                        mNewHero.setVX(heroVX - mAcceleration);
                        mNewHero.setVY(heroVY);
                        this.mAllHeros.addToSet(mNewHero);
                        //右
                        mNewHero = new Hero(this.kBaby, heroboom, heroPosX + heroSize, heroPosY);
                        mNewHero.setVX(heroVX + mAcceleration);
                        mNewHero.setVY(heroVY);
                        this.mAllHeros.addToSet(mNewHero);
                        //左下
                        mNewHero = new Hero(this.kBaby, heroboom, heroPosX - heroSize/Math.sqrt(2), heroPosY - heroSize/Math.sqrt(2));
                        mNewHero.setVX(heroVX - mAcceleration/Math.sqrt(2));
                        mNewHero.setVY(heroVY - mAcceleration/Math.sqrt(2));
                        this.mAllHeros.addToSet(mNewHero);
                        //下
                        mNewHero = new Hero(this.kBaby, heroboom, heroPosX, heroPosY - heroSize);
                        mNewHero.setVX(heroVX);
                        mNewHero.setVY(heroVY - mAcceleration);
                        this.mAllHeros.addToSet(mNewHero);
                        //右下
                        mNewHero = new Hero(this.kBaby, heroboom, heroPosX + heroSize/Math.sqrt(2), heroPosY - heroSize/Math.sqrt(2));
                        mNewHero.setVX(heroVX + mAcceleration/Math.sqrt(2));
                        mNewHero.setVY(heroVY - mAcceleration/Math.sqrt(2));
                        this.mAllHeros.addToSet(mNewHero);                   
                        this.boomFlag = true;
                    }
                }
            }
        }
    }
};

Level0.prototype.BlackholeUpdate = function(){
    var info = new CollisionInfo();
    if(this.boomFlag === true){
        for(let i = 0; i < this.mAllHeros.size(); i++){
            var hero = this.mAllHeros.getObjectAt(i);
            for(let j = 0; j < this.mAllBlackhole.size(); j++){
                var blackhole = this.mAllBlackhole.getObjectAt(j);
                if (hero.getRigidBody().collisionTest(blackhole.getRigidBody(), info)) {
                    var allCollision = false;
                    for(let t = 0; t < this.mAllHeros.size(); t++){
                        var chero = this.mAllHeros.getObjectAt(t);
                        if (!(chero.getRigidBody().collisionTest(blackhole.getRigidBody(), info))){
                            allCollision = false;
                            break;
                        }
                        allCollision = true;
                    }
                    if(allCollision === true){
                        var transPosX = Math.random() * 430 - 215;
                        var transPosY = Math.random() * 430 - 215;
                        for(let t = 0; t < this.mAllHeros.size(); t++){
                            var chero = this.mAllHeros.getObjectAt(t);
                            chero.getXform().setPosition(transPosX, transPosY);
                            chero.setControl(false);
                        }
                        this.blackholeFlag = true;
                        this.outControl = false;
                        break;
                    }
                    hero.setVX(0);
                    hero.setVY(0.3);
                    hero.setControl(true);
                    this.outControl = true;
                    for(let k = 0; k < this.mAllHeros.size(); k++){
                        var otherhero = this.mAllHeros.getObjectAt(k);
                        if(otherhero.getControl() === true)
                            continue;
                        otherhero.setControl(true);
                        var mheroPosX = hero.getXform().getXPos();
                        var mheroPosY = hero.getXform().getYPos();
                        var otherHeroPosX = otherhero.getXform().getXPos();
                        var otherHeroPosY = otherhero.getXform().getYPos();
                        var mAcceleration = 40;
                        var otherHeroVx = (mheroPosX - otherHeroPosX) / Math.sqrt(Math.pow(mheroPosX - otherHeroPosX, 2) + Math.pow(mheroPosY - otherHeroPosY, 2));
                        var otherHeroVy = (mheroPosY - otherHeroPosY) / Math.sqrt(Math.pow(mheroPosX - otherHeroPosX, 2) + Math.pow(mheroPosY - otherHeroPosY, 2));
                        otherhero.getRigidBody().setVelocity(mAcceleration * otherHeroVx, mAcceleration * otherHeroVy);
                        otherhero.setVX(mAcceleration * otherHeroVx);
                        otherhero.setVY(mAcceleration * otherHeroVy);
                    }
                }
            }
        }
    }
};


Level0.prototype.update = function () {
    this.cameraUpdate();    //更新摄像机大小、中心位置
    this.mCamera.update();
    this.mMinimap.update();
    this.mMinitxt.update();

    gEngine.Physics.processCollision(this.mAllHeros, this.mCollisionInfos);
    gEngine.Physics.processCollision(this.mAllComps, this.mCollisionInfos);

    this.foodUpdate();      //判断食物是否被吃、更新食物
    this.heroUpdate();      //hero 分裂、聚合
    this.boomUpdate();
    this.detectCollision(); //判断hero、comp是否碰撞
    this.BlackholeUpdate();
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.K)){
        this.skipTime -= 1;
    }else{
        this.skipTime = 120;
    }

    if(this.skipTime === 0){
        this.mRestart = true;
        this.tag = 1;
        gEngine.AudioClips.stopBackgroundAudio();
        gEngine.GameLoop.stop();
    }

    this.controlUpdate();
    if(this.blackholeFlag === true){
        this.blackholetime -= 1;
        if(this.blackholetime === 0){
            this.mRestart = true;
            this.tag = 1;
            gEngine.AudioClips.stopBackgroundAudio();
            gEngine.GameLoop.stop();
        }
    }
    else if(this.boomFlag === true){
        this.boomtime -= 1;
        if(this.boomtime === 0){
            for(let i = 0; i < this.mAllHeros.size(); i++){
                this.mAllHeros.removeFromSet(this.mAllHeros.getObjectAt(i));
                i--;
            }
            if(this.mAllBlackhole.size() !== 0){
                for(let i = 0; i < this.mAllBlackhole.size(); i++){
                    this.mAllBlackhole.removeFromSet(this.mAllBlackhole.getObjectAt(i));
                    i--;
                }
            }
            this.mHero = new Hero(this.kBaby, 20, 0, 0);
            this.mAllHeros.addToSet(this.mHero);
            var newblackhole = new Blackhole(this.kBlackhole);
            newblackhole.setWeight(20);
            newblackhole.getXform().setPosition(50, 0);
            this.mAllBlackhole.addToSet(newblackhole);
            this.mMsg.getXform().setPosition(-55, 30);
            var msg = "Go into the Blackhole, you will be Transfered";
            var msgx = " to the Random Position!"
            this.mMsgx.setText(msgx);
            this.mMsg.setText(msg);
            this.boomtime = 300;
        }
    }
    else if(this.compFlag === true){
        this.comptime -= 1;
        if(this.comptime === 0){
            for(let i = 0; i < this.mAllHeros.size(); i++){
                this.mAllHeros.removeFromSet(this.mAllHeros.getObjectAt(i));
                i--;
            }
            if(this.mAllBoom.size() !== 0){
                for(let i = 0; i < this.mAllBoom.size(); i++){
                    this.mAllBoom.removeFromSet(this.mAllBoom.getObjectAt(i));
                    i--;
                }
            }
            this.mHero = new Hero(this.kBaby, 40, 0, 0);
            this.mAllHeros.addToSet(this.mHero);
            var newboom = new Boom(this.kBoom);
            newboom.setWeight(20);
            newboom.getXform().setPosition(50, 0);
            this.mAllBoom.addToSet(newboom);
            var msg = "Eating Boom will Make you Split into 9 Parts! ";
            this.mMsg.setText(msg);
            this.comptime = 600;
        }
    }
    else if(this.spitFlag === true){
        this.spittime -= 1;
        if(this.spittime === 0){
            for(let i = 0; i < this.mAllHeros.size(); i++){
                this.mAllHeros.removeFromSet(this.mAllHeros.getObjectAt(i));
                i--;
            }
            if(this.mAllComps.size() !== 0){
                for(let i = 0; i < this.mAllComps.size(); i++){
                    this.mAllComps.removeFromSet(this.mAllComps.getObjectAt(i));
                    i--;
                }
            }
            this.mHero = new Hero(this.kBaby, 50, 0, 0);
            this.mAllHeros.addToSet(this.mHero);
            var competitor = new Competitor(this.kComp);
            competitor.getXform().setPosition(50, 0);
            competitor.setWeight(20);
            this.mAllComps.addToSet(competitor);
            this.mMsg.getXform().setPosition(-55, 20);
            var msg = "Defeat the Competitor Smaller than you! ";
            var msgx = " ";
            this.mMsgx.setText(msgx);
            this.mMsg.setText(msg);
            this.spittime = 600;
        }
    }
    else if(this.spaceFlag === true){
        this.splittime -= 1;
        if(this.splittime === 0){
            this.spacespitFlag = true;
            for(let i = 0; i < this.mAllHeros.size(); i++){
                this.mAllHeros.removeFromSet(this.mAllHeros.getObjectAt(i));
                i--;
            }
            this.mHero = new Hero(this.kBaby, 50, 0, 0);
            this.mAllHeros.addToSet(this.mHero);
            this.mMsg.getXform().setPosition(-38, 30);
            this.mMsgx.getXform().setPosition(-33, 20);
            var msg = "Click C to Spit to the Direction";
            var msgx = " of your Ball's Velocity! ";
            this.mMsgx.setText(msgx);
            this.mMsg.setText(msg);
            this.splittime = 600;
        }
    }
    else if(this.foodFlag === true){
        this.foodtime -= 1;
        if(this.foodtime === 0){
            this.mAllHeros.removeFromSet(this.mHero);
            this.mHero = new Hero(this.kBaby, 40, 0, 0);
            this.mAllHeros.addToSet(this.mHero);
            this.mMsg.getXform().setPosition(-55, 20);
            var msg = "Click Space to Split to the Direction you Press! ";
            this.mMsg.setText(msg);
            this.foodtime = 600;
            this.splitFlag = true;
        }
    }
    else if(this.controlFlag === true){
        this.mtime -= 1;
        if(this.mtime === 0){
            this.mHero.getXform().setPosition(0 , 0);
            for(let i = 0; i < 8; i++){
                var newFood = new Food(this.kFood);
                newFood.getXform().setPosition(20 * (i + 1), 0);
                this.mAllFood.addToSet(newFood);
            }
            this.mMsg.getXform().setPosition(-30, 20);
            var msg = "Eat Food to Get Bigger! ";
            this.mMsg.setText(msg);
            this.mtime = 600;
            this.spaceFlag = false;
        }
    }

    this.mAllHeros.update(this.centerX, this.centerY);  //hero 的键盘响应以及自动聚合
    this.mAllComps.updateSpitball();
    this.mAllSpitBall.updateSpitball();
    this.mAllBoom.updateSpitball();
    this.mAllBlackhole.updateSpitball();
};
