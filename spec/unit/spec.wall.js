JSpec.describe("A wall", function () {
  it("should provide bounding points in all directions", function () {
    var wall = new Troncycles.Wall({position: {x: 50, y: 50}}),
        points = {
          right: [{x: 50 - wall.halfWidth, y: 50 - wall.halfWidth},
                  {x: 55 + wall.halfWidth, y: 50 + wall.halfWidth}],
          down:  [{x: 50 - wall.halfWidth, y: 50 - wall.halfWidth},
                  {x: 50 + wall.halfWidth, y: 55 + wall.halfWidth}],
          left:  [{x: 45 - wall.halfWidth, y: 50 - wall.halfWidth},
                  {x: 50 + wall.halfWidth, y: 50 + wall.halfWidth}],
          up:    [{x: 50 - wall.halfWidth, y: 45 - wall.halfWidth},
                  {x: 50 + wall.halfWidth, y: 50 + wall.halfWidth}],
        };

    wall.length = 5;

    wall.setDirection(0);
    expect(wall.getBoundingPoints()).to(eql, points.right);

    wall.setDirection(Math.PI / 2);
    expect(wall.getBoundingPoints()).to(eql, points.down);

    wall.setDirection(Math.PI);
    expect(wall.getBoundingPoints()).to(eql, points.left);

    wall.setDirection(Math.PI * (3/2));
    expect(wall.getBoundingPoints()).to(eql, points.up);
  });

  it("should be able to identify collisions", function () {
    var wall = new Troncycles.Wall({}),
        bike = {};

    bike.getBoundingPoints = function () { return [{x: 10, y: 10}, {x: 30, y: 30}]; };
    wall.getBoundingPoints = function () { return [{x: 20, y: 20}, {x: 40, y: 40}]; };
    expect(wall.checkCollision(bike)).to(be_true);

    bike.getBoundingPoints = function () { return [{x: 20, y: 10}, {x: 40, y: 30}]; };
    wall.getBoundingPoints = function () { return [{x: 10, y: 20}, {x: 30, y: 40}]; };
    expect(wall.checkCollision(bike)).to(be_true);

    bike.getBoundingPoints = function () { return [{x: 20, y: 20}, {x: 40, y: 40}]; };
    wall.getBoundingPoints = function () { return [{x: 10, y: 10}, {x: 30, y: 30}]; };
    expect(wall.checkCollision(bike)).to(be_true);

    bike.getBoundingPoints = function () { return [{x: 10, y: 10}, {x: 20, y: 20}]; };
    wall.getBoundingPoints = function () { return [{x: 20, y: 20}, {x: 30, y: 30}]; };
    expect(wall.checkCollision(bike)).to(be_false);
  });
});
