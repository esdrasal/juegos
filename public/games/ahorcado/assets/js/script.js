/* Juego del Ahorcado con teclado español latinoamericano */
    const palabras = ["computadora", "celular", "laptop", "libro", "guitarra", "ventana", "reloj"];
    let palabra = palabras[Math.floor(Math.random() * palabras.length)].toUpperCase();
    let letrasUsadas = [];
    let intentos = 6;

    const palabraContainer = document.getElementById("palabra-container");
    const botonesContainer = document.getElementById("botones-letras");
    const resultadoDiv = document.getElementById("resultado");
    const canvas = document.getElementById("ahorcado-canvas");
    const ctx = canvas.getContext("2d");

const teclado = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    function dibujarPalabra(){
      palabraContainer.innerHTML = '';
      for(let letra of palabra){
        const span = document.createElement('span');
        span.textContent = letrasUsadas.includes(letra) ? letra : '';
        palabraContainer.appendChild(span);
      }
    }

    function dibujarAhorcado(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      // Horca base
      ctx.beginPath(); ctx.moveTo(10,240); ctx.lineTo(190,240); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(50,240); ctx.lineTo(50,20); ctx.lineTo(150,20); ctx.lineTo(150,40); ctx.stroke();
      // Partes según intentos fallidos
      if(intentos<=5){ ctx.beginPath(); ctx.arc(150,60,20,0,Math.PI*2); ctx.stroke(); } // cabeza
      if(intentos<=4){ ctx.beginPath(); ctx.moveTo(150,80); ctx.lineTo(150,150); ctx.stroke(); } // torso
      if(intentos<=3){ ctx.beginPath(); ctx.moveTo(150,100); ctx.lineTo(120,130); ctx.stroke(); } // brazo izq
      if(intentos<=2){ ctx.beginPath(); ctx.moveTo(150,100); ctx.lineTo(180,130); ctx.stroke(); } // brazo der
      if(intentos<=1){ ctx.beginPath(); ctx.moveTo(150,150); ctx.lineTo(120,190); ctx.stroke(); } // pierna izq
      if(intentos<=0){ ctx.beginPath(); ctx.moveTo(150,150); ctx.lineTo(180,190); ctx.stroke(); } // pierna der
    }

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

    function adivinarLetra(letra){
      letrasUsadas.push(letra);
      if(!palabra.includes(letra)) intentos--;
      dibujarPalabra();
      dibujarAhorcado();
      actualizarBotones();
      checkVictory();
      checkDefeat();
    }

    function checkVictory(){
      if([...palabra].every(l => letrasUsadas.includes(l))){
        resultadoDiv.textContent = '🎉 ¡Felicidades! Adivinaste la palabra!';
        resultadoDiv.style.color = 'green';
        botonesContainer.querySelectorAll('button').forEach(b=>b.disabled=true);
      }
    }

    function checkDefeat(){
      if(intentos<=0){
        resultadoDiv.textContent = `💀 Perdiste. La palabra era: ${palabra}`;
        resultadoDiv.style.color = 'red';
        botonesContainer.querySelectorAll('button').forEach(b=>b.disabled=true);
      }
    }

    // Inicializar juego
    dibujarPalabra();
    dibujarAhorcado();
    actualizarBotones();

    // regresar al menu principal
    const backButton = document.createElement('button');
    backButton.textContent = 'Volver al menú principal';
    backButton.addEventListener('click', () => {
      window.location.href = '/'; // Cambia la URL según tu ruta principal
    });
    document.body.appendChild(backButton); 