class Pipe {
  x = width;
  top = random(height / 2)
  bottom = random(height / 2)
  width = 20
  velocity = 2;
  highlight = false;

  show() {
    fill(255)
    if (this.highlight) {
      fill(255, 0, 0);
    }
    rect(this.x, 0, this.width, this.top)
    rect(this.x, height - this.bottom, this.width, this.bottom)
  }

  update() {
    this.x = this.x - this.velocity
  }

  offscreen() {
    // 完全退出屏幕
    return this.x < -this.width;
  }

  hits(bird) {
    // 进入范围
    if (bird.x > this.x && bird.x < this.x + this.width) {
      if (bird.y < this.top || bird.y > height - this.bottom) {
        this.highlight = true;
        return true;
      }
      this.highlight = false;
      return false;
    }

    this.highlight = false;
    return false;
  }
}
