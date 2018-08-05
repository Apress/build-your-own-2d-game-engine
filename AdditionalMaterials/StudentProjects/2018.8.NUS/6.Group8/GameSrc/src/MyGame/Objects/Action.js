/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

this.AllItem = ["1.png", "2.png", "3.png"];

function Action(content, result) {
    this.Id = -1;
    this.content = content; //the content of action
    this.result = result;   //the result
}

Action.prototype.getResult = function (){     //get the result according to probability
    var r = Math.random();
    for(var i=0;i<this.result.length;i++){
        //console.log(r);
        //console.log(i);
        if(r<this.result[i].pr){
            return this.result[i];
        }
        r-=this.result[i].pr;
    }
}

Action.prototype.setContent = function(content){
    this.content = content;
}

Action.prototype.setResult = function(result){
    this.result = result;
}
