/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function EventPalaceSet(num) {

    // 0号位置不要
    this.order = [];
    this.index = 0;
    this.mEventSet=[];
    for(var i=0;i<num;i++){
        this.mEventSet.push(new EventPalace(i+1));
    }
    



    //console.log(mEventSet);
    return this.mEventSet;
}
gEngine.Core.inheritPrototype(EventSet, GameObjectSet);

EventPalaceSet.prototype.forward = function () {
    this.mEventSet.push(new EventPalace(this.index++, this.order[this.index]));
    return this.mEventSet;
}

