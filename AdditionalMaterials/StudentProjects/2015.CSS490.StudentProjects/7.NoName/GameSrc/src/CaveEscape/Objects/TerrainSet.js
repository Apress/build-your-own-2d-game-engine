/* File: TerrainSet.js 
 *
 * Creates and initializes a TerrainSet
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function TerrainSet(orientation, camera) {
    this.ORIENTATION_DOWN = 0;
    this.ORIENTATION_UP = 1;
   
    this.orientation = orientation;
    this.midTerrainObj = null;
    
    this.lastTerrainIndex = -1;

    GameObjectSet.call(this);
    var cameraBottom = camera.getWCCenter()[1] - (camera.getWCHeight() / 2);
    var cameraTop = camera.getWCCenter()[1] + (camera.getWCHeight() / 2);
    
    var bottomLeft = vec2.fromValues(camera.getWCCenter()[0] - (camera.getWCWidth() / 2), cameraBottom);
    var bottomRight = vec2.fromValues(camera.getWCCenter()[0] + 75, cameraBottom);
    
    if (this.orientation === this.ORIENTATION_UP) this.generateTerrain(camera, bottomLeft, bottomRight);
    if (this.orientation === this.ORIENTATION_DOWN) this.generateTerrain(camera, vec2.fromValues(bottomLeft[0], cameraTop),
                                                        vec2.fromValues(bottomRight[0], cameraTop)); 
   
}
gEngine.Core.inheritPrototype(TerrainSet, GameObjectSet);

TerrainSet.prototype.update = function(camera) {
    
    //console.log(this.lastTerrainIndex);
    if (this.midTerrainObj.hasExpired()) {
        var cameraBottom = camera.getWCCenter()[1] - (camera.getWCHeight() / 2);
        var cameraTop = camera.getWCCenter()[1] + (camera.getWCHeight() / 2 );
        var bottomLeft = vec2.fromValues(camera.getWCCenter()[0] + (camera.getWCWidth() / 2), cameraBottom);
        var bottomRight = vec2.fromValues(camera.getWCCenter()[0] + camera.getWCWidth() / 2 + 50, cameraBottom);
        var topLeft = vec2.fromValues(bottomLeft[0], cameraTop);
        var topRight = vec2.fromValues(bottomRight[0], cameraTop);
        
        
        if (this.orientation === this.ORIENTATION_UP) this.generateTerrain(camera, bottomLeft, bottomRight);
        if (this.orientation === this.ORIENTATION_DOWN) this.generateTerrain(camera, topLeft, topRight);
        //console.log(this.midTerrainObj.getXform().getXPos());
    }
    // remove the expired ones from this set AND from the layermanager
    var i, obj;
    for (i=0; i<this.size(); i++) {
        obj = this.getObjectAt(i);
        if (obj.hasExpired()) {
            this.removeFromSet(obj); 
            gEngine.LayerManager.removeFromLayer(gEngine.eLayer.eActors, obj);    
        }
    }
    
    var i;
    for (i = 0; i < this.size(); i++) {
        if (this.getObjectAt(i).getXform().getXPos() > camera.getWCCenter[0] + camera.getWCWidth() / 2) {
            this.lastTerrainIndex = i;
            break;
        }
    }

    //console.log(this.size());
};

TerrainSet.prototype.newAt = function(x, y, cameraBottom) {
    
    //console.log("x:" + x);
    
    
    var p = new Terrain(x, y);
    var xform = p.getXform();
    
    if (this.orientation === this.ORIENTATION_UP) {
        xform.incHeightBy(y - cameraBottom); //Increase terrain size to go to the bottom
        xform.incYPosBy(-((y - cameraBottom) / 2)); //Update terrain position based on scaling
    } else if (this.orientation === this.ORIENTATION_DOWN) {
        xform.incHeightBy(cameraBottom - y); //Increase terrain size to go to the bottom
        xform.incYPosBy(((cameraBottom - y) / 2)); //Update terrain position based on scaling
        //xform.incHeightBy(y - cameraBottom); //Increase terrain size to go to the bottom
        //xform.incYPosBy(-((y - cameraBottom) / 2)); //Update terrain position based on scaling
    }
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, p);
    this.addToSet(p);
};

TerrainSet.prototype.terrain = function (point1, point2, scale, array) {
    var m = vec2.fromValues((point1[0] + point2[0]) / 2, (point1[1] + point2[1]) / 2);
    var amount;
 
    amount = Math.random() * scale;
    scale *= 0.5;
    
    if (this.orientation === this.ORIENTATION_DOWN) amount = -amount;
    
    m[1] += amount;
    
    array.push(m);

    if (scale > 0.1) {
        this.terrain(point1, m, scale, array);
        this.terrain(m, point2, scale, array); 
    } 
};

TerrainSet.prototype.generateTerrain = function (camera, bottomLeft, bottomRight) {
    //var cameraBottom = camera.getWCCenter()[1] - (camera.getWCHeight() / 2);
    var cameraBottom = bottomLeft[1];
    
    var points = [];
    points.push(bottomLeft);
    this.terrain(bottomLeft, bottomRight, 10, points);
    points.push(bottomRight);

    for (var i = 0; i < points.length; i++) {
        this.newAt(points[i][0], points[i][1], cameraBottom);
    }
    
    var i;
    var minObj = this.getObjectAt(0);
    var cameraRightSide = camera.getWCCenter()[0] + camera.getWCWidth() / 2;
    for (i = 0; i < this.size(); i++) {
        var terrain = this.getObjectAt(i);
        if (terrain.getXform().getXPos() > cameraRightSide) {
            break;
        }
        
        if (terrain.getXform().getXPos() > minObj.getXform().getXPos()) {
            minObj = terrain;
            
        }
    }
    
    this.midTerrainObj = minObj;
    
    // Trying something new - if the terrain array is sorted by X it makes it possible to cut out a lot of the collision detection
    var set = this.getSet();
    set.sort(function(a, b){ return a.getXform().getXPos() - b.getXform().getXPos(); });
};

TerrainSet.prototype.output = function () {
    for (var i = 0; i < this.size(); i++) {
        console.log("x: " + this.getObjectAt(i).getXform().getXPos());
    }
};

TerrainSet.prototype.getLastTerrainIndex = function () {
    return this.lastTerrainIndex;
};

TerrainSet.prototype.findNearest = function (x) {
    
    var i;
    var closestTerrain = this.getObjectAt(0);
    for (i = 0; i < this.size(); i++) {
        var terrain = this.getObjectAt(i);
        var xform = terrain.getXform();
        
        var difference = Math.abs(x - xform.getXPos());
        var difference2 = Math.abs(x - closestTerrain.getXform().getXPos());
        if (difference < difference2) {
            closestTerrain = terrain;
        }
    }
    
    return closestTerrain;
};

TerrainSet.prototype.getOrientation = function() {
    return this.orientation;
};

TerrainSet.prototype.checkShipCollision = function(ship) {
    var i;  
    
    var curPos = ship.getXform().getPosition();
    var newX = curPos[0];
    var newY = curPos[1];
    
    for (i = 0; i < this.size(); i++) {
        
        var terrain = this.getObjectAt(i); 
        var terrainXPos = terrain.getXform().getXPos();

        // Skip this boundbox collision detection if the terrain is to the left of the ship
        if(terrainXPos < (curPos[0] - 1)) { 
            continue; }  

        // Skip all remaining boundbox testing if the terrain is to the right of the ship
        else if(terrainXPos > (curPos[0] + 1)) { 
            return; }  
        
        // Otherwise we need to do the bounding box collision check
        var terrainBbox = terrain.getBBox();
        var shipBbox = ship.getBBox();
        
        var bboxStatus = terrain.getBBox().boundCollideStatus(ship.getBBox());
        
        if (bboxStatus !== 0) {  
            
            // If the ship hit top of the terrain then push the ship up
            if( (bboxStatus & BoundingBox.eboundCollideStatus.eCollideTop) === BoundingBox.eboundCollideStatus.eCollideTop) {
                newY = terrainBbox.maxY() + (shipBbox.height() / 2);
            }
            
            // If the ship hit bottom of the terrain then push the ship down
            else if( (bboxStatus & BoundingBox.eboundCollideStatus.eCollideBottom) === BoundingBox.eboundCollideStatus.eCollideBottom) {
                newY = terrainBbox.minY() - (shipBbox.height() / 2);
            }

            // Update the ship's position
            ship.getXform().setPosition(newX, newY);
            
            // Have the ship take damage
            ship.processDamage(2);
            
            return;
        }
    }
};
