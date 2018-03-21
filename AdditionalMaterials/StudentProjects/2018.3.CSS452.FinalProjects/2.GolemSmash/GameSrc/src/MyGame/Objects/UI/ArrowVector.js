/*
 * File: ArrowVector.js 
 * This class uses mouse inputs and creates a UI element to 
 * display the strength and angle that an arrow would be
 * fired at.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable, ResultsScreen
  GameObject, Hero, Arrow, TextureRenderable, RigidRectangle, Platform, Terrain,
  Config */
/* find out more about jslint: http://www.jslint.com/help.html */

class ArrowVector {
    /**
     * A set of line renderables tracking state used
     * to fire an arrow.
     * @param {Camera} cameraRef    a camera reference for accessing the mouse world coordinates  
     * @returns {ArrowVector}
     */
    constructor(cameraRef) {
        this.mMaxLength = Config.ArrowVector.MaxLength;
        this.mCameraRef = cameraRef;
        this.mLineSet = [];
        this.mVisible = false;
        this.mColor = [1,1,1,1];
        
        // 0 -> tip is static, 1 -> tail is static
        this.mFireMode = 0;
        this.mPrevCamPos = null;
        
        this._initialize();
        
    }
    /**
     * Add line renderables to mLineSet for initialiation.
     */
    _initialize() {
        var i,l;
        for (i = 0; i < 3; i++) {
            l = new LineRenderable();
            l.setColor(this.mColor);
            this.mLineSet.push(l);
        }
        var center = this.mCameraRef.getWCCenter();
        this.mPrevCamPos = [center[0], center[1]];
    }
    
    /**
     * Private utility function used for limited the length of the
     * ArrowVector and calculating power %.
     * @returns {Number} the length, in WC, of the ArrowVector 
     */
    _getDistance() {
        var p1 = this.mLineSet[0].getFirstVertex();
        var p2 = this.mLineSet[0].getSecondVertex();
        var pos1 = vec2.fromValues(p1[0], p1[1]);
        var pos2 = vec2.fromValues(p2[0], p2[1]);   
        return vec2.distance(pos1,pos2);
        
    }
    
    /**
     * Accepts an array of RGB values and changes the color of each
     * line renderable in mLineSet.
     * @param {Array} colorArray RGB value to set the line renderables to
     */
    setColor(colorArray) {
        var i;
        this.mColor = colorArray;
        for (i = 0; i < 3; i++) {
            this.mLineSet[i].setColor(colorArray);

        }
    }
    /**
     * Change the firing mode between the tip being static
     * and the tail being static.
     * @param {Number} mode number representing firing mode
     */
    setFireMode(mode) {
        if (mode === ArrowVector.eFiringModes.eHeadControl) {
            this.mFireMode = ArrowVector.eFiringModes.eHeadControl;
        }
        else {
            this.mFireMode = ArrowVector.eFiringModes.eTailControl;
        }
    }
    
    /**
     * Get the angle the Arrow vector is offset from i vector.
     * @returns {Number} angle in radians
     */
    getAngle() {
        var pos1 = this.getStartPoint();
        var pos2 = this.getEndPoint();
        var opp = pos1[1] - pos2[1];
        var adj = pos1[0] - pos2[0];
        // fix for division by zero when arrow is created with a zero vector
        var angle = Math.acos(adj/(this._getDistance() +.00001));
        if (opp < 0) {
            angle *= -1;
        }
        if (this.mFireMode === ArrowVector.eFiringModes.eTailControl) {
            return angle;
        }
        else {
            return angle + Math.PI;
        }
    }
    
    /**
     * Get the angle the Arrow vector is offset from i vector.
     * @returns {Number} angle in degrees
     */
    getDegrees() {
        return this.getAngle() * 180/Math.PI;
    }
    

    /**
     * Get the percentage of mMaxLength of ArrowVector's current state.
     * @returns {Number} percentage value
     */
    getPower() {
        var results = (this._getDistance()/this.mMaxLength);
        if (results > 1) {
            return 1;
        }
        else {
            return results;
        }
    }
    
    /**
     * Draw function that draws the line renderables with the given camera
     * @param {Camera} aCamera  camera to draw to
     */
    draw(aCamera) {
        if (this.mVisible) {
            var i, l;
            for (i = 0; i < this.mLineSet.length; i++) {
                l = this.mLineSet[i];
                l.draw(aCamera);
            }
        }
    }
    
    /**
     * private utility function to prevent the ArrowVector
     * for becoming longer than mMaxValue. Truncates one of the
     * vertices depending on the firing mode.
     */
    _truncateVector() {
        var dist = this._getDistance();
        if (dist > this.mMaxLength ) {
            dist = this.mMaxLength;
            var pos = this.getStartPoint();
            var x = pos[0];
            var y = pos[1];
            var angle = this.getAngle();
            if (this.mFireMode === 0) {
                angle += Math.PI;
            }
            x += (this.mMaxLength * Math.cos(angle));
            y += (this.mMaxLength * Math.sin(angle));
           this.setEndPoint(x, y);
           this.setColor([1,0,0,1]);
        }
        else if (dist > 0) {
            var col = .7*dist/this.mMaxLength;
            this.setColor([1, 1 - col, 1 - col, 1]);
        }
        else {
            this.setColor([1,1,1,1]);
        }
    }
    
