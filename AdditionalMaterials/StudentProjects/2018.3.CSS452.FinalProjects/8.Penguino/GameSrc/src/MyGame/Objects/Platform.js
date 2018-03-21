function Platform(scene, spr, x, y, w, h, angle)
{
  this.mScene = scene;
  this.kSpriteSheet = spr;
  
  this.mSolid = true;

  this.mSprite = new Renderable();
  this.mSprite.setColor([0,0,0,1]);
  this.mSprite.getXform().setPosition(x,y);
  this.mSprite.getXform().setSize(w,h);
  this.mSprite.getXform().setRotationInDegree(angle);

  GameObject.call(this, this.mSprite);

  var r = new RigidRectangle(this.getXform(), w, h);
  r.setMass(0);
  r.rotateVertices();
  this.setRigidBody(r);
}
gEngine.Core.inheritPrototype(Platform, GameObject);

Platform.prototype.initialize = function()
{
};

Platform.prototype.update = function()
{
};

Platform.prototype.draw = function(matrix)
{
  this.mSprite.draw(matrix);
};
