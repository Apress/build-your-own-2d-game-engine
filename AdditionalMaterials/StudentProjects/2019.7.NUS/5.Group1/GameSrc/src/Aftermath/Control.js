HomePage.prototype.initControlInfo = function () {
    this.mControlInfo = new SpriteRenderable(this.kControlGuide);
    this.mControlInfo.setColor([1, 1, 1, 0]);
    this.mControlInfo.getXform().setPosition(143, 23);
    this.mControlInfo.getXform().setSize(70, 49);
    this.mControlInfo.setElementPixelPositions(0, 1024, 300, 1024);

    this.mAllPlatforms = new GameObjectSet();
    this.mHero = new Hero(this.kHero, this.kHeroBullet, vec2.fromValues(120, 60));


    var i, j, rx, ry, obj, dy, dx;

    dx = 8;
    dy = 8;

    rx = 85;
    for (i = 0; i < 22; i++) {
        obj = new Platform(this.kPlatformTexture, rx, 50);
        this.mAllPlatforms.addToSet(obj);

        // obj = new Platform(this.kPlatformTexture, rx, 112);
        // this.mAllPlatforms.addToSet(obj);
        rx += dx;
    }
    rx = 130;
    ry = 80;
    for (i = 0; i < 5; i++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);

        // obj = new Platform(this.kPlatformTexture, rx, 112);
        // this.mAllPlatforms.addToSet(obj);
        rx += dx;
    }
    rx = 85;
    for (i = 0; i < 23; i++) {
        obj = new Platform(this.kPlatformTexture, rx, 112);
        this.mAllPlatforms.addToSet(obj);

        rx += dx;
    }
    rx = 85;
    ry = 50;
    for (i = 0; i < 30; i++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);

        ry += dy;
    }
    rx = 195;
    ry = 50;
    for (i = 0; i < 30; i++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);

        ry += dy;
    }


};

HomePage.prototype.drawControlInfo = function () {
    this.mControlInfo.draw(this.mCamera);
    this.mAllPlatforms.draw(this.mCamera);
    this.mHero.draw(this.mCamera);


};

HomePage.prototype.updateControlInfo = function () {

    this.reset = gEngine.Physics.processObjSet(this.mHero, this.mAllPlatforms);
    this.mHero.update(this.reset, this.mCamera);


};


