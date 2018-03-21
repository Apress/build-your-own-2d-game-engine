var mScoreList = mScoreList || [];

function HighScoreScene(level, newScore, music=true)
{
    this.kMonthNames = ["Jan","Feb","Mar","Apr","May","Jun",
                        "Jul","Aug","Sep","Oct","Nov","Dec"];
    
    this.Level = level;
    this.kHighScores = "assets/highscore.json";
    this.mNewScore = Math.floor(newScore);
    this.mScoreLength = 10;
    this.mNameLength = 8;
    this.mEntry = null;
    
    this.mText = [];
    this.mCamera = null;
    //this.mScoreList = [];
    this.musicOn=music;
    this.level=level
}
gEngine.Core.inheritPrototype(HighScoreScene, Scene);

HighScoreScene.prototype.loadScene = function()
{      
  gEngine.TextFileLoader.loadTextFile(this.kHighScores,"json",null);
};

HighScoreScene.prototype.unloadScene = function()
{
  var temp = this.listToString();
  //console.log("writing",temp);
  //gEngine.TextFileLoader.saveTextFile(this.kHighScores,"json",null,temp);
  
  //gEngine.TextFileLoader.unloadTextFile(this.kHighScores);
  //TODO: go to whatever the next scene is
  var intro = new IntroScreen(this.level, this.musicOn);
  gEngine.Core.startScene(intro);
};

HighScoreScene.prototype.initialize = function()
{
  //var string = gEngine.ResourceMap.retrieveAsset(this.kHighScores);
  //console.log("string",string);
  //var info = JSON.parse(string);
  //this.mScoreList = info.list;
  
  this.mCamera = new Camera(
    vec2.fromValues(0,0),
    1100,
    [0,0,1100,600]
  );
  this.mCamera.setBackgroundColor([0.8,1,1,1]);
  
  //make the "new" of all scores false
  for(var i=0; i<mScoreList.length; i++)
      mScoreList[i][3] = false;
      
  var d = new Date();
  var ds = "" + d.getDate() + " " + this.kMonthNames[d.getMonth()] + " " + (d.getFullYear()%100);
  this.mEntry = [this.mNewScore, "", ds, true];
  mScoreList.push(this.mEntry);
  mScoreList.sort(function(a,b){return b[0]-a[0];});
  //console.log(this.mScoreList);
  if(mScoreList.length > this.mScoreLength)
    mScoreList.length = this.mScoreLength;

  this.makeRenderables();
};

HighScoreScene.prototype.update = function()
{
  if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && 
     this.containsActualCharacters(this.mEntry[1]))
  {
    gEngine.GameLoop.stop();
  }
  
  var changed = false;
  if(this.mEntry[1].length < this.mNameLength)
  {
    // A-Z
    for(var i=gEngine.Input.keys.A; i<=gEngine.Input.keys.Z; i++)
    {
      if(gEngine.Input.isKeyClicked(i))
      {
        this.mEntry[1] += String.fromCharCode(65/*A in ascii*/ + i - gEngine.Input.keys.A);
        changed = true;
      }
    }
    
    // 0-9
    for(var i=gEngine.Input.keys.Zero; i<=gEngine.Input.keys.Nine; i++)
    {
      if(gEngine.Input.isKeyClicked(i))
      {
        this.mEntry[1] += String.fromCharCode(48/*A in ascii*/ + i - gEngine.Input.keys.Zero);
        changed = true;
      }
    }
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
    {
      this.mEntry[1] += " ";
      changed = true;
    }
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
    {
      this.mEntry[1] += " ";
      changed = true;
    }
  }
  
  if(this.mEntry[1].length >0 && gEngine.Input.isKeyClicked(gEngine.Input.keys.BackSpace))
  {
      this.mEntry[1] = this.mEntry[1].slice(0,-1);
      changed = true;
  }
  
  if(changed)
  {
    this.makeRenderables();
  }
};

HighScoreScene.prototype.draw = function()
{
  gEngine.Core.clearCanvas([0.9,0.9,0.9,1]);
  this.mCamera.setupViewProjection();
  for(var i=0; i<mScoreList.length; i++)
  {
    this.mText[i].draw(this.mCamera);
  }
};


HighScoreScene.prototype.listToString = function()
{
  var temp = {"list":this.mScoreList};
  return JSON.stringify(temp);
};

HighScoreScene.prototype.makeRenderables = function()
{
    for(var i=0; i<mScoreList.length; i++)
    {
      if(mScoreList[i][3])
      {
        this.mText[i] = new FontRenderable("" + 
                mScoreList[i][0].toString().padEnd(8)+ 
                mScoreList[i][1].toString().padEnd(this.mNameLength,'_')
                  .padEnd(this.mNameLength + 5) +
                mScoreList[i][2]);
        this.mText[i].setColor( [0.7,0,0,1] );
      }
      else
      {
        this.mText[i] = new FontRenderable("" + 
                mScoreList[i][0].toString().padEnd(8)+ 
                mScoreList[i][1].toString().padEnd(this.mNameLength + 5) +
                mScoreList[i][2]);
        this.mText[i].setColor( [0,0,0,1] );
      }
      this.mText[i].setTextHeight(20);
      this.mText[i].getXform().setPosition(-500,200 - (25*i));
    } 
};

HighScoreScene.prototype.containsActualCharacters = function(str)
{
  for(var i=0; i<str.length; i++)
  {
    if(str.charAt(i) != ' ') return true;         
  }
  return false;
};

