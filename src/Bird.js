class Bird {
  x = 64
  y = height / 2
  width = 20
  height = 20
  gravity = 0.3
  velocity = 0 // 变速

  show() {
    fill(255)
    ellipse(this.x, this.y, this.width, this.height)
  }

  update() {
    this.velocity = this.velocity + this.gravity; // 变速
    this.y = this.y + this.velocity; // 当前位置
  }
}
