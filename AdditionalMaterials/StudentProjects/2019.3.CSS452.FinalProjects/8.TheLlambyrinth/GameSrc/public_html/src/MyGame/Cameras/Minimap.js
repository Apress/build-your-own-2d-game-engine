/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Minimap(mapwidth,mapheight) { 
    this.smallCam = new Camera(
        vec2.fromValues(mapwidth/2, mapheight/2),            
        mapwidth,                                 
        [600,400,200,200]);                                    //[0, 0, 800, 600]
    this.smallCam.setBackgroundColor([0.5, 0.26, 0.23, 1.0]);
};

Minimap.prototype.getMinimap = function () {
    return this.smallCam;
};
