/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function AwardBox(pixelPosition, spriteTexture, pos, size, light) {
    this.mPlatform = new LightRenderable(spriteTexture);

    this.mPlatform.setColor([1, 1, 1, 0]);
    this.mPlatform.getXform().setPosition(pos[0], pos[1]);
    this.mPlatform.getXform().setSize(size[0],size[1]);
    this.mPlatform.setElementPixelPosArray(pixelPosition);
    this.mLight = light;
    
    GameObject.call(this,this.mPlatform);
    
    var rigidShape = new RigidRectangle(this.getXform(), size[0], size[1]);
    rigidShape.setMass(0);  // ensures no movements!
    //rigidShape.setDrawBounds(true);
    rigidShape.setColor([1, 0.2, 0.2, 1]);
    this.setPhysicsComponent(rigidShape); 

    this.kDelta = 0.25;
    this.EndPos = null;
    this.StartPos = null;
    
    this.state = AwardBox.state.Waiting;
    this.animState = AwardBox.state.Waiting;
    
    this.oneTime = false;
    
    this.spawnedItem = null;
}
AwardBox.state = Object.freeze({
    Animating: 1,
    Waiting: 2,
    AnimUp: 3,
    AnimDown: 4
});

gEngine.Core.inheritPrototype(AwardBox, GameObject);


AwardBox.prototype.update = function (hero) {
    
    if(this.spawnedItem !== null){
        this.spawnedItem.update(hero);
    }
    
    var bb = this.getBBox();
    var heroBB = hero.getBBox();

    if(this.state === AwardBox.state.Waiting && !this.oneTime){
        var status = bb.boundCollideStatus(heroBB);
        //var status = heroBB.boundCollideStatus(bb);
        if(11 === status || 10 === status || 9 === status ){
             this._startAnimation();
        }
    }

    if(this.state === AwardBox.state.Animating){
        this.updateAnimation();
    }
    
    GameObject.prototype.update.call(this);
      
};

AwardBox.prototype.updateAnimation = function () {
    var currentPos = this.getXform().getYPos();
    
    if(currentPos < this.EndPos && AwardBox.state.AnimUp === this.animState){
        this.getXform().setYPos(currentPos + this.kDelta);
    }
    else if(currentPos >= this.EndPos && AwardBox.state.AnimUp === this.animState){
        this.animState = AwardBox.state.AnimDown;
        this.getXform().setYPos(this.EndPos);
    }
    else if(currentPos > this.StartPos && AwardBox.state.AnimDown === this.animState){
        this.getXform().setYPos(currentPos - this.kDelta);
    }
    else if(currentPos <= this.StartPos && AwardBox.state.AnimDown === this.animState){
        this.getXform().setYPos(this.StartPos);
        this._completeAnimation();

    }
};

AwardBox.prototype._completeAnimation = function () {
        this.state = AwardBox.state.Waiting;
        this.oneTime = true;
        this.mPlatform.setElementPixelPosArray([0,127,1408,1536]);
};

AwardBox.prototype._startAnimation = function () {
        this.state = AwardBox.state.Animating;
        this.StartPos = this.getXform().getYPos();
        this.animState = AwardBox.state.AnimUp;
        this.EndPos = this.StartPos + 3;
            
        if(this.spawnedItem === null){
            var spawnPosX = this.getXform().getXPos();
            var spawnPosY = this.getXform().getYPos() + 10;
            this.spawnedItem = new Item('heart', [spawnPosX,spawnPosY]);
            this.spawnedItem.addLight(this.mLight);
        }
            
};

AwardBox.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this,aCamera);
    if(this.spawnedItem !== null){
        this.spawnedItem.draw(aCamera);
    }
};

