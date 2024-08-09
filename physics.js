////////////////////////////////////////////////////////////////
function setupGround() {
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}
////////////////////////////////////////////////////////////////
function drawGround() {
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller() {
  propeller = Bodies.rectangle(150, 480, 200, 15, { isStatic: true, angle: angle });
  World.add(engine.world, [propeller]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller() {
  push();
  drawVertices(propeller.vertices);
  angle += angleSpeed;
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, angleSpeed);
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird() {
  var bird = Bodies.circle(mouseX, mouseY, 20, {
    friction: 0,
    restitution: 0.95
  });
  Matter.Body.setMass(bird, bird.mass * 10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds() {
  push();
  for (var i = 0; i < birds.length; i++) {
    fill(137, 207, 240);
    drawVertices(birds[i].vertices);
    if (isOffScreen(birds[i])) {
      removeFromWorld(birds[i]);
      birds.splice(i, 1);
      i-- //this solves the issue where some boxes flicker
    }
  }
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower() {


  var stack = Composites.stack(650, 100, 3, 6, 1, 10, function (x, y) {
    boxes.push(Bodies.rectangle(x, y, 80, 80));
    return Bodies.rectangle(x, y, 80, 80);
  });

  // for(var i = 0; i < 3; i++){
  //    for(var j = 0; j < 6; j++){

  //     var box = Bodies.rectangle(i+30,j+30, 80, 80)
  //     boxes.push(box);
  //     World.add(engine.world, [box]);
  //    }

  //}
  World.add(engine.world, [stack]);

  boxes = Matter.Composite.allBodies(stack);

  for (var i = 0; i < boxes.length; i++) {
    colors.push(random(70, 255));
  }
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower() {
  push();
  for (var i = 0; i < boxes.length; i++) {
    fill(0, colors[i], 0);
    drawVertices(boxes[i].vertices);

  }
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot() {
  slingshotBird = Bodies.circle(200, 220, 20, {
    friction: 0,
    restitution: 0.95
  });
  Matter.Body.setMass(slingshotBird, slingshotBird.mass * 10);

  slingshotConstraint = Constraint.create({
    pointA: { x: 200, y: 190 },
    bodyB: slingshotBird,
    pointB: { x: 0, y: 0 },
    stiffness: 0.01,
    damping: 0.0001
  });

  World.add(engine.world, [slingshotBird, slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot() {
  push();
  fill(230, 0, 126)
  drawVertices(slingshotBird.vertices);
  drawConstraint(slingshotConstraint);
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction() {
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}
