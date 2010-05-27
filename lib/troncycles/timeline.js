Troncycles.Timeline = function () {
  this.listeners = [];
  this.frame = 0;
};

Troncycles.Timeline.prototype = {
  delay: 1,
  tick: function () {
    _.each(this.listeners, function (listener) {
        listener(this.frame);
      });

    if (this.running) {
      this.cycle();
    }
  },
  cycle: function () {
    var fn = _.bind(this.tick, this);

    this.frame = this.frame + 1;

    if (this.delay) {
      setTimeout(fn, this.delay);
    } else {
      window.setZeroTimeout(fn);
    }
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
