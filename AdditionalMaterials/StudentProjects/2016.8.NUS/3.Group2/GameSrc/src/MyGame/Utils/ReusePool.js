/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * 
 * 
 * 
 * 
 * 
 * 
 * By 龚楚涵 (Dino) in Singapore
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
function ReusePool(name){
    
    /*
     * name of the pool
     */
    this.mPoolName = name;
    
    /*
     * Objects in the pool
     */
    this.mObjects = [];
    
}

ReusePool.prototype.getName = function(){
    return this.mPoolName;
};

ReusePool.prototype.add = function(object){
    for(var i = 0; i < this.mObjects.length; i++){
        if( !this.mObjects[i] && this.mObjects[i] === object )
            /*
             * The Object has already been added into the 
             */
            return;
        else
            this.mObjects.push(object);
    }
};

ReusePool.prototype.getObject = function(){
    if(this.mObjects.length !== 0)
        return this.mObjects.pop();
    else
        return null;
};
