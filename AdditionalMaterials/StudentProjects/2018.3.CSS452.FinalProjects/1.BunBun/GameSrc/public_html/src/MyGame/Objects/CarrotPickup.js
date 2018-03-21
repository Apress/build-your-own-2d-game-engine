/**
 * Carrot.js 
 *
 * Defines the game carrot behavior. Rolling carrot enemies.
 * 
 * @author  Erik W. Greif
 * @since   2018-02-22
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteAnimateRenderable: false */
/*find out more about jslint: http://www.jslint.com/help.html */

"use strict"; 


/**
 * Constructs a new terrain block. This object is intended to be added to the 
 * list of physics-enabled objects, as it contains a rigid body. 
 * 
 * @param x  X position
 * @param y  Y position
 */
function CarrotPickup(x, y) {
    
    //this.renderable.setColor([1, .37, 0, 1]);

    this.renderable = new LightRenderable("assets/textures/carrotPickup.png");
    this.renderable.getTransform().setPosition(x, y);
    this.renderable.getTransform().setSize(2, 8);
    this.renderable.setSpriteProperties([0, 0], [128, 512], 1, 0);
    this.renderable.attachLightSet(gEngine.GameLoop.getScene().getGlobalLights());

    GameObject.call(this, this.renderable);
    
    //Visibility toggled on
    this.setDrawRenderable(true);
    
    var rTransform = new Transform();
    var r = new RigidRectangle(rTransform, 1, 4);
    this.setRigidBody(r);
    r.setMass(0);
    rTransform.setPosition(x, y - 2);
    
    this.laserCollided = false;
    this.health = 15;
}
gEngine.Core.inheritPrototype(CarrotPickup, GameObject);


/**
 * Constructs a new instance using the properties object.
 * 
 * @param properties  The properties object to be used for construction.
 * @returns A new instance.
 */
CarrotPickup.fromProperties = function (properties) {
    
    return new CarrotPickup(
            properties["position"][0], 
            properties["position"][1]);
};


/**
 * Update logic
 */
CarrotPickup.prototype.update = function (camera) {
    
    GameObject.prototype.update.call(this);
    
    //If the player is lasering me...
    if (this.laserCollided) {
        
        //Decrement my health, then get picked when 0
        this.health--;
        if (this.health <= 0)
            this.setRigidBody(null);
    }
    
    //If the player has picked me...
    if (this.getRigidBody() === null) {
        
        //Move towards the player if it exists
        var players = gEngine.GameLoop.getScene().getObjectsByClass("Player");
        if (players.length <= 0) {
            gEngine.AudioClips.playACue("assets/sounds/Bun_Powerup.wav");
            this.delete();
        }
        else {
            var playerPosition = players[0].getTransform().getPosition();
            var myPosition = this.getTransform().getPosition();
            myPosition[0] = (playerPosition[0] + myPosition[0] * 3) / 4;
            myPosition[1] = (playerPosition[1] + myPosition[1] * 3) / 4;
            
            //If we're really close, the player collects us and we die
            if (Math.abs(myPosition[0] - playerPosition[0]) < 1
                    && Math.abs(myPosition[1] - playerPosition[1]) < 1) {
                
                players[0].carrotPoints += 3;
                var hud = gEngine.GameLoop.getScene().getObjectsByClass("HeadsUpDisplay");
                if (hud.length > 0)
                    hud[0].setCount(20);
                gEngine.AudioClips.playACue("assets/sounds/Bun_Powerup.wav");
                this.delete();
            }
        }
    }
    
    this.laserCollided = false;
};


CarrotPickup.prototype.draw = function (camera) {
    
    if (camera.getName() !== "minimap")
        GameObject.prototype.draw.call(this, camera);
};