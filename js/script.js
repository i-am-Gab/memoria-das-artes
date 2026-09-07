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

const imageModal = document.getElementById("imageModal");
const largeImage = document.getElementById("largeImage");
const closeModal = document.getElementById("closeModal");

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

    // Se o tabuleiro estiver bloqueado, não permite clicar.
    if (lockBoard) {
        return;
    }


    // Se a carta já foi encontrada,
    // abre a pintura em tamanho maior.
    if (this.classList.contains("matched")) {

        openImage(this);

        return;
    }


    // Impede clicar duas vezes na mesma carta.
    if (this === firstCard) {
        return;
    }


    // Mostra a imagem da carta.
    this.classList.add("flipped");


    // Se for a primeira carta selecionada,
    // guarda a carta e espera a segunda.
    if (firstCard === null) {

        firstCard = this;

        return;
    }


    // Guarda a segunda carta selecionada.
    secondCard = this;


    // Aumenta o número de tentativas.
    attempts++;

    attemptsElement.textContent = attempts;


    // Verifica se as duas cartas formam um par.
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

        createConfetti();

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


/* =========================
   ABRIR PINTURA AMPLIADA
   ========================= */

function openImage(card) {

    // Pega a imagem que está dentro da carta.
    const image = card.querySelector("img");


    // Coloca o endereço da imagem na janela.
    largeImage.src = image.src;


    // Usa o texto alternativo da carta.
    largeImage.alt = image.alt;


    // Mostra a janela.
    imageModal.classList.add("show");

}

/* =========================
   FECHAR PINTURA AMPLIADA
   ========================= */

closeModal.addEventListener("click", () => {

    imageModal.classList.remove("show");

});

/* =========================
   CLIQUE FORA PARA FECHAR
   ========================= */

imageModal.addEventListener("click", (event) => {

    if (event.target === imageModal) {

        imageModal.classList.remove("show");

    }

});

/* =========================
   CRIAR CONFETES
   ========================= */

function createConfetti() {

    // Cria 100 pedaços de confete.
    for (let i = 0; i < 100; i++) {

        const confetti = document.createElement("div");

        confetti.classList.add("confetti");


        // Escolhe uma posição horizontal aleatória.
        confetti.style.left =
            Math.random() * 100 + "%";


        // Escolhe uma cor aleatória.
        const colors = [
            "#f44336",
            "#2196f3",
            "#4caf50",
            "#ffeb3b",
            "#ff9800",
            "#9c27b0"
        ];

        confetti.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];


        // Escolhe um tamanho aleatório.
        const size = Math.random() * 8 + 6;

        confetti.style.width = size + "px";
        confetti.style.height = size + "px";


        // Faz cada confete cair em uma velocidade diferente.
        confetti.style.animationDuration =
            Math.random() * 2 + 2 + "s";


        // Adiciona o confete à página.
        document.body.appendChild(confetti);


        // Remove o confete depois da animação.
        setTimeout(() => {

            confetti.remove();

        }, 4000);

    }

}