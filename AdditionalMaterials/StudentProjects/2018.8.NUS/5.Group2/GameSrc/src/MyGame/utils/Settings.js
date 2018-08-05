"use strict";

class Settings {
    static setCombatTime(second) {
        const v = parseFloat(second);
        console.assert(v && v > 0);
        _C.combatSpeed = v * 10;
    }
}
