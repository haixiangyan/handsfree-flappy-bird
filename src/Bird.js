class Bird {
  x = 64
  y = height / 2
  width = 20
  height = 20
  gravity = 0.6
  lift = -15 // 上升
  velocity = 0 // 变速

  up() {
    // 修改速度方向
    this.velocity = this.velocity + this.lift;
  }

  show() {
    fill(255)
    ellipse(this.x, this.y, this.width, this.height)
  }

  update() {
    // 变速
    this.velocity = (this.velocity + this.gravity) * 0.9;
    // 当前位置
    this.y = this.y + this.velocity;

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }
  }
}
