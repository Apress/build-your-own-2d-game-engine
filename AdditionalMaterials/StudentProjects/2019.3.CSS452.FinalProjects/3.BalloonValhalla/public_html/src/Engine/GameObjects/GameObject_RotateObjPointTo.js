
"strict"

// Orientate the entire object to point towards point p
// will rotate Xform() accordingly
GameObject.prototype.rotateObjPointTo = function (p, rate) {
    // Step A: determine if reach the destination position p
    var dir = [];
    vec2.sub(dir, p, this.getXform().getPosition());
    var len = vec2.length(dir);
    if (len < Number.MIN_VALUE) {
        return; // we are there.
    }
    vec2.scale(dir, dir, 1 / len);

    // Step B: compute the angle to rotate
    var fdir = this.getCurrentFrontDir();
    var cosTheta = vec2.dot(dir, fdir);

    if (cosTheta > 0.999999) { // almost exactly the same direction
        return;
    }

    // Step C: clamp the cosTheda to -1 to 1 
    // in a perfect world, this would never happen! BUT ...
    if (cosTheta > 1) {
        cosTheta = 1;
    } else {
        if (cosTheta < -1) {
            cosTheta = -1;
        }
    }

    // Step D: compute whether to rotate clockwise, or counterclockwise
    var dir3d = vec3.fromValues(dir[0], dir[1], 0);
    var f3d = vec3.fromValues(fdir[0], fdir[1], 0);
    var r3d = [];
    vec3.cross(r3d, f3d, dir3d);

    var rad = Math.acos(cosTheta);  // radian to roate
    if (r3d[2] < 0) {
        rad = -rad;
    }

    // Step E: rotate the facing direction with the angle and rate
    rad *= rate;  // actual angle need to rotate from Obj's front
    vec2.rotate(this.getCurrentFrontDir(), this.getCurrentFrontDir(), rad);
    this.getXform().incRotationByRad(rad);
};