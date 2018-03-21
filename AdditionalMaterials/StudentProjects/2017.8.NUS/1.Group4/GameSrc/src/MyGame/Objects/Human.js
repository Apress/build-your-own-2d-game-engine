/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global GameObject, gEngine, Catherine */

function Human(spriteTexture, xPos, yPos, width, height, chaseSpeed, triggerDis) {
    Catherine.call(this, spriteTexture, xPos, yPos, width, height, chaseSpeed, triggerDis);
}
gEngine.Core.inheritPrototype(Human, Catherine);
