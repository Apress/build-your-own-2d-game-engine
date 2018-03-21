/* 
 * David Watson
 * CSS 490C
 * 2D Game Engine Design
 * File: BoundingBox.js 
 * 
 * This is the file that encapsulates our bounding box functionality
 */

function BoundingBox(centerPos, w, h) {
    this.mLL = vec2.fromValues(0, 0);  // the lower-left corner position
    this.setBounds(centerPos, w, h);
}

BoundingBox.prototype.setBounds = function (centerPos, w, h) {
    this.mWidth = w;
    this.mHeight = h;
    this.mLL[0] = centerPos[0] - (w / 2);
    this.mLL[1] = centerPos[1] - (h / 2);
};

BoundingBox.eboundCollideStatus = Object.freeze({
    eCollideLeft: 1,
    eCollideRight: 2,
    eCollideTop: 4,
    eCollideBottom: 8,
    eInside: 16,
    eOutside: 0
});

BoundingBox.prototype.containsPoint = function (x, y) {
    return ((x > this.minX()) && (x < this.maxX()) &&
            (y > this.minY()) && (y < this.maxY()));
};

BoundingBox.prototype.intersectsBound = function (otherBound) {
    return ((this.minX() < otherBound.maxX()) &&
            (this.maxX() > otherBound.minX()) &&
            (this.minY() < otherBound.maxY()) &&
            (this.maxY() > otherBound.minY()));
};

BoundingBox.prototype.boundCollideStatus = function (otherBound) {
    var status = BoundingBox.eboundCollideStatus.eOutside;
    if (this.intersectsBound(otherBound)) {
        if (otherBound.minX() < this.minX())
            status |= BoundingBox.eboundCollideStatus.eCollideLeft;
        if (otherBound.maxX() > this.maxX())
            status |= BoundingBox.eboundCollideStatus.eCollideRight;
        if (otherBound.minY() < this.minY())
            status |= BoundingBox.eboundCollideStatus.eCollideBottom;
        if (otherBound.maxY() > this.maxY())
            status |= BoundingBox.eboundCollideStatus.eCollideTop;
        // if the bounds intersects and yet none of the sides overlaps
        // otherBound is completely inside thisBound
        if (status === BoundingBox.eboundCollideStatus.eOutside)
            status = BoundingBox.eboundCollideStatus.eInside;
    }
    return status;
};

BoundingBox.prototype.minX = function () { return this.mLL[0]; };
BoundingBox.prototype.maxX = function () { return this.mLL[0] + this.mWidth; };
BoundingBox.prototype.minY = function () { return this.mLL[1]; };
BoundingBox.prototype.maxY = function () { return this.mLL[1] + this.mHeight;};