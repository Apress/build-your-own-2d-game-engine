"use strict";

function MiniIcon(texture, transformToFollow) {
    SpriteRenderable.call(this, texture);
    
    this.mTransformToFollow = transformToFollow;
}

gEngine.Core.inheritPrototype(MiniIcon, SpriteRenderable);

MiniIcon.prototype.update = function () {
    var position = this.mTransformToFollow.getPosition();
    
    SpriteRenderable.prototype.getXform.call(this).setPosition(position[0], position[1]);
};
