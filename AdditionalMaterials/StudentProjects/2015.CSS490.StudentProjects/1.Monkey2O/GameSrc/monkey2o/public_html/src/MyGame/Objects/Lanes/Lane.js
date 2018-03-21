'use strict';

function Lane(options) {
  var color = Lane.constants.colors[options.sequence % 2];
  
  this.mLane = new Renderable();
  this.mLane.setColor([color.r, color.g, color.b, 0]);
  this.mLane.getXform().setPosition(options.position.x, options.position.y);
  this.mLane.getXform().setSize(options.size.width, options.size.height);

  GameObject.call(this, this.mLane);
}

//------------------------------------------------------------------------------
gEngine.Core.inheritPrototype(Lane, GameObject);

//------------------------------------------------------------------------------
Lane.constants = Object.freeze({
  width: 10000,
  colors: [
    {
      r: 0.7,
      g: 0.7,
      b: 0.7
    },
    {
      r: 1,
      g: 1,
      b: 1
    }
  ]
});