/* File: Platform.js 
 *
 * Creates and initializes a Platform
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, IllumRenderable, vec2, LightManager */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Igloo(texture, normal,width, lightmanager) {
    this.mSprite = texture;
    this.mNormal =normal;
    this.mLightManager = lightmanager;
    this.size = 512; //from image diemnsions
    this.pos = vec2.fromValues(920,320); //wc in the scene
    
    var igl = new IllumRenderable(this.mSprite, this.mNormal);
    igl.setElementPixelPositions(0, width, 0,width);
    igl.getXform().setSize(512, 512);
    igl.getXform().setPosition(this.pos[0],this.pos[1]);
    
    this.mLight = LightManager.Core.getIglooLight();
    igl.addLight(this.mLight);
    this.kLightDelta = 0.07;
    
    GameObject.call(this, igl);

    var rigidShape = new RigidRectangle(this.getXform(), this.width, this.width);
    rigidShape.setMass(0);  // ensures no movements!
    rigidShape.setDrawBounds(true);
    this.setPhysicsComponent(rigidShape);
    
}
gEngine.Core.inheritPrototype(Igloo, GameObject);

Igloo.prototype.update = function() {
    
    GameObject.prototype.update.call(this);
    
    var lowerLimit = 1;
    var upperLimit = 10;
    
    var lightIntensity = this.mLight.getIntensity();
    
    if(lightIntensity <= lowerLimit || lightIntensity >= upperLimit){
        
        this.kLightDelta = this.kLightDelta * -1;
        
    }
    
    lightIntensity += this.kLightDelta;   
    this.mLight.setIntensity(lightIntensity);
};

