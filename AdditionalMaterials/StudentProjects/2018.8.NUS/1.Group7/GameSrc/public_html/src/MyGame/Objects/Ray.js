/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*global gEngine: false, Renderable: false ,GameObject*/
"use strict";
const Direction= {
    Up: 0,
    Right: 1,
    Down: 2,
    Left: 3
};

function Ray(HeroXform,Width,Length,state,Platformset,TexturePath){
    this.mHeroXform= HeroXform;
    this.mHeroXform= HeroXform;
    this.mHeroHeight=HeroXform.getHeight();
    this.mHeroWidth=HeroXform.getWidth();
    this.mHeroXPos=HeroXform.getXPos();
    this.mHeroYPos=HeroXform.getYPos();
    this.mHeroMinX= this.mHeroXPos -this.mHeroWidth*1.0/2;
    this.mHeroMaxX= this.mHeroXPos + this.mHeroWidth*1.0/2;
    this.mHeroMinY= this.mHeroYPos -this.mHeroHeight*1.0/2;
    this.mHeroMaxY= this.mHeroYPos + this.mHeroHeight*1.0/2;  
    this.mState=state;
    this.mWidth=Width;
    this.mLength=Length;
    this.kTexture=TexturePath;
    this.mPlatformset=Platformset;
    this.mCurTime=0;
    this.leftisFirstCalcNewPos= true;
    this.rightisFirstCalcNewPos= true;
    this.upisFirstCalcNewPos= true;
    this.downisFirstCalcNewPos= true;
    this.mPlatformsetIncOrderMinX=  new GameObjectSet(); 
    this.mPlatformsetIncOrderMinY=  new GameObjectSet(); 
    this.mPlatformsetDecOrderMaxX=  new GameObjectSet(); 
    this.mPlatformsetDecOrderMaxY=  new GameObjectSet(); 
    this.uplength= 0;this.upPosX=0; this.upPosY=0;
    this.downlength= 0;this.downPosX=0; this.downPosY=0;
    this.leftlength= 0;this.leftPosX=0; this.leftPosY=0;
    this.rightlength= 0;this.rightPosX=0; this.rightPosY=0;
    var i;
    for(i=0;i<this.mPlatformset.size();i++){ 
        var Level4Platformobj1= new Level4Platform(this.mPlatformset.getObjectAt(i),i);
        this.mPlatformsetIncOrderMinX.addToSet(Level4Platformobj1);
        var Level4Platformobj2= new Level4Platform(this.mPlatformset.getObjectAt(i),i);
        this.mPlatformsetIncOrderMinY.addToSet(Level4Platformobj2);
        var Level4Platformobj3= new Level4Platform(this.mPlatformset.getObjectAt(i),i);
        this.mPlatformsetDecOrderMaxX.addToSet(Level4Platformobj3);
        var Level4Platformobj4= new Level4Platform(this.mPlatformset.getObjectAt(i),i);
        this.mPlatformsetDecOrderMaxY.addToSet(Level4Platformobj4);
    }
    
    this.qsortbyMinXPos(0,this.mPlatformsetIncOrderMinX.size()-1);
    this.qsortbyMinYPos(0,this.mPlatformsetIncOrderMinY.size()-1);
    this.qsortbyMaxXPos(0,this.mPlatformsetDecOrderMaxX.size()-1);
    this.qsortbyMaxYPos(0,this.mPlatformsetDecOrderMaxY.size()-1);
    
  /*  for(i=0;i<this.mPlatformsetDecOrderMaxY.size();i++){
        console.log(this.mPlatformsetDecOrderMaxY.getObjectAt(i).MaxYPos+"\n");
    }
    */
    this.mRay=null;
    if(this.kTexture===null){
        this.mRay=new Renderable(gEngine.DefaultResources.getConstColorShader());
        this.mRay.setColor([1,1,1,1]);
    }
    else{
        this.mRay=new TextureRenderable(this.kTexture);
    }
    

    this.mRay.getXform().setPosition(this.mHeroXPos,this.mHeroYPos);
    this.mRay.getXform().setSize(0,0);
    
    
     GameObject.call(this, this.mRay);
     
   // this.alloutput();
  
}
gEngine.Core.inheritPrototype(Ray,GameObject);   

