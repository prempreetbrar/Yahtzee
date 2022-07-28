import Die from "./Die.js"
import { Box } from "@mui/system"

export default function Dice({dice, isRolling, locked, toggleLockOnDie}) {
  return (
    <Box display="flex" flexDirection="column">
      {dice.map((die, i) => <Die isRolling={isRolling} locked={locked[i]} value={die} i={i} toggleLockOnDie={toggleLockOnDie}/>)}
    </Box>
  )
}