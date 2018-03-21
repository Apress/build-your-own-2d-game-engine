/**
 * NextLevelController.js 
 *
 * Handles standard transition screens. No drawing here.
 * 
 * @author  Erik W. Greif
 * @since   2018-03-11
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, WASDObj */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";


/**
 * Lets the user click a key to go to another level. If the level is not 
 * given as a parameter, the level is pulled from the global key/value store
 * as "next-level".
 */
function NextLevelController(levelFile) {
    
    this.renderable = new Renderable();
    GameObject.call(this, this.renderable);
    this.setDrawRenderable(false);
    
    this.levelFile = levelFile;
    if (typeof levelFile === 'undefined') {
        this.levelFile = gEngine.Global.get("next-level");
    }
    
    //Prevent user from accidentally closing a scene immediately by stale key
    this.timeout = 20;
}
gEngine.Core.inheritPrototype(NextLevelController, GameObject);


/**
 * Constructs a new instance using the properties object.
 * 
 * @param properties  The properties object to be used for construction.
 * @returns A new instance.
 */
NextLevelController.fromProperties = function (properties) {

    return new NextLevelController(properties["levelFile"]);
};


/**
 * Draws facade objects. If on the mini camera, will overlay in white.
 */
NextLevelController.prototype.draw = function (camera) {
};


NextLevelController.prototype.update = function (camera) {
    
    this.timeout -= 1;
    
    if (this.timeout < 0 && 
            gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {  
        if (typeof this.levelFile === 'undefined')
            console.log("Next level was not defined in constructor or global key store");
        else {
            gEngine.Core.setNextScene(new GameLevel(this.levelFile));
            gEngine.GameLoop.stop();
        }
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Esc)) {
        
        gEngine.Core.setNextScene(new GameLevel("assets/levels/intro.json"));
        gEngine.GameLoop.stop();
    }
};

