/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Wall(texture, atx, aty, mwidth, mheight, p1, p2, p3, p4) {
    this.mGround = new SpriteRenderable(texture);
    this.mGround.setColor([0, 0, 0, 0]);
    this.mGround.getXform().setPosition(atx, aty);
    this.mGround.getXform().setSize(mwidth, mheight);
    this.mGround.setElementPixelPositions(p1, p2, p3, p4);
    
    GameObject.call(this, this.mGround);
    
    var r = new RigidRectangle(this.getXform(), this.getXform().getWidth(), this.getXform().getHeight());
    r.setMass(0);
    r.setRestitution(0);
    //r.setFriction(1);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(false);
    this.setPhysicsComponent(r);
}
gEngine.Core.inheritPrototype(Wall, GameObject);
