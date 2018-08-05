"use scrict";

Map.prototype.getCamera = function(pos, percent, viewConfig) {
    var camera = new Camera(
        vec2.fromValues(pos[0], pos[1]),
        Math.round(percent * this.mWidth),
        viewConfig
        );
    camera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    return camera;
};

Map.prototype.pixelCenter = function(pos) {
    var x = pos % this.mWidth + 0.5;
    var y = this.mHeight - Math.floor(pos / this.mWidth) - 0.5;
    return [x, y];
};

Map.prototype.reducePoint = function(x, y) {
    return this.mWidth * Math.round(this.mHeight - 0.5 - y) + Math.round(x - 0.5);
};

Map.prototype.detectEvent = function (game, x, y, dir) {
    game.mShowHintIcon = false;
    if (document.mEventMutex) return ;
    var posPoint = this.reducePoint(x, y);
    var e = null;
    var flag = false;
    if (Math.floor(this.mData[posPoint] % 100 / 10) >= 1) {
        var eList = this.mEvents[this.mEventIndex[posPoint]];

        // 是否已经结束
        if (eList && eList[eList.length - 1] >= eList.length - 2) {
            // 是否重复触发
            if (eList[eList.length - 2]) {
                eList[eList.length - 1] = 0;
                flag = true;
            }
        } else {
            flag = (eList);
        }
        if (flag) {
            e = GameEvents.handle(eList[eList[eList.length - 1]]);
        }
    }
    if (e) {
        eList[eList.length - 1]++;
        return e;
    }

    var nextStepPoint = this.nextToNPC(posPoint, x, y, dir);
    if (nextStepPoint) {
        var eList = this.mEvents[this.mEventIndex[nextStepPoint]];
        if (eList && eList[eList.length - 1] >= eList.length - 2) {
            if (eList[eList.length - 2]) {
                eList[eList.length - 1] = 0;
                flag = true;
            }
        } else {
            flag = (eList);
        }
        if (flag) {
            game.mShowHintIcon = true;
            e = GameEvents.handle(eList[eList[eList.length - 1]]);

        }
    }
    if (e) {
        this.NPCDir(game, nextStepPoint, dir);
        eList[eList.length - 1]++;
        return e;
    }
    return null;
};

Map.prototype.initNPC = function() {
    if (!this.mNPC) return [];
    var npc = [];
    var i;
    for (i = 0; i < this.mNPC.length; ++i) {
        kPic = "assets/NPC/" + this.mName + "-npc" + String(i + 1) + ".png";
        kJson = "assets/NPC/" + this.mName + "-npc" + String(i + 1) + ".json";
        npc.push(new MyNPC(kPic, kJson));
    }
    return npc;
}

function opposite(dir) {
    switch (dir) {
        case "Up":
        return "Down";
        break;
        case "Left":
        return "Right";
        break;
        case "Down":
        return "Up";
        break;
        case "Right":
        return "Left";
        break;
    }
}

Map.prototype.NPCDir = function(game, posPoint, dir) {
    if (!this.mNPC) return ;
    var idx = null;
    var i;
    for (i = 0; i < this.mNPC.length; ++i)
        if (this.mNPC[i] == posPoint) {
            idx = i;
            break;
        }
    if (idx === null) return ;
    game.mMyNPC[idx].stand(opposite(dir));
};

Map.prototype.canWalk = function(x, y, dir) {
    var posPoint1 = this.reducePoint(x + 0.2, y - 0.4);
    var posPoint2 = this.reducePoint(x - 0.2, y);
    if (!this.canWalkDirection(posPoint1, x, y, dir)) {
        return false;
    }
    if (!this.canWalkDirection(posPoint2, x, y, dir)) {
        return false;
    }
    return true;
};

Map.prototype.nextToNPC = function(posPoint, x, y, dir) {
    var nextStepPoint = null;
    switch(dir) {
        case "Up":
        nextStepPoint = posPoint - this.mWidth;
        if (nextStepPoint < 0)
            return null;
        if (Math.floor(this.mData[nextStepPoint] / 10) >= 21) {
            var nextStepVec = this.pixelCenter(nextStepPoint);
            if (y + 1 > nextStepVec[1])
                return nextStepPoint;
        }
        break;
        case "Right":
        if (posPoint % this.mWidth == this.mWidth - 1) return null;
        nextStepPoint = posPoint + 1;
        if (nextStepPoint > this.mData.length)
            return null;
        if (Math.floor(this.mData[nextStepPoint] / 10) >= 21) {
            var nextStepVec = this.pixelCenter(nextStepPoint);
            if (x + 1 > nextStepVec[0])
                return nextStepPoint;
        }
        break;
        case "Down":
        nextStepPoint = posPoint + this.mWidth;
        if (nextStepPoint > this.mData.length)
            return null;
        if (Math.floor(this.mData[nextStepPoint] / 10) >= 21) {
            var nextStepVec = this.pixelCenter(nextStepPoint);
            if (y - 1 < nextStepVec[1])
                return nextStepPoint;
        }
        break;
        case "Left":
        if (posPoint % this.mWidth == 0) return null;
        nextStepPoint = posPoint - 1;
        if (nextStepPoint < 0)
            return null;
        if (Math.floor(this.mData[nextStepPoint] / 10) >= 21) {
            var nextStepVec = this.pixelCenter(nextStepPoint);
            if (x - 1 < nextStepVec[0])
                return nextStepPoint;
        }
        break;
    }
    return null;
}

Map.prototype.canWalkDirection = function(posPoint, x, y, dir) {
    var nextStepPoint = null;
    switch(dir) {
        case "Up":
        nextStepPoint = posPoint - this.mWidth;
        if (nextStepPoint < 0)
            return true;
        if (Math.floor(this.mData[nextStepPoint] / 100) == 2 || Math.abs(this.mData[nextStepPoint] % 10 - this.mData[posPoint] % 10) > 1) {
            var nextStepVec = this.pixelCenter(nextStepPoint);
            if (y + 1 > nextStepVec[1])
                return false;
        }
        break;
        case "Right":
        if (posPoint % this.mWidth == this.mWidth - 1) return true;
        nextStepPoint = posPoint + 1;
        if (nextStepPoint > this.mData.length)
            return true;
        if (Math.floor(this.mData[nextStepPoint] / 100) == 2 || Math.abs(this.mData[nextStepPoint] % 10 - this.mData[posPoint] % 10) > 1) {
            var nextStepVec = this.pixelCenter(nextStepPoint);
            if (x + 1 > nextStepVec[0])
                return false;
        }
        break;
        case "Down":
        nextStepPoint = posPoint + this.mWidth;
        if (nextStepPoint > this.mData.length)
            return true;
        if (Math.floor(this.mData[nextStepPoint] / 100) == 2 || Math.abs(this.mData[nextStepPoint] % 10 - this.mData[posPoint] % 10) > 1) {
            var nextStepVec = this.pixelCenter(nextStepPoint);
            if (y - 1 < nextStepVec[1])
                return false;
        }
        break;
        case "Left":
        if (posPoint % this.mWidth == 0) return true;
        nextStepPoint = posPoint - 1;
        if (nextStepPoint < 0)
            return true;
        if (Math.floor(this.mData[nextStepPoint] / 100) == 2 || Math.abs(this.mData[nextStepPoint] % 10 - this.mData[posPoint] % 10) > 1) {
            var nextStepVec = this.pixelCenter(nextStepPoint);
            if (x - 1 < nextStepVec[0])
                return false;
        }
        break;
    }
    return true;
};
