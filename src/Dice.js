import Die from "./Die.js"
import { Box } from "@mui/system"

export default function Dice({dice, toggleLockOnDie}) {
  return (
    <Box display="flex" flexDirection="column">
      {dice.map((die, i) => <Die value={die} i={i} toggleLockOnDie={toggleLockOnDie}/>)}
    </Box>
  )
}