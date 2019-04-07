/* File: Maze.js 
 *
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2, Light,
 FontRenderable, SpriteRenderable, LineRenderable,
 GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";
function Maze(pixelTexture, texture, edgeTex, normalTex, edgeNormalTex, hazardTex, gateTex, keyTex, x, y, w, h, res, frct, p) {
    
    if (normalTex !== null) {
        this.mMazeTexture = new IllumRenderable(texture, normalTex);
        this.mEdgeTexture = new IllumRenderable(edgeTex, edgeNormalTex);
    } else {
        this.mMazeTexture = new LightRenderable(texture);
        this.mEdgeTexture = new LightRenderable(edgeTex);
    }
    this.mMazeTexture.getXform().setPosition(x, y);
    this.mMazeTexture.getXform().setSize(w, h);
    
    this.mEdgeTexture.getXform().setPosition(x, y);
    this.mEdgeTexture.getXform().setSize(w * 1.124, h * 1.124);

    this.mShapes = new GameObjectSet();
    this.mHazards = new GameObjectSet();
    this.mGates = new GameObjectSet();
    this.mKeys = new GameObjectSet();
    this.mPset = new ParticleGameObjectSet();
    this.createBounds(pixelTexture, hazardTex, gateTex, keyTex, x, y, w, h, res, frct);
    this.rep = p;
    this.pos = [x, y];
}

Maze.prototype.draw = function (aCamera) {
    this.mShapes.draw(aCamera);
    this.mHazards.draw(aCamera);
    this.mKeys.draw(aCamera);
    if (this.rep === true) {
        this.mPset.draw(aCamera);
    }
    if (!gEngine.Input.isKeyPressed(gEngine.Input.keys.N))
        this.mEdgeTexture.draw(aCamera);
    this.mMazeTexture.draw(aCamera);
};

Maze.prototype.update = function () {
    this.mShapes.update();
    this.mHazards.update();
    this.mKeys.update();
    if (this.rep === true) {
        this.mPset.update();
        this.particleCollision();
    }
    gEngine.Physics.processCollision(this.mShapes, []);
};

Maze.prototype.testHazards = function (gameobj, wcCoord) {
    var i;
    for (i = 0; i < this.mHazards.mSet.length; i++) {
        if (gameobj.pixelTouches(this.mHazards.mSet[i], wcCoord))
            return true;
    }
    return false;
};

Maze.prototype.bumpIntoGates = function (gameobj) {
    var bumped = false;
    var i;
    var wcCoord = [];
    for (i = 0; i < this.mGates.mSet.length; i++) {
        if (gameobj.pixelTouches(this.mGates.mSet[i], wcCoord))
            bumped = this.mGates.mSet[i].open() || bumped;
    }
    return bumped;
};

Maze.prototype.pickupKeys = function (gameobj) {
    var i;
    var wcCoord = [];
    for (i = 0; i < this.mKeys.mSet.length; i++) {
        if (!this.mKeys.mSet[i].isPickedUp && gameobj.pixelTouches(this.mKeys.mSet[i], wcCoord)) {
            this.mKeys.mSet[i].pickup();
        }
    }
};

Maze.prototype.createBounds = function (pixelTexture, hazardTex, gateTex, keyTex, x, y, w, h, res, frct, art) {

    var tx = x - w/2;
    var ty = y + h/2;
    var sx = w / this.mMazeTexture.mTexWidth;
    var sy = h / this.mMazeTexture.mTexHeight;
    
    
    var texInfo = gEngine.Textures.getTextureInfo(pixelTexture);
    var pixelArray = gEngine.Textures.getColorArray(pixelTexture);
    // create maze walls (resolution = texInfo.height)
    var ps = this.mMazeTexture.mTexWidth / texInfo.mHeight;
    function wallAtPixels(maze, x1, y1, x2, y2) {
        maze.blockAt(tx + (x1 * ps * sx), ty - (y1 * ps * sy),
                tx + (x2 * ps * sx), ty - (y2 * ps * sy),
                res, frct, art);
    }
    function spikeAtPixel(maze, x, y, direction) {
        var spike = new Spike(hazardTex,
                              tx + ((x + 0.5) * ps * sx), 
                              ty - ((y + 0.5) * ps * sy), 
                              direction);
        maze.mHazards.addToSet(spike);
        return spike;
    }
    function gateAtPixel(maze, x, y, direction) {
        var gate = new Gate(gateTex,
                              tx + ((x + 0.5) * ps * sx), 
                              ty - ((y + 0.5) * ps * sy), 
                              direction);
        maze.mShapes.addToSet(gate);
        maze.mGates.addToSet(gate);
        return gate;
    }
    function keyAtPixel(maze, x, y) {
        var key = new Key(keyTex,
                              tx + ((x + 0.5) * ps * sx), 
                              ty - ((y + 0.5) * ps * sy));
        maze.addLight(key.glowLight);
                              
        maze.mKeys.addToSet(key);
        return key;
    }
    
    var lx = 0, ly = 0, hx = 0, hy = 0;
    var bounded = new Array(pixelArray.length/4);
    var binding = false, boundW = 0;
    
    function logGroups() {
        /*var msg = "";
        for (var y = 0; y < texInfo.mHeight; y++) {
            for (var x = 0; x < texInfo.mWidth; x++) {
                var index = ((texInfo.mHeight - y - 1) * texInfo.mWidth) + x;
                msg += String.fromCharCode(33 + (bounded[index] % 95));
            }
            msg += "\n";
        }
        console.log(msg);*/
    }
    
    var x, y;
    // mark open spaces in bounded array
    var gates = [];
    var keys = [];
    for (y = 0; y < texInfo.mHeight; y++) {
        for (x = 0; x < texInfo.mWidth; x++) {
            var index = (y * 4 * texInfo.mWidth) + x * 4;
            var r  = pixelArray[index];
            var g = pixelArray[index + 1];
            var b = pixelArray[index + 2];
            var alpha = pixelArray[index + 3];
            var shade = r + g + b;
            if (alpha > 0.0 && shade === 255 * 3) // transparent and black or white
                bounded[index/4] = 0; // wall
            else {
                bounded[index/4] = -1; // pathway
                if (alpha > 0) {
                    if (r > 0 && g === 0 && b === 0) {
                        console.log("Creating spike at " + x + "," + y );
                        spikeAtPixel(this, x, texInfo.mHeight - y - 1, -Math.floor(r / (255 / 4)));
                    }
                    if (g > 0 && r === 0 && b === 0) {
                        var dir =  -Math.floor(g / (255 / 4));
                        console.log("Creating gate " + g + " at " + x + "," + y + " with direction " + dir + "(" + g + ")");
                        gates[g] = gateAtPixel(this, x, texInfo.mHeight - y - 1,dir);
                    }
                    if (b > 0 && r === 0 && g === 0) {
                        console.log("Creating key " + b + " at " + x + "," + y );
                        keys[b] = keyAtPixel(this, x, texInfo.mHeight - y - 1);
                    }
                }
            }
        }
    }
    logGroups();
    for (var i in keys) {
        keys[i].setGate(gates[i]); // link key to corresponding gate (green-ness == blue-ness)
    }
    
    // group contiguous wall segments on rows
    var boxNum = 1;
    var prevBound = -1;
    for (y = 0; y < texInfo.mHeight; y++) {
        for (x = 0; x < texInfo.mWidth; x++) {
            var index = (y * texInfo.mWidth) + x;
            if (bounded[index] >= 0) // wall here
                bounded[index] = boxNum; // mark bounded with bound group
            else if (prevBound >= 0) // open here & prevBound was wall
                boxNum++; // new bound group
            prevBound = bounded[index];
        }
        // about to move to next row...
        if (prevBound >= 0) // bound was wall
            boxNum++; // new bound group
    }
    logGroups();
    
    var linkedBound = -1;
    var linkStart = 0;
    var prevGroup = -1;
    var prevLink = -1;
    for (y = 1; y < texInfo.mHeight; y++) {
        var rowOffset = (y * texInfo.mWidth);
        for (x = 0; x < texInfo.mWidth; x++) {
            var index = (y * texInfo.mWidth) + x;
            var linkedIndex = ((y - 1) * texInfo.mWidth) + x; // index 1 row up
            if (linkedBound >= 0) { // continue checking potential link
                if (bounded[linkedIndex] !== linkedBound || bounded[index] !== prevGroup) { // link is broken
                    if (bounded[linkedIndex] !== linkedBound) {
                        //console.log('linking on row ' + y + ' from ' + linkStart + ' to ' + (x-1));
                        for (var z = linkStart; z < x; z++) {// from linkStart to previous index on this row...
                            bounded[rowOffset + z] = linkedBound; // move linked indexes in this row to group of above row
                        }
                    }
                    linkedBound = -1; // ready to look for a new link
                }
            }
            if (linkedBound === -1) { // ready to check for new link
                if (bounded[index] >= 0 && bounded[linkedIndex] >= 0 && bounded[linkedIndex] !== prevLink) { // both are wall
                    if (prevLink !== -1 && bounded[linkedIndex + 1] === prevLink)
                        bounded[index] = prevGroup;
                    else {
                        linkStart = x; // remember where the link starts
                        linkedBound = bounded[linkedIndex]; // remember which group is above
                        //console.log('searching for link on row ' + y + ' from ' + linkStart + ' for ' + linkedBound + ' with ' + bounded[index]);
                    }
                }
            }
            prevGroup = bounded[index];
            prevLink = bounded[linkedIndex];
        }
        // about to move to next row...
        if (linkedBound >= 0 && bounded[linkedIndex] === linkedBound) { // group extends to end of row
            //console.log('linking at end of row ' + y + ' from ' + linkStart + ' to ' + x);
            for (var z = linkStart; z < x; z++) { // from linkStart to current index on this row...
                bounded[rowOffset + z] = linkedBound; // move linked indexes in this row to group of above row
            }
        }
        logGroups();
    }
    logGroups();
    
    // find top-left and bottom-right corner of each bound group
    var boundRanges = [];
    for (y = 0; y < texInfo.mHeight; y++) {
        for (x = 0; x < texInfo.mWidth; x++) {
            var group = bounded[(y * texInfo.mWidth) + x];
            var range = boundRanges[group];
            if (!range) {
                boundRanges[group] = [x,y,x+1,y+1];
            } else {
                range[0] = Math.min(x, range[0]);
                range[1] = Math.min(y, range[1]);
                range[2] = Math.max(x+1, range[2]);
                range[3] = Math.max(y+1, range[3]);
            }
        }
    }
    // generate wall bounds around groups
    for (var i in boundRanges) {
        if (i > 0) {
            var bounds = boundRanges[i];
            wallAtPixels(this, bounds[0], texInfo.mHeight-bounds[3], bounds[2], texInfo.mHeight-bounds[1]);
        }
    }
};

