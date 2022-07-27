import { useState } from 'react';

import { Box, Paper } from "@mui/material";
import {scoreUpperSection, threeOfAKind, fourOfAKind, fullHouse, smallStraight, largeStraight, yahtzee} from "./ScoreCalculator";
import Dice from "./Dice.js";
import Scoreboard from './Scoreboard.js';
import "./Game.css"
import Button from '@mui/material/Button';

const NUM_OF_DICE = 5;
const SIDES_ON_DIE = 6;

export default function Game() {
  const [dice, setDice] = useState(Array(NUM_OF_DICE).fill(1));
  const [locked, setLocked] = useState(Array(NUM_OF_DICE).fill(false));
  const [scores, setScores] = useState({
    ones: null,
    twos: null,
    threes: null,
    fours: null,
    fives: null,
    sixes: null, 

    threeOfAKind: null,
    fourOfAKind: null,
    fullHouse: null,
    smallStraight: null,
    largeStraight: null,
    chance: null
  });

  function rollDice(event) {
    setDice(dice.map((die, i) => {
      if (locked[i]) return die;
      const randomNumber = Math.floor(Math.random() * SIDES_ON_DIE) + 1;
      return randomNumber;
    }));
  }

  function toggleLockOnDie(i) {
    setLocked([
      ...locked.slice(0, i),
      !locked[i],
      ...locked.slice(i + 1)
    ]);
  }

  function updateScore(scoreName, fn) {
    setScores({...scores, [scoreName]: fn(dice)});
  }

  return (
    <>
        <Paper 
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2 className="Game-title">Yahtzee!</h2>
            <Box display="flex" flexDirection="row">
              <Scoreboard scores={scores} updateScore={updateScore}/>
              <Dice dice={dice} toggleLockOnDie={toggleLockOnDie}/>
              <Button variant="contained" sx={
                {fontFamily: "Roboto", 
                fontWeight: 300, 
                fontSize: "2rem", 
                backgroundColor: "#415A77",
                ":hover": {
                  backgroundColor: "#0D1B2A"
                } ,
                borderRadius: "0.5rem"}}onClick={rollDice}>Roll</Button>
            </Box>
        </Paper>
    </>
  )
}