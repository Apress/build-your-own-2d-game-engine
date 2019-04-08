/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Hero(image, normalMap ,mapW,mapH,x,y) {  
    this.image = image;
    this.normal = normalMap;
    this.mMapH = mapH;
    this.mMapW = mapW;
    this.mHero = new IllumRenderable(this.image,this.normal);
    this.mHero.setColor([1, 1, 1, 0]);
    this.mHero.getXform().setPosition(x, y);
    this.mHero.getXform().setSize(3, 3);                       //changed size from 4 by 4   
    //2048x512, each image is 340x398
    this.mHero.setElementPixelPositions(0,340,114,512);       //default start position  
    GameObject.call(this, this.mHero);  
    //rigib body for physics 
    this.mPhys = new RigidRectangle(this.getXform(), 4, 4);
    this.setRigidBody(this.mPhys);
    this.toggleDrawRigidShape();
    this.shaker = null;
    this.shaking = false; 
    this.rightFlag = 0;
    this.leftFlag = 0;
    this.facing = 0;    //0 face right, 1 face left 
    this.mLastBlink = Date.now();
};
gEngine.Core.inheritPrototype(Hero, GameObject);


Hero.prototype.draw = function (referencedCam) {
    this.mHero.draw(referencedCam);
};

Hero.prototype.update = function (wallSet,doorPairs,buttonSet,lights) {
    var lightX = 0;
    var lightY = 0;
    var dirLight = lights.getLightAt(1);    //light points in direction 
    //var lightPos = dirLight.getPosition(); 
    var lightDir = dirLight.getDirection();
    var heroLight = lights.getLightAt(2);   //light points to hero
    //Collisions
    var doors = doorPairs;
    var physObj = this.getRigidBody();
    physObj.setAngularVelocity(0);
    var velocity = physObj.getVelocity();
    velocity[0]=0;
    velocity[1]=0;
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Ctrl) && this.canBlink()) {
            lightY = 7;
            var i = 0;
            for(i; i < 25; i ++) {
                var flag = false;
                this.mHero.getXform().incYPosBy(0.5);
                var bb = this.getBBox();

                if(wallSet.checkLocalBounds(this.mHero,bb,0)) {
                    this.mHero.getXform().incYPosBy(-1);
                    break;
                }
                for(var j = 0; j < doors.mSet.length; j++) {
                    if(doors.mSet[j].visable) {
                        var dbb = doors.mSet[j].getBBox();
                        if(dbb.intersectsBound(bb)) {
                            this.mHero.getXform().incYPosBy(-1);
                            flag = true;
                            break;
                            
                        }
                    }
                }
                if(buttonSet.checkBounds(bb)) {
                    this.mHero.getXform().incYPosBy(-1);
                    break;
                }
                if(flag) {
                    break;
                }
            }
        }else {
            this.moveRight(); //hero direction facing 
            if(this.mHero.getXform().getYPos() <this.mMapH-4){
                var flag = false;
                this.mHero.getXform().incYPosBy(0.6);
                velocity[1] = 34;
                //dirLight.setYPos(lightPos[1] + 0.4);
                //lightDir[1] += 0.04;
                lightY = 7;
                //dirLight.setDirection(lightDir);
                var bb = this.getBBox();
                if(wallSet.checkLocalBounds(this,bb,0)) {
                    flag = true;
                }
                for(var i = 0; i < doors.mSet.length; i++) {
                    if(doors.mSet[i].visable) {
                        var dbb = doors.mSet[i].getBBox();
                        if(dbb.intersectsBound(bb)) {
                            flag = true;
                        }
                    }
                }
                if(flag === true) {
                    velocity[1] = 0;
                //    dirLight.setYPos(lightPos[1] - 0.4);
                }

                this.mHero.getXform().incYPosBy(-0.6);
            }
        }
    } 
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Ctrl) && this.canBlink()) {
            lightY = 4;
            var flag = false;
            var i = 0;
            for(i; i > -25; i--) {
                this.mHero.getXform().incYPosBy(-0.5);
                var bb = this.getBBox();

                if(wallSet.checkLocalBounds(this.mHero,bb,2)) {
                    this.mHero.getXform().incYPosBy(1);
                    break;
                }
                for(var j = 0; j < doors.mSet.length; j++) {
                    if(doors.mSet[j].visable) {
                        var dbb = doors.mSet[j].getBBox();
                        if(dbb.intersectsBound(bb)) {
                            this.mHero.getXform().incYPosBy(1);
                            flag = true;
                            break;
                            
                        }
                    }
                }
                if(buttonSet.checkBounds(bb)) {
                    this.mHero.getXform().incYPosBy(1);
                    break;
                }
                if(flag) {
                    break;
                }
            }
            
        }else {
            this.moveLeft();      //hero direction facing 
            if(this.mHero.getXform().getYPos() >4){
               var flag = false;
               this.mHero.getXform().incYPosBy(-0.6);
               velocity[1] = -34;
             //  dirLight.setYPos(lightPos[1] - 0.4);
               //lightDir[1] -= 0.04;
               lightY = 4;
               //dirLight.setDirection(lightDir);
               var bb = this.getBBox();
               if(wallSet.checkLocalBounds(this,bb,2)) {
                   flag = true;
               }
               for(var i = 0; i < doors.mSet.length; i++) {
                   if(doors.mSet[i].visable) {
                       var dbb = doors.mSet[i].getBBox();
                       if(dbb.intersectsBound(bb)) {
                           flag = true;
                       }
                   }
               }
               if(flag === true) {
                   velocity[1] = 0;
             //      dirLight.setYPos(lightPos[1] + 0.4);
               }
               this.mHero.getXform().incYPosBy(0.6);
           }
        }
    } 
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Ctrl) && this.canBlink()) {
            lightX = 1;
            var i = 0;
            for(i; i < 15; i++) {
                var flag = false;
                this.mHero.getXform().incXPosBy(1);
                var bb = this.getBBox();

                if(wallSet.checkLocalBounds(this.mHero,bb,1)) {
                    this.mHero.getXform().incXPosBy(-1);
                    break;
                }
                for(var j = 0; j < doors.mSet.length; j++) {
                    if(doors.mSet[j].visable) {
                        var dbb = doors.mSet[j].getBBox();
                        if(dbb.intersectsBound(bb)) {
                            this.mHero.getXform().incXPosBy(-1);
                            flag = true;
                            break;
                            
                        }
                    }
                }
                if(buttonSet.checkBounds(bb)) {
                    this.mHero.getXform().incXPosBy(-1);
                    break;
                }
                if(flag) {
                    break;
                }
            }
        }else {
            this.moveRight();
            if(this.mHero.getXform().getXPos() <this.mMapW-4){
                var flag = false;
                this.mHero.getXform().incXPosBy(0.6);
                velocity[0] = 34;
              //  dirLight.setXPos(lightPos[0] + 0.4);
                //lightDir[0] += 0.04;
                lightX = 1;
                //dirLight.setDirection(lightDir);
                var bb = this.getBBox();
                if(wallSet.checkLocalBounds(this,bb,1)) {
                    flag = true;
                }
                for(var i = 0; i < doors.mSet.length; i++) {
                    if(doors.mSet[i].visable) {
                        var dbb = doors.mSet[i].getBBox();
                        if(dbb.intersectsBound(bb)) {
                            flag = true;
                        }
                    }
                }
                if(flag === true) {
                    velocity[0] = 0;
            //        dirLight.setXPos(lightPos[0] - 0.4);
                }
                this.mHero.getXform().incXPosBy(-0.6);
            }
        }
    } 
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Ctrl) && this.canBlink()) {
            lightX = 2;
            var i = 0;
            for(i; i > -15; i--) {
                var flag = false;
                this.mHero.getXform().incXPosBy(-1);
                var bb = this.getBBox();

                if(wallSet.checkLocalBounds(this.mHero,bb,3)) {
                    this.mHero.getXform().incXPosBy(1);
                    break;
                }
                for(var j = 0; j < doors.mSet.length; j++) {
                    if(doors.mSet[j].visable) {
                        var dbb = doors.mSet[j].getBBox();
                        if(dbb.intersectsBound(bb)) {
                            this.mHero.getXform().incXPosBy(1);
                            flag = true;
                            break;
                            
                        }
                    }
                }
                if(buttonSet.checkBounds(bb)) {
                    this.mHero.getXform().incXPosBy(1);
                    break;
                }
                if(flag) {
                    break;
                }
            }
        }else {
            this.moveLeft();
             if(this.mHero.getXform().getXPos() >4){
                var flag = false;
                this.mHero.getXform().incXPosBy(-0.6);
                velocity[0] = -34;
               // dirLight.setXPos(lightPos[0] - 0.4);
                //lightDir[0] -= 0.04;
                lightX = 2;
                //dirLight.setDirection(lightDir);
                var bb = this.getBBox();
                if(wallSet.checkLocalBounds(this,bb,3)) {
                    flag = true;
                }
                for(var i = 0; i < doors.mSet.length; i++) {
                    if(doors.mSet[i].visable) {
                        var dbb = doors.mSet[i].getBBox();
                        if(dbb.intersectsBound(bb)) {
                            flag = true;
                        }
                    }
                }
                if(flag === true) {
                    velocity[0] = 0;
                //    dirLight.setXPos(lightPos[0] + 0.4);
                }
                this.mHero.getXform().incXPosBy(0.6);
            }
        }
    }  
    var lightDirection = lightX + lightY;
    switch(lightDirection) {
        case 0:
            break;
        case 1:
            lightDir[0] = 1;
            lightDir[1] = 0;
            dirLight.setDirection(lightDir);
            break;
        case 2:
            lightDir[0] = -1;
            lightDir[1] = 0;
            dirLight.setDirection(lightDir);
            break;
        case 4:
            lightDir[0] = 0;
            lightDir[1] = -1;
            dirLight.setDirection(lightDir);
            break;
        case 5:
            lightDir[0] = 1;
            lightDir[1] = -1;
            dirLight.setDirection(lightDir);
            break;
        case 6:
            lightDir[0] = -1;
            lightDir[1] = -1;
            dirLight.setDirection(lightDir);
            break;
        case 7:
            lightDir[0] = 0;
            lightDir[1] = 1;
            dirLight.setDirection(lightDir);
            break;
        case 8:
            lightDir[0] = 1;
            lightDir[1] = 1;
            dirLight.setDirection(lightDir);
            break;
        case 9:
            lightDir[0] = -1;
            lightDir[1] = 1;
            dirLight.setDirection(lightDir);
            break;
    }
    dirLight.set2DPosition(this.mHero.getXform().getPosition());
    heroLight.set2DPosition(this.mHero.getXform().getPosition());
    this.mHero.update();
    this.shakeUpdate();
    //console.log(velocity);
    physObj.setVelocity(velocity[0],velocity[1]);
    physObj.update();
};

