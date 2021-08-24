class Pipe {
  x = width;
  top = random(height / 2)
  bottom = random(height / 2)
  width = 20
  velocity = 1;

  show() {
    fill(255)
    rect(this.x, 0, this.width, this.top)
    rect(this.x, height - this.bottom, this.width, this.bottom)
  }

  update() {
    this.x = this.x - this.velocity
  }
}
