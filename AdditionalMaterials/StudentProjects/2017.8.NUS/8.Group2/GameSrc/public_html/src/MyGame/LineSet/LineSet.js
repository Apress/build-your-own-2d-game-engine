/* File: LineSet.js 
 *
 * Maintains a set of lines, allow adding one vertex at a time.
 * 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, LineRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function LineSet() {
    this.mTheSet = [];
}

LineSet.prototype.setSize = function() {
    return this.mTheSet.length;
};

LineSet.prototype.currentLine = function() {
    // always the last one
    var l = null;
    if (this.mTheSet.length > 0)
        l = this.mTheSet[this.mTheSet.length-1];
    return l;
};

LineSet.prototype.newLine = function(x, y) {
    // always the last one
    var l = new LineRenderable();
    l.setFirstVertex(x, y);
    l.setSecondVertex(x+0.1, y+0.1);
    this.mTheSet.push(l);
    return l;
};

LineSet.prototype.getLineAt = function(i) {
    return this.mTheSet[i];
};

LineSet.prototype.draw = function(aCamera) {
    var i;
    for (i=0; i<this.mTheSet.length; i++) {
        this.mTheSet[i].draw(aCamera);
    }
};