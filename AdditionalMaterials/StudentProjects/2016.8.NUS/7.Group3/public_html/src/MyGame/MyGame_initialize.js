/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


MyGame.prototype.initialize = function () {
    this._initializeLights();
    this._initializeView();
    this._initializeActor();
};


MyGame.prototype._initializeLights = function(){
    this.mLightSet = new LightSet();
    
    var light0 = new Light();
    light0.setLightType(Light.eLightType.ePointLight);
    light0.setColor([0.8, 0.8, 1.0, 1]);
    light0.setXPos(this.kStartX);
    light0.setYPos(this.kStartY);
    light0.setNear(4);
    light0.setFar(10);
    light0.setIntensity(1.5);
    light0.setDropOff(1);
    light0.setLightCastShadowTo(false);
    this.mLightSet.addToSet(light0);
    
    var light1 = new Light();
    light1.setLightType(Light.eLightType.eDirectionalLight);
    light1.setColor([0.8, 0.8, 0.8, 1]);
    light1.setXPos(15);
    light1.setYPos(25);
    light1.setZPos(10);
    light1.setDirection([0, 0, -1]);
    light1.setNear(500);
    light1.setFar(500);
    light1.setInner(0.1);
    light1.setOuter(0.2);
    light1.setIntensity(1);
    light1.setDropOff(1.0);
    light1.setLightCastShadowTo(false);
    this.mLightSet.addToSet(light1);
    
    var light2 = new Light();
    light2.setLightType(Light.eLightType.eSpotLight);
    light2.setColor([0.8, 0.8, 1.0, 1]);
    light2.setXPos(this.kStartX);
    light2.setYPos(this.kStartY);
    light2.setZPos(0);
    light2.setDirection([1, 0, 0]);
    light2.setNear(8);
    light2.setFar(40);
    light2.setInner(1);
    light2.setOuter(2);
    light2.setIntensity(1.5);
    light2.setDropOff(1.0);
    light2.setLightCastShadowTo(false);
    this.mLightSet.addToSet(light2);
    
};

MyGame.prototype._initializeActor = function() {
    //Balloon
    this.mBalloon = new Balloon(this.kBalloon, null, this.kStartX, this.kStartY);
    this.mBalloon.getRenderable().addLight(this.mLightSet.getLightAt(1));
    
    //Sign
    this.mCircle = new LightRenderable(this.kCircle);
    this.mCircle.setColor([1, 1, 1, 0]);
    this.mCircle.getXform().setSize(3,3);
    this.mCircle.getXform().setPosition(this.kStartX, this.kStartY+1);
    this.mCircle.setElementPixelPositions(0, 64, 0, 64);
    this.mCircle.addLight(this.mLightSet.getLightAt(1));
    
    var sign0 = new Sign(this.kStrawberry, null, this.kStartX, this.kStartY+2);
    sign0.getRenderable().addLight(this.mLightSet.getLightAt(1));
    var sign1 = new Sign(this.kGrapes, null, this.kStartX, this.kStartY+2);
    sign1.getRenderable().addLight(this.mLightSet.getLightAt(1));
    var sign2 = new Sign(this.kMango, null, this.kStartX, this.kStartY+2);
    sign2.getRenderable().addLight(this.mLightSet.getLightAt(1));
    var sign3 = new Sign(this.kBlueberry, null, this.kStartX, this.kStartY+2);
    sign3.getRenderable().addLight(this.mLightSet.getLightAt(1));
    
    this.mSignSet.addToSet(sign0);
    this.mSignSet.addToSet(sign1);
    this.mSignSet.addToSet(sign2);
    this.mSignSet.addToSet(sign3);
    
    for(var i=0; i<this.mSignSet.size(); i++){
        this.mSignSet.getObjectAt(i).setVisibility(false);
    }
    
    var star = new LightRenderable(this.kStar);
    star.setColor([0, 0, 0, 0]);
    star.getXform().setPosition(this.aMapWidth - 10, this.aMapHeight/2);
    star.getXform().setSize(10, 10);
    star.addLight(this.mLightSet.getLightAt(1));
    this.mStar = new GameObject(star);
    
    var end = new LightRenderable(this.kEnd);
    end.setColor([0,0,0,0]);
    end.getXform().setPosition(this.aMapWidth - 10, this.aMapHeight/2);
    end.getXform().setSize(3, 3);
    end.addLight(this.mLightSet.getLightAt(1));
    this.mEnd = new GameObject(end);
    
};

MyGame.prototype._initializeView = function(){
     //Main Camera
    this.mCamera = new Camera(
            vec2.fromValues(this.aViewWidth/2, this.aViewHeight/2),
            this.aViewWidth,
            [0, 0, 800, 600]
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    // Map Camera
    this.mMapCam = new Camera(
            vec2.fromValues(this.aMapWidth/2, this.aMapHeight/2),
            this.aMapWidth, 
            [0, 0, this.aMapWidth, this.aMapHeight]
    );
    this.mMapCam.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    this.mBg = new IllumRenderable(this.kBg, this.kBgNM);
    this.mBg.setColor([0, 0, 0, 0]);
    this.mBg.getXform().setPosition(this.aMapWidth/2, this.aMapHeight/2);
    this.mBg.getXform().setSize(this.aMapWidth, this.aMapHeight);
    this.mBg.addLight(this.mLightSet.getLightAt(1));
    
    var mBound = new LightRenderable(this.kBound);
    mBound.setColor([1, 1, 1, 0]);
    mBound.getXform().setSize(this.aViewWidth, this.aViewHeight);
    mBound.getXform().setPosition(this.aViewWidth/2, this.aViewHeight/2);
    mBound.addLight(this.mLightSet.getLightAt(1));
    this.mInteractiveBound = new GameObject(mBound);
   
        // Font
    this.mMsg0 = new FontRenderable("");
    this.mMsg0.setColor([0, 0, 0, 1]);
    this.mMsg0.getXform().setPosition(5, 55);
    this.mMsg0.setTextHeight(3);
    
    this.mMsg1 = new FontRenderable("");
    this.mMsg1.setColor([1, 0, 0, 1]);
    this.mMsg1.getXform().setPosition(45, 55);
    this.mMsg1.setTextHeight(3);
    
    this.mMsg2 = new FontRenderable("");
    this.mMsg2.setColor([0, 0, 0, 1]);
    this.mMsg2.getXform().setPosition(45, 50);
    this.mMsg2.setTextHeight(3);
};
