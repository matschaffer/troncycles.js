$(function () {
  var stage = new Troncycles.Stage(500, 500),
      playerBike = new Troncycles.Bike();

  stage.add(playerBike);
  setTimeout(function () {
      playerBike.direction = Math.PI / 2;
    }, 1000);
  stage.timeline.run();
});
