/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*global gEngine, GameObject, LightRenderable, SpriteAnimateRenderable,IllumRenderable, vec2,NonPhysicsGameObject */

function Wall(x,y,wallSprite,wallNormal,orientation) {
    
    this.mWall = new IllumRenderable(wallSprite,wallNormal);
    this.mWall.setColor([1, 1, 1, 0]);
    this.mWall.getXform().setPosition(x, y);
    this.mWall.getXform().setSize(10, 10);
    var eleX = orientation%4*260;
    var eleY = 1008+(Math.floor(orientation/4)*260);
    this.mWall.setElementPixelPositions(eleX, eleX+256, eleY, eleY+256);
    this.mBBoxes = [];
    var xform = this.mWall.getXform();
    switch (orientation) {
        case 0:
            this.mBBoxes.push(new BoundingBox(xform.getPosition(),4,4));
            break;
        case 1:
            var pos = [xform.getXPos(),xform.getYPos()];
            pos[0]-=1.5;
            this.mBBoxes.push(new BoundingBox(pos,7,4));
            break;
        case 2:
            var pos = [xform.getXPos(),xform.getYPos()];
            pos[0]+=1.5;
            this.mBBoxes.push(new BoundingBox(pos,7,4));
            break;
        case 3:
            var pos = [xform.getXPos(),xform.getYPos()];
            pos[1]-=1.5;
            this.mBBoxes.push(new BoundingBox(pos,4,7));
            break;
        case 4:
            var pos = [xform.getXPos(),xform.getYPos()];
            pos[1]+=1.5;
            this.mBBoxes.push(new BoundingBox(pos,4,7));
            break;
        case 5:
            this.mBBoxes.push(new BoundingBox(xform.getPosition(),10,4));
            break;
        case 6:
            var pos = [xform.getXPos(),xform.getYPos()];
            pos[1]-=1.5;
            this.mBBoxes.push(new BoundingBox(pos,4,7));
            var pos = [xform.getXPos(),xform.getYPos()];
            pos[0]-=1.5;
            this.mBBoxes.push(new BoundingBox(pos,7,4));
            break;
        case 7:
            var pos = [xform.getXPos(),xform.getYPos()];
            pos[1]+=1.5;
            this.mBBoxes.push(new BoundingBox(pos,4,7));
            var pos = [xform.getXPos(),xform.getYPos()];
            pos[0]-=1.5;
            this.mBBoxes.push(new BoundingBox(pos,7,4));
            break;
        case 8:
            var pos = [xform.getXPos(),xform.getYPos()];
            pos[1]+=1.5;
            this.mBBoxes.push(new BoundingBox(pos,4,7));
            var pos = [xform.getXPos(),xform.getYPos()];
            pos[0]+=1.5;
            this.mBBoxes.push(new BoundingBox(pos,7,4));
            break;
        case 9:
            var pos = [xform.getXPos(),xform.getYPos()];
            pos[1]-=1.5;
            this.mBBoxes.push(new BoundingBox(pos,4,7));
            var pos = [xform.getXPos(),xform.getYPos()];
            pos[0]+=1.5;
            this.mBBoxes.push(new BoundingBox(pos,7,4));
            break;
        case 10:
            this.mBBoxes.push(new BoundingBox(xform.getPosition(),4,10));
            break;
        case 11:
            this.mBBoxes.push(new BoundingBox(xform.getPosition(),10,4));
            var pos = [xform.getXPos(),xform.getYPos()];
            pos[1]-=1.5;
            this.mBBoxes.push(new BoundingBox(pos,4,7));
            break;
        case 12:
            this.mBBoxes.push(new BoundingBox(xform.getPosition(),10,4));
            var pos = [xform.getXPos(),xform.getYPos()];
            pos[1]+=1.5;
            this.mBBoxes.push(new BoundingBox(pos,4,7));
            break;
        case 13:
            this.mBBoxes.push(new BoundingBox(xform.getPosition(),4,10));
            var pos = [xform.getXPos(),xform.getYPos()];
            pos[0]-=1.5;
            this.mBBoxes.push(new BoundingBox(pos,7,4));
            break;
        case 14:
            this.mBBoxes.push(new BoundingBox(xform.getPosition(),4,10));
            var pos = [xform.getXPos(),xform.getYPos()];
            pos[0]+=1.5;
            this.mBBoxes.push(new BoundingBox(pos,7,4));
            break;
        case 15:
            this.mBBoxes.push(new BoundingBox(xform.getPosition(),10,4));
            this.mBBoxes.push(new BoundingBox(xform.getPosition(),4,10));
            break;
    }
    GameObject.call(this, this.mWall);   
}
gEngine.Core.inheritPrototype(Wall, GameObject);


Wall.prototype.draw = function(aCamera) {
    this.mWall.draw(aCamera);
};