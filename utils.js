function mooreNeighbors(cells, cell) {
  maxCell = cells[cells.length - 1][cells[cells.length - 1].length - 1];
  const neighbors = [];
  if (cell.x < maxCell.x) {
    neighbors.push(cells[cell.y][cell.x + 1]);
  }
  if (cell.y < maxCell.y) {
    neighbors.push(cells[cell.y + 1][cell.x]);
  }
  if (cell.x > 0) {
    neighbors.push(cells[cell.y][cell.x - 1]);
  }
  if (cell.y > 0) {
    neighbors.push(cells[cell.y - 1][cell.x]);
  }
  if (cell.x > 0 && cell.y > 0) {
    neighbors.push(cells[cell.y - 1][cell.x - 1]);
  }
  if (cell.y < maxCell.y && cell.x < maxCell.x) {
    neighbors.push(cells[cell.y + 1][cell.x + 1]);
  }
  if (cell.y < maxCell.y && cell.x > 0) {
    neighbors.push(cells[cell.y + 1][cell.x - 1]);
  }
  if (cell.y > 0 && cell.x < maxCell.x) {
    neighbors.push(cells[cell.y - 1][cell.x + 1]);
  }
  return neighbors;
}

function createCells(proportion = 0.5, widhCount, heightCount) {
  const cells = [];
  for (let j = 0; j <= heightCount; j++) {
    const widthCells = [];
    for (let i = 0; i <= widhCount; i++) {
      const cell = {
        x: i,
        y: j,
      };
      widthCells.push(cell);
    }
    cells.push(widthCells);
  }
  return cells;
}

function neumannNeighborhood(cells, cell) {
  maxCell = cells[cells.length - 1][cells[cells.length - 1].length - 1];
  const neighbors = [];
  if (cell.x < maxCell.x) {
    neighbors.push(cells[cell.y][cell.x + 1]);
  }
  if (cell.y < maxCell.y) {
    neighbors.push(cells[cell.y + 1][cell.x]);
  }
  if (cell.x > 0) {
    neighbors.push(cells[cell.y][cell.x - 1]);
  }
  if (cell.y > 0) {
    neighbors.push(cells[cell.y - 1][cell.x]);
  }
  return neighbors;
}
