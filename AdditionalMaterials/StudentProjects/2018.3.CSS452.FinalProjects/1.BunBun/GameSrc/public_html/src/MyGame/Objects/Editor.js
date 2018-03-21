/**
 * Editor.js 
 *
 * Provides some behavior for editing objects and viewing their properties 
 * in the console. This can be nice for planning terrain for the world. 
 * 
 * @author  Erik W. Greif
 * @since   2018-02-22
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, WASDObj */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";


/**
 * Has no world position. Simply a logic controller. 
 * 
 * @param isEnabled  Whether to enable the editor features
 */
var editor = void(0);
function Editor(isEnabled) {

    GameObject.call(this, new Renderable());
    this.setDrawRenderable(false);
    
    this.isEnabled = isEnabled;
    this.scene = gEngine.GameLoop.getScene();
    
    this.highlightBox = new Renderable();
    this.highlightBox.setColor([0.5, 1.0, 0.5, 0.15]);
    this.highlightBox.setLightingEnabled(false);
    
    this.selectBox = new Renderable();
    this.selectBox.setColor([1.0, 0.5, 0.5, 0.5]);
    this.selectBox.setLightingEnabled(false);
    
    this.defaultBox = new Renderable();
    this.defaultBox.getTransform().setSize(0, 0);
    this.chosenTransform = null;
    this.chosenObject = null;
    
    if (this.isEnabled)
        console.log("Realtime terrain editor is enabled.");
}
gEngine.Core.inheritPrototype(Editor, GameObject);


/**
 * Constructs a new instance using the properties object.
 * 
 * @param properties  The properties object to be used for construction.
 * @returns A new instance.
 */
Editor.fromProperties = function (properties) {
    
    return new Editor(
            properties["isEnabled"]);
};


/**
 * 
 * @param camera  The camera to be drawn to.
 */
Editor.prototype.draw = function (camera) {
    
    if (!this.isEnabled)
        return;
     
    if (this.chosenTransform !== null) {
        this.selectBox.draw(camera);
    }
    this.highlightBox.draw(camera);
};


/**
 * 
 */
Editor.prototype.update = function (camera) {
    
    if (!this.isEnabled)
        return;
    
    //Zoom the camera
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.O))
        camera.setWCWidth(camera.getWCWidth() - 5);
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.P))
        camera.setWCWidth(camera.getWCWidth() + 5);
    
    //Help editors find coordinates
    if (gEngine.Input.isButtonClicked(0)) {
        
        console.log("Mouse is at (" 
                + camera.mouseWCX() 
                + ", " 
                + camera.mouseWCY() + ")");
    }
    
    //Clear the select boxes
    this.defaultBox.getTransform().cloneTo(this.highlightBox.getTransform());
    
    //Edit just terrain blocks
    var transform = null;
    var objects = this.scene.getObjects();
    var outputCollection = [];
    
    for (var object in objects) {
        
        if (!(objects[object] instanceof TerrainBlock)) 
            continue;
        
        //If the user asks to save, compile a list
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.E))
            outputCollection.push(objects[object].toProperties());
        
        //If the mouse is in bounds, highlight it
        transform = objects[object].getRigidBody().getTransform();
        
        if (transform.isPointInside([camera.mouseWCX(), camera.mouseWCY()])) {
            
            transform.cloneTo(this.highlightBox.getTransform());
            
            //If the user has clicked, select it
            if (gEngine.Input.isButtonClicked(0)) {
                
                this.chosenTransform = transform;
                this.chosenObject = objects[object];
            }
        }
    }
    
    //If the user asks to save, export to console now
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.E)) {
        
        console.log(JSON.stringify(outputCollection, null, 4));
    }
    
    //Abort if nothing is selected
    if (this.chosenTransform === null) {
        
        this.defaultBox.getTransform().cloneTo(this.selectBox.getTransform());
        return;
    }
    
    //Update selected box
    this.chosenTransform.cloneTo(this.selectBox.getTransform());

    var rotRate = 0.05;
    var transRate = 0.2;
    var minimumThickness = 0.25;

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Shift)) {

        rotRate /= 10.0;
        transRate /= 10.0;

        //Reset rotation to 0
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.R))
            this.chosenTransform.setRotationInRad(0);

        //CLONE this transform into a new terrain object!
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.C)) {

            var newObject = new TerrainBlock(
                    this.chosenTransform.getXPos() + 2,
                    this.chosenTransform.getYPos() + 2,
                    this.chosenTransform.getWidth(),
                    this.chosenTransform.getHeight(),
                    this.chosenTransform.getRotationInRad());

            this.scene.enrollObject(newObject, true);
        }

        //DELETE the selected terrain object!
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.X)) {

            this.chosenObject.delete();
            this.chosenObject = null;
            this.chosenTransform = null;
            
            //Prevent checks below from erroring
            return;
        }
    }

    //Rotation keys
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left))
        this.chosenTransform.incRotationByRad(rotRate);
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right))
        this.chosenTransform.incRotationByRad(-rotRate);

    //Translation keys
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.T))
        this.chosenTransform.incYPosBy(transRate);        
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.G))
        this.chosenTransform.incYPosBy(-transRate);        
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.H))
        this.chosenTransform.incXPosBy(transRate);        
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.F))
        this.chosenTransform.incXPosBy(-transRate);

    //Scale(ation) keys
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.I))
        this.chosenTransform.incHeightBy(transRate);        
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.K))
        this.chosenTransform.incHeightBy(-transRate);        
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.L))
        this.chosenTransform.incWidthBy(transRate);        
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.J))
        this.chosenTransform.incWidthBy(-transRate);

    //Scale bounds checking
    if (this.chosenTransform.getWidth() < minimumThickness)
        this.chosenTransform.setWidth(minimumThickness);
    if (this.chosenTransform.getHeight() < minimumThickness)
        this.chosenTransform.setHeight(minimumThickness);
};
