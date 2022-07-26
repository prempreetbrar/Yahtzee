import { useState } from 'react';

import { Box, Paper } from "@mui/material";
import {scoreUpperSection, threeOfAKind, fourOfAKind, fullHouse, smallStraight, largeStraight, yahtzee} from "./ScoreCalculator";
import Dice from "./Dice.js";
import Scoreboard from './Scoreboard.js';

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
      <Box display="flex" flexDirection="row">
        <Paper 
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Scoreboard scores={scores} updateScore={updateScore}/>
          <Dice dice={dice} toggleLockOnDie={toggleLockOnDie}/>
          <button onClick={rollDice}>Roll</button>
        </Paper>
      </Box>
    </>
  )
}

function executeFunctionByName(functionName, context /*, args */) {
  var args = Array.prototype.slice.call(arguments, 2);
  var namespaces = functionName.split(".");
  var func = namespaces.pop();
  for(var i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  return context[func].apply(context, args);
}