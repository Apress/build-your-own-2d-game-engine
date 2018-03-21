/* File: ArrowSet.js 
 *
 * Support for working with a set of Arrows
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2, RigidShape, RigidRectangle,
 *       Platform, ArrowSet, Arrow, FireArrow, IceArrow, Config, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

class ArrowSet extends GameObjectSet {
    
    /**
    * Default Constructor
    * Support for working with a set of Arrows, including Ice & Fire Arrows
    * @param {Array} lights to be used for special arrows. Must be exactly the size of
    *                the max number of special arrows.
    * @returns {ArrowSet} New instance of ArrowSet
    * @class ArrowSet
    */
    constructor(lights){
        super();
        
        // { Regular : 0, Fire : 1, Ice : 2 }
        // Cooldowns (frames) for each type of arrow
        this.kCooldowns = [20, 180, 180];
        this.mTimeSinceSpawn = [20, 180, 180];
        // max count of each arrow type
        this.kMaxCount = [25, 8, 8];
        
        this.mRegArrows = new GameObjectSet();
        this.mFireArrows = new GameObjectSet();
        this.mIceArrows = new GameObjectSet();
        this.mFireArrowLights = [];
        this.mIceArrowLights = [];
        this.initLights(lights);
    }
    
    /**
    * Add Arrow to this ArrowSet and a subset for specific arrow type
    * @param {GameObject} obj to add to this GameObjectSet
    * @returns {void}
    * @memberOf ArrowSet
    */
    addToSet(obj) {
        var success = false;
        if (obj instanceof Arrow){
            if (obj instanceof FireArrow) {
                if (this.mFireArrows.size() < this.kMaxCount[1] && this.mTimeSinceSpawn[1] > this.kCooldowns[1]) {
                    this.mFireArrows.addToSet(obj);
                    this.mTimeSinceSpawn[1] = 0;
                    success = true;
                    for (var i = 0; i < this.mFireArrowLights.length; i++) {
                        if (this.mFireArrowLights[i].isLightOn() === false) {
                            obj.setLight(this.mFireArrowLights[i]);
                            break;
                        }
                    }
                }
            }
            else if (obj instanceof IceArrow) {
                if (this.mIceArrows.size() < this.kMaxCount[2] && this.mTimeSinceSpawn[2] > this.kCooldowns[2]) {
                    this.mIceArrows.addToSet(obj);
                    this.mTimeSinceSpawn[2] = 0;
                    success = true;
                    for (var i = 0; i < this.mIceArrowLights.length; i++) {
                        if (this.mIceArrowLights[i].isLightOn() === false) {
                            obj.setLight(this.mIceArrowLights[i]);
                            break;
                        }
                    }
                }
            }
            else {
                if (this.mRegArrows.size() < this.kMaxCount[0] && this.mTimeSinceSpawn[0] > this.kCooldowns[0]) {
                    this.mRegArrows.addToSet(obj);
                    this.mTimeSinceSpawn[0] = 0;
                    success = true;
                }
            }
            if (this.size() < this.kMaxCount.reduce((accumulator, currentValue) => accumulator + currentValue) && success) {
                super.addToSet(obj);
            }
            return success;
        }
        return success;
    }
    
    /**
    * Return the count of Arrows in set
    * @returns {Number} count of Arrows in set
    * @memberOf ArrowSet
    */
    size() {
        var sum = 0;
        sum += this.mRegArrows.size();
        sum += this.mFireArrows.size();
        sum += this.mIceArrows.size();
        return sum - 1;
    }
    
    /**
    * Remove Arrow from ArrowSet & subsets
    * @param {GameObject} obj to remove from GameObjectSet
    * @returns {void}
    * @memberOf GameObjectSet
    */
    removeFromSet(obj) {
        this.mRegArrows.removeFromSet(obj);
        this.mFireArrows.removeFromSet(obj);
        this.mIceArrows.removeFromSet(obj);
        if (obj instanceof FireArrow || obj instanceof IceArrow) {
            obj.turnLightOff();
        }
        super.removeFromSet(obj);
    }
    
    /**
    * Update function called by GameLoop calls all Arrows's in ArrowSet
    * Will remove expired arrows from the set.
    * @returns {void}
    * @memberOf ArrowSet
    */
    update() {
        var i;
        for (i = 0; i < this.mTimeSinceSpawn.length; i++) {
            this.mTimeSinceSpawn[i]++;
        }
        var size = this.size();
        var arrow = null;
        for (i = 0; i < size; i++) {
            arrow = this.getObjectAt(i);
            if (arrow.isExpired()) {
                this.removeFromSet(arrow);
            }
        }
    }
    
    /**
     * Initializes the light sets for the Fire/Ice arrows.
     * 
     * @param {Array} lights    Array of lights.
     * @returns {undefined}
     */
    initLights(lights) {
        for (var i = 0; i < this.kMaxCount[1]; i++) {
            this.mFireArrowLights.push(lights[i]);
            this.initFireArrowLight(lights[i]);
        }
        
        for (var i = 0; i < this.kMaxCount[2]; i++) {
            this.mIceArrowLights.push(lights[this.kMaxCount[1] + i]);
            this.initIceArrowLight(lights[this.kMaxCount[1] + i]);
        }
    }
    
    /**
     * Initializes a fire-themed light.
     * 
     * @param {Light} light
     * @returns {undefined}
     */
    initFireArrowLight(light) {
        light.setLightType(Light.eLightType.ePointLight);
        light.setColor(Config.Arrows.Fire.Light.Color);
        light.setZPos(Config.Arrows.Fire.Light.ZPosition);
        light.setDirection(Config.Arrows.Fire.Light.Direction);
        light.setNear(Config.Arrows.Fire.Light.Near);
        light.setFar(Config.Arrows.Fire.Light.Far);
        light.setInner(Config.Arrows.Fire.Light.Inner);
        light.setOuter(Config.Arrows.Fire.Light.Outer);
        light.setIntensity(Config.Arrows.Fire.Light.Intensity);
        light.setDropOff(Config.Arrows.Fire.Light.DropOff);
        light.setLightCastShadowTo(false);
        light.setLightTo(false);
    }
    
    /**
     * Initializes a ice-themed light.
     * 
     * @param {Light} light
     * @returns {undefined}
     */
    initIceArrowLight(light) {
        light.setLightType(Light.eLightType.ePointLight);
        light.setColor(Config.Arrows.Ice.Light.Color);
        light.setZPos(Config.Arrows.Ice.Light.ZPosition);
        light.setDirection(Config.Arrows.Ice.Light.Direction);
        light.setNear(Config.Arrows.Ice.Light.Near);
        light.setFar(Config.Arrows.Ice.Light.Far);
        light.setInner(Config.Arrows.Ice.Light.Inner);
        light.setOuter(Config.Arrows.Ice.Light.Outer);
        light.setIntensity(Config.Arrows.Ice.Light.Intensity);
        light.setDropOff(Config.Arrows.Ice.Light.DropOff);
        light.setLightCastShadowTo(false);
        light.setLightTo(false);
    }
}

ArrowSet.prototype.getCooldownStatus = function() {
    var status = [false, false, false];
    var i;
    for(i = 0; i < 3; i++)
        status[i] = this.mTimeSinceSpawn[i] > this.kCooldowns[i];
    
    return status;
};

ArrowSet.eArrowType = Object.freeze({
        eDefaultArrow: 0,
        eFireArrow: 1,
        eIceArrow: 2
});