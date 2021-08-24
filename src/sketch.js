// 变量
let isGameOver = true;
let score = 0;
let bird;
let birdImage;
let bgm;
let pipes = [];
let isSongPlaying = false;
// DOM
const $score = document.querySelector('#score')
const $startBtn = document.querySelector('#start-button');
const $debugger = document.querySelector('#debugger');

// 重新开始游戏
function resumeGame() {
  bird.y = height / 2;
  isGameOver = false;
  pipes = [];
  playSong();
}

// 结束游戏
function endGame() {
  isGameOver = true;
  stopSong()
}

// 内置函数：预加载
function preload() {
  birdImage = loadImage('assets/bird.png')
  bgm = loadSound('assets/bgm.mp3')
}

// 内置函数：初始化
function setup() {
  let canvas = createCanvas(640, 480)
  canvas.parent('#sketch-container');

  bird = new Bird();
  pipes.push(new Pipe())
}

// 内置函数：绘制图形（一直循环在执行）
function draw() {
  background('#70c5ce')

  for(let index = pipes.length - 1; index >= 0; index--) {
    if (isGameOver) {
      pipes[index].draw();
    } else {
      pipes[index].update();
    }

    // 游戏结束
    if (pipes[index].hits(bird)) {
      // TODO: 太难了玩了，先不开启游戏结束
      // endGame();
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

// 播放 bgm
function playSong() {
  if (!isSongPlaying) {
    isSongPlaying = true;
    bgm.play()
  }
}

// 停止播放
function stopSong() {
  isSongPlaying = false;
  bgm.stop();
}
