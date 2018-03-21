/* File: Hero.js
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2, RigidShape, RigidRectangle,
 *       Platform, Terrain, ArrowSet, ArrowVector, Platform, Arrow, Config */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

/**
 * Constructor for the Hero object. 
 * 
 * @param {String}          spriteTexture       Path to the sprite we'll be using.
 * @param {??}              normalMap           Justin pls fix this comment.
 * @param {Camera}          cameraRef           The ArrowVector class requires a camera reference.}
 * @param {Array}           lightSet            Set of lights to be passed to the ArrowSet.
 * @param {Boolean}         hardmode            Whether or not hardmode is on.
 * * @returns {Hero}
 */
function Hero(spriteTexture, normalMap, cameraRef, lightSet, hardmode) {
    // Create the sprite
    this.mArcher = new IllumRenderable(spriteTexture, normalMap);
    this.mArcher.getMaterial().setSpecular([0, 0, 0, 0]);
    this.mArcher.getMaterial().setShininess(10);
    this.mArcher.setColor(Config.Hero.Color);
    this.mArcher.getXform().setPosition(
        Config.BossBattle.Hero.SpawnPosition.X,
        Config.BossBattle.Hero.SpawnPosition.Y
    );
    this.mArcher.getXform().setSize(
        Config.Hero.Size.X,
        Config.Hero.Size.Y
    );
    this.mArcher.setElementPixelPositions(
        Config.Hero.PixelPositions.Left,
        Config.Hero.PixelPositions.Right,
        Config.Hero.PixelPositions.Bottom,
        Config.Hero.PixelPositions.Top,
    );
    this.setSprite(
        0.936,
        0.0468,
        0.0936,
        0.125,
        10
    );
    this.mArcher.setAnimationSpeed(2);
    GameObject.call(this, this.mArcher);
    
    // Physics
    var r = new RigidRectangle(
        this.getXform(),
        this.getXform().getWidth() / Config.Hero.Hitbox.WidthDivisor,
        this.getXform().getHeight() / Config.Hero.Hitbox.HeightDivisor
    );
    r.setMass(Config.Hero.Physics.Mass);
    r.setRestitution(Config.Hero.Physics.Restitution);
    r.setFriction(Config.Hero.Physics.Friction);  
    this.setRigidBody(r);
    
    //Player HP
    this.mMaxHP = Config.Hero.StartingHP;
    this.mCurrentHP = this.mMaxHP;
    
    // ArrowVector is our "firing" mechanism, need a single instance.
    this.mArrowVector = new ArrowVector(cameraRef);
    
    // Also keep a reference to the camera for shaking it.
    this.mCamera = cameraRef;
    
    // ArrowSet keeps a reference to each active arrow.
    this.mArrowSet = new ArrowSet(lightSet);
    
    // NoClip allows the hero to ignore collisions with platforms.
    this.mNoClip = false;
    this.mUpdatesSinceClip = 0;
    
    // Boolean to indicate whether the Hero is standing on the ground or not.
    this.onGround = true;
    
    // Counter for our double jump, though this implementation lets us change
    // the max number of jumps.
    this.mJumpCount = 0;
    this.mMaxJumps = Config.Hero.MaxJumps;
    
    // Current arrow we have selected.
    this.mArrowSelection = ArrowSet.eArrowType.eDefaultArrow;
    
    // The last platform the Hero landed on. This is not currently used,
    // but was going to be part of a boss attack. Don't want to delete in case
    // we get around to making the attack.
    this.mLastPlatform = null;
    
    // Tracks if hard mode is on.
    this.mHardMode = hardmode;
};
gEngine.Core.inheritPrototype(Hero, GameObject);

/**
 * Setter for the Hero's active arrow.
 * 
 * @param {ArrowSet.eArrowType} type    The type of arrow.
 * @returns {undefined}
 */
Hero.prototype.setArrowSelection = function(type) {
    this.mArrowSelection = type;
};

/**
 * Returns the current arrow type selected.
 * 
 * @returns {ArrowSet.eArrowType}
 */
Hero.prototype.getArrowSelection = function() {
    return this.mArrowSelection;
};

/**
 * No special behavior here, just calls draw for the arrows & the ArrowVector.
 * 
 * @param {Camera} aCamera
 * @returns {undefined}
 */
Hero.prototype.draw = function(aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mArrowVector.draw(aCamera);
    this.mArrowSet.draw(aCamera);
};

/**
 * Handles updating all behavior of the hero. Some of the states in this
 * function still use our old naming convention (ex: eArrowType.eIceArrow).
 * 
 * @returns {undefined}
 */
