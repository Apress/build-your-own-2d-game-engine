/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Princess() {
    this.kPrincess =  "assets/princess.png" ;

    this.mPrincess = new TextureRenderable(this.kPrincess);
    this.mPrincess.setColor([0, 0, 0, 0]);
    this.mPrincess.getXform().setPosition(178, 5.6);
    this.mPrincess.getXform().setSize(3, 3.2);
    GameObject.call(this, this.mPrincess);
    

}

gEngine.Core.inheritPrototype(Princess, GameObject);

Princess.prototype.setPosition = function(x, y){
    this.mPrincess.getXform().setPosition(x, y);
};

Princess.prototype.setSize = function(w, h){
    this.mPrincess.getXform().setSize(w, h);
};
