/*
* GameOver.js
* Game over, start again
* 2018.7.24
*
*/

"use strict";



// Ending_0:  战死
// Ending_1:  饿死
// Ending_2:  被士兵抓走
// Ending_3:  没有戒指，见到公主，被抓
// Ending_4:  公主无阴谋，打败国王
// Ending_5:  被国王杀死
// Ending_6:  被公主杀死
// Ending_7:  没有公主，打败国王
// Ending_8:  打败公爵，有解药
// Ending_9:  打败公爵，没有解药
// Ending_10: 被公爵杀死
// Ending_11: 打败公主
// Ending_12: 放弃游戏

function GameOver() {
   // console.log();
    this.bgBackground = "";
    this.id = 3;
    this.mBackground = null;
    this.mCamera = null;
    this.mText = null;
    this.mHint = null;
    
    this.EndingTexture = ["assets/Endings/Ending_0.png","assets/Endings/Ending_1.png","assets/Endings/Ending_2.png",
                          "assets/Endings/Ending_3.png","assets/Endings/Ending_4.png","assets/Endings/Ending_5.png",
                          "assets/Endings/Ending_6.png","assets/Endings/Ending_7.png","assets/Endings/Ending_8.png",
                          "assets/Endings/Ending_9.png","assets/Endings/Ending_10.png","assets/Endings/Ending_11.png",
                          "assets/Endings/Ending_12.png"];
    this.Ending = null;
    
    
    this.BGM = ["assets/Endings/Kan R. Gao - Too Bad So Sad.mp3","assets/Endings/Kan R. Gao - Too Bad So Sad.mp3",
                "assets/Endings/Kan R. Gao - Too Bad So Sad.mp3","assets/Endings/Kan R. Gao - Too Bad So Sad.mp3",
                "assets/Endings/HappyUkulele.mp3","assets/Endings/Kan R. Gao - Too Bad So Sad.mp3",
                "assets/Endings/Kan R. Gao - Too Bad So Sad.mp3","assets/Endings/HappyUkulele.mp3",
                "assets/Endings/HappyUkulele.mp3","assets/Endings/HappyUkulele.mp3",
                "assets/Endings/Kan R. Gao - Too Bad So Sad.mp3","assets/Endings/HappyUkulele.mp3",
                "assets/Endings/Kan R. Gao - Too Bad So Sad.mp3"
                ];
}

gEngine.Core.inheritPrototype(GameOver, Scene);

GameOver.prototype.loadScene = function () {
    //暂时没有图片
    //gEngine.Textures.loadTexture(this.bgBackground);
    gEngine.Textures.loadTexture(this.EndingTexture[this.id]);
    gEngine.AudioClips.loadAudio(this.BGM[this.id]);

}
GameOver.prototype.setId = function(Id){
    this.id = Id
}
GameOver.prototype.unloadScene = function () {

    gEngine.Textures.unloadTexture(this.EndingTexture[this.id]);
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.BGM[this.id]);
    //save the endings
    var endings = gEngine.ResourceMap.retrieveAsset("endings");
    endings[this.id].flag = true;
    console.log(endings);
    gEngine.ResourceMap.asyncLoadRequested("endings");
    gEngine.ResourceMap.asyncLoadCompleted("endings",endings);
    //back to menu
    var mygame = new MyMenu();
    gEngine.Core.startScene(mygame);
}

GameOver.prototype.initialize = function () {
    this.mCamera = new Camera(
        vec2.fromValues(650, 300), // position of the camera
        1300,                     // width of camera
        [0, 0, 1300, 600],         // viewport (orgX, orgY, width, height)
        0
    );
    this.mCamera.setBackgroundColor([1, 1, 1, 1.0]);
    gEngine.AudioClips.playBackgroundAudio(this.BGM[this.id]);
    
    this.Ending = new TextureRenderable(this.EndingTexture[this.id]);
    this.Ending.getXform().setSize(1300, 600);
    this.Ending.setColor([0, 0, 0, 0]);
    this.Ending.getXform().setPosition(650, 300);
    
  /*  this.mBackground = new Renderable();
    this.mBackground.getXform().setSize(100, 75);
    this.mBackground.setColor([0, 0, 0, 1]);
    this.mBackground.getXform().setPosition(50, 40);

    this.mText = new FontRenderable("Press SPACE to restart");
    this.mText.setColor([1, 1, 1, 1]);
    this.mText.getXform().setPosition(20, 30);
    this.mText.setTextHeight(5);*/

    this.mHint = new FontRenderable("[press SPACE to restart]");
    this.mHint.setColor([0, 0, 0, 1]);
    this.mHint.getXform().setPosition(850, 70);
    this.mHint.setTextHeight(30);

}

GameOver.prototype.draw = function () {
    gEngine.Core.clearCanvas([1, 1, 1, 1.0]);

    this.mCamera.setupViewProjection();
    this.Ending.draw(this.mCamera);
  /*  this.mBackground.draw(this.mCamera);
    this.mText.draw(this.mCamera);*/
    this.mHint.draw(this.mCamera);
}

GameOver.prototype.update = function () {
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        gEngine.GameLoop.stop();
    }
}