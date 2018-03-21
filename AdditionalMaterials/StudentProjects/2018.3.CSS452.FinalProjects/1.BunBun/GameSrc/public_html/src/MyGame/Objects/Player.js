/**
 * Player.js 
 *
 * Defines the game player (BunBun).
 * 
 * @author  Erik W. Greif
 * @since   2018-02-22
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, SpriteAnimateRenderable, WASDObj */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


/**
 * Creates a new player based on its location in the world.
 * 
 * @param x  The x position
 * @param y  The Y position
 */
function Player(x, y) {
    
    gEngine.Physics.setRelaxationCount(30);
    
    this.moveDelta = 2;
    this.speedMultiplier = 1;

    this.renderable = new LightRenderable("assets/textures/Bun_animated.png");
    this.renderable.getTransform().setPosition(x, y);
    this.renderable.getTransform().setSize(4, 4);
    this.renderable.setSpriteProperties([0, 0], [100, 100], 1, 0);
    this.renderable.setAnimationSpeed(5);
    this.renderable.attachLightSet(gEngine.GameLoop.getScene().getGlobalLights());
    GameObject.call(this, this.renderable);
    
    var r = new RigidCircle(this.getTransform(), 2);
    this.setRigidBody(r);
    r.setMass(0.2);
    r.setDragConstant(1);
    this.setDrawRenderable(true);
    this.setDrawRigidShape(false);
    r.setFriction(0);
    
    this.jumpTimeout = 0;
    
    //Add a light attached to BunBun
    this.halo = new Light();
    this.halo.setColor([0.5, 0.5, 0.5, 0]);
    this.halo.setFar(35);
    this.halo.setLightType(Light.eLightType.ePointLight);
    this.halo.setDropOff(.1);
    this.renderable.addLight(this.halo);
    
    //Add directional daylight
    this.daylight = new Light();
    this.daylight.setColor([.35, .35, .35, 1]);
    this.daylight.setZPos(-5);
    this.daylight.setDirection([0, -.25, -1]);
    this.daylight.setLightType(Light.eLightType.eDirectionalLight);
    this.renderable.addLight(this.daylight);
    
    //Add laser zap light
    this.laserLight = new Light();
    this.laserLight.setColor([1, 0, 0, 1]);
    this.laserLight.setLightType(Light.eLightType.ePointLight);
    this.laserLight.setDropOff(.1);
    this.laserLight.setFar(10);
    this.laserLight.setNear(1);
    this.laserLight.setLightTo(false);
    this.laserLight.setIntensity(3);
    this.renderable.addLight(this.laserLight);
    
    //Store camera references for later
    this.mainCameraRef = gEngine.GameLoop.getScene().getCamera("main");
    this.miniCameraRef = gEngine.GameLoop.getScene().getCamera("minimap");
    this.mainCameraRef.configInterpolation(.1, 1);
    
    //Laser
    this.laser = new LineRenderable();
    this.laser.setColor([1, 0, 0, 1]);
    this.laserEnabled = false;
    this.laserDistance = 65;
    
    this.laserHitEnable = false;
    this.laserHit = new SpriteAnimateRenderable("assets/textures/flareStrip.png");
    this.laserHit.setColor([0, 0, 0, 0.0]);
    this.laserHit.setSpriteSequence(
            108, 0,   //Offset from top, left
            108, 108, //Size
            7,        //Number of elements in sequence
            0);       //Padding
    this.laserHit.getTransform().setSize(4, 4);
    this.laserHit.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.laserHit.setAnimationSpeed(1);
    this.laserHit.setLightingEnabled(false);
    
    //Map indicator
    this.mapRenderable = new TextureRenderable("assets/textures/indicator.png");
    this.mapRenderable.setColor([0, 1, 0, 1]);
    this.mapRenderable.getTransform().setSize(7, 7);
    
    //Sounds
    this.jumpSound = "assets/sounds/Bun_Jump.wav";
    this.landSound = "assets/sounds/Bun_Land.wav";
    this.painSound = "assets/sounds/Bun_Pain.wav";
    
    //Variation of scale based on harmonic
    this.sizeScale = new ShakePosition(0.75, -0.75, 0.5, 60, false);
    this.sizeScale.setRemainingCycles(0);
    //For flipping left and right 
    this.direction = 1;
    
    //Statistics
    this.carrotPoints = 20;
    this.carrotRegenTime = -1;
    this.oxygenLevel = 100;  
}
gEngine.Core.inheritPrototype(Player, GameObject);


/**
 * Constructs a new instance using the properties object.
 * 
 * @param properties  The properties object to be used for construction.
 * @returns A new instance.
 */
Player.fromProperties = function (properties) {    
    return new Player(
            properties["position"][0], 
            properties["position"][1]);
};


/**
 * Draw the laser and draw the parent.
 *  @param camera
 */
