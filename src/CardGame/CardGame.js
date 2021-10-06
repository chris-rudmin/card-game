import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';


class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
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
        '🂬', '🂼', '🃜', '🃌',
        '🂭', '🂽', '🃝', '🃍',
        '🂮', '🂾', '🃞', '🃎',
      ]
    };

    this.state.cards = this.state.cards.map((card, cardIndex) => {
      const color = cardIndex%2 ? 'red' : 'black';
      return (
        <Typography style={{color}} variant='h1' key={cardIndex}>{card}</Typography>
      );
    })
  }

  shuffle() {
    this.setState(({ cards }) => {
      let shuffledCards = [...cards];
      
      // Fisher–Yates shuffle
      for (var i = 0;  i < 51; i++) {
        const card2Index = Math.floor(Math.random() * 50 - i) + i;
        const card2 = shuffledCards[card2Index];
        shuffledCards[card2Index] = shuffledCards[i];
        shuffledCards[i] = card2;
      }

      return {
        cards: shuffledCards
      };
    })
  }

  render() {
    const { cards } = this.state;
    return (
      <Container fixed>
        <Button onClick={() => this.shuffle()}>Shuffle</Button>
        <div>{cards}</div>
      </Container>
    );
  }
}

export default Deck;
