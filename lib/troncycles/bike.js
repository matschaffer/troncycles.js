Troncycles.Bike = function () {
  var self = this;

  this.position = { x: 50, y: 50 };

  _.each(this.dimensions, function (value, dimension) {
      var halfName = "half" + dimension[0].toUpperCase() + dimension.substr(1);
      self.dimensions[halfName] = value / 2;
    });
};

Troncycles.Bike.prototype = {
  color: "#a00",
  wallColor: "#f00",
  speed: 1,
  direction: (Math.PI / 2) * 3,
  dimensions: {
    width: 20,
    height: 20,
    wall: 6
  },
  clear: function () {
    this.ctx.clearRect(-this.dimensions.halfWidth,
                       -this.dimensions.halfHeight,
                       this.dimensions.width,
                       this.dimensions.height);
  },
  drawWall: function () {
    this.ctx.fillStyle = this.wallColor;
    this.ctx.fillRect(-this.dimensions.halfWidth,
                      -this.dimensions.halfWall,
                      this.speed,
                      this.dimensions.wall);
  },
  drawBike: function () {
    this.ctx.beginPath();
    this.ctx.arc(this.speed, 0, this.dimensions.halfHeight, 0, Math.PI*2);
    this.ctx.closePath();
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  },
  draw: function () {
    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y);
    this.ctx.rotate(this.direction);
    this.clear();
    this.drawWall();
    this.drawBike();
    this.ctx.restore();
    this.position.x = this.position.x + Math.round(Math.cos(this.direction));
    this.position.y = this.position.y + Math.round(Math.sin(this.direction));
  }
};
