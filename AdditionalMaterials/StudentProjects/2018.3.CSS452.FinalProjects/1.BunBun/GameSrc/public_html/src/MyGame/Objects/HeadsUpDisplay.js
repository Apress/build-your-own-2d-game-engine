/**
 * HeadsUpDisplay.js 
 * 
 * @author  Erik W. Greif
 * @since   2018-02-22
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, SpriteAnimateRenderable, WASDObj */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


/**
 * Creates a new HUD in the world.
 */
function HeadsUpDisplay() {
    
    this.renderable = new Renderable();
    GameObject.call(this, this.renderable);
    
    this.mStatusText = new FontRenderable("Loading...");
    this.mStatusText.setFont("assets/fonts/Consolas-32");
    this.mStatusText.setTextHeight(3);
    this.mStatusText.setColor([1, 1, 1, 1]);
    
    this.mCarrotsText = new FontRenderable("...");
    this.mCarrotsText.setFont("assets/fonts/Consolas-32");
    this.mCarrotsText.setTextHeight(3);
    this.mCarrotsText.setColor([1, 1, 1, 1]);
    
    this.mOxygenText = new FontRenderable("Loading...");
    this.mOxygenText.setFont("assets/fonts/Consolas-32");
    this.mOxygenText.setTextHeight(3);
    this.mOxygenText.setColor([1, 1, 1, 1]);
    
    this.mCount = 0;
}
gEngine.Core.inheritPrototype(HeadsUpDisplay, GameObject);


/**
 * Constructs a new instance using the properties object.
 * 
 * @param properties  The properties object to be used for construction.
 * @returns A new instance.
 */
HeadsUpDisplay.fromProperties = function (properties) {    
    return new HeadsUpDisplay();
};


/**
 * Draw the laser and draw the parent.
 *  @param camera
 */
HeadsUpDisplay.prototype.draw = function (camera) {
    
    if (camera.getName() === "main") {
        //GameObject.prototype.draw.call(this, camera);

        var camPos = camera.getWCCenter();
        this.mStatusText.getTransform().setPosition(
                camPos[0] - 47,
                camPos[1] - 34
                );
        this.mCarrotsText.getTransform().setPosition(
                camPos[0] - 24,
                camPos[1] - 34
                );
        this.mOxygenText.getTransform().setPosition( 
                camPos[0] - 17,
                camPos[1] - 34
                );
        this.mStatusText.draw(camera);
        this.mCarrotsText.draw(camera);
        this.mOxygenText.draw(camera);
    }
};


/**
 * Take user input and update rigid body.
 * 
 * @param camera
 */
HeadsUpDisplay.prototype.update = function (camera) {
    
    GameObject.prototype.update.call(this, camera);
    
    var players = gEngine.GameLoop.getScene().getObjectsByClass("Player");
    if (players.length > 0) {
        var carrots = Math.round(players[0].carrotPoints);
        var oxygen = Math.round(players[0].oxygenLevel);
        if (oxygen < 100) {
            this.mOxygenText.setColor([1, oxygen / 200, oxygen / 200, 1]);
        }
        if (oxygen === 100) {
            this.mOxygenText.setColor([1, 1, 1, 1]);
        }
        if (this.mCount > 0) {
            this.mCarrotsText.setColor([.3, 1.0, .3, 1]);
            this.mCarrotsText.setTextHeight(4);
            this.mCount--;
        } else {
            this.mCarrotsText.setColor([1, 1, 1, 1]);
            this.mCarrotsText.setTextHeight(3);
        }
        this.mStatusText.setText("Carrot Points: ");
        this.mCarrotsText.setText("  " + carrots);
        this.mOxygenText.setText(
                "   Oxygen: " 
                + oxygen
                + "%"
                );
    }
};

HeadsUpDisplay.prototype.setCount = function (count) {
    this.mCount = count;
};

