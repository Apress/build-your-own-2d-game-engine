/*
 * File: SceneFile_Parse.js 
 */
/*jslint node: true, vars: true, white: true*/
/*global gEngine, Light, Camera, vec2, Platform, Wall,
 LightSet, IllumRenderable, ParallaxGameObject, ShadowReceiver */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function SceneFileParser(sceneFilePath) {
    this.mSceneXml = gEngine.ResourceMap.retrieveAsset(sceneFilePath);
}

SceneFileParser.prototype._convertToNum = function (a) {
    var j;
    for (j = 0; j < a.length; j++) {
        a[j] = Number(a[j]);
    }
};

SceneFileParser.prototype._getElm = function (tagElm) {
    var theElm = this.mSceneXml.getElementsByTagName(tagElm);
    if (theElm.length === 0) {
        console.error("Warning: Level element:[" + tagElm + "]: is not found!");
    }
    return theElm;
};

SceneFileParser.prototype.parseCamera = function () {
    var camElm = this._getElm("Camera");
    var cx = Number(camElm[0].getAttribute("CenterX"));
    var cy = Number(camElm[0].getAttribute("CenterY"));
    var w = Number(camElm[0].getAttribute("Width"));
    var viewport = camElm[0].getAttribute("Viewport").split(" ");
    var bgColor = camElm[0].getAttribute("BgColor").split(" ");
    // make sure viewport and color are number
    this._convertToNum(bgColor);
    this._convertToNum(viewport);

    var cam = new Camera(
            vec2.fromValues(cx, cy), // position of the camera
            w, // width of camera
            viewport                  // viewport (orgX, orgY, width, height)
            );
    cam.setBackgroundColor(bgColor);
    return cam;
};


SceneFileParser.prototype.parseLights = function () {
    var lightSet = new LightSet();
    var elm = this._getElm("Light");
    var i, type, pos, dir, color, n, f, inner, outer, intensity, dropoff, shadow, lgt;
    for (i = 0; i < elm.length; i++) {
        type = Number(elm.item(i).attributes.getNamedItem("Type").value);
        color = elm.item(i).attributes.getNamedItem("Color").value.split(" ");
        pos = elm.item(i).attributes.getNamedItem("Pos").value.split(" ");
        dir = elm.item(i).attributes.getNamedItem("Dir").value.split(" ");
        n = Number(elm.item(i).attributes.getNamedItem("Near").value);
        f = Number(elm.item(i).attributes.getNamedItem("Far").value);
        inner = Number(elm.item(i).attributes.getNamedItem("Inner").value);
        outer = Number(elm.item(i).attributes.getNamedItem("Outter").value);
        dropoff = Number(elm.item(i).attributes.getNamedItem("DropOff").value);
        intensity = Number(elm.item(i).attributes.getNamedItem("Intensity").value);
        shadow = elm.item(i).attributes.getNamedItem("CastShadow").value;
        // make sure array contains numbers
        this._convertToNum(color);
        this._convertToNum(pos);
        this._convertToNum(dir);

        // convert type ...

        lgt = new Light();
        lgt.setLightType(type);
        lgt.setColor(color);
        lgt.setXPos(pos[0]);
        lgt.setYPos(pos[1]);
        lgt.setZPos(pos[2]);
        lgt.setDirection(dir);
        lgt.setNear(n);
        lgt.setFar(f);
        lgt.setInner(inner);
        lgt.setOuter(outer);
        lgt.setIntensity(intensity);
        lgt.setDropOff(dropoff);
        lgt.setLightCastShadowTo((shadow === "true"));

        lightSet.addToSet(lgt);
    }

    return lightSet;
};

SceneFileParser.prototype.parsePlatform = function (texture, normal, lightSet) {
    var elm = this._getElm("Platform");
    var i, j, x, y, v, r, p;
    var allPlatforms = [];
    for (i = 0; i < elm.length; i++) {
        x = Number(elm.item(i).attributes.getNamedItem("PosX").value);
        y = Number(elm.item(i).attributes.getNamedItem("PosY").value);
        v = elm.item(i).attributes.getNamedItem("Velocity").value.split(" ");
        r = Number(elm.item(i).attributes.getNamedItem("MovementRange").value);
        // make sure color array contains numbers
        this._convertToNum(v);

        p = new Platform(x, y, v, r, texture, normal, lightSet);
        gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, p);
        gEngine.LayerManager.addAsShadowCaster(p);

        allPlatforms.push(p);
    }

    return allPlatforms;
};


SceneFileParser.prototype.parseMinions = function (texture, normal, lightSet) {
    var elm = this._getElm("Minion");
    var i, j, x, y, v, r, t, w, h, m;
    var allMinions = [];
    for (i = 0; i < elm.length; i++) {
        x = Number(elm.item(i).attributes.getNamedItem("PosX").value);
        y = Number(elm.item(i).attributes.getNamedItem("PosY").value);
        v = elm.item(i).attributes.getNamedItem("Velocity").value.split(" ");
        r = Number(elm.item(i).attributes.getNamedItem("MovementRange").value);
        t = Number(elm.item(i).attributes.getNamedItem("Type").value);
        w = Number(elm.item(i).attributes.getNamedItem("Width").value);
        h = Number(elm.item(i).attributes.getNamedItem("Height").value);
        
        // make sure color array contains numbers
        this._convertToNum(v);
        switch (t) {
            case 0:
                m = new Minion(x, y, v, r, t, texture, normal, lightSet, w, h);
                break;
            case 1:
                m = new SentryMinion(x, y, v, r, t, texture, normal, lightSet, w, h);
                break;
            case 2:
                m = new ChaserMinion(x, y, v, r, t, texture, normal, lightSet, w, h);
                break;
        }
        gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, m);
        gEngine.LayerManager.addAsShadowCaster(m);

        allMinions.push(m);
    }

    return allMinions;
};

