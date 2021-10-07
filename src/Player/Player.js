import React from 'react';
import { Box, Typography, Paper, LinearProgress } from '@mui/material';

export default function Player({ playerNumber, playerHealth, playerDraw }) {
  return (
    <Paper elevation={3} sx={{ padding: '1em' }}>
      <Typography variant="h6">Player {playerNumber}</Typography>
      <LinearProgress variant="determinate" value={100} />
      <Box sx={{
        width: '10em',
        height: '14em',
        border: '0.25em solid lightGrey',
        borderRadius: '0.3em',
      }}>
        {playerDraw}
      </Box>
    </Paper>
  );
}
