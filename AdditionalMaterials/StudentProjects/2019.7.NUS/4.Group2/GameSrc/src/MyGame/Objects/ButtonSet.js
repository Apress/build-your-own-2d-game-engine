function ButtonSet() {
    GameObjectSet.call(this);
}
gEngine.Core.inheritPrototype(ButtonSet, GameObjectSet);

ButtonSet.prototype.update = function () {
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].update();
    }
};