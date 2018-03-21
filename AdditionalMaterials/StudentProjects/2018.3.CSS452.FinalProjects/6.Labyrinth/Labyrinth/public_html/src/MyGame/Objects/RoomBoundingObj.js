/*
 * File: RoomBoundingObj.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function RoomBoundingObj() {
    var r0,r1,r2,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,r13,r14,r15,r16,r17,r18,r19,r20;
    var h0,h1,h2,h3,h4,h5,h6,h7,h8,h9,h11,h13,h14,h15,h16,h17,h18,h19,h20,h21,h22,h23,h24; 
    
    // Initialize varaibles here
    function Room(posX, posY, width, height) 
    {
        posX = (posX / 2048) * 400 - 200;
        posY = 100 - (posY / 1024) * 200;
        width = (width / 2048) * 400;
        height = (height / 1024) * 200;
        var roomObj = new Renderable();
        roomObj.setColor([0,0,0,0]);
        roomObj.getXform().setPosition(posX, posY);
        roomObj.getXform().setSize(width, height);
        GameObject.call(this, roomObj);
    }
    gEngine.Core.inheritPrototype(Room, GameObject);
    
    r0 = new Room(1027, 516, 504, 278);
    r1 = new Room(607, 482, 168, 138);
    r2 = new Room(607, 742, 168, 106);
    r3 = new Room(879, 898, 210, 210);
    r4 = new Room(503, 933, 380, 140);
    r5 = new Room(165, 933, 128, 140);
    r6 = new Room(166, 725, 210, 140);
    r7 = new Room(185, 482, 168, 138);
    r8 = new Room(396, 465, 254, 104);
    r9 = new Room(253, 221, 300, 172);
    r10 = new Room(776, 238, 336, 138);
    r11 = new Room(1362, 80, 592, 110);
    r12 = new Room(1929, 119, 134, 180);
    r13 = new Room(1903, 275, 82, 132);
    r14 = new Room(1903, 515, 82, 348);
    r15 = new Room(1984, 519, 80, 98);
    r16 = new Room(1917, 846, 194, 314);
    r17 = new Room(1382, 915, 624, 176);
    r18 = new Room(1555, 670, 274, 106);
    r19 = new Room(1507, 377, 212, 208);
    r20 = new Room(165, 603, 128, 104); 
    h0 = new Room(733, 433, 84, 40);
    h1 = new Room(855, 342, 78, 70);
    h2 = new Room(856, 724, 78, 138);
    h3 = new Room(754, 737, 126, 40);
    h4 = new Room(1340, 436, 122, 40);
    h5 = new Room(599, 620, 78, 138);
    h6 = new Room(599, 829, 78, 68);
    h7 = new Room(733.5, 951, 81, 40);
    h8 = new Room(271, 951, 84, 40);
    h9 = new Room(167, 829, 78, 68);
    h11 = new Room(505.5, 189, 205, 40);
    h13 = new Room(1403, 189, 918, 40);
    h14 = new Room(1189, 152, 78, 34);
    h15 = new Room(1502, 152, 78, 34);
    h16 = new Room(1760, 80, 204, 40);
    h17 = new Room(1504, 549, 78, 136);
    h18 = new Room(1777, 637, 170, 40);
    h19 = new Room(1577, 775, 78, 104);
    h21 = new Room(1757, 896, 126, 40);
    h22 = new Room(1503, 241, 78, 64);
    h23 = new Room(1027, 951, 86, 40);
    
    this.mRooms = [
      r0,
      r1,
      r2,
      r3,
      r4,
      r5,
      r6,
      r7,
      r8,
      r9,
      r10,
      r11,
      r12,
      r13,
      r14,
      r15,
      r16,
      r17,
      r18,
      r19,
      r20, 
      h0,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      h7,
      h8,
      h9,
      h11,
      h13,
      h14,
      h15,
      h16,
      h17,
      h18,
      h19,
      h21,
      h22,
      h23
    ];

    this.mHallways = [
        [h0, h1, h4, h2],
        [h0, h5, r8],
        [h3, h5, h6],
        [h2, h7, h23],
        [h6, h7, h8],
        [h8, h9],
        [h9, r20],
        [r20, r8],
        [r7, r1],
        [h11],
        [h1, h11, h13],
        [h14, h15, h16],
        [h13, h16, r13],
        [r12, r14],
        [r13, r15, r16, h18],
        [r14],
        [r14, h21],
        [h19, h21, h23],
        [h17, h18, h19],
        [h4, h17, h22],
        [r7, r6], 
        [r1, r0],
        [r10, r0],
        [h3, r0, r3],
        [h2, r2],
        [r0, r19],
        [r1, r2],
        [r2, r4],
        [r3, r4],
        [r4, r5],
        [r5, r6],
        [r9, r10],
        [r10, r12, h14, h15, h22],
        [h13, r11],
        [r11, h13],
        [r11, r12],
        [r18, r19],
        [r18, r14],
        [r17, r18],
        [r16, r17],
        [h13, r19],
        [r3, r17]
    ];
};

RoomBoundingObj.prototype.draw = function (cam) {
    for(var i = 0; i < this.mRooms.length; ++i)
    {
        this.mRooms[i].draw(cam);
    }
};

RoomBoundingObj.prototype.getRooms = function () {
    return this.mRooms;
};

RoomBoundingObj.prototype.getHallways = function () {
    return this.mHallways;
};

RoomBoundingObj.prototype.getBedBBox = function () {
    var posX = 2.73;
    var posY = 15.04;
    var width = 15.625;
    var height = 22.27;
    return new BoundingBox([posX, posY], width, height);
};
