// const cellSize = '40px'
// width: ${cellSize}; height: ${cellSize}; 
const gridContainer = document.getElementById('grid-container');
let gridSize = 16;
let currentColor = 'blue'

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function createGrid(gridSizeVar) {

  resetGrid(gridContainer);

  for (var i = 0; i < gridSizeVar; i++) {
    var row = document.createElement('div');
    row.setAttribute('style', 'display:flex; flex: auto');
    
    for (var j = 0; j < gridSizeVar; j++) {
      var cell = document.createElement('div');
      cell.setAttribute('style', `flex: auto; background-color: white`);
      cell.classList.add('cell')

      row.appendChild(cell);
    }
    gridContainer.appendChild(row);
  }
  addListenersToGrid()
}

function resetGrid(gridContainer) {
  var child = gridContainer.lastElementChild;
  while (child) {
    gridContainer.removeChild(child);
    child = gridContainer.lastElementChild;
  }
}

function addListenersToGrid() {
  const gridCells = document.querySelectorAll('.cell');

  gridCells.forEach((cell) => {
    cell.addEventListener('mouseover', changeColor)
    cell.addEventListener('mousedown', changeColor)
  });
}

function getNewGridSize() {
  gridSize = parseInt(prompt('Please choose a number between 1 and 100:'))
  while (gridSize < 1 || gridSize > 100){
    gridSize = parseInt(prompt('Please choose a number between 1 and 100:'))
    }
  return gridSize;
}

function createNewGrid() {
  var newGridSize = getNewGridSize();
  console.log(newGridSize)
  if (isNaN(newGridSize)) {
    newGridSize = 16;
  }
  createGrid(newGridSize);
}

function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return
  e.target.style.backgroundColor = currentColor
}

const changeSizeBtn = document.getElementById('changeSizeBtn')
changeSizeBtn.addEventListener('click', createNewGrid)

const resetGridBtn = document.getElementById('resetGridBtn')
resetGridBtn.addEventListener('click', () => {
  createGrid(gridSize)
});

createGrid(16);