"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero2(spriteTexture, weight, posX, posY) {
    this.weight = weight;
    this.radius = 2*Math.sqrt(weight);
    this.vX = 0;
    this.vY = 0;
    this.outControl = false;
    this.mDye = new SpriteRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(posX, posY);
    this.mDye.getXform().setSize(this.radius, this.radius);
    this.mDye.setElementPixelPositions(0, 1024, 0, 1024);
    GameObject.call(this, this.mDye);

    var r = new RigidCircle(this.getXform(), 0.2*Math.sqrt(this.radius*this.radius + this.radius*this.radius));
    this.setRigidBody(r);
}
gEngine.Core.inheritPrototype(Hero2, GameObject);


Hero2.prototype.update = function (centerX, centerY) {
    if(this.outControl === false)
        this.keyControl(centerX, centerY);
    this.radius = 2 * Math.sqrt(this.weight);
    const r = new RigidCircle(this.getXform(), 0.2*Math.sqrt(this.radius*this.radius + this.radius*this.radius));
    this.setRigidBody(r);
    this.getRigidBody().setVelocity(this.vX,this.vY);//    this.keyControl(centerX, centerY);
    this.mDye.getXform().setSize(this.radius, this.radius);
    GameObject.prototype.update.call(this);
};


Hero2.prototype.incWeight = function(delta) {
    this.weight += delta;
};

Hero2.prototype.getWeight = function() {
    return this.weight;
};

Hero2.prototype.getHeroRadius = function() {
    return this.radius/2;
};

