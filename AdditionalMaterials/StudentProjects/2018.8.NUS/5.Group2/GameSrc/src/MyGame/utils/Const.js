let _C = {
    gameViewport: [0, 0, 970, 600],       // viewport (orgX, orgY, width, height)
    attackVP: 25,
    turnRecoverVP: 29,
    combatSpeed: 6.5,
    HPColor: [252 / 255, 60 / 255, 60 / 255, 1],
    atkPunishTired: 0.40,
    // action
    none: 0,
    attack: 1,
    skill: 2,
    change: 3,
    item: 4,

    // game status
    waiting: 1,
    commandGiven: 2,
    displaying: 3,
    // character status
    BuffStatus: 1,
    changeHP: 2,
    changeVP: 3,

    // Buff type
    numeric: 0,
    percent: 1,

    // character type
    Monster: "怪物",
    Hero: "角色",
};

const TURN = {
    monster: 0,
    hero: 1
};

const ALL_SPRITE_TEXTURE = [
    "assets/hero/fight/Monk Tang.png",
    "assets/hero/fight/Monkey King.png",
    "assets/hero/fight/The Pigsy.png",
];
