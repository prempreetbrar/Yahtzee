import { Box } from "@mui/system";
import { Tooltip } from "@mui/material";
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

import "./Scoreboard.css";



export default function Scoreboard({isRolling, dice, highScore, scores, updateScore}) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" marginBottom="1rem">
      {ScoreboardSection(isRolling, dice, scores, updateScore, "Upper", 0, 6)}
      {ScoreboardSection(isRolling, dice, scores, updateScore, "Lower", 6, 13)}
      <h2 className="ScoreSection-title" style={{width:"90%", textAlign: "center"}}>TOTAL SCORE: {Object.values(scores).reduce((sum, scoreValue) => sum + scoreValue)}</h2>
      <h2 className="ScoreSection-title" style={{width:"90%", textAlign: "center"}}>HIGH SCORE: {highScore}</h2>
    </Box>
  )
}

function ScoreRow({isRolling, dice, updateScore, scoreName, value}) {
  const scoreRowStyle = {
    display:"flex",
    flexDirection: "row",
    justifyContent: "space-between",

    minWidth: "22.5rem",
    borderBottom: "black solid 0.75px"
  };
  const scoreRowClass = `ScoreRow ${isRolling || value !== null ? "ScoreRow-disabled" : "ScoreRow-active"}`;
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
      <Box className={scoreRowClass} sx={scoreRowStyle} onClick={!isRolling ? onScoreRowClick : undefined}>
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

function ScoreboardSection(isRolling, dice, scores, updateScore, sectionName, fromRow, toRow) {
  return (
    <>
      <h2 className="ScoreSection-title">{sectionName}</h2>
      {Object.entries(scores).slice(fromRow, toRow).map(([scoreName, value]) => 
        <ScoreRow isRolling={isRolling} dice={dice} updateScore={updateScore} scoreName={scoreName} value={value}/>
      )}
    </>
  )
}