/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

Boss.prototype._initialItem = function( texture, x, y, width, height, light){ 
    var item = new LightRenderable(texture);

    item.getXform().setPosition( x , y);
    item.getXform().setSize( width, height);
    item.addLight(light);
    return item;
};
