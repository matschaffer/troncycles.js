Troncycles.Wall = function (bike) {
  this.color = bike.wallColor;
  this.start = _.clone(bike.position);
  this.length = 1;

  this.setDirection(bike.direction);
  this.bike = bike;
};

Troncycles.Wall.prototype = {
  width: 6,
  halfWidth: 3,
  setDirection: function(direction) {
    this.direction = direction;
    this.cos = Math.round(Math.cos(this.direction));
    this.sin = Math.round(Math.sin(this.direction));
  },
  draw: function () {
    if (!this.completed) {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.translate(this.start.x, this.start.y);
      this.ctx.rotate(this.direction);
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(this.length, 0);
      this.ctx.lineWidth = this.width;
      this.ctx.lineCap = "square";
      this.ctx.strokeStyle = this.color;
      this.ctx.stroke();
      this.ctx.restore();
    }
  },
  getBoundingPoints: function () {
    var points = [ _.clone(this.start),
                   { x: this.start.x + (this.cos * this.length),
                     y: this.start.y + (this.sin * this.length) } ];

    points = _.sortBy(points, function(p) {
        return p.x + p.y;
      });

    points[0].x = points[0].x - this.halfWidth;
    points[0].y = points[0].y - this.halfWidth;

    points[1].x = points[1].x + this.halfWidth;
    points[1].y = points[1].y + this.halfWidth;

    return points;
  },
  checkCollision: function (bike) {
    var w = this.getBoundingPoints(),
        b = bike.getBoundingPoints(),
        x = function () {
          return w[0].x < b[0].x && b[0].x < w[1].x ||
                 b[0].x < w[0].x && w[0].x < b[1].x;
        },
        y = function () {
          return w[0].y < b[0].y && b[0].y < w[1].y ||
                 b[0].y < w[0].y && w[0].y < b[1].y;
        };
    return x() && y();
  }
};
