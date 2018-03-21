"use strict";  // Operate in Strict mode such that variables must be declared before used!
var mytext = null;
function GameOver(level) {
    this.kBg = "assets/gameover.jpg";
    this.kTitle = "assets/overtitle.png";
    this.kRestart="assets/button/Restart.png";
    this.kSubmit="assets/button/Submit.png";
    this.kMenu="assets/button/Menu.png";
    this.kOverClip="assets/over.mp3";
    this.mCamera = null;
    this.myfont = "assets/Consolas-32";
    
    this.mBg = null;
    this.backlevel = level;
    this.mTitle= null;
    this.mRestartButton = null;
    this.mSubmitButton = null;
    this.mMenuButton=null;
    this.mMsg = null;
    this.mLight = null;
    this.mName=[];
    this.namenone = false;
    //timeinterval
    this.mInterval=0;
}
gEngine.Core.inheritPrototype(GameOver, Scene);

GameOver.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kTitle);
     gEngine.Textures.loadTexture(this.kRestart);
      gEngine.Textures.loadTexture(this.kSubmit);
        gEngine.Textures.loadTexture(this.kMenu);
        gEngine.AudioClips.loadAudio(this.kOverClip);
        gEngine.Fonts.loadFont(this.myfont);
};

GameOver.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kTitle);
     gEngine.Textures.unloadTexture(this.kRestart);
      gEngine.Textures.unloadTexture(this.kSubmit);
      gEngine.Textures.unloadTexture(this.kMenu);
      gEngine.AudioClips.unloadAudio(this.kOverClip);
       gEngine.Fonts.unloadFont(this.myfont);
    ///
    gEngine.Core.startScene(this.nextLevel);
};

GameOver.prototype.initialize = function () {
    gEngine.AudioClips.playACue(this.kOverClip);
    // Initialize Lights
    GameStart.prototype._initializeLights.call(this);
    //Main Camera
    this.mCamera = new Camera(
            vec2.fromValues(40, 30),
            80,
            [0, 0, 800, 600]
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
   
    
    this.mBg = new LightRenderable(this.kBg);
    this.mBg.setColor([0, 0, 0, 0]);
    this.mBg.getXform().setPosition(40, 30);
    this.mBg.getXform().setSize(80, 60);
    this.mBg.addLight(this.mLight);
   
    this.mTitle = new LightRenderable(this.kTitle);
    this.mTitle.setColor([0, 0, 0, 0]);
    this.mTitle.getXform().setPosition(40, -10);
    this.mTitle.getXform().setSize(60, 15);
    this.mTitle.addLight(this.mLight);
    
    this.score = gEngine.ResourceMap.retrieveAsset(gScore);
    var msg = "Score: " + this.score;
    //this.mMsg.setText(msg);
    this.mMsg = new FontRenderable(msg);
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.setFont(this.myfont);
    this.mMsg.getXform().setPosition(30, -20);
    this.mMsg.setTextHeight(4);
    
    this.hint = new FontRenderable("input name or click restart");
    this.hint.setColor([1, 0, 0, 1]);
    this.hint.setFont(this.myfont);
    this.hint.getXform().setPosition(38, 24.6);
    this.hint.setTextHeight(2.5);
    
    this.mRestartButton = new Button(this.kRestart, null, [40, 20], [14, 5], this.mLight)
    this.mRestartButton.setVisibility(false);
    
    this.mSubmitButton = new Button(this.kSubmit, null, [25, 20], [14, 5], this.mLight);
    this.mSubmitButton.setVisibility(false);
    this.mMenuButton = new Button(this.kMenu, null, [55, 20], [14, 5], this.mLight);
    this.mMenuButton.setVisibility(false);
  
    //this.mName=
    
    mytext = new FontRenderable("");
    mytext.setFont(this.myfont);
    mytext.setColor([0, 0, 0, 1]);
    mytext.getXform().setPosition(20.4,-27);
    mytext.setTextHeight(4);
    
    
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
GameOver.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    this.mBg.draw(this.mCamera);
    this.mTitle.draw(this.mCamera);
    this.mMsg.draw(this.mCamera);
    this.mSubmitButton.draw(this.mCamera);
    this.mRestartButton.draw(this.mCamera);
    this.mMenuButton.draw(this.mCamera);
    mytext.draw(this.mCamera);
    if(this.namenone){
        this.hint.draw(this.mCamera);
    }
         
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
GameOver.prototype.update = function () {
    
    var mx = this.mCamera.mouseWCX();
    var my = this.mCamera.mouseWCY();
    
    if(this.mTitle.getXform().getYPos()<45){
         this.mTitle.getXform().incYPosBy(1);
         mytext.getXform().incYPosBy(1);
         this.mMsg.getXform().incYPosBy(1);
    }
       
    else {
       
        this.mRestartButton.setVisibility(true);
        this.mSubmitButton.setVisibility(true);
        this.mMenuButton.setVisibility(true);
        this.mRestartButton.update(mx, my);
        this.mSubmitButton.update(mx, my);
        this.mMenuButton.update(mx, my);
        if(this.mRestartButton.getStatus() === Button.eButtonStatus.eClicked){
            
            if(this.backlevel ===1)
                this.nextLevel = new LevelOne();
            else if(this.backlevel ===2)
                this.nextLevel = new LevelThree();
            else if(this.backlevel ===3)
                this.nextLevel = new LevelTwo();
            else
                this.nextLevel = new LevelFour();
            gEngine.GameLoop.stop();
        }
        if(this.mMenuButton.getStatus() === Button.eButtonStatus.eClicked){
            this.nextLevel = new GameStart();
            gEngine.GameLoop.stop();
        }
         if(this.mSubmitButton.getStatus() === Button.eButtonStatus.eClicked){
            
            if(this.mName.length ===0){
                this.namenone = true;
            }
            else {
                 var yourname = this.mName.join("");
            console.log(yourname);
            $.ajax({url :"src/MyGame/insert.php",data:{name:yourname,gScore : this.score},success: function(result){
                 console.log(result);
                 //alert(result);
         },error:function(){
            console.log("erre");
         }}); 
            
                this.nextLevel = new Ranking();
                gEngine.GameLoop.stop();
            }
           
        }
    }
    //向名字中输入字母
    var alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    for(var i =65;i<91;i++){
    if(gEngine.Input.isKeyClicked(i)){
        
        if(this.mName.length < 8)
            this.mName.push(alpha[i-65]);
       
    }
    }
    //向姓名中输入数字
    for(var j =48;j<58;j++){
    if(gEngine.Input.isKeyClicked(j)){
        
        if(this.mName.length < 8)
            this.mName.push(j-48);
       
    }
    } 
    //检测退格
    if(gEngine.Input.isKeyClicked(32)){
      this.mName.pop();
    }
  
   
        this.mInterval++;
        if(this.mInterval>40&&this.mInterval<80)
        {
            
            //this.mInterval=0;
            mytext.setText("Your Name:"+this.mName.join(""));
        }
        else
        if(this.mInterval>0&&this.mInterval<=40)
        {
             mytext.setText("Your Name:"+this.mName.join("")+"_");
        }
        else
        {
            this.mInterval=0;
        }
 
    //GameStart.prototype.testScene.call(this);

};

