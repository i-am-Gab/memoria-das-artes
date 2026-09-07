const game = document.getElementById("memoryGame");
const attemptsElement = document.getElementById("attempts");
const pairsElement = document.getElementById("pairs");
const messageElement = document.getElementById("gameMessage");
const restartButton = document.getElementById("restartButton");

let firstCard = null;
let secondCard = null;

let lockBoard = false;

let attempts = 0;
let pairs = 0;


/* Inicia o jogo */

function startGame() {
    firstCard = null;
    secondCard = null;

    lockBoard = false;

    attempts = 0;
    pairs = 0;

    attemptsElement.textContent = attempts;
    pairsElement.textContent = pairs;

    messageElement.textContent = "";

    shuffleCards();
}


/* Embaralha as cartas */

function shuffleCards() {
    const cards = Array.from(document.querySelectorAll(".card"));

    cards.sort(() => Math.random() - 0.5);

    cards.forEach(card => {
        game.appendChild(card);

        card.classList.remove("flipped");
        card.classList.remove("matched");
    });
}


/* Quando uma carta é clicada */

function flipCard() {

    if (lockBoard) {
        return;
    }

    if (this === firstCard) {
        return;
    }

    if (this.classList.contains("matched")) {
        return;
    }

    this.classList.add("flipped");

    if (firstCard === null) {
        firstCard = this;
        return;
    }

    secondCard = this;

    attempts++;

    attemptsElement.textContent = attempts;

    checkMatch();
}


/* Verifica se as cartas formam um par */

function checkMatch() {

    const firstCardValue = firstCard.dataset.card;
    const secondCardValue = secondCard.dataset.card;

    if (firstCardValue === secondCardValue) {
        markAsMatched();
    } else {
        unflipCards();
    }
}


/* Marca as cartas como encontradas */

function markAsMatched() {

    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    pairs++;

    pairsElement.textContent = pairs;

    resetBoard();

    if (pairs === 8) {
        messageElement.textContent = "Parabéns! Você encontrou todos os pares!";
    }
}


/* Esconde as cartas que não combinam */

function unflipCards() {

    lockBoard = true;

    setTimeout(() => {

        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");

        resetBoard();

    }, 1000);
}


/* Prepara o jogo para a próxima tentativa */

function resetBoard() {

    firstCard = null;
    secondCard = null;

    lockBoard = false;
}


/* Adiciona o evento de clique às cartas */

const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});


/* Reinicia o jogo */

restartButton.addEventListener("click", startGame);


/* Começa o jogo */

startGame();