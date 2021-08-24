let hasFlappedUp = false;

// 初始化 handsfree
const handsfree = new Handsfree({
  showDebug: true,
  posenet: true,
  hands: true,
  facemesh: true,
  setup: {
    wrap: {
      $parent: document.querySelector('#debugger'),
    },
  }
})

handsfree.use('logger', data => {
  console.log(data.hands)
})

// const ctx = handsfree.feedback.$debug.getContext('2d')

document.querySelector('#start-button').addEventListener('click', () => {
  handsfree.start();
  handsfree.enablePlugins('browser')
  // document.querySelector('#button-wrap').style.display = 'none'
})

function keyPressed() {
  if (key === 'Enter') {
    if (isGameOver) {
      resumeGame()
    } else {
      bird.flap()
    }
  }
}
