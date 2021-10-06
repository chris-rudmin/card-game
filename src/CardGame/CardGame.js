import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
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
        '🂭', '🂽', '🃝', '🃍',
        '🂮', '🂾', '🃞', '🃎',
      ].map((card, cardIndex) => {
        const color = cardIndex%2 ? 'red' : 'black';
        const fontSize = '12em';
        return (
          <Grid style={{color, fontSize}} key={cardIndex} item>{card}</Grid>
        );
      })
    };
  }

  shuffle() {
    this.setState(({ cards }) => {
      let shuffledCards = [...cards];
      let temp;

      // Fisher–Yates shuffle
      for (var i = shuffledCards.length - 1; i > 0; i--) {
        const card2Index = Math.floor(Math.random() * (i+1));
        temp = shuffledCards[card2Index];
        shuffledCards[card2Index] = shuffledCards[i];
        shuffledCards[i] = temp;
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
        <Grid container spacing={1}>
          {cards}
        </Grid>
      </Container>
    );
  }
}

export default Deck;
