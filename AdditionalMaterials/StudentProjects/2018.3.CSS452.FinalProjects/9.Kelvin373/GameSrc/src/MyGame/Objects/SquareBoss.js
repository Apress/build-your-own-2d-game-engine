/**
 This is the boss for the second level

 it will basically be a white square that bounces around like the idle screens on DVD players
 when hit for the first time, it will turn red for a frame and then turn back

 when hit for the second time, it will subdivide itself into 4ths

 this will happen only a few times so we don't go crazy with recursion

 **/

/**
 *
 * @param sprites
 * @param posX WC position to spawn in at
 * @param posY
 * @param recursionLevel what recursion level to create them at 1 2 or 3
 * @param rotation in degrees
 * @constructor
 */
function SquareBoss(sprites, posX, posY, recursionLevel, rotation) {

    this.sprites = sprites;

    // define the renderable for this object
    this.renderable = new SpriteAnimateRenderable(sprites);
    this.renderable.setColor([1.0, 1.0, 1.0,0.0]);
    this.renderable.getXform().setPosition(posX, posY);
    this.renderable.getXform().setRotationInDegree(rotation);
    this._setSprite();

    // call the base class constructor
    GameObject.call(this, this.renderable);

    // what level of recursion is this object
    this.level = recursionLevel;

    // set the size of this object based on its recursion level
    var size = 50;

    if (recursionLevel == 1)
        size = 40;
    else if (recursionLevel == 2)
        size = 20;
    else if (recursionLevel == 3)
        size = 10;

    this.size = size;

    // set the sized based on the recursion level
    this.renderable.getXform().setSize(size, size);

    // set up the rigid rectangle for collisions and movement
    this.rigid = new RigidRectangle(this.renderable.getXform(), size, size);

    // set up the physics for this rigid shape
    this.rigid.setMass(0);
    this.rigid.setFriction(0);
    // this.rigid.setVelocity(
    //     (Math.random() * recursionLevel * 5) / 60.0,
    //     (Math.random() * recursionLevel * 5) / 60.0
    // );
    //this.rigid.setVelocity(0,0);

    this.hitState = 0; // 1 indicates has been hit once, 3 will cause it to split
    this.hitCooldown = Date.now(); // cooldown timer so that a bunch of hits don't register
                                    // more than once


    // when hit once, movement and rotation should slow down
    // when hits the player cause them damage

    this.dead = false;
    this.madeSquares = false;

    this.xVel = 0.5 + Math.random() * this.size / 60.0;
    this.yVel = 0.5 + Math.random() * this.size / 60.0;
};


// don't feel like it uses enough of boss to be considered a boss
// since it's health is not based on the individual object but instead all of the objects
// that this wil spawn
gEngine.Core.inheritPrototype(SquareBoss, GameObject);

SquareBoss.prototype._setSprite = function () {
    switch (this.hitState) {
        case 2:
        case 3:
            // set the sprite to use the panic sprites
            this.renderable.setSpriteSequence(128, 0, 128, 128, 4, 0);
            this.renderable.setAnimationSpeed(10);
            //this.renderable.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
            break;

        default:
            // the default case for the sprites
            this.renderable.setSpriteSequence(256, 0, 128, 128, 1, 0);

            // this.renderable.setSpriteSequence(128, 0, 128, 128, 4, 0);
            this.renderable.setAnimationSpeed(300);
            break;
    }
};

SquareBoss.prototype.draw = function(cam)
{
    this.renderable.updateAnimation();
    //console.log('aaa');
    this.renderable.draw(cam);

    //GameObject.draw.call(this, cam);
};

SquareBoss.prototype.update = function () {
    // rotate by an amount depending on the hit state
    switch (this.hitState) {
        default:
        case 1:
            this.renderable.getXform().incRotationByDegree(5.0/ 60.0);
            break;
        case 2:
            this.renderable.getXform().incRotationByDegree(15.0 / 60.0);
            break;
        case 3:
            this.renderable.getXform().incRotationByDegree(50.0/ 60.0);
            break;
    }



    // manually work with the position

    // inc the position
    this.renderable.getXform().incXPosBy(this.xVel);
    this.renderable.getXform().incYPosBy(this.yVel);

    if(this.renderable.getXform().getXPos() < 10 || this.renderable.getXform().getXPos() > 290)
    {
        this.xVel = -this.xVel;
    }

    if(this.renderable.getXform().getYPos() < 10 || this.renderable.getXform().getYPos() > 200)
    {
        this.yVel = -this.yVel;
    }

    // GameObject.update.call(this);
    //
    // this.rigid.update();
};

