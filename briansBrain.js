class BriansBrain {
  constructor(width, height) {
    this.cellSize = 4;
    this.width = width;
    this.height = height;
    this.cells = [];
    this.#createCells(0.5);
  }

  draw(ctx) {
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        const cell = this.cells[i][j];
        ctx.beginPath();
        ctx.fillStyle = cell.state == 2 ? "red" : "black";
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

  #createCells(proportion) {
    const widthCount = Math.floor(this.width / this.cellSize);
    const heightCount = Math.floor(this.height / this.cellSize);

    for (let j = 0; j < heightCount; j++) {
      const row = [];
      for (let i = 0; i < widthCount; i++) {
        const state = Math.random() < proportion ? 1 : 3;
        const cell = {
          x: i,
          y: j,
          state,
        };
        row.push(cell);
      }
      this.cells.push(row);
    }
  }
  #computeState(cell, neighbors) {
    let liveCount = 0;
    let dyingCount = 0;
    let deadCount = 0;
    neighbors.forEach((neighbor) => {
      if (neighbor.state === 1) {
        liveCount++;
      }
    });
    // Rules
    if (cell.state === 1) {
      return 2;
    }
    if (cell.state === 3 && liveCount === 2) {
      return 1;
    }
    return 3;
  }
  update() {
    const allCells = [];
    for (let j = 0; j < this.cells.length; j++) {
      const row = [];
      for (let i = 0; i < this.cells[j].length; i++) {
        const cell = this.cells[j][i];
        const neighbors = mooreNeighbors(this.cells, cell);
        const state = this.#computeState(cell, neighbors);
        const newCell = {
          x: cell.x,
          y: cell.y,
          state,
        };
        row.push(newCell);
      }
      allCells.push(row);
    }
    this.cells = allCells;
  }
}
