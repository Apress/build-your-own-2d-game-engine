/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global vec2 */


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
var gManager = gManager || {};

gManager.UIManager = (function(){
    
    /*
     * 当前的UI列表
     */
    var mElementMapping = [];
    
    /*
     * UI相机
     */
    var mRenderringCamera = null;
    
    var initManager = function(sceneLoader){
        
        mElementMapping = [];
        
        /*
         * init Camera
         */
        setRenderringCamera(new Camera(vec2.fromValues(0,0),
                                gManager.DefaultOptions.FULL_SCREEN_WCWIDTH,
                                [0,0,gManager.DefaultOptions.SCREEN_WIDTH,gManager.DefaultOptions.SCREEN_HEIGHT]));
                                
        var loader = sceneLoader;
        for(var i = 1;i <= loader.GetNumber("GUI_Num");i++){
            var ui = loader.LoadUI("GUI_"+i);
            mElementMapping.push(ui);
        }
    };
    
    var draw = function(){
        if(mRenderringCamera){
            mRenderringCamera.setupViewProjection(false);
            for (var i = 0 ; i < mElementMapping.length ; i++){
                if(mElementMapping[i])
                    mElementMapping[i].draw(mRenderringCamera);
            }
        }
    };
    
    var update = function(){
        for (var i = 0 ; i < mElementMapping.length ; i++){
            if(mElementMapping[i])
                mElementMapping[i].update();
        }
    };
    
    /*
     * 设置当前的渲染相机
     */
    var setRenderringCamera = function(camera){
        mRenderringCamera = camera;
    };
    
    var getElementbyNum = function(index){
        if(_containsKey(index)) 
            return mElementMapping[index];
        else 
            return null;
    };
    
    var _containsKey = function(index){
        if(index < 0) return false;
        
        if(mElementMapping[index]) return true;
        else return false;
    };
    
    var mPublic = {
        update : update,
        draw : draw,
        getElementbyNum : getElementbyNum,
        setRenderringCamera : setRenderringCamera,
        initManager : initManager
    };

    return mPublic;
}());



