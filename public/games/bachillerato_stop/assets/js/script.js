const startBtn = document.getElementById('start-btn');
const letterSpan = document.getElementById('letter');
const timerDiv = document.getElementById('timer');
const scoreDiv = document.getElementById('score-container');
const tableBody = document.querySelector('#stop-table tbody');

let chronometer = null;
let startTime = null;
let currentLetter = null;
let totalScore = 0;
let rounds = 0;

// Letras del alfabeto español
const letras = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

// Función para generar letra aleatoria
function getRandomLetter() {
  return letras[Math.floor(Math.random() * letras.length)];
}

// Crear fila vacía para nueva ronda
function crearFilaRonda() {
  const tr = document.createElement('tr');
  for(let i=0;i<7;i++){
    const td = document.createElement('td');
    const input = document.createElement('input');
    td.appendChild(input);
    tr.appendChild(td);
  }
  const puntosTd = document.createElement('td');
  puntosTd.textContent = '0';
  tr.appendChild(puntosTd);
  tableBody.appendChild(tr);
}

// Iniciar cronómetro
function startChronometer() {
  startTime = Date.now();
  chronometer = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime)/1000);
    const mins = String(Math.floor(elapsed/60)).padStart(2,'0');
    const secs = String(elapsed%60).padStart(2,'0');
    timerDiv.textContent = `${mins}:${secs}`;
  }, 1000);
}

// Detener cronómetro
function stopChronometer() {
  clearInterval(chronometer);
}

// Guardar puntuación de la ronda
function saveScore() {
  const elapsed = Math.floor((Date.now() - startTime)/1000);
  const roundScore = Math.max(0, 60 - elapsed); // máximo 60 puntos
  totalScore += roundScore;
  scoreDiv.textContent = `Puntuación total: ${totalScore}`;

  // Colocar puntos en la última fila de la tabla
  const lastRow = tableBody.lastElementChild;
  lastRow.lastElementChild.textContent = roundScore;
}

// Botón principal
startBtn.addEventListener('click', () => {
  if(startBtn.textContent === 'Iniciar' || startBtn.textContent === 'Siguiente letra') {
    crearFilaRonda(); // agregar fila para nueva ronda
    stopChronometer();
    timerDiv.textContent = '00:00';

    // Generar letra después de cuenta regresiva
    letterSpan.textContent = '';
    startBtn.disabled = true;
    let countdownNum = 3;
    const countdownInterval = setInterval(() => {
      letterSpan.textContent = countdownNum;
      countdownNum--;
      if(countdownNum < 0) {
        clearInterval(countdownInterval);
        currentLetter = getRandomLetter();
        letterSpan.textContent = currentLetter;
        startChronometer();
        startBtn.textContent = 'Stop';
        startBtn.disabled = false;
      }
    }, 1000);
  } else if(startBtn.textContent === 'Stop') {
    // Detener cronómetro y guardar puntuación
    stopChronometer();
    saveScore();

    // Mostrar palabras ingresadas en consola
    const inputs = Array.from(tableBody.lastElementChild.querySelectorAll('input'));
    console.log(`Ronda ${rounds + 1} - Palabras ingresadas:`, inputs.map(i=>i.value));

    rounds++;
    startBtn.textContent = 'Siguiente letra';
  }
});


    // regresar al menu principal
    const backButton = document.createElement('button');
    backButton.textContent = 'Volver al menú principal';
    backButton.addEventListener('click', () => {
      window.location.href = '/'; // Cambia la URL según tu ruta principal
    });
    document.body.appendChild(backButton); 