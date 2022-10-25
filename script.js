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
const resetGridBtn = document.getElementById('resetGridBtn')
const gridSizeSlider = document.getElementById('gridSizeSlider')
const gridSizeSliderOutput = document.getElementById('gridSizeSlider_output')

gridSizeSliderOutput.textContent = gridSizeSlider.value

gridSizeSlider.addEventListener('input', () => {
  gridSizeSliderOutput.textContent = gridSizeSlider.value
  createGrid(gridSizeSlider.value)
})

colorBtn.onclick = () => setCurrentMode('color')
eraserBtn.onclick = () => setCurrentMode('eraser')

let mouseDown = false
gridContainer.onmousedown = () => (mouseDown = true)
gridContainer.onmouseup = () => (mouseDown = false)

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


resetGridBtn.addEventListener('click', () => {
  createGrid(gridSizeSlider.value)
});

window.onload = () => {
  createGrid(DEFAULT_SIZE)
  activateButton(DEFAULT_MODE);
}