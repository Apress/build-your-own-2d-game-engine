/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*global gEngine: false, Renderable: false ,GameObject*/
"use strict";
function Level4Platform(Mapobj,index){
    this.MinXPos= Mapobj.xPos-Mapobj.width*1.0/2;
    this.MinYPos= Mapobj.yPos-Mapobj.height*1.0/2;
    this.MaxXPos= Mapobj.xPos+Mapobj.width*1.0/2;
    this.MaxYPos= Mapobj.yPos+ Mapobj.height*1.0/2;
    this.platformindex= index;

};
gEngine.Core.inheritPrototype(Level4Platform,GameObject);

