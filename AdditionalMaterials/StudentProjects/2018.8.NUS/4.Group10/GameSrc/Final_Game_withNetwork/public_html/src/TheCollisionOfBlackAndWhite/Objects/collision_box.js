/* File: FirstHero.js
 *
 * Creates and initializes the FirstHero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function collision_box(xform1, xform2){
    this.xform1 = xform1.getXform();
    this.xform2 = xform2.getXform();
    this.position1 = this.xform1.getPosition();
    this.position2 = this.xform2.getPosition();
    
    var deltax = Math.abs(this.position1[0]- this.position2[0]);
    var deltay = Math.abs(this.position1[1]- this.position2[1]);
    this.flag = 0;
    if(deltax < (Math.abs(this.xform1.getWidth())+Math.abs(this.xform2.getWidth())-20)/2  && deltay < (this.xform1.getHeight()+this.xform2.getHeight()-30))//-30 because we need gun_shot near hero to hit him.
    {
        this.flag = 1;
    }
    else
        this.flag = 0;
    
}
gEngine.Core.inheritPrototype(collision_box, GameObject);
