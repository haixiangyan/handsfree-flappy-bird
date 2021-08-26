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
    const leftHandDataArray = [poseLandmarks[20].y, poseLandmarks[18].y, poseLandmarks[16].y]
    const leftHandAvgData = avg(leftHandDataArray)
    // 计算右手数据平均 x, y
    const rightHandDataArray = [poseLandmarks[19].y, poseLandmarks[17].y, poseLandmarks[15].y]
    const rightHandAvgData = avg(rightHandDataArray)
    // 左肩数据
    const leftShoulderData = poseLandmarks[12].y;
    // 右肩数据
    const rightShoulderData = poseLandmarks[11].y;
    // 准备
    if (leftHandAvgData > leftShoulderData && rightHandAvgData > rightShoulderData) {
      hasFlappedUp = true;
    }
    // 起飞
    if (hasFlappedUp && leftHandAvgData < leftShoulderData && rightHandAvgData < rightShoulderData) {
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
