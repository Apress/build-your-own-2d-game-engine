/**
 * Water.js
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteAnimateRenderable */
/*find out more about jslint: http://www.jslint.com/help.html */

"use strict"; 


/**
 * Creates a new water based on the height in the world
 * 
 * @param x  The x position
 * @param y  The y position
 */
function Water(waterLevel, waterSpeed) {
    
    this.riseRate = waterSpeed;
    this.waterLevel = waterLevel;
    this.renderable = new Renderable();
    this.renderable.setColor([0.25, 0.5, 1, 0.2]);
    this.renderable.setLightingEnabled(false);
    
    GameObject.call(this, this.renderable);
    
    //Visibility toggled on for now
    this.setDrawRenderable(true);
    
    //Store camera references for later
    //this.mainCameraRef = gEngine.GameLoop.getScene().getCamera("main");
    //this.mainCameraRef.configInterpolation(.1, 1);
}
gEngine.Core.inheritPrototype(Water, GameObject);


/**
 * Constructs a new instance using the properties object.
 * 
 * @param properties  The properties object to be used for construction.
 * @returns A new instance.
 */
Water.fromProperties = function (properties) {    
    return new Water(
            properties["waterLevel"], 
            properties["waterSpeed"]);
};


/**
 * Update logic
 */
Water.prototype.update = function () {
    
    GameObject.prototype.update.call(this);  
    this.waterLevel += this.riseRate;
};


/**
 * NOTE: This updates the renderable state. This is OK because the renderable
 * state is ONLY used in drawing. Notice we do not change water level. 
 */
Water.prototype.draw = function (camera) {
    
    var xform = this.getTransform();  
    var camCenter = camera.getWCCenter();
    var camSize = [
        camera.getWCWidth(), 
        camera.getWCHeight()
    ];
    
    var cameraBottom = camCenter[1] - (camSize[1] / 2);
    var waterHeight = this.waterLevel - cameraBottom;
    
    var waterPos = cameraBottom + (waterHeight / 2);
    
    xform.setYPos(waterPos);
    xform.setXPos(camCenter[0]);
    xform.setSize(camSize[0], waterHeight);
    
    GameObject.prototype.draw.call(this, camera);
};


/**
 * Get the level of the water in WC
 */
Water.prototype.getWaterLevel = function () {
  
    return this.waterLevel;
};
