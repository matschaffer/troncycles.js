$(function () {
  var stage = new Troncycles.Stage(500, 500);
  stage.add(new Troncycles.Bike());
  stage.timeline.run();
});
