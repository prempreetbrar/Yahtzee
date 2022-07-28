import { useEffect, useState } from 'react';

import { Box, Paper } from "@mui/material";
import {scoreUpperSection, threeOfAKind, fourOfAKind, fullHouse, smallStraight, largeStraight, yahtzee} from "./ScoreCalculator";
import Dice from "./Dice.js";
import Scoreboard from './Scoreboard.js';
import "./Game.css"
import Button from '@mui/material/Button';

const NUM_OF_DICE = 5;
const SIDES_ON_DIE = 6;
const STARTING_NUM_OF_ROLLS = 3;

export default function Game() {
  const [dice, setDice] = useState(Array(NUM_OF_DICE).fill(1));
  const [isRolling, setIsRolling] = useState(false);
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
    chance: null,
    yahtzee: null
  });
  const [rollsLeft, setRollsLeft] = useState(STARTING_NUM_OF_ROLLS);

  function rollDice(event) {
    setIsRolling(true);
    setDice(dice.map((die, i) => {
      if (locked[i]) return die;
      const randomNumber = Math.floor(Math.random() * SIDES_ON_DIE) + 1;
      return randomNumber;
    }));
    setRollsLeft(rollsLeft - 1);
    setIsRolling(false);
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
    setRollsLeft(STARTING_NUM_OF_ROLLS);
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
            <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
              <Scoreboard scores={scores} updateScore={updateScore}/>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Dice dice={dice} isRolling={isRolling} locked={locked} toggleLockOnDie={toggleLockOnDie}/>
                <Button variant="contained" sx={
                  {fontFamily: "Roboto", 
                  fontWeight: 300, 
                  fontSize: "1.5rem", 
                  backgroundColor: "#415A77",
                  ":hover": {
                    backgroundColor: "#1B263B"
                  } ,
                  textTransform: "capitalize",
                  borderRadius: "0.5rem"}} disabled={rollsLeft === 0} onClick={rollDice}>Roll</Button>
              </Box>
            </Box>
        </Paper>
    </>
  )
}