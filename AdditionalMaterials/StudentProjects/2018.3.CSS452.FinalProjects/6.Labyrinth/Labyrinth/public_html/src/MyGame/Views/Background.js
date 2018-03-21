/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable, LightRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Background(texture) {
    this.mSprite = new LightRenderable(texture);
    this.mSprite.setColor([1, 1, 1, 0]);
    this.mSprite.getXform().setPosition(0, 0);
    this.mSprite.getXform().setSize(400, 200);
    
    GameObject.call(this, this.mSprite);
};
gEngine.Core.inheritPrototype(Background, GameObject);