Ray.prototype.myupdate= function(HeroXform){
    this.mCurtime= this.mCurTime++;
    this.mHeroXform= HeroXform;
    this.mHeroXPos=HeroXform.getXPos();
    this.mHeroYPos=HeroXform.getYPos();
    this.mHeroMinX= this.mHeroXPos -(this.mHeroWidth)*1.0/2;
    this.mHeroMaxX= this.mHeroXPos + (this.mHeroWidth)*1.0/2;
    this.mHeroMinY= this.mHeroYPos-(this.mHeroHeight)*1.0/2;
    this.mHeroMaxY= this.mHeroYPos + (this.mHeroHeight)*1.0/2;

    var i;
    var flag=1;
    
    if(this.mCurtime%25 ===0)
    {
        this.mState++;
        this.mState =  this.mState%4;
        if(this.mState === Direction.Up){
            if(this.upisFirstCalcNewPos){
                for(i=0;i<this.mPlatformsetIncOrderMinY.size();i++){
                    flag=1;
                    if( (this.mHeroMaxX < this.mPlatformsetIncOrderMinY.getObjectAt(i).MinXPos)
                            || (this.mHeroMinX > this.mPlatformsetIncOrderMinY.getObjectAt(i).MaxXPos )) flag=0;

                    if((this.mHeroMaxY <= this.mPlatformsetIncOrderMinY.getObjectAt(i).MinYPos)
                           && flag===1 )
                    {
                        this.mLength= this.mPlatformsetIncOrderMinY.getObjectAt(i).MinYPos- this.mHeroMaxY;
                        break;
                    }
                }
                if(i>=this.mPlatformsetIncOrderMinY.size()) this.mLength= this.mPlatformsetIncOrderMinY.getObjectAt(i-1).MinYPos- this.mHeroMaxY;
                if(this.mLength<0 )this.mLength=0;
                this.uplength= this.mLength;this.upPosX=this.mHeroXPos; this.upPosY=this.mHeroMaxY+ this.mLength*1.0/2;
                this.upisFirstCalcNewPos=false;
                
           }
           this.mRay.getXform().setSize(this.mWidth,this.uplength);
           this.mRay.getXform().setPosition(this.upPosX,this.upPosY);
       }
       else if(this.mState===Direction.Down){
           if(this.downisFirstCalcNewPos){
                for(i=0;i<this.mPlatformsetDecOrderMaxY.size();i++){
                    flag=1;
                    if(  (this.mHeroMaxX < this.mPlatformsetDecOrderMaxY.getObjectAt(i).MinXPos)
                             || (this.mHeroMinX > this.mPlatformsetDecOrderMaxY.getObjectAt(i).MaxXPos )) flag=0;
                     if((this.mHeroMinY>= this.mPlatformsetDecOrderMaxY.getObjectAt(i).MaxYPos )
                             && flag===1  )
                     {
                         this.mLength= this.mHeroMinY - this.mPlatformsetDecOrderMaxY.getObjectAt(i).MaxYPos;

                         break;
                     }
                 }
                 if(i>=this.mPlatformsetDecOrderMaxY.size()) this.mLength= this.mHeroMinY - this.mPlatformsetDecOrderMaxY.getObjectAt(i-1).MaxYPos;
                 if(this.mLength<0 )this.mLength=0;
                 this.downlength= this.mLength;this.downPosX=this.mHeroXPos; this.downPosY=this.mHeroMinY-this.mLength*1.0/2;
                 this.downisFirstCalcNewPos=false;
             }
            this.mRay.getXform().setPosition(this.downPosX,this.downPosY);
            this.mRay.getXform().setSize(this.mWidth,this.downlength);
       }
       else if(this.mState === Direction.Left){
            if(this.leftisFirstCalcNewPos){
                for(i=0;i<this.mPlatformsetDecOrderMaxX.size();i++){
                    flag= 1;
                    if((this.mHeroMaxY < this.mPlatformsetDecOrderMaxX.getObjectAt(i).MinYPos)
                            || (this.mHeroMinY > this.mPlatformsetDecOrderMaxX.getObjectAt(i).MaxYPos)) flag=0;
                    if((this.mHeroMinX >= this.mPlatformsetDecOrderMaxX.getObjectAt(i).MaxXPos)
                            && flag===1 )
                    {
                        this.mLength=this.mHeroMinX- this.mPlatformsetDecOrderMaxX.getObjectAt(i).MaxXPos;
                        break;
                    }
                }
                if(i>=this.mPlatformsetDecOrderMaxX.size()) this.mLength= this.mHeroMinX- this.mPlatformsetDecOrderMaxX.getObjectAt(i-1).MaxXPos;
                if(this.mLength<0 )this.mLength=0;
                 this.leftlength= this.mLength;this.leftPosX=this.mHeroMinX-this.mLength*1.0/2; this.leftPosY=this.mHeroYPos;
                 this.leftisFirstCalcNewPos=false;
           }
           this.mRay.getXform().setPosition(this.leftPosX ,this.leftPosY);
           this.mRay.getXform().setSize(this.leftlength,this.mWidth);
       }
       else if(this.mState === Direction.Right){
           if( this.rightisFirstCalcNewPos){
                for(i=0;i<this.mPlatformsetIncOrderMinX.size();i++){
                     flag= 1;
                    if((this.mHeroMaxY< this.mPlatformsetIncOrderMinX.getObjectAt(i).MinYPos)
                            || (this.mHeroMinY > this.mPlatformsetIncOrderMinX.getObjectAt(i).MaxYPos)) flag=0;
                    if((this.mHeroMaxX <= this.mPlatformsetIncOrderMinX.getObjectAt(i).MinXPos)
                             && flag===1 )
                    {
                        this.mLength=this.mPlatformsetIncOrderMinX.getObjectAt(i).MinXPos -this.mHeroMaxX;
                        break;
                    }
                }
                if(i>=this.mPlatformsetIncOrderMinX.size())   this.mLength=this.mPlatformsetIncOrderMinX.getObjectAt(i-1).MinXPos -this.mHeroMaxX;
                if(this.mLength<0 )this.mLength=0;
                this.rightlength= this.mLength;this.rightPosX=this.mHeroMaxX+this.mLength*1.0/2; this.rightPosY=this.mHeroYPos;
                this.rightisFirstCalcNewPos=false;
            }
            this.mRay.getXform().setPosition(this.rightPosX,this.rightPosY);
            this.mRay.getXform().setSize(this.rightlength,this.mWidth);
       }
    
    }
};

