/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Timer() {
    this.pin = 0;
}

Timer.prototype.TimeStart = function () {
    this.pin++;
};

Timer.prototype.getNowTime = function () {
    return this.pin;
};