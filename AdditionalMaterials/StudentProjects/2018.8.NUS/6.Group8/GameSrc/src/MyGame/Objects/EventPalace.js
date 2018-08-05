/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function EventPalace(num, isPrincessLocation, isPrincessAmbition, isMeetPrincess, hasRing, hasLetter, isFightPrincess){

    var AllEventTypePalace = [0,0,0,1,1,0,0,0,0,0];
    var AllEventSize_xPalace = [150, 200, 250, 350, 350, 200, 200,300,200,500];
    var AllEventSize_yPalace = [150, 300, 250, 700, 700, 200, 200,300,300,300];
    var AllEventSpriteSequencePalace = [{},{},{},
        {"topPixel":256, "leftPixel":55, "elmWidthInPixel":152, "elmHeightInPixel":256, "numElements":13, "wPaddingInPixel":0},
        {"topPixel":256, "leftPixel":55, "elmWidthInPixel":152, "elmHeightInPixel":256, "numElements":13, "wPaddingInPixel":0},
        {},{},{},{},{}
    ];
    var AllEventSpeedPalace = [0,0,0,7,7,0,0,0,0,0];

    var AllEventMove_xPalace = [0,0,0,0,0,0,0,0,0,0];
    var AllEventMove_yPalace = [1000,-25,-10,-10,-10,50,-15,-10,-10,-20];

    var AllEventIconPalace = ["assets/mushroom.png",
        "assets/princess.png",
        "assets/king.png",
        "assets/Knight_New_Yellow.png",
        "assets/Knight_New_Red.png",
        "assets/businessman.png",
        "assets/servant.png",
        "assets/duke.png",
        "assets/princess.png",
        "assets/wizard_1.png"
    ];
    var AllEventInfPalace = ["Would you like to meet with the princess?",
        "You prove that you are the prince by the ring, then you'd like to:",
        "You meet the king",
        "This is a soldier",
        "This is a captain",
        "Merchant: Would you like to buy something",
        "Maid: I have made some good bread. Would you like to taste some?",
        "You meet the duke, he wants to kill you and the king",
        "You decide to catch the princess to stop the war",
        "I have some potions that may be useful to your fight "
    ];

    var AllEnemyIdPalace=[
        -1,-1,7,10,11,-1,-1,8,9,-1
    ];

// possible results
    var AllResultPalace=[
        // common
        new Result("Fight result: ", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
        new Result("Escape successfully. ", 0, 0, -10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.7),
        new Result("Fail to escape. ",0,0,-10,0,0,0,0,0, 0, 0,0,0,0,0.3),
        new Result("Get nothing", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
        new Result("ok", 0, 0, 0, 0, 0, 0, 0,0, 0,  0, 0, 0, 0, 1),

        // businessman 567
        new Result("-120G, get a new spear.", 0,0,0,0,0,0,-120,0,0,6,1,0,0,1),
        new Result("Lose timber*2, get a small healing potion.",0,0,0,0,0,0,0,0,0,15,1,4,2,1),
        new Result("You leave.",0,0,0,0,0,0,0,0,0,0,0,0,0,1),
        
        //8-14
        new Result("The princess don't believe you are the princess, you are arrested", 0, 0, 0, 0, 0, 0, 0,0, 0,  0, 0, 0, 0, 1),
        new Result("You defeat the king", 0, 0, 0, 0, 0, 0, 0,0, 0,  0, 0, 0, 0, 1),
        new Result("The king give in and give you the crown", 0, 0, 0, 0, 0, 0, 0,0, 0,  0, 0, 0, 0, 1),
        new Result("You pointed out that the princess egged the duke to frame you to make chaos and attack your country", 0, 0, 0, 0, 0, 0, 0,0, 0,  0, 0, 0, 0, 1),
        new Result("You defeat the duke and save the king", 0, 0, 0, 0, 0, 0, 0,0, 0,  0, 0, 0, 0, 1),
        new Result("You defeat the duke but the king died", 0, 0, 0, 0, 0, 0, 0,0, 0,  0, 0, 0, 0, 1),
        new Result("ok", 0, 0, 0, 0, 0, 0, 0,0, 0,  0, 0, 0, 0, 1),
        
        //15-17
        new Result("-50G, get a small healing potion.", 0,0,0,0,0,0,-50,0,0,15,1,0,0,1),
        new Result("-100G, get an antidote potion.",0,0,0,0,0,0,-100,0,0,20,1,0,0,1),
        new Result("You leave.",0,0,0,0,0,0,0,0,0,0,0,0,0,1),
        //18
        new Result("-50G, Get bread*1.", 0,0,0,0,0,0,-50,0,0,19,1,0,0,1),
    ];
    AllResultPalace[0].escape = false;
    AllResultPalace[2].escape = false;

    // 4 actions
    var AllEventActPalace = [
        // meet princess
        new Action("1. Yes",[AllResultPalace[4]]),
        new Action("2. No", [AllResultPalace[3]]),
        new Action(),
        new Action(),
        // princess
        new Action("1. Ask for her help",[AllResultPalace[4]]),
        new Action(),
        //new Action("2. Reveal her plot", [AllResultPalace[3]]),
        new Action(),
        new Action(),
        // king
        new Action("1. Fight with him",[AllResultPalace[0]]),
        new Action(),
        new Action(),
        //new Action("3. Force him to give your crown by the country's power of princess", [AllResultPalace[3]]), 
        new Action(),
        // soldier
        new Action("1. Fight",[AllResultPalace[0]]),
        new Action("2. Escape (-10 Hunger, 70% succeed)", [AllResultPalace[1], AllResultPalace[2]]),
        new Action(),
        new Action(),

        // captain
        new Action("1. Fight",[AllResultPalace[0]]),
        new Action("2. Escape (-10 Hunger, 70% succeed)", [AllResultPalace[1], AllResultPalace[2]]),
        new Action(),
        new Action(),

        // merchant
        new Action("1. 80 gold for a spear", [AllResultPalace[5]]),
        new Action("2. timber*2 for a herb", [AllResultPalace[6]]),
        new Action("3. leave",[AllResultPalace[7]]),
        new Action(),

        // servant
        new Action("1. Yes (-50G)", [AllResultPalace[18]]),
        new Action("2. No, thanks", [AllResultPalace[7]]),
        new Action(),
        new Action(),
        
        // duke
        new Action("1. Fight",[AllResultPalace[0]]),
        new Action(),
        new Action(),
        new Action(),
        
        // fight princess
        new Action("1. Fight",[AllResultPalace[0]]),
        new Action(),
        new Action(),
        new Action(),
        
        //wizard
        new Action("1. 50 gold for an small healing potion", [AllResultPalace[15]]),
        new Action("2. 100 gold for a antidote potion", [AllResultPalace[16]]),
        new Action("3. No, thanks",[AllResultPalace[17]]),
        new Action(),
    ];
    AllResultPalace[4].isMeetPrincess = true;
    AllResultPalace[11].isFightPrincess = true;
    if(isMeetPrincess&&isPrincessAmbition){
        AllEventActPalace[5] = new Action("2. Reveal her plot", [AllResultPalace[11]]);
    }
    if(isMeetPrincess){
        AllEventActPalace[9] = new Action("2. Force him to abdicate by help of princess", [AllResultPalace[10]]);
    }
    if(isMeetPrincess&&!hasRing){
       AllEventActPalace[4] = new Action("1. Ask for her help",[AllResultPalace[8]]);
    }
    AllResultPalace[8].ending = 3;
    AllResultPalace[10].ending = 4; 
    
    var t = Math.floor(Math.random()*2)+3;
    if(num==1&&isPrincessLocation)
        t=0;
    if(num==4)
        t=6;
    if(num==6)
        t=5;
    if(num==9&&isMeetPrincess)
        t=1;
    if(num==10)
        t = 9; //potion
    if(num==11){
        if(hasLetter && !isMeetPrincess)
            t = 7;  //boss is duke
        else if(isFightPrincess)
            t=8;    //boss is princess
        else
            t=2;  //boss is king
    }
    //t=9;
    this.type = AllEventTypePalace[t];
    this.position = [1000*num+AllEventMove_xPalace[t], 200+AllEventMove_yPalace[t]];
    this.picture = AllEventIconPalace[t];

    this.size_x = AllEventSize_xPalace[t];
    this.size_y = AllEventSize_yPalace[t];
    this.sequence = AllEventSpriteSequencePalace[t];
    this.speed = AllEventSpeedPalace[t];

    this.icon = null;
    if(this.type==1){
        // animation texture
        this.icon = new SpriteAnimateRenderable(this.picture);
        this.icon.setColor([1, 1, 1, 0]);
        this.icon.getXform().setPosition(this.position[0], this.position[1]);
        this.icon.getXform().setSize(this.size_x, this.size_y);
        this.icon.setSpriteSequence(this.sequence.topPixel, this.sequence.leftPixel, this.sequence.elmWidthInPixel, this.sequence.elmHeightInPixel, this.sequence.numElements, this.sequence.wPaddingInPixel);
        this.icon.setAnimationSpeed(this.speed);
    }
    else{
        // static texture
        this.icon = new TextureRenderable(this.picture);
        this.icon.setColor([0,0,0,0]);
        this.icon.getXform().setSize(this.size_x,this.size_y);
        this.icon.getXform().setPosition(this.position[0],this.position[1]);
    }

    this.information = AllEventInfPalace[t];
    this.action = [];
    this.action.push(AllEventActPalace[4*t]);
    console.log(AllEventActPalace[4*t].content);
    this.action.push(AllEventActPalace[4*t+1]);
    this.action.push(AllEventActPalace[4*t+2]);
    this.action.push(AllEventActPalace[4*t+3]);
    this.isBattle = false;
    if(AllEnemyIdPalace[t]>-1)
        this.enemy = new Enemy(AllEnemyIdPalace[t]);
    else
        this.enemy = null;
}
gEngine.Core.inheritPrototype(EventPalace, GameObject);
