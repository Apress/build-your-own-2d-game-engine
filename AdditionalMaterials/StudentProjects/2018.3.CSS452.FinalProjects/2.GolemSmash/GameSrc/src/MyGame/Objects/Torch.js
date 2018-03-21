/* File: Torch.js 
 *
 * This file models all the variants of the Torch objects we have in our game.
 * These default to an unlit state, with collisions disabled for everything but
 * fire arrows. If a fire arrow hits a torch, it lights them (simulated by
 * particles).
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2, RigidShape, RigidRectangle,
 *       Platform, Arrow, ParticleGameObjectSet, Config, Golem, FireArrow, Hero, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

/**
 * Constructor for the Torch object. Initializes a spriteTexture
 * 
 * @param {String}  texture     The name of the texture for the torch
 * @param {String}  normalMap   The name of the normal map for the torch
 * @param {Number}  xPos       
 * @param {Number}  yPos        
 * @param {Number}  width       
 * @param {Number}  height
 * @param {String}  torchType   Type of the torch, according to Config.Torch
 * @param {Golem}   golem       Reference to the Golem object so the torch can be
 *                              added to the Golem's reference set.
 * @param {Light}   light       An empty light object to be used by this torch.
 * @returns {Torch}
 */
function Torch(texture, normalMap, xPos, yPos, width, height, torchType, golem, light) {
    // Save the type of torch, as this will be needed to pick the correct
    // values for the particle system later on. This can also be used, if
    // needed, to determine what the damage bonus of the torch should be.
    this.type = torchType;
    
    // Create and initialize the renderable with the parameterized values. 
    this.mTorch = new IllumRenderable(texture, normalMap);
    this.mTorch.setColor(Config.Torch[this.type].Color);
    this.mTorch.getXform().setPosition(xPos, yPos);
    this.mTorch.getXform().setSize(width, height);
    GameObject.call(this, this.mTorch);

    // Set up our rigidbody for easy collision checking with arrows. The current
    // code has a hitbox equal to the full torch sprite, but this could be adjusted
    // to only allow a collision with the brazier-portion of the sprite. Also, 0
    // mass, as the torch is a stationary object not to be affected by other
    // objects movement.
    var r = new RigidRectangle(
        this.getXform(),
        this.getXform().getHeight(),
        this.getXform().getHeight()
    );
    r.setMass(0);
    this.setRigidBody(r); 
    
    // Initialize the particle system. 
    this.mParticles = new ParticleGameObjectSet();
    
    // Variables to track if a torch is lit, for how long, and the maximum
    // lifespan.
    this.lit = false;
    this.litTimer = 0;
    this.kTorchLife = Config.Torch[this.type].MaxTimeLit;
    
    // If a valid Golem object was passed, add this torch as a reference to that
    // Golem so it can recognize the damage boost.
    if (golem instanceof Golem) {
        golem.addTorchRef(this);
    }
    
    // Create our light for this torch, but disable it for now.
    this.mLight = light;
    this._setLightProperties();
    this.mLight.setLightTo(false);
}
gEngine.Core.inheritPrototype(Torch, GameObject);

Torch.prototype._setLightProperties = function () {
    this.mLight.setLightType(Light.eLightType.ePointLight);
    this.mLight.setColor(Config.Torch[this.type].Light.Color);
    this.mLight.setXPos(this.mTorch.getXform().getXPos() + Config.Torch[this.type].Light.XOffset);
    this.mLight.setYPos(this.mTorch.getXform().getYPos() + Config.Torch[this.type].Light.YOffset);
    this.mLight.setZPos(Config.Torch[this.type].Light.ZPosition);
    this.mLight.setDirection(Config.Torch[this.type].Light.Direction);
    this.mLight.setNear(Config.Torch[this.type].Light.Near);
    this.mLight.setFar(Config.Torch[this.type].Light.Far);
    this.mLight.setInner(Config.Torch[this.type].Light.Inner);
    this.mLight.setOuter(Config.Torch[this.type].Light.Outer);
    this.mLight.setIntensity(Config.Torch[this.type].Light.Intensity);
    this.mLight.setDropOff(Config.Torch[this.type].Light.DropOff);
    this.mLight.setLightCastShadowTo(false);
};

/**
 * 
 * @returns {undefined}
 */
Torch.prototype.update = function () {
    // Handle all the dependencies requiring the torch to be lit.
    if (this.lit === true){
        // Increment our lifespan.
        this.litTimer++;
        
        if (this.litTimer%6 === 0) {
            var redVal = .7 - 0.3*Math.random();

            this.mLight.setFar(50 + 10*Math.random());
            this.mLight.setColor([redVal, .1, 0, 1]);
        }
        
        // Randomly add particles througout the torches' lifespan.
        if (Math.random() > ((this.litTimer % 100) / 100)) {
            this.mParticles.addEmitterAt(
                this.getXform().getPosition(),
                1,
                this.createParticle,
                this.type
            );
        }
    }
    // This should never actually be null, but we're not removing the check.
    if (this.mParticles !== null) {
        this.mParticles.update();
    }
    
    // Once the torch reaches the end of its lifespan, make sure we reset the
    // litTimer and lit variables for the next time it's lit. Also, note that
    // currently the torch cannot be relit until it has completley died out.
    // Firing an extra FireArrow at it will have no effect until this segment
    // of code executes.
    if (this.litTimer >= this.kTorchLife){
        this.mLight.setLightTo(false);
        this.litTimer = 0;
        this.lit = false;
    }
};

/**
 * Allows for user defined interactions between (this) and the parameter object.
 * Returning true skips the default Physics engine's handling of the collision.
 * 
 * In this case, we want to light the torch if the other object is a FireArrow,
 * and to ignore any other GameObjects.
 * 
 * @param {GameObject} obj
 * @returns {Boolean}
 */
