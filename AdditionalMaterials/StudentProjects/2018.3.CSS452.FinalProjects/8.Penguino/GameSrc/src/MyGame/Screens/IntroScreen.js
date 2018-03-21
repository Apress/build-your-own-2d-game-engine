function IntroScreen(lastlevel, music=true)
{
  this.mCamera = null;
  
    this.levelSelect=0;
    
    this.defaultLives=3;
    
    this.defaultScore=0;
    
    this.lastLevel = lastlevel;
    if(this.lastLevel<1){
        this.lastLevel=1;
    }
    
    this.locked=[];
    
    this.lockedMsg=["Unlocked", "Locked"];
   
  //box showing level selection
  this.mSelectBox=null;
  
  //WC difference in y direction between level options
  this.Distance=25;
    
  this.numLevels=6; //0 based indexing (test demo level is 0)
  
  this.LevelDisplay=[];
  
  this.Message=null;
  this.M2=null;
  this.musicOn=music;
  
    
  this.introMusic = "assets/sounds/introscreenPeng.mp3";
  this.selectping = "assets/sounds/select.mp3";
  this.errorping = "assets/sounds/error.mp3";
  
  //For testing purposes unlock all levels:
  this.lastLevel=5;
    
}
gEngine.Core.inheritPrototype(IntroScreen, Scene);

IntroScreen.prototype.loadScene = function(){
        //loading sounds
    gEngine.AudioClips.loadAudio(this.introMusic);
    gEngine.AudioClips.loadAudio(this.selectping);
    gEngine.AudioClips.loadAudio(this.errorping);
};
IntroScreen.prototype.unloadScene = function()
{
        //unload sounds
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.introMusic);
    gEngine.AudioClips.unloadAudio(this.selectping);
    gEngine.AudioClips.unloadAudio(this.errorping);
    
  var game = new MyGame(this.levelSelect, this.defaultLives, this.defaultScore, this.musicOn);
      gEngine.Core.startScene(game);
};

IntroScreen.prototype.initialize = function()
{
    
    //setup camera
  this.mCamera = new Camera(
    vec2.fromValues(0,0),
    1100,
    [0,0,1100,600]
  );
  this.mCamera.setBackgroundColor([0.8,1,1,1]); 
  
  //Unlock Levels
    var i =0;
    
    var lock = 0;
    
    for(i=0; i<this.numLevels; i++){
        
        if( i >this.lastLevel){
            lock=1;
        }
        else{
            lock=0;
        }
        
        this.locked[i]=lock;
    }
  
    i=0;
  //level 0 (demo level)
    this.LevelDisplay[0]= new FontRenderable("Level "+0 + " (Tutorial)");
    this.LevelDisplay[0].setColor([0,0,0,1]);
    this.LevelDisplay[0].setTextHeight(25);
    this.LevelDisplay[0].getXform().setPosition(0,200-i*this.Distance);
  
  for(i=1; i<=this.numLevels+1;i++){
    this.LevelDisplay[i]= new FontRenderable("Level "+i+" "+this.lockedMsg[this.locked[i]]);
    this.LevelDisplay[i].setColor([0,0,0,1]);
    this.LevelDisplay[i].setTextHeight(25);
    this.LevelDisplay[i].getXform().setPosition(0,200-i*this.Distance);
  }
  
  this.Message = new FontRenderable("Penguino Level "+this.levelSelect+ ". up/down to select, Space to Start");
    this.Message.setColor([0,.1,.4,1]);
    this.Message.setTextHeight(20);
    this.Message.getXform().setPosition(-200,-250);
    
  this.mSelectBox = new Renderable();
  this.mSelectBox.setColor([1,0,0,.8]);
  var sbxf = this.mSelectBox.getXform();
  sbxf.setSize(800,this.Distance);
  sbxf.setPosition(100, 200-this.levelSelect*this.Distance);
  
  this.mScoreList = HighScoreScene.mScoreList;
  this.mHighScores = [];
  this.makeHighScores();
  
   gEngine.AudioClips.playBackgroundAudio(this.introMusic);
    
};

