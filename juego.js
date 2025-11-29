
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Preguntas y valores del test
  const preguntas = [
    // Amarillo (Alerta)
    { texto: "¿Te hace bromas hirientes o piropos ofensivos?", valor: 2 },
    { texto: "¿Controla tus redes sociales o relaciones con tu familia?", valor: 4 },
    { texto: "¿Descalifica tus opiniones o te miente?", valor: 5 },
    // Naranja (Reacciona)
    { texto: "¿Te trata con desprecio o te insulta?", valor: 7 },
    { texto: "¿Te empuja, te jalonea, pellizca o araña?", valor: 8 },
    { texto: "¿Maneja y dispone de tu dinero o documentos sin tu permiso?", valor: 9 },
    // Rojo (Urgente)
    { texto: "¿Te golpea o agrede físicamente?", valor: 13 },
    { texto: "¿Te obliga a tener relaciones sexuales (violación)?", valor: 15 },
    { texto: "¿Te amenaza de muerte o aísla de tus seres queridos?", valor: 20 }
  ];

  // Estado
  let indicePreguntaActual = 0;
  let puntuacionTotal = 0;

  // Referencias DOM
  const juegoPrincipal = document.getElementById('juego-principal');
  const juegoContainer = document.getElementById('juego-container');
  const preguntaContainer = document.getElementById('pregunta-container');
  const resultadoContainer = document.getElementById('resultado-container');
  const btnIniciar = document.getElementById('btn-iniciar');
  const btnSi = document.getElementById('btn-si');
  const btnNo = document.getElementById('btn-no');
  const btnReiniciar = document.getElementById('btn-reiniciar');
  const instruccionParrafo = juegoPrincipal ? juegoPrincipal.querySelector('p') : null;

  if (!juegoPrincipal || !juegoContainer || !preguntaContainer || !resultadoContainer || !btnIniciar || !btnSi || !btnNo || !btnReiniciar || !instruccionParrafo) {
    console.warn('Faltan elementos del juego en el DOM.');
    return;
  }

  // Estado inicial
  juegoContainer.style.display = 'none';
  instruccionParrafo.style.display = 'none';
  btnIniciar.style.display = 'block';
  btnReiniciar.style.display = 'none';

  function iniciarJuego() {
    btnIniciar.style.display = 'none';
    instruccionParrafo.style.display = 'block';
    juegoContainer.style.display = 'flex';
    btnReiniciar.style.display = 'none';
    indicePreguntaActual = 0;
    puntuacionTotal = 0;
    mostrarPregunta();
  }

  function reiniciarJuego() {
    indicePreguntaActual = 0;
    puntuacionTotal = 0;
    resultadoContainer.style.display = 'none';
    resultadoContainer.className = '';
    instruccionParrafo.style.display = 'block';
    juegoContainer.style.display = 'none';
    btnReiniciar.style.display = 'none';
    btnIniciar.style.display = 'block';
  }

  function mostrarPregunta() {
    if (indicePreguntaActual < preguntas.length) {
      preguntaContainer.textContent = preguntas[indicePreguntaActual].texto;
    } else {
      mostrarResultado();
    }
  }

  function manejarRespuesta(esAfirmativa) {
    if (indicePreguntaActual < preguntas.length) {
      if (esAfirmativa) {
        puntuacionTotal += preguntas[indicePreguntaActual].valor;
      }
      indicePreguntaActual++;
      mostrarPregunta();
    }
  }

  function mostrarResultado() {
    juegoContainer.style.display = 'none';
    instruccionParrafo.style.display = 'none';
    let mensaje = "";
    let claseColor = "";

    if (puntuacionTotal >= 45) {
      mensaje = "\uD83D\uDD34 ¡URGENTE! RIESGO DE FEMINICIDIO <br><br> Tu vida corre PELIGRO INMINENTE. Llama a las autoridades de inmediato (Línea de emergencia).";
      claseColor = "urgente";
    } else if (puntuacionTotal >= 16) {
      mensaje = "\uD83D\uDFE0 ¡REACCIONA! LA VIOLENCIA ESCALA <br><br> La situación es peligrosa. Busca una red de apoyo confiable y establece límites claros AHORA.";
      claseColor = "reacciona";
    } else if (puntuacionTotal >= 1 && puntuacionTotal <= 15) {
      mensaje = "\uD83D\uDFE1 ALERTA: IDENTIFICA LAS SEÑALES <br><br> ¡Cuidado! Estás en las primeras etapas de violencia. Infórmate y habla con alguien de confianza.";
      claseColor = "alerta";
    } else {
      mensaje = "\uD83D\uDFE3 CONCIENTIZACIÓN <br><br> Este test es educativo. Si sientes incomodidad o miedo, busca orientación profesional.";
      claseColor = "nop";
    }

    resultadoContainer.innerHTML = `<h3>Resultado</h3><p>${mensaje}</p>`;
    resultadoContainer.classList.add(claseColor);
    resultadoContainer.style.display = 'block';
    btnReiniciar.style.display = 'block';
  }

  // Eventos
  btnIniciar.addEventListener('click', iniciarJuego);
  btnSi.addEventListener('click', () => manejarRespuesta(true));
  btnNo.addEventListener('click', () => manejarRespuesta(false));
  btnReiniciar.addEventListener('click', reiniciarJuego);
});
