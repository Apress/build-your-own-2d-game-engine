/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var EventList = function () {
    this.mList = [];


}
EventList.prototype.registerEvent = function (command) {
    this.mList.push(command);
};

EventList.prototype.excuteEvent = function () {
    for(var i = 0 ; i<this.mList.length;i++){
        if(this.mList[i]){
            this.mList[i].excute();
        }
    }
};


EventList.prototype.unRegisterEvent = function (index) {
    this.mList[index] = null;
};



