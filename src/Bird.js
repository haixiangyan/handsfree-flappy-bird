class Bird {
  constructor() {
    this.x = 64
    this.y = height / 2
    this.width = 32
    this.height = 32

    this.gravity = 0.5
    this.lift = -16 // 上升
    this.initVelocity = -12 // 初速度
    this.velocity = 0 // 变速
  }

  up() {
    // 修改速度方向
    this.velocity = this.velocity === 0 ? this.initVelocity : this.velocity + this.lift;
  }

  show() {
    fill(255)
    ellipse(this.x, this.y, this.width, this.height)
  }

  update() {
    // 变速
    this.velocity = this.velocity + this.gravity;
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
