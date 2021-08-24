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

  bird.show();
  bird.update();

  for(let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      console.log('HIT')
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  if (frameCount % 100 === 0) {
    pipes.push(new Pipe());
  }
}

function keyPressed() {
  if (key === ' ') {
    bird.up()
  }
}
