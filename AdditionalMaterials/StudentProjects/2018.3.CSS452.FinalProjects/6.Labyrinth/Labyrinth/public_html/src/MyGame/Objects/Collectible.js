/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

function Collectible(sprite, pos){
    this.mRenderable = null;
    
    this.mGameObject = null;
    
    this.isDisintigrating = false;
    
    this.particles = new ParticleGameObjectSet();
    
    this.toBeDeleted = false;
    
    this.cycles = 0;
    this.lightIntensity = 0;
    this.changeLightIntensity = .25;
    
    this.mLight = this._createALight(Light.eLightType.ePointLight,
            [0, 0, 18],         // position
            [0, 0, -1],          // Direction 
            [0.6, 1.0, 0.0, 1],  // some color
            8, 20,               // near and far distances
            0.1, 0.2,            // inner and outer cones
            0,                   // intensity
            1.0                  // drop off
            );
    this.mLight.setLightCastShadowTo(true);

    
    this.mRenderable = new LightRenderable(sprite);
    this.mRenderable.getXform().setPosition(pos[0], pos[1]);
    this.mRenderable.getXform().setSize(3, 3);
    this.setRenderable(this.mRenderable);
    
    this.mLight.setXPos(this.getXform().getXPos());
    this.mLight.setYPos(this.getXform().getYPos());   
    
    this.mGameObject.getRenderable().addLight(this.mLight);

}
//gEngine.Core.inheritPrototype(Collectible, GameObject);

Collectible.prototype.getXform = function(){
    return this.mRenderable.getXform();
};

//Renderable should be created manually and placed here
Collectible.prototype.setRenderable = function(renderable){
    this.mRenderable = renderable;
    this.mGameObject = new GameObject(this.mRenderable);
};

Collectible.prototype.getRenderable = function(){
    return this.mRenderable;
};

Collectible.prototype.update = function(){
    if(!this.isDisintigrating){
            this.lightIntensity += this.changeLightIntensity;
        this.mGameObject.getRenderable().getLightAt(0).mIntensity = this.lightIntensity;
        if(this.lightIntensity >= 5 ||
                this.lightIntensity < 0) this.changeLightIntensity *= -1;
    }
    else{
        this.mGameObject.getRenderable().getLightAt(0).mIntensity = 0;
    }


    if(this.isDisintigrating){
        this.particles.update();
        this.cycles++;
        if(this.cycles >= 100){
            this.toBeDeleted = true;
        }
        
        return;
    }
};

//otherGameObj should be a GameObject
//Needs testing
Collectible.prototype.isTouching = function(otherGameObj){
    if(this.isDisintigrating){
        return false;
    }
    var ret = false;
    if(this.mGameObject.getBBox().intersectsBound(otherGameObj.getBBox())){
        if(this.mGameObject.pixelTouches(otherGameObj,[0,0])){
            return true;
        }
    }
    return ret;
};

Collectible.prototype.disintigrateModeOn = function(){
    this.isDisintigrating = true;
    this.disintigrate();    
    this.mRenderable = null;
};

Collectible.prototype.disintigrate = function(){   
    var collisionPt = [this.getXform().getXPos(), this.getXform().getYPos()];
    this.particles.addEmitterAt(collisionPt, 200, this.createParticle(collisionPt[0], collisionPt[1]));
};

Collectible.prototype.draw = function(camera){

    if(this.isDisintigrating){
        this.particles.draw(camera);
        return;
    }
    this.mRenderable.draw(camera);    
};

//Borrowed from github particles example
Collectible.prototype.createParticle = function(atX, atY) {
    var life = 30 + Math.random() * 200;
    var p = new ParticleGameObject("assets/particle.png", atX, atY, life);
    p.getRenderable().setColor([1, 0, 0, 1]);
    
    // size of the particle
    var r = 3.5 + Math.random() * 2.5;
    p.getXform().setSize(r, r);
    
    // final color
    var fr = 3.5 + Math.random();
    var fg = 0.4 + 0.1 * Math.random();
    var fb = 0.3 + 0.1 * Math.random();
    p.setFinalColor([fr, fg, fb, 0.6]);
    
    // velocity on the particle
    //var fx = 10 * Math.random() - 20 * Math.random();
    //var fy = 10 * Math.random();
    //p.getPhysicsComponent().setVelocity([fx, fy]);
    
    // size delta
    p.setSizeDelta(0.98);
    
    return p;
};

//Only use for this class

Collectible.prototype._createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
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

Collectible.prototype.getToBeDeleted = function () {
    return this.toBeDeleted;
};