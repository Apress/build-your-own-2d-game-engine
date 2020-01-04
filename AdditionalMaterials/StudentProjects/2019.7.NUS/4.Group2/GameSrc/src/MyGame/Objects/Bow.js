//The Bow of the Cupid

function Bow(spriteTexture, aCamera, Cupid, BowOffsetX) {
    SpriteRenderable.call(this,spriteTexture);
    this.setColor([1,1,1,0]);
    this.getXform().setSize(10,10);
    this.getXform().setPosition(Cupid.getXform().getXPos()+BowOffsetX,Cupid.getXform().getYPos());
    this.setElementPixelPositions(421,512,421,512);
    this.getXform().setRotationInDegree(-90);
    this.mCamera = aCamera;
    this.mBowOffset = BowOffsetX;
    this.cupidXform = Cupid.getXform();
}
gEngine.Core.inheritPrototype(Bow, SpriteRenderable);

Bow.prototype.update = function (radian,cosT,sinT) {
    //var theta = (radian - Math.PI / 2) * 180 / Math.PI;
    this.getXform().setRotationInRad(radian - Math.PI / 2);
    this.getXform().setPosition(this.cupidXform.getXPos()+ cosT * this.mBowOffset,this.cupidXform.getYPos() + sinT * this.mBowOffset);
}