Hero.prototype.update = function () {
    if (this.mCurrentHP > 0) {
        // Grab the xform to make using it a bit more convenient here.
        var xform = this.getXform();

        // Move left or right, also adjust the orientation based on that
        // movement.
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
            if (this.mArcher.getTopUV() !== 0.693 + (0.118 / 2) && 
                this.onGround === true && 
                this.mJumpCount === 0) {
                this.setSprite(
                    0.693,
                    0.0472,
                    0.0944,
                    0.118,
                    10
                );
                this.mArcher.setAnimationSpeed(2);
            }
            this.getRigidBody().adjustPositionBy(
                Config.Hero.Movement.LeftDisplacementVector,
                Config.Hero.Movement.LeftDisplacementScale
            );
            xform.setOrientation(Config.Hero.Facing.Left);
        }
        else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
            if (this.mArcher.getTopUV() !== 0.693 + (0.118 / 2) && 
                this.onGround === true && 
                this.mJumpCount === 0) {
                this.setSprite(
                    0.693,
                    0.0472,
                    0.0944,
                    0.118,
                    10
                );
                this.mArcher.setAnimationSpeed(2);
            }
            this.getRigidBody().adjustPositionBy(
                Config.Hero.Movement.RightDisplacementVector,
                Config.Hero.Movement.RightDisplacementScale
            );
            xform.setOrientation(Config.Hero.Facing.Right);
        }

        else{
            if (this.mArcher.getTopUV() !== 0.938 + (0.125 / 2) && 
                this.onGround === true && 
                this.mArcher.getTopUV() !== 0.817 + (.125 / 2)) {
                this.setSprite(
                    0.938,
                    0.0468,
                    0.0936,
                    0.125,
                    10
                );
                this.mArcher.setAnimationSpeed(6);
            }
            else if (this.mArcher.getTopUV() === 0.817 + (0.125 / 2) &&                   
                     this.mArcher.getCurrentFrame() >= 9 && 
                     this.onGround === true) {
                this.setSprite(
                    0.938,
                    0.0468,
                    0.0936,
                    0.125,
                    10
                );
                this.mArcher.setAnimationSpeed(6);
            }
        }

        // Jump.
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
            if (this.mJumpCount < this.mMaxJumps) {
                this.getRigidBody().setVelocity(
                    Config.Hero.JumpVelocity.X,
                    Config.Hero.JumpVelocity.Y
                );
                this.mJumpCount++;
                this.setSprite(
                    0.564,
                    0.0498,
                    0.0996,
                    0.131,
                    10
                );
                this.mArcher.setAnimationSpeed(2);
            }
        }

        // NoClip/fall through platforms.
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
            this.mNoClip = true;
            this.mUpdatesSinceClip = 0;
        }
        // Update the time since we initialized NoClip if the user isn't holding S.
        else {
            if (this.mNoClip) {
                this.mUpdatesSinceClip++;
            }
            if (this.mUpdatesSinceClip > Config.Hero.MaxNoClipDuration) {
                this.mNoClip = false;
                this.mUpdatesSinceClip = 0;
            }
        }

        // Arrow selction
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.One)) {
            this.setArrowSelection(ArrowSet.eArrowType.eDefaultArrow);
        }
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Two)) {
            this.setArrowSelection(ArrowSet.eArrowType.eFireArrow);
        }
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Three)) {
            this.setArrowSelection(ArrowSet.eArrowType.eIceArrow);
        }

        // Update our ArrowVector before we use it. 
        this.mArrowVector.update();

        // If the user releases their left mouse button, we need to fire an arrow.
        if (gEngine.Input.isButtonReleased(gEngine.Input.mouseButton.Left)) {
            var arrow = this.generateArrow();
            if (this.mArrowSet.addToSet(arrow)) {
                gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, arrow);
                gEngine.AudioClips.playACue(Config.Hero.Audio.FiringArrow, Config.Hero.Audio.Volume);
            }

            // Determine the orientation of the arrow.
            if (this.mArrowVector.getDegrees() < 90 && this.mArrowVector.getDegrees() > -90) {
                xform.setOrientation(Config.Hero.Facing.Right);
            } else if (this.mArrowVector.getDegrees() > 90 || this.mArrowVector.getDegrees() < -90) {
                xform.setOrientation(Config.Hero.Facing.Left);
            }
            this.setSprite(
                0.817,
                0.0490,
                0.0980,
                0.125,
                10
            );
            this.mArcher.setAnimationSpeed(1);
        }

        // These hotkeys allow the firing mode for arrows to be changed. 
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.M)) {
            this.mArrowVector.setFireMode(ArrowVector.eFiringModes.eTailControl);
        }
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.N)) {
            this.mArrowVector.setFireMode(ArrowVector.eFiringModes.eHeadControl);
        }

        this.mArrowSet.update();
        this.mRigidBody.setAngularVelocity(0);
        this.mRigidBody.update();
        
        // Only update animation if ????? dunno
        if ((this.mArcher.getTopUV() === 0.564 + (0.131 / 2) && this.mArcher.getCurrentFrame() === 9) ||
            (this.mArcher.getTopUV() === 0.817 + (0.125 / 2) && this.mArcher.getCurrentFrame() === 9)) {
                // Do nothing.
            }
        else {
            this.mArcher.updateAnimation();
        }
    } else {
        this.mArcher.updateAnimation();
    }
};

