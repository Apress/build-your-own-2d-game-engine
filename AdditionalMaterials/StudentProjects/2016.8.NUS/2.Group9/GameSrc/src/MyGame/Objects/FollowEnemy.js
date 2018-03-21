/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global Console */

function FollowEnemy(pos,follow) {
    this.AimEnemyPath = "assets/AimEnemy.png";
    this.sprite = null;
    this.pos = pos;
    this.size = 10;
    this.speed = 0.8;
    this.speedInc = 1;
    this.dirction = [0,0];
    this.maxBackTime = 0;
    this.curBackTime = 0;
    this.tag = null;
    this.state = 0;
    this.init();
    this.isFollow = follow;
    
}

FollowEnemy.prototype.init = function() {
    this.sprite = new GameObject(new SpriteRenderable(this.AimEnemyPath));
    this.sprite.getXform().setPosition(this.pos[0],this.pos[1]);
    this.sprite.getXform().setSize(this.size,this.size);
    var color = this.sprite.getRenderable().getColor();
    color[3] = 1;
    this.sprite.getRenderable().setColor(color);
};

FollowEnemy.prototype.draw = function (camera) {
    this.sprite.draw(camera);
};


FollowEnemy.prototype.UpdateState = function( player ) {
    this.ChangeState(player);
    if(this.state === 0){
       this.BackMoveUpdate();
    } else if(this.state === 1){
        this.FollowDirction();
        this.MoveUpdate();
    } 

};

FollowEnemy.prototype.MoveUpdate = function() {
    this.sprite.getXform().incXPosBy(this.dirction[0] * this.speed * this.speedInc);
    this.sprite.getXform().incYPosBy(this.dirction[1] * this.speed * this.speedInc);
};

FollowEnemy.prototype.NewDirction = function() {
    var selfpos = this.sprite.getXform().getPosition();
    this.dirction = [this.pos[0] - selfpos[0],this.pos[1] - selfpos[1]];
    var length = Math.sqrt(this.dirction[0]*this.dirction[0] + this.dirction[1]*this.dirction[1]);
    this.dirction = [this.dirction[0]/length,this.dirction[1]/length];
};

FollowEnemy.prototype.FollowDirction = function() {
    var selfpos = this.sprite.getXform().getPosition();
    this.dirction = [this.tag[0] - selfpos[0],this.tag[1] - selfpos[1]];
    var length = Math.sqrt(this.dirction[0]*this.dirction[0] + this.dirction[1]*this.dirction[1]);
    this.dirction = [this.dirction[0]/length,this.dirction[1]/length];
    
};

FollowEnemy.prototype.ChangeState = function(player){
    if(this.isFollow === false){
        this.state = 0;
        return;
    }
    var selfpos = this.sprite.getXform().getPosition();
    var pos1 = player.sprite1.getXform().getPosition();
    var length1 = Math.pow(selfpos[0] - pos1[0],2) + Math.pow(selfpos[1] - pos1[1],2);
    if(Math.sqrt(length1) < 100){
        this.state = 1;
        this.tag = pos1;
    } else {
        if(this.state !== 0){
            this.BackToPos();
        }
        this.state = 0;
    }
    
    var pos2 = player.sprite2.getXform().getPosition();
    var length2 = Math.pow(selfpos[0] - pos2[0],2) + Math.pow(selfpos[1] - pos2[1],2);
    if(length1 < length2){
        return;
    }
    if(Math.sqrt(length2) < 100){
        this.state = 1;
        this.tag = pos2;
    } else {
        if(this.state !== 0){
            this.BackToPos();
        }
        this.state = 0;
    }

    
    
    

};

FollowEnemy.prototype.BackToPos = function (){
    var selfpos = this.sprite.getXform().getPosition();
    var dir = [this.pos[0] - selfpos[0],this.pos[1] - selfpos[1]];
    var distance = Math.sqrt(dir[0]*dir[0] + dir[1]*dir[1]);
    this.dirction = [dir[0]/distance,dir[1]/distance];
    this.maxBackTime = distance / this.speed;
    this.curBackTime = 0;
};

FollowEnemy.prototype.BackMoveUpdate = function() {
    if(this.curBackTime < this.maxBackTime){
        this.MoveUpdate();
        this.curBackTime++;
    } else {
        this.sprite.getXform().setPosition(this.pos[0],this.pos[1]);
    }
    
};

FollowEnemy.prototype.remove = function (){
    this.state = 2;
    this.sprite.getXform().setPosition(-10000,-10000);
    this.dirction = [0,0];
    this.speed = 0;
};