Ray.prototype.AllDicFirstCal = function()
{
    this.leftisFirstCalcNewPos= true;
    this.rightisFirstCalcNewPos= true;
    this.upisFirstCalcNewPos= true;
    this.downisFirstCalcNewPos= true;   
};

Ray.prototype.alloutput= function(){
  
    var i;
     
    for(i=0;i<this.mPlatformsetIncOrderMinX.size();i++){
        this.myoutput(this.mPlatformsetIncOrderMinX.getObjectAt(i)); }
    
 
 
    for(i=1;i<this.mPlatformset.size();i++){
  
        this.myoutput1(this.mPlatformset.getObjectAt(i)); }
   /* 
       console.log("this.mPlatformsetDecOrderMaxX") ;
    for(i=0;i<this.mPlatformsetDecOrderMaxX.size();i++){
        this.myoutput(this.mPlatformsetDecOrderMaxX.getObjectAt(i)); }
    
    console.log("this.mPlatformsetIncOrderMinY") ;
    for(i=0;i<this.mPlatformsetIncOrderMinY.size();i++){
        this.myoutput(this.mPlatformsetIncOrderMinY.getObjectAt(i)); }
    
       console.log("this.mPlatformsetDecOrderMaxY") ;
    for(i=0;i<this.mPlatformsetDecOrderMaxY.size();i++){
        this.myoutput(this.mPlatformsetDecOrderMaxY.getObjectAt(i)); }*/
    
};
Ray.prototype.myoutput= function (a){
    console.log("originalindex:"+a.platformindex );
    console.log("Minx:"+a.MinXPos);
    console.log("Maxx:"+a.MaxXPos);
    console.log("MinY:"+a.MinYPos);
    console.log("MaxY:"+a.MaxYPos);
};

