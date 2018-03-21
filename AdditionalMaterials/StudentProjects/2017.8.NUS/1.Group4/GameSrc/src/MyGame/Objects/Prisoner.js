/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



/* global GameObject, gEngine */

function Prisoner(texture, atX, atY, width, height) {
    this.mPrison = new TextureRenderable(texture);

    this.mPrison.setColor([1, 1, 1, 0]);
    this.mPrison.getXform().setPosition(atX, atY);
    this.mPrison.getXform().setSize(width, height);
    
    GameObject.call(this, this.mPrison);
}
gEngine.Core.inheritPrototype(Prisoner, GameObject);