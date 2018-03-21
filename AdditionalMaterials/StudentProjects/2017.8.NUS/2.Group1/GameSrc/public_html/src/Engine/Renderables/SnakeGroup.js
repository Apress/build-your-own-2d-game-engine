/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global gEngine */

function SnakeGroup(num,headImage,bodyImage){
    this.num=num;
    this.mSnakeGroup=[];
    this.headImage=headImage;
    this.bodyImage=bodyImage;
    this.deadArr=[];
    this.CRASH_DIS=4;
    this.mState=[];
    this.mSpeedUpImage=[];
    this.mReverseImage=[];
    this.mInvincibilityImage=[];
    this.mNightImage=[];
    this.kSpeedUpImage="assets/speedup.png";
    this.kSpeedUpNightImage="assets/speedupNight.png";
    this.kReverseImage="assets/uncontrol.png";
    this.kReverseNightImage="assets/uncontrolNight.png";
    this.kInvincibilityImage="assets/invincibility.png";
    this.kInvincibilityNightImage="assets/invincibilityNight.png";
    this.kNightImage="assets/night.png";
    this.kBlack="assets/nightMap.png";
    this.mProcess=[];
}
SnakeGroup.prototype.loadScene=function(){
    gEngine.Textures.loadTexture(this.kSpeedUpImage);
    gEngine.Textures.loadTexture(this.kSpeedUpNightImage);
    gEngine.Textures.loadTexture(this.kReverseImage);
    gEngine.Textures.loadTexture(this.kReverseNightImage);
    gEngine.Textures.loadTexture(this.kInvincibilityImage);
    gEngine.Textures.loadTexture(this.kInvincibilityNightImage);
    gEngine.Textures.loadTexture(this.kNightImage);
    gEngine.Textures.loadTexture(this.kBlack);
};
SnakeGroup.prototype.unloadScene=function(){
    gEngine.Textures.unloadTexture(this.kSpeedUpImage);
    gEngine.Textures.unloadTexture(this.kSpeedUpNightImage);
    gEngine.Textures.unloadTexture(this.kReverseImage);
    gEngine.Textures.unloadTexture(this.kReverseNightImage);
    gEngine.Textures.unloadTexture(this.kInvincibilityImage);
    gEngine.Textures.unloadTexture(this.kInvincibilityNightImage);
    gEngine.Textures.unloadTexture(this.kNightImage);
    gEngine.Textures.unloadTexture(this.kBlack);
};
SnakeGroup.prototype.initialize=function(snake1,snake2){
    for(var i=0;i<this.num;i++){
        this.mInvincibilityImage[i]=null;
        this.mReverseImage[i]=null;
        this.mSpeedUpImage[i]=null;
        this.mNightImage[i]=null;
        this.mProcess[i]=[];
    }
    this.mSnakeGroup[0]=snake1;
    this.mSnakeGroup[1]=snake2;
    for(var i=2;i<this.num;i++){
        this.mSnakeGroup[i]=new Snake(this.headImage,this.bodyImage);
    }
};
SnakeGroup.prototype.draw=function(vpMatrix){
    for(var i=0;i<this.num;i++){
        this.mSnakeGroup[i].draw(vpMatrix);
    }
};
SnakeGroup.prototype.drawEffects=function(vpMatrix,m){
        if(this.mNightImage[m]!==null&&this.mNightImage[m]!==undefined){this.mNightImage[m].draw(vpMatrix);}
        if(m<2){
            if(this.mInvincibilityImage[m]!==null){this.mInvincibilityImage[m].draw(vpMatrix);}
            if(this.mReverseImage[m]!==null){this.mReverseImage[m].draw(vpMatrix);}
            if(this.mSpeedUpImage[m]!==null){this.mSpeedUpImage[m].draw(vpMatrix);}
            for(var i=0;i<4;i++){
                if(this.mProcess[m][i]!==null&&this.mProcess[m][i]!==undefined){this.mProcess[m][i].draw(vpMatrix);}
            }
        }
};
SnakeGroup.prototype.deathCheck=function(){
    var a=false;
    for(var i=0;i<this.num;i++){
        this.deadArr[i]=false;
        for(var j=0;j<this.num;j++){
            for(var n=0;n<this.mSnakeGroup[j].getSnakeLen();n++){
                if(j!==i){
                    if(Math.sqrt(Math.pow(this.mSnakeGroup[i].getHeadPos()[0]-this.mSnakeGroup[j].getSnake()[n].getXform().getXPos(),2)+Math.pow(this.mSnakeGroup[i].getHeadPos()[1]-this.mSnakeGroup[j].getSnake()[n].getXform().getYPos(),2))<this.CRASH_DIS){
                        //console.log([i,j,n]);
                        //if(this.mSnakeGroup[i].mInvincibility===false){
                            this.deadArr[i]=true;
                        //}
                        //else{this.deadArr[j]=true;}
                        a=true;
                    }
                }
                if(j===i&&n!==0){
                    if(Math.sqrt(Math.pow(this.mSnakeGroup[i].getHeadPos()[0]-this.mSnakeGroup[j].getSnake()[n].getXform().getXPos(),2)+Math.pow(this.mSnakeGroup[i].getHeadPos()[1]-this.mSnakeGroup[j].getSnake()[n].getXform().getYPos(),2))<this.CRASH_DIS/1.414){
                        //console.log([Math.sqrt(Math.pow(this.mSnakeGroup[i].getHeadPos()[0]-this.mSnakeGroup[j].getSnake()[n].getXform().getXPos(),2)+Math.pow(this.mSnakeGroup[i].getHeadPos()[1]-this.mSnakeGroup[j].getSnake()[n].getXform().getYPos(),2)),i,j,n]);
                        //if(this.mSnakeGroup[i].mInvincibility===false){
                            this.deadArr[i]=true;
                        //}
                        //else{this.deadArr[j]=true;}
                        a=true;
                    }
                }
            }
        }
    }
    return a;
};
SnakeGroup.prototype.update=function(energy,fruit){
    for(var i=0;i<this.num;i++){
        this.mState[i]=false;
    }
    this.mState[1]=this.mSnakeGroup[1].update(gEngine.Input.keys.Up,gEngine.Input.keys.Down,gEngine.Input.keys.Left,gEngine.Input.keys.Right,gEngine.Input.keys.Enter);
    this.mState[0]=this.mSnakeGroup[0].update(gEngine.Input.keys.W,gEngine.Input.keys.S,gEngine.Input.keys.A,gEngine.Input.keys.D,gEngine.Input.keys.Space);
    for(var i=2;i<this.num;i++){
        this.mSnakeGroup[i].update();
    }
    energy.change(this.mSnakeGroup[0].getHeadPos()[0], this.mSnakeGroup[0].getHeadPos()[1], 7, 1);
    energy.change(this.mSnakeGroup[1].getHeadPos()[0], this.mSnakeGroup[1].getHeadPos()[1], 7, 2);
    fruit.change(this.mSnakeGroup[0].getHeadPos()[0], this.mSnakeGroup[0].getHeadPos()[1], 7, 1);
    fruit.change(this.mSnakeGroup[1].getHeadPos()[0], this.mSnakeGroup[1].getHeadPos()[1], 7, 2);
    

    
    this.deathCheck();
    for(var i=0;i<this.num;i++){
        if(this.deadArr[i]&&this.mSnakeGroup[i].mInvincibility===false){
            this.mState[i]=true;
            this.mSnakeGroup[i].newBorn();
        }
        this.mSnakeGroup[i].eat(energy.getSum()[i+1],fruit.getName()[i]);
        if(this.mSnakeGroup[i].mReverseEat){
            for(var j=0;j<this.num;j++){
                this.mSnakeGroup[j].mReverse=true;
                this.mSnakeGroup[j].mTime[1]+=300;
            }
            this.mSnakeGroup[i].mReverse=false;
            this.mSnakeGroup[i].mReverseEat=false;
        }
        if(this.mSnakeGroup[i].mNightEat){
            for(var j=0;j<this.num;j++){
                if(i!==j){
                this.mSnakeGroup[j].mNight=true;
                this.mSnakeGroup[j].mTime[3]+=300;
            }
            }
            this.mSnakeGroup[i].mNightEat=false;
        }
    }
    
    
    
    for(var i=0;i<this.num;i++){
        if(this.mSnakeGroup[i].mRushing){
            if(this.mSpeedUpImage[i]===null){
                this.mSpeedUpImage[i]=new TextureRenderable(this.kSpeedUpImage);  
                this.mSpeedUpImage[i].getXform().setSize(20,20);
                this.mSpeedUpImage[i].setColor([1,1,1,0]);
                this.mProcess[i][0]=new ProcessBar();
                this.mProcess[i][0].setColor([1,0,0,1],[0.9,0.9,0.9,1]);
                this.mProcess[i][0].setSize(20,3);
            }
            if(i===0){
                this.mSpeedUpImage[i].getXform().setPosition(this.mSnakeGroup[i].getHeadPos()[0]-40,this.mSnakeGroup[i].getHeadPos()[1]+45);
            }
            if(i===1){
                this.mSpeedUpImage[i].getXform().setPosition(this.mSnakeGroup[i].getHeadPos()[0]-10,this.mSnakeGroup[i].getHeadPos()[1]+45);
            }
            if(this.mSnakeGroup[i].mNight){this.mSpeedUpImage[i].setTexture(this.kSpeedUpNightImage);}
            else{this.mSpeedUpImage[i].setTexture(this.kSpeedUpImage);}
            this.mProcess[i][0].setPosition(this.mSpeedUpImage[i].getXform().getXPos(),this.mSpeedUpImage[i].getXform().getYPos()-10);
            this.mProcess[i][0].update(this.mSnakeGroup[i].mTime[0]/300);
        }else{
            this.mSpeedUpImage[i]=null;
            this.mProcess[i][0]=null;
        }

        if(this.mSnakeGroup[i].mReverse){
            if(this.mReverseImage[i]===null){
                this.mReverseImage[i]=new TextureRenderable(this.kReverseImage);  
                this.mReverseImage[i].getXform().setSize(20,20);
                this.mReverseImage[i].setColor([1,1,1,0]);
                this.mProcess[i][1]=new ProcessBar();
                this.mProcess[i][1].setColor([1,0,0,1],[0.9,0.9,0.9,1]);
                this.mProcess[i][1].setSize(20,3);
            }
            if(i===0){
                this.mReverseImage[i].getXform().setPosition(this.mSnakeGroup[i].getHeadPos()[0]-15,this.mSnakeGroup[i].getHeadPos()[1]+45);
            }
            if(i===1){
                this.mReverseImage[i].getXform().setPosition(this.mSnakeGroup[i].getHeadPos()[0]+15,this.mSnakeGroup[i].getHeadPos()[1]+45);
            }
            if(this.mSnakeGroup[i].mNight){this.mReverseImage[i].setTexture(this.kReverseNightImage);}
            else{this.mReverseImage[i].setTexture(this.kReverseImage);}
            this.mProcess[i][1].setPosition(this.mReverseImage[i].getXform().getXPos(),this.mReverseImage[i].getXform().getYPos()-10);            
            this.mProcess[i][1].update(this.mSnakeGroup[i].mTime[1]/300);
        }else{
            this.mReverseImage[i]=null;
            this.mProcess[i][1]=null;
        }
        
        if(this.mSnakeGroup[i].mInvincibility){
            if(this.mInvincibilityImage[i]===null){
                this.mInvincibilityImage[i]=new SpriteRenderable(this.kInvincibilityImage);  
                this.mInvincibilityImage[i].setElementUVCoordinate(0.15,0.85,0.15,0.85);
                this.mInvincibilityImage[i].getXform().setSize(20,20);
                this.mInvincibilityImage[i].setColor([1,1,1,0]);
                this.mProcess[i][2]=new ProcessBar();
                this.mProcess[i][2].setColor([1,0,0,1],[0.9,0.9,0.9,1]);
                this.mProcess[i][2].setSize(20,3);
            }
            if(i===0){
                this.mInvincibilityImage[i].getXform().setPosition(this.mSnakeGroup[i].getHeadPos()[0]+10,this.mSnakeGroup[i].getHeadPos()[1]+45);
            }
            if(i===1){
                this.mInvincibilityImage[i].getXform().setPosition(this.mSnakeGroup[i].getHeadPos()[0]+40,this.mSnakeGroup[i].getHeadPos()[1]+45);
            }
            if(this.mSnakeGroup[i].mNight){this.mInvincibilityImage[i].setTexture(this.kInvincibilityNightImage);}
            else{this.mInvincibilityImage[i].setTexture(this.kInvincibilityImage);}
            this.mProcess[i][2].setPosition(this.mInvincibilityImage[i].getXform().getXPos(),this.mInvincibilityImage[i].getXform().getYPos()-10);            
            this.mProcess[i][2].update(this.mSnakeGroup[i].mTime[2]/300);
        }else{
            this.mInvincibilityImage[i]=null;
            this.mProcess[i][2]=null;
        }
        if(this.mSnakeGroup[i].mNight){
            if(this.mNightImage[i]===null){
                this.mNightImage[i]=new TextureRenderable(this.kNightImage);  
                this.mNightImage[i].getXform().setSize(125,125);
                this.mNightImage[i].setColor([1,1,1,0]);
                
                this.mProcess[i][3]=new ProcessBar();
                this.mProcess[i][3].setColor([1,0,0,1],[0.9,0.9,0.9,1]);
                this.mProcess[i][3].setSize(80,3);
            }   
                this.mNightImage[2]=new TextureRenderable(this.kBlack);  
                this.mNightImage[2].setColor([1,1,1,0]);
                this.mNightImage[2].getXform().setSize(600,600);
                this.mNightImage[2].getXform().setPosition(0,0);
                this.mNightImage[i].getXform().setPosition(this.mSnakeGroup[i].getHeadPos()[0],this.mSnakeGroup[i].getHeadPos()[1]);
                this.mProcess[i][3].setPosition(this.mNightImage[i].getXform().getXPos(),this.mNightImage[i].getXform().getYPos()-40);            
                this.mProcess[i][3].update(this.mSnakeGroup[i].mTime[3]/300);
        }else{
                this.mNightImage[i]=null;
                this.mProcess[i][3]=null;
                if(!(this.mSnakeGroup[0].mNight||this.mSnakeGroup[1].mNight))this.mNightImage[2]=null;
        }
    }
};
SnakeGroup.prototype.getState=function(){return this.mState;};
