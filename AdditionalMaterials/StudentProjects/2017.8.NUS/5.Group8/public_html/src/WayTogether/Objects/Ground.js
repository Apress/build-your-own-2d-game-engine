/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Ground(texture) {
    this.mGround = new SpriteRenderable(texture);
    this.mGround.setColor([0, 0, 0, 0]);
    this.mGround.getXform().setPosition(64, 0);
    this.mGround.getXform().setSize(128, 5);
    this.mGround.setElementPixelPositions(0, 512, 0, 113);
    
    GameObject.call(this, this.mGround);
    
    var r = new RigidRectangle(this.getXform(), 128, 5);
    r.setMass(0);
    r.setRestitution(0);
    //r.setFriction(1);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(false);
    this.setPhysicsComponent(r);
}
gEngine.Core.inheritPrototype(Ground, GameObject);
