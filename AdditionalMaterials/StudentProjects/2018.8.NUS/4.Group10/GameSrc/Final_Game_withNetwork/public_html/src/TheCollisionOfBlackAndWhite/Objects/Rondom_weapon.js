/* File: Rom_weapon.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Rom_weapon(status, Pos_x, Pos_y) {
    this.kWidth = 48;
    this.kHeight = 12;
    this.status = status;
    
    switch (this.status){
        case 0:
            this.spriteTexture = "assets/"+"weapon_0.png";
            break;
        case 1:
            this.spriteTexture = "assets/"+"weapon_1.png";
            break;
        case 2:
            this.spriteTexture = "assets/"+"weapon_2.png";
            break;
        case 3:
            this.spriteTexture = "assets/"+"weapon_3.png";
            break;
        case 4:
            this.spriteTexture = "assets/"+"weapon_4.png";
            break;
        case 5:
            break;
        case 6:
            break;
    }
    this.mDye = new SpriteAnimateRenderable(this.spriteTexture);
    //this.mDye.setColor([1, 1, 1, 0]);
    this.position_x = Pos_x;
    this.position_y = Pos_y;
    this.mDye.getXform().setPosition(this.position_x, this.position_y);
    this.mDye.getXform().setZPos(1);
    if(this.status === 2 || this.status === 3)
    {
        this.mDye.getXform().setSize(this.kWidth/2, this.kHeight*2);
    }
    else
    {
        this.mDye.getXform().setSize(this.kWidth, this.kHeight);
    }
    //this.mHeroState = Rom_weapon.eHeroState.eRunRight;
    //this.mPreviousHeroState = Rom_weapon.eHeroState.eRunLeft;
    //this.mIsMoving = false;
    //this.mCanJump = false;
    /****************************************************///music
    //this.Jump =  "assets/"+"jump.wav";
    this.mDye.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    this.mDye.setAnimationSpeed(2);         // show each element for mAnimSpeed updates

    var transform = new Transform();
    transform.setPosition(this.mDye.getXform().getXPos(), this.mDye.getXform().getYPos() - this.kHeight / 2);
    this.mJumpBox = new RigidRectangle(transform, this.kWidth, 0.25);
    this.mJumpBox.setColor([0, 0, 1, 1]);
    // this.mJumpBox.setDrawBounds(true);

    GameObject.call(this, this.mDye);

    var r = new RigidRectangle(this.getXform(), this.kWidth / 1.9, this.kHeight / 1.1);
    r.setMass(0.7);
    r.setRestitution(0);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(false);
    this.setPhysicsComponent(r);
}
gEngine.Core.inheritPrototype(Rom_weapon, GameObject);
