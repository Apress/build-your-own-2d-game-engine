"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Level1() {
    this.kBaby = "assets/pictures/Baby.png";
    this.kComp = "assets/pictures/Competitor.png";
    this.kBgClip = "assets/sounds/BGClip.mp3";
    this.kFood = "assets/pictures/food.png";
    this.kBoom = "assets/pictures/boom.png";
    this.kLevel = "assets/pictures/level1.png"
    this.kCue = "assets/sounds/cue.wav";
    this.kEat = "assets/sounds/eat.wav";

    this.mAllComps = null;
    this.mAllHeros = null;
    this.mAllSpitBall = null;
    this.mAllFood = null;
    this.mAllBoom = null;

    this.centerX = null;
    this.centerY = null;

    this.mCamera = null;
    this.mMinimap = null;
    this.mMinitxt = null;
    this.mClock = null;
    this.mTime = null;

    this.mClockLag = null;
    this.flag = false;

    this.mBobWeight = null;

    this.weight = 50;
    this.minValue = 6400;//80*80

    //判断是否被吃掉
    this.mRestart = false;

    //判断应该跳转到哪个界面，1：level1, 2: level2, 3: level3, 4: level win, 5: level loose
    this.tag = 0;
}

gEngine.Core.inheritPrototype(Level1, Scene);


Level1.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBaby);
    gEngine.Textures.loadTexture(this.kComp);
    gEngine.Textures.loadTexture(this.kFood);
    gEngine.Textures.loadTexture(this.kBoom);
    gEngine.Textures.loadTexture(this.kLevel);

    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kEat);
    gEngine.AudioClips.loadAudio(this.kCue);
};


Level1.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();
    gEngine.Textures.unloadTexture(this.kBaby);
    gEngine.Textures.unloadTexture(this.kComp);
    gEngine.Textures.unloadTexture(this.kFood);
    gEngine.Textures.unloadTexture(this.kBoom);
    gEngine.Textures.unloadTexture(this.kLevel);

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
            case 3:
                nextLevel = new Level3();
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


Level1.prototype.initialize = function () {
    document.getElementById('info').innerText = "Success conditions: weight more than 50 and defeat one competitor";
    this.width = 800;
    this.height = 600;
    this.centerX = 0;
    this.centerY = 0;
    this.mTime = 200;
    this.mClock = new Clock(this.mTime);
    this.mClockLag = new Clock(2);

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
    this.mAllHeros.addToSet(new Hero(this.kBaby, 10, this.centerX, this.centerY));


    this.mAllComps = new GameObjectSet();
    for (let i = 0; i < 1; i++) {
        this.mAllComps.addToSet(new Competitor(this.kComp));
    }

    this.mAllFood = new GameObjectSet();
    for (let i = 0; i < this.weight * 2; i++) {
        this.mAllFood.addToSet(new Food(this.kFood));
    }

    this.mAllBoom = new GameObjectSet();
    for(let i = 0; i < 5; i++){
        this.mAllBoom.addToSet(new Boom(this.kBoom));
    }
    this.mAllSpitBall = new GameObjectSet();
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
    this.mMsg = new FontRenderable(" ");
    this.mMsg.setColor([0, 0, 0, 0.5]);
    this.mMsg.getXform().setPosition(-45, -30);
    this.mMsg.setTextHeight(50);

    this.mMsgTime = new FontRenderable(" ");
    this.mMsgTime.setColor([0, 0, 0, 0.5]);
    this.mMsgTime.getXform().setPosition(-45, -80);
    this.mMsgTime.setTextHeight(50);

    //放置Level1
    this.mDye = new SpriteRenderable(this.kLevel);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(0, 0);
    this.mDye.getXform().setSize(128, 96);
    this.mDye.setElementPixelPositions(0, 800, 0, 600);

};


Level1.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);
    this.mCamera.setupViewProjection();
    if(this.flag === false){
        this.mDye.draw(this.mCamera);
    }else {
        //画 mCamera

        this.mAllComps.draw(this.mCamera);
        this.mAllHeros.draw(this.mCamera);
        this.mAllBoom.draw(this.mCamera);
        this.mAllFood.draw(this.mCamera);
        this.mAllSpitBall.draw(this.mCamera);
        //画 mMinimap
        this.mMinimap.setupViewProjection();
        this.mAllComps.draw(this.mMinimap);
        this.mAllHeros.draw(this.mMinimap);
        // this.mAllBoom.draw(this.mMinimap);
        this.mAllFood.draw(this.mMinimap);
        this.mAllSpitBall.draw(this.mMinimap);

        //txt
        this.mMinitxt.setupViewProjection();
        this.mMsg.draw(this.mMinitxt);
        this.mMsgTime.draw(this.mMinitxt);
    }
};