Torch.prototype.userCollisionHandling = function (obj) {
    // Light the torch.
    if (obj instanceof FireArrow && this.lit === false) {
        this.lit = true;
        this.mLight.setLightTo(true);
    }
    
    // Because we set our mass to 0 we can simply return true here, as the
    // Torch will not fall through the floor.
    return true;
};

/**
 * This is a creation script that we pass to the addEmitter function of our
 * particle system so that it knows how to create our particles. Becuase
 * we have modified our ParticleGameSystem object to allow for an extra parameter
 * (type), we can still access the Config.Torch data for each type of torch.
 *
 * Most values in this function follow a simple formula. We take a base value,
 * and add a multiplier that's scaled by Math.random().
 *
 * @param {Number} x    X position to create the particle at.
 * @param {Number} y    Y position to create the particle at.
 * @returns {ParticleGameObject}
 */
Torch.prototype.createParticle = function (x, y) {
    // Calculate the lifespan and our x/y offsets.
    var life = Config.Torch[this.type].Particle.MinLifespan + 
               Config.Torch[this.type].Particle.LifespanMultiplier *
               Math.random();
    var xOffset = Config.Torch[this.type].Particle.BaseXOffset + 
                  Config.Torch[this.type].Particle.XOffsetMultiplier *
                  Math.random();
    var yOffset = Config.Torch[this.type].Particle.BaseYOffset +
                  Config.Torch[this.type].Particle.YOffsetMultiplier *
                  Math.random();
          
    // Create the particle, adding our offsets to the base parameter values.
    var p = new ParticleGameObject(
        Config.BossBattle.Textures.FlameParticleTexture, 
        x + xOffset, 
        y + yOffset, 
        life
    );
    p.getRenderable().setColor([
        Config.Torch[this.type].Particle.ColorRed,
        Config.Torch[this.type].Particle.ColorGreen,
        Config.Torch[this.type].Particle.ColorBlue,
        Config.Torch[this.type].Particle.ColorAlpha
    ]);
    
    // Get a random size offset for the particle.
    var r = Config.Torch[this.type].Particle.MinSize + 
            Config.Torch[this.type].Particle.SizeMultiplier *
            Math.random();
    p.getXform().setSize(r, r);
    
    // Randomize our final color.
    var fr = Config.Torch[this.type].Particle.MinFinalColor[0] + 
             Config.Torch[this.type].Particle.MinFinalColorMultipliers[0] * 
             Math.random();
    var fg = Config.Torch[this.type].Particle.MinFinalColor[1] + 
             Config.Torch[this.type].Particle.MinFinalColorMultipliers[1] * 
             Math.random();
    var fb = Config.Torch[this.type].Particle.MinFinalColor[2] + 
             Config.Torch[this.type].Particle.MinFinalColorMultipliers[2] * 
             Math.random();
    var fa = Config.Torch[this.type].Particle.MinFinalColor[3] + 
             Config.Torch[this.type].Particle.MinFinalColorMultipliers[3] * 
             Math.random();
    p.setFinalColor([fr, fg, fb, fa]);
    if (Math.random() < .3) {
        p.setFinalColor([0, 0, 0, 1]);
    }
    
    // Randomize the velocity and acceleration.
    var fx;
    if (xOffset > 0) {
        fx = Config.Torch[this.type].Particle.BaseXVelocity +
             (Config.Torch[this.type].Particle.XVelocityMultiplier * -1) *
             Math.random();
    }
    else {
        fx = (Config.Torch[this.type].Particle.BaseXVelocity * -1) +
             Config.Torch[this.type].Particle.XVelocityMultiplier *
             Math.random();
    }
    var fy = Config.Torch[this.type].Particle.BaseYVelocity +
             Config.Torch[this.type].Particle.YVelocityMultiplier *
             Math.random();
    p.getParticle().setVelocity([fx, fy]);
    p.setSizeDelta(Config.Torch[this.type].Particle.SizeDelta);
    var ax = Config.Torch[this.type].Particle.BaseXAcceleration +
             Config.Torch[this.type].Particle.XAccelerationMultiplier *
             Math.random();
    
    var ay = Config.Torch[this.type].Particle.BaseYAcceleration +
             Config.Torch[this.type].Particle.YAccelerationMultiplier *
             Math.random(); 
    p.getParticle().setAcceleration([ax, ay]);
    
    return p;
};

/**
 * Executes a draw call for each particle in our particle system before calling
 * the GameObject draw function.
 * 
 * @param {Camera} camera
 * @returns {undefined}
 */
Torch.prototype.draw = function (camera) {
    if (this.mParticles !== null) {
        this.mParticles.draw(camera);
    }
    GameObject.prototype.draw.call(this, camera);
};

/**
 * Returns true if the torch is lit, false otherwise.
 * 
 * @returns {Boolean}
 */
Torch.prototype.isLit = function() {
    return this.lit;
};

/**
 * Calculates the current boost for the torch.
 * 
 * @returns {Number}
 */
Torch.prototype.getBoost = function() {
    // If the torch isn't lit it can't give a boost.
    if (this.lit === false) {
        return 0.0;
    }
    
    // For the first half of the torch's lifespan it will provide the full
    // boost. 
    if (this.litTimer / this.kTorchLife < 0.5) {
        return 1.0;
    }

    // After the torch has reached 50% of its lifespan, the boost starts degrading.
    // Because we don't start degrading until after the lifespan is halfway complete,
    // we need to multiply the resulting value by two or we will instantly drop from
    // 1.0 to 0.5, rather than a gradual decline. 
    return (1.0 - (this.litTimer / this.kTorchLife)) * 2;
};
