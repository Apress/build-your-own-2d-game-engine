/* global BoundingBox: false */
"use strict";

function WorldBounds(centerPos, width, height) {
    this.mBounds = new BoundingBox(centerPos, width, height);
}

WorldBounds.prototype.outsideBounds = function (gameObject) {
    var status = this.mBounds.boundCollideStatus(gameObject.getBBox());
    return status === BoundingBox.eboundCollideStatus.eOutside;
};