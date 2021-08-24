let bird;
let pipes = [];

function setup() {
  let canvas = createCanvas(640, 480)
  canvas.parent('#sketch-container');

  bird = new Bird();
  pipes.push(new Pipe())
}

function draw() {
  background('#000')

  bird.update();
  bird.show();

  pipes.forEach(pipe => {
    pipe.update();
    pipe.show();
  })
}

function keyPressed() {
  if (key === ' ') {
    bird.up()
  }
}
