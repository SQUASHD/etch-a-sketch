const cellSize = '40px'
const gridSize = 16

const container = document.getElementById('container')
container.setAttribute('style', 'display: flex; flex-direction: column;')

function createGrid() {
  for (var i = 0; i < gridSize; i++) {
    var row = document.createElement('div');
    row.setAttribute('style', 'display:flex');
    
    for (var j = 0; j < gridSize; j ++) {
      var cell = document.createElement('div');
      cell.setAttribute('style', `width: ${cellSize}; height: ${cellSize}; border: solid black 1px; background-color: blue`);
      cell.classList.add('cell')

      row.appendChild(cell);
    }
    container.appendChild(row);
  }
}

createGrid();

const gridCells = document.querySelectorAll('.cell');

gridCells.forEach((cell) => {
  cell.addEventListener('mouseover', () => {
    cell.style.backgroundColor = 'red';
  })
  cell.addEventListener('mouseout', () => {
    cell.style.backgroundColor = 'blue';
  })
});