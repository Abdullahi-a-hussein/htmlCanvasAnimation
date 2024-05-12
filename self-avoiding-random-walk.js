class SelfAvoidingRandomWalk {
  constructor(width, height) {
    this.cellSize = 4;
    this.width = width;
    this.height = height - 100;
    this.cells = [];
    this.#createCells();
    this.iteration = 0;
    this.walker = {
      x: Math.floor(this.width / (2 * this.cellSize)),
      y: Math.floor(this.height / (2 * this.cellSize)),
    };
    this.previousMoves = [];
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
          tried: false,
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
    if (currentColor != "black") {
      this.cells[this.walker.y][this.walker.x].color = "black";
      this.cells[this.walker.y][this.walker.x].visited = true;
    }
    this.#move();
    this.iteration++;
  }
  #move() {
    const cell = this.cells[this.walker.y][this.walker.x];
    const neighbors = neumannNeighborhood(this.cells, cell);
    const valid = neighbors.filter((neighbor) => neighbor.color == "white");

    if (valid.length == 0) {
      // Backtrack to the previous position
      let backtrack = true;
      while (backtrack && this.previousMoves.length > 0) {
        backtrack = false;
        let lastMove = this.previousMoves.pop();
        this.cells[lastMove.y][lastMove.x].color = "white";
        const lastNeighbors = neumannNeighborhood(this.cells, lastMove);
        const lastValid = lastNeighbors.filter(
          (neighbor) => neighbor.color == "white" && !neighbor.visited
        );
        if (lastValid.length > 0) {
          this.walker.x = lastMove.x;
          this.walker.y = lastMove.y;
        } else {
          backtrack = true;
          lastMove = this.previousMoves.pop();
        }
      }
    } else {
      const random = Math.floor(Math.random() * valid.length);
      const { x, y } = valid[random];
      this.previousMoves.push({ x: this.walker.x, y: this.walker.y }); // Store current move
      this.walker.x = x;
      this.walker.y = y;
    }
  }
}
