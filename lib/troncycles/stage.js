Troncycles.Stage = function (width, height) {
  var canvas = $("<canvas width='" + width + "' height='" + height + "' />");
  canvas.appendTo("body");

  this.ctx = canvas[0].getContext("2d");
  this.timeline = new Troncycles.Timeline();
  this.timeline.addListener(_.bind(this.draw, this));
  this.sprites = [];
  this.bikes = [];
  this.walls = [];
};

Troncycles.Stage.prototype = {
  add: function (sprite) {
    sprite.ctx = this.ctx;
    sprite.stage = this;
    this.sprites.unshift(sprite);
    if (sprite instanceof Troncycles.Wall) {
      this.walls.unshift(sprite);
    }
    if (sprite instanceof Troncycles.Bike) {
      this.bikes.unshift(sprite);
    }
  },
  draw: function () {
    _.each(this.sprites, function (sprite) {
        sprite.draw();
      });
    this.checkCollisions();
  },
  checkCollisions: function () {
    var bikes = this.bikes;
    _.each(this.walls, function(wall) {
      _.each(bikes, function(bike) {
        if (wall.checkCollision(bike)) {
          bike.collided(wall);
        }
      });
    });
  }
};

