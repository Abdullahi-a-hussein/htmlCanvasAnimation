class LangtonsAnt {
  constructor(width, height) {
    this.cellSize = 4;
    this.width = width;
    this.height = height - 100;
    this.cells = [];
    this.#createCells();
    this.iterations = 0;
    this.ant = {
      x: Math.floor(this.width / (2 * this.cellSize)),
      y: Math.floor(this.height / (2 * this.cellSize)),
    };
    this.direction = "east";
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
    ctx.strokeText(this.iterations, 20, this.height + 50);
  }
  update() {
    const startingColour = this.cells[this.ant.y][this.ant.x].color;
    this.cells[this.ant.y][this.ant.x].color =
      startingColour == "black" ? "white" : "black";
    if (startingColour == "black") {
      switch (this.direction) {
        case "east":
          this.direction = "north";
          break;
        case "west":
          this.direction = "south";
          break;
        case "north":
          this.direction = "west";
          break;
        case "south":
          this.direction = "east";
          break;
      }
    } else {
      switch (this.direction) {
        case "east":
          this.direction = "south";
          break;
        case "west":
          this.direction = "north";
          break;
        case "north":
          this.direction = "east";
          break;
        case "south":
          this.direction = "west";
          break;
      }
    }
    this.#move();
    this.iterations++;
  }
  #move() {
    switch (this.direction) {
      case "east":
        this.ant.x++;
        break;
      case "west":
        this.ant.x--;
        break;
      case "north":
        this.ant.y--;
        break;
      case "south":
        this.ant.y++;
    }
  }
}