Hero.prototype.shake = function () {
    this.shaker = new ShakePosition(2,2, 5, 50);
    this.shaking = true;
};

Hero.prototype.shakeUpdate = function () {
    if (this.shaker !== null)
    {
        if(this.shaker.shakeDone()){        //if shaking is completed turn off shake boolean variable
            this.shaking = false;
        }
        else if(this.shaking === true) {     //if shaking is still occuring grab getShakeResults()
            var delta = this.shaker.getShakeResults();
            var pos = this.mHero.getXform().getPosition();
            this.mHero.getXform().setYPos(pos[1] + delta[1]);
        }
    }
};

//Change element positions in "llamas_move.png" to see llama move left or right
Hero.prototype.moveLeft = function () {
    //340x398    
    var xLeft = 1360;
    var xRight = 1700;
    if(this.leftFlag === 0){ //switch foot 
        this.mHero.setElementPixelPositions(xLeft,xRight,114,512);                 //(1360, 1700,114,512);
        this.leftFlag = 1;
    }
    else if (this.leftFlag === 1){
        this.mHero.setElementPixelPositions(xLeft + 340,xRight + 340,114,512);                //(1700, 2040, 114,512)
        this.leftFlag = 2;
    }  
    else    //reset 
    {
        this.mHero.setElementPixelPositions(1020,1360,114,512);                //(1020, 1360, 114,512)
        this.leftFlag = 0;
    }
    this.facing = 1;
};

