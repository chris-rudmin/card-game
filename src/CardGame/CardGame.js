import React from 'react';
import { Container, Button, AppBar, Toolbar, Typography, Grid } from '@mui/material';
import Deck from '../Deck';
import Player from '../Player/Player';

class CardGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player1Draw: null,
      player2Draw: null,
      consecutiveTies: 0,
      battleCount: 0,
      player1Health: 100,
      player2Health: 100,
    };

    this.newGame();
  }

  newGame() {
    this.player1Deck = new Deck();
    this.player2Deck = new Deck();
    this.player1Deck.shuffle();
    this.player2Deck.shuffle();

    this.setState(() => ({
      player1Draw: null,
      player2Draw: null,
      consecutiveTies: 0,
      battleCount: 0,
      player1Health: 100,
      player2Health: 100,
    }));
  }

  renderCard(card) {
    const color = (card.suit === 'b' || card.suit === 'c') ? 'red' : 'black';
    const fontSize = '16em';
    const lineHeight = '0.7em';
    return <span style={{color, fontSize, lineHeight}}>{card.card}</span>
  }

  battle() {
    const player1card = this.player1Deck.drawOne();
    const player2card = this.player2Deck.drawOne();

    this.setState((state) => ({
      player1Draw: this.renderCard(player1card),
      player2Draw: this.renderCard(player2card),
      battleCount: state.battleCount + 1,
    }));
  }

  render() {
    const { player1Draw, player2Draw, player1Health, player2Health, battleCount } = this.state;
    return (
      <div>
        <AppBar position="static" sx={{
          marginBottom: '3em'
        }}>
          <Toolbar>
            <Typography variant="h5">Ace's High</Typography>
          </Toolbar>
        </AppBar>

        <Container fixed>
          <Typography variant="subtitle">Defeat your opponent by winning the high card draw. Each win does damage to your opponent. Ace is high and in the case of a tie, the damage multiplier is increased for a maximum of 3x damage.</Typography>

          <Grid container spacing={2} sx={{marginTop: '2em', textAlign: 'center'}}>
            <Grid item xs={12} md={5}>
              <Player playerNumber='1' playerDraw={player1Draw} playerHealth={player1Health}/>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button onClick={() => this.newGame()} variant="outlined" size="small">New Game</Button>
              <Button onClick={() => this.battle()} variant="contained" size="large">BATTLE</Button>
              <Typography variant="subtitle">Remaining cards: {52 - battleCount}</Typography>
            </Grid>
            <Grid item xs={12} md={5}>
              <Player playerNumber='2' playerDraw={player2Draw} playerHealth={player2Health}/>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default CardGame;
