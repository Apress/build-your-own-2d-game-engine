/* 
 * File: Walls.js
 * Created by phreeze Tang 25/7/2017
 * Defined the walls.
 */

/* global GameObject, gEngine */

function Wall(wallTexture, posX, posY, width, height) {
    this.mWall = new LoopSpriteRenderable(wallTexture);
    this.mWall.setColor([1.0, 1.0, 1.0, 0.0]);
    this.mWall.getXform().setPosition(posX, posY);
    this.mWall.getXform().setSize(width, height);
    //this.mWall.setElementUVCoordinate(0, 1, 0, 1);
    this.mWall.setElementUVCoordinate(0, width, 0, height);
    GameObject.call(this, this.mWall);
}
gEngine.Core.inheritPrototype(Wall, GameObject);