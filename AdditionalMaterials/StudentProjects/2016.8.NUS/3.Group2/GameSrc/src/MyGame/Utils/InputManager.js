

/* global gEngine */


var gManager = gManager || {};

gManager.InputManager = (function () {

    var onClickedMap = {};

    var onPressedMap = {};

    var initManager = function () {

        for(var i = 0 ; i < gEngine.Input.keys.LastKeyCode; i++){
            onClickedMap[i] = new EventList();
        }
        for(var i = 0 ; i < gEngine.Input.keys.LastKeyCode; i++){
            onPressedMap[i] = new EventList();
        }
    };

    var bindCommand = function (eventName, keyCode, commandName) {
        if (eventName === "click") {
            onClickedMap[keyCode].registerEvent(commandName);
            return;
        }
        if (eventName === "press") {
            onPressedMap[keyCode].registerEvent(commandName);
        }
    };

    var unBindCommand = function (eventName, keyCode, index) {
        if (eventName === "click") {
            onClickedMap[keyCode].unRegisterEvent(index);
            return;
        }
        if (eventName === "press") {
            onPressedMap[keyCode].unRegisterEvent(index);
        }
    };

    var update = function () {
        for (var i = 0 ; i < gEngine.Input.keys.LastKeyCode;i++) {
            if (gEngine.Input.isKeyClicked(i)) {
                onClickedMap[i].excuteEvent();
            }
            if (gEngine.Input.isKeyPressed(i)) {
                onPressedMap[i].excuteEvent();
            }
        }
    };

    var mPublic = {
        bindCommand: bindCommand,
        unBindCommand: unBindCommand,
        update: update,
        initManager: initManager
    };

    return mPublic;
}());