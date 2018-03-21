function GameOver(level, score, music=true)
{
  this.mCamera = null;
  this.Level=level;
  this.Score=score;
  this.mFontRend=null;
  this.musicOn=music;
  this.goverMusic = "assets/sounds/gover.mp3";
}
gEngine.Core.inheritPrototype(GameOver, Scene);

GameOver.prototype.initialize = function()
{
  gEngine.AudioClips.playACue(this.goverMusic);
  
    this.mCamera = new Camera(
    vec2.fromValues(0,0),
    1100,
    [0,0,1100,600]
  );
  this.mCamera.setBackgroundColor([0.8,1,1,1]);
  
  this.mFontRend = new FontRenderable("YOU DIED!  -~-GAME--OVER-~-");
    this.mFontRend.setColor([1,0,0,1]);
    this.mFontRend.setTextHeight(35);
    this.mFontRend.getXform().setPosition(-500,200);
    
    this.info = new FontRenderable("Level: " +this.Level);
    this.info.setColor([0,0,0,1]);
    this.info.setTextHeight(25);
    this.info.getXform().setPosition(-500,150);
    
    this.info2 = new FontRenderable("Score: "+ Math.floor(this.Score));
    this.info2.setColor([0,1,0,1]);
    this.info2.setTextHeight(25);
    this.info2.getXform().setPosition(-500,100);
    
    this.mFontRend2 = new FontRenderable("press space to continue");
    this.mFontRend2.setColor([.1,0,.1,1]);
    this.mFontRend2.setTextHeight(20);
    this.mFontRend2.getXform().setPosition(-500,-100);
  
};


GameOver.prototype.loadScene = function(){
 gEngine.AudioClips.loadAudio(this.goverMusic);   
};


GameOver.prototype.unloadScene = function()
{
    gEngine.AudioClips.unloadAudio(this.goverMusic); 
    
  var hs = new HighScoreScene(this.Level,this.Score, this.musicOn);
  gEngine.Core.startScene(hs);
  //var n = new IntroScreen(this.Leveln);
  //gEngine.Core.startScene(n);
};


GameOver.prototype.update = function()
{
   
if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
  {
    gEngine.GameLoop.stop();
  }
  
};

GameOver.prototype.draw = function()
{
  gEngine.Core.clearCanvas([0.9,0.9,0.9,1]);
  this.mCamera.setupViewProjection();
  this.mFontRend.draw(this.mCamera);
  this.mFontRend2.draw(this.mCamera);
  this.info.draw(this.mCamera);
  this.info2.draw(this.mCamera);

};