SceneFileParser.prototype.parseBoss = function (texture0, texture1, texture2,
        texture3, texture4, texture5, texture6, normal, lightSet, hero) {
    var elm = this._getElm("Boss");
    var i, j, x, y, v, r, t, b;

    for (i = 0; i < elm.length; i++) {
        x = Number(elm.item(i).attributes.getNamedItem("PosX").value);
        y = Number(elm.item(i).attributes.getNamedItem("PosY").value);
        v = elm.item(i).attributes.getNamedItem("Velocity").value.split(" ");
        r = Number(elm.item(i).attributes.getNamedItem("MovementRange").value);
        t = Number(elm.item(i).attributes.getNamedItem("Type").value);

        // make sure color array contains numbers
        this._convertToNum(v);

        b = new Boss(x, y, v, r, t, texture0, texture1, texture2,
                texture3, texture4, texture5, texture6, normal, lightSet, hero);

        gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, b);
        gEngine.LayerManager.addAsShadowCaster(b);
    }

    return b;
};


SceneFileParser.prototype.parseWall = function (texture, normal, lightSet) {
    var elm = this._getElm("Wall");
    var i, x, y, w;
    var allWalls = [];
    for (i = 0; i < elm.length; i++) {
        x = Number(elm.item(i).attributes.getNamedItem("PosX").value);
        y = Number(elm.item(i).attributes.getNamedItem("PosY").value);


        w = new Wall(x, y, texture, normal, lightSet);
        gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, w);
        gEngine.LayerManager.addAsShadowCaster(w);

        allWalls.push(w);
    }

    return allWalls;
};

SceneFileParser.prototype.parseDoors = function (texture0, texture1, texture2, lightSet) {
    var elm = this._getElm("Door");
    var i, x, y, d;
    var allDoors = [];
    for (i = 0; i < elm.length; i++) {
        x = Number(elm.item(i).attributes.getNamedItem("PosX").value);
        y = Number(elm.item(i).attributes.getNamedItem("PosY").value);

        d = new Door(x, y, texture0, texture1, texture2, lightSet);
        gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, d);
        gEngine.LayerManager.addAsShadowCaster(d);

        allDoors.push(d);
    }

    return allDoors;
};

SceneFileParser.prototype.parseButtons = function (texture, lightSet) {
    var elm = this._getElm("Button");
    var i, x, y, t, b;
    var allButtons = [];
    for (i = 0; i < elm.length; i++) {
        x = Number(elm.item(i).attributes.getNamedItem("PosX").value);
        y = Number(elm.item(i).attributes.getNamedItem("PosY").value);
        t = Number(elm.item(i).attributes.getNamedItem("Type").value);

        b = new Button(x, y, texture, t, lightSet);
        gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, b);
        gEngine.LayerManager.addAsShadowCaster(b);

        allButtons.push(b);
    }

    return allButtons;
};

SceneFileParser.prototype.parseBackground = function (level, refCam, lightSet) {
    var elm = this._getElm("Background");
    var dir = "assets/" + level + "/";
    var i, j, x, y, z, w, h, p, t, n, bg, bgR, l, s;
    for (i = 0; i < elm.length; i++) {
        x = Number(elm.item(i).attributes.getNamedItem("PosX").value);
        y = Number(elm.item(i).attributes.getNamedItem("PosY").value);
        w = Number(elm.item(i).attributes.getNamedItem("Width").value);
        h = Number(elm.item(i).attributes.getNamedItem("Height").value);
        z = Number(elm.item(i).attributes.getNamedItem("ZPos").value);
        p = Number(elm.item(i).attributes.getNamedItem("ParallaxDepth").value);
        t = elm.item(i).attributes.getNamedItem("Texture").value;
        n = elm.item(i).attributes.getNamedItem("NormalMap").value;
        s = elm.item(i).attributes.getNamedItem("ReceiveShadow").value;
        l = elm.item(i).attributes.getNamedItem("LightIndices").value.split(" ");

        bgR = new IllumRenderable(dir + t, dir + n);
        bgR.getXform().setSize(w, h);
        bgR.getXform().setPosition(x, y);
        bgR.getXform().setZPos(z);

        this._convertToNum(l);
        if (l[0] === -1) {
            for (j = 0; j < lightSet.numLights(); j++) {
                bgR.addLight(lightSet.getLightAt([j]));
            }
        } else {
            for (j = 0; j < l.length; j++) {
                bgR.addLight(lightSet.getLightAt(l[j]));
            }
        }
        bg = new ParallaxGameObject(bgR, p, refCam);

        var sr;
        if (s === "true") {
            sr = new ShadowReceiver(bg);
            gEngine.LayerManager.addToLayer(gEngine.eLayer.eShadowReceiver, sr);
        } else {
            gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, bg);
        }

    }

};

SceneFileParser.prototype.parseNextLevel = function () {
    var elm = this._getElm("NextLevel");
    return elm[0].getAttribute("Next");
};