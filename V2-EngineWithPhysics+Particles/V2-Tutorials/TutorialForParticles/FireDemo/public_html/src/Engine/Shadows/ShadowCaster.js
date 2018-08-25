/*
 * File: ShadowCaster.js
 * Renders a colored image representing the shadowCaster on the receiver
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Renderable, SpriteRenderable, Light, Transform, vec3, Math */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

// shadowCaster:    must be GameObject referencing at least a LightRenderable  
// shadowReceiver:  must be GameObject referencing at least a SpriteRenderable
/**
 * Default Constructor<p>
 * Renders a colored image representing the shadowCaster on the receiver
 * @param {ShadowCaster} shadowCaster must be GameObject referencing at least a LightRenderable
 * @param {ShadowReceiver} shadowReceiver  must be GameObject referencing at least a SpriteRenderable
 * @returns {ShadowCaster} New instance of ShadowCaster
 * @class ShadowCaster
 */
function ShadowCaster (shadowCaster, shadowReceiver) {
    this.mShadowCaster = shadowCaster;  
    this.mShadowReceiver = shadowReceiver;
    this.mCasterShader = gEngine.DefaultResources.getShadowCasterShader();
    this.mShadowColor = [0, 0, 0, 0.2];
    this.mSaveXform = new Transform();
    
    this.kCasterMaxScale = 3;   // maximum size a caster will be scaled
    this.kVerySmall = 0.001;    // 
    this.kDistanceFudge = 0.01; // Ensure shadow caster geometry is not at the exact same depth as receiver
    this.kReceiverDistanceFudge = 0.6; // Reduce the projection size increase of the caster geometry
}

/**
 * Set the shadow color
 * @param {Float[]} c new Color of shadow [R, G, B, A]
 * @returns {void}
 * @memberOf ShadowCaster
 */
ShadowCaster.prototype.setShadowColor = function (c) {
    this.mShadowColor = c;
};

ShadowCaster.prototype._computeShadowGeometry = function(aLight) {
    // Remember that z-value determines front/back
    //      The camera is located a z=some value, looking towards z=0
    //      The larger the z-value (larger height value) the closer to the camera
    //      If z > camera.Z, will not be visile
    
    // supports casting to the back of a receiver (if receiver is transparent)
    // then you can see shadow from the camera
    // this means, even when:
    //      1. caster is lower than receiver
    //      2. light is lower than the caster
    // it is still possible to cast shadow on receiver
    
    var cxf = this.mShadowCaster.getXform();
    var rxf = this.mShadowReceiver.getXform();
    // vector from light to caster
    var lgtToCaster = vec3.create();
    var lgtToReceiverZ;
    var receiverToCasterZ;
    var distToCaster, distToReceiver;  // measured along the lgtToCaster vector
    var scale;
    var offset = vec3.fromValues(0, 0, 0);
    
    receiverToCasterZ = rxf.getZPos() - cxf.getZPos();
    if (aLight.getLightType() === Light.eLightType.eDirectionalLight) {    
        if (((Math.abs(aLight.getDirection())[2]) < this.kVerySmall) || ((receiverToCasterZ * (aLight.getDirection())[2]) < 0)) {
            return false;   // direction light casting side way or
                            // caster and receiver on different sides of light in Z
        }
        vec3.copy(lgtToCaster, aLight.getDirection());
        vec3.normalize(lgtToCaster, lgtToCaster);
        
        distToReceiver = Math.abs(receiverToCasterZ / lgtToCaster[2]);  // distance measured along lgtToCaster
        scale = Math.abs(1/lgtToCaster[2]);
    } else {    
        vec3.sub(lgtToCaster, cxf.get3DPosition(), aLight.getPosition());
        lgtToReceiverZ = rxf.getZPos() - (aLight.getPosition())[2];
        
        if ((lgtToReceiverZ * lgtToCaster[2]) < 0) {
            return false;  // caster and receiver on different sides of light in Z
        }

        if ((Math.abs(lgtToReceiverZ) < this.kVerySmall) || ((Math.abs(lgtToCaster[2]) < this.kVerySmall))) {
            // alomst the same Z, can't see shadow
            return false;
        }

        distToCaster = vec3.length(lgtToCaster);
        vec3.scale(lgtToCaster, lgtToCaster, 1/distToCaster);  // normalize lgtToCaster
        
        distToReceiver = Math.abs(receiverToCasterZ / lgtToCaster[2]);  // distance measured along lgtToCaster
        scale = (distToCaster + (distToReceiver * this.kReceiverDistanceFudge)) / distToCaster;
    }
    vec3.scaleAndAdd(offset, cxf.get3DPosition(), lgtToCaster, distToReceiver + this.kDistanceFudge);
    
    cxf.setRotationInRad( cxf.getRotationInRad());
    cxf.setPosition(offset[0], offset[1]);
    cxf.setZPos(offset[2]);
    cxf.setWidth(cxf.getWidth() * scale);
    cxf.setHeight(cxf.getHeight() * scale);
    
    return true;
};

/**
 * Draw function called by GameLoop
 * @param {Camera} aCamera Camera to draw too
 * @returns {undefined}
 * @memberOf ShadowCaster
 */
ShadowCaster.prototype.draw = function(aCamera) {
    // loop through each light in this array, if shadow casting on the light is on
    // compute the proper shadow offset
    var casterRenderable = this.mShadowCaster.getRenderable();
    this.mShadowCaster.getXform().cloneTo(this.mSaveXform);
    var s = casterRenderable.swapShader(this.mCasterShader);
    var c = casterRenderable.getColor();
    casterRenderable.setColor(this.mShadowColor);
    var l, lgt;
    for (l = 0; l < casterRenderable.numLights(); l++) {
        lgt = casterRenderable.getLightAt(l);
        if (lgt.isLightOn() && lgt.isLightCastShadow()) {
            this.mSaveXform.cloneTo(this.mShadowCaster.getXform());
            if (this._computeShadowGeometry(lgt)) {
                this.mCasterShader.setLight(lgt);
                SpriteRenderable.prototype.draw.call(casterRenderable, aCamera);
            }
        }
    }
    this.mSaveXform.cloneTo(this.mShadowCaster.getXform());
    casterRenderable.swapShader(s);
    casterRenderable.setColor(c);
};
