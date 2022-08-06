import "./Game.css"

import { useEffect, useState } from 'react';
import { Box, Paper, Button } from "@mui/material";

import Dice from "./Dice.js";
import Scoreboard from './Scoreboard.js';

const NUM_OF_DICE = 5;
const SIDES_ON_DIE = 6;
const STARTING_NUM_OF_ROLLS = 3;
const MILLISECONDS_PER_ROLL = 1000;


export default function Game() {
  const [dice, setDice] = useState(Array(NUM_OF_DICE).fill(1));
  const [locked, setLocked] = useState(Array(NUM_OF_DICE).fill(false));

  const [rollsLeft, setRollsLeft] = useState(STARTING_NUM_OF_ROLLS);
  const [isRolling, setIsRolling] = useState(false);
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


  useEffect(() => {
    // if there's no rolls left, we don't want to give the illusion that the dice
    // can still be unlocked and the values can change
    if (rollsLeft === 0) {
      setLocked(locked.map(isLocked => true));
    }
  }, [rollsLeft]);

  useEffect(() => {
    // we need to use one of the rolls on a new turn to give the user new dice
    if (rollsLeft === STARTING_NUM_OF_ROLLS) {
      rollDice();
    }
  }, [rollsLeft]);


  function rollDice(event) {
    setIsRolling(true);

    // we wait the length of the spin animation to make the dice
    // look like they are spinning before we roll
    setTimeout(() => {
      setDice(dice.map((dieValue, i) => rollDie(dieValue, i)));
      setRollsLeft(rollsLeft => rollsLeft - 1);
      setIsRolling(false);
    }
    , MILLISECONDS_PER_ROLL);
  }

  function rollDie(dieValue, i) {
    if (locked[i]) 
      return dieValue;
    const randomNumber = Math.floor(Math.random() * SIDES_ON_DIE) + 1;
    return randomNumber;
  }


  function toggleLockOnDie(i) {
    setLocked([
      ...locked.slice(0, i),
      !locked[i],
      ...locked.slice(i + 1)
    ]);
  }


  function updateScore(scoreName, scoreFunction) {
    setScores({...scores, [scoreName]: scoreFunction(dice)});
    setLocked(locked.map(isLocked => false));
    setRollsLeft(STARTING_NUM_OF_ROLLS);
  }



  function GameContainer() {
    /* we display the items vertically; the two items we are displaying
       are the title and the game itself, and we horizontally and vertically
       center both the title and the game */
    const paperStyles = {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }

    return (
      <Paper elevation={15} sx={paperStyles}>
        <h2 className="Game-title">Yahtzee!</h2>
        <Box display="flex" flexDirection="row"> 
          <Scoreboard scores={scores} updateScore={updateScore}/>
          {DiceContainer()}
        </Box>
      </Paper>
    );
  }

  function DiceContainer() {
    // styles must be in-line as MUI button doesn't support className
    const rollButtonStyle = {
      width: "12rem",
      borderRadius: "0.5rem",
      backgroundColor: "rgba(65, 90, 119, 1)",
      ":hover": {
        backgroundColor: "rgba(27, 38, 59, 1)",
      },

      fontFamily: "Arial", 
      fontWeight: 300, 
      fontSize: "1.5rem", 
      // capitalize first letter of every word
      textTransform: "capitalize",
    };

    return (
      // we want the button under the dice, so we display them in a column and vertically center them
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Dice 
          dice={dice} 
          isRolling={isRolling} 
          locked={locked} 
          // if the user has no rolls then they shouldn't be able to unlock the dice
          toggleLockOnDie={rollsLeft > 0 ? toggleLockOnDie : undefined}
        />
        <Button 
          sx={rollButtonStyle} 
          variant="contained" 
          disabled={isRolling || rollsLeft === 0} 
          onClick={rollDice}
        >
          {RollMessage()}
        </Button>
      </Box>
    );
  }

  function RollMessage() {
    switch (rollsLeft) {
      case 0: return "0 Rolls Left";
      case 1: return "1 Roll Left";
      case 2: return "2 Rolls Left";
      case 3: return "Starting Turn!";
    }
  }


  return (
    GameContainer()
  );
}



