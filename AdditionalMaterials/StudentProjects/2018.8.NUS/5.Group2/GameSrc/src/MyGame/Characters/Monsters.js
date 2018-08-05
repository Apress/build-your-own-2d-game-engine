function initMonsters() {
    window.Monsters = {
        "zhuzishan-xiyijing": new Character({
            "Name": "zhuzishan-xiyijing",
            "HP": 274,
            "VP": 99999999,
            "ATK": 47,
            "DEF": 62,
            "SPD": 30,
            "characterType": _C.Monster,
            "skills": [
                {
                    "name": "锤击",
                    "VP": 100,
                    "atkNumber": 28,
                    "defNumber": 20,
                    "turn": 3
                }
            ],
            "actionPolicy": new InTurnPolicy([0, -1]),
        }),
        "zhuzishanjiao-wangling": new Character({
            "Name": "zhuzishanjiao-wangling",
            "HP": 487,
            "VP": 99999999,
            "ATK": 41,
            "DEF": 92,
            "SPD": 30,
            "characterType": _C.Monster,
            "skills": [
                {
                    "name": "睡懒觉",
                    "VP": -18,
                    "HP": 26,
                    "atkPercent": 1.25
                }
            ],
            "actionPolicy": new RandomPolicy([0, -1]),
        }),
        "huoyanshankou-xiaozu": new Character({
            "Name": "huoyanshankou-xiaozu",
            "HP": 156,
            "VP": 99999999,
            "ATK": 72,
            "DEF": 240,
            "SPD": 30,
            "characterType": _C.Monster,
            "skills": [
                {
                    "name": "撕咬",
                    "VP": 58,
                    "dmg": 12,
                }
            ],
            "actionPolicy": new InTurnPolicy([0, -1, -1]),
        }),
        "huoyanshandi-xiaozu": new Character({
            "Name": "huoyanshandi-xiaozu",
            "HP": 170,
            "VP": 99999999,
            "ATK": 78,
            "DEF": 250,
            "SPD": 30,
            "characterType": _C.Monster,
            "skills": [
                {
                    "name": "撕咬",
                    "VP": 66,
                    "dmg": 17
                }
            ],
            "actionPolicy": new InTurnPolicy([0, -1, -1]),

        }),
        "huoyanshandi-heifengguai": new Character({
            "Name": "huoyanshandi-heifengguai",
            "HP": 260,
            "VP": 99999999,
            "ATK": 68,
            "DEF": 280,
            "SPD": 30,
            "characterType": _C.Monster,
            "skills": [
                {
                    "name": "睡懒觉",
                    "VP": -20,
                    "HP": 33,
                    "atkPercent": 1.10
                },
                {
                    "name": "狂怒",
                    "VP": 100,
                    "dmgPercent": 1.12,
                    "atkNumber": 12,
                    "turn": 99999
                }
            ],
            "actionPolicy": new InTurnPolicy([1, -1, 0, -1]),
        }),
        "shishi2-huangfengguai": new Character({
            "Name": "shishi2-huangfengguai",
            "HP": 430,
            "VP": 99999999,
            "ATK": 76,
            "DEF": 113,
            "SPD": 30,
            "characterType": _C.Monster,
            "skills": [
                {
                    "name": "生命抽取",
                    "VP": 25,
                    "dmgPercent": 1.24,
                    "recoverPercent": 0.85,
                },
                {
                    "name": "剧毒尾针",
                    "VP": 200,
                    "dmgPercent": 0.3,
                    "defPercent": 0.6,
                    "continuousDmg": 24,
                    "turn": 4
                }
            ],
            "actionPolicy": new InTurnPolicy([1, 0, 0, -1]),
        }),
    };
}
