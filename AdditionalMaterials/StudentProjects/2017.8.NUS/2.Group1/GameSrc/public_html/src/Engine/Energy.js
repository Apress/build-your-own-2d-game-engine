/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global gEngine, TextureRenderable */

function Energy() {
    this.energyMap = new Array();//先声明一维
    this.kPink = "assets/snake1body.png";
    this.kBlack = "assets/black.png";
    this.kOrange = "assets/orange.png";
    this.kGreen = "assets/green.png";
//    this.kEaten = "assets/minion_collector.png";
    this.flag = 0;
    this.eaten = new Array();
    this.resource = new Array();
    this.sumTotal = new Array();
    this.eaten[0] = -1;
    this.signal = 0;

    //10条蛇
    this.sum = new Array();
    for (var i = 0; i < 10; i++) {
        this.sum[i] = 0;
    }
    this.sumTotal = new Array();
    for (var i = 0; i < 3; i++) {
        this.sumTotal[i] = 0;
    }

}

gEngine.Core.inheritPrototype(Energy, TextureRenderable);


Energy.prototype.loadScene = function () {
    // Game loop not running, unload all assets

    gEngine.Textures.loadTexture(this.kPink);
    gEngine.Textures.loadTexture(this.kBlack);
    gEngine.Textures.loadTexture(this.kOrange);
    gEngine.Textures.loadTexture(this.kGreen);
//    gEngine.Textures.loadTexture(this.kEaten);

    // starts the next level
//    var nextLevel = new BlueLevel();  // next level to be loaded
//    gEngine.Core.startScene(nextLevel);
};

Energy.prototype.unloadScene = function () {
    // Game loop not running, unload all assets

    gEngine.Textures.unloadTexture(this.kPink);
    gEngine.Textures.loadTexture(this.kBlack);
    gEngine.Textures.loadTexture(this.kOrange);
    gEngine.Textures.loadTexture(this.kGreen);
//    gEngine.Textures.unloadTexture(this.kEaten);

    // starts the next level
//    var nextLevel = new BlueLevel();  // next level to be loaded
//    gEngine.Core.startScene(nextLevel);
};

//生成随机数的函数
var randomSet = function () {

    var randx = 0;
    var randy = 0;
    var rand = 0;
    for (var i = 0; i < 50; i++) {

        randx = Math.random();
        randy = Math.random();


        rand = Math.random();
//                console.log(randx,randy);
        if (rand > 0.7) {
            this.energyMap[i] = new TextureRenderable(this.kPink);
        } else if (rand > 0.4) {
            this.energyMap[i] = new TextureRenderable(this.kOrange);
        } else if (rand > 03) {
            this.energyMap[i] = new TextureRenderable(this.kBlack);
        } else
            this.energyMap[i] = new TextureRenderable(this.kGreen);
        this.energyMap[i].setColor([1, 1, 1, 0.2]);
        this.energyMap[i].getXform().setSize(2, 2);
        for (var j = 0; j < 5; j++) {
            if (Math.abs(this.mSnake1.mNewSnake[j].getXform().getXPos() - (randx * 100 * 2 - 50 * 2)) < 7 &&
                    Math.abs(this.mSnake1.mNewSnake[j].getXform().getYPos() - (randy * 54 * 2 - 27 * 2)) < 7) {
                //console.log("与1太近");
                this.signal = 1;
                break;
            }

        }
        for (var j = 0; j < 5; j++) {
            if (Math.abs(this.mSnake2.mNewSnake[j].getXform().getXPos() - (randx * 100 * 2 - 50 * 2)) < 7 &&
                    Math.abs(this.mSnake2.mNewSnake[j].getXform().getYPos() - (randy * 54 * 2 - 27 * 2)) < 7) {
                //console.log("与2太近");
                this.signal = 1;
                break;
            }

        }
        if (this.signal === 1) {
            //console.log("failed");
            this.signal = 0;
            i--;
            continue;
        }

        this.energyMap[i].getXform().setXPos(randx * 100 * 2 - 50 * 2);
        this.energyMap[i].getXform().setYPos(randy * 54 * 2 - 27 * 2);
        this.resource[i] = [randx * 100 * 2 - 50 * 2, randy * 54 * 2 - 27 * 2];
    }

};
//生成随机数的函数
var randomUpdate = function () {
    var flag = 0;
    var rand = 0;
    var randx = 0;
    var randy = 0;
    for (var i = 0; i < this.eaten.length; i++) {
//            console.log( this.eaten[0]);

        flag = this.eaten[i];
        randx = Math.random();
        randy = Math.random();
        rand = Math.random();
        if (rand > 0.7) {
            this.energyMap[flag] = new TextureRenderable(this.kPink);
        } else if (rand > 0.4) {
            this.energyMap[flag] = new TextureRenderable(this.kOrange);
        } else if (rand > 0.3) {
            this.energyMap[flag] = new TextureRenderable(this.kBlack);
        } else
            this.energyMap[flag] = new TextureRenderable(this.kGreen);
        for (var j = 0; this.mSnake1.mNewSnake[j] !== null && this.mSnake1.mNewSnake[j] !== undefined; j++) {
            if (Math.abs(this.mSnake1.mNewSnake[j].getXform().getXPos() - (randx * 100 * 2 - 50 * 2)) < 7 &&
                    Math.abs(this.mSnake1.mNewSnake[j].getXform().getYPos() - (randy * 54 * 2 - 27 * 2)) < 7) {
                this.signal = 1;
                break;
            }

        }
        for (var j = 0; this.mSnake2.mNewSnake[j] !== null && this.mSnake2.mNewSnake[j] !== undefined; j++) {
            if (Math.abs(this.mSnake2.mNewSnake[j].getXform().getXPos() - (randx * 100 * 2 - 50 * 2)) < 7 &&
                    Math.abs(this.mSnake2.mNewSnake[j].getXform().getYPos() - (randy * 54 * 2 - 27 * 2)) < 7) {
                this.signal = 1;
                break;
            }

        }
        if (this.signal === 1) {
            this.signal = 0;
            i--;
            continue;
        }

        this.energyMap[flag].setColor([1, 0, 0, 0.2]);  // tints red
        this.energyMap[flag].getXform().setSize(2, 2);
        this.energyMap[flag].getXform().setXPos(randx * 100 * 2 - 50 * 2);
        this.energyMap[flag].getXform().setYPos(randy * 54 * 2 - 27 * 2);
        this.resource[flag] = [randx * 100 * 2 - 50 * 2, randy * 54 * 2 - 27 * 2];
    }
    this.eaten = new Array();
    this.eaten[0] = -1;


};

