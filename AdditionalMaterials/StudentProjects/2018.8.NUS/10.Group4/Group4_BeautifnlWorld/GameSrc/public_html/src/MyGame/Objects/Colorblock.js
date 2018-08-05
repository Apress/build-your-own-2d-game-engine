/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Colorblock(/*spriteTexture,*/atX, atY) {
    //this.texture = spriteTexture;
    //this.mDye = new SpriteRenderable(this.texture);
    this.mDye = new Renderable();
    this.mDye.setColor([1,1,1,1]);
    this.mDye.getXform().setPosition(atX, atY);
    this.mDye.getXform().setSize(8, 8);
    GameObject.call(this, this.mDye);
    
    var r = new RigidRectangle(this.getXform(), 8, 8);
    r.setMass(0);
    this.setRigidBody(r);
    //this.toggleDrawRenderable();
    //this.toggleDrawRigidShape();

}
gEngine.Core.inheritPrototype(Colorblock, GameObject);

Colorblock.prototype.update = function () {
    GameObject.prototype.update.call(this);
    this.getRigidBody().userSetsState();
};
