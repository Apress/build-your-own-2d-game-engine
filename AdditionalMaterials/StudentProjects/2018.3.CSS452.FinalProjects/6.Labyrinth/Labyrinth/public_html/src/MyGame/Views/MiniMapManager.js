/*
 * File: MiniMapManager.js 
 * This object is in charge of displaying score, and game tips.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */


function MiniMapManager(player, collectibles, heroSprite, zSprite, BGSprite) {
    
   
    
    this.mPlayer = player;
    this.mCollectibleSet = collectibles;
    this.mBackground = new Background(BGSprite);
    this.mZSprite = zSprite;
    
    this.mPlayerTracker = new SpriteRenderable(heroSprite);
    this.mPlayerTracker.getXform().setPosition(this.mPlayer.getXform().getXPos(),this.mPlayer.getXform().getYPos());
    this.mPlayerTracker.getXform().setSize(50, 50);
    this.mPlayerTracker.setColor([1, 1, 1, 0]);
    
    this.mZTrackers = [];
    this.generateZs();
    
    
    this.mCam = new Camera(
        vec2.fromValues(0, 0),  // position of the camera
        400,                      // width of camera
        [1200, 0, 400, 300],        // viewport (orgX, orgY, width, height)
        0
    );
    this.mCam.setBackgroundColor([0, 0, 0, 1]);
   
    
}

MiniMapManager.prototype.generateZs = function() {
    var i = 0;
    for (i = 0; i < this.mCollectibleSet.size(); i++) {
            var nZ = new SpriteRenderable(this.mZSprite);
            var nItemSize = 25;

            nZ.getXform().setPosition(this.mCollectibleSet.getObjectAt(i).getXform().getXPos(), 
                                      this.mCollectibleSet.getObjectAt(i).getXform().getYPos());
            nZ.getXform().setSize(nItemSize, nItemSize);
            this.mZTrackers.push(nZ);
    }
};


MiniMapManager.prototype.update = function () {
    this.mPlayerTracker.getXform().setPosition(this.mPlayer.getXform().getXPos(),
                                               this.mPlayer.getXform().getYPos());
                                               
    var i; //Pretty sure I shouldn't have to have an IF statement here, but the first object isn't deleted?
    for (i = 0; i < this.mCollectibleSet.size(); i++) {
        
        this.mZTrackers[i].getXform().setPosition(
                this.mCollectibleSet.getObjectAt(i).getXform().getXPos(),
                this.mCollectibleSet.getObjectAt(i).getXform().getYPos());
        
        
    }                                        
};

MiniMapManager.prototype.draw = function () {
    this.mCam.setupViewProjection();
    
    this.mPlayer.draw(this.mCam);
    this.mBackground.draw(this.mCam);
    
    this.mPlayerTracker.draw(this.mCam);
    
    var i; //Pretty sure I shouldn't have to have an IF statement here, but the first object isn't deleted?
    for (i = 0; i < this.mCollectibleSet.size(); i++) {
        if (!this.mCollectibleSet.getObjectAt(i).getToBeDeleted()) {
            this.mZTrackers[i].draw(this.mCam);
        }
        
    }
};