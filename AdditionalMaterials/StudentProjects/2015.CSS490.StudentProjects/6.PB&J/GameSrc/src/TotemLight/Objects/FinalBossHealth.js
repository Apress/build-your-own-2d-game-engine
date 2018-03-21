/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function FinalBossHealth(boss) {
    //GameObject.call(this, renderable);
    
    this.mHealthBar = new LightRenderable("assets/HealthBar.png"); 
    this.mHealthBar.getXform().setSize(2,.2);
    this.mStateTimeClick = 0;
    this.mBoss = boss;
}

gEngine.Core.inheritPrototype(FinalBossHealth, GameObject);

FinalBossHealth.eFinalBossHealth = Object.freeze({
    eShoot: 0,
    eWait: 1
});

FinalBossHealth.prototype.draw = function(aCamera) {
    this.mHealthBar.draw(aCamera);
};

FinalBossHealth.prototype.update = function() {
    this.mHealthBar.getXform().setPosition(this.mBoss.getXform().getXPos(), 
                                               this.mBoss.getXform().getYPos() + 1); 
    this.mHealthBar.getXform().setWidth(this.mBoss.getHealth() / 100 * 2);                                           
    this.mHealthBar.update();
};