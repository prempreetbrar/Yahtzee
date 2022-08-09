import { Box } from "@mui/system";

import Die from "./Die.js";



export default function Dice({dice, isRolling, locked, toggleLockOnDie}) {
  return (
    <Box display="flex" flexDirection="row">
      {dice.map((die, i) => 
        <Die 
          isRolling={isRolling} 
          isLocked={locked[i]} 
          value={die} 
          i={i} 
          toggleLockOnDie={toggleLockOnDie}
        />)
      }
    </Box>
  );
}