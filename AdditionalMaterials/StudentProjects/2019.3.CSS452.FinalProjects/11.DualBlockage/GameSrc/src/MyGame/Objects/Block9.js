/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
 FontRenderable, SpriteRenderable, LineRenderable,
 GameObject, Block */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

// "S" Block
function Block9(posX, posY, sizeOfEachBlock) {
    this.mainColor = [0.53, 0.81, 0.93, 1];
    this.rot0 = [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0]
    ];
    this.rot1 = [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0]
    ];
    this.rot2 = [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0]
    ];
    this.rot3 = [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0]
    ];
    this.blockData = this.rot0;
    Block.call(this, posX, posY, this.mainColor, sizeOfEachBlock, this.rot0, this.rot1, this.rot2, this.rot3);
};
gEngine.Core.inheritPrototype(Block9, Block);