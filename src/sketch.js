let isGameOver = false;
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

  for(let index = pipes.length - 1; index >= 0; index--) {
    if (isGameOver) {
      pipes[index].draw();
    } else {
      pipes[index].update();
    }

    // 游戏结束
    if (pipes[index].hits(bird)) {
      isGameOver = true;
    }

    // 柱子退出
    if (pipes[index].isOffScreen()) {
      pipes.splice(index, 1);
    }
  }

  if (frameCount % 75 === 0 && !isGameOver) {
    pipes.push(new Pipe()); // 添加新 Pipe
  }

  if (isGameOver) {
    bird.draw() // 定格
  } else {
    bird.update() // 继续游戏，更新
  }
}

function keyPressed() {
  if (key === ' ') {
    bird.flap()
  }
}
