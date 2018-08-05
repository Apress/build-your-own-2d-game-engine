"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Level4() {
    this.kAdult = "assets/pictures/Adult.png";
    this.kAlice = "assets/pictures/Alice.png";
    this.kBlackhole = "assets/pictures/Blackhole.png";
    this.kBobwin = "assets/pictures/Bobwin.png";
    this.kAlicewin = "assets/pictures/Alicewin.png";
    this.kBgClip = "assets/sounds/BGClip.mp3";
    this.kFood = "assets/pictures/food.png";
    this.kBoom = "assets/pictures/boom.png";
    this.kCue = "assets/sounds/cue.wav";
    this.kEat = "assets/sounds/eat.wav";


    this.mAllComps = null;
    this.mAllHeros = null;
    this.mAllSpitBall = null;
    this.mAllBlackhole = null;
    this.mAllFood = null;
    this.mAllBoom = null;

    this.outControl1 = false;
    this.outControl2 = false;

    this.centerX = null;
    this.centerY = null;

    this.mCamera = null;
    this.mMinitxt = null;
    this.mClock = null;
    this.mTime = null;
    this.mBobWeight = null;
    this.mAliceWeight = null;

    this.weight = 50;

    //判断是否被吃掉
    this.mRestart = false;

    //判断应该跳转到哪个界面，1：level1, 2: level2, 3: level3, 4: level win, 5: level loose
    this.tag = 0;
}

gEngine.Core.inheritPrototype(Level4, Scene);


Level4.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kAdult);
    gEngine.Textures.loadTexture(this.kAlice);
    gEngine.Textures.loadTexture(this.kBobwin);
    gEngine.Textures.loadTexture(this.kAlicewin);

    gEngine.Textures.loadTexture(this.kFood);
    gEngine.Textures.loadTexture(this.kBoom);
    gEngine.Textures.loadTexture(this.kBlackhole);
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kEat);
    gEngine.AudioClips.loadAudio(this.kCue);
};


Level4.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();
    gEngine.Textures.unloadTexture(this.kAdult);
    gEngine.Textures.unloadTexture(this.kAlice);
    gEngine.Textures.unloadTexture(this.kBobwin);
    gEngine.Textures.unloadTexture(this.kAlicewin);

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
                nextLevel = new End(this.kBobwin);   //bob胜利
                break;
            case 2:
                nextLevel = new End(this.kAlicewin);   //Alice胜利
                break;
        }
        gEngine.Core.startScene(nextLevel);
    }
};


