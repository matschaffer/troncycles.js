Troncycles.Bike = function () {
  var self = this;

  this.position = { x: 50, y: 50 };

  _.each(this.dimensions, function (value, dimension) {
      var halfName = "half" + dimension[0].toUpperCase() + dimension.substr(1);
      self.dimensions[halfName] = value / 2;
    });

  this.walls = [];
};

Troncycles.Bike.prototype = {
  color: "#a00",
  speed: 1,
  direction: 0,
  dimensions: {
    width: 20,
    height: 20,
  },
  clear: function () {
    this.ctx.clearRect(-this.dimensions.halfWidth,
                       -this.dimensions.halfHeight,
                       this.dimensions.width,
                       this.dimensions.height);
  },
  makeWall: function () {
    var wall = new Troncycles.Wall(_.clone(this.position), this.direction, 1);
    this.walls.push(wall);
    this.stage.add(wall);
  },
  drawBike: function () {
    this.ctx.beginPath();
    this.ctx.arc(this.speed, 0, this.dimensions.halfHeight, 0, Math.PI*2);
    this.ctx.closePath();
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  },
  draw: function () {
    if (_.isEmpty(this.walls) || _.last(this.walls).direction != this.direction) {
      this.makeWall();
    } else {
      _.last(this.walls).length++;
    }
    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y);
    this.ctx.rotate(this.direction);
    this.clear();
    this.drawBike();
    this.ctx.restore();
    this.position.x = this.position.x + Math.round(Math.cos(this.direction));
    this.position.y = this.position.y + Math.round(Math.sin(this.direction));
  },
  keys: {
    37: Math.PI / -2,
    39: Math.PI / 2
  },
  keyboardSteering: function (evt) {
    if (this.keys[evt.keyCode]) {
      this.direction = this.direction + this.keys[evt.keyCode];
    }
  }
};
