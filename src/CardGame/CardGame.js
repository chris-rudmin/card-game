import React from 'react';
import { Container, Button, Box, } from '@mui/material';
import Deck from '../Deck';

class CardGame extends React.Component {
  constructor(props) {
    super(props);
    this.deck = new Deck();
    this.state = {
      drawnCard: null,
    };
  }

  drawOne() {
    const card = this.deck.drawOne();
    const color = (card.suit === 'b' || card.suit === 'c') ? 'red' : 'black';
    const fontSize = '16em';

    this.setState(() => ({
      drawnCard: <span style={{color, fontSize}}>{card.card}</span>,
    }));
  }

  render() {
    const { drawnCard } = this.state;
    return (
      <Container fixed>
        <Button onClick={() => this.deck.shuffle()} variant="outlined">Shuffle</Button>
        <Button onClick={() => this.drawOne()} variant="outlined">Draw Card</Button>
        { drawnCard ? drawnCard : (
          <Box sx={{
            width: '10em',
            height: '14em',
            border: '0.25em solid red',
            borderRadius: '0.3em',
          }} />
        )}
      </Container>
    );
  }
}

export default CardGame;
