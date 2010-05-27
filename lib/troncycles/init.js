$(function () {
  var stage = new Troncycles.Stage(500, 500),
      playerBike = new Troncycles.Bike();

  stage.add(playerBike);

  $("body").keydown(_.bind(playerBike.keyboardSteering, playerBike));

  stage.timeline.run();
});
