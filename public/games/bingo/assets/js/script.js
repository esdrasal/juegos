const palabras = [
  {esp: "televisor", ing: "television"},
  {esp: "celular", ing: "cellphone"},
  {esp: "computadora", ing: "computer"},
  {esp: "laptop", ing: "laptop"},
  {esp: "silla", ing: "chair"},
  {esp: "sofá", ing: "sofa"},
  {esp: "lentes", ing: "glasses"},
  {esp: "libro", ing: "book"},
  {esp: "lapicero", ing: "pen"},
  {esp: "cepillo", ing: "brush"},
  {esp: "guitarra", ing: "guitar"},
  {esp: "cuaderno", ing: "notebook"},
  {esp: "ventana", ing: "window"},
  {esp: "carro", ing: "car"},
  {esp: "casa", ing: "house"},
  {esp: "hospital", ing: "hospital"},
  {esp: "reloj", ing: "watch"},
  {esp: "mesa", ing: "table"},
  {esp: "vaso", ing: "glass"},
  {esp: "plato", ing: "plate"},
  {esp: "puerta", ing: "door"},
  {esp: "perro", ing: "dog"},
  {esp: "gato", ing: "cat"},
  {esp: "camisa", ing: "shirt"}
];

const container = document.getElementById("bingo-container");
const palabraSpan = document.getElementById("palabra-a-adivinar");
const resultadoDiv = document.getElementById("resultado");
const startBtn = document.getElementById("start-btn");

let palabrasPendientes = [];
let palabraActual = null;
let timer = null;
let ronda = 1;

// Crear cuadrícula
function crearCuadricula() {
  container.innerHTML = '';
  palabras.forEach(palabra => {
    const btn = document.createElement("button");
    btn.textContent = palabra.esp;
    btn.classList.add("bingo-cell");
    container.appendChild(btn);
  });
}

// Mostrar siguiente palabra
function siguientePalabra() {
  if(palabrasPendientes.length === 0) {
    if(ronda === 1) {
      palabrasPendientes = palabras.filter(p => {
        const btn = Array.from(container.children).find(b => b.textContent === p.esp);
        return !btn.classList.contains("correct");
      });
      ronda = 2;
    } else {
      clearTimeout(timer);
      resultadoDiv.textContent = "🎉 ¡Bingo completado!";
      resultadoDiv.style.color = "green";
      container.querySelectorAll(".bingo-cell").forEach(btn => btn.disabled = true);
      palabraSpan.textContent = "";
      return;
    }
  }

  const index = Math.floor(Math.random() * palabrasPendientes.length);
  palabraActual = palabrasPendientes[index];
  palabraSpan.textContent = palabraActual.ing;

  container.querySelectorAll(".bingo-cell").forEach(btn => {
    if(!btn.classList.contains("correct")) {
      btn.disabled = false;
      btn.classList.remove("active");
      if(btn.textContent === palabraActual.esp) btn.classList.add("active");
    }
  });

  // Reiniciar timer
  if(timer) clearTimeout(timer);
  timer = setTimeout(() => {
    palabrasPendientes = palabrasPendientes.filter(p => p.esp !== palabraActual.esp);
    siguientePalabra();
  }, 5000);
}

// Manejo click en botones
container.addEventListener("click", e => {
  if(e.target.classList.contains("bingo-cell") && !e.target.disabled) {
    if(e.target.textContent === palabraActual.esp) {
      e.target.classList.add("correct");
      palabrasPendientes = palabrasPendientes.filter(p => p.esp !== palabraActual.esp);
      siguientePalabra(); // Solo cambiar palabra si es correcta
    }
  }
});

// Iniciar juego
startBtn.addEventListener("click", () => {
  palabrasPendientes = [...palabras];
  resultadoDiv.textContent = "";
  crearCuadricula();
  ronda = 1;
  siguientePalabra();
});



    // regresar al menu principal
    const backButton = document.createElement('button');
    backButton.textContent = 'Volver al menú principal';
    backButton.addEventListener('click', () => {
      window.location.href = '/'; // Cambia la URL según tu ruta principal
    });
    document.body.appendChild(backButton); 