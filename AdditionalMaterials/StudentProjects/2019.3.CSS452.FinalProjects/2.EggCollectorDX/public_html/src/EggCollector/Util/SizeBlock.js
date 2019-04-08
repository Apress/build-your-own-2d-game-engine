function SizeBlock(texture, bird) {
    this.mSprite = new TextureRenderable(texture);
    GameObject.call(this, this.mSprite);
    
    this.mBird = bird;
    this.mBlock = true;
};
gEngine.Core.inheritPrototype(SizeBlock, GameObject);

SizeBlock.prototype.update = function() {
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        if (this.mBlock) {
            this.mBird.getXform().setPosition(this.getXform().getXPos(), this.getXform().getYPos());
            this.mBird.getRigidBody().setPhysicsEnabled(true);
        } else {
            this.mSprite.getXform().setPosition(this.mBird.getXform().getXPos(), this.mBird.getXform().getYPos());
            this.mBird.getRigidBody().setPhysicsEnabled(false);
        }
        this.mBlock = !this.mBlock;
    }
    
    if (this.mBlock) {
        var scale = 1;
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Space))
            scale = 0.1;
        else if (gEngine.Input.isModPressed(gEngine.Input.mods.Shift))
            scale = 10;
        var xf = this.getXform();
        
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W))
            xf.incYPosBy(scale);
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S))
            xf.incYPosBy(-scale);
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A))
            xf.incXPosBy(-scale);
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D))
            xf.incXPosBy(scale);
        
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up))
            xf.incHeightBy(scale);
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down))
            xf.incHeightBy(-scale);
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left))
            xf.incWidthBy(-scale);
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right))
            xf.incWidthBy(scale);
    }
    else {
        this.mBird.update();
    }
};

SizeBlock.prototype.draw = function(camera) {
    if (this.mBlock)
        this.mSprite.draw(camera);
    else
        this.mBird.draw(camera);
};

SizeBlock.prototype.getRigidBody = function() {
    return this.mBird.getRigidBody();
};

SizeBlock.prototype.getXform = function() {
    return this.mBlock ? this.mSprite.getXform() : this.mBird.getXform();
};