Hero2.prototype.keyControl = function (centerX, centerY) {
    var speed = 1.2/Math.sqrt(this.weight);
    var xform = this.getXform();

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.I)) {
        //上移
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.J)) {
            //左上
            if(this.vX < -speed*100/Math.sqrt(2)){
                this.vX += 1/Math.sqrt(2);
                if(this.vX > -speed*100/Math.sqrt(2))
                    this.vX = -speed*100/Math.sqrt(2);
            }
            if(this.vY > speed*100/Math.sqrt(2)){
                this.vY -= 1/Math.sqrt(2);
                if(this.vY < speed*100/Math.sqrt(2))
                    this.vY = speed*100/Math.sqrt(2);
            }  
            if(this.vY < 0.3)
                this.vY += 1/Math.sqrt(2);
            if(this.vY < speed*100/Math.sqrt(2))
                this.vY += 0.5/Math.sqrt(2);
            if(this.vX > -speed*100/Math.sqrt(2))
                this.vX -= 0.5/Math.sqrt(2);
        }
        else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.L)) {
            //右上
            if(this.vX > speed*100/Math.sqrt(2)){
                this.vX -= 1/Math.sqrt(2);
                if(this.vX < speed*100/Math.sqrt(2))
                    this.vX = speed*100/Math.sqrt(2);
            }
            if(this.vY > speed*100/Math.sqrt(2)){
                this.vY -= 1/Math.sqrt(2);
                if(this.vY < speed*100/Math.sqrt(2))
                    this.vY = speed*100/Math.sqrt(2);
            }
            if(this.vY < 0.3)
                this.vY += 1/Math.sqrt(2);
            if(this.vY < speed*100/Math.sqrt(2))
                this.vY += 0.5/Math.sqrt(2);
            if(this.vX < speed*100/Math.sqrt(2))
                this.vX += 0.5/Math.sqrt(2);
        }
        else{
            //向上
            if(this.vY < 0.3)
                this.vY += 1;
            if(this.vY > speed*100)
                this.vY -= 1;
            if(this.vY < speed*100)
                this.vY += 0.5;
            if(this.vX < 0){
                this.vX += 1;
                if(this.vX > 0)
                    this.vX = 0;
            }
            else if(this.vX > 0){
                this.vX -= 1;
                if(this.vX < 0)
                    this.vX = 0;
            }
        }
        this.mDye.setElementPixelPositions(1024*3, 1024*4, 0, 1024);
    }
    else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.K)) {
        //下移
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.J)) {
            //左下
            if(this.vX < -speed*100/Math.sqrt(2)){
                this.vX += 1/Math.sqrt(2);
                if(Math.abs(this.vX) > -speed*100/Math.sqrt(2))
                    this.vX = -speed*100/Math.sqrt(2);
            }
            if(this.vY < -speed*100/Math.sqrt(2)){
                this.vY += 1/Math.sqrt(2);
                if(this.vY > -speed*100/Math.sqrt(2))
                    this.vY = -speed*100/Math.sqrt(2);
            }  
            if(this.vY > 0.3)
            this.vY -= 1/Math.sqrt(2);
            if(this.vY > -speed*100/Math.sqrt(2))
                this.vY -= 0.5/Math.sqrt(2);
            if(this.vX > -speed*100/Math.sqrt(2))
                this.vX -= 0.5/Math.sqrt(2);
        }
        else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.L)) {
            //右下
            if(this.vX > speed*100/Math.sqrt(2)){
                this.vX -= 1/Math.sqrt(2);
                if(this.vX < speed*100/Math.sqrt(2))
                    this.vX = speed*100/Math.sqrt(2);
            }
            if(this.vY < -speed*100/Math.sqrt(2)){
                this.vY += 1/Math.sqrt(2);
                if(this.vY > -speed*100/Math.sqrt(2))
                    this.vY = -speed*100/Math.sqrt(2);
            }  
            if(this.vY > 0.3)
                this.vY -= 1/Math.sqrt(2);
            if(this.vY > -speed*100/Math.sqrt(2))
                this.vY -= 0.5/Math.sqrt(2);
            if(this.vX < speed*100/Math.sqrt(2))
                this.vX += 0.5/Math.sqrt(2);
        }
        else{
            //向下
            if(this.vY > 0.3)
                this.vY -= 1;
            if(this.vY < -speed*100)
                this.vY += 1;
            if(this.vY > -speed*100)
                this.vY -= 0.5;
            if(this.vX < 0){
                this.vX += 1;
                if(this.vX > 0)
                    this.vX = 0;
            }
            else if(this.vX > 0){
                this.vX -= 1;
                if(this.vX < 0)
                    this.vX = 0;
            }
        }
        this.mDye.setElementPixelPositions(1024*4, 1024*5, 0, 1024);
    }
    else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.J)) {
        //左移
        if(this.vX > 0)
            this.vX -= 1;
        if(this.vX < -speed*100)
            this.vX += 1;
        if(this.vX > -speed*100)
            this.vX -= 0.5;
        if(this.vY < 0.3){
            this.vY += 1;
            if(this.vY > 0.3)
                this.vY = 0.3;
        }else if(this.vY > 0.3){
            this.vY -= 1;
            if(this.vY < 0.3)
                this.vY = 0.3;
        }
        this.mDye.setElementPixelPositions(1024, 1024*2, 0, 1024);
    }
    else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.L)) {
        //右移
        if(this.vX < 0)
            this.vX += 1;
        if(this.vX > speed*100)
            this.vX -= 1;
        if(this.vX < speed*100)
            this.vX += 0.5;
        if(this.vY < 0.3){
            this.vY += 1;
            if(this.vY > 0.3)
                this.vY = 0.3;
        }else if(this.vY > 0.3){
            this.vY -= 1;
            if(this.vY < 0.3)
                this.vY = 0.3;
        }
        this.mDye.setElementPixelPositions(1024*2, 1024*3, 0, 1024);
    }else{
        if(this.vY < 0.3){
            this.vY += 1;
            if(this.vY > 0.3)
                this.vY = 0.3;
        }else if(this.vY > 0.3){
            this.vY -= 1;
            if(this.vY < 0.3)
                this.vY = 0.3;
        }
        if(this.vX < 0){
            this.vX += 1;
            if(this.vX > 0)
                this.vX = 0;
        }
        else if(this.vX > 0){
            this.vX -= 1;
            if(this.vX < 0)
                this.vX = 0;
        }
        this.mDye.setElementPixelPositions(0, 1024, 0, 1024);
        // 什么按键都没有消失，则向中心点靠近
        if((this.vX === 0) && (this.vY === 0.3)){
        var x = centerX - this.getXform().getXPos();
        var y = centerY - this.getXform().getYPos();

        x = x / Math.sqrt(x*x + y*y);
        y = y / Math.sqrt(x*x + y*y);

        if(!isNaN(x)&& !isNaN(y)){
            this.vX = 20*speed * x;
            this.vY = 20*speed * y;
        }
    }
}
    this.radius = Math.sqrt(this.weight);
    this.mDye.getXform().setSize(this.radius, this.radius);

    this.checkBound();
};

Hero2.prototype.checkBound = function(){
    var xform = this.getXform();
    if(xform.getXPos() <= -256){
        xform.setXPos(-256);
    }else if (xform.getXPos() >= 256){
        xform.setXPos(256);
    }

    if(xform.getYPos() <= -256){
        xform.setYPos(-256);
    }else if(xform.getYPos() >= 256){
        xform.setYPos(256);
    }
};

Hero2.prototype.getVX = function() { return this.vX; };

Hero2.prototype.getVY = function() { return this.vY; };

Hero2.prototype.setVX = function(vx) {
    this.vX = vx;
};

Hero2.prototype.setVY = function(vy) {
    this.vY = vy;
};
Hero2.prototype.setControl = function(state) {
    this.outControl = state;
};

Hero2.prototype.getControl = function() {
    return this.outControl;
};