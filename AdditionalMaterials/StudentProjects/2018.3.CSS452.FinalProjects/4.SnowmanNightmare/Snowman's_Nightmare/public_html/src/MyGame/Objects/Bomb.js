/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable,vec3,Fire,Light, IllumRenderable, HelperFunctions, SpriteAnimateRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Bomb(spriteTexture, bg, igloo, blockManager) {

    this.kDelta = 1;
    this.downSize = 1;
    this.interp = null;
    this.name = "Bomb";
    this.blockManager = blockManager;
    
    Fire.call(this, spriteTexture, bg, igloo);
    
    this.lightColor = [1, 0, 1, 1];

    this.mLight.setNear(60);
    this.mLight.setFar(70);
    this.mLight.setInner(1.4);
    this.mLight.setOuter(8);
    this.mLight.setIntensity(5);
    this.mLight.setColor(this.lightColor);
    
    this.size = 128;
    this.mSprite.getXform().setSize(this.size, this.size);
    
    var r = new RigidRectangle(this.getXform(), this.size, this.size);
        r.setMass(0);  // ensures no movements!

    this.setPhysicsComponent(r);
}
gEngine.Core.inheritPrototype(Bomb, Fire);

Bomb.prototype.update = function () {
    
    //call parent update
    Fire.prototype.update.call(this);
    
    for(var i = 0; i < 3; i++){
        if(this.lightColor[i] < 1) this.lightColor[i] += 0.1;
        else this.lightColor[i] = 0;
    }
    this.mLight.setColor(this.lightColor);

};

Bomb.prototype.getScore = function () {
    return 600;
};

Bomb.prototype.getType = function () {

    return "Bomb";

};

Bomb.prototype.handleCollision = function (otherObjectType) {

    Fire.prototype.handleCollision.call(this, otherObjectType);

    if (otherObjectType === "Block") {
        
        gEngine.AudioClips.playACue("assets/sounds/bmb.wav");

        this.blockManager.deleteAll();
    }
    
    if (otherObjectType === "Water") {
        this.shouldScore = true;
        this.scoreAmount = this.getXform().getPosition()[1] * 10;
    }
};