Level1.prototype.cameraUpdate = function () {
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


Level1.prototype.heroUpdate = function () {
    //聚合
    var info = new CollisionInfo();
    for (let i = 0; i < this.mAllHeros.size(); i++) {
        var objI = this.mAllHeros.getObjectAt(i);
        for (let j = i + 1; j < this.mAllHeros.size(); j++) {
            var objJ = this.mAllHeros.getObjectAt(j);
            if (objI.getRigidBody().collisionTest(objJ.getRigidBody(), info)) {
                this.mAllHeros.removeFromSet(objJ);
                objI.incWeight(objJ.getWeight());
                j--;
            }
        }
    }
 //吐球
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
    //分裂
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
                        mNewHero.setVY(0);
                        obj.setVX(-mAcceleration/2);
                        obj.setVY(0);
                    }
                    this.mAllHeros.addToSet(mNewHero);
                }
                if(this.mAllHeros.size() >= 8) {
                    break;
                }
            }
        }
    }

};

Level1.prototype.boomUpdate = function() {
    var info = new CollisionInfo();
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
                }
            }
        }
    }
};

Level1.prototype.foodUpdate = function () {
    //男主吃食物
    var food;
    for (let i = 0; i < this.mAllHeros.size(); i++) {
        var hero = this.mAllHeros.getObjectAt(i);
        for (let j = 0; j < this.mAllFood.size(); j++) {
            food = this.mAllFood.getObjectAt(j);
            if (Math.sqrt(Math.pow(hero.getXform().getXPos() - food.getXform().getXPos(), 2) + Math.pow(hero.getXform().getYPos() - food.getXform().getYPos(), 2)) < hero.getHeroRadius() + food.getFoodRadius()) {
                gEngine.AudioClips.playACue(this.kCue); //播放cue声音
                hero.incWeight(food.getWeight());
                if (hero.getWeight() >= this.weight && this.mAllComps.size() === 0) {
                    this.mRestart = true;
                    this.tag = 2;

                    gEngine.GameLoop.stop();
                }
                food.setPos();
            }
        }
    }

    // 敌人吃食物
    for (let i = 0; i < this.mAllComps.size(); i++) {
        var comp = this.mAllComps.getObjectAt(i);
        for (let j = 0; j < this.mAllFood.size(); j++) {
            food = this.mAllFood.getObjectAt(j);
            if (Math.sqrt(Math.pow(comp.getXform().getXPos() - food.getXform().getXPos(), 2) + Math.pow(comp.getXform().getYPos() - food.getXform().getYPos(), 2)) < comp.getCompetitorRadius() + food.getFoodRadius()) {
                comp.incWeight(food.getWeight());
                food.setPos();
            }
        }
        comp.update();
    }
    //敌人吃小球
    for (let i = 0; i < this.mAllComps.size(); i++) {
        var comp = this.mAllComps.getObjectAt(i);
        for (let j = 0; j < this.mAllSpitBall.size(); j++) {
            var spitball = this.mAllSpitBall.getObjectAt(j);
            if (Math.sqrt(Math.pow(comp.getXform().getXPos() - spitball.getXform().getXPos(), 2) + Math.pow(comp.getXform().getYPos() - spitball.getXform().getYPos(), 2)) < comp.getCompetitorRadius() + spitball.getSpitballRadius()) {
                gEngine.AudioClips.playACue(this.kCue); //播放cue声音
                comp.incWeight(spitball.getWeight());
                this.mAllSpitBall.removeFromSet(spitball);
            }
        }
    }
};

Level1.prototype.calculateMinFood = function(posX, posY){
    var px, py, res=0;
    var minValue = 900000;
    for(let i=0; i<this.mAllFood.size(); i++){
        px = this.mAllFood.getObjectAt(i).getXform().getXPos();
        py = this.mAllFood.getObjectAt(i).getXform().getYPos();
        var tmp = Math.pow(posX-px, 2) + Math.pow(posY-py, 2);
        if(tmp < minValue){
            minValue = tmp;
            res = i;
        }
    }
    return [this.mAllFood.getObjectAt(res).getXform().getXPos(), this.mAllFood.getObjectAt(res).getXform().getYPos()];
};