    /**
     * Private utility function that updates the vertices
     * of the arrow tip.
     */
    _updateWings() {
        var basePos = this.mLineSet[0].getFirstVertex();
        this.mLineSet[1].setFirstVertex(basePos[0], basePos[1]);
        this.mLineSet[2].setFirstVertex(basePos[0], basePos[1]);
        var angle = this.getAngle() + 3*Math.PI/4;
        this.mLineSet[1].setSecondVertex(basePos[0] + 2*Math.cos(angle), basePos[1] + 2*Math.sin(angle));
        angle += Math.PI/2;
        this.mLineSet[2].setSecondVertex(basePos[0] + 2*Math.cos(angle), basePos[1] + 2*Math.sin(angle));
        
    }
    
    /**
     * Set the value of the static vertex depending on the firing mode.
     * @param {Number} x WC value of X coordinate
     * @param {Number} y WC value of Y coordinate
     */
    setStartPoint(x,y) {
        if (this.mFireMode === ArrowVector.eFiringModes.eTailControl) {
            this.mLineSet[0].setFirstVertex(x, y);
        }
        if (this.mFireMode === ArrowVector.eFiringModes.eHeadControl) {
            this.mLineSet[0].setSecondVertex(x, y);
        }
    }
    
     /**
     * Set the value of the dynamic vertex depending on the firing mode.
     * @param {Number} x WC value of X coordinate
     * @param {Number} y WC value of Y coordinate
     */
    setEndPoint(x,y) {
        
        if (this.mFireMode === ArrowVector.eFiringModes.eTailControl) {
            this.mLineSet[0].setSecondVertex(x, y);
        }
        if (this.mFireMode === ArrowVector.eFiringModes.eHeadControl) {
            this.mLineSet[0].setFirstVertex(x, y);
        }
    }
    
    /**
     * Get the value of the static vertex depending on the firing mode.
     * @returns {vec2} coordinates of the static vertex
     */
    getStartPoint() {
        if (this.mFireMode === ArrowVector.eFiringModes.eTailControl) {
            return this.mLineSet[0].getFirstVertex();
        }
        if (this.mFireMode === ArrowVector.eFiringModes.eHeadControl) {
            return this.mLineSet[0].getSecondVertex();
        }
    }
    
     /**
     * Get the value of the dynamic vertex depending on the firing mode.
     * @returns {vec2} coordinates of the dynamic vertex
     */
    getEndPoint(){
        
        if (this.mFireMode === ArrowVector.eFiringModes.eTailControl) {
            return this.mLineSet[0].getSecondVertex();
        }
        if (this.mFireMode === ArrowVector.eFiringModes.eHeadControl) {
            return this.mLineSet[0].getFirstVertex();
        }
    }
    
    /**
     * Update the vertices of the line renderables to move with the world camera.
     */
    _cameraOffsetUpdate() {
        var pos = this.mCameraRef.getWCCenter();
        if (pos[0] !== this.mPrevCamPos[0] || pos[1] !== this.mPrevCamPos[1] ) {
            var offset = [pos[0] - this.mPrevCamPos[0], pos[1] - this.mPrevCamPos[1]]
            var i, l;
            for (i = 0; i < this.mLineSet.length; i++) {
                l = this.mLineSet[i];
                l.offsetFirstVertex(offset[0], offset[1]);
                l.offsetSecondVertex(offset[0], offset[1]);
            }
            this.mPrevCamPos = [pos[0], pos[1]];
        }

    }
    
    
    /**
     * Updates the state of the ArrowVector depending on the user
     * mouse inputs.
     */
    update() {
        var x, y;
        if (this.mCameraRef.isMouseInViewport()) {
            if (gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Left) && this.mVisible === false) {
                x = this.mCameraRef.mouseWCX();
                y = this.mCameraRef.mouseWCY();
                this.setStartPoint(x, y);
                this.mVisible = true;

            }
            if (this.mVisible && gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Left)) {
                x = this.mCameraRef.mouseWCX();
                y = this.mCameraRef.mouseWCY();
                this.setEndPoint(x, y);
                this._truncateVector();
                this._updateWings();
                
            }
            if (gEngine.Input.isButtonReleased(gEngine.Input.mouseButton.Left)) {
                this.mVisible = false;
                // TODO: Call firing function for arrows at this point
            }
        }
    this._cameraOffsetUpdate();
    }
}

// States for the firing mode of arrows. Mainly for development, may be deleted.
ArrowVector.eFiringModes = Object.freeze({
        eTailControl: 0,
        eHeadControl: 1
});
