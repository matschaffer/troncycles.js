Troncycles.Wall = function (start, direction, length) {
  this.start = start;
  this.direction = direction;
  this.length = length;
};

Troncycles.Wall.prototype = {
  width: 6,
  halfWidth: 3,
  color: "#f00",
  draw: function () {
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
};
