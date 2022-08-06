import "./Game.css"

import { useEffect, useRef, useState } from 'react';
import { Box, Paper, Button } from "@mui/material";

import Dice from "./Dice.js";
import Scoreboard from './Scoreboard.js';


const NUM_OF_DICE = 5;
const SIDES_ON_DIE = 6;
const STARTING_NUM_OF_ROLLS = 3;

export default function Game() {
  const isMounted = useRef(false);
  const [dice, setDice] = useState(Array(NUM_OF_DICE).fill(1));
  const [rollsLeft, setRollsLeft] = useState(STARTING_NUM_OF_ROLLS);
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

  useEffect(() => {
    if (rollsLeft === 0) {
      setLocked(
        locked.map(isLocked => true)
      )
    }
  }, [rollsLeft])

  function rollDice(event) {
    setIsRolling(true);
    setTimeout(() => {
      setDice(dice.map((die, i) => {
        if (locked[i]) {
          return die
        };
        const randomNumber = Math.floor(Math.random() * SIDES_ON_DIE) + 1;
        return randomNumber;
      }))
      setRollsLeft(rollsLeft => rollsLeft - 1)
      setIsRolling(false);
    }
    , 1000)
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
    setLocked(locked.map(isLocked => false));
    setRollsLeft(STARTING_NUM_OF_ROLLS);
  }

  useEffect(() => {
      if (rollsLeft === STARTING_NUM_OF_ROLLS) {
        rollDice();
      }
  }, [rollsLeft])


  function GameContainer() {
    const paperStyles = {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }

    return (
      <Paper 
        elevation={3}
        sx={paperStyles}
      >
        <h2 className="Game-title">Yahtzee!</h2>
        <Box display="flex" flexDirection="row"> 
          {Player()}
          {DiceContainer()}
        </Box>
      </Paper>
    );
  }

  function Player() {
    return (
      <>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <h3>PLAYER</h3>
        <Scoreboard scores={scores} updateScore={updateScore}/>
      </Box>
      </>
    )
  }

  function DiceContainer() {
    const rollButtonStyle = {
      width: "12rem",
      fontFamily: "Arial", 
      fontWeight: 300, 
      fontSize: "1.5rem", 
      backgroundColor: "rgba(65, 90, 119, 1)",
      ":hover": {
        backgroundColor: `${!isRolling ? "#1B263B" : "#ddd"}`,
      } ,
      textTransform: "capitalize",
      borderRadius: "0.5rem",
      "&.Mui-disabled": {
        backgroundColor: "#ddd",
        pointerEvents: "unset",
        cursor: "not-allowed"
      },
    };

    let rollMessage;
    if (rollsLeft === 1) {
      rollMessage = "1 Roll Left"
    } else if (rollsLeft === 2) {
      rollMessage = `${rollsLeft} Rolls Left`
    } else if (rollsLeft === 3) {
      rollMessage = "Starting Turn!"
    } else if (rollsLeft === 0) {
      rollMessage = "0 Rolls Left"
    }
    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        <Dice dice={dice} isRolling={isRolling} locked={locked} toggleLockOnDie={rollsLeft > 0 ? toggleLockOnDie : undefined}/>
        <Button className="Game-reroll" variant="contained" disabled={isRolling || rollsLeft === 0} sx={rollButtonStyle} onClick={isRolling || rollsLeft === 0 ? undefined : rollDice}>{rollMessage}</Button>
      </Box>
    );
  }


  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        {GameContainer()}
      </Box>
    </>
  );
}



