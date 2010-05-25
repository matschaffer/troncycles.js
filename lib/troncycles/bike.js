Troncycles.Bike = function () {
};

Troncycles.Bike.prototype = {
  draw: function () {
    this.ctx.beginPath();
    this.ctx.arc(75, 75, 10, 0, Math.PI*2, true); 
    this.ctx.closePath();
    this.ctx.fillStyle = "#fff";
    this.ctx.fill();
  }
};
