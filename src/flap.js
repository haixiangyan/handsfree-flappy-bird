let hasFlappedUp = false;

function avg(array) {
  const sum = array.reduce((prev, curt) => prev + curt, 0)
  return sum / array.length;
}

// 初始化 handsfree
const handsfree = new Handsfree({
  showDebug: true,
  pose: true,
  setup: {
    wrap: {
      $parent: $debugger,
    },
  }
})

handsfree.use('flap', {
  onFrame(data) {
    if (!data.pose || !data.pose.poseLandmarks) return;
    // 数据可参考：https://handsfree.js.org/ref/model/pose.html#with-config
    const { poseLandmarks } = data.pose;
    // 计算左手数据平均 x, y
    const leftHandDataArray = [poseLandmarks[20].x, poseLandmarks[18].x, poseLandmarks[16].x]
    const leftHandAvgData = avg(leftHandDataArray) * 100
    // 计算右手数据平均 x, y
    const rightHandDataArray = [poseLandmarks[19].x, poseLandmarks[17].x, poseLandmarks[15].x]
    const rightHandAvgData = avg(rightHandDataArray) * 100
    const delta = Math.abs(rightHandAvgData - leftHandAvgData);
    // 准备
    if (delta >= 30) {
      hasFlappedUp = true;
    }
    // 起飞
    if (hasFlappedUp && delta < 10) {
      hasFlappedUp = false;
      bird.flap()
    }
  }
})

$startBtn.addEventListener('click', () => {
  isGameOver = false;
  handsfree.start();
  handsfree.enablePlugins('browser')
  playSong()
})

function keyPressed() {
  if (key === ' ') {
    if (isGameOver) {
      resumeGame()
    } else {
      bird.flap()
    }
  }
}
