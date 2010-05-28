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
  wallColor: "#f00",
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
    var wall = new Troncycles.Wall(this);
    if (_.last(this.walls)) {
      _.last(this.walls).complete = true;
    }
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
    var lastWall = _.last(this.walls);
    if (!lastWall || _.last(this.walls).direction != this.direction) {
      this.makeWall();
    } else {
      lastWall.length = lastWall.length + this.speed;
    }
    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y);
    this.ctx.rotate(this.direction);
    this.clear();
    this.drawBike();
    this.ctx.restore();
    this.position.x = this.position.x + this.speed * Math.round(Math.cos(this.direction));
    this.position.y = this.position.y + this.speed * Math.round(Math.sin(this.direction));
  },
  left: function () {
    this.direction = this.direction - Math.PI / 2;
  },
  right: function () {
    this.direction = this.direction + Math.PI / 2;
  },
  keyboardSteering: function () {
    var keys = { 37: _.bind(this.left, this),
                 39: _.bind(this.right, this) },
        keyedTurn = function (evt) {
          (keys[evt.keyCode] || $.noop)();
        };

    $("body").keydown(keyedTurn);
  },
  randomSteering: function () {
    var maxDelay = 1000,
        turns = [ _.bind(this.left, this), _.bind(this.right, this) ],
        randomTime = function () {
          return Math.round(maxDelay * Math.random());
        },
        randomTurn = function () {
          turns[Math.round(Math.random())]();
        },
        loop = function () {
          setTimeout(function () {
            randomTurn();
            loop();
          }, randomTime());
        };

    loop();
  },
  getBoundingPoints: function () {
    return [ { x: this.position.x - this.dimensions.halfWidth,
               y: this.position.y - this.dimensions.halfHeight },
             { x: this.position.x + this.dimensions.halfWidth,
               y: this.position.y + this.dimensions.halfHeight } ];
  },
  isCollidable: function(wall) {
    return !(wall.bike == this && wall.completed != true);
  },
  collided: function (wall) {
    if (this.isCollidable(wall)) {
      console.log(this + " collided with " + wall);
      this.speed = 0;
    }
  }
};
