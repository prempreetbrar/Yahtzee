import { Box } from "@mui/system"
import {scoreUpperSection, threeOfAKind, fourOfAKind, fullHouse, smallStraight, largeStraight, chance, yahtzee} from "./ScoreCalculator";
import "./Scoreboard.css";

export default function Scoreboard({scores, updateScore}) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <h2 style={{fontWeight: 300}}>Upper</h2>
      {
        Object.entries(scores).map(([key, value]) => 
          <Box className={`ScoreRow ${value !== null ? "ScoreRow-disabled" : "ScoreRow-active"}`} display="flex" flexDirection="row" borderBottom="black solid 0.75px" onClick={value ? undefined : () => updateScore(key, getFunctionBasedOnName(key))}>
            <Box width="10rem" fontWeight={300} textAlign="left"
              sx={{textDecoration: `${value !== null ? "line-through" : ""}`}}
            >{key.charAt(0).toUpperCase() + key.replace(/([A-Z])/g, " $1").slice(1)}</Box>
            <Box sx={{flexGrow: 1, 
              }}>{value !== null ? value : "1 point per 1"}</Box>
          </Box>
        )
      }
    </Box>
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