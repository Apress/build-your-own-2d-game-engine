/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global gEngine, vec2 */
/*
 * 
 * 
 * 
 * 
 * 
 * 
 * By 龚楚涵 (Dino) in Singapore
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */


function SceneDataLoader(sceneFilePath) {
    this.mSceneXml = gEngine.ResourceMap.retrieveAsset(sceneFilePath);
}

SceneDataLoader.prototype.LoadBG = function(number){
    var elm = this._getElm(number);
    var path = elm[0].getAttribute("Rp");
    var bg = new GameObject(new TextureRenderable(path));
    bg.getXform().setSize(Number(elm[0].getAttribute("SizeX")),
                          Number(elm[0].getAttribute("SizeY")));
    return bg;
};

SceneDataLoader.prototype._getElm = function (tagElm) {
    var theElm = this.mSceneXml.getElementsByTagName(tagElm);
    if (theElm.length === 0) {
        console.error("Warning: Level element:[" + tagElm + "]: is not found!");
    }
    return theElm;
};

SceneDataLoader.prototype.LoadCamera = function (nameCma) {
    
    var camElm = this._getElm(nameCma);
    var cx = Number(camElm[0].getAttribute("CenterX"));
    var cy = Number(camElm[0].getAttribute("CenterY"));
    var w = Number(camElm[0].getAttribute("Width"));
    var viewport = camElm[0].getAttribute("Viewport").split(" ");
    var bgColor = camElm[0].getAttribute("BgColor").split(" ");
    var j;
    for (j = 0; j < 4; j++) {
        bgColor[j] = Number(bgColor[j]);
        viewport[j] = Number(viewport[j]);
    }

    var cam = null;
    var type = Number(camElm[0].getAttribute("Type"));
    if(type === 0)
        cam = new Camera(
        vec2.fromValues(cx, cy),  
        w,                        
        viewport                  
        );
    else if(type === 1)
        cam = new CameraChase(
        vec2.fromValues(cx, cy),  
        w,                        
        viewport                  
        );
    cam.setBackgroundColor(bgColor);
    return cam;
};
SceneDataLoader.prototype.GetNumber = function (nodeName){
    var elm = this._getElm(nodeName);
    return Number(elm[0].getAttribute("Number"));
};

SceneDataLoader.prototype.GetNode = function (nodeName,attrName){
    var elm = this._getElm(nodeName);
    return elm[0].getAttribute(attrName);
};

SceneDataLoader.prototype.LoadUI = function(name){
    var elm = this._getElm(name);
    var path = elm[0].getAttribute("Rp");
    var type = elm[0].getAttribute("Type");
    var posX = Number(elm[0].getAttribute("X"));
    var posY = Number(elm[0].getAttribute("Y"));
    var scaleX = Number(elm[0].getAttribute("SizeX"));
    var scaleY = Number(elm[0].getAttribute("SizeY"));
    var hideX;
    var hideY;
    var ui;
    if(type === "label"){
        //ui = new GameObject();
    }else if(type === "button"){
        //ui = new GameObject();
    }else if(type === "score"){
        hideX = Number(elm[0].getAttribute("hX"));
        hideY = Number(elm[0].getAttribute("hY"));
        ui = new UIScore(new FontRenderable(""),[posX,posY],[hideX,hideY]);
        ui.getXform().setSize(scaleX,scaleY);
        return ui;
    }else if(type === "square"){
        ui = new GameObject(new TextureRenderable(path));
    }else if(type === "animUI"){
        hideX = Number(elm[0].getAttribute("hX"));
        hideY = Number(elm[0].getAttribute("hY"));
        ui = new BaseUI(new TextureRenderable(path),[posX,posY],[hideX,hideY]);
        ui.getXform().setSize(scaleX,scaleY);
        return ui;
    }
    
    ui.getXform().setPosition(posX,posY);
    ui.getXform().setSize(scaleX,scaleY);
    
    return ui;
};