IntroScreen.prototype.update = function()
{
  
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Up))
  {
      gEngine.AudioClips.playACue(this.selectping);
     this.levelSelect--;
     if(this.levelSelect<0){
         this.levelSelect=this.numLevels-1;
     }
  }
  
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Down))
  { 
       gEngine.AudioClips.playACue(this.selectping);
      this.levelSelect++;
      if(this.levelSelect>this.numLevels-1){
          this.levelSelect=0;
      }
  }
  
  
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space) || gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)){
        if(!this.locked[this.levelSelect]){
            gEngine.GameLoop.stop();
        }else{
             gEngine.AudioClips.playACue(this.errorping);
        }   
  }
  
  
    this.Message = new FontRenderable("Penguino Level "+this.levelSelect+ ". up/down to select, Space to Start");
    this.Message.setColor([0,.1,.4,1]);
    this.Message.setTextHeight(20);
    this.Message.getXform().setPosition(-200,-250);
    
    this.M2 = new FontRenderable("Last Level Completed "+ this.lastLevel + "         Music:"+this.musicOn+"        H to view HighScores");
    this.M2.setColor([0,.1,.4,1]);
    this.M2.setTextHeight(20);
    this.M2.getXform().setPosition(-300,-210);
    
    this.M3 = new FontRenderable("A: LEFT,  D: RIGHT,  SPACE: JUMP,  J: SLIDE,  M: MUSIC ON/OFF");
    this.M3.setColor([0,.1,.4,1]);
    this.M3.setTextHeight(20);
    this.M3.getXform().setPosition(-200, 275);
    
    
    
  var sbxf = this.mSelectBox.getXform();
  sbxf.setPosition(100, 200-this.levelSelect*this.Distance);
    
    if(this.locked[this.levelSelect]){
        this.mSelectBox.setColor([1,0,0,.8]);
    }
    else{
      this.mSelectBox.setColor([0,1,0,.8]);  
    }
  
  
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.M))
    {
    this.toggleMusic();
    }

    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) this.mDrawHighScores ^= 1;
};

IntroScreen.prototype.draw = function()
{
  gEngine.Core.clearCanvas([0.9,0.9,0.9,1]);
  this.mCamera.setupViewProjection();
    
    this.mSelectBox.draw(this.mCamera);
    
    for(i=0;i<this.numLevels;i++){
        this.LevelDisplay[i].draw(this.mCamera);
    }
    
    this.Message.draw(this.mCamera);
    if(this.M2 !== null)
    this.M2.draw(this.mCamera);

    if(this.M2!=null){
        this.M2.draw(this.mCamera);
    }
        if(this.M3!=null){
        this.M3.draw(this.mCamera);
    }

  if(this.mDrawHighScores)
  {
    for(var i=0; i<this.mHighScores.length; i++)
    {
      this.mHighScores[i].draw(this.mCamera);
    }
  }
};

IntroScreen.prototype.toggleMusic = function()
{
   if(this.musicOn){
       this.musicOn=false;
       gEngine.AudioClips.stopBackgroundAudio();     
   }
   else{
       this.musicOn=true;
       gEngine.AudioClips.playBackgroundAudio(this.introMusic);
   }
};

IntroScreen.prototype.makeHighScores = function()
{
    for(var i=0; i<mScoreList.length; i++)
    {
      this.mHighScores[i] = new FontRenderable("" + 
                mScoreList[i][0].toString().padEnd(6)+ 
                mScoreList[i][1].toString().padEnd(9) +
                mScoreList[i][2]);
      this.mHighScores[i].setColor( [0,0,0,1] );
      this.mHighScores[i].setTextHeight(20);
      this.mHighScores[i].getXform().setPosition(-500,200 - (25*i));
    } 
};

