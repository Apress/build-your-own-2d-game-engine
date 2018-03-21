/* File: Golem_RigidBody.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteAnimateRenderable, vec2, Arrow, Platform, Config, Golem,
 * RigidSet, GolemEmptyGameObject, RigidRectangle, RigidCircle, EmptyGameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

/**
 * Builds the set of Rigidbodies that make up the Golem's hitbox. All of these
 * Rigidbodies are defined in the Config_Golem file. This function effectively
 * just loops throuogh the Config.Golem.Rigidbodyies section and creates them
 * based on the provided values.
 * 
 * @returns {undefined}
 */
Golem.prototype._buildRigidbodies = function() {
    // Create the rigidbody for the Golem itself. This is an zero-area Rigidbody,
    // so it basically only exists so that the Golem can be defined as a
    // physics-enabled GameObject.
    var temp, r;
    r = new RigidRectangle(
        this.getXform(),
        0,
        0
    );
    r.setMass(Config.Golem.Properties.Physics.Mass);
    r.setRestitution(Config.Golem.Properties.Physics.Restitution);
    r.setFriction(Config.Golem.Properties.Physics.Friction); 
    this.setRigidBody(r);
    
    // Loops through all Config.Golem.Rigidbodies
    for (var rbody in Config.Golem.Rigidbodies) {
        // GolemEmptyGameObject is a subclass of EmptyGameObject, an object
        // designed to only serve as a part of a hitbox for a parent object.
        temp = new GolemEmptyGameObject(
            this,
            Config.Golem.Rigidbodies[rbody].XOffset,
            Config.Golem.Rigidbodies[rbody].YOffset,
            Config.Golem.Rigidbodies[rbody].DamageMultiplier,
            Config.Golem.Rigidbodies[rbody].Name
        );
        temp.getXform().setPosition(
            this.mGolem.getXform().getXPos() + Config.Golem.Rigidbodies[rbody].XOffset,
            this.mGolem.getXform().getYPos() + Config.Golem.Rigidbodies[rbody].YOffset
        );
        temp.getXform().setSize(
            this.mGolem.getXform().getWidth() * Config.Golem.Rigidbodies[rbody].WidthMultiplier,
            this.mGolem.getXform().getHeight() * Config.Golem.Rigidbodies[rbody].HeightMultiplier
        );

        r = null;

        // Pick the correct type of RigidShape to assign to the current object.
        switch (Config.Golem.Rigidbodies[rbody].Type.call()) {
            case Config.Engine.RigidShapeTypes.Rectangle:
                r = new RigidRectangle(
                    temp.getXform(),
                    temp.getXform().getWidth(),
                    temp.getXform().getHeight()
                );
                break;
            case Config.Engine.RigidShapeTypes.Circle:
                r = new RigidCircle(
                    temp.getXform(),
                    Config.Golem.Rigidbodies[rbody].Radius
                );
                break;
        } 
        if (r === null) {
            continue;
        }
        r.setMass(Config.Golem.Rigidbodies[rbody].Physics.Mass);
        r.setRestitution(Config.Golem.Rigidbodies[rbody].Physics.Restitution);
        r.setFriction(Config.Golem.Rigidbodies[rbody].Physics.Friction);
        temp.setRigidBody(r);
        // Add the new object to the appropriate sets.
        gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, temp);
        this.mRigidSet.insert(Config.Golem.Rigidbodies[rbody].Name, temp);
    }
};

/**
 * Toggles the ignoreCollision feature for all of the Rigidbodies associated
 * with this object.
 * 
 * @returns {undefined}
 */
Golem.prototype.ignoreCollision = function () {
    this.mRigidSet.execFuncForAll(function () {
        this.ignoreCollision();
    });
};

/**
 * Toggles the allowCollision feature for all of the Rigidbodies associated
 * with this object.
 * 
 * @returns {undefined}
 */
Golem.prototype.allowCollision = function () {
    this.mRigidSet.execFuncForAll(function () {
        this.allowCollision();
    });
};

/**
 * Switches the Golem's orientation, ensuring that all objects whose positions
 * are defined as an offset of the Golem are also handled appropriately.
 * 
 * @returns {undefined}
 */
Golem.prototype.switchDirection = function () {
    // Switch the XOffset and TempXOffset for all of our rigidbodies.
    for (var rbody in Config.Golem.Rigidbodies) {
        this.mRigidSet.get(Config.Golem.Rigidbodies[rbody].Name).mXOffset *= -1;
        this.mRigidSet.get(Config.Golem.Rigidbodies[rbody].Name).mTempXOffset *= -1;
    }

    // Figure out which direction we're currently facing, and then turn the other way.
    switch (this.mFacing) {
        case Config.Golem.States.FacingLeft:
            this.mFacing = Config.Golem.States.FacingRight;
            this.getXform().setOrientation(Config.Golem.States.FacingRight);
            break;
        case Config.Golem.States.FacingRight:
            this.mFacing = Config.Golem.States.FacingLeft;
            this.getXform().setOrientation(Config.Golem.States.FacingLeft);
            break;
    }
};

/**
 * Updates each Rigidbody in the RigidSet to be consistent with whichever
 * animation is currently being executed by the Golem.
 * 
 * @returns {undefined}
 */
Golem.prototype.updateRigidbodyAnimations = function () {
    // Check if we have a reference to the animation sequence or not.
    if (this.mCurrentRigidbodyAnimationSequenceReference === null) {
        return;
    }
       
    // We need to know which frame of the animation we're on to move the RigidBodies
    // accordingly.
    var currentFrame = this.getRenderable().getCurrentFrame();
    
    this.mRigidSet.execFuncForAll(function (params) {
        // Get a reference to the animation settings for the current body part & animation combo.
        var ref = Config.Golem.Rigidbodies[this.getBodyPart()].Animations[params.animRef];
        
        // Ensure the xOffset is oriented the correct direction.
        var xOffset = ref[params.frame].XOffset;
        if (params.facing === Config.Golem.States.FacingRight) {
            xOffset *= -1;
        }
        
        // Set the offsets for this frame.
        this.setTempPositionOffsets(xOffset, ref[params.frame].YOffset);
    }, {
        animRef: this.mCurrentRigidbodyAnimationSequenceReference, // Name of the current animation.
        frame:   currentFrame,                                     // Current animation frame.
        facing:  this.mFacing                                      // Direction the Golem is facing.
    });      
};

/**
 * Forces all Rigidbodies in the RigidSet to restore their offsets according to
 * the current orientation of the Golem. This is required because an animation
 * can complete on the same frame that the Golem switches direction. When the next
 * frame comes, the Rigidbodies are displacement in the opposite x-direction that
 * they should be. This will always force them back to the correct values.
 * 
 * @returns {undefined}
 */
Golem.prototype.forceRigidbodyOffsetsBackToNormal = function () {
    if (this.mFacing === Config.Golem.States.FacingLeft) {
        this.mRigidSet.purgeOffsets(false);
    } else {
        this.mRigidSet.purgeOffsets(true);
    }
};
