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


SceneFileParser.prototype.parseDevil = function (texture, Btexture) {
    var elm = this._getElm("Devil");

    var px = Number(elm[0].attributes.getNamedItem("PosX").value);
    var py = Number(elm[0].attributes.getNamedItem("PosY").value);
      
    var d = new Devil(texture, Btexture, px, py);
    return d;
};

SceneFileParser.prototype.parseDevilMove = function (texture, Btexture) {
    var elm = this._getElm("DevilMove");
    var i, p;
    var AllDevilM = [];
    for(i = 0; i < elm.length; i++){
        var px = Number(elm[i].attributes.getNamedItem("PosX").value);
        var py = Number(elm[i].attributes.getNamedItem("PosY").value);
        
        p = new DevilMove(texture, Btexture, px, py);
        AllDevilM.push(p);
    }
    return AllDevilM;
};

SceneFileParser.prototype.parseSwitcher = function (texture) {
    var elm = this._getElm("Switcher");

    var px = Number(elm[0].attributes.getNamedItem("PosX").value);
    var py = Number(elm[0].attributes.getNamedItem("PosY").value);
      
    var d = new Switcher(texture, px, py);
    return d;
};

SceneFileParser.prototype.parseFinishLine = function (texture) {
    var elm = this._getElm("FinishLine");

    var px = Number(elm[0].attributes.getNamedItem("PosX").value);
    var py = Number(elm[0].attributes.getNamedItem("PosY").value);
    var w = Number(elm[0].attributes.getNamedItem("Width").value);
      
    var fl = new FinishLine(texture, px, py, w);
    return fl;
};

SceneFileParser.prototype.parseHero1 = function (texture) {
    var elm = this._getElm("Hero1");

    var px = Number(elm[0].attributes.getNamedItem("PosX").value);
    var py = Number(elm[0].attributes.getNamedItem("PosY").value);
    
    var h1 = new Hero1(texture, px, py);

    return h1;
};

SceneFileParser.prototype.parseHero2 = function (texture) {
    var elm = this._getElm("Hero2");

    var px = Number(elm[0].attributes.getNamedItem("PosX").value);
    var py = Number(elm[0].attributes.getNamedItem("PosY").value);
    
    var h2 = new Hero2(texture, px, py);

    return h2;
};


SceneFileParser.prototype.parseBackground = function (texture) {
    var elm = this._getElm("Background");
    var x = Number(elm[0].attributes.getNamedItem("PosX").value);
    var y = Number(elm[0].attributes.getNamedItem("PosY").value);
    var w = Number(elm[0].attributes.getNamedItem("Width").value);
    var h = Number(elm[0].attributes.getNamedItem("Height").value);
    //var tex = elm[0].attributes.getNamedItem("Texture").value;

    var bgR = new BackGround(texture, x, y, w, h);

    return bgR;  
};

SceneFileParser.prototype.parseNextLevel = function () {
    var elm = this._getElm("NextLevel");
    return elm[0].getAttribute("Next");
};