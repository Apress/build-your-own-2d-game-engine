/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

var NameList = ["Apple","Meat","Fish","Herb","Timber","Axe","Spear","Sword","Shield1","Shield2","secretbag","cape","key","treasurechest","Letter","Potion","Mysterious potion","Letter","Ring","Bread","Antidote"];
var InfoList = ["Apple:","Meat:","Fish:","Herb:","Timber:",
                "Axe:","Spear:","Sword: ","Wooden Shield: ","Iron Shield:",
                "Secret bag: ","Cape: ","Key:",
                "Treasure Chest: ", "Letter: ","Small healing potion:","Mysterious potion:","Letter:","Ring:","Bread:","Antidote:"
                ];
var InfoList_1 = ["Hunger+10","Hunger+20","Hunger+30","Health+10","strange timber",
                "Attack+10","Attack+15","Attack+5","Defense+4","Defense+8",
                "What's in it?","Disguise yourself","May open something?",
                "It is locked", "It is empty","Health+30","Use it on empty letter","Enter to check","Princess's ring","Hunger+30 Health+20",
                "Help to detoxify"
                ];               
var HealthList = [0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,30,0,0,0,30,0];
var mHealthList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var HungerList = [10,20,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,0];
var mHungerList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var PictureList = ["assets/item/0_apple.png",
    "assets/item/1_meat.png",
    "assets/item/2_fish.png",
    "assets/item/3_herb.png",
    "assets/item/4_timber.png",
    "assets/item/5_axe.png",
    "assets/item/6_spear.png",
    "assets/item/7_sword.png",
    "assets/item/8_shield1.png",
    "assets/item/9_shield2.png",
    "assets/item/10_secretbag.png",
    "assets/item/11_cape.png",
    "assets/item/12_key.png",
    "assets/item/13_treasurechest.png",
    "assets/item/14_letter1.png",
    "assets/item/15_potion1.jpg",
    "assets/item/16_potion2.jpg",
    "assets/item/17_letter2.png",
    "assets/item/18_ring.png",
    "assets/item/19_bread.png",
    "assets/item/20_potion3.png",
];
var AtkList = [0,0,0,0,0,13,20,6,0,0,0,0,0,0,0,0,0,0,0,0,0];
var DefList = [0,0,0,0,0,0,0,0,4,8,0,0,0,0,0,0,0,0,0,0,0];
var TypeList = [0,0,0,0,1,2,2,2,3,3,1,1,1,1,1,0,1,4,1,0,1];  // 0: consume  1: cannot use   2: weapon  3:armor  4:可重复使用

function Item(id) {
    this.Id = id;
    this.Name = NameList[id];
    this.Health = HealthList[id];
    this.mHealth = mHealthList[id];  // mhealth add the maximum of the health
    this.Hunger = HungerList[id];
    this.mHunger = mHungerList[id];
    this.picture = PictureList[id];
    this.atk = AtkList[id];
    this.def = DefList[id];
    this.renderable = new TextureRenderable(this.picture);
    this.renderable.setColor([1,1,1,0]);
    this.type = TypeList[id];
    //this.renderable.getXform().setSize(2,2);
    
    this.Info = new FontRenderable(InfoList[id]);
    this.Info.setColor([0, 0, 0, 1]);
    this.Info.setTextHeight(2);
    
    this.Info_1 = new FontRenderable(InfoList_1[id]);
    this.Info_1.setColor([0, 0, 0, 1]);
    this.Info_1.setTextHeight(2);
    
    this.eventType = -1;    //the item may have effect on the following event    
}

Item.prototype.Use = function(mygame){
    mygame.mHealthValue += this.Health;
    mygame.mHealthValueMax += this.mHealth;
    if(mygame.mHealthValueMax < mygame.mHealthValue){
        mygame.mHealthValue = mygame.mHealthValueMax;
    }
    mygame.mHungerValue += this.Hunger;
    mygame.mHungerValueMax += this.mHunger;
    if(mygame.mHungerValueMax < mygame.mHungerValue){
        mygame.mHungerValue = mygame.mHungerValueMax;
    }

    mygame.mAttackValue += this.atk;
    mygame.mDefenseValue += this.def;
    /*
    mygame.mAttackValue = 10+this.atk;
    mygame.mDefenseValue = 10+this.def;
    */

    // update attribute renderable
    mygame.mHealth.setText("Health: "+ mygame.mHealthValue+"/"+ mygame.mHealthValueMax);
    mygame.mHunger.setText("Hunger: " + mygame.mHungerValue + "/"+ mygame.mHungerValueMax);
    mygame.mAttack.setText("Attack:  " + mygame.mAttackValue);
    mygame.mDefense.setText("Defense: " + mygame.mDefenseValue);
}