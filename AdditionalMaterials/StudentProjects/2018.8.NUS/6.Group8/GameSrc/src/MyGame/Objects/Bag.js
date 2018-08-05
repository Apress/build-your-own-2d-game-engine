/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

var x = 72.2; // x for the left top square
var y = 48.1;
var delta = 4.6;  // the side of each small suqare

var deltaMove = 0;

var CursorPosition = [x,y];

var InfoPosition =[71,30];

function Bag(myTexture,cursorTexture,myGame){

    this.current = 0;
    this.itemSet = [];   //items that in the bag,they are in order
    this.itemNum = [];      //number of items
    this.capacity = 20;
    
    this.myGame = myGame;
    
    this.bag = new TextureRenderable(myTexture);
    this.bag.setColor([0,0,0,0]);
    this.bag.getXform().setSize(30,60);
    this.bag.getXform().setPosition(82,50);

    this.cursor = new TextureRenderable(cursorTexture);;
    this.cursor.setColor([0,0,0,0]);
    this.cursor.getXform().setSize(5.7,5.7);
    this.cursor.getXform().setPosition(CursorPosition);
    
    this.weapon = new Renderable();
    this.cursor.setColor([1,0,0,0]);
    this.cursor.getXform().setSize(5.7,5.7);
    this.cursor.getXform().setPosition(CursorPosition);
    
    this.NumTexture = [];
    for(var i=0;i<20 ;i++){
        this.NumTexture[i] = new FontRenderable("1");
        this.NumTexture[i].setColor([1, 1, 1, 1]);
        this.NumTexture[i].getXform().setPosition(x+(i%5)*delta,y-Math.floor(i/5)*delta);
        this.NumTexture[i].setTextHeight(2);
    }
    
    this.weapon = -1;
    this.armor = -1;

    /*
    for(var i=0;i<19;i++){
        this.AddItem(i, 1);

    }
    */
    this.AddItem(0,2);
    this.AddItem(3,2);
    //this.AddItem(17,1);
    //this.AddItem(11,1);
   // this.AddItem(17,1);
    
    this.attackChange=0;
    this.defenceChange=0;
    
}
Bag.prototype.GetItemIdx = function(id){
    for(var i=0; i<this.itemSet.length;i++)
    {
        if(id == this.itemSet[i].Id)
            return i;
    }
    return -1;
}

Bag.prototype.GetItemNum = function(id){
//    console.log(id);
//    console.log(this.itemSet);
//    console.log(this.itemNum);
    for(var i=0; i<this.itemSet.length;i++)
    {
        if(id == this.itemSet[i].Id)
            return this.itemNum[i];
    }
    return 0;
}

Bag.prototype.AddItem = function(id, num){
    var idx = this.GetItemIdx(id);
    //console.log(id);
    //console.log(idx);
    //console.log(this.itemSet);
    //console.log(this.itemNum);
    if(idx>=0){
        this.itemNum[idx]+=num;
        //setfont
    }
    else{
        this.itemSet[this.itemSet.length]=new Item(id);
        this.itemNum[this.itemNum.length]=num;
        this.itemSet[this.itemSet.length-1].renderable.getXform().setSize(3.5,3.5);
        //this.itemSet[this.itemSet.length-1].renderable.getXform().setPosition(x+((this.itemSet.length-1)%5)*delta,y-Math.floor((this.itemSet.length-1)/5)*delta);
        this.itemSet[this.itemSet.length-1].renderable.getXform().setPosition(x,y);

       // console.log(Math.floor(this.itemNum/5));
       //thi this.itemNum++;
    }
};

Bag.prototype.RemoveItem = function(){
    console.log("!");
    console.log(this.current);
    this.itemNum[this.current]--;
    if(this.itemNum[this.current] == 0){
        this.itemSet.splice(this.current,1);
        this.itemNum.splice(this.current,1);
        if(this.current!=0) 
            this.current--;
    }
}

Bag.prototype.RemoveItemById = function(id ,num){
    //console.log("id");
    //console.log(id);
    var idx = this.GetItemIdx(id);
    if(idx<0 || this.itemNum[idx] < 0){
        return false;
    }
    else{
        this.itemNum[idx]-=num;
        if(this.itemNum[idx] == 0){
            this.itemSet.splice(idx,1);
            this.itemNum.splice(idx,1);
            if(this.current!=0) 
                this.current--;
        }
    }
}

Bag.prototype.Move = function(deltaX){
    var temp = this.bag.getXform().mPosition;
    this.bag.getXform().setPosition(temp[0]+deltaX,temp[1]);
   // temp = this.cursor.getXform().mPosition;
   // this.cursor.getXform().setPosition(temp[0]+deltaX,temp[1]);   
    x += deltaX;
    deltaMove += deltaX;
    InfoPosition[0] += deltaX;
};

