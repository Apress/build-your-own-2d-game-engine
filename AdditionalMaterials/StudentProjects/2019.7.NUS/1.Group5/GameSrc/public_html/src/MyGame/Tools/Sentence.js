/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global GameObject, gEngine */

function Sentence(t,tt,ttt) {
//    this.mString1 = "Press Left/Right to move and Space to jump.";
//    this.mString2 = "Press Space in the air to achieve double jump";
//    this.mString3 = "Press Space longer to jump higher";
//    this.mStringx = "If you feel it's too hard, click O+P to enable trible jump. Be careful, you will PAY for that. "
//    this.mString4 = "Click C to shoot at the crushable wall";
//    this.mIcon = new Platform(t, -560, 262, 20, 20);

    this.mSentence1 = new SpriteObj(t, -320, -195, 400, 17, [0, 400, 111, 128]);
    this.mSentence2 = new SpriteObj(t, -320, -170, 400, 17, [0, 400, 94, 111]);
    this.mSentence3 = new SpriteObj(t, 260, -50, 400, 17, [0, 400, 77, 94]);
    this.mSentencex = new SpriteObj(t, 258, -3, 400, 63, [0, 400, 0, 63]);
    this.mSentence4 = new SpriteObj(t, 160, 290, 400, 13, [0, 400, 64, 77]);
    this.mSentence5 = new SpriteObj(ttt, -250, 250, 400, 17, [0, 400, 47, 64]);
    
    this.mIcon1 = new SpriteObj(tt,-540, -195, 20, 20, [184, 229, 193, 241]);
    this.mIcon2 = new SpriteObj(tt,-540, -170, 20, 20, [184, 229, 193, 241]);
    this.mIcon3 = new SpriteObj(tt,40, -50, 20, 20, [184, 229, 193, 241]);
    this.mIconx = new SpriteObj(tt,40, -3, 20, 20, [184, 229, 193, 241]);
    this.mIcon4 = new SpriteObj(tt,-60, 290, 20, 20, [184, 229, 193, 241]);
    this.mIcon5 = new SpriteObj(tt,-470, 250, 20, 20, [184, 229, 193, 241]);

    
    this.mIcon2.setVisibility(false);
    this.mIcon3.setVisibility(false);
    this.mIconx.setVisibility(false);
    this.mIcon4.setVisibility(false);
    this.mIcon5.setVisibility(false);
    
    this.mSentence2.setVisibility(false);
    this.mSentence3.setVisibility(false);
    this.mSentencex.setVisibility(false);
    this.mSentence4.setVisibility(false);
    this.mSentence5.setVisibility(false);
}
gEngine.Core.inheritPrototype(Sentence, GameObject);

Sentence.prototype.positionDetect1 = function (x, y) {
    if (x >= -430 && x <= -83 && y >= -290 && y <= -130) {
        this.mSentence2.setVisibility(true);
        this.mIcon2.setVisibility(true);

    }
};
Sentence.prototype.positionDetect2 = function (x, y) {
    if (x >= 119.5 && x <= 472.5 && y >= -150 && y <= 140) {
        this.mSentence3.setVisibility(true);
        this.mSentencex.setVisibility(true);
        this.mIcon3.setVisibility(true);
        this.mIconx.setVisibility(true);
    }
};
Sentence.prototype.positionDetect3 = function (x, y) {
    if (x >= -600 && x <= 120 && y >= 160 && y <= 280) {
        this.mSentence4.setVisibility(true);
        this.mIcon4.setVisibility(true);
    }
};
Sentence.prototype.positionDetect4 = function (x, y) {
    if (x >= -600 && x <= -420 && y >= 180 && y <= 320) {
        this.mSentence5.setVisibility(true);
        this.mIcon5.setVisibility(true);
    }
};
Sentence.prototype.draw = function (aCamera) {
    //console.log(this.mSentence.getText());
    this.mSentence1.draw(aCamera);
    this.mSentence2.draw(aCamera);
    this.mSentence3.draw(aCamera);
    this.mSentencex.draw(aCamera);
    this.mSentence4.draw(aCamera);
    this.mSentence5.draw(aCamera);
    
    this.mIcon1.draw(aCamera);
    this.mIcon2.draw(aCamera);
    this.mIcon3.draw(aCamera);
    this.mIconx.draw(aCamera);
    this.mIcon4.draw(aCamera);
    this.mIcon5.draw(aCamera);
};

Sentence.prototype.update = function (hform) {
    var x = hform.getXPos();
    var y = hform.getYPos();

    this.positionDetect1(x, y);
    this.positionDetect2(x, y);
    this.positionDetect3(x, y);
    this.positionDetect4(x, y);

    if (gEngine.Mine.saveStatus.finishFirst) {
        this.mSentence2.setVisibility(true);
        this.mSentence3.setVisibility(true);
        this.mSentencex.setVisibility(true);
        this.mSentence4.setVisibility(true);
        this.mSentence5.setVisibility(true);
        
        this.mIcon2.setVisibility(true);
        this.mIcon3.setVisibility(true);
        this.mIconx.setVisibility(true);
        this.mIcon4.setVisibility(true);
        this.mIcon5.setVisibility(true);
    }
};
