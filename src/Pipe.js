class Pipe {
  constructor() {
    this.spacing = 200
    this.top = random(height / 6, (3 / 4) * height)
    this.bottom = height - (this.top + this.spacing)
    this.x = width;
    this.width = 80
    this.velocity = 2;
    this.highlight = false;
  }

  draw() {
    fill(255)
    if (this.highlight) {
      fill(255, 0, 0);
    }
    rect(this.x, 0, this.width, this.top)
    rect(this.x, height - this.bottom, this.width, this.bottom)
  }

  update() {
    this.x = this.x - this.velocity
    this.draw()
  }

  isOffScreen() {
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
