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

    if (card) {
      // Card unicode values are in format U+1F0A1 with the last two hex values representing the suit and the rank
      const hex = card.codePointAt(0).toString(16).split('');

      // Values 1 to 14 representing ace through king
      // Value 12 is for "knight" which is not used in our deck
      const rank = parseInt(hex.pop(), 16); 
      
      // 'a', 'b', 'c', 'd' representing spades, hearts, diamonds and clubs respectively
      const suit = hex.pop(); 

      return { card, suit, rank };
    }
  }
}

export default Deck;
