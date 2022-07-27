import { Box } from "@mui/system"
import {scoreUpperSection, threeOfAKind, fourOfAKind, fullHouse, smallStraight, largeStraight, yahtzee} from "./ScoreCalculator";

export default function Scoreboard({scores, updateScore}) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <h2 textAlign="center" fontWeight="bold">Upper</h2>
      {
        Object.entries(scores).map(([key, value]) => 
          <Box display="flex" flexDirection="row" borderBottom="black solid 0.75px" onClick={() => updateScore("threeOfAKind", threeOfAKind)}>
            <Box width="10rem" fontWeight={300} textAlign="left">{key.charAt(0).toUpperCase() + key.replace(/([A-Z])/g, " $1").slice(1)}</Box>
            <Box sx={{flexGrow: 1}}>{value}</Box>
          </Box>
        )
      }
    </Box>
  )
}
