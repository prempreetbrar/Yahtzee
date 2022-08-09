import "./Game.css";

import { useEffect, useState } from 'react';
import { Box, Paper, Button } from "@mui/material";

import Dice from "./Dice.js";
import Scoreboard from './Scoreboard.js';

const NUM_OF_DICE = 5;
const SIDES_ON_DIE = 6;
const STARTING_NUM_OF_ROLLS = 3;
const MILLISECONDS_PER_ROLL = 1000;
const MILLISECONDS_TO_RESTART = 1000;

export default function Game() {
  const [isRestarting, setIsRestarting] = useState(false);
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
  const [highScore, setHighScore] = useState(0);


  useEffect(() => {
    /* if there's no rolls left, we don't want to give the illusion that the dice
       can still be unlocked and the values can change */
    if (rollsLeft === 0) {
      setLocked(locked.map(isLocked => true));
    }

    // we automatically roll for the user on their first roll (as a quality of life feature) 
    if (rollsLeft === STARTING_NUM_OF_ROLLS) {
      rollDice();
    }
  }, [rollsLeft]);

  useEffect(() => {
    /* on every "first" render, highScore is set to 0. However,
       we don't want to put this in storage and override our stored tasks */
    if (highScore) {
      localStorage.setItem("highScore", JSON.stringify(highScore));
    }
  }, [highScore]);

  useEffect(() => {
    /* if the user cleared their cookies or it's their first time rendering the app,
       then the high score is set to 0 */
    const highScoreFromStorage = JSON.parse(localStorage.getItem("highScore")) || 0;
    setHighScore(highScoreFromStorage);
  }, []);


  useEffect(() => {
    if (Object.values(scores).reduce((sum, scoreValue) => sum + scoreValue) > highScore) {
      setHighScore(Object.values(scores).reduce((sum, scoreValue) => sum + scoreValue))
    }
  }, [scores])


  function rollDice(event) {
    setIsRolling(true);

    /* we wait the length of the spin animation to make the dice
       look like they are spinning before we "roll" and change the value */
    setTimeout(() => {
      setDice(dice.map((dieValue, i) => rollDie(dieValue, i)));
      setRollsLeft(rollsLeft => rollsLeft - 1);
      setIsRolling(false);
    }, MILLISECONDS_PER_ROLL);
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

  function restartGame(event) {
    setIsRestarting(true);
    /* we want to change the number of rolls before the timeout delay,
       since this will invoke rollDice which already has a 1000 ms delay anyway
       (if we did this inside setTimeout then it would be a 2000 ms delay, 1000 ms
        from the setTimeout below and another 1000 ms from the rollDice() method) */
    setLocked(Array(NUM_OF_DICE).fill(false));
    setRollsLeft(STARTING_NUM_OF_ROLLS);

    setTimeout(() => {
      setIsRolling(false);
      setScores({
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
      setIsRestarting(false);
    }, MILLISECONDS_TO_RESTART);
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

      overflow: "scroll",
      width: "25rem"
    };

    return (
      <Paper elevation={24} sx={paperStyles}>
        <h2 className="Game-title">Yahtzee!</h2>
        <Box display="flex" flexDirection="column" width="100%"> 
          {DiceContainer()}
          <Scoreboard 
            isRestarting={isRestarting}
            restartGame={restartGame} 
            isRolling={isRolling} 
            dice={dice} 
            highScore={highScore} 
            scores={scores} 
            updateScore={updateScore}
          />
        </Box>
      </Paper>
    );
  }

  function DiceContainer() {
    // styles must be in-line as MUI button doesn't support className
    const rollButtonStyle = {
      width: "12rem",
      marginTop: "1.5rem",
      marginBottom: "2rem",

      borderRadius: "0.5rem",
      backgroundColor: "rgba(65, 90, 119, 1)",

      fontFamily: "Arial", 
      fontWeight: 300, 
      fontSize: "1.5rem", 
      // capitalize first letter of every word
      textTransform: "capitalize",
    };

    return (
      // we want the button under the dice, so we display them in a column and vertically center them
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        backgroundColor="rgba(76, 181, 174, 1)"
      >
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


  return GameContainer();
}