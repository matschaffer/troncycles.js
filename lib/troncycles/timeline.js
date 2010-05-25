Troncycles.Timeline = function () {
  this.listeners = [];
};

Troncycles.Timeline.prototype = {
  tick: function () {
    _.each(this.listeners, function (listener) {
        listener();
      });
  },
  run: function () {
    this.tick();
  },
  addListener: function (listener) {
    this.listeners.push(listener);
  }
};