//This flips the llama to face the right side when arrow key right is clicked
Hero.prototype.moveRight = function () {
    var xLeft = 340;
    var xRight = 680;
    if(this.rightFlag === 0){ //switch foot 
        this.mHero.setElementPixelPositions(xLeft,xRight,114,512);             //(340, 680, 114,512)
        this.rightFlag = 1;
    }
    else if (this.rightFlag === 1){                                  
        this.mHero.setElementPixelPositions(xLeft + 340,xRight + 340,114,512); //(680, 1020, 114, 0, 512)
        this.rightFlag = 2;
    }
    else    //reset resting 
    {
        this.mHero.setElementPixelPositions(0,340,114,512); //(0, 340, 114, 512)
        this.rightFlag = 0;
    }
    this.facing = 0;
};
Hero.prototype.moveUpDown = function () {
    if (this.facing === 0) //facing right 
        this.mHero.setElementPixelPositions(0,340,114,512); //(0, 340, 114, 512)
    else
        this.mHero.setElementPixelPositions(1020,1360,114,512); 
        
};

Hero.prototype.getRigidBody = function(){ return this.mPhys;};
Hero.prototype.canBlink = function() {
    if (Date.now() - this.mLastBlink > 1000) {
        this.mLastBlink = Date.now();
        return true;
    } else {
        return false;
    }
}