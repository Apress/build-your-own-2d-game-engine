/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function EventTown(num) {
    var AllEventTypeTown = [0,0,1,0,0,0,0,0,0,0,0]; // 11 pics
    var AllEventSize_xTown = [200, 230, 350, 250, 200, 340, 200,200,200,200,200];
    var AllEventSize_yTown = [200, 150, 700, 250, 300, 350,200,350,350,200,200];
    var AllEventSpriteSequenceTown = [{},
        {},
        {"topPixel":256, "leftPixel":55, "elmWidthInPixel":152, "elmHeightInPixel":256, "numElements":13, "wPaddingInPixel":0},{},{},{},{},
        {},
        {}
    ];
    var AllEventSpeedTown = [0,0,7,0,0,0,15,0,0,0,0];

    var AllEventMove_xTown = [0,0,0,0,0,0,0,0,0,0,0];
    var AllEventMove_yTown = [-30,-25,-10,20,0,50,-15,10,-15,-15,-15];

    var AllEventIconTown = ["assets/dog2.png",
        "assets/wolf.png",
        "assets/Knight_New.png",
        "assets/appletree.png",
        "assets/fountain.png",
        "assets/house.png",
        "assets/assassin.png",
        "assets/villager.png",
        "assets/villager.png",
        "assets/businessman.png",
        "assets/beggar.png"
    ];
    var AllEventInfTown = ["This is a god damn dog!",
        "This is a fierce wolf",
        "This is a guard in the forest!",
        "I see an apple tree.",
        "This is a fountain.",
        "This is a house with no man in it.",
        "Assassin: I was ordered to kill you today",
        "Villager: I think you are the prince!",
        "Villager: Life is getting harder",
        "Do you have anything to trade?",
        "Beggar: Can you give me some coins?"
    ];

    var AllEnemyIdTown=[
        // dog
        4,
        // wolf
        5,
        // knignt
        2,
        // assassin
        -1,-1,-1,6
    ];

// possible results
    var AllResultTown=[
        // dog 0 1
        new Result("Fight result: ", 0, 0, 0, 0, 0, 0, 0,0, 0, 1, 2, 0, 0, 1),
        new Result("Escape successfully. ", 0, 0, -10, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0.7),

        // wolf 2 3
        new Result("Fight result: ", 0, 0, 0, 0, 0, 0,0,0, 0, 1, 2, 0, 0, 1),
        new Result("Escape successfully. ", 0, 0, -10, 0, 0, 0,0,0, 0, 0, 0, 0, 0, 0.7),

        // knignt 4 5
        new Result("Fight result: ", 0, 0, 0, 0, 0, 0,0,0, 0, 0, 0, 0, 0, 1),
        new Result("Escape successfully. ", 0, 0, -10, 0, 0,0,0, 0, 0, 0, 0, 0, 0, 0.7),

        // appletree 6 7 8 9 10
        new Result("Get apple *1",0,0,0,0,0,0,0,0,0,0,1,0,0,0.8),
        new Result("Get nothing",0,0,0,0,0,0,0,0,0,-1,-1,0,0,0.2),
        new Result("Get herb *1",0,0,0,0,0,0,0,0,0,3,1,0,0,0.2),
        new Result("Get timber *1",0,0,0,0,0,0,0,0,0,4,1,0,0,0.8),
        new Result("Get nothing", 0, 0, 0, 0, 0,0,0, 0, 0, 0, 0, 0, 0, 1),

        // pond 11 12 13 14
        new Result("Hunger +10",0,0,+10,0,0,0,0,0,0,-1,-1,0,0,1),
        new Result("Get fish *1", 0,0,0,0,0,0,0,0,0,2,1,0,0,0.8),
        new Result("Get a key...", 0,0,0,0,0,0,0,0,0,12,1,0,0,0.2),
        new Result("Get nothing", 0, 0, 0, 0, 0,0,0, 0, 0, 0, 0, 0, 0, 1),

        // treasure  case 15 16 17
        new Result("Money(Apple) *1",0,0,0,0,0,0,0,0,0,0,1,0,0,0.4),
        new Result("Money(Apple) *2", 0,0,0,0,0,0,0,0,0,0,2,0,0,0.6),
        new Result("Get nothing", 0, 0, 0, 0, 0, 0,0,0, 0, 0, 0, 0, 0, 1),

        // house 18 19 20 21
        new Result("Money *10", 0,0,0,0,0,0,10,0,0,0,0,0,0,0.3),
        new Result("Get timber *2", 0,0,0,0,0,0,0,0,0,4,2,0,0,0.3),
        new Result("Get herb *2", 0,0,0,0,0,0,0,0,0,3,2,0,0,0.4),
        new Result("Get nothing", 0, 0, 0, 0, 0, 0,0,0, 0, 0, 0, 0, 0, 1),

        // assassin 22 23 24 25
        new Result("Get a piece of paper from his corpse.", 0,0,0,0,0,0,0,0,0,14,1,0,0,1),
        new Result("Defeated, you lose 30HP", -30,0,0,0,0,0,0,0,0,0,0,0,0,0.5),
        new Result("Knock him down, get meat *2", 0,0,0,0,0,0,0,0,0,1,2,0,0,0.5),
        new Result("You leave.", 0,0,0,0,0,0,0,0,0,0,0,0,0,1),


        // villager 26 27 28 29 30
        new Result("The princess moved to a secret castle. If you have the ring, then go and find her.", 0,0,0,0,0,0,0,1,0,0,0,0,0,1),
        new Result("Get herb *1", 0,0,0,0,0,0,0,0,0,0,3,0,0,0.6),
        new Result("The villager doesn't give you anything.", 0,0,0,0,0,0,0,0,0,0,0,0,0,0.4),
        new Result("You knock him down, lose 10HP.", -10,0,0,0,0,0,0,0,0,0,0,0,0,1),
        new Result("I hear that the princess is preparing for a war against our country",0,0,0,0,0,0,0,0,1,0,0,0,0,1),

        // businessman 31 32 33 34
        new Result("-60G, get a new axe.", 0,0,0,0,0,0,-60,0,0,5,1,0,0,1),
        new Result("-60G, get a iron shield.",0,0,0,0,0,0,-60,0,0,9,1,0,0,1),
        new Result("You leave.",0,0,0,0,0,0,0,0,0,0,0,0,0,1),
        new Result("Lose timber*2, get small healing potion*1.",0,0,0,0,0,0,0,0,0,15,1,4,2,1),

        // pass last knight 35
        new Result("The town guard thinks you are a hunter, let you in.",0,0,0,0,0,0,0,0,0,0,0,0,0,1),

        // escape fail 36
        new Result("Fail to escape. ",0,0,-10,0,0,0,0,0,0,0,0,0,0,0.3),

        // beggar 37 38
        new Result("Thanks. I give you this mysterious key.",0,0,0,0,0,0,-50,0,0,12,1,0,0,1),
        new Result("You leave.",0,0,0,0,0,0,0,0,0,0,0,0,0,1)

    ];
    AllResultTown[0].escape = false;
    AllResultTown[2].escape = false;
    AllResultTown[4].escape = false;
    AllResultTown[22].escape = false;
    AllResultTown[36].escape = false;

// 4 actions
    var AllEventActTown = [
        // mushroom
        new Action("1. Fight",[AllResultTown[0]]),
        new Action("2. Escape (70% succeed)", [AllResultTown[1], AllResultTown[36]]),
        new Action(),
        new Action(),
        // eagle
        new Action("1. Fight",[AllResultTown[2]]),
        new Action("2. Escape (70% succeed)", [AllResultTown[3], AllResultTown[36]]),
        new Action(),
        new Action(),
        // knight
        new Action("1. Fight",[AllResultTown[4]]),
        new Action("2. Escape (70% succeed)", [AllResultTown[5], AllResultTown[36]]),
        new Action(),
        new Action(),
        // appletree
        new Action("1. Shake it",[AllResultTown[6], AllResultTown[7]]),
        new Action("2. Cut it down", [AllResultTown[8], AllResultTown[9]]),
        new Action("3. Go away", [AllResultTown[10]]),
        new Action(),

        // pond
        new Action("1. Drink water", [AllResultTown[11]]),
        new Action("2. Catch something", [AllResultTown[12], AllResultTown[13]]),
        new Action("3. Go away", [AllResultTown[14]]),
        new Action(),

        // house
        new Action("1. Search it", [AllResultTown[18], AllResultTown[19], AllResultTown[20]]),
        new Action("2. Go away", [AllResultTown[21]]),
        new Action(),
        new Action(),

        // assassin
        new Action("1. Fight with him!", [AllResultTown[22]]),
        new Action(),
        new Action(),
        new Action(),


        // villager1
        new Action("1. Talk to him.", [AllResultTown[26]]),
        new Action("2. Knock him down, or he may call the guards!", [AllResultTown[29]]),
        new Action("3. Beg for something.(60% succeed)",[AllResultTown[27], AllResultTown[28]]),
        new Action(),

        // villager2
        new Action("1. Talk to him.", [AllResultTown[30]]),
        new Action("2. Knock him down, or he may call the guards!", [AllResultTown[29]]),
        new Action("3. Beg for something.(60% succeed)",[AllResultTown[27], AllResultTown[28]]),
        new Action(),


        // businessman
        new Action("1. 60 gold for an axe", [AllResultTown[31]]),
        new Action("2. 60 gold for an iron shield", [AllResultTown[32]]),
        new Action("3. 2*timber for 1*small healing potion.", [AllResultTown[34]]),
        new Action("4. leave",[AllResultTown[33]]),
        

        // beggar
        new Action("1. Give him 50 Gold", [AllResultTown[37]]),
        new Action("2. Get away", [AllResultTown[38]]),
        new Action(),
        new Action()

    ];

    var t = Math.floor(Math.random()*11);
    while((t>=6 && t<=8) || t==10){
        t = Math.floor(Math.random()*11);
    }

    if(num==3){
        // beggar, the key
        t=10;
    }
    else if(num==6){
        //NO.5 is assassin;
        t = 6;
    }
    else if(num==9){
        // NO.7 is villager1
        t = 7;
    }
    else if(num==12){
        //NO.10 is villager2
        t = 8;
        //console.log("there should be vilagger");
    }
    
    //console.log("t="+t);
    this.type = AllEventTypeTown[t];
    this.position = [1000*num+AllEventMove_xTown[t], 200+AllEventMove_yTown[t]];
    this.picture = AllEventIconTown[t];

    //console.log(this.picture);
    this.size_x = AllEventSize_xTown[t];
    this.size_y = AllEventSize_yTown[t];
    this.sequence = AllEventSpriteSequenceTown[t];
    this.speed = AllEventSpeedTown[t];

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



    this.information = AllEventInfTown[t];
    this.action = [];
    this.action.push(AllEventActTown[4*t]);
    //console.log(AllEventActTown[4*t].content);
    this.action.push(AllEventActTown[4*t+1]);
    this.action.push(AllEventActTown[4*t+2]);
    this.action.push(AllEventActTown[4*t+3]);
    this.isBattle = false;
    if(AllEnemyIdTown[t]>-1)
        this.enemy = new Enemy(AllEnemyIdTown[t]);
    else
        this.enemy = null;

}
gEngine.Core.inheritPrototype(EventTown, GameObject);




