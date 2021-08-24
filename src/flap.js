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
      $parent: document.querySelector('#debugger'),
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
    const leftHandAvgData = avg(leftHandDataArray)
    // 计算右手数据平均 x, y
    const rightHandDataArray = [poseLandmarks[19].x, poseLandmarks[17].x, poseLandmarks[15].x]
    const rightHandAvgData = avg(rightHandDataArray)
    const delta = Math.abs(rightHandAvgData - leftHandAvgData) < 0.1;
    console.log('detect', leftHandAvgData, rightHandAvgData, delta);
    // 准备
    if (delta >= 0.1) {
      hasFlappedUp = true;
    }
    // 起飞
    if (hasFlappedUp && Math.abs(rightHandAvgData - leftHandAvgData) < 0.1) {
      hasFlappedUp = false;
      bird.flap()
    }
  }
})

document.querySelector('#start-button').addEventListener('click', () => {
  handsfree.start();
  handsfree.enablePlugins('browser')
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
