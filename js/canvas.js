class Canvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.isDrawing = false;
    this.lastX = 0;
    this.lastY = 0;
    this.draw();
    this.signature();
  }

  draw(e) {
    if (!this.isDrawing) return;
    this.ctx.beginPath();
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = '#000000';
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(e.offsetX, e.offsetY);
    this.ctx.stroke();
    [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
  }

  signature() {
    this.canvas.addEventListener('mousedown', (e) => {
      this.isDrawing = true;
      [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
    });
    this.canvas.addEventListener('mousemove', (e) => this.draw(e));
    this.canvas.addEventListener('mouseup', () => this.isDrawing = false);
    this.canvas.addEventListener('mouseout', () => this.isDrawing = false);
    document.getElementById('effacerCanvas').addEventListener('click', () => this.clearArea());
  }

  clearArea() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}

const canvas = new Canvas(document.getElementById('my-canvas'));