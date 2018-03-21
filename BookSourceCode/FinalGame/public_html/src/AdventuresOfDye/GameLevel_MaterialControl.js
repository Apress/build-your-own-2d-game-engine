/*
 * File: GameLevel_MaterialControl: support UI manipulation of material parameters
 */
/*jslint node: true, vars: true */
/*global gEngine, GameLevel_01, Material */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

GameLevel_01.prototype.materialControl = function () {
    var delta = 0.01;
    var msg = "";

    // player select which object and material channgel to work 
    this._selectMaterialChannel();

    // manipulate the selected component Ambient, Diffuse, Specular
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.E)) {
        this.mMaterialCh[0] += delta;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.R)) {
        this.mMaterialCh[0] -= delta;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.T)) {
        this.mMaterialCh[1] += delta;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Y)) {
        this.mMaterialCh[1] -= delta;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.U)) {
        this.mMaterialCh[2] += delta;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.I)) {
        this.mMaterialCh[2] -= delta;
    }

    // shinningess
    var mat = this.mSlectedCh.getRenderable().getMaterial();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.O)) {
        mat.setShininess(mat.getShininess() + delta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.P)) {
        mat.setShininess(mat.getShininess() - delta);
    }

    msg += "n(" + mat.getShininess().toPrecision(2) + ")" +
           this._printVec3("D", mat.getDiffuse()) +
           this._printVec3("S", mat.getSpecular()) +
           this._printVec3("A", mat.getAmbient());

    return msg;
};

GameLevel_01.prototype._selectMaterialChannel = function () {
    // select which character to work with
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Seven)) {
        this.mMaterialCh = this.mSlectedCh.getRenderable().getMaterial().getAmbient();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Eight)) {
        this.mMaterialCh = this.mSlectedCh.getRenderable().getMaterial().getDiffuse();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Nine)) {
        this.mMaterialCh = this.mSlectedCh.getRenderable().getMaterial().getSpecular();
    }
};