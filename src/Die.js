import "./Die.css";

import { FaDiceOne, FaDiceTwo, FaDiceThree, FaDiceFour, FaDiceFive, FaDiceSix } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Box, IconButton } from '@mui/material';



export default function Die({isRolling, isLocked, value, i, toggleLockOnDie}) {
  function handleToggle(event) {
    toggleLockOnDie(i);
  }

  const iconButtonClass = !isLocked && isRolling ? "Die-rolling" : "";
  // MUI button doesn't have className
  const iconButtonStyle = {
    disableElevation: false,
    backgroundColor: "rgba(76, 181, 174, 1)",
    "&.MuiButtonBase-root:hover": {
      backgroundColor: "rgba(76, 181, 174, 1)"
    },
    opacity: isLocked ? 0.30 : 1,

    transition: "all 0.3s ease",
    // if the die can't be toggled or is being rolled, then user can't lock it
    cursor: !toggleLockOnDie || isRolling ? "not-allowed" : ""
  }

  const dieStyle = {
    color: "rgba(255, 16, 31, 1)",
    size: 60,
  }

  /* the icons are transparent, so the dots in the dice looked green; to counteract this, 
     we wrap the die in a box whose background is white, and then we change the width and
     height of the background and center it so that it "fills" in the dots */
  const boxStyle = {
    display: "inline-flex",
    background:  "linear-gradient(to bottom, white 0%, white 100%) no-repeat",
    backgroundSize: "calc(100% - 20px) calc(100% - 20px)",
    backgroundPosition: "center"
  }

  return (
    <IconButton 
      className={iconButtonClass} 
      disableRipple 
      sx={iconButtonStyle} 
      // while rolling, the user shouldn't be able to lock/unlock the die
      onClick={isRolling ? undefined : handleToggle}
    >
      <IconContext.Provider value={dieStyle}>
        <Box sx={boxStyle}>{getDieIcon(value)}</Box>
      </IconContext.Provider>
    </IconButton>
  );
}



function getDieIcon(value) {
  switch(value) {
    case 1: return <FaDiceOne/>;
    case 2: return <FaDiceTwo/>;
    case 3: return <FaDiceThree />;
    case 4: return <FaDiceFour />;
    case 5: return <FaDiceFive />;
    case 6: return <FaDiceSix />;
  }
}