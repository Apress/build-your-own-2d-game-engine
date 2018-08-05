/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function EventSet(num) {
    var mEventSet = [];
    for(var i=0;i<num;i++){
        mEventSet.push(new Event(i+1));
    }
    //console.log(mEventSet);
    return mEventSet;
}
gEngine.Core.inheritPrototype(EventSet, GameObjectSet);

