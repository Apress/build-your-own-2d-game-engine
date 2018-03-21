/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Starrysky() {
    this.kBackground = "assets/Level4/background.png" ;

    this.mBackground = new TextureRenderable(this.kBackground);
    this.mBackground.setColor([0, 0, 0, 0]);
    this.mBackground.getXform().setPosition(150,200 );
    this.mBackground.getXform().setSize(450, 400);
    GameObject.call(this, this.mBackground);
    
    
}
gEngine.Core.inheritPrototype(Starrysky, GameObject);
