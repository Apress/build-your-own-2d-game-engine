/**
 * AsyncLoader.js 
 * 
 * @author  Erik W. Greif
 * @since   2018-02-22
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, SpriteAnimateRenderable, WASDObj */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


/**
 * Creates a new AsyncLoader. This temporary controller controls the world
 * as long as asynchronous loading is occurring. These resources are NOT
 * unloaded! Be very careful!
 * 
 * @param asyncResources  The list of resources matching engine format
 * @param nextLevelResource  The resource for the level to auto load when done
 */
function AsyncLoader(asyncResources, nextLevelResource) {
    
    this.renderable = new Renderable();
    this.asyncResources = asyncResources;
    this.nextLevel = nextLevelResource;
    this.loaded = 0;
    this.total = 0;
    gEngine.GameLoop.setFps(15);

    GameObject.call(this, this.renderable);
    
    //Enqeue each resource to load
    var scene = gEngine.GameLoop.getScene();
    for (var assetId in asyncResources) {
        asyncResources[assetId]["isLoaded"] = false;
        
        var self = this;
        scene.loadAsset(asyncResources[assetId], function() {
            self.loaded += 1;
            console.log("Loaded " + self.loaded + "/" + self.total + " assets");
        });
        
        this.total += 1;
    }
}
gEngine.Core.inheritPrototype(AsyncLoader, GameObject);

/**
 * Constructs a new instance using the properties object.
 * 
 * @param properties  The properties object to be used for construction.
 * @returns A new instance.
 */
AsyncLoader.fromProperties = function (properties) {    
    return new AsyncLoader(
            properties["assetList"],
            properties["nextLevel"]);
};


/**
 * Draw the laser and draw the parent.
 *  @param camera
 */
AsyncLoader.prototype.draw = function (camera) {
    
    var barPosition = [50, 20];
    var barSize = [40, 3];
    var progress = this.loaded / this.total;
    
    //First, draw the loading bar background
    var transform = this.renderable.getTransform();
    transform.setSize(barSize[0] + 1, barSize[1] + 1);
    transform.setPosition(barPosition[0], barPosition[1]);
    this.renderable.setColor([1, 1, 1, 1]);
    this.renderable.draw(camera);
    
    //Second, draw the loading bar itself
    transform.setSize(barSize[0] * progress, barSize[1]);
    transform.setPosition(
            barPosition[0] + ((barSize[0] * progress) / 2) - (barSize[0] / 2), 
            barPosition[1]);
    this.renderable.setColor([.8, .8, .8, 1]);
    this.renderable.draw(camera);
};


/**
 * Take user input and update rigid body.
 * 
 * @param camera
 */
AsyncLoader.prototype.update = function (camera) {
    
    GameObject.prototype.update.call(this, camera);
    
    if (this.loaded >= this.total) {
        
        gEngine.GameLoop.setFps(60);
        gEngine.Core.setNextScene(new GameLevel(this.nextLevel));
        gEngine.GameLoop.stop();
    }
};

