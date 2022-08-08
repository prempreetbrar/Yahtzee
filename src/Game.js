import "./Game.css"

import { useEffect, useState } from 'react';
import { Box, Paper, Button } from "@mui/material";
import { VscDebugRestart } from 'react-icons/vsc';

import Dice from "./Dice.js";
import Scoreboard from './Scoreboard.js';
import { IconButton } from "@mui/material";
import { IconContext } from "react-icons";

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
  const [highScore, setHighScore] = useState(0);


  useEffect(() => {
    // if there's no rolls left, we don't want to give the illusion that the dice
    // can still be unlocked and the values can change
    if (rollsLeft === 0) {
      setLocked(locked.map(isLocked => true));
    }

    if (rollsLeft === STARTING_NUM_OF_ROLLS) {
      rollDice();
    }
  }, [rollsLeft]);

  useEffect(() => {
    /* on every "first" render, highScore is set to null. However,
       we don't want to put this in storage and override our stored tasks */
    if (highScore) {
      localStorage.setItem("highScore", JSON.stringify(highScore));
    }
  }, [highScore]);

  useEffect(() => {
    const highScoreFromStorage = JSON.parse(localStorage.getItem("highScore")) || 0;
    /* we are fine with highScore being null since we initialize it to null anyway;
       no conditional check is needed (albeit this only applies if user clears cookies
       or is rendering app for first time) */
    setHighScore(highScoreFromStorage);
  }, [])


  useEffect(() => {
    if (Object.values(scores).reduce((sum, scoreValue) => sum + scoreValue) > highScore) {
      setHighScore(Object.values(scores).reduce((sum, scoreValue) => sum + scoreValue))
    }
  }, [scores])


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

  function restartGame(event) {
    setLocked(Array(NUM_OF_DICE).fill(false));
  
    setRollsLeft(STARTING_NUM_OF_ROLLS);
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
    }

    const buttonStyle = {
      disableElevation: false,
      opacity: isRolling ? 0.30 : 1,
      transition: "all 0.3s ease",
      filter: "drop-shadow(0 0 1rem rgba(0, 0, 0, 0.20))",
      cursor: !toggleLockOnDie || isRolling ? "not-allowed" : ""
    }
  
    const buttonIconStyle = {
      color: "#3F292B",
      size: 60,
    }

    return (
      <Paper elevation={15} sx={paperStyles}>
        <h2 className="Game-title">Yahtzee!</h2>
        <Box display="flex" flexDirection="column" width="100%"> 
          {DiceContainer()}
          <Scoreboard isRolling={isRolling} dice={dice} highScore={highScore} scores={scores} updateScore={updateScore}/>


          <IconButton className={`${isRolling ? "Game-restart" : ""}`} disableRipple elevation={100} sx={buttonStyle} onClick={isRolling ? undefined : restartGame}>
            <IconContext.Provider value={buttonIconStyle}>

            <VscDebugRestart/>
            </IconContext.Provider>
          </IconButton>




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
      <Box display="flex" flexDirection="column" alignItems="center" backgroundColor="#4CB5AE">
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



