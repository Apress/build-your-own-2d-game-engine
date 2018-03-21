/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gEngine, Scene, gManager, vec2 */


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
function MyScene(){
}

gEngine.Core.inheritPrototype(MyScene,Scene);

MyScene.prototype.loadScene = function(){
    
};

MyScene.prototype.unloadScene = function(){
    
};

MyScene.prototype.initialize = function(){
    gManager.ObjectPool.initPool();
    gManager.CameraManager.initManager();
    gManager.InputManager.initManager();
};

MyScene.prototype.draw = function(){
    gEngine.Core.clearCanvas([0.9,0.9,0.9,1]);
    while(true){
        // 得到当前的相机
        var camera = gManager.CameraManager.nextCamera();
        if(camera){
            // 渲染物体
            gManager.ObjectPool.renderAll(camera);
        }
        // 这一帧渲染结束
        else {
            // 在结束时画UI
            gManager.UIManager.draw();
            
            // 重置渲染序列
            gManager.CameraManager.moveIndexToHead();
            return;
        }
    }
};

MyScene.prototype.update = function(){

    // 更新输入
    gManager.InputManager.update();

    // 更新物体池内物体
    gManager.ObjectPool.updateAll();

    // 更新相机
    gManager.CameraManager.update();
    
    // 更新UI
    gManager.UIManager.update();
};