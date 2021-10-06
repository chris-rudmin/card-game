class Deck {
  constructor() {
    this.cards = [
        '🂡', '🂱', '🃑', '🃁',
        '🂢', '🂲', '🃒', '🃂',
        '🂣', '🂳', '🃓', '🃃',
        '🂤', '🂴', '🃔', '🃄', 
        '🂥', '🂵', '🃕', '🃅',
        '🂦', '🂶', '🃖', '🃆',
        '🂧', '🂷', '🃗', '🃇',
        '🂨', '🂸', '🃘', '🃈',
        '🂩', '🂹', '🃙', '🃉',
        '🂪', '🂺', '🃚', '🃊',
        '🂫', '🂻', '🃛', '🃋',
        '🂭', '🂽', '🃝', '🃍',
        '🂮', '🂾', '🃞', '🃎',
      ];
  }

  shuffle() {
    let temp;

    // Fisher–Yates shuffle https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    for (var i = this.cards.length - 1; i > 0; i--) {
      const card2Index = Math.floor(Math.random() * (i+1));
      temp = this.cards[card2Index];
      this.cards[card2Index] = this.cards[i];
      this.cards[i] = temp;
    }
  }

  drawOne() {
    const card = this.cards.pop();

    // Card unicode values are in format U+1F0A1 with the last two bytes representing the suit and the rank
    var cardHex = card.codePointAt(0).toString(16).split('');
    const cardValueHex = cardHex.pop();
    const cardSuitHex = cardHex.pop();

    return {
      card: card, // unicode representation of the card
      suit: cardSuitHex, // 'a', 'b', 'c', 'd' representing spades, hearts, diamonds and clubs
      rank: parseInt(cardValueHex, 16), // values 1 to 14 representing ace through king. Value 12 is "knight" which is not used in our deck.
    };

  }
}

export default Deck;
