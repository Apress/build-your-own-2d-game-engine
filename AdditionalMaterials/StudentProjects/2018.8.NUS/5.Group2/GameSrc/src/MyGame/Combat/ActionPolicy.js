/**
 * 怪物使用技能的策略。用数字表示不同的行动。-1表示普通攻击，0-3表示对应下标的技能。
 */
class ActionPolicy {
    constructor() {

    }

    getNextAction() {
        return -2;
    }
}

class defaultPolicy extends ActionPolicy {
    constructor() {
        super();
    }

    getNextAction() {
        return -1;
    }
}

/**
 * 轮流使用
 */
class InTurnPolicy extends ActionPolicy {
    /**
     * @param actions {number[]}
     */
    constructor(actions) {
        super();
        this.actions = actions;
        this.currentAction = 0;
    }

    getNextAction() {
        if (this.currentAction >= this.actions.length)
            this.currentAction = 0;
        return this.actions[this.currentAction++];
    }
}

class RandomPolicy extends ActionPolicy {
    /**
     * @param allowedActions {number[]}
     */
    constructor(allowedActions) {
        super();
        this.actions = allowedActions;
        this.currentAction = 0;
    }

    getNextAction() {
        const action = Math.floor(Math.random() * this.actions.length);
        return this.actions[action];
    }
}
