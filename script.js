// const cellSize = '40px'
// width: ${cellSize}; height: ${cellSize}; 
const DEFAULT_SIZE = 16
const DEFAULT_MODE = 'color'
const DEFAULT_COLOR = '#404040'


let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE


function setCurrentMode(newMode) {
  activateButton(newMode)
  currentMode = newMode
}

const gridContainer = document.getElementById('grid-container');
const colorBtn = document.getElementById('colorBtn')
const eraseBtn = document.getElementById('eraserBtn')
const changeSizeBtn = document.getElementById('changeSizeBtn')
const resetGridBtn = document.getElementById('resetGridBtn')
const gridSizeSlider = document.querySelector("#gridSizeSlider");
const gridSizeOutput = document.querySelector(".gridSize-output");

gridSizeOutput.textContent = gridSizeSlider.value;

gridSizeSlider.addEventListener("input", () => {
  gridSizeOutput.textContent = gridSizeSlider.value;
});

colorBtn.onclick = () => setCurrentMode('color')
eraserBtn.onclick = () => setCurrentMode('eraser')

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function createGrid(size) {

  resetGrid(gridContainer);

  for (var i = 0; i < size; i++) {
    var row = document.createElement('div');
    row.setAttribute('style', 'display:flex; flex: auto');
    
    for (var j = 0; j < size; j++) {
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

function getNewcurrentSize() {
  currentSize = parseInt(prompt('Please choose a number between 1 and 100:'))
  while (currentSize < 1 || currentSize > 100){
    currentSize = parseInt(prompt('Please choose a number between 1 and 100:'))
    }
  return currentSize;
}

function createNewGrid() {
  var newcurrentSize = getNewcurrentSize();
  console.log(newcurrentSize)
  if (isNaN(newcurrentSize)) {
    newcurrentSize = 16;
  }
  createGrid(newcurrentSize);
}

function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return
  if (currentMode === 'color') {
    e.target.style.backgroundColor = currentColor
  }
  else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = '#fefefe'
  }
}

function activateButton(newMode) {
  if (currentMode === 'color') {
    colorBtn.classList.remove('active')
  } else if (currentMode === 'eraser') {
    eraserBtn.classList.remove('active')
  }

  if (newMode === 'color') {
    colorBtn.classList.add('active')
  } else if (newMode === 'eraser') {
    eraserBtn.classList.add('active')
  }
}


changeSizeBtn.addEventListener('click', createNewGrid)
resetGridBtn.addEventListener('click', () => {
  createGrid(currentSize)
});

window.onload = () => {
  createGrid(DEFAULT_SIZE)
  activateButton(DEFAULT_MODE);
}