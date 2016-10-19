/*
 * File: MyGame_lightControl: support UI manipulation of light parameters
 */

/*jslint node: true, vars: true */
/*global gEngine, MyGame, vec3, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

MyGame.prototype._lightControl = function () {
    var dirDelta = 0.005;
    var delta = 0.2;
    var msg = "";
    // player select which light to work 
    this._selectLight();

    // manipulate the light
    var lgt = this.mGlobalLightSet.getLightAt(this.mLgtIndex);
    var p = lgt.getPosition();
    var d = lgt.getDirection();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)) {
            d[0] -= dirDelta;
            lgt.setDirection(d);
        } else {
            lgt.setXPos(p[0] - delta);
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)) {
            d[0] += dirDelta;
            lgt.setDirection(d);
        } else {
            lgt.setXPos(p[0] + delta);
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)) {
            d[1] += dirDelta;
            lgt.setDirection(d);
        } else {
            lgt.setYPos(p[1] + delta);
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)) {
            d[1] -= dirDelta;
            lgt.setDirection(d);
        } else {
            lgt.setYPos(p[1] - delta);
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Z)) {
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)) {
            d[2] += dirDelta;
            lgt.setDirection(d);
        } else {
            lgt.setZPos(p[2] + delta);
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.X)) {
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)) {
            d[2] -= dirDelta;
            lgt.setDirection(d);
        } else {
            lgt.setZPos(p[2] - delta);
        }
    }

    // radius
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.C)) {
        lgt.setInner(lgt.getInner() + (delta * 0.01)); // convert to radian
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.V)) {
        lgt.setInner(lgt.getInner() - (delta * 0.01)); // convert to radian
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.B)) {
        lgt.setOuter(lgt.getOuter() + (delta * 0.01)); // convert to radian
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.N)) {
        lgt.setOuter(lgt.getOuter() - (delta * 0.01)); // convert to radian
    }

    // Intensity
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.K)) {
        lgt.setIntensity(lgt.getIntensity() + delta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.L)) {
        lgt.setIntensity(lgt.getIntensity() - delta);
    }

    // on/off
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) {
        lgt.setLightTo(!lgt.isLightOn());
    }

    var lMsg = "";
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)) {
        lMsg = this._printVec3("D", d);
    } else {
        lMsg = this._printVec3("P", p);
    }
    msg = "On(" + lgt.isLightOn() + ") " + lMsg +
          "R(" + lgt.getInner().toPrecision(3) + "/" + lgt.getOuter().toPrecision(3) + ") " +
          "I(" + lgt.getIntensity().toPrecision(3) + ")";

    return msg;
};

MyGame.prototype._selectLight = function () {
    // select which light to work with
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Zero)) {
        this.mLgtIndex = 0;
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.One)) {
        this.mLgtIndex = 1;
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Two)) {
        this.mLgtIndex = 2;
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Three)) {
        this.mLgtIndex = 3;
    }
};

MyGame.prototype._printVec3 = function (msg, p) {
    return msg + "(" + p[0].toPrecision(2) + " " + p[1].toPrecision(2) + " " + p[2].toPrecision(2) + ") ";
};
