import React from 'react';
import { Box, Typography, Paper, LinearProgress, Grid } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function Player({ playerNumber, playerHealth, playerDraw }) {
  return (
    <Paper elevation={3} sx={{ padding: '1em' }}>
      <Typography variant="h6">Player {playerNumber}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <FavoriteIcon sx={{ color: 'red' }} fontSize="small"/>
        </Grid>
        <Grid item xs={11}>
          <LinearProgress variant="determinate" value={playerHealth} sx={{
            height: 10,
            borderRadius: 5,
            marginTop: '0.4em',
          }} />
        </Grid>
      </Grid>
      <Box
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          width: '13em',
          height: '16em',
          border: '0.25em solid lightGrey',
          borderRadius: '0.3em',
          marginTop: '2em',
          marginBottom: '1em',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {playerDraw}
      </Box>
    </Paper>
  );
}
