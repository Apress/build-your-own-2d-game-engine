/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global Command, gEngine */

function TurnToStartCommand(){
    
};

gEngine.Core.inheritPrototype(TurnToStartCommand,Command);

TurnToStartCommand.prototype.excute = function(){
    gEngine.GameLoop.stop();
};