/* 
 * Created by 周玮皓 on 2016/8/1.
 * BeginningScene是开始场景
 */

/* global gEngine, Scene, MyScene, vec2, gManager */

function BeginningScene(){
    
    this.kSceneFile_Path = "assets/SceneData/Start_Scene.xml";
    
    this.kUIRes_1 = "assets/aboutusbtn.png";
    this.kUIRes_2 = "assets/startbtn.png";
    this.kUIRes_3 = "assets/startscene.png";
    this.kUIRes_4 = "assets/aboutuscontent.png";
    this.kUIRes_5 = "assets/gamename.png";
    
    this.kWaitTime = 30;
    this.mTimeCount = 0;
    this.mIsQuit = false;
}

gEngine.Core.inheritPrototype(BeginningScene, MyScene);

BeginningScene.prototype.initialize = function(){
    MyScene.prototype.initialize.call(this);
    //gEngine.AudioClips.stopBackgroundAudio();

    var sceneLoader = new SceneDataLoader(this.kSceneFile_Path);

    gManager.UIManager.initManager(sceneLoader);
    gManager.CameraManager.registerCamera(sceneLoader.LoadCamera("Camera_Main"));

    
    var uiAboutUs = new ShowAboutUsCommand();
    gManager.InputManager.bindCommand("click",gEngine.Input.keys.Q,uiAboutUs);
    
    var ui = gManager.UIManager.getElementbyNum(1);
    ui.setState(true);
    ui = gManager.UIManager.getElementbyNum(2);
    ui.setState(true);
    ui = gManager.UIManager.getElementbyNum(4);
    ui.setState(true);

};

BeginningScene.prototype.loadScene = function () {
    // 加载场景

    gEngine.TextFileLoader.loadTextFile(this.kSceneFile_Path,gEngine.TextFileLoader.eTextFileType.eXMLFile);
    gEngine.Textures.loadTexture(this.kUIRes_1);
    gEngine.Textures.loadTexture(this.kUIRes_2);
    gEngine.Textures.loadTexture(this.kUIRes_3);
    gEngine.Textures.loadTexture(this.kUIRes_4);
    gEngine.Textures.loadTexture(this.kUIRes_5);

};

BeginningScene.prototype.unloadScene = function () {
    // 卸载场景
    gEngine.TextFileLoader.unloadTextFile(this.kSceneFile_Path);
    gEngine.Textures.unloadTexture(this.kUIRes_1);
    gEngine.Textures.unloadTexture(this.kUIRes_2);
    gEngine.Textures.unloadTexture(this.kUIRes_3);
    gEngine.Textures.unloadTexture(this.kUIRes_4);
    gEngine.Textures.unloadTexture(this.kUIRes_5);
    
    gEngine.Core.startScene(new RunningScene());

};

BeginningScene.prototype.update = function(){
    MyScene.prototype.update.call(this);
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
        this.mIsQuit = true;
        gManager.InputManager.initManager();
        var ui = gManager.UIManager.getElementbyNum(1);
        ui.setState(false);
        ui = gManager.UIManager.getElementbyNum(2);
        ui.setState(false);
        ui = gManager.UIManager.getElementbyNum(3);
        ui.setState(false);
        ui = gManager.UIManager.getElementbyNum(4);
        ui.setState(false);
    }
    
    if(this.kWaitTime < this.mTimeCount && this.mIsQuit ){
        gEngine.GameLoop.stop();
    }else if(this.mIsQuit){
        this.mTimeCount++;
    }
};

BeginningScene.prototype.draw = function(){
    MyScene.prototype.draw.call(this);
};


