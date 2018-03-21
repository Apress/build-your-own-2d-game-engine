/*jslint node: true, vars: true */
/*global gEngine: false, GameObjectSet: false,AngryFire, SpriteRenderable: false, 
 * HelperFunctions: false, Manager: false, Block: false, HelperFunctions */
/* find out more about jslint: http://www.jslint.com/help.html */

function BlockManager(spriteTexture, blocksToCreate, size, x, y) {
//    console.log(blocksToCreate);
//    console.log(size);

    Manager.call(this, spriteTexture, Block, 0, 0, false);

    this.blockSize = size;
    this.x = x;
    this.y = y;
    this.Blocks = new Array(blocksToCreate);
    this.Blocks.fill(true);

    this.blockCount = blocksToCreate;

    this.createBlocks();

    //store x and y for "collision" considerations with regards
    //to the hero object
    this.x = x;
    this.y = y;

}
gEngine.Core.inheritPrototype(BlockManager, Manager);

BlockManager.prototype.update = function () {

    //call parent update method
    Manager.prototype.update.call(this);

    //update the truth array for block "existence"
    for (var i = 0; i < this.size(); i++) {

        if (this.getObjectAt(i).isVisible)
            this.Blocks[i] = true;
        else
            this.Blocks[i] = false;
    }
};

BlockManager.prototype.checkCollisions = function (otherManager, collisionInfo) {
    Manager.prototype.checkCollisions.call(this, otherManager, collisionInfo);
};

BlockManager.prototype.reset = function () {
    
    gEngine.AudioClips.playACue("assets/sounds/replace-blocks.wav");
    this.deleteAll();
    this.createBlocks();
};

BlockManager.prototype._createMore = function () {
    
    this._placeObject(this.blockSize, this.x - this.blockSize, this.y);
    this._placeObject(this.blockSize, this.x + this.blockSize * (this.blockCount - 1), this.y);
    
//    this._placeObject(this.blockSize, this.x + this.blockSize * 2, this.y + this.blockSize, this.camera);
//    this._placeObject(this.blockSize, this.x + this.blockSize * 4, this.y + this.blockSize, this.camera);
//
//    this._placeObject(this.blockSize, this.x + this.blockSize * 5, this.y + this.blockSize, this.camera);
//    this._placeObject(this.blockSize, this.x + this.blockSize * 8, this.y + this.blockSize, this.camera);
//    this._placeObject(this.blockSize, this.x + this.blockSize * 9, this.y + this.blockSize, this.camera);
};

BlockManager.prototype.createBlocks = function () {
    for (var i = 0; i < this.blockCount; i++) {
        this._placeObject(this.blockSize,
                this.x + ((i - 1) * this.blockSize),
                this.y);
    }
    this._createMore();
};