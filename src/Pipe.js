const pipeBorderWidth = 2

class Pipe {
  constructor() {
    this.spacing = 200
    this.top = random(height / 6, (3 / 4) * height)
    this.bottom = height - (this.top + this.spacing)
    this.x = width;
    this.width = 80
    this.velocity = 6;
    this.hasScored = false;
  }

  update() {
    this.x = this.x - this.velocity
    this.checkIfScored()
    this.draw()
  }

  checkIfScored() {
    const rangeStart = this.x + this.width / 2;
    const rangeEnd = this.x + this.width;
    if (rangeStart < bird.x && bird.x < rangeEnd && !this.hits() && !this.hasScored) {
      score += 1;
      this.hasScored = true;
      $score.innerHTML = score.toString()
    }
  }

  isOffScreen() {
    // 完全退出屏幕
    return this.x < -this.width;
  }

  hits() {
    // 进入范围
    if (bird.x > this.x && bird.x < this.x + this.width) {
      if (bird.y < this.top || bird.y > height - this.bottom) {
        return true;
      }
    }
    return false;
  }

  draw() {
    strokeWeight(3)
    // 上面的柱子
    this.drawPipeCoverFill(this.top - pipeBorderWidth);
    this.drawPipe(-pipeBorderWidth, this.top)
    this.drawPipeCover(this.top - pipeBorderWidth)
    // 下面的柱子
    this.drawPipeCoverFill(height - this.bottom + 40 - pipeBorderWidth)
    this.drawPipe(height - this.bottom, this.bottom + pipeBorderWidth)
    this.drawPipeCover(height - this.bottom + 40 - pipeBorderWidth)
  }

  drawPipe(top, bottom) {
    // 底坐
    stroke('#543847')
    fill('#73bf2e')
    rect(this.x, top - pipeBorderWidth, this.width, bottom + pipeBorderWidth)
    // 左边亮面
    fill('#9ce659')
    noStroke()
    rect(this.x + pipeBorderWidth, top + 2, this.width / 3, bottom - pipeBorderWidth - 2)
    // 左边亮面线
    stroke('#73bf2e')
    rect(this.x + pipeBorderWidth + 4, top + 2, 2, bottom - pipeBorderWidth - 3)
    fill('#558022')
    // 右面阴影
    noStroke()
    rect(this.x + this.width - 20, top + 2, this.width / 3 - 10, bottom - pipeBorderWidth - 2)
    // 右面阴影线
    fill('#73bf2e')
    rect(this.x + this.width - 5, top - pipeBorderWidth, 2, bottom - pipeBorderWidth)
  }

  drawPipeCover(top) {
    // 基座
    stroke('#543847')
    noFill()
    rect(this.x - 5, top - 40, this.width + 10, 40)
  }

  drawPipeCoverFill(top) {
    // 基座
    stroke('#543847')
    fill('#73bf2e')
    rect(this.x - 5, top - 40, this.width + 10, 40)
  }
}
