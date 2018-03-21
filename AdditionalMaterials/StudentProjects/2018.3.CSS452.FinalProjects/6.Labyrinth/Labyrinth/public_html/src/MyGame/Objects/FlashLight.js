/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject, Light */
/* find out more about jslint: http://www.jslint.com/help.html */


function FlashLight(){
    this.mLight = this._createALight(Light.eLightType.eSpotLight,
            [0, 0, 3],            // Right minion position
            //[-0.07,  0, -1],     // direction //original
            [0,  1, .1],     // direction //new //index 0 and 1 control light direction
            [0.5, 0.5, 0.5, 1],     // color
            100, 100,                  // near and far distances
            //1.65, 1.7,               // inner outter angles (in radius) //old
            .9,1,                            // new angles
            2,                     // intensity
            1.2                     // drop off
            );
    this.mLight.setLightCastShadowTo(true);
    this.mHorizontalFactor = 1;
    this.mVerticalFactor = 1;
    
    this.mIsOn = true;
};

FlashLight.prototype.setMagnitude = function(){
    this.mLight.setDirection([this.mHorizontalFactor, this.mVerticalFactor, 1]);
};

FlashLight.prototype.toggle = function(){
    if(this.mIsOn){
        this.mLight.mIntensity = 0;
        this.mIsOn = false;
    }
    else{
        this.mLight.mIntensity = .5;
        this.mIsOn = true;
    }
};

FlashLight.prototype.setPosition = function(x, y){
    this.mLight.setXPos(x);
    this.mLight.setYPos(y);
};

FlashLight.prototype._createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
    var light = new Light();
    light.setLightType(type);
    light.setColor(color);
    light.setXPos(pos[0]);
    light.setYPos(pos[1]);      
    light.setZPos(pos[2]);
    light.setDirection(dir);
    light.setNear(n);
    light.setFar(f);
    light.setInner(inner);
    light.setOuter(outer);
    light.setIntensity(intensity);
    light.setDropOff(dropOff);

    return light;
};