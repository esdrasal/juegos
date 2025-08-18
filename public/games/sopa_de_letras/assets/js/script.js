const palabras = [
  "televisor","celular","computadora","laptop","silla",
  "sofa","lentes","libro","lapicero","cepillo",
  "guitarra","cuaderno","ventana","carro","casa",
  "hospital","reloj","mesa","vaso","plato"
];

const gridSize = 15;
const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const container = document.getElementById("sopa-de-letras");
const palabrasLista = document.getElementById("palabras");

// Crear grid vacío
let grid = Array.from({length:gridSize}, ()=>Array(gridSize).fill(""));

// Función para colocar palabras aleatoriamente
function colocarPalabra(palabra){
  const directions = [
    {dx:1,dy:0},{dx:-1,dy:0},{dx:0,dy:1},{dx:0,dy:-1},
    {dx:1,dy:1},{dx:-1,dy:1},{dx:1,dy:-1},{dx:-1,dy:-1}
  ];
  let placed = false;
  while(!placed){
    const dir = directions[Math.floor(Math.random()*directions.length)];
    const startRow = Math.floor(Math.random()*gridSize);
    const startCol = Math.floor(Math.random()*gridSize);

    let fits = true;
    for(let i=0;i<palabra.length;i++){
      const r = startRow + dir.dy*i;
      const c = startCol + dir.dx*i;
      if(r<0 || r>=gridSize || c<0 || c>=gridSize) {fits=false; break;}
      if(grid[r][c]!=="" && grid[r][c]!==palabra[i]) {fits=false; break;}
    }

    if(fits){
      for(let i=0;i<palabra.length;i++){
        const r = startRow + dir.dy*i;
        const c = startCol + dir.dx*i;
        grid[r][c] = palabra[i];
      }
      placed = true;
    }
  }
}

// Colocar todas las palabras
palabras.forEach(p => colocarPalabra(p));

// Rellenar celdas vacías con letras aleatorias
for(let i=0;i<gridSize;i++){
  for(let j=0;j<gridSize;j++){
    if(grid[i][j]==="") grid[i][j] = letras[Math.floor(Math.random()*letras.length)];
  }
}

// Crear cuadrícula y mapa de celdas
container.innerHTML = "";
let cellMap = [];
for(let i=0;i<gridSize;i++){
  cellMap[i] = [];
  for(let j=0;j<gridSize;j++){
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.row = i;
    cell.dataset.col = j;
    cell.textContent = grid[i][j];
    container.appendChild(cell);
    cellMap[i][j] = cell;
  }
}

// Mostrar lista de palabras
palabras.forEach(p=>{
  const li = document.createElement("li");
  li.textContent = p;
  li.id = "word-"+p;
  palabrasLista.appendChild(li);
});

// Drag selection
let isDragging = false;
let startCell = null;
let selectedCells = [];

container.addEventListener("mousedown", e=>{
  if(e.target.classList.contains("cell")){
    isDragging = true;
    startCell = e.target;
    selectedCells = [startCell];
    startCell.classList.add("selected");
  }
});

container.addEventListener("mouseover", e=>{
  if(isDragging && e.target.classList.contains("cell")){
    clearSelection();
    const endCell = e.target;
    selectedCells = getCellsBetween(startCell, endCell);
    selectedCells.forEach(c=>c.classList.add("selected"));
  }
});

document.addEventListener("mouseup", e=>{
  if(isDragging){
    isDragging = false;
    const word = selectedCells.map(c=>c.textContent.toLowerCase()).join("");
    if(palabras.includes(word)){
      selectedCells.forEach(c=>{
        c.classList.remove("selected");
        c.classList.add("found");
      });
      document.getElementById("word-"+word).classList.add("found");
      selectedCells = [];

      checkVictory();
    } else {
      clearSelection();
    }
  }
});

function clearSelection(){
  selectedCells.forEach(c=>c.classList.remove("selected"));
  selectedCells = [];
}

function getCellsBetween(start, end){
  const cellsBetween = [];
  const startRow = parseInt(start.dataset.row);
  const startCol = parseInt(start.dataset.col);
  const endRow = parseInt(end.dataset.row);
  const endCol = parseInt(end.dataset.col);

  const dRow = endRow - startRow;
  const dCol = endCol - startCol;

  const stepRow = dRow===0 ? 0 : dRow/Math.abs(dRow);
  const stepCol = dCol===0 ? 0 : dCol/Math.abs(dCol);

  let r=startRow, c=startCol;
  while(true){
    const cell = cellMap[r][c];
    if(cell) cellsBetween.push(cell);
    if(r===endRow && c===endCol) break;
    r+=stepRow;
    c+=stepCol;
  }
  return cellsBetween;
}
function checkVictory() {
  const todas = palabras.every(p => document.getElementById("word-"+p).classList.contains("found"));
  if(todas){
    setTimeout(() => alert("🎉 ¡Felicidades! Encontraste todas las palabras! 🎉"), 100);
  }
}

// regresar al menu principal
const backButton = document.createElement('button');
backButton.textContent = 'Volver al menú principal';
backButton.addEventListener('click', () => {
  window.location.href = '/'; // Cambia la URL según tu ruta principal
});
document.body.appendChild(backButton); 