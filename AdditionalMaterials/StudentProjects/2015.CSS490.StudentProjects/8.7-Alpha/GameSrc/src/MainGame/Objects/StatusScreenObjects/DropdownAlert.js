/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


"use strict";


function DropdownAlert(stringSet, textHeight, color, position) {
    
    FontSet.call(this, stringSet, textHeight, color, position);
}

gEngine.Core.inheritPrototype(DropdownAlert, FontSet);

DropdownAlert.prototype.update = function() {
    
    
    
};