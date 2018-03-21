/* File: LineSet.js 
 *
 * Maintains a set of lines, allow adding one vertex at a time.
 * 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, LineRenderable, LineSet, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

// LMB DRAG: add new second vertex
// LMB Release: release
// MMB Click: erase
LineSet.prototype.update= function(aCamera) {
    var currentLine = this.currentLine();
    var x = aCamera.mouseWCX();
    var y = aCamera.mouseWCY();
    var p1, p2;
    
    if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) {
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.E)) {
            var l = this.newLine(x, y);
            if (currentLine !== null) {
                p1 = currentLine.getSecondVertex();
                l.setFirstVertex(p1[0], p1[1]);
            }
            currentLine = l;
        }
    }
    
    if (currentLine === null)
        return;
    
    if (gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Left)) {       
        currentLine.setSecondVertex(x, y);
    }

    if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Middle)) {       
        this.mTheSet = [];
    }
};


