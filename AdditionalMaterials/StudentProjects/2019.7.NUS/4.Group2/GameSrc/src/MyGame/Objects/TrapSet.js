/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function TrapSet(){
    GameObjectSet.call(this);
}
gEngine.Core.inheritPrototype(TrapSet, GameObjectSet);

TrapSet.prototype.update = function(x, y){
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        if(this.mSet[i].update(x, y))
            return true;
    }
    return false;
};