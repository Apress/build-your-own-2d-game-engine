/* 
 * Created by 周玮皓 on 2016/8/1.
 * WelcomeScene 用来加载开场动画
 */

/* global gEngine, Scene, MyScene, vec2, gManager */

function WelcomeScene(){
    

    this.kLogo = "assets/logo.png";
    this.kSceneFile_Path = "assets/SceneData/Welcome_Scene.xml";
    this.kAudio_Path = "assets/Sounds/Intro.mp3";
    this.kAudioRun_Path = "assets/Sounds/On the Come Up.mp3";
    
    this.mColor = null;
    this.mEmitter = null;
    
    this.mTimeNow = 0;
    this.mTimeShow = 250;
    this.mTimeOff = 400;
    this.mTimeTurn = 450;


    this.mWelSprite = null;
}

gEngine.Core.inheritPrototype(WelcomeScene, MyScene);

WelcomeScene.prototype.initialize = function(){
    MyScene.prototype.initialize.call(this);

    var sceneLoader = new SceneDataLoader(this.kSceneFile_Path);
    
    gManager.UIManager.initManager(sceneLoader);
    
    gManager.CameraManager.registerCamera(sceneLoader.LoadCamera("Camera_Main"),1);
    
    this.mEmitter = new SimpleEmitter([-5,0]);
    gManager.ObjectPool.addObject(this.mEmitter,2);
    
    this.mColor = gManager.UIManager.getElementbyNum(0).getRenderable().getColor();
    this.mColor[3] = 1;
    
    gEngine.AudioClips.playBackgroundAudio(this.kAudio_Path);

};

WelcomeScene.prototype.loadScene = function () {
    // 加载场景
    gEngine.Textures.loadTexture(this.kLogo);
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile_Path,gEngine.TextFileLoader.eTextFileType.eXMLFile);
    /*
    加载背景音乐
     */
    gEngine.AudioClips.loadAudio(this.kAudio_Path);
    gEngine.AudioClips.loadAudio(this.kAudioRun_Path);
    
};

WelcomeScene.prototype.unloadScene = function () {
    // 卸载场景

    gEngine.Textures.unloadTexture(this.kLogo);
    gEngine.TextFileLoader.unloadTextFile(this.kSceneFile_Path,gEngine.TextFileLoader.eTextFileType.eXMLFile);
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kAudio_Path);
    
    this.mWelSprite = null;
    this.mEmitter = null;
    
    gEngine.Core.startScene(new BeginningScene());

};

WelcomeScene.prototype.update = function(){
    
    this.mTimeNow++;
    if(this.mTimeShow > this.mTimeNow){
        this.mColor[3] = 1 - (this.mTimeNow / this.mTimeShow);
        this.mEmitter.setAlpha(this.mTimeNow / this.mTimeShow);
    }else if(this.mTimeOff > this.mTimeNow){
        this.mColor[3] = (this.mTimeNow - this.mTimeShow) / (this.mTimeOff - this.mTimeShow);
        this.mEmitter.setAlpha(1 - (this.mTimeNow - this.mTimeShow) / (this.mTimeOff - this.mTimeShow));
    }else if(this.mTimeTurn < this.mTimeNow){
        gEngine.GameLoop.stop();
    }
    
    MyScene.prototype.update.call(this);
};

WelcomeScene.prototype.draw = function(){
    MyScene.prototype.draw.call(this);
};
