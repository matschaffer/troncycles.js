$(function () {
  var stage = new Troncycles.Stage(500, 500),
      playerBike = new Troncycles.Bike(),
      aiBike = new Troncycles.Bike();

  stage.add(playerBike);
  stage.add(aiBike);

  playerBike.keyboardSteering();

  aiBike.color = "#00a";
  aiBike.wallColor = "#00f";
  aiBike.position = { x: 50, y: 200 };
  aiBike.randomSteering();

  stage.timeline.run();

  $("body").keypress(function (evt) {
    if (evt.keyCode == 32) {
      if (stage.timeline.running) {
        stage.timeline.stop();
      } else {
        stage.timeline.run();
      }
    }
  });
});
