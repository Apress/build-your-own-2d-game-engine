/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Switcher(texture, atx, aty) {
    this.mSwitcher = new SpriteRenderable(texture);
    this.mSwitcher.setColor([0, 0, 0, 0]);
    this.mSwitcher.getXform().setPosition(atx, aty);
    this.mSwitcher.getXform().setSize(4, 8);
    this.mSwitcher.setElementPixelPositions(2, 149, 0, 345);
    
    this.IsOpen = false;
    
    GameObject.call(this, this.mSwitcher);
    
    var r = new RigidRectangle(this.getXform(), 4, 8);
    r.setMass(0);
    r.setRestitution(0);
    //r.setFriction(1);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(false);
    this.setPhysicsComponent(r);
}
gEngine.Core.inheritPrototype(Switcher, GameObject);

Switcher.prototype.update = function() {
    GameObject.prototype.update.call(this);
    if(this.IsOpen === true){this.mSwitcher.setElementPixelPositions(149, 296, 0, 345);}
};

Switcher.prototype.SetIsOpen = function(){
    this.IsOpen = true;
};

Switcher.prototype.GetIsOpen = function(){
    return this.IsOpen;
};