Energy.prototype.initialize = function (mSnake1, mSnake2) {//probability(0,1)越大，出现能量的概率越小
//    for (var k = 0; k < 100; k++) {   //声明二维,100个坐标x,y
//        this.energyMap[k] = new Array();  
//        for (var j = 0; j < 2; j++) {   
//            this.energyMap[k][j] = 0;
//        }
//    }
    this.mSnake1 = mSnake1;
    this.mSnake2 = mSnake2;


    randomSet.call(this);
//    console.log(this.energyMap);
};

Energy.prototype.draw = function (VPMatrix) {
    // Step A: clear the canvas

    // Step  B: Activate the drawing Camera

    // Step  C: Draw everything
    for (i = 0; i < this.energyMap.length; i++) {
        if (this.eaten.indexOf(i) === -1)
            this.energyMap[i].draw(VPMatrix);
    }


};



Energy.prototype.getEnergyMap = function () {
    return this.energyMap;
};//一维数组存Texture对象

Energy.prototype.change = function (x, y, width, id) { //当蛇吃到之后设置内容为0,当前蛇头坐标和蛇头的宽度
    //设置0，并完成累加
//    console.log(x,y,width);
    var bl = x - width / 2;
    var br = x + width / 2;
    var t = y + width / 2;
    var b = y - width / 2;

//    console.log(bl,br,t,b);

    for (var i = 0; i < this.resource.length; i++) {
//        console.log(this.energyMap[i].getXform().getXPos(),this.energyMap[i].getXform().getYPos());
        if (this.resource[i][0] > bl && this.resource[i][0] < br
                && this.resource[i][1] > b && this.resource[i][1] < t && this.energyMap[i] !== null
                && this.eaten.indexOf(i) === -1) {
//            console.log(this.resource[i][0],this.resource[i][1]);
            this.energyMap[i] = null;
            this.resource[i] = [-100, -100];


            this.sum[id] = 0;
            if (id === 1) {

                this.sum[id]++;
                this.sumTotal[id]++;
            } else {
                this.sum[id]++;
                this.sumTotal[id]++;
            }

            this.eaten.push(i);
        }
    }



};

Energy.prototype.getSum = function () {
    return this.sum;
};
Energy.prototype.getSum = function () {
    return this.sum;
};

Energy.prototype.setSum = function () {

    for (var i = 0; i < 10; i++) {
        this.sum[i] = 0;
    }
};


Energy.prototype.produce = function () { //一段时间之后资源再次出现
    this.flag++;
    if (this.flag === 120) {
        randomUpdate.call(this);
        this.flag = 0;
    }
};

Energy.prototype.getSumTotal = function () {
    return this.sumTotal;
};

