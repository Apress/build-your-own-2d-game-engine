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

function Background(texture, _color, _pos, _size) {
    this.mSprite = new LightRenderable(texture);
    this.mSprite.setColor(_color);
    this.mSprite.getXform().setPosition(_pos[0], _pos[1]);
    this.mSprite.getXform().setSize(_size[0], _size[1]);
    
    GameObject.call(this, this.mSprite);
};
gEngine.Core.inheritPrototype(Background, GameObject);

