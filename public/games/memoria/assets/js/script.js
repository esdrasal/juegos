
      const palabras = [
        {es: 'televisor', en: 'tv'},
        {es: 'celular', en: 'cellphone'},
        {es: 'computadora', en: 'computer'},
        {es: 'laptop', en: 'laptop'},
        {es: 'silla', en: 'chair'},
        {es: 'sofa', en: 'sofa'},
        {es: 'lentes', en: 'glasses'},
        {es: 'libro', en: 'book'},
        {es: 'lapicero', en: 'pen'},
        {es: 'cepillo', en: 'brush'},
        {es: 'guitarra', en: 'guitar'},
        {es: 'cuaderno', en: 'notebook'},
        {es: 'ventana', en: 'window'},
        {es: 'carro', en: 'car'},
        {es: 'casa', en: 'house'},
        {es: 'hospital', en: 'hospital'},
        {es: 'reloj', en: 'clock'},
        {es: 'mesa', en: 'table'},
        {es: 'vaso', en: 'glass'},
        {es: 'plato', en: 'plate'}
      ];

      let deck = [];
      palabras.forEach(p => {
        deck.push({word: p.es, lang: 'es'});
        deck.push({word: p.en, lang: 'en'});
      });

      deck = deck.sort(() => Math.random() - 0.5);

      const container = document.getElementById('memoria-container');
      let firstCard = null;
      let secondCard = null;
      let matches = 0;

      deck.forEach((cardObj, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.word = cardObj.word;
        card.dataset.lang = cardObj.lang;
        card.textContent = '';
        card.addEventListener('click', () => flipCard(card));
        container.appendChild(card);
      });

      function flipCard(card) {
        if(card.classList.contains('flipped') || secondCard) return;
        card.classList.add('flipped');
        card.textContent = card.dataset.word;

        if(!firstCard) {
          firstCard = card;
        } else {
          secondCard = card;
          setTimeout(checkMatch, 800);
        }
      }

      function checkMatch() {
        if(isPair(firstCard, secondCard)) {
          matches++;
          if(matches === palabras.length) {
            document.getElementById('resultado').textContent = '🎉 ¡Ganaste! Encontraste todos los pares.';
            document.getElementById('resultado').style.color = 'green';
          }
        } else {
          firstCard.classList.remove('flipped');
          firstCard.textContent = '';
          secondCard.classList.remove('flipped');
          secondCard.textContent = '';
        }
        firstCard = null;
        secondCard = null;
      }

      function isPair(card1, card2) {
        return (palabras.some(p => (p.es === card1.dataset.word && p.en === card2.dataset.word) || (p.en === card1.dataset.word && p.es === card2.dataset.word)));
      }

  // regresar al menu principal
  const backButton = document.createElement('button');
  backButton.textContent = 'Volver al menú principal';
  backButton.addEventListener('click', () => {
    window.location.href = '/'; // Cambia la URL según tu ruta principal
  });
  document.body.appendChild(backButton); 