Level4.prototype.initialize = function () {
    document.getElementById('info').innerText = "WASD: Bob Move SPACE: Bob Split C: Bob Spit\n" +
        "IJKL: Alice Move H: Alice Split N: Alice Spit";
    this.width = 800;
    this.height = 600;
    this.centerX = 0;
    this.centerY = 0;
    this.mTime = 180;
    this.mClock = new Clock(this.mTime);

    //新建摄像机
    this.mCamera = new Camera(
        vec2.fromValues(this.centerX, this.centerY),
        128,
        [0, 0, this.width, this.height]
    );
    this.mCamera.setBackgroundColor([0.686, 0.827, 0.949, 1]);

    this.mMinitxt = new Camera(
        vec2.fromValues(0, 0),
        512,
        [-80, 540, 256, 128]
    );

    this.mMinitxt.setBackgroundColor([0.686, 0.827, 0.949, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    this.mBobWeight = 10;
    this.mAliceWeight = 10;
    this.mAllHeros = new GameObjectSet();
    this.mAllHeros.addToSet(new Hero(this.kAdult, 10, this.centerX - 25, this.centerY - 25));


    this.mAllComps = new GameObjectSet();
    this.mAllComps.addToSet(new Hero2(this.kAlice, 10, this.centerX + 25, this.centerY + 25));

    this.mAllFood = new GameObjectSet();
    for (let i = 0; i < this.weight * 3; i++) {
        this.mAllFood.addToSet(new Food(this.kFood));
    }

    this.mAllBoom = new GameObjectSet();
    for(let i = 0; i < 5; i++){
        this.mAllBoom.addToSet(new Boom(this.kBoom));
    }

    this.mAllBlackhole = new GameObjectSet();
    for(let i = 0; i < 4; i++){
        this.mAllBlackhole.addToSet(new Blackhole(this.kBlackhole));
    }

    this.mAllSpitBall = new GameObjectSet();
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
    this.mMsg = new FontRenderable(" ");
    this.mMsg.setColor([0, 0, 0, 0.5]);
    this.mMsg.getXform().setPosition(-45, -80);
    this.mMsg.setTextHeight(50);

    this.mMsgTime = new FontRenderable(" ");
    this.mMsgTime.setColor([0, 0, 0, 0.5]);
    this.mMsgTime.getXform().setPosition(-45, -30);
    this.mMsgTime.setTextHeight(50);

};


Level4.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

    //画 mCamera
    this.mCamera.setupViewProjection();
    this.mAllComps.draw(this.mCamera);
    this.mAllHeros.draw(this.mCamera);
    this.mAllBoom.draw(this.mCamera);
    this.mAllFood.draw(this.mCamera);
    this.mAllSpitBall.draw(this.mCamera);
    this.mAllBlackhole.draw(this.mCamera);



    //txt
    this.mMinitxt.setupViewProjection();
    this.mMsg.draw(this.mMinitxt);
    this.mMsgTime.draw(this.mMinitxt);
};


Level4.prototype.cameraUpdate = function () {
    this.centerX = 0;
    this.centerY = 0;
    this.centerX1 = 0;
    this.centerY1 = 0;
    this.centerX2 = 0;
    this.centerY2 = 0;

    var maxX = this.mAllHeros.getObjectAt(0).getXform().getXPos(),
        minX = this.mAllHeros.getObjectAt(0).getXform().getXPos(),
        maxY = this.mAllHeros.getObjectAt(0).getXform().getYPos(),
        minY = this.mAllHeros.getObjectAt(0).getXform().getYPos(),
        maxR = this.mAllHeros.getObjectAt(0).getHeroRadius();

    for (let i = 0; i < this.mAllHeros.size(); i++) {
        this.centerX1 += this.mAllHeros.getObjectAt(i).getXform().getXPos();
        this.centerY1 += this.mAllHeros.getObjectAt(i).getXform().getYPos();
        this.centerX += this.mAllHeros.getObjectAt(i).getXform().getXPos();
        this.centerY += this.mAllHeros.getObjectAt(i).getXform().getYPos();

        maxR = maxR < this.mAllHeros.getObjectAt(i).getHeroRadius() ? this.mAllHeros.getObjectAt(i).getHeroRadius() : maxR;
        maxX = maxX < this.mAllHeros.getObjectAt(i).getXform().getXPos() ? this.mAllHeros.getObjectAt(i).getXform().getXPos() : maxX;
        minX = minX > this.mAllHeros.getObjectAt(i).getXform().getXPos() ? this.mAllHeros.getObjectAt(i).getXform().getXPos() : minX;
        maxY = maxY < this.mAllHeros.getObjectAt(i).getXform().getYPos() ? this.mAllHeros.getObjectAt(i).getXform().getYPos() : maxY;
        minY = minY > this.mAllHeros.getObjectAt(i).getXform().getYPos() ? this.mAllHeros.getObjectAt(i).getXform().getYPos() : minY;
    }

    for (let i = 0; i < this.mAllComps.size(); i++) {
        this.centerX2 += this.mAllComps.getObjectAt(i).getXform().getXPos();
        this.centerY2 += this.mAllComps.getObjectAt(i).getXform().getYPos();
        this.centerX += this.mAllComps.getObjectAt(i).getXform().getXPos();
        this.centerY += this.mAllComps.getObjectAt(i).getXform().getYPos();

        maxR = maxR < this.mAllComps.getObjectAt(i).getHeroRadius() ? this.mAllComps.getObjectAt(i).getHeroRadius() : maxR;
        maxX = maxX < this.mAllComps.getObjectAt(i).getXform().getXPos() ? this.mAllComps.getObjectAt(i).getXform().getXPos() : maxX;
        minX = minX > this.mAllComps.getObjectAt(i).getXform().getXPos() ? this.mAllComps.getObjectAt(i).getXform().getXPos() : minX;
        maxY = maxY < this.mAllComps.getObjectAt(i).getXform().getYPos() ? this.mAllComps.getObjectAt(i).getXform().getYPos() : maxY;
        minY = minY > this.mAllComps.getObjectAt(i).getXform().getYPos() ? this.mAllComps.getObjectAt(i).getXform().getYPos() : minY;
    }

    this.centerX /= (this.mAllHeros.size() + this.mAllComps.size());
    this.centerY /= (this.mAllHeros.size() + this.mAllComps.size());

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


Level4.prototype.heroUpdate = function () {
    //聚合
    //player1
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
    //player2
    info = new CollisionInfo();
    for (let i = 0; i < this.mAllComps.size(); i++) {
        var objI = this.mAllComps.getObjectAt(i);
        for (let j = i + 1; j < this.mAllComps.size(); j++) {
            var objJ = this.mAllComps.getObjectAt(j);
            if (objI.getRigidBody().collisionTest(objJ.getRigidBody(), info)) {
                this.mAllComps.removeFromSet(objJ);
                objI.incWeight(objJ.getWeight());
                j--;
            }
        }
    }
     //吐球
    //player1
     var mSpitball = null;
    if(this.outControl1 === false){
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
    }
    //player2
    mSpitball = null;
    if(this.outControl2 === false) {
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.N)) {
            for (var i = 0; i < this.mAllComps.size(); i++) {
                var obj = this.mAllComps.getObjectAt(i);
                if (obj.getWeight() > 15) {
                    var Vx = obj.getVX();
                    var Vy = obj.getVY();
                    var mHeroPosX = obj.getXform().getXPos();
                    var mHeroPosY = obj.getXform().getYPos();
                    var mHeroSize = obj.getXform().getWidth();
                    var DirectionX = Vx / Math.sqrt(Vx * Vx + Vy * Vy);
                    var DirectionY = Vy / Math.sqrt(Vx * Vx + Vy * Vy);
                    mSpitball = new Spitball(this.kFood, (mHeroPosX + DirectionX * (mHeroSize / 2 + 2)), (mHeroPosY + DirectionY * (mHeroSize / 2 + 2)), DirectionX, DirectionY);
                    obj.incWeight(-mSpitball.getWeight());
                    this.mAllSpitBall.addToSet(mSpitball);
                }
            }
        }
    }

     //吃小球
    //player1
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
     //player2
    var spitball;
    for (let i = 0; i < this.mAllComps.size(); i++) {
        var hero = this.mAllComps.getObjectAt(i);
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
    if(this.outControl1 === false) {
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
                        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W) || gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
                            if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A) || gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
                                var mNewHero = new Hero(this.kAdult, mHeroWeight, mHeroPosX - (mHeroSize / Math.sqrt(2) / 2), mHeroPosY + (mHeroSize / Math.sqrt(2) / 2));
                                mNewHero.setVX(-mAcceleration / Math.sqrt(2));
                                mNewHero.setVY(mAcceleration / Math.sqrt(2));
                            }
                            else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D) || gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
                                var mNewHero = new Hero(this.kAdult, mHeroWeight, mHeroPosX + (mHeroSize / Math.sqrt(2) / 2), mHeroPosY + (mHeroSize / Math.sqrt(2) / 2));
                                mNewHero.setVX(mAcceleration / Math.sqrt(2));
                                mNewHero.setVY(mAcceleration / Math.sqrt(2));
                            }
                            else {
                                var mNewHero = new Hero(this.kAdult, mHeroWeight, mHeroPosX, mHeroPosY + (mHeroSize / 2));
                                mNewHero.setVX(mHeroVx);
                                mNewHero.setVY(mAcceleration);
                            }
                        }
                        else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S) || gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
                            if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A) || gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
                                var mNewHero = new Hero(this.kAdult, mHeroWeight, mHeroPosX - (mHeroSize / Math.sqrt(2) / 2), mHeroPosY - (mHeroSize / Math.sqrt(2) / 2));
                                mNewHero.setVX(-mAcceleration / Math.sqrt(2));
                                mNewHero.setVY(-mAcceleration / Math.sqrt(2));
                            }
                            else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D) || gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
                                var mNewHero = new Hero(this.kAdult, mHeroWeight, mHeroPosX + (mHeroSize / Math.sqrt(2) / 2), mHeroPosY - (mHeroSize / Math.sqrt(2) / 2));
                                mNewHero.setVX(mAcceleration / Math.sqrt(2));
                                mNewHero.setVY(-mAcceleration / Math.sqrt(2));
                            }
                            else {
                                var mNewHero = new Hero(this.kAdult, mHeroWeight, mHeroPosX, mHeroPosY - (mHeroSize / 2));
                                mNewHero.setVX(mHeroVx);
                                mNewHero.setVY(-mAcceleration);
                            }
                        }
                        else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A) || gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
                            var mNewHero = new Hero(this.kAdult, mHeroWeight, mHeroPosX - (mHeroSize / 2), mHeroPosY);
                            mNewHero.setVX(-mAcceleration);
                            mNewHero.setVY(mHeroVy);
                        }
                        else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D) || gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
                            var mNewHero = new Hero(this.kAdult, mHeroWeight, mHeroPosX + (mHeroSize / 2), mHeroPosY);
                            mNewHero.setVX(+mAcceleration);
                            mNewHero.setVY(mHeroVy);
                        }
                        else {
                            var mNewHero = new Hero(this.kAdult, mHeroWeight, mHeroPosX + (mHeroSize / 4), mHeroPosY);
                            obj.getXform().setPosition(mHeroPosX - (mHeroSize / 4), mHeroPosY);
                            mNewHero.setVX(mAcceleration / 2);
                            mNewHero.setVY(0);
                            obj.setVX(-mAcceleration / 2);
                            obj.setVY(0);
                        }
                        this.mAllHeros.addToSet(mNewHero);
                    }
                    if (this.mAllHeros.size() >= 8) {
                        break;
                    }
                }
            }
        }
    }
    mNewHero = null;
    mHeroSetLengthNow = this.mAllComps.size();
    if(this.outControl2 === false) {
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) {
            if (mHeroSetLengthNow <= 8) {
                for (var j = 0; j < mHeroSetLengthNow; j++) {
                    var obj = this.mAllComps.getObjectAt(j);
                    var mHeroWeight = obj.getWeight() / 2;
                    if (mHeroWeight >= 10) {
                        obj.incWeight(-mHeroWeight);
                        var mHeroPosX = obj.getXform().getXPos();
                        var mHeroPosY = obj.getXform().getYPos();
                        var mHeroSize = obj.getXform().getWidth();
                        var mHeroVx = obj.getVX();
                        var mHeroVy = obj.getVY();
                        var mAcceleration = 60;
                        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.I)) {
                            if (gEngine.Input.isKeyPressed(gEngine.Input.keys.J)) {
                                var mNewHero = new Hero2(this.kAlice, mHeroWeight, mHeroPosX - (mHeroSize / Math.sqrt(2) / 2), mHeroPosY + (mHeroSize / Math.sqrt(2) / 2));
                                mNewHero.setVX(-mAcceleration / Math.sqrt(2));
                                mNewHero.setVY(mAcceleration / Math.sqrt(2));
                            }
                            else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.L)) {
                                var mNewHero = new Hero2(this.kAlice, mHeroWeight, mHeroPosX + (mHeroSize / Math.sqrt(2) / 2), mHeroPosY + (mHeroSize / Math.sqrt(2) / 2));
                                mNewHero.setVX(mAcceleration / Math.sqrt(2));
                                mNewHero.setVY(mAcceleration / Math.sqrt(2));
                            }
                            else {
                                var mNewHero = new Hero2(this.kAlice, mHeroWeight, mHeroPosX, mHeroPosY + (mHeroSize / 2));
                                mNewHero.setVX(mHeroVx);
                                mNewHero.setVY(mAcceleration);
                            }
                        }
                        else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.K)) {
                            if (gEngine.Input.isKeyPressed(gEngine.Input.keys.J)) {
                                var mNewHero = new Hero2(this.kAlice, mHeroWeight, mHeroPosX - (mHeroSize / Math.sqrt(2) / 2), mHeroPosY - (mHeroSize / Math.sqrt(2) / 2));
                                mNewHero.setVX(-mAcceleration / Math.sqrt(2));
                                mNewHero.setVY(-mAcceleration / Math.sqrt(2));
                            }
                            else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.L)) {
                                var mNewHero = new Hero2(this.kAlice, mHeroWeight, mHeroPosX + (mHeroSize / Math.sqrt(2) / 2), mHeroPosY - (mHeroSize / Math.sqrt(2) / 2));
                                mNewHero.setVX(mAcceleration / Math.sqrt(2));
                                mNewHero.setVY(-mAcceleration / Math.sqrt(2));
                            }
                            else {
                                var mNewHero = new Hero2(this.kAlice, mHeroWeight, mHeroPosX, mHeroPosY - (mHeroSize / 2));
                                mNewHero.setVX(mHeroVx);
                                mNewHero.setVY(-mAcceleration);
                            }
                        }
                        else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.J)) {
                            var mNewHero = new Hero2(this.kAlice, mHeroWeight, mHeroPosX - (mHeroSize / 2), mHeroPosY);
                            mNewHero.setVX(-mAcceleration);
                            mNewHero.setVY(mHeroVy);
                        }
                        else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.L)) {
                            var mNewHero = new Hero2(this.kAlice, mHeroWeight, mHeroPosX + (mHeroSize / 2), mHeroPosY);
                            mNewHero.setVX(+mAcceleration);
                            mNewHero.setVY(mHeroVy);
                        }
                        else {
                            var mNewHero = new Hero2(this.kAlice, mHeroWeight, mHeroPosX + (mHeroSize / 4), mHeroPosY);
                            obj.getXform().setPosition(mHeroPosX - (mHeroSize / 4), mHeroPosY);
                            mNewHero.setVX(mAcceleration / 2);
                            mNewHero.setVY(0);
                            obj.setVX(-mAcceleration / 2);
                            obj.setVY(0);
                        }
                        this.mAllComps.addToSet(mNewHero);
                    }
                    if (this.mAllComps.size() >= 8) {
                        break;
                    }
                }
            }
        }
    }
};

