const palabras = ["televisor","celular","computadora","laptop","silla",
  "sofa","lentes","libro","lapicero","cepillo",
  "guitarra","cuaderno","ventana","carro","casa",
  "hospital","reloj","mesa","vaso","plato"];
let palabra = palabras[Math.floor(Math.random() * palabras.length)].toUpperCase();
let letrasUsadas = [];
let intentos = 6;

const palabraContainer = document.getElementById("palabra-container");
const botonesContainer = document.getElementById("botones-letras");
const resultadoDiv = document.getElementById("resultado");
const canvas = document.getElementById("ahorcado-canvas");
const ctx = canvas.getContext("2d");

const teclado = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

// Ajustar canvas al ancho de pantalla
function ajustarCanvas() {
  const maxWidth = window.innerWidth * 0.95;
  canvas.width = Math.min(maxWidth, 400);
  canvas.height = canvas.width * 1.25; // mantener proporción
  dibujarAhorcado();
}

window.addEventListener('resize', ajustarCanvas);
ajustarCanvas();

// Dibujar palabra
function dibujarPalabra(){
  palabraContainer.innerHTML = '';
  for(let letra of palabra){
    const span = document.createElement('span');
    span.textContent = letrasUsadas.includes(letra) ? letra : '';
    palabraContainer.appendChild(span);
  }
}

// Dibujar ahorcado adaptativo
function dibujarAhorcado(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;

  // Escala proporcional
  const scaleX = canvas.width / 200;
  const scaleY = canvas.height / 250;

  // Base
  ctx.beginPath();
  ctx.moveTo(10*scaleX, 240*scaleY);
  ctx.lineTo(190*scaleX, 240*scaleY);
  ctx.stroke();

  // Horca fija
  ctx.beginPath();
  ctx.moveTo(50*scaleX,240*scaleY);
  ctx.lineTo(50*scaleX,20*scaleY);
  ctx.lineTo(150*scaleX,20*scaleY);
  ctx.lineTo(150*scaleX,40*scaleY);
  ctx.stroke();

  const partes = [
    () => { ctx.beginPath(); ctx.arc(150*scaleX,60*scaleY,20*scaleX,0,Math.PI*2); ctx.stroke(); }, // cabeza
    () => { ctx.beginPath(); ctx.moveTo(150*scaleX,80*scaleY); ctx.lineTo(150*scaleX,150*scaleY); ctx.stroke(); }, // torso
    () => { ctx.beginPath(); ctx.moveTo(150*scaleX,100*scaleY); ctx.lineTo(120*scaleX,130*scaleY); ctx.stroke(); }, // brazo izq
    () => { ctx.beginPath(); ctx.moveTo(150*scaleX,100*scaleY); ctx.lineTo(180*scaleX,130*scaleY); ctx.stroke(); }, // brazo der
    () => { ctx.beginPath(); ctx.moveTo(150*scaleX,150*scaleY); ctx.lineTo(120*scaleX,190*scaleY); ctx.stroke(); }, // pierna izq
    () => { ctx.beginPath(); ctx.moveTo(150*scaleX,150*scaleY); ctx.lineTo(180*scaleX,190*scaleY); ctx.stroke(); }  // pierna der
  ];

  let errores = 6 - intentos;
  for (let i = 0; i < errores && i < partes.length; i++) {
    partes[i]();
  }
}

// Botones de letras
function actualizarBotones(){
  botonesContainer.innerHTML = '';
  teclado.forEach(letra => {
    const btn = document.createElement('button');
    btn.textContent = letra;
    btn.disabled = letrasUsadas.includes(letra);
    btn.addEventListener('click', ()=>adivinarLetra(letra));
    botonesContainer.appendChild(btn);
  });
}

// Adivinar letra
function adivinarLetra(letra){
  letrasUsadas.push(letra);
  if(!palabra.includes(letra)) intentos--;
  dibujarPalabra();
  dibujarAhorcado();
  actualizarBotones();
  checkVictory();
  checkDefeat();
}

// Revisar victoria
function checkVictory(){
  if([...palabra].every(l => letrasUsadas.includes(l))){
    resultadoDiv.textContent = '🎉 ¡Felicidades! Adivinaste la palabra!';
    resultadoDiv.style.color = 'green';
    botonesContainer.querySelectorAll('button').forEach(b=>b.disabled=true);
    resultadoDiv.appendChild(restartButton);
    restartButton.style.display = 'inline-block';
  }
}

// Revisar derrota
function checkDefeat(){
  if(intentos<=0){
    resultadoDiv.textContent = `💀 Perdiste. La palabra era: ${palabra}`;
    resultadoDiv.style.color = 'red';
    botonesContainer.querySelectorAll('button').forEach(b=>b.disabled=true);
    resultadoDiv.appendChild(restartButton);
    restartButton.style.display = 'inline-block';
  }
}

// Reinicio del juego
const restartButton = document.createElement('button');
restartButton.textContent = '🔄 Jugar de nuevo';
restartButton.style.display = 'none';
restartButton.addEventListener('click', () => {
  palabra = palabras[Math.floor(Math.random() * palabras.length)].toUpperCase();
  letrasUsadas = [];
  intentos = 6;
  resultadoDiv.textContent = '';
  resultadoDiv.appendChild(restartButton);
  restartButton.style.display = 'none';
  dibujarPalabra();
  dibujarAhorcado();
  actualizarBotones();
});
resultadoDiv.appendChild(restartButton);

// Inicializar juego
dibujarPalabra();
dibujarAhorcado();
actualizarBotones();

// Botón de menú
const backButton = document.createElement('button');
backButton.textContent = 'Volver al menú principal';
backButton.addEventListener('click', () => {
  window.location.href = '/'; 
});
document.body.appendChild(backButton);