Player.prototype.draw = function (camera) {
    
    //Turn on zap light when and only when laser is on
    this.laserLight.setLightTo(this.laserEnabled && this.laserHitEnable);
    this.laserLight.set2DPosition(this.laserHit.getTransform().getPosition());
    
    if (camera.getName() === "minimap") {
        
        var myPos = this.renderable.getTransform().getPosition();
        this.mapRenderable.getTransform().setPosition(myPos[0], myPos[1]);
        this.mapRenderable.draw(camera);
    }
    
    else {
        GameObject.prototype.draw.call(this, camera);
        
        if (this.laserEnabled) {

            this.laser.draw(camera);

            if (this.laserHitEnable)
                this.laserHit.draw(camera);
        }
    }
};

/**
 * Unregister our light object when we are destroyed
 * 
 * @returns {undefined}
 */
Player.prototype.delete = function () {
    
    this.renderable.removeLight(this.halo);
    this.renderable.removeLight(this.laserLight);
    GameObject.prototype.delete.call(this);
};

/**
 * Take user input and update rigid body.
 * 
 * @param camera
 */
Player.prototype.update = function (camera) {
    
    GameObject.prototype.update.call(this);
    var xform = this.getTransform();

    //console.log("Player normal: " + JSON.stringify(this.getCollisionInfo().getNormal()));

    //Place light at mouse cursor
    this.halo.set2DPosition(this.renderable.getTransform().getPosition());

    this.updateLaser(camera);

    //Kill any engine rotation
    xform.setRotationInRad(0);
    this.getRigidBody().setAngularVelocity(0);

    //Determine if we are under water
    var underWater = false;
    var waterObjects = gEngine.GameLoop.getScene().getObjectsByClass("Water");
    
    if (waterObjects.length > 0) {
        if (waterObjects[0].getWaterLevel() > xform.getYPos()) {
            
            underWater = true;
            this.oxygenLevel -= .15;
        }
        
        if (this.oxygenLevel <= 100 && underWater === false){
            this.oxygenLevel += .35;
        }
        
    }
    //Death criteria
    if (this.oxygenLevel <= 0 || xform.getYPos() < -100) {
        
        //Tell the losing screen to go back here when it exits
        gEngine.Global.set("next-level", gEngine.Global.get("current-level"));
        gEngine.Core.setNextScene(new GameLevel("assets/levels/loseScreen.json"));
        gEngine.GameLoop.stop();
    }
    
    var speedMultiplier = 1;
    if (underWater) {
        speedMultiplier = 1/3;
        gEngine.AudioClips.detuneBackground(-200);
    } else {
        gEngine.AudioClips.detuneBackground(0);
    }
    
    //Set gravity accordingly
    this.getRigidBody().setAcceleration([0, -90 * speedMultiplier * speedMultiplier]);

    //If the normal isn't zero, normalize it and determine jump speed.
    var norm = this.getCollisionInfo().getNormal();
    
    if (norm[0] !== 0.0 || norm[1] !== 0.0)
    {
        var max = Math.max(Math.abs(norm[0]), Math.abs(norm[1]));
        var normNorm = [norm[0] / max, norm[1] / max];

        //If the normalized normal force is positive, jump
        if (normNorm[1] > 0) {
            
            if (this.jumpTimeout <= 0 && (
                    gEngine.Input.isKeyPressed(gEngine.Input.keys.Space) ||
                    gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) ) {
                
                gEngine.AudioClips.playACue(this.jumpSound);
                // start jump animation
                this.renderable.setSpriteProperties([0, 0], [100, 100], 10, 0);
                var jumpSpeed = 50 * normNorm[1] * speedMultiplier;
                this.getRigidBody().setVelocity(this.getRigidBody().getVelocity()[0], jumpSpeed);

                this.jumpTimeout = 30; // Make player wait 30 cycles to jump
            }
        }
    }    
    this.renderable.updateAnimationSingle();
    //Handle left right motion
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {

        this.direction = -1;
        this.getRigidBody().setVelocity(
                -12 * speedMultiplier, 
                this.getRigidBody().getVelocity()[1]);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {

        this.direction = 1;
        this.getRigidBody().setVelocity(
                12 * speedMultiplier, 
                this.getRigidBody().getVelocity()[1]);
    }

    //The player's jump timeout is controlled by this timer
    if (this.jumpTimeout > 0)
        this.jumpTimeout--;
    
    //Center both cameras on the player
    var panThresh = [10, 2];
    var myPos = this.getTransform().getPosition();
    var camPos = this.mainCameraRef.getWCCenter();
    if (camPos[0] < myPos[0] - panThresh[0])
        camPos[0] = myPos[0] - panThresh[0];
    if (camPos[0] > myPos[0] + panThresh[0])
        camPos[0] = myPos[0] + panThresh[0];
    if (camPos[1] < myPos[1] - panThresh[1])
        camPos[1] = myPos[1] - panThresh[1];
    if (camPos[1] > myPos[1] + panThresh[1])
        camPos[1] = myPos[1] + panThresh[1];
    this.miniCameraRef.setWCCenter(camPos[0], camPos[1]);  
    
    //Update animation
    var shake = this.sizeScale.getShakeResults();
    this.renderable.getTransform().setSize(this.direction * (4 + shake[0]), 4 + shake[1]);
};


/**
 * Handles all player laser control logic. 
 * 
 * @param camera  The main camera (first camera loaded)
 */
Player.prototype.updateLaser = function (camera) {
    
    //Flash the laser light
    this.laserLight.setColor([(Math.random() / 3) + 0.33, 0, 0, 1]);
    this.laserHit.updateAnimation();
    this.laserHit.getTransform().setRotationInRad(Math.random() * 20);
    
    //Laser usage
    this.laserEnabled = false;
    
    if (this.carrotPoints <= 0){
        if (this.carrotRegenTime >= 0)
            this.carrotRegenTime -= 1;
        if (this.carrotRegenTime === 0){
            var cpDiff = 1 - this.carrotPoints;
            if (cpDiff > 0)
                this.carrotPoints += cpDiff;
        }
    }

    if (gEngine.Input.isButtonPressed(0)) {
        
        //Use up carrot points, abort if none left
        if (this.carrotPoints <= 0){
            return;
        }
        else
            this.carrotPoints -= .03;
        if (this.carrotPoints <= 0){
            this.carrotRegenTime = 120;
            this.carrotPoints = 0;
        }
        
        //Get our pos and the mouse pos
        var myPos = this.getTransform().getPosition();
        myPos = [myPos[0] + (this.direction * 1.3), myPos[1]];
        var toPos = [
                camera.mouseWCX(),
                camera.mouseWCY()];
        
        //Correct the laser based on the ideal max length
        toPos[0] = toPos[0] - myPos[0];
        toPos[1] = toPos[1] - myPos[1];
        var distance = (toPos[0] * toPos[0]) + (toPos[1] * toPos[1]);
        distance = Math.sqrt(distance);
        var correction = this.laserDistance / distance;
        toPos[0] *= correction;
        toPos[1] *= correction;
        
        toPos[0] = myPos[0] + toPos[0];
        toPos[1] = myPos[1] + toPos[1];
        
        //Get all objects we will collide with
        var lists = [
            gEngine.GameLoop.getScene().getPhysicsObjects(),
            gEngine.GameLoop.getScene().getObjectsByClass("CarrotPickup")
        ];
        
        //Find the nearest collision point with all sollids
        var collision = null;
        var thisCollision = null;
        
        //For each list of objects
        for (var listId in lists) {
            var terrain = lists[listId];
            
            //For each object in the list
            for (var blockId in terrain) {

                var block = terrain[blockId];
                if (block === this)
                    continue;
                if ( block.getRigidBody() === null)
                    continue;
                var vertices = block.getRigidBody().getVertices();

                //For each of the bounding lines...
                for (var i = 0; i < vertices.length; i++) {
                    var j = (i + 1) % vertices.length;

                    //Check if they intersect BunBun's laser, and where
                    thisCollision = intersects(myPos, toPos, vertices[i], vertices[j]);
                    if (thisCollision !== null) {

                        if (collision === null) {
                            thisCollision['object'] = block;
                            collision = thisCollision;
                        }
                        else if (thisCollision.distance[0] < collision.distance[0]) {
                            thisCollision['object'] = block;
                            collision = thisCollision;
                        }
                    }
                }
            }
        }
        
        //If one was found, shorten the line
        if (collision !== null) {
            
            toPos[0] = ((toPos[0]-myPos[0]) * collision.distance[0]) + myPos[0];
            toPos[1] = ((toPos[1]-myPos[1]) * collision.distance[0]) + myPos[1];
            
            this.laserHitEnable = true;
            this.laserHit.getTransform().setPosition(toPos[0], toPos[1]);
            collision['object']['laserCollided'] = true;
            
        } else {
            
            this.laserHitEnable = false;
        }
        
        //Set the renderable state
        this.laserEnabled = true;
        this.laser.setFirstVertex(myPos[0], myPos[1]);
        this.laser.setSecondVertex(toPos[0], toPos[1]);
    }
};

/**
 * returns true iff the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
 * 
 * @param firstLineStart  Starting point of first line segment
 * @param firstLineEnd  Ending point of second line segment
 * @param secondLineStart  Starting point of first line segment
 * @param secondLineEnd  Ending point of second line segment
 * @returns  {
 *     "point": [x, y], The point of collision
 *     "distance": [delta, gamma] From start point along each line
 * }
 * Null if a collision did not occur.
 * @source https://stackoverflow.com/a/24392281/1708977
 */
function intersects(firstLineStart, firstLineEnd, secondLineStart, secondLineEnd) {
    
    var a = firstLineStart[0];
    var b = firstLineStart[1];
    var c = firstLineEnd[0];
    var d = firstLineEnd[1];
    
    var p = secondLineStart[0];
    var q = secondLineStart[1];
    var r = secondLineEnd[0];
    var s = secondLineEnd[1];
    
    var det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    
    if (det === 0)
        return null;
    else {
        
        lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
        gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
        if ((0 < lambda && lambda < 1) && (0 < gamma && gamma < 1)) {
            return {
                "distance": [lambda, gamma],
                "point": [0, 0]
            };
        } else {
            return null;
        }
    }
};
