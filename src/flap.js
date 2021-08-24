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
    console.log('detect', leftHandAvgData, rightHandAvgData, Math.abs(rightHandAvgData - leftHandAvgData));
    // 查看相差值
    if (Math.abs(rightHandAvgData - leftHandAvgData) < 0.5) {
      hasFlappedUp = false;
      bird.flap()
    } else {
      hasFlappedUp = true;
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
