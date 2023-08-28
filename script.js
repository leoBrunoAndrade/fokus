const html = document.querySelector('html');
const dataContexto = 'data-contexto';

const appImagem = document.querySelector('.app__image');

const botoes = document.querySelectorAll('.app__card-button');

const focoBt = document.querySelector('.app__card-button--foco');

const curtoBt = document.querySelector('.app__card-button--curto');

const longoBt = document.querySelector('.app__card-button--longo');

const tempoNaTela = document.querySelector('#timer');

const titulo = document.querySelector('.app__title');

const subTitulo = document.querySelector('.app__title-strong');

const musicaFoco = document.getElementById('alternar-musica');

const iniciarPausarBt = document.querySelector('#start-pause span');

const icone = document.querySelector('.app__card-primary-butto-icon');

const musica = new Audio('/sons/luna-rise-part-one.mp3');

const inciarContagemAudio = new Audio('/sons/play.wav');

const pararContagemAudio = new Audio('/sons/pause.mp3');

const contagemFimAudio = new Audio('/sons/beep.mp3');

const botaoIniciar = document.getElementById('start-pause');

musica.loop = true;
const tempoDefault = 1500
let tempoDecorridoSegundos = tempoDefault;
let intervaloId;


focoBt.addEventListener('click', (event) => {
  tempoDecorridoSegundos = tempoDefault;
  alterarContexto('foco');
  alterarContextoTexto('Otimize sua produtividade,', 'mergulhe no que importa.');
  focoBt.classList.add('active');
  
});

curtoBt.addEventListener('click', () => {
  tempoDecorridoSegundos = 300;
  alterarContexto('descanso-curto');
  alterarContextoTexto('Que tal dar uma respirada?', 'Faça uma pausa curta!');
  curtoBt.classList.add('active');
});


longoBt.addEventListener('click', () => {
  tempoDecorridoSegundos = 900;
  alterarContexto('descanso-longo');
  alterarContextoTexto('Hora de voltar à superfície.', 'Faça uma pausa longa.');
  longoBt.classList.add('active');
});


musicaFoco.addEventListener('change', () => {
  if(musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});


function alterarContexto(contexto) {  

  botoes.forEach(function (b){
    b.classList.remove('active');
    exibirTempo();
  });

  html.setAttribute(dataContexto, contexto);
  appImagem.setAttribute('src', `/imagens/${contexto}.png`);
  
}

function alterarContextoTexto(tituloTexto, subtituloTexto) {
  titulo.innerHTML  = `${tituloTexto} <strong class="app__title-strong">${subtituloTexto}</strong>`;
}

const contagemRegressiva = () => {
  if(tempoDecorridoSegundos <= 0) {
    parar();
    contagemFimAudio.play();
    tempoDecorridoSegundos = tempoDefault;
    return;
  }
  tempoDecorridoSegundos--;
  exibirTempo();
}

function iniciar() {
  contagemFimAudio.pause();
  contagemFimAudio.currentTime = 0;
  if(intervaloId) {
      parar();
      pararContagemAudio.play();
      return;
  }
  iniciarPausarBt.textContent = "Pause";
  inciarContagemAudio.play();
  icone.setAttribute('src', '/imagens/pause.png');
  intervaloId = setInterval(contagemRegressiva, 1000);
}

botaoIniciar.addEventListener('click', iniciar);

function parar() {
  clearInterval(intervaloId);
  intervaloId = null;
  iniciarPausarBt.textContent = "Começar";
  icone.setAttribute('src', '/imagens/play_arrow.png');

}

function exibirTempo() {
  const tempo = new Date(tempoDecorridoSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

exibirTempo();