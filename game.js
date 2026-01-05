let deck = [];
let hand = [];
let discardTop = null;

function init() {
  deck = createDeck();
  shuffle(deck);
  hand = deck.splice(0, 3);
  discardTop = deck.pop();
  render();
}

function createDeck() {
  const suits = ["♠", "♥", "♦", "♣"];
  const ranks = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
  return suits.flatMap(suit =>
    ranks.map(rank => ({ suit, rank }))
  );
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function drawCard() {
  if (deck.length === 0) return;
  hand.push(deck.pop());
  render();
}

function playCard(index) {
  discardTop = hand.splice(index, 1)[0];
  render();
}

function render() {
  document.getElementById("discard").textContent =
    discardTop ? `${discardTop.suit}${discardTop.rank}` : "";

  const handDiv = document.getElementById("hand");
  handDiv.innerHTML = "";
  hand.forEach((card, i) => {
    const btn = document.createElement("button");
    btn.textContent = `${card.suit}${card.rank}`;
    btn.onclick = () => playCard(i);
    handDiv.appendChild(btn);
  });
}

init();