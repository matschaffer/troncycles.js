Troncycles.Timeline = function () {
  this.listeners = [];
  this.frame = 0;
};

Troncycles.Timeline.prototype = {
  delay: 0,
  tick: function () {
    _.each(this.listeners, function (listener) {
        listener();
      });

    if (this.running) {
      this.cycle();
    }
  },
  cycle: function () {
    this.frame = this.frame + 1;
    setTimeout(_.bind(this.tick, this), 0);
  },
  run: function () {
    this.running = true;
    this.cycle();
  },
  stop: function () {
    this.running = false;
  },
  addListener: function (listener) {
    this.listeners.push(listener);
  }
};