Ray.prototype.myoutput1= function (Mapobj){
    
   var MinXPos= Mapobj.xPos-Mapobj.width*1.0/2;
    var MinYPos= Mapobj.yPos-Mapobj.height*1.0/2;
   var MaxXPos= Mapobj.xPos+Mapobj.width*1.0/2;
    var MaxYPos= Mapobj.yPos+ Mapobj.height*1.0/2;
    console.log("Minx:"+MinXPos);
    console.log("Maxx:"+MaxXPos);
    console.log("MinY:"+MinYPos);
    console.log("MaxY:"+MaxYPos);
   
};
Ray.prototype.PartitionbyMinXPos=function (lowindex, highindex){
    var x= this.mPlatformsetIncOrderMinX.getObjectAt(highindex).MinYPos;
    var x1= this.mPlatformsetIncOrderMinX.getObjectAt(highindex).MaxYPos;
    var x2= this.mPlatformsetIncOrderMinX.getObjectAt(highindex).MinXPos;
    var x3= this.mPlatformsetIncOrderMinX.getObjectAt(highindex).MaxXPos;
    
    var i =lowindex -1;
    for( var j= lowindex;  j<highindex;j++)
    {
        if(this.mPlatformsetIncOrderMinX.getObjectAt(j).MinXPos <x2)
        {
            var temp;
            i++;
            temp= this.mPlatformsetIncOrderMinX.getObjectAt(i).MinXPos;
            this.mPlatformsetIncOrderMinX.getObjectAt(i).MinXPos= this.mPlatformsetIncOrderMinX.getObjectAt(j).MinXPos;
            this.mPlatformsetIncOrderMinX.getObjectAt(j).MinXPos= temp;
            temp= this.mPlatformsetIncOrderMinX.getObjectAt(i).MinYPos;
            this.mPlatformsetIncOrderMinX.getObjectAt(i).MinYPos= this.mPlatformsetIncOrderMinX.getObjectAt(j).MinYPos;
            this.mPlatformsetIncOrderMinX.getObjectAt(j).MinYPos= temp;
            temp= this.mPlatformsetIncOrderMinX.getObjectAt(i).MaxYPos;
            this.mPlatformsetIncOrderMinX.getObjectAt(i).MaxYPos= this.mPlatformsetIncOrderMinX.getObjectAt(j).MaxYPos;
            this.mPlatformsetIncOrderMinX.getObjectAt(j).MaxYPos= temp;
            temp= this.mPlatformsetIncOrderMinX.getObjectAt(i).MaxXPos;
            this.mPlatformsetIncOrderMinX.getObjectAt(i).MaxXPos= this.mPlatformsetIncOrderMinX.getObjectAt(j).MaxXPos;
            this.mPlatformsetIncOrderMinX.getObjectAt(j).MaxXPos= temp;            
        }
    }
    
    this.mPlatformsetIncOrderMinX.getObjectAt(highindex).MinYPos=this.mPlatformsetIncOrderMinX.getObjectAt(i+1).MinYPos;
    this.mPlatformsetIncOrderMinX.getObjectAt(highindex).MaxYPos= this.mPlatformsetIncOrderMinX.getObjectAt(i+1).MaxYPos;
    this.mPlatformsetIncOrderMinX.getObjectAt(highindex).MaxXPos= this.mPlatformsetIncOrderMinX.getObjectAt(i+1).MaxXPos;
    this.mPlatformsetIncOrderMinX.getObjectAt(highindex).MinXPos= this.mPlatformsetIncOrderMinX.getObjectAt(i+1).MinXPos;
    this.mPlatformsetIncOrderMinX.getObjectAt(i+1).MinYPos =x;
    this.mPlatformsetIncOrderMinX.getObjectAt(i+1).MaxYPos =x1;
    this.mPlatformsetIncOrderMinX.getObjectAt(i+1).MinXPos =x2;
    this.mPlatformsetIncOrderMinX.getObjectAt(i+1).MaxXPos =x3;
    
    return i+1;                        
            
};
Ray.prototype.qsortbyMinXPos= function( lowindex, highindex){
      if(lowindex<highindex){
          var q = this.PartitionbyMinXPos(lowindex,highindex);
          this.qsortbyMinXPos(lowindex, q-1);
          this.qsortbyMinXPos(q+1,highindex);
      }
};
Ray.prototype.PartitionbyMinYPos=function (lowindex, highindex){
    var x= this.mPlatformsetIncOrderMinY.getObjectAt(highindex).MinYPos;
    var x1= this.mPlatformsetIncOrderMinY.getObjectAt(highindex).MaxYPos;
    var x2= this.mPlatformsetIncOrderMinY.getObjectAt(highindex).MinXPos;
    var x3= this.mPlatformsetIncOrderMinY.getObjectAt(highindex).MaxXPos;
    var i =lowindex -1;
    for( var j= lowindex;  j<highindex;j++)
    {
        if(this.mPlatformsetIncOrderMinY.getObjectAt(j).MinYPos <x)
        {
            var temp;
            i++;
            temp= this.mPlatformsetIncOrderMinY.getObjectAt(i).MinXPos;
            this.mPlatformsetIncOrderMinY.getObjectAt(i).MinXPos= this.mPlatformsetIncOrderMinY.getObjectAt(j).MinXPos;
            this.mPlatformsetIncOrderMinY.getObjectAt(j).MinXPos= temp;
            temp= this.mPlatformsetIncOrderMinY.getObjectAt(i).MinYPos;
            this.mPlatformsetIncOrderMinY.getObjectAt(i).MinYPos= this.mPlatformsetIncOrderMinY.getObjectAt(j).MinYPos;
            this.mPlatformsetIncOrderMinY.getObjectAt(j).MinYPos= temp;
            temp= this.mPlatformsetIncOrderMinY.getObjectAt(i).MaxYPos;
            this.mPlatformsetIncOrderMinY.getObjectAt(i).MaxYPos= this.mPlatformsetIncOrderMinY.getObjectAt(j).MaxYPos;
            this.mPlatformsetIncOrderMinY.getObjectAt(j).MaxYPos= temp;
            temp= this.mPlatformsetIncOrderMinY.getObjectAt(i).MaxXPos;
            this.mPlatformsetIncOrderMinY.getObjectAt(i).MaxXPos= this.mPlatformsetIncOrderMinY.getObjectAt(j).MaxXPos;
            this.mPlatformsetIncOrderMinY.getObjectAt(j).MaxXPos= temp;       
        }
    }
    this.mPlatformsetIncOrderMinY.getObjectAt(highindex).MinYPos=this.mPlatformsetIncOrderMinY.getObjectAt(i+1).MinYPos;
    this.mPlatformsetIncOrderMinY.getObjectAt(highindex).MaxYPos= this.mPlatformsetIncOrderMinY.getObjectAt(i+1).MaxYPos;
    this.mPlatformsetIncOrderMinY.getObjectAt(highindex).MaxXPos= this.mPlatformsetIncOrderMinY.getObjectAt(i+1).MaxXPos;
    this.mPlatformsetIncOrderMinY.getObjectAt(highindex).MinXPos= this.mPlatformsetIncOrderMinY.getObjectAt(i+1).MinXPos;
    this.mPlatformsetIncOrderMinY.getObjectAt(i+1).MinYPos =x;
    this.mPlatformsetIncOrderMinY.getObjectAt(i+1).MaxYPos =x1;
    this.mPlatformsetIncOrderMinY.getObjectAt(i+1).MinXPos =x2;
    this.mPlatformsetIncOrderMinY.getObjectAt(i+1).MaxXPos =x3;
    return i+1;                        
            
};
Ray.prototype.qsortbyMinYPos= function( lowindex, highindex){
      if(lowindex<highindex){
          var q = this.PartitionbyMinYPos(lowindex,highindex);
          this.qsortbyMinYPos(lowindex, q-1);
          this.qsortbyMinYPos(q+1,highindex);
      }
};
Ray.prototype.PartitionbyMaxXPos=function (lowindex, highindex){
    
    var x= this.mPlatformsetDecOrderMaxX.getObjectAt(highindex).MinYPos;
    var x1= this.mPlatformsetDecOrderMaxX.getObjectAt(highindex).MaxYPos;
    var x2= this.mPlatformsetDecOrderMaxX.getObjectAt(highindex).MinXPos;
    var x3= this.mPlatformsetDecOrderMaxX.getObjectAt(highindex).MaxXPos;
    
    var i =lowindex -1;
    for( var j= lowindex;  j<highindex;j++)
    {
        if(this.mPlatformsetDecOrderMaxX.getObjectAt(j).MaxXPos > x3)
        {
            var temp;
            i++;
            temp= this.mPlatformsetDecOrderMaxX.getObjectAt(i).MinXPos;
            this.mPlatformsetDecOrderMaxX.getObjectAt(i).MinXPos= this.mPlatformsetDecOrderMaxX.getObjectAt(j).MinXPos;
            this.mPlatformsetDecOrderMaxX.getObjectAt(j).MinXPos= temp;
            temp= this.mPlatformsetDecOrderMaxX.getObjectAt(i).MinYPos;
            this.mPlatformsetDecOrderMaxX.getObjectAt(i).MinYPos= this.mPlatformsetDecOrderMaxX.getObjectAt(j).MinYPos;
            this.mPlatformsetDecOrderMaxX.getObjectAt(j).MinYPos= temp;
            temp= this.mPlatformsetDecOrderMaxX.getObjectAt(i).MaxYPos;
            this.mPlatformsetDecOrderMaxX.getObjectAt(i).MaxYPos= this.mPlatformsetDecOrderMaxX.getObjectAt(j).MaxYPos;
            this.mPlatformsetDecOrderMaxX.getObjectAt(j).MaxYPos= temp;
            temp= this.mPlatformsetDecOrderMaxX.getObjectAt(i).MaxXPos;
            this.mPlatformsetDecOrderMaxX.getObjectAt(i).MaxXPos= this.mPlatformsetDecOrderMaxX.getObjectAt(j).MaxXPos;
            this.mPlatformsetDecOrderMaxX.getObjectAt(j).MaxXPos= temp;   
        }
    }
     this.mPlatformsetDecOrderMaxX.getObjectAt(highindex).MinYPos=this.mPlatformsetDecOrderMaxX.getObjectAt(i+1).MinYPos;
    this.mPlatformsetDecOrderMaxX.getObjectAt(highindex).MaxYPos= this.mPlatformsetDecOrderMaxX.getObjectAt(i+1).MaxYPos;
    this.mPlatformsetDecOrderMaxX.getObjectAt(highindex).MaxXPos= this.mPlatformsetDecOrderMaxX.getObjectAt(i+1).MaxXPos;
    this.mPlatformsetDecOrderMaxX.getObjectAt(highindex).MinXPos= this.mPlatformsetDecOrderMaxX.getObjectAt(i+1).MinXPos;
    this.mPlatformsetDecOrderMaxX.getObjectAt(i+1).MinYPos =x;
    this.mPlatformsetDecOrderMaxX.getObjectAt(i+1).MaxYPos =x1;
    this.mPlatformsetDecOrderMaxX.getObjectAt(i+1).MinXPos =x2;
    this.mPlatformsetDecOrderMaxX.getObjectAt(i+1).MaxXPos =x3;
    
    return i+1;                        
            
};
Ray.prototype.qsortbyMaxXPos= function(lowindex, highindex){
      if(lowindex<highindex){
          var q = this.PartitionbyMaxXPos(lowindex,highindex);
          this.qsortbyMaxXPos(lowindex, q-1);
          this.qsortbyMaxXPos(q+1,highindex);
      }
};
Ray.prototype.PartitionbyMaxYPos=function (lowindex, highindex){
    var x= this.mPlatformsetDecOrderMaxY.getObjectAt(highindex).MinYPos;
    var x1= this.mPlatformsetDecOrderMaxY.getObjectAt(highindex).MaxYPos;
    var x2= this.mPlatformsetDecOrderMaxY.getObjectAt(highindex).MinXPos;
    var x3= this.mPlatformsetDecOrderMaxY.getObjectAt(highindex).MaxXPos;
    
    var i =lowindex -1;
    for( var j= lowindex;  j<highindex;j++)
    {
        if(this.mPlatformsetDecOrderMaxY.getObjectAt(j).MaxYPos > x1)
        {
            var temp;
            i++;
            temp= this.mPlatformsetDecOrderMaxY.getObjectAt(i).MinXPos;
            this.mPlatformsetDecOrderMaxY.getObjectAt(i).MinXPos= this.mPlatformsetDecOrderMaxY.getObjectAt(j).MinXPos;
            this.mPlatformsetDecOrderMaxY.getObjectAt(j).MinXPos= temp;
            temp= this.mPlatformsetDecOrderMaxY.getObjectAt(i).MinYPos;
            this.mPlatformsetDecOrderMaxY.getObjectAt(i).MinYPos= this.mPlatformsetDecOrderMaxY.getObjectAt(j).MinYPos;
            this.mPlatformsetDecOrderMaxY.getObjectAt(j).MinYPos= temp;
            temp= this.mPlatformsetDecOrderMaxY.getObjectAt(i).MaxYPos;
            this.mPlatformsetDecOrderMaxY.getObjectAt(i).MaxYPos= this.mPlatformsetDecOrderMaxY.getObjectAt(j).MaxYPos;
            this.mPlatformsetDecOrderMaxY.getObjectAt(j).MaxYPos= temp;
            temp= this.mPlatformsetDecOrderMaxY.getObjectAt(i).MaxXPos;
            this.mPlatformsetDecOrderMaxY.getObjectAt(i).MaxXPos= this.mPlatformsetDecOrderMaxY.getObjectAt(j).MaxXPos;
            this.mPlatformsetDecOrderMaxY.getObjectAt(j).MaxXPos= temp;   
        }
    }    
    this.mPlatformsetDecOrderMaxY.getObjectAt(highindex).MinYPos=this.mPlatformsetDecOrderMaxY.getObjectAt(i+1).MinYPos;
    this.mPlatformsetDecOrderMaxY.getObjectAt(highindex).MaxYPos= this.mPlatformsetDecOrderMaxY.getObjectAt(i+1).MaxYPos;
    this.mPlatformsetDecOrderMaxY.getObjectAt(highindex).MaxXPos= this.mPlatformsetDecOrderMaxY.getObjectAt(i+1).MaxXPos;
    this.mPlatformsetDecOrderMaxY.getObjectAt(highindex).MinXPos= this.mPlatformsetDecOrderMaxY.getObjectAt(i+1).MinXPos;
    this.mPlatformsetDecOrderMaxY.getObjectAt(i+1).MinYPos =x;
    this.mPlatformsetDecOrderMaxY.getObjectAt(i+1).MaxYPos =x1;
    this.mPlatformsetDecOrderMaxY.getObjectAt(i+1).MinXPos =x2;
    this.mPlatformsetDecOrderMaxY.getObjectAt(i+1).MaxXPos =x3;
    
    
    return i+1;                        
            
};
Ray.prototype.qsortbyMaxYPos= function(lowindex, highindex){
      if(lowindex<highindex){
          var q = this.PartitionbyMaxYPos(lowindex,highindex);
          this.qsortbyMaxYPos(lowindex, q-1);
          this.qsortbyMaxYPos(q+1,highindex);
      }
};
