JSpec.describe("A bike", function () {
  var bike;
  before_each(function () {
    bike = new Troncycles.Bike();
    bike.stage = recorderMock("add");
    bike.makeWall();
  });
  it("should provide bounding points in all directions", function () {
    var expected  = [{x: 40, y: 40}, {x: 60, y: 60}];

    bike.position = {x: 50, y: 50};
    expect(bike.getBoundingPoints()).to(eql, expected);
  });
  it("should mark old walls as complete", function () {
    bike.makeWall();
    expect(bike.walls[0].complete).to(be_true);
    expect(_.last(bike.walls).complete).not_to(be_true);
  });
  it("should not collide with it's own unfinished wall", function () {
    expect(bike.walls[0].bike).to(eql, bike);
    expect(bike.walls[0].completed).not_to(be_true);
    expect(bike.isCollidable(bike.walls[0])).not_to(be_true);
  });
});
