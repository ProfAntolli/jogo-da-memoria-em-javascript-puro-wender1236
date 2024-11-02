const gameBoard = document.querySelector('.game-board');
let firstCard = null;
let secondCard = null;
let lockBoard = false;

const images = ['🍎', '🍌', '🍇', '🍉', '🍒', '🍑', '🍍', '🍓']; // Ícones de frutas
const deck = [...images, ...images]; // Duplicar imagens para pares
const colors = [
    '#FF6347', '#FFD700', '#ADFF2F', '#40E0D0', 
    '#FF69B4', '#BA55D3', '#1E90FF', '#FF4500'
];


// Embaralhar as cartas
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

// Configura e cria as cartas
function createBoard() {
    shuffle(deck);
    gameBoard.innerHTML = ''; // Limpa o tabuleiro para reiniciar
    deck.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}
function flipCard() {
    if (lockBoard || this === firstCard) return;
    this.classList.add('flipped');
    this.textContent = this.dataset.image;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        checkForMatch();
    }
}

function checkForMatch() {
    lockBoard = true;
    const isMatch = firstCard.dataset.image === secondCard.dataset.image;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}
function resetGame() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    createBoard();
}
document.addEventListener('DOMContentLoaded', createBoard);
