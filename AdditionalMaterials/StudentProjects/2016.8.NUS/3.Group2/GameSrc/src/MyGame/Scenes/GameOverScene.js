/* 
 * Created by 周玮皓 on 2016/8/1.
 * GameOverScene是游戏结束场景
 */

/* global gEngine, Scene, MyScene, gManager, vec2, Score */

function GameOverScene(){

    this.kSceneFile_Path = "assets/SceneData/End_Scene.xml";
    this.kUIRes_1 = "assets/gameover.jpg";
    this.kUIRes_2 = "assets/gameoverlabel.png";
    this.kUIRes_3 = "assets/restartbtn.png";
    
    this.mTurn = 15;            //闪烁帧数
    this.mFrame = 0;            //帧计数
}

gEngine.Core.inheritPrototype(GameOverScene, MyScene);

GameOverScene.prototype.initialize = function(){
    MyScene.prototype.initialize.call(this);
    
    /*
     * 加载UI
     */
    var sceneLoader = new SceneDataLoader(this.kSceneFile_Path);
    gManager.UIManager.initManager(sceneLoader);
    
    var ui = gManager.UIManager.getElementbyNum(1);
    ui.setState(true);
    ui = gManager.UIManager.getElementbyNum(2);
    ui.setState(true);
    ui = gManager.UIManager.getElementbyNum(3);
    ui.setState(true);
    
    gManager.CameraManager.registerCamera(sceneLoader.LoadCamera("Camera_Main"),1);
    
    gManager.InputManager.bindCommand("click",gEngine.Input.keys.Space,new TurnToStartCommand());
};

GameOverScene.prototype.loadScene = function () {
    // 加载场景
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile_Path,gEngine.TextFileLoader.eTextFileType.eXMLFile);
    gEngine.Textures.loadTexture(this.kUIRes_1);
    gEngine.Textures.loadTexture(this.kUIRes_2);
    gEngine.Textures.loadTexture(this.kUIRes_3);
};

GameOverScene.prototype.unloadScene = function () {
    // 卸载场景
    gEngine.TextFileLoader.unloadTextFile(this.kSceneFile_Path);
    gEngine.Textures.unloadTexture(this.kUIRes_1);
    gEngine.Textures.unloadTexture(this.kUIRes_2);
    gEngine.Textures.unloadTexture(this.kUIRes_3);

    gManager.DefaultOptions.score = 0;
    gManager.DefaultOptions.mBoxSpeed = -15.0;
    gManager.DefaultOptions.mLevel = 1;

    gEngine.Core.startScene(new BeginningScene());
};

GameOverScene.prototype.update = function(){
    MyScene.prototype.update.call(this);
    
};

GameOverScene.prototype.draw = function(){
    MyScene.prototype.draw.call(this);
};