Maze.prototype.lightOn = function () {
    for (var i = 0; i < 4; i++) {
        this.mShapes.getObjectAt(i).getRenderable().setColor([1, 1, 1, .6]);
    }
};

Maze.prototype.lightOff = function () {
    for (var i = 0; i < 4; i++) {
        this.mShapes.getObjectAt(i).getRenderable().setColor([1, 1, 1, 0]);
    }
};

Maze.prototype.blockAt = function (x1, y1, x2, y2, res, frct, art) {
    var x = (x1 + x2) / 2, y = (y1 + y2) / 2, w = x2 - x1, h = y2 - y1;
    var p = new Renderable();
    p.setColor([1, 1, 1, 0]);
    var xf = p.getXform();
    xf.setSize(w, h);
    xf.setPosition(x, y);
    var g = new GameObject(p);
    var r = new RigidRectangle(xf, w, h);
    g.setRigidBody(r);
    //g.toggleDrawRigidShape();

    r.setMass(0);
    r.setRestitution(res);
    r.setFriction(frct);
    xf.setSize(w, h);
    xf.setPosition(x, y);
    this.mShapes.addToSet(g);
};

Maze.prototype.wallAt = function (x, y, h, res, frct, art) {
    var w = 3;
    var p = new TextureRenderable(art);
    var xf = p.getXform();
    xf.setSize(w, h);
    xf.setPosition(x, y);
    var g = new GameObject(p);
    var r = new RigidRectangle(xf, w, h);
    g.setRigidBody(r);
    g.toggleDrawRigidShape();

    r.setMass(0);
    r.setRestitution(res);
    r.setFriction(frct);
    xf.setSize(w, h);
    xf.setPosition(x, y);
    this.mShapes.addToSet(g);
};

