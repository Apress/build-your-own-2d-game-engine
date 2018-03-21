/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

function Bar(basket, left){
    this.mBar = Renderable();

    if(left){
        this.mBar.setPosition(basket.getXform().getXPos() - 3.5, basket.getXform().getYPos() + 1.5);
    } else {
        this.mBar.setPosition(basket.getXform().getXPos() + 3.5, basket.getXform().getYPos() + 1.5);
    }
    this.mBar.getXform().setSize(1, 1);
    this.mBar.setColor([0, 0, 0, 0]);
    
    GameObject.call(this, this.mBar);
    //this..setMass(0);
    
    var r = new RigidCircle(this.getXform(), .5);
    r.setMass(0);
    //r.setRestitution(0.9);
    //r.setInertia(0.9);
    //r.setFriction(0.5);a
    this.setRigidBody(r);
    
    this.toggleDrawRigidShape();
    
}
gEngine.Core.inheritPrototype(Bar, GameObject);