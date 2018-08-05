/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

var AllEnemy = [{Id:0, msg:"", mHealth:"30", atk:15, def:0, numItem:1, dropItemId:0, money:20},//mushroom
    {Id:1, msg:"", mHealth:"40", atk:15, def:0, numItem:1, dropItemId:1, money:30},//eagle
    {Id:2, msg:"", mHealth:"50", atk:18, def:2, numItem:2, dropItemId:3, money:30},//knight
    {Id:3, msg:"", mHealth:"50", atk:15, def:0, numItem:0, dropItemId:0, money:10},
    {Id:4, msg:"", mHealth:"50", atk:18, def:2, numItem:1, dropItemId:1, money:30}, //dog
    {Id:5, msg:"", mHealth:"50", atk:19, def:0, numItem:1, dropItemId:1, money:30},// wolf
    {Id:6, msg:"", mHealth:"60", atk:23, def:0, numItem:1, dropItemId:15, money:40}, // assassin
    {Id:7, msg:"", mHealth:"100", atk:25, def:5, numItem:0, dropItemId:0, money:0}, // king
    {Id:8, msg:"", mHealth:"100", atk:27, def:5, numItem:0, dropItemId:0, money:0}, // duke
    {Id:9, msg:"", mHealth:"80", atk:25, def:7, numItem:0, dropItemId:0, money:0}, // princess
    {Id:10, msg:"", mHealth:"60", atk:21, def:3, numItem:1, dropItemId:3, money:40}, // soldier
    {Id:11, msg:"", mHealth:"70", atk:22, def:5, numItem:2, dropItemId:3, money:40}, // captain
    ]

function Enemy(id) {
   
    this.Id = AllEnemy[id].Id;
    this.msg = AllEnemy[id].msg;   //the description of enemy
    
    // attribute
    this.mHealth = AllEnemy[id].mHealth;    
    this.atk = AllEnemy[id].atk;
    this.def = AllEnemy[id].def;
    this.money = AllEnemy[id].money;
    
    //item
    this.numItem = AllEnemy[id].numItem;    //the number of item you can get
    this.dropItemId = AllEnemy[id].dropItemId;  //the item id 

    // cookiemanager
    this.cookiemanager = new cookieManager();
}

Enemy.prototype.fight = function (game){
    var total = 0;
    var msg;
    var dmg1 = this.atk - game.mDefenseValue;
    if(dmg1 < 0)
        dmg1 = 0;
    var dmg2 = game.mAttackValue - this.def;
    if(dmg2 < 0)
        dmg2 = 0;
    console.log(dmg1);
    console.log(dmg2);
    while(game.mHealthValue > 0 && this.mHealth > 0){
        this.mHealth -= dmg2;
        game.mHealthValue -= dmg1;
        total += dmg1;
    }
    console.log(game.mHealthValue);
    if(game.mHealthValue <= 0){
        //gEngine.GameLoop.stop();
        console.log("die");
        if(this.Id == 2){
            game.ending = 2;
            //save cookie
            this.cookiemanager.setCookie("Ending2","true");

        }
        else if(this.Id == 7){
            //save cookie
            this.cookiemanager.setCookie("Ending5","true");
            game.ending = 5;

        }
        else if(this.Id == 8){
            game.ending = 10;
            //save cookie
            this.cookiemanager.setCookie("Ending10","true");

        }
        else if(this.Id == 9){
            game.ending = 6;
            //save cookie
            this.cookiemanager.setCookie("Ending9","true");

        }
        else{
            game.ending = 0;
            //save cookie
            this.cookiemanager.setCookie("Ending0","true");

        }
        msg = "you lose";
        game.EndGame();
        return msg;
    }   
    else if(this.numItem>0){
        game.mBag.AddItem(this.dropItemId, this.numItem);
    }
    game.mMoneyValue += this.money;
    if(this.Id == 7){
        game.ending = 7;
        //save cookie
        this.cookiemanager.setCookie("Ending7","true");

        game.EndGame();
    }else if(this.Id == 8){
        game.ending = game.mBag.GetItemIdx(16)<0?9:8;
        //save cookie
        this.cookiemanager.setCookie("Ending"+game.ending,"true");

        game.EndGame();
    }else if(this.Id == 9){
        game.ending = 11;
        //save cookie
        this.cookiemanager.setCookie("Ending11","true");

        game.EndGame();
    }
        
    msg = "You win, lose " + total + " HP, get " + NameList[this.dropItemId] + " * "+this.numItem+", "+this.money+" gold.";
    return msg;    
}
