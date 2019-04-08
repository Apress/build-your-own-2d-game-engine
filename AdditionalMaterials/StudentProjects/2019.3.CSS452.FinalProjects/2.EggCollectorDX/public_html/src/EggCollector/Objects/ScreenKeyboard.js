"use strict";

function ScreenKeyboard(keycodes) {
    window.onkeydown = function(e) {
        if (e.keyCode === 32 && e.target === document.body) {
            e.preventDefault();
        }
    };
    
    var keyboardKeys = [];
    keycodes.forEach(function(keycode) {
        var keyboardKey = {
            "keycode": keycode,
            "element": document.getElementById("key" + (keycode !== 32 ? String.fromCharCode(keycode) : "Space")) // EWWW! fix me
        };
        keyboardKey.element.addEventListener('mousedown', function (e) {
            window.dispatchEvent(new KeyboardEvent('keydown', {'key':String.fromCharCode(keyboardKey.keycode) }));
        });
        keyboardKey.element.addEventListener('mouseup', function (e) {
            window.dispatchEvent(new KeyboardEvent('keyup', {'key':String.fromCharCode(keyboardKey.keycode) }));
        });
        
        keyboardKeys.push(keyboardKey);
    });
    
    this.mKeyboardKeys = keyboardKeys;
}

ScreenKeyboard.prototype.update = function() {
    var self = this;
    this.mKeyboardKeys.forEach(function(keyboardKey) {
        if (gEngine.Input.isKeyClicked(keyboardKey.keycode)) {
            self._setKeyClicked(keyboardKey.element);
        }
        else if (gEngine.Input.isKeyReleased(keyboardKey.keycode)) {
            self._setKeyReleased(keyboardKey.element);
        }
    });
};

ScreenKeyboard.prototype._setKeyClicked = function(e) {
    e.getElementsByTagName("p")[0].classList.add("key-pressed");
    e.getElementsByTagName("img")[0].classList.add("key-pressed");
    e.getElementsByTagName("img")[1].classList.add("key-pressed");
};

ScreenKeyboard.prototype._setKeyReleased = function(e) {
    e.getElementsByTagName("p")[0].classList.remove("key-pressed");
    e.getElementsByTagName("img")[0].classList.remove("key-pressed");
    e.getElementsByTagName("img")[1].classList.remove("key-pressed");
};