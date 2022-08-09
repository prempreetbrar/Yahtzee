import "./Scoreboard.css";

import { Box } from "@mui/system";
import { Tooltip, IconButton } from "@mui/material";
import { IconContext } from "react-icons";
import { VscDebugRestart } from 'react-icons/vsc';

import { 
  scoreUpperSection, 
  threeOfAKind, 
  fourOfAKind, 
  fullHouse, 
  smallStraight, 
  largeStraight, 
  chance, 
  yahtzee
} from "./ScoreCalculator";



export default function Scoreboard({isRestarting, restartGame, isRolling, dice, highScore, scores, updateScore}) {
  const upperSectionProps = {
    isRolling, dice, scores, updateScore, sectionName: "Upper", fromRow: 0, toRow: 6
  };
  const lowerSectionProps = {...upperSectionProps, sectionName: "Lower", fromRow: 6, toRow: 13};

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <ScoreboardSection {...upperSectionProps}/>
      <ScoreboardSection {...lowerSectionProps}/>
      {TotalScore()}
      <h2 className="ScoreSection-title Scoreboard-HighScore">HIGH SCORE: {highScore}</h2>
    </Box>
  );


  function TotalScore() {
    const allScores = Object.values(scores);
    const totalScore = allScores.reduce((totalScore, scoreValue) => totalScore + scoreValue);

    return (
      <Box 
        display="flex" 
        flexDirection="row" 
        justifyContent="space-evenly" 
        width="90%" 
        borderBottom="2px solid rgba(76, 181, 174, 1)"
      >
        <h2 className="ScoreSection-title Scoreboard-TotalScore">
          TOTAL SCORE: {totalScore}        
        </h2>
        {RestartButton()}  
      </Box>
    );
  }

  function RestartButton() {
    // MUI buttons cannot be styled using classes
    const buttonStyle = {
      height: "fit-content",
      opacity: isRestarting || isRolling ? 0.30 : 1,
      margin: "2.175rem 0 0 0",
      padding: "0rem",

      disableElevation: false,
      transition: "all 0.3s ease",
      filter: "drop-shadow(0 0 1rem rgba(0, 0, 0, 0.20))",
      // while we are rolling the user can't restart the game
      cursor: isRestarting || isRolling ? "not-allowed" : "",
    };
  
    const buttonIconStyle = {
      color: "rgba(63, 41, 43, 1)",
      size: 30,
    };

    const tooltipStyle = {
      tooltip: {
        sx: {
          backgroundColor: "common.black",
          "& .MuiTooltip-arrow": {
            color: "common.black",
          },
        },
      },
    };

    return (
      <Tooltip componentsProps={tooltipStyle} title="Restart" placement="top" arrow>
        <IconButton 
          className={`${isRestarting ? "Scoreboard-restart" : ""}`} 
          disableRipple 
          elevation={100} 
          sx={buttonStyle} 
          // when we are rolling we shouldn't be able to restart the game
          onClick={isRolling ? undefined : restartGame}
        >
          <IconContext.Provider value={buttonIconStyle}>
            <VscDebugRestart/>
          </IconContext.Provider>
        </IconButton>
      </Tooltip>
    );
  }
}




function ScoreboardSection({isRolling, dice, scores, updateScore, sectionName, fromRow, toRow}) {
  const allScoresInSection = Object.entries(scores).slice(fromRow, toRow);
  return (
    <>
      <h2 className="ScoreSection-title">{sectionName}</h2>
      {allScoresInSection.map(([scoreName, value]) => 
        <ScoreRow 
          isRolling={isRolling} 
          dice={dice} 
          updateScore={updateScore} 
          scoreName={scoreName} 
          value={value}
        />
      )}
    </>
  );
}



function ScoreRow({isRolling, dice, updateScore, scoreName, value}) {
  /* if the row has already been scored, then it is inactive and green; otherwise, 
     we have a row that needs to be active when the dice are stationary but inactive when
     the dice are rolling */
  let scoreRowClass = `ScoreRow 
    ${value !== null ? "ScoreRow-disabled" 
      : isRolling ? "ScoreRow-off"
      : "ScoreRow-active"
    }`;

  const onScoreRowClick = value !== null ? undefined : handleUpdateScore;

  const scoreRowTextStyle = {
    fontWeight: 300,
    textDecoration: `${value !== null ? "line-through" : ""}`,
  }
  
  const scoreRowScoreStyle = { fontWeight: `${value !== null ? 500 : 300 }`, color: `${value !== null ? "black" : "#5C7AFF" }`};
  console.log(scoreName);
  const scoreRowName = scoreName.charAt(0).toUpperCase() + scoreName.replace(/([A-Z])/g, " $1").slice(1);
  const scoreRowTooltipStyle = {
    tooltip: {
      sx: {
        backgroundColor: "common.black",
        "& .MuiTooltip-arrow": {
          color: "common.black",
        },
      },
    },
  } 

  function handleUpdateScore() {
    updateScore(scoreName, getFunctionBasedOnName(scoreName));
  }

  const thing = getFunctionBasedOnName(scoreName)

  return (
    <Tooltip componentsProps={scoreRowTooltipStyle} title={getMessageBasedOnName(scoreName)} placement="right" arrow>
      <Box className={scoreRowClass} onClick={!isRolling ? onScoreRowClick : undefined}>
        <Box sx={scoreRowTextStyle}>{scoreRowName}</Box>
        <Box sx={scoreRowScoreStyle}>{value !== null ? value : thing(dice)}</Box>
      </Box>
    </Tooltip>
  )
}




function getFunctionBasedOnName(name) {
  switch(name) {
    case "ones": return scoreUpperSection.bind(this, 1);
    case "twos": return scoreUpperSection.bind(this, 2);
    case "threes": return scoreUpperSection.bind(this, 3);
    case "fours": return scoreUpperSection.bind(this, 4);
    case "fives": return scoreUpperSection.bind(this, 5);
    case "sixes": return scoreUpperSection.bind(this, 6);
    case "threeOfAKind": return threeOfAKind;
    case "fourOfAKind": return fourOfAKind;
    case "fullHouse": return fullHouse;
    case "smallStraight": return smallStraight;
    case "largeStraight": return largeStraight;
    case "chance": return chance;
    case "yahtzee": return yahtzee;
  }
}

function getMessageBasedOnName(name) {
  switch(name) {
    case "ones": return "1 point per 1"
    case "twos": return "2 points per 2"
    case "threes": return "3 points per 3"
    case "fours": return "4 points per 4"
    case "fives": return "5 points per 5"
    case "sixes": return "6 points per 6"
    case "threeOfAKind": return "Sum all dice if 3 are the same"
    case "fourOfAKind": return "Sum all dice if 4 are the same"
    case "fullHouse": return "25 points for three of a kind and pair"
    case "smallStraight": return "30 points for four dice in a sequence"
    case "largeStraight": return "40 points for five dice in a sequence";
    case "chance": return "Sum of all dice";
    case "yahtzee": return "50 points if all 5 dice are the same";
  }
}

