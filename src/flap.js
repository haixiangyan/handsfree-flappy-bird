let hasFlappedUp = false;

// 初始化 handsfree
const handsfree = new Handsfree({
  posenet: true,
  feedback: {
    enabled: true,
    $target: document.querySelector('#debugger')
  }
})

const ctx = handsfree.feedback.$debug.getContext('2d')

document.querySelector('#start-button').addEventListener('click', () => {
  handsfree.start();
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