Level4.prototype.boomUpdate = function() {
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
                    mNewHero = new Hero(this.kAdult, heroboom, heroPosX - heroSize/Math.sqrt(2), heroPosY + heroSize/Math.sqrt(2));
                    mNewHero.setVX(heroVX - mAcceleration/Math.sqrt(2));
                    mNewHero.setVY(heroVY + mAcceleration/Math.sqrt(2));
                    this.mAllHeros.addToSet(mNewHero);
                    //上
                    mNewHero = new Hero(this.kAdult, heroboom, heroPosX, heroPosY + heroSize);
                    mNewHero.setVX(heroVX);
                    mNewHero.setVY(heroVY + mAcceleration);
                    this.mAllHeros.addToSet(mNewHero);
                    //右上
                    mNewHero = new Hero(this.kAdult, heroboom, heroPosX + heroSize/Math.sqrt(2), heroPosY + heroSize/Math.sqrt(2));
                    mNewHero.setVX(heroVX + mAcceleration/Math.sqrt(2));
                    mNewHero.setVY(heroVY + mAcceleration/Math.sqrt(2));
                    this.mAllHeros.addToSet(mNewHero);
                    //左
                    mNewHero = new Hero(this.kAdult, heroboom, heroPosX - heroSize, heroPosY);
                    mNewHero.setVX(heroVX - mAcceleration);
                    mNewHero.setVY(heroVY);
                    this.mAllHeros.addToSet(mNewHero);
                    //右
                    mNewHero = new Hero(this.kAdult, heroboom, heroPosX + heroSize, heroPosY);
                    mNewHero.setVX(heroVX + mAcceleration);
                    mNewHero.setVY(heroVY);
                    this.mAllHeros.addToSet(mNewHero);
                    //左下
                    mNewHero = new Hero(this.kAdult, heroboom, heroPosX - heroSize/Math.sqrt(2), heroPosY - heroSize/Math.sqrt(2));
                    mNewHero.setVX(heroVX - mAcceleration/Math.sqrt(2));
                    mNewHero.setVY(heroVY - mAcceleration/Math.sqrt(2));
                    this.mAllHeros.addToSet(mNewHero);
                    //下
                    mNewHero = new Hero(this.kAdult, heroboom, heroPosX, heroPosY - heroSize);
                    mNewHero.setVX(heroVX);
                    mNewHero.setVY(heroVY - mAcceleration);
                    this.mAllHeros.addToSet(mNewHero);
                    //右下
                    mNewHero = new Hero(this.kAdult, heroboom, heroPosX + heroSize/Math.sqrt(2), heroPosY - heroSize/Math.sqrt(2));
                    mNewHero.setVX(heroVX + mAcceleration/Math.sqrt(2));
                    mNewHero.setVY(heroVY - mAcceleration/Math.sqrt(2));
                    this.mAllHeros.addToSet(mNewHero);
                }
            }
        }
    }

    info = new CollisionInfo();
    for(let i = 0; i < this.mAllComps.size(); i++){
        var hero = this.mAllComps.getObjectAt(i);
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
                    mNewHero = new Hero2(this.kAlice, heroboom, heroPosX - heroSize/Math.sqrt(2), heroPosY + heroSize/Math.sqrt(2));
                    mNewHero.setVX(heroVX - mAcceleration/Math.sqrt(2));
                    mNewHero.setVY(heroVY + mAcceleration/Math.sqrt(2));
                    this.mAllComps.addToSet(mNewHero);
                    //上
                    mNewHero = new Hero2(this.kAlice, heroboom, heroPosX, heroPosY + heroSize);
                    mNewHero.setVX(heroVX);
                    mNewHero.setVY(heroVY + mAcceleration);
                    this.mAllComps.addToSet(mNewHero);
                    //右上
                    mNewHero = new Hero2(this.kAlice, heroboom, heroPosX + heroSize/Math.sqrt(2), heroPosY + heroSize/Math.sqrt(2));
                    mNewHero.setVX(heroVX + mAcceleration/Math.sqrt(2));
                    mNewHero.setVY(heroVY + mAcceleration/Math.sqrt(2));
                    this.mAllComps.addToSet(mNewHero);
                    //左
                    mNewHero = new Hero2(this.kAlice, heroboom, heroPosX - heroSize, heroPosY);
                    mNewHero.setVX(heroVX - mAcceleration);
                    mNewHero.setVY(heroVY);
                    this.mAllComps.addToSet(mNewHero);
                    //右
                    mNewHero = new Hero2(this.kAlice, heroboom, heroPosX + heroSize, heroPosY);
                    mNewHero.setVX(heroVX + mAcceleration);
                    mNewHero.setVY(heroVY);
                    this.mAllComps.addToSet(mNewHero);
                    //左下
                    mNewHero = new Hero2(this.kAlice, heroboom, heroPosX - heroSize/Math.sqrt(2), heroPosY - heroSize/Math.sqrt(2));
                    mNewHero.setVX(heroVX - mAcceleration/Math.sqrt(2));
                    mNewHero.setVY(heroVY - mAcceleration/Math.sqrt(2));
                    this.mAllComps.addToSet(mNewHero);
                    //下
                    mNewHero = new Hero2(this.kAlice, heroboom, heroPosX, heroPosY - heroSize);
                    mNewHero.setVX(heroVX);
                    mNewHero.setVY(heroVY - mAcceleration);
                    this.mAllComps.addToSet(mNewHero);
                    //右下
                    mNewHero = new Hero2(this.kAlice, heroboom, heroPosX + heroSize/Math.sqrt(2), heroPosY - heroSize/Math.sqrt(2));
                    mNewHero.setVX(heroVX + mAcceleration/Math.sqrt(2));
                    mNewHero.setVY(heroVY - mAcceleration/Math.sqrt(2));
                    this.mAllComps.addToSet(mNewHero);
                }
            }
        }
    }
};

