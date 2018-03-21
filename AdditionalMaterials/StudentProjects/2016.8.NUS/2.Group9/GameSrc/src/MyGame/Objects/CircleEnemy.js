/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global Console */

function CircleEnemy(center,radius,angle,isClockwise,speed) {
    this.followEnemyPath = "assets/FollowEnemy.png";
    this.sprite = null;
    this.center = center;
    this.size = 10;
    this.radius = radius;
    this.angle = angle;
    this.pos = [];
    this.isClockwise = isClockwise;
    this.speed = speed;
    this.init();
    
    
}

CircleEnemy.prototype.init = function() {
    this.sprite = new GameObject(new SpriteRenderable(this.followEnemyPath));
    this.ComputeAngle();
    this.sprite.getXform().setPosition(this.pos[0],this.pos[1]);
    this.sprite.getXform().setSize(this.size,this.size);
    var color = this.sprite.getRenderable().getColor();
    color[3] = 1;
    this.sprite.getRenderable().setColor(color);
};

CircleEnemy.prototype.ComputeAngle = function () {
    this.pos[0] = Math.cos(Math.PI/180*this.angle)*this.radius+this.center[0];
    this.pos[1] = Math.sin(Math.PI/180*this.angle)*this.radius+this.center[1];
};

CircleEnemy.prototype.draw = function (camera) {
    this.sprite.draw(camera);
};


CircleEnemy.prototype.UpdateState = function( player ) {
    if(this.isClockwise){
        this.angle+=this.speed;
    } else {
        this.angle-=this.speed;
    }
    
    if(this.angle > 360){
        this.angle -= 360;
    } else if(this.angle < -360){
        this.angle += 360;
    }
    
    this.ComputeAngle();
    this.updatePos();
};

CircleEnemy.prototype.updatePos = function() {
    this.sprite.getXform().setPosition(this.pos[0],this.pos[1]);
};