/**
 * Hit the boss
 * with a projectile of some type
 */
SquareBoss.prototype.hit = function () {


    // check the hit cooldown timer
    if(Date.now() - this.hitCooldown > 100)
    {
        console.log('hit on cooldown');
        // update the hit cooldown timer on a hit
        this.hitCooldown = Date.now();

        // increment the hit state
        this.hitState = this.hitState + 1;

        // update the state of the sprite animate renderable
        this._setSprite();

        // the boss has been hit by some projecitle
        // set the hit cooldown to 300 ms

        // increment the hit amount by 1
        // if the hit state went 0 - 1
        // set the sprite sheet to use the error sprites
        // faster rotation and faster movement

        // set the velocity to go faster
        //var currentV = this.rigid.getVelocity();
        //this.rigid.setVelocit.y(currentV[0] * 1.5, currentV[1] * 1.5);
        this.xVel = -2*this.xVel;
        this.yVel = -2*this.yVel;

        // if the hit state went 2 - 3
        // this boss is dead, but need to spawn 4 more in its place

        if(this.hitState === 3)
        {
            // this flag will indicate to the main game loop that it should try to
            // spawn new squares
            // and that this object should be removed from the list
            this.dead = true;
        }
    }
    else
    {
        console.log('cooldown');
    }
};

/**
 * Determines if new squares should be made
 * this is only called when the recursion level would be greater than 3
 */
SquareBoss.prototype.shouldMakeNewSquares = function()
{
    return !(this.level >= 3);
};

/**
 * Makes the new squares and returns a game object set of the 4 new squares
 */
SquareBoss.prototype.makeNewSquares = function()
{
    if(!this.madeSquares) {

        var ret = new GameObjectSet();

        this.madeSquares = true;

        // create each of the new objects


        // this does not compensate for the position based on the rotation
        // but at this point I don't really care
        var n1 = new SquareBoss(this.sprites,
            this.renderable.getXform().getXPos() - this.size / 2,
            this.renderable.getXform().getYPos() + this.size / 2,
            this.level + 1,
            this.renderable.getXform().getRotationInDegree()
        );

        var n2 = new SquareBoss(this.sprites,
            this.renderable.getXform().getXPos() - this.size / 2,
            this.renderable.getXform().getYPos() - this.size / 2,
            this.level + 1,
            this.renderable.getXform().getRotationInDegree()
        );

        var n3 = new SquareBoss(this.sprites,
            this.renderable.getXform().getXPos() + this.size / 2,
            this.renderable.getXform().getYPos() - this.size / 2,
            this.level + 1,
            this.renderable.getXform().getRotationInDegree()
        );

        var n4 = new SquareBoss(this.sprites,
            this.renderable.getXform().getXPos() + this.size / 2,
            this.renderable.getXform().getYPos() + this.size / 2,
            this.level + 1,
            this.renderable.getXform().getRotationInDegree()
        );

        ret.addToSet(n1);
        ret.addToSet(n2);
        ret.addToSet(n3);
        ret.addToSet(n4);

        return ret;
    }
};

/**
 * Call this when the boss collides with the player
 */
SquareBoss.prototype.bounceBack = function () {
    // boss has collided with the player, deduct some amount of HP

    // this is dealt with in the player class already
    //player.registerDamage();

    // and then set the velocity of this object to go in the opposite direction
    //this.rigid.flipVelocity();
    this.xVel = -this.xVel;
    this.yVel = -this.yVel;
};

/**
 * Call this when the boss collides with the world
 * @param horizontal did this collide with the world horizontally
 * @param vertical did this collide with the world vertically
 */
SquareBoss.prototype.worldCollide = function (horizontal, vertical) {
    // if it his the wall then just flip the velocity in that direction
    if (horizontal) {
        //this.rigid.flipHorizontalVelocity();
        this.xVel = -this.xVel;
    }

    if (vertical) {
//        this.rigid.flipVerticalVelocity();
        this.yVel = -this.yVel;
    }
};