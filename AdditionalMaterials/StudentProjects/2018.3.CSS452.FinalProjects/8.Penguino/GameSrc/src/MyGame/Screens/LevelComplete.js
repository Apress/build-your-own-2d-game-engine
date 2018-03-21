function LevelComplete(level, lives, score, music=true)
{
  this.mCamera = null;
  this.Level=level;
  this.Lives=lives;
  this.Score=score;
  this.mFontRend=null;
  this.musicOn=music;
    this.lwinMusic = "assets/sounds/levelwin.mp3";
}
gEngine.Core.inheritPrototype(LevelComplete, Scene);

LevelComplete.prototype.initialize = function()
{
    
     gEngine.AudioClips.playACue(this.lwinMusic);
     
  this.mCamera = new Camera(
    vec2.fromValues(0,0),
    1100,
    [0,0,1100,600]
  );
  this.mCamera.setBackgroundColor([0.8,1,1,1]);
  
  this.mFontRend = new FontRenderable("Good Job!  Space for next Level");
    this.mFontRend.setColor([0,1,.5,1]);
    this.mFontRend.setTextHeight(25);
    this.mFontRend.getXform().setPosition(-500,200);
    
    this.info = new FontRenderable("Level: " +this.Level);
    this.info.setColor([0,0,0,1]);
    this.info.setTextHeight(25);
    this.info.getXform().setPosition(-500,150);
    
    this.info2 = new FontRenderable("Score: "+ Math.floor(this.Score));
    this.info2.setColor([0,1,0,1]);
    this.info2.setTextHeight(25);
    this.info2.getXform().setPosition(-500,100);
    
    this.info3 = new FontRenderable("Lives: "+this.Lives);
    this.info3.setColor([1,0,0,1]);
    this.info3.setTextHeight(25);
    this.info3.getXform().setPosition(-500,50);
  
};


LevelComplete.prototype.loadScene = function(){
  gEngine.AudioClips.loadAudio(this.lwinMusic);      
};


LevelComplete.prototype.unloadScene = function()
{
    gEngine.AudioClips.unloadAudio(this.lwinMusic);  
  if(this.Lives>0){
  var game = new MyGame(this.Level+1, this.Lives, this.Score, this.musicOn);
    gEngine.Core.startScene(game);
  }else{
    var gameover = new GameOver(this.Level, this.Score, this.musicOn);
    gEngine.Core.startScene(gameover);
  }
};


LevelComplete.prototype.update = function()
{
     if(this.Lives<=0){
        gEngine.GameLoop.stop();   
    }
   
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
  {
    gEngine.GameLoop.stop();
  }
  
};

LevelComplete.prototype.draw = function()
{
  gEngine.Core.clearCanvas([0.9,0.9,0.9,1]);
  this.mCamera.setupViewProjection();
  this.mFontRend.draw(this.mCamera);
  this.info.draw(this.mCamera);
  this.info2.draw(this.mCamera);
  this.info3.draw(this.mCamera);

};