/**
 * Handles the creation of a new arrow. Fairly simple factory-esque
 * function.
 * 
 * @returns {Arrow|FireArrow|IceArrow}
 */
Hero.prototype.generateArrow = function() {
    var arrow;
    var type = this.getArrowSelection();
    if (type === ArrowSet.eArrowType.eFireArrow) {
        arrow = new FireArrow(
            this.getXform().getPosition(),
            this.mArrowVector.getPower(),
            this.mArrowVector.getDegrees()
        );
    }
    else if (type === ArrowSet.eArrowType.eIceArrow) {
        arrow = new IceArrow(
            this.getXform().getPosition(),
            this.mArrowVector.getPower(),
            this.mArrowVector.getDegrees()
        );
    }
    else {
        arrow = new Arrow(
            this.getXform().getPosition(),
            this.mArrowVector.getPower(),
            this.mArrowVector.getDegrees()
        );
    }
    return arrow;
};
 
/**
 * Returns a reference to the last platform the user came into contact with.
 * This is not guaranteed to be the last platform they stood on, but rather
 * the last one they collided with.
 * 
 * @returns {GameObject}
 */
Hero.prototype.getLastPlatform = function () {
    return this.mLastPlatform;
};


/**
 * Allows for user defined interactions between (this) and the parameter object.
 * Returning true skips the default Physics engine's handling of the collision.
 * 
 * In this case, ignores collision with platform objects when the S key is pressed
 * or when the hero is jumping from below the platform
 * 
 * @param {GameObject} obj
 * @returns {Boolean}
 */
Hero.prototype.userCollisionHandling = function (obj) {
    // The only object we would want to ignore as the hero is a Platform.
    if (obj instanceof Platform) {
        // Update the reference to the last platform the Hero used.
        this.mLastPlatform = obj;
        
        // NoClip is our setting for indicating the Hero is in a state which should avoid
        // collisions with platforms. If it's true, return true.
        if (this.mNoClip) {
            return true;
        }
        
        // NoClip is false, so we want to collide with the platform if the hero
        // is moving downwards. Also reset the jump count. This enables the "bug"
        // where we can technically infinitely jump if we touch the bottom or side
        // of a platform with the hero, but this is a mechanic people enjoyed, so
        // we'll leave the jump count reset here.
        if (this.getRigidBody().getVelocity()[1] < 0) {
            this.mJumpCount = 0;
            return false;
        }
        
        // Since we checked for the case where we don't want to ignore collision, the fact
        // that we're still here means we DO want to ignore it.
        return true;
    }
    
    if (obj instanceof Platform || obj instanceof Terrain) {
        this.onGround = true;
    } else {
        this.onGround = false;
    }
    
    // This is the second part of the infinite double jump bug. Again, we're
    // leaving it here because people said they liked it. To fix, we would add
    // conditions that require obj to not be a wall or boundary.
    if (!(obj instanceof Arrow)) {
        this.mJumpCount = 0;
    }
    
    return false;
};

/**
 * Checks if the hero is dead.
 * 
 * @returns {Boolean}
 */
Hero.prototype.getStatus = function () {
    return (this.mCurrentHP > 0 || this.mArcher.getCurrentFrame()!==8);
};

/**
 * Deals damage to the hero equal to the value of the parameter.
 * 
 * @param {float} damage
 * @returns {undefined}
 */
Hero.prototype.hit = function (damage) {
    this.mCurrentHP -= damage;
    if (this.mHardMode === true) {
        this.mCurrentHP -= damage;
    }
    if (this.mCurrentHP <= 0){
        this.setSprite(
            0.333,
            0.0547,
            0.109,
            0.113,
            9
        );
        this.mArcher.setAnimationSpeed(3);
    }
    this.mCamera.shake(
        Config.Hero.CameraShake.X,
        Config.Hero.CameraShake.Y,
        Config.Hero.CameraShake.Frequency,
        Config.Hero.CameraShake.Duration
    );
};

/**
 * Sets the sprite sequence based on parametrized offesets.
 * 
 * @param {float} top
 * @param {float} left
 * @param {float} width
 * @param {float} height
 * @param {Number} frame
 * @returns {undefined}
 */
Hero.prototype.setSprite = function (top, left, width, height, frame) {
    this.mArcher.setSpriteSequence(
        2048 * (top + (height / 2)),
        2048 * (left - (width / 2)),
        2048 * width,
        2048 * height,
        frame,
        0
    );
};