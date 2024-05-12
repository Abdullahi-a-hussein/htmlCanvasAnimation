class GameOfLife {
  constructor(width, height) {
    this.cellSize = 4;
    this.width = width;
    this.height = height;
    this.cells = [];
    this.#createCells(0.03);
  }
  draw(ctx) {
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        const cell = this.cells[i][j];
        ctx.beginPath();
        ctx.fillStyle = cell.alive ? "red" : "black";
        ctx.rect(
          cell.x * this.cellSize,
          cell.y * this.cellSize,
          this.cellSize,
          this.cellSize
        );
        ctx.fill();
      }
    }
  }
  #createCells(proportion = 0.5) {
    const widhCount = Math.ceil(this.width / this.cellSize);
    const heightCount = Math.ceil(this.height / this.cellSize);
    for (let j = 0; j <= heightCount; j++) {
      const widthCells = [];
      for (let i = 0; i <= widhCount; i++) {
        const alive = Math.random() <= proportion ? true : false;
        const cell = {
          x: i,
          y: j,
          alive,
        };
        widthCells.push(cell);
      }
      this.cells.push(widthCells);
    }
  }

  update() {
    const newCells = [];
    for (let i = 0; i < this.cells.length; i++) {
      const row = [];
      for (let j = 0; j < this.cells[i].length; j++) {
        const cell = this.cells[i][j];
        const neighbors = mooreNeighbors(this.cells, cell);
        cell.alive = this.#isAlive(cell, neighbors);
        row.push(cell);
      }
      newCells.push(row);
    }
    this.cells = newCells;
  }
  #isAlive(cell, neighbors) {
    let aliveCount = 0;
    if (neighbors.length < 8) {
      return false;
    }
    for (let i = 0; i < neighbors.length; i++) {
      if (neighbors[i].alive) {
        aliveCount++;
      }
    }
    if (cell.alive && aliveCount < 2) {
      return false;
    }
    if (cell.alive && (aliveCount == 2 || aliveCount == 3)) {
      return true;
    }
    if (cell.alive && aliveCount >= 4) {
      return false;
    }
    if (!cell.alive && aliveCount === 3) {
      return true;
    }
    return false;
  }
}
