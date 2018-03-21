/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function DevilMove(spriteTexture, BulletTexture, atx, aty) {
    this.mDevil = new SpriteRenderable(spriteTexture);
    this.mDevil.setColor([0, 0, 0, 0]);
    this.mDevil.getXform().setPosition(atx, aty);
    this.mDevil.getXform().setSize(8, 8);
    this.mDevil.setElementPixelPositions(0, 272, 0, 193);
    
    this.mDevil.bTex = BulletTexture;
    //this.MoveRangel = 8;
    //this.MoveRanger = 120;
    /*this.mDevil = new Renderable();
    this.mDevil.setColor([0, 0, 0, 0]);
    this.mDevil.getXform().setPosition(atx, aty);
    this.mDevil.getXform().setSize(8, 8);*/
    //this.mDevil.setElementPixelPositions(0, 272, 0, 193);
    
    this.mBulletSet = new GameObjectSet();
    
    this.ShootCircle = 0;
    this.ShootTime = 100;
        
    GameObject.call(this, this.mDevil);
    
    var r = new RigidRectangle(this.getXform(), 8, 8);
    r.setMass(0);
    r.setRestitution(0);
    r.setColor([0.8, 0.7, 0, 1]);
    r.setDrawBounds(false);
    this.setPhysicsComponent(r);
    
    var v = this.getPhysicsComponent().getVelocity(); 
    v[0] = 10;
    v[1] = 0;
}
gEngine.Core.inheritPrototype(DevilMove, GameObject);

DevilMove.prototype.draw = function(aCamera) {
   GameObject.prototype.draw.call(this, aCamera);
   this.mBulletSet.draw(aCamera);  
};

DevilMove.prototype.update = function() {
    this.mBulletSet.update();
    GameObject.prototype.update.call(this);
    var b;
    var v = this.getPhysicsComponent().getVelocity(); 
    
    if(this.getXform().getXPos() < 8 || this.getXform().getXPos() > 120){v[0] = -v[0];}
    
    this.ShootCircle++;
    if(this.ShootCircle > this.ShootTime){
        this.ShootCircle = 0;
        b = new Bullet(this.mDevil.bTex,this.getXform().getXPos(), this.getXform().getYPos(), 0, -20);
        this.mBulletSet.addToSet(b);
    }
    if(this.mBulletSet.length > 0)
    {
        if(this.mBulletSet[0].getXform().getXPos() > 128 || this.mBulletSet[0].getXform().getXPos() < 0 || this.mBulletSet[0].getXform().getYPos() < 0){
            this.mBulletSet.removeFromSet(this.mBulletSet[0]);
        }
    }
};

DevilMove.prototype.GetBullets = function() {
    return this.mBulletSet;
};
