/* 
 * HealthBar.js
 * Creates and initializes the health bar
 * Contains simple behaviors for the health bar
 *  Should be implemented as part of another object.
 * 
 * By Steven Roberts and Tyler Green
 */

function HealthBar() {
    this.kLifeMax = 4;
    this.mLife = this.kLifeMax; //literal value
    this.kHealthPerWidth = 4;
    //interpolated bar width
    this.mLifeBar = new Interpolate(this.kLifeMax * this.kHealthPerWidth, 300, 0.1); 
    
    this.mHealthBar = new Renderable();
    this.mHealthBar.setColor([0, 1, 0, 1]);
    this.mHealthBar.getXform().setPosition(0, 80);
    
    this.mHealthBar.getXform().setSize(this.mLifeBar.getFinalValue(), 3);
    
    GameObject.call(this, this.mHealthBar);
}
gEngine.Core.inheritPrototype(HealthBar, GameObject);

HealthBar.prototype.getLife = function () {
    return this.mLife;
};

HealthBar.prototype.heal = function(num) {
    this.mLife += num;
    
    if(this.mLife > this.kLifeMax)
        this.mLife = this.kLifeMax;
    
    this.mLifeBar.setFinalValue(this.mLife * this.kHealthPerWidth);
};

HealthBar.prototype.damage = function(num) {
    this.mLife -= num;
    
    if(this.mLife < 0)
        this.mLife = 0;
    
    //simple damage
    //this.getXform().setWidth(this.mLife * this.kLifeMax);
    
    //interpolate damage
    this.mLifeBar.setFinalValue(this.mLife * this.kLifeMax);
};

/*
 * Update the health bar interpolatey
 */
HealthBar.prototype.update = function() {
    this.mLifeBar.updateInterpolation();
    this.mHealthBar.getXform().setWidth(this.mLifeBar.getValue());
};