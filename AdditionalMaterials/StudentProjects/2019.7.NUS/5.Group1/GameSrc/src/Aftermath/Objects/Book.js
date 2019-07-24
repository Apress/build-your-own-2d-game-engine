/* File: Book.js 
 *
 * Creates and initializes a ploatform object
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable, RigidRectangle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Book(texture, atX, atY) {
    this.mBook = new SpriteRenderable(texture);

    this.mBook.setColor([1, 1, 1, 0]);
    this.mBook.getXform().setPosition(atX, atY);
    // this.mBook.getXform().setSize(30, 3.75);
    this.mBook.getXform().setSize(8, 8);
    this.mBook.setElementPixelPositions(2120, 2380, 2500, 2730);


    // show each element for mAnimSpeed updates
    GameObject.call(this, this.mBook);

}
gEngine.Core.inheritPrototype(Book, GameObject);