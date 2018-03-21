/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Item(name,pos) {
    var spriteSheet = "assets/spritesheet_hud.png";
    this.mItem = new LightRenderable(spriteSheet);
    
    this.mSpriteMap={};
    
    this.mName = name;
    
    var key;
    
    key = 'heart';
    this.mSpriteMap[key] = [0,128,640,768];
    key = 'blueDiamond';
    this.mSpriteMap[key] = [0,128,896,1024];
    key = 'goldKeyEmpty';
    this.mSpriteMap[key] = [256,384,256,384];
    key = 'goldKey';
    this.mSpriteMap[key] = [256,384,128,256];
    key = 'power';
    this.mSpriteMap[key] = [256,384,896,1024];


    this.mItem.setColor([1, 1, 1, 0]);
    this.mItem.getXform().setPosition(pos[0], pos[1]);
    this.mItem.getXform().setSize(10,10);
    
    
    this.mItem.setElementPixelPosArray(this.mSpriteMap[this.mName]);
    
    this.oneCollision = false;
    
    GameObject.call(this, this.mItem);

}
gEngine.Core.inheritPrototype(Item, GameObject);


Item.prototype._handleCollision = function (hero) {
    
        switch(this.mName) {
            case 'heart':
                if(this.oneCollision === false){
                   hero.incLifeCounter(); 
                   this.oneCollision = true;
                   this.mItem.setElementPixelPosArray([-1,-1,-1,-1]);
                }
            case 'power':
                if(this.oneCollision === false){
                   hero.incPowerCounter(); 
                   this.oneCollision = true;
                   this.mItem.setElementPixelPosArray([-1,-1,-1,-1]);
                }              
            case 'goldkey':
                
                               
                break;
            //case n:
               // code block
                //break;
            default:
                //default code block
        } 
    
};

Item.prototype.hide = function () {
    if(this.oneCollision === false){
       this.oneCollision = true;
       this.mItem.setElementPixelPosArray([-1,-1,-1,-1]);
    } 
        
    
};

Item.prototype.update = function (hero) {
    GameObject.prototype.update.call(this);
    
    var bb = this.getBBox();
    var heroBB = hero.getBBox();
    
    if(bb.intersectsBound(heroBB)){
        this._handleCollision(hero);
    }
};

Item.prototype.addLight = function(l) {
    this.mItem.addLight(l);
};