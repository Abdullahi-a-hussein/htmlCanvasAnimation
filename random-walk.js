class RandomWalk {
  constructor(width, height) {
    this.cellSize = 8;
    this.width = width;
    this.height = height - 100;
    this.cells = [];
    this.#createCells();
    this.iteration = 0;
    this.walker = {
      x: Math.floor(this.width / (2 * this.cellSize)),
      y: Math.floor(this.height / (2 * this.cellSize)),
    };
  }

  #createCells() {
    const heightCount = Math.floor(this.height / this.cellSize);
    const widthCount = Math.floor(this.width / this.cellSize);
    for (let j = 0; j <= heightCount; j++) {
      const widthCells = [];
      for (let i = 0; i <= widthCount; i++) {
        const cell = {
          x: i,
          y: j,
          color: "white",
        };
        widthCells.push(cell);
      }
      this.cells.push(widthCells);
    }
  }
  draw(ctx) {
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        const cell = this.cells[i][j];
        ctx.beginPath();
        ctx.fillStyle = cell.color;
        ctx.rect(
          cell.x * this.cellSize,
          cell.y * this.cellSize,
          this.cellSize,
          this.cellSize
        );
        ctx.fill();
      }
    }
    ctx.font = "30px Arial";
    ctx.strokeStyle = "white";
    ctx.strokeText(`Iterations: ${this.iteration}`, 20, this.height + 50);
  }
  update() {
    const currentColor = this.cells[this.walker.y][this.walker.x].color;
    if (currentColor == "white") {
      this.cells[this.walker.y][this.walker.x].color = `rgb(${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )})`;
    }
    this.#move();
    this.iteration++;
  }
  #move() {
    const randomDir = Math.floor(Math.random() * 4);
    switch (randomDir) {
      case 0:
        this.walker.x--;
        break;
      case 1:
        this.walker.x++;
        break;
      case 2:
        this.walker.y--;
        break;
      case 3:
        this.walker.y++;
        break;
    }
  }
}
