const menu = document.getElementById("menu");
const gameBoard = document.getElementById("gameBoard");
const memoryGame = document.getElementById("memoryGame");

const categoryName = document.getElementById("categoryName");

const attemptsElement = document.getElementById("attempts");
const pairsElement = document.getElementById("pairs");

const messageElement = document.getElementById("gameMessage");

const restartButton = document.getElementById("restartButton");
const menuButton = document.getElementById("menuButton");

const categoryButtons = document.querySelectorAll(".category-button");


let firstCard = null;
let secondCard = null;

let lockBoard = false;

let attempts = 0;
let pairs = 0;

let currentCategory = "";


/* =========================
   ESCOLHER CATEGORIA
   ========================= */

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        currentCategory = button.dataset.category;

        startGame();

    });

});


/* =========================
   INICIAR O JOGO
   ========================= */

function startGame() {

    menu.style.display = "none";
    gameBoard.style.display = "block";

    firstCard = null;
    secondCard = null;

    lockBoard = false;

    attempts = 0;
    pairs = 0;

    attemptsElement.textContent = attempts;
    pairsElement.textContent = pairs;

    messageElement.textContent = "";

    showCategoryName();

    createCards();

}


/* =========================
   MOSTRAR NOME DA CATEGORIA
   ========================= */

function showCategoryName() {

    const names = {
        cidades: "Cidades",
        plantas: "Plantas",
        pessoas: "Pessoas"
    };

    categoryName.textContent = "Categoria: " + names[currentCategory];

}


/* =========================
   CRIAR AS CARTAS
   ========================= */

function createCards() {

    memoryGame.innerHTML = "";

    const cards = [];

    for (let i = 1; i <= 8; i++) {

        cards.push(i);
        cards.push(i);

    }

    shuffleCards(cards);

    cards.forEach(cardNumber => {

        const card = document.createElement("button");

        card.classList.add("card");

        card.dataset.card = cardNumber;

        const image = document.createElement("img");

        image.src = `assets/img/${currentCategory}/${cardNumber}.jpg`;

        image.alt = `Obra de arte ${cardNumber}`;

        card.appendChild(image);

        card.addEventListener("click", flipCard);

        memoryGame.appendChild(card);

    });

}


/* =========================
   EMBARALHAR AS CARTAS
   ========================= */

function shuffleCards(cards) {

    cards.sort(() => Math.random() - 0.5);

}


/* =========================
   VIRAR CARTA
   ========================= */

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


/* =========================
   VERIFICAR O PAR
   ========================= */

function checkMatch() {

    const firstCardValue = firstCard.dataset.card;
    const secondCardValue = secondCard.dataset.card;

    if (firstCardValue === secondCardValue) {

        markAsMatched();

    } else {

        unflipCards();

    }

}


/* =========================
   MARCAR PAR ENCONTRADO
   ========================= */

function markAsMatched() {

    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    pairs++;

    pairsElement.textContent = pairs;

    resetBoard();

    if (pairs === 8) {

        messageElement.textContent =
            "Parabéns! Você encontrou todos os pares!";

    }

}


/* =========================
   ESCONDER CARTAS ERRADAS
   ========================= */

function unflipCards() {

    // Bloqueia novos cliques enquanto as cartas estão sendo escondidas.
    lockBoard = true;

    setTimeout(() => {

        // Remove a classe "flipped" para esconder as imagens das cartas.
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");

        // Depois de esconder as cartas, reseta o estado da jogada.
        resetBoard();

    }, 1000);

}


/* =========================
   RESETAR ESTADO DA JOGADA
   ========================= */

function resetBoard() {

    // Limpa as cartas selecionadas para permitir uma nova jogada.
    firstCard = null;
    secondCard = null;

    // Libera o tabuleiro para que o jogador possa clicar novamente.
    lockBoard = false;

}


/* =========================
   NOVO JOGO
   ========================= */

restartButton.addEventListener("click", () => {

    startGame();

});


/* =========================
   VOLTAR AO MENU
   ========================= */ 

menuButton.addEventListener("click", () => {

    gameBoard.style.display = "none";

    menu.style.display = "block";

    memoryGame.innerHTML = "";

    messageElement.textContent = "";

});