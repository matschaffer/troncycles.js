Troncycles.Stage = function (width, height) {
  var canvas = $("<canvas width='" + width + "' height='" + height + "' />");
  canvas.appendTo("body");

  this.ctx = canvas[0].getContext("2d");
  this.timeline = new Troncycles.Timeline();
  this.timeline.addListener(_.bind(this.draw, this));
  this.sprites = [];
};

Troncycles.Stage.prototype = {
  add: function (sprite) {
    sprite.ctx = this.ctx;
    sprite.stage = this;
    this.sprites.unshift(sprite);
  },
  draw: function () {
    _.each(this.sprites, function (sprite) {
        sprite.draw();
      });
  }
};

