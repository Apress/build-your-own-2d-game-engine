/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global gEngine, TextureRenderable */

function Fruits() {
    this.kPeach = "assets/peach.png";
    this.kWater = "assets/water.png";
    this.kStraw = "assets/straw.png";
    this.kGrape = "assets/grape.png";
    this.fruit = null;
    this.eaten = new Array();
    this.resource = new Array();
    this.fruitMap = new Array();
    this.sum = new Array();
    this.sumtotal = new Array();
    this.flag = 0;
    this.flag2 = 0;
    this.name = [null, null];
    this.signal = 0;

    this.sum = new Array();
    for (var i = 0; i < 3; i++) {
        this.sum[i] = 0;
    }
    this.sumtotal = new Array();
    for (var i = 0; i < 3; i++) {
        this.sumtotal[i] = 0;
    }


}

gEngine.Core.inheritPrototype(Fruits, TextureRenderable);


Fruits.prototype.loadScene = function () {
    // Game loop not running, unload all assets

    gEngine.Textures.loadTexture(this.kPeach);
    gEngine.Textures.loadTexture(this.kWater);
    gEngine.Textures.loadTexture(this.kStraw);
    gEngine.Textures.loadTexture(this.kGrape);

    // starts the next level
//    var nextLevel = new BlueLevel();  // next level to be loaded
//    gEngine.Core.startScene(nextLevel);
};

Fruits.prototype.unloadScene = function () {
    // Game loop not running, unload all assets

    gEngine.Textures.unloadTexture(this.kPeach);
    gEngine.Textures.unloadTexture(this.kWater);
    gEngine.Textures.unloadTexture(this.kStraw);
    gEngine.Textures.unloadTexture(this.kGrape);
    // starts the next level
//    var nextLevel = new BlueLevel();  // next level to be loaded
//    gEngine.Core.startScene(nextLevel);
};

Fruits.prototype.produce = function () {
    this.flag++;

    if (this.flag === 600) {
        var randx = 0;
        var randy = 0;
        var rand = 0;
        var fruitName = "";


        randx = Math.random();
        randy = Math.random();
        rand = Math.random();
        if (rand > 0.95) {
            this.fruit = new TextureRenderable(this.kStraw);
            fruitName = "Straw";
        } else if (rand > 0.7) {
            this.fruit = new TextureRenderable(this.kWater);
            fruitName = "Water";
        } else if (rand > 0.3) {
            this.fruit = new TextureRenderable(this.kPeach);
            fruitName = "Peach";
        } else {
            this.fruit = new TextureRenderable(this.kGrape);
            fruitName = "Grape";
        }
        while (this.signal == 0) {
            this.signal = 1;
//        console.log(this.mSnake1.mNewSnake.length);
            for (var j = 0; this.mSnake1.mNewSnake[j] !== null && this.mSnake1.mNewSnake[j] !== undefined; j++) {
                if (Math.abs(this.mSnake1.mNewSnake[j].getXform().getXPos() - (randx * 100 * 2 - 50 * 2)) < 7 &&
                        Math.abs(this.mSnake1.mNewSnake[j].getXform().getYPos() - (randy * 54 * 2 - 27 * 2)) < 7) {
                    console.log(this.signal);
                    this.signal = 0;
                    break;
                }

            }
            for (var j = 0; this.mSnake2.mNewSnake[j] !== null && this.mSnake2.mNewSnake[j] !== undefined; j++) {
                if (Math.abs(this.mSnake2.mNewSnake[j].getXform().getXPos() - (randx * 100 * 2 - 50 * 2)) < 7 &&
                        Math.abs(this.mSnake2.mNewSnake[j].getXform().getYPos() - (randy * 54 * 2 - 27 * 2)) < 7) {
                    this.signal = 0;
                    break;
                }

            }

        }




        this.fruit.setColor([1, 1, 1, 0.2]);
        this.fruit.getXform().setSize(5, 5);
        this.fruit.getXform().setPosition(randx * 100 * 2 - 50 * 2, randy * 54 * 2 - 27 * 2);
        this.resource[this.flag2] = [randx * 100 * 2 - 50 * 2, randy * 54 * 2 - 27 * 2];
//        console.log("produce执行",randx*100*2 - 50*2,randy*54*2 - 27*2);
        this.fruitMap.push([this.fruit, fruitName]);
        this.flag2++;
        this.flag = 0;


    }


};

Fruits.prototype.initialize = function (mSnake1, mSnake2) {
    this.fruit = new TextureRenderable(this.kPeach);
    this.fruit.setColor([1, 1, 1, 0.2]);
    this.fruit.getXform().setSize(5, 5);
    this.fruit.getXform().setXPos(0);//randx*100*2 - 50*2
    this.fruit.getXform().setYPos(0);//randy*54*2 - 27*2

    this.fruitMap.push([this.fruit, "Peach"]);
    this.resource[this.flag2] = [0, 0];
    this.flag2++;

    this.mSnake1 = mSnake1;
    this.mSnake2 = mSnake2;


};

Fruits.prototype.draw = function (VPMatrix) {
    for (i = 0; i < this.fruitMap.length; i++) {
        if (this.eaten.indexOf(i) === -1) {
            this.fruitMap[i][0].draw(VPMatrix);
        }


    }
    //初始化name
    this.name = [null, null];
};

Fruits.prototype.change = function (x, y, width, id) { //当蛇吃到之后设置内容为0,当前蛇头坐标和蛇头的宽度
    //设置0，并完成累加
//    console.log(x,y,width);
    var bl = x - width / 2;
    var br = x + width / 2;
    var t = y + width / 2;
    var b = y - width / 2;

//    console.log(bl,br,t,b);
//    console.log(this.resource[0][0],this.resource[0][1]);
    for (var i = 0; i < this.resource.length; i++) {
//        console.log(this.energyMap[i].getXform().getXPos(),this.energyMap[i].getXform().getYPos());
        if (this.resource[i][0] > bl && this.resource[i][0] < br
                && this.resource[i][1] > b && this.resource[i][1] < t && this.fruitMap[i][0] !== null
                && this.eaten.indexOf(i) === -1) {
//            console.log(this.resource[i][0],this.resource[i][1]);
            this.fruitMap[i][0] = null;
            this.name[id - 1] = this.fruitMap[i][1];
            this.resource[i] = [-100, -100];

            this.sum[id] = 0;
            if (id === 1) {

                this.sum[id]++;
                this.sumtotal[id]++;

            } else {
                this.sum[id]++;
                this.sumtotal[id]++;

            }

            this.eaten.push(i);
        }
    }



};


Fruits.prototype.getName = function () {
    return this.name;
};

Fruits.prototype.getSumTotal = function () {
    return this.sumtotal;
};

Fruits.prototype.setSum = function () {

    for (var i = 0; i < 3; i++) {
        this.sum[i] = 0;
    }

};