Level4.prototype.foodUpdate = function () {
//男主吃食物
//player1
var food;
for (let i = 0; i < this.mAllHeros.size(); i++) {
    var hero = this.mAllHeros.getObjectAt(i);
    for (let j = 0; j < this.mAllFood.size(); j++) {
        food = this.mAllFood.getObjectAt(j);
        if (Math.sqrt(Math.pow(hero.getXform().getXPos() - food.getXform().getXPos(), 2) + Math.pow(hero.getXform().getYPos() - food.getXform().getYPos(), 2)) < hero.getHeroRadius() + food.getFoodRadius()) {
            gEngine.AudioClips.playACue(this.kCue); //播放cue声音
            hero.incWeight(food.getWeight());
            food.setPos();
        }
    }
}

//player2
for (let i = 0; i < this.mAllComps.size(); i++) {
    hero = this.mAllComps.getObjectAt(i);
    for (let j = 0; j < this.mAllFood.size(); j++) {
        food = this.mAllFood.getObjectAt(j);
        if (Math.sqrt(Math.pow(hero.getXform().getXPos() - food.getXform().getXPos(), 2) + Math.pow(hero.getXform().getYPos() - food.getXform().getYPos(), 2)) < hero.getHeroRadius() + food.getFoodRadius()) {
            gEngine.AudioClips.playACue(this.kCue); //播放cue声音
            hero.incWeight(food.getWeight());
            food.setPos();
        }
    }
}
};


