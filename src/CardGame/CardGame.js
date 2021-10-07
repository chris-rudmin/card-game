import React from 'react';
import { Container, Button, AppBar, Toolbar, Typography, Grid, Box, Paper } from '@mui/material';
import Deck from '../Deck';
import Player from '../Player/Player';


class CardGame extends React.Component {
  constructor(props) {
    super(props);
    this.player1Deck = new Deck();
    this.player2Deck = new Deck();
    this.player1Deck.shuffle();
    this.player2Deck.shuffle();
    this.state = {
      player1Draw: null,
      player2Draw: null,
      consecutiveTies: 0,
      battleCount: 0,
      player1Health: 100,
      player2Health: 100,
      gameOver: false,
      winner: 0,
    };
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
      gameOver: false,
      winner: 0,
    }));
  }

  renderCard(card) {
    const color = (card.suit === 'b' || card.suit === 'c') ? 'red' : 'black';
    const fontSize = '16em';
    const lineHeight = '0.8em';
    return <span style={{color, fontSize, lineHeight}}>{card.card}</span>
  }

  battle() {
    const player1Draw = this.player1Deck.drawOne();
    const player2Draw = this.player2Deck.drawOne();

    // Tie
    if (player1Draw.rank === player2Draw.rank) {
      this.setState((state) => ({
        ...state,
        player1Draw: this.renderCard(player1Draw),
        player2Draw: this.renderCard(player2Draw),
        consecutiveTies: state.consecutiveTies + 1,
        battleCount: state.battleCount + 1,
        gameOver: state.battleCount === 51,
      }));
    }

    // Do damage
    else {
      this.setState((state) => {
        const damageMultiplier = Math.min((state.consecutiveTies + 1)*2, 6) * 2;
        var gameOver = false;
        var winner = 0;
        var player1Damage = 0;
        var player2Damage = 0;

        // Ace trumps
        if (player1Draw.rank === 1) {
          player2Damage = (15 - player2Draw.rank) * damageMultiplier;
        }

        // Ace trumps
        else if (player2Draw.rank === 1) {
          player1Damage = (15 - player1Draw.rank) * damageMultiplier;
        }

        // Calulate damage
        else {
          player1Damage = Math.max(player2Draw.rank - player1Draw.rank, 0) * damageMultiplier;
          player2Damage = Math.max(player1Draw.rank - player2Draw.rank, 0) * damageMultiplier;
        }

        // Player 1 wins
        if (state.player2Health - player2Damage <= 0) {
          gameOver = true;
          winner = 1;
        }

        // Player 2 wins
        if (state.player1Health - player1Damage <= 0) {
          gameOver = true;
          winner = 2;
        }

        // No more cards
        if (state.battleCount === 51) {
          gameOver = true;
          winner = 0;
        }

        return {
          ...state,
          player1Draw: this.renderCard(player1Draw),
          player2Draw: this.renderCard(player2Draw),
          consecutiveTies: 0,
          battleCount: state.battleCount + 1,
          player1Health: state.player1Health - player1Damage,
          player2Health: state.player2Health - player2Damage,
          gameOver,
          winner,
        }
      });
    }
  }

  render() {
    const { player1Draw, player2Draw, player1Health, player2Health, battleCount, gameOver, winner } = this.state;

    return (
      <div>
        <AppBar position="static" sx={{ marginBottom: '2em' }}>
          <Toolbar>
            <Typography variant="h5" sx={{ flexGrow: 1 }}>Ace's High</Typography>
            <Button onClick={() => this.newGame()} variant="outlined" size="small" color='inherit'>New Game</Button>
          </Toolbar>
        </AppBar>

        <Container fixed>
          <Typography variant="subtitle1" sx={{ marginBottom: '2em' }}>
            Defeat your opponent by winning the high card draw. Each win does damage to your opponent.
            The damage is calculated by the difference in card values.
            Ace is the high card. In the case of a tie, the damage multiplier increases for a maximum of 6x damage.
          </Typography>

          {gameOver ? (
            <Paper elevation={3} sx={{ padding: '1em', textAlign: 'center' }}>
              <Typography variant="h2" sx={{ marginBottom: '1em', marginTop: '1em' }}>
                { winner ? `Player ${winner} is victorious!` : `Stalemate!` }
              </Typography>
              <Button onClick={() => this.newGame()} variant="outlined" size="large">Play Again</Button>
            </Paper>
          ) : (
            <Grid container spacing={2} sx={{ textAlign: 'center' }}>

              <Grid item xs={12} md={5}>
                <Player playerNumber='1' playerDraw={player1Draw} playerHealth={player1Health}/>
              </Grid>

              <Grid item xs={12} md={2} sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '1em',
                marginBottom: '1em',
              }}>
                <Box>
                  <Button onClick={() => this.battle()} variant="contained" size="large">BATTLE</Button>
                  <Typography variant="subtitle2">Remaining: {52 - battleCount}</Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={5}>
                <Player playerNumber='2' playerDraw={player2Draw} playerHealth={player2Health}/>
              </Grid>
            </Grid>
          )}

        </Container>
      </div>
    );
  }
}

export default CardGame;
