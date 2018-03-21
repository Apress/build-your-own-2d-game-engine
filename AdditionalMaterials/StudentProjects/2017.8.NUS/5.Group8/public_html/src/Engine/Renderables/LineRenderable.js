/*
 * File: LineRenderable.js
 *  
 * Renderable objects for lines
 */

/*jslint node: true, vars: true */
/*global gEngine, Renderable, vec2*/
/* find out more about jslint: http://www.jslint.com/help.html */

// Constructor and object definition
"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Default Constructor<p>
 * Renderable objects for lines<p>
 * p1, p2: either both there, or none
 * @param {Number} x1 X position of point 1
 * @param {Number} y1 Y position of point 1
 * @param {Number} x2 X position of point 2
 * @param {Number} y2 Y position of point 2
 * @returns {LineRenderable} New instance of LineRenderable
 * @class LineRenderable
 */
function LineRenderable(x1, y1, x2, y2) {
    Renderable.call(this);
    Renderable.prototype.setColor.call(this, [0, 0, 0, 1]);
    Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getLineShader());

    this.mPointSize = 1;
    this.mDrawVertices = false;
    this.mShowLine = true;

    this.mP1 = vec2.fromValues(0, 0);
    this.mP2 = vec2.fromValues(0, 0);

    if (x1 !== "undefined") {
        this.setVertices(x1, y1, x2, y2);
    }
}
gEngine.Core.inheritPrototype(LineRenderable, Renderable);

//<editor-fold desc="Public Methods">
//**-----------------------------------------
// Public methods
//**-----------------------------------------
/**
 * Draw function called by GameLoop
 * @param {Camera} aCamera to draw the Renderable to
 * @returns {void}
 * @memberOf LineRenderable
 */
LineRenderable.prototype.draw = function (aCamera) {
    this.mShader.setPointSize(this.mPointSize);
    // Draw line instead of triangle!
    var gl = gEngine.Core.getGL();
    this.mShader.activateShader(this.mColor, aCamera);  // always activate the shader first!

    var sx = this.mP1[0] - this.mP2[0];
    var sy = this.mP1[1] - this.mP2[1];
    var cx = this.mP1[0] - sx / 2;
    var cy = this.mP1[1] - sy / 2;
    var xf = this.getXform();
    xf.setSize(sx, sy);
    xf.setPosition(cx, cy);

    this.mShader.loadObjectTransform(this.mXform.getXform());
    if (this.mShowLine) {
        gl.drawArrays(gl.LINE_STRIP, 0, 2);
    }
    if (!this.mShowLine || this.mdrawVertices) {
        gl.drawArrays(gl.POINTS, 0, 2);
    }
};

/**
 * Sets the Draw Verticies state of LineRenderable
 * @param {Boolean} s new draw verticies state
 * @returns {void}
 * @memberOf LineRenderable
 */
LineRenderable.prototype.setDrawVertices = function (s) { this.mDrawVertices = s; };

/**
 * Set the Show Line state of LineRenderable
 * @param {Boolean} s new show line state
 * @returns {void}
 * @memberOf LineRenderable
 */
LineRenderable.prototype.setShowLine = function (s) { this.mShowLine = s; };

/**
 * Set the point size of LineRenderable
 * @param {Number} s new point size
 * @returns {void}
 * @memberOf LineRenderable
 */
LineRenderable.prototype.setPointSize = function (s) { this.mPointSize = s; };

/**
 * Set the vertice drawing points
 * @param {type} x1 X position of point 1
 * @param {type} y1 Y position of point 1
 * @param {type} x2 X position of point 2
 * @param {type} y2 Y position of point 2
 * @returns {void}
 * @memberOf LineRenderable
 */
LineRenderable.prototype.setVertices = function (x1, y1, x2, y2) {
    this.setFirstVertex(x1, y1);
    this.setSecondVertex(x2, y2);
};

/**
 * Set the first vertice point
 * @param {Number} x X position of point 1
 * @param {Number} y Y position of point 1
 * @returns {void}
 * @memberOf LineRenderable
 */
LineRenderable.prototype.setFirstVertex = function (x, y) {
    this.mP1[0] = x;
    this.mP1[1] = y;
};

/**
 * Set the second vertice point
 * @param {Number} x X position of point 2
 * @param {Number} y Y position of point 2
 * @returns {void}
 * @memberOf LineRenderable
 */
LineRenderable.prototype.setSecondVertex = function (x, y) {
    this.mP2[0] = x;
    this.mP2[1] = y;
};

//--- end of Public Methods
//</editor-fold>