/* 
 * David Watson
 * CSS 490C
 * 2D Game Engine Design
 * File: ShadowCaster.js 
 * 
 * This file defines an object to act as a shadow caster
 */

function ShadowCaster(shadowCaster, shadowReceiver) {
    this.mShadowCaster = shadowCaster;
    this.mShadowReceiver = shadowReceiver;
    this.mCasterShader = gEngine.DefaultResources.getShadowCasterShader();
    this.mShadowColor = [0, 0, 0, 0.2];
    this.mSaveXform = new Transform();
    this.kCasterMaxScale = 3;   // maximum size a caster will be scaled
    this.kVerySmall = 0.001; //
    this.kDistanceFudge = 0.01;
    // Ensure shadow caster is not at the same depth as receiver
    this.kReceiverDistanceFudge = 0.6;
    // Reduce the projection size increase of the caster
}


ShadowCaster.prototype.draw = function (aCamera) {
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

ShadowCaster.prototype._computeShadowGeometry = function (aLight) {
    // Region 1: variable initialization
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
        // Region 2: parallel projection based on the directional light
        if (((Math.abs(aLight.getDirection())[2]) < this.kVerySmall) ||
                ((receiverToCasterZ * (aLight.getDirection())[2]) < 0)) {
            return false;   // direction light casting side way or
            // caster and receiver on different sides of light in Z
        }
        vec3.copy(lgtToCaster, aLight.getDirection());
        vec3.normalize(lgtToCaster, lgtToCaster);
        distToReceiver = Math.abs(receiverToCasterZ / lgtToCaster[2]);
        // distant measured along lgtToCaster
        scale = Math.abs(1 / lgtToCaster[2]);
    } else {
        // Region 3: projection from a point (point light or spot light position)
        vec3.sub(lgtToCaster, cxf.get3DPosition(), aLight.getPosition());
        lgtToReceiverZ = rxf.getZPos() - (aLight.getPosition())[2];
        if ((lgtToReceiverZ * lgtToCaster[2]) < 0) {
            return false; // caster and receiver on different sides of light in Z
        }
        if ((Math.abs(lgtToReceiverZ) < this.kVerySmall) ||
                ((Math.abs(lgtToCaster[2]) < this.kVerySmall))) {
            // alomst the same Z, can't see shadow
            return false;
        }
        distToCaster = vec3.length(lgtToCaster);
        vec3.scale(lgtToCaster, lgtToCaster, 1 / distToCaster);
        // normalize lgtToCaster
        distToReceiver = Math.abs(receiverToCasterZ / lgtToCaster[2]);
        // distant measured along lgtToCaster
        scale = (distToCaster + (distToReceiver * this.kReceiverDistanceFudge))
                / distToCaster;
    }
    // Region 4: sets the cxf transform
    vec3.scaleAndAdd(offset, cxf.get3DPosition(), lgtToCaster,
            distToReceiver + this.kDistanceFudge);
    cxf.setRotationInRad(cxf.getRotationInRad());
    cxf.setPosition(offset[0], offset[1]);
    cxf.setZPos(offset[2]);
    cxf.setWidth(cxf.getWidth() * scale);
    cxf.setHeight(cxf.getHeight() * scale);
    return true;
};