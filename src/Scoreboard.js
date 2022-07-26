import { Box } from "@mui/system"
import {scoreUpperSection, threeOfAKind, fourOfAKind, fullHouse, smallStraight, largeStraight, yahtzee} from "./ScoreCalculator";

export default function Scoreboard({scores, updateScore}) {
  return (
    <Box display="flex" flexDirection="column">
      {
        Object.entries(scores).map(([key, value]) => 
          <Box display="flex" flexDirection="row" onClick={() => updateScore("threeOfAKind", threeOfAKind)}>
            <Box width="10rem" textAlign="right">{key}</Box>
            <Box sx={{flexGrow: 1}}>{value}</Box>
          </Box>
        )
      }
    </Box>
  )
}