Level1.prototype.dectectMinHero = function(posX, posY, radius){
    var px, py, res=-1;
    var minValue = this.minValue;

    //找到距离我最近的hero
    for(let i=0; i<this.mAllHeros.size(); i++){
        px = this.mAllHeros.getObjectAt(i).getXform().getXPos();
        py = this.mAllHeros.getObjectAt(i).getXform().getYPos();
        var tmp = Math.pow(posX-px, 2) + Math.pow(posY-py, 2);
        if(tmp < minValue){
            minValue = tmp;
            res = i;
        }
    }

    // 警戒范围内无hero
    if(res === -1){
        try{
            return this.calculateMinFood(posX, posY);
        }catch(err){
            console.log(err);
            return [0,0];
        }
    }else{
        px = this.mAllHeros.getObjectAt(res).getXform().getXPos();
        py = this.mAllHeros.getObjectAt(res).getXform().getYPos();
        var hero = this.mAllHeros.getObjectAt(res);
        if(hero.getHeroRadius() >= radius){
            //反方向的跑
            return [posX*2-px, posY*2-py];
        }else{
            //追着hero跑
            return [px,py];
        }
    }
};


Level1.prototype.compUpdate = function () {
    for(let i=0; i < this.mAllComps.size(); i++){
        var posX = this.mAllComps.getObjectAt(i).getXform().getXPos();
        var posY = this.mAllComps.getObjectAt(i).getXform().getYPos();
        var radius = this.mAllComps.getObjectAt(i).getCompetitorRadius();
        var pos = this.dectectMinHero(posX, posY,radius);
        var dir = this.mAllComps.getObjectAt(i).discreteDirection(pos);
        this.mAllComps.getObjectAt(i).changePicture(dir);
        GameObject.prototype.compUpdate.call(this.mAllComps.getObjectAt(i));
    }
};


Level1.prototype.detectCollision = function(){
    //碰到敌人
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

                if(this.mAllHeros.size() === 0){
                    this.mRestart = true;
                    this.tag = 5;
                    gEngine.AudioClips.stopBackgroundAudio();
                    gEngine.GameLoop.stop();
                }
            }
        }
    }
    if(this.mAllComps.size() === 0 && this.mBobWeight >= this.weight){
        this.mRestart = true;
        this.tag = 2;
        gEngine.AudioClips.stopBackgroundAudio();
        gEngine.GameLoop.stop();
    }
};

Level1.prototype.txtUpdate = function () {
    this.mBobWeight = 0;
    for (let i = 0; i < this.mAllHeros.size(); i++) {
        var hero = this.mAllHeros.getObjectAt(i);
        this.mBobWeight += hero.getWeight();
    }
    var msg ="Weight:" + Math.floor(this.mBobWeight);
    this.mMsg.setText(msg);
};

Level1.prototype.clockUpdate = function(){
    this.mClock.update();
    this.mTime = this.mClock.getTime(); //返回剩余的时间
    if(this.mTime === 0){
        this.mRestart = true;
        this.tag = 5;
        gEngine.AudioClips.stopBackgroundAudio();
        gEngine.GameLoop.stop();
    }

    var msg ="Time:" + this.mTime + "s";
    this.mMsgTime.setText(msg);
};


Level1.prototype.update = function () {
    this.mClockLag.update();
    this.mTime1 = this.mClockLag.getTime();
    if(this.mTime1 === 0){
        //画背景
        this.flag = true;
    }
    if(this.flag === true){
        this.cameraUpdate();    //更新摄像机大小、中心位置
        this.mCamera.update();
        this.mMinimap.update();
        this.mMinitxt.update();


        gEngine.Physics.processCollision(this.mAllHeros, this.mCollisionInfos);
        gEngine.Physics.processCollision(this.mAllComps, this.mCollisionInfos);

        this.clockUpdate();     //更新剩余的时间
        this.foodUpdate();      //判断食物是否被吃、更新食物
        this.heroUpdate();      //hero 分裂、聚合
        this.boomUpdate();
        this.compUpdate();      //comp 的位置更新
        this.detectCollision(); //判断hero、comp是否碰撞
        this.txtUpdate();       //计算当下Bob重量

        this.mAllHeros.update(this.centerX, this.centerY);  //hero 的键盘响应以及自动聚合
        this.mAllComps.updateSpitball();
        this.mAllSpitBall.updateSpitball();
        this.mAllBoom.updateSpitball();
    }
};
