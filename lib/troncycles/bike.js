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
  dimensions: {
    width: 20,
    height: 20,
    wall: 6
  },
  clear: function () {
    this.ctx.clearRect(this.position.x - this.dimensions.halfWidth,
                       this.position.y - this.dimensions.halfHeight,
                       this.dimensions.width,
                       this.dimensions.height);
  },
  drawWall: function () {
    this.ctx.fillStyle = this.wallColor;
    this.ctx.fillRect(this.position.x - this.dimensions.halfWidth,
                      this.position.y - this.dimensions.halfWall,
                      this.speed,
                      this.dimensions.wall);
  },
  drawBike: function () {
    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y,
                 this.dimensions.halfHeight, 0, Math.PI*2, true);
    this.ctx.closePath();
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  },
  draw: function () {
    this.clear();
    this.drawWall();
    this.position.x = this.position.x + this.speed;
    this.drawBike();
  }
};