Bag.prototype.Draw = function(aCamera){
    // draw the bag
    this.bag.draw(aCamera);
    
    if(this.weapon!=-1){
        var temp = new Item(this.weapon);
        temp.renderable.getXform().setSize(3.5,3.5);
        temp.renderable.getXform().setPosition(76.8,53.5);
        temp.renderable.draw(aCamera);
    }
    
    if(this.armor!=-1){
        var temp = new Item(this.armor);
        temp.renderable.getXform().setSize(3.5,3.5);
        temp.renderable.getXform().setPosition(86,53.5);
        temp.renderable.draw(aCamera);
    }
    
    // draw the items
    for(var i=0;i<this.itemSet.length;i++){
        this.itemSet[i].renderable.getXform().setPosition(x+(i%5)*delta,y-Math.floor(i/5)*delta);
        this.itemSet[i].renderable.draw(aCamera);
    }
    
    //draw the number of items
    for(var i=0;i<this.itemNum.length;i++){
        this.NumTexture[i].setText(""+this.itemNum[i]);
        this.NumTexture[i].draw(aCamera);
    }

    // draw the cursor
    if(this.itemSet.length!=0){
        //console.log(x+(this.current%5)*delta);
        //console.log(y-Math.floor(this.current/5)*delta);
        this.cursor.getXform().setPosition(x+(this.current%5)*delta,y-Math.floor(this.current/5)*delta);
        this.cursor.draw(aCamera);
        //console.log(InfoPosition);
        //console.log(this.current);
        this.itemSet[this.current].Info.getXform().setPosition(InfoPosition[0],InfoPosition[1]);
        this.itemSet[this.current].Info.draw(aCamera);
        this.itemSet[this.current].Info_1.getXform().setPosition(InfoPosition[0],InfoPosition[1]-3);
        this.itemSet[this.current].Info_1.draw(aCamera);
    }
      
};

Bag.prototype.update = function(){   
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Left)){
        if(this.current%5!=0){
            this.current--;
        }
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Right)){
        if((this.current%5!=4)){
            if((this.current+1)<this.itemSet.length){
                this.current++;
            }
            else if(this.current>4){
                this.current = this.current - this.current%5-1;
            }
        }
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)){
        if(this.current>4){
            this.current -= 5;
        }
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)){
        if((this.current<15)){
            if((this.current+5)<this.itemSet.length){
                this.current += 5;
            }
            else{
                this.current = this.itemSet.length-1;
            }
        }
        
    }  
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.T)){
        this.RemoveItem();
    }  
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)){
        //console.log("type");
        //console.log(this.itemSet[this.current].type);
        if(this.itemSet[this.current].type==0){
            this.itemSet[this.current].Use(this.myGame);
            this.RemoveItem();
        }
        else if(this.itemSet[this.current].Id == 13 && this.GetItemNum(12)>0){
            // use key to open treasure case
            this.itemSet[this.current].Use(this.myGame);
            this.RemoveItem();
            this.RemoveItemById(12,1);
            this.AddItem(18,1);
        }
        else if(this.itemSet[this.current].Id == 12 && this.GetItemNum(13)>0){
            // use key to open treasure case
            this.itemSet[this.current].Use(this.myGame);
            this.RemoveItem();
            this.RemoveItemById(13,1);
            this.AddItem(18,1);
        }
        else if(this.itemSet[this.current].Id == 14 && this.GetItemNum(16)>0){
            // use secret bag on letter
            this.itemSet[this.current].Use(this.myGame);
            this.RemoveItem();
            this.RemoveItemById(16,1);
            this.AddItem(17,1);
        }
        else if(this.itemSet[this.current].Id == 16 && this.GetItemNum(14)>0){
            // use secret bag on letter
            this.itemSet[this.current].Use(this.myGame);
            this.RemoveItem();
            this.RemoveItemById(14,1);
            this.AddItem(17,1);
        }
        else if(this.itemSet[this.current].type==2){
            if(this.weapon!=-1){
                this.myGame.mAttackValue -= this.attackChange;
                this.AddItem(this.weapon, 1);
                this.weapon = this.itemSet[this.current].Id;
                this.attackChange = this.itemSet[this.current].atk;
                this.itemSet[this.current].Use(this.myGame);
                this.RemoveItem();
            }
            else{
                this.weapon = this.itemSet[this.current].Id;
                this.attackChange = this.itemSet[this.current].atk;
                this.itemSet[this.current].Use(this.myGame);
                this.RemoveItem();
            }
        }
        else if(this.itemSet[this.current].type==3){
            if(this.armor!=-1){
                this.myGame.mDefenseValue -= this.defenceChange;
                this.AddItem(this.armor, 1);
                this.armor = this.itemSet[this.current].Id;
                this.defenceChange = this.itemSet[this.current].def;
                this.itemSet[this.current].Use(this.myGame);
                this.RemoveItem();
            }
            else{
                this.armor = this.itemSet[this.current].Id;
                this.defenceChange = this.itemSet[this.current].def;
                this.itemSet[this.current].Use(this.myGame);
                this.RemoveItem();
            }
        }
        else if(this.itemSet[this.current].type==4){
            this.myGame.isBagOpened = false;
            this.myGame.BagOpenInMes = true;
            //this.myGame.hasChosen = true;
            this.myGame.isMesOn = true;
           // this.myGame.SendMessage("The duke said he had poisoned the elder king...");
            console.log("item type="+this.itemSet[this.current].type);
            this.myGame.SendMessage("The prince has been exiled.","As soon as I kill the king, I will be the new king.","                                 From Duke","             [press SPACE to close]","","");
           // this.myGame.SendMessage("The duke said he had poisoned the elder king...","","","","","");
        }
    }  
}
