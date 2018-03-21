/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function FinishLine(texture, atx, aty, mlength) {
    this.mFL = new SpriteRenderable(texture);
    this.mFL.setColor([0, 0, 0, 0]);
    this.mFL.getXform().setPosition(atx, aty);
    this.mFL.getXform().setSize(mlength, 5);
    this.mFL.setElementPixelPositions(0, 848, 0, 64);
    
    GameObject.call(this, this.mFL);
    
    var r = new RigidRectangle(this.getXform(), mlength, 0.1);
    r.setMass(0);
    r.setRestitution(0);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(false);
    this.setPhysicsComponent(r);
}
gEngine.Core.inheritPrototype(FinishLine, GameObject);