Maze.prototype.platformAt = function (x, y, w, rot, res, frct, art) {
    var h = 3;
    var p = new TextureRenderable(art);
    var xf = p.getXform();
    xf.setSize(w, h);
    xf.setPosition(x, y);
    var g = new GameObject(p);
    var r = new RigidRectangle(xf, w, h);
    g.setRigidBody(r);
    g.toggleDrawRigidShape();

    r.setMass(0);
    r.setRestitution(res);
    r.setFriction(frct);
    xf.setSize(w, h);
    xf.setPosition(x, y);
    xf.setRotationInDegree(rot);
    this.mShapes.addToSet(g);
};

Maze.prototype.getPos = function () {
    return this.pos;
};

Maze.prototype.particleCollision = function () {
    for (var i = 0; i < 4; i++) {
        gEngine.ParticleSystem.processObjSet(this.mShapes.getObjectAt(i), this.mPset);
    }
};

Maze.prototype.createParticle = function (atX, atY) {
    var life = 200 + Math.random() * 100;
    var p = new ParticleGameObject("assets/balloon_scrap.png", atX, atY, life);

    // size of the particle
    var r = 1.0 + Math.random() * 1.5;
    p.getXform().setSize(r, r);

    // final color
    //p.setFinalColor([.61, .30, .08, 1]);

    // velocity on the particle
    var fx = 30 * Math.random() - 15;
    var fy = 30 * Math.random() - 15;
    p.getParticle().setVelocity([fx, fy]);

    // size delta
    p.setSizeDelta(1.0);

    return p;
};

Maze.prototype.addLight = function (l){
    this.mMazeTexture.addLight(l);
    this.mEdgeTexture.addLight(l);
};