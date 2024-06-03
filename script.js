const suits = ["♠", "♣", "♥", "♦"];
const values = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

function changeBackground(imageUrl) { 
    document.body.style.backgroundImage = "url("+imageUrl+")"; 
}

function createDeck() {
    let deck=[];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
    return deck;
}

function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function compareCards(card1, card2) {
    const cardOrder = values;
    let value1 = cardOrder.indexOf(card1.value);
    let value2 = cardOrder.indexOf(card2.value);

    if (card1.value === '6' && card2.value === 'A') return 1;
    if (card2.value === '6' && card1.value === 'A') return -1;
    if (card1.value === card2.value) return 0;    
    return value1 - value2;
}

function updateDeckCounts() {
    document.getElementById('player1-pile').innerText = `Pile: ${player1Pile.length}`;
    document.getElementById('player2-pile').innerText = `Pile: ${player2Pile.length}`;
}

function displayPlayedCards(card1, card2) {
    const player1Played = document.getElementById('player1-played');
    const player2Played = document.getElementById('player2-played');
    player1Played.innerText = `${card1.value}  ${card1.suit}`;
    player2Played.innerText = `${card2.value}  ${card2.suit}`;
    player1Played.classList.remove("red-suit");
    player1Played.classList.remove('black-suit');
    player2Played.classList.remove("red-suit");
    player2Played.classList.remove('black-suit');
    if (card1.suit === '♥' || card1.suit === '♦') {
        player1Played.classList.add('red-suit');
    } else {
        player1Played.classList.add('black-suit');
    }
    if (card2.suit === '♥' || card2.suit === '♦') {
        player2Played.classList.add('red-suit');
    } else {
        player2Played.classList.add('black-suit');
    }
}

function renderDeck(playerDeck, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    playerDeck.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.innerText = `${card.value}  ${card.suit}`;
        if (card.suit === '♥' || card.suit === '♦') {
            cardDiv.classList.add('red-suit');
        } else {
            cardDiv.classList.add('black-suit');
        }
        cardDiv.addEventListener('click', () => {
            selectCard(playerDeck, index, containerId);
        });
        container.appendChild(cardDiv);
    });
}

function selectCard(playerDeck, index, containerId) {
    if (containerId === 'player1-deck-container') {
        selectedPlayer1Card = playerDeck.splice(index, 1)[0];
        renderDeck(playerDeck, containerId);
        playRound();
    }
}

function playRound() {
    if (!selectedPlayer1Card) return;

    selectedPlayer2Card = player2Deck.splice(Math.floor(Math.random() * player2Deck.length), 1)[0];

    displayPlayedCards(selectedPlayer1Card, selectedPlayer2Card);

    const result = compareCards(selectedPlayer1Card, selectedPlayer2Card);

    if(result > 0) {
        player1Pile.push(selectedPlayer1Card, selectedPlayer2Card);
    } else if(result < 0){
        player2Pile.push(selectedPlayer1Card, selectedPlayer2Card);
    } else{
        player1Deck.push(selectedPlayer1Card);
        player2Deck.push(selectedPlayer2Card);
    }

    selectedPlayer1Card = null;
    selectedPlayer2Card = null;

    updateDeckCounts();
    checkDecks();
}

function checkDecks() {
    if (player1Deck.length === 0 && player1Pile.length > 0) {
        player1Deck = player1Pile;
        player1Pile = [];
        renderDeck(player1Deck, 'player1-deck-container');
    }
    if (player2Deck.length === 0 && player2Pile.length > 0) {
        player2Deck = player2Pile;
        player2Pile = [];
    }
    if (player1Deck.length === 0 || player2Deck.length === 0) {
        alert(player1Deck.length === 0 ? 'Opponent wins!' : 'Player wins!');
    }
}

let deck = shuffle(createDeck());
let player1Deck = deck.slice(0, 18);
let player2Deck = deck.slice(18);
let player1Pile = [];
let player2Pile = [];
let selectedPlayer1Card = null;
let selectedPlayer2Card = null;

renderDeck(player1Deck, 'player1-deck-container');
updateDeckCounts();
