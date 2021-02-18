const hulk = document.querySelector('.hulk');
const background = document.querySelector('.background');
let estaPulando = false;
let posicao = 0;

criarTanks();
document.addEventListener('keyup', verificaSeApertouBotaoEspaco);

const keyCodeDaTeclaEspaco = 32;
function verificaSeApertouBotaoEspaco(event) {
	if (event.keyCode === keyCodeDaTeclaEspaco)
		if (!estaPulando) pula();
}

function pula() {
	estaPulando = true;
	let intervaloParaSubir = setInterval(() => {
		if (hulkJaEstaNoAlto())
			descerHulk(intervaloParaSubir, posicao);
		else {
			posicao += 20;
			alteraPosicaoDoHulk();
		}
	}, 20);
	posicao = 0;
}

function limpaIntervalo(intervalo) {
	clearInterval(intervalo);
}

function alteraPosicaoDoHulk() {
	hulk.style.bottom = posicao + 'px';
}

function hulkJaEstaNoAlto() {
	return posicao >= 150;
}

function hulkJaEstaEmBaixo() {
	return posicao <= 0;
}

function descerHulk(intervaloParaSubir) {
	limpaIntervalo(intervaloParaSubir);
	let intervaloParaDescer = setInterval(() => {
		if (hulkJaEstaEmBaixo()) {
			limpaIntervalo(intervaloParaDescer);
			estaPulando = false;
		} else {
			posicao -= 20;
			alteraPosicaoDoHulk();
		}
	}, 20);
}

function criarTanks() {
	const tanks = document.createElement('div');
	let posicaoDoTank = 1000;
	let posicaoAleatoria = Math.random() * 6000;

	tanks.classList.add('tanks');
	alteraPosicaoDoTank(tanks, posicaoDoTank)
	background.appendChild(tanks);

	let intervalParaEsquerda = setInterval(() => {
		if (tankSaiuDaTela(posicaoDoTank)) {
			limpaIntervalo(intervalParaEsquerda);
			background.removeChild(tanks);
		} else if (tankColidiuComHulk(posicaoDoTank)) {
			limpaIntervalo(intervalParaEsquerda);
			window.location.href = "gameover.html";
		} else {
			posicaoDoTank -= 10;
			alteraPosicaoDoTank(tanks, posicaoDoTank);
		}
	}, 20);

	setTimeout(criarTanks, posicaoAleatoria);
}

function alteraPosicaoDoTank(tanks, posicaoDoTank) {
	tanks.style.left = posicaoDoTank + 'px';
}

function tankSaiuDaTela(posicaoDoTank) {
	return posicaoDoTank < -60;
}

function tankColidiuComHulk(posicaoDoTank) {
	return posicaoDoTank > 0 && posicaoDoTank < 60 && posicao < 80;
}