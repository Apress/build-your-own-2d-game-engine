/* Config_UI.js
 *      Configuration Settings for the user interface
 */

"use strict";

var Config = Config || {};

Config.UI = Object.freeze({
    Textures: {
        UIArrowIcon:            "assets/UI/arrowicon.png",
        UIFireArrowIcon:        "assets/UI/firearrowicon.png",
        UIIceArrowIcon:         "assets/UI/icearrowicon.png",
        UIArrowBorders:         "assets/UI/activearrowborder.png",
        UIHealthBar:            "assets/UI/healthbar.png",
        UIButton:               "assets/UI/button.png"
    },
    UIButton: {   //Default Rects for the UIButton class
        NormalUV: [0.0, 1.0, 0.7, 1.0],
        ClickedUV: [0.0, 1.0, 0.4, 0.7]
    }
});