Level4.prototype.detectCollision = function(){
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
                    if(this.mAllComps.size() === 0){
                        this.mRestart = true;
                        this.tag = 1;
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
                    this.tag = 2;
                    gEngine.AudioClips.stopBackgroundAudio();
                    gEngine.GameLoop.stop();
                }
            }
        }
    }
    if(this.mAllComps.size() === 0){
        this.mRestart = true;
        this.tag = 1;
        gEngine.AudioClips.stopBackgroundAudio();
        gEngine.GameLoop.stop();
    }
};

Level4.prototype.txtUpdate = function () {
    this.mBobWeight = 0;
    for (let i = 0; i < this.mAllHeros.size(); i++) {
        var hero = this.mAllHeros.getObjectAt(i);
        this.mBobWeight += hero.getWeight();
    }
    var msg ="WeightB:" + Math.floor(this.mBobWeight);
    this.mMsg.setText(msg);

    this.mAliceWeight = 0;
    for (let i = 0; i < this.mAllComps.size(); i++) {
        var hero = this.mAllComps.getObjectAt(i);
        this.mAliceWeight += hero.getWeight();
    }
    var msg ="WeightA:" + Math.floor(this.mAliceWeight);
    this.mMsgTime.setText(msg);
};


Level4.prototype.BlackholeUpdate = function(){
    var info = new CollisionInfo();
    for(let i = 0; i < this.mAllHeros.size(); i++){
        var hero = this.mAllHeros.getObjectAt(i);
        for(let j = 0; j < this.mAllBlackhole.size(); j++){
            var blackhole = this.mAllBlackhole.getObjectAt(j);
            if (hero.getRigidBody().collisionTest(blackhole.getRigidBody(), info)) {
                var allCollision = true;
                for(let t = 0; t < this.mAllHeros.size(); t++){
                    var chero = this.mAllHeros.getObjectAt(t);
                    if (!(chero.getRigidBody().collisionTest(blackhole.getRigidBody(), info))){
                        allCollision = false;
                        break;
                    }
                }
                if(allCollision === true){
                    var transPosX = Math.random() * 300 - 150;
                    var transPosY = Math.random() * 300 - 150;
                    for(let t = 0; t < this.mAllHeros.size(); t++){
                        var chero = this.mAllHeros.getObjectAt(t);
                        chero.getXform().setPosition(transPosX, transPosY);
                        chero.setControl(false);
                    }
                    this.outControl1 = false;
                    break;
                }
                hero.setVX(0);
                hero.setVY(0.3);
                hero.setControl(true);
                this.outControl1 = true;
                for(let k = 0; k < this.mAllHeros.size(); k++){
                    var otherhero = this.mAllHeros.getObjectAt(k);
                    otherhero.setControl(true);
                    if(otherhero.getRigidBody().collisionTest(blackhole.getRigidBody(), info)){
                        // console.log("TRUE",k);
                        continue;
                    }
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

    info = new CollisionInfo();
    for(let i = 0; i < this.mAllComps.size(); i++){
        var hero = this.mAllComps.getObjectAt(i);
        for(let j = 0; j < this.mAllBlackhole.size(); j++){
            var blackhole = this.mAllBlackhole.getObjectAt(j);
            if (hero.getRigidBody().collisionTest(blackhole.getRigidBody(), info)) {
                var allCollision = true;
                for(let t = 0; t < this.mAllComps.size(); t++){
                    var chero = this.mAllComps.getObjectAt(t);
                    if (!(chero.getRigidBody().collisionTest(blackhole.getRigidBody(), info))){
                        allCollision = false;
                        break;
                    }
                }
                if(allCollision === true){
                    var transPosX = Math.random() * 300 - 150;
                    var transPosY = Math.random() * 300 - 150;
                    for(let t = 0; t < this.mAllComps.size(); t++){
                        var chero = this.mAllComps.getObjectAt(t);
                        chero.getXform().setPosition(transPosX, transPosY);
                        chero.setControl(false);
                    }
                    this.outControl2 = false;
                    break;
                }
                hero.setVX(0);
                hero.setVY(0.3);
                hero.setControl(true);
                this.outControl2 = true;
                for(let k = 0; k < this.mAllComps.size(); k++){
                    var otherhero = this.mAllComps.getObjectAt(k);
                    otherhero.setControl(true);
                    if(otherhero.getRigidBody().collisionTest(blackhole.getRigidBody(), info)){
                        continue;
                    }
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
};

Level4.prototype.update = function () {
    this.cameraUpdate();    //更新摄像机大小、中心位置
    this.mCamera.update();
    this.mMinitxt.update();

    gEngine.Physics.processCollision(this.mAllHeros, this.mCollisionInfos);
    gEngine.Physics.processCollision(this.mAllComps, this.mCollisionInfos);

    this.foodUpdate();      //判断食物是否被吃、更新食物
    this.heroUpdate();      //hero 分裂、聚合
    this.boomUpdate();

    this.detectCollision(); //判断hero、comp是否碰撞
    this.txtUpdate();       //计算当下Bob重量
    this.BlackholeUpdate();

    this.mAllHeros.update(this.centerX1, this.centerY1);  //hero 的键盘响应以及自动聚合
    this.mAllComps.update(this.centerX2, this.centerY2);
    //this.mAllComps.updateSpitball();
    this.mAllSpitBall.updateSpitball();
    this.mAllBoom.updateSpitball();
};
