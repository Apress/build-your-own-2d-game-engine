/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
 FontRenderable, SpriteRenderable, LineRenderable,
 GameObject, Block */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

// "." Block
function Block1(posX, posY, sizeOfEachBlock, c) {
    this.mainColor = c;
    this.rot0 = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
    ];
    this.rot1 = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
    ];
    this.rot2 = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
    ];
    this.rot3 = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
    ];
    this.blockData = this.rot0;
    Block.call(this, posX, posY, this.mainColor, sizeOfEachBlock, this.rot0, this.rot1, this.rot2, this.rot3);
};
gEngine.Core.inheritPrototype(Block1, Block);