let bird;

function setup() {
  let canvas = createCanvas(640, 480)
  canvas.parent('#sketch-container');

  bird = new Bird();
}

function draw() {
  background('#000')

  bird.update();
  bird.show();
}
