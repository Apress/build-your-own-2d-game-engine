/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Bullet(Btexture, atx, aty, vx, vy) {
    this.mBullet = new SpriteRenderable(Btexture);
    this.mBullet.setColor([0, 0, 0, 0]);
    this.mBullet.getXform().setPosition(atx, aty);
    this.mBullet.getXform().setSize(2, 2);
    this.mBullet.setElementPixelPositions(0, 164, 3, 191);
    
    GameObject.call(this, this.mBullet);
    
    var r = new RigidRectangle(this.getXform(), 1, 1);
    r.setMass(0);
    r.setRestitution(0);
    r.setColor([0, 0, 0.9, 1]);
    r.setDrawBounds(false);
    this.setPhysicsComponent(r);
    
    var v = this.getPhysicsComponent().getVelocity(); 
    v[0] = vx;
    v[1] = vy;
}
gEngine.Core.inheritPrototype(Bullet, GameObject);

/*Bullet.prototype.SetBulletSpeed = function(vx, vy) {
    var v = this.getPhysicsComponent().getVelocity(); 
    v[0] = vx;
    v[1] = vy;
};*/



