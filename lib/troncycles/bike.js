Troncycles.Bike = function () {
  this.position = { x: 50, y: 50 };
};

Troncycles.Bike.prototype = {
  draw: function () {
    this.ctx.clearRect(this.position.x - 10, this.position.y - 10,
                       20, 20);

    this.position.x = this.position.x + 1;

    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y,
                 10, 0, Math.PI*2, true); 
    this.ctx.closePath();
    this.ctx.fillStyle = "#fff";
    this.ctx.fill();
  }
};
