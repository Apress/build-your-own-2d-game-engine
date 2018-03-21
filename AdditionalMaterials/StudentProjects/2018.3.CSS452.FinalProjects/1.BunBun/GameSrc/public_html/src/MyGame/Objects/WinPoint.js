/**
 * WinPoint.js 
 * 
 * @author  Erik W. Greif
 * @since   2018-02-22
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, SpriteAnimateRenderable, WASDObj */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


/**
 * Creates a new win point (boundary)  based on its location in the world.
 * 
 * @param boundary  The x position
 */
function WinPoint(boundary, nextLevelFile) {
    
    this.renderable = new LineRenderable(boundary, -10000, boundary, 10000);
    this.renderable.setColor([0, 1, 0, 1]);
    GameObject.call(this, this.renderable);
    
    this.boundary = boundary;
    this.nextLevelFile = nextLevelFile;
}
gEngine.Core.inheritPrototype(WinPoint, GameObject);


/**
 * Constructs a new instance using the properties object.
 * 
 * @param properties  The properties object to be used for construction.
 * @returns A new instance.
 */
WinPoint.fromProperties = function (properties) {    
    return new WinPoint(
            properties["boundary"],
            properties["nextLevelFile"]);
};


/**
 * Draw the laser and draw the parent.
 *  @param camera
 */
WinPoint.prototype.draw = function (camera) {
    
    //if (camera.getName() === "main")
    //    GameObject.prototype.draw.call(this, camera);
};


/**
 * Take user input and update rigid body.
 * 
 * @param camera
 */
WinPoint.prototype.update = function (camera) {
    
    GameObject.prototype.update.call(this, camera);
    
    var players = gEngine.GameLoop.getScene().getObjectsByClass("Player");
    if (players.length > 0) {
        
        if (players[0].getTransform().getPosition()[0] > this.boundary) {
            
            //Game win!
            gEngine.Global.set("next-level", this.nextLevelFile);
            gEngine.Core.setNextScene(new GameLevel("assets/levels/winScreen.json"));
            gEngine.GameLoop.stop();
        }
    }
};

