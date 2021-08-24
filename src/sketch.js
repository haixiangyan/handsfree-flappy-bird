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

  pipes.forEach((pipe, index) => {
    pipe.update();
    pipe.show();

    if (pipe.offscreen()) {
      pipes.splice(index, 1);
    }
  })

  if (frameCount % 100 === 0) {
    pipes.push(new Pipe());
  }
}

function keyPressed() {
  if (key === ' ') {
    bird.up()
  }
}
