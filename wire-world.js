class WireWorld {
  constructor(width, height) {
    this.cellSize = 4;
    this.width = width;
    this.height = height;
    this.cells = [];
    this.#createCells();
  }
  #createCells(wireProps = 0.8) {
    const widhCount = Math.floor(this.width / this.cellSize);
    const heightCount = Math.floor(this.height / this.cellSize);

    for (let j = 0; j < heightCount; j++) {
      const row = [];
      for (let i = 0; i < widhCount; i++) {
        const isWire = Math.random() > wireProps;
        const state =
          heightCount * 0.2 > j ||
          widhCount * 0.2 > i ||
          heightCount * 0.8 < j ||
          widhCount * 0.8 < i
            ? 0
            : isWire
            ? 3
            : 1;
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
  draw(ctx) {
    for (let j = 0; j < this.cells.length; j++) {
      for (let i = 0; i < this.cells[j].length; i++) {
        const cell = this.cells[j][i];
        ctx.beginPath();
        ctx.fillStyle =
          cell.state == 0
            ? "black"
            : cell.state == 1
            ? "blue"
            : cell.state == 2
            ? "red"
            : "yellow";
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
  update() {
    const cells = [];
    for (let j = 0; j < this.cells.length; j++) {
      const row = [];
      for (let i = 0; i < this.cells[j].length; i++) {
        const cell = this.cells[j][i];
        const neibhors = mooreNeighbors(this.cells, cell);
        const state = this.#computeState(cell, neibhors);
        const newCell = {
          ...cell,
          state,
        };
        row.push(newCell);
      }
      cells.push(row);
    }
    this.cells = cells;
  }

  #computeState(cell, neibhors) {
    if (cell.state == 0) {
      return 0;
    }
    if (cell.state == 1) {
      return 2;
    }
    if (cell.state == 2) {
      return 3;
    }
    if (cell.state == 3) {
      let electronHead = 0;
      neibhors.forEach((neighbor) => {
        if (neighbor.state == 1) {
          electronHead++;
        }
      });
      if (electronHead == 1 || electronHead == 2) {
        return 1;
      }
      return 3;
    }
  }
}
