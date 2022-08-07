import { breadcrumbsClasses } from '@mui/material';
import { FaDiceOne, FaDiceTwo, FaDiceThree, FaDiceFour, FaDiceFive, FaDiceSix } from 'react-icons/fa';
import { BsDiceOne, BsDiceTwo, BsDiceThree, BsDiceFour, BsDiceFive, BsDiceSix } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import IconButton from '@mui/material/IconButton';
import { shadows } from '@mui/system';
import { Paper, Box } from '@mui/material';
import { keyframes } from '@mui/system';
import "./Die.css";
import { withTheme } from '@emotion/react';

export default function Die({value, i, isRolling, locked, toggleLockOnDie}) {
  function handleToggle(event) {
    toggleLockOnDie(i);
  }

  let die;
  switch(value) {
    case 1: 
      die = <FaDiceOne/>;
      break;
    case 2: 
      die = <FaDiceTwo/>;
      break;
    case 3: 
      die = <FaDiceThree />;
      break;
    case 4: 
      die = <FaDiceFour />;
      break;
    case 5: 
      die = <FaDiceFive />;
      break;
    case 6:
      die = <FaDiceSix />;
      break;
  }

  const buttonStyle = {
    disableElevation: false,
    opacity: locked ? 0.30 : 1,
    transition: "all 0.3s ease",
    filter: "drop-shadow(0 0 1rem rgba(0, 0, 0, 0.20))",
    cursor: !toggleLockOnDie || isRolling ? "not-allowed" : ""
  }

  const buttonIconStyle = {
    color: "#FF101F",
    size: 60,
  }

  const boxStyle = {
    background:  "linear-gradient(to bottom, white 0%, white 100%) no-repeat",
    backgroundSize: "calc(100% - 20px) calc(100% - 20px)",
    backgroundPosition: "center"
  }

  return (
        <IconButton className={`${!locked && isRolling ? "Die-rolling" : ""}`} disableRipple elevation={100} sx={buttonStyle} onClick={isRolling ? undefined : handleToggle}>
        <IconContext.Provider value={buttonIconStyle}>
        <Box sx={boxStyle} display="inline-flex">

          {die}
          </Box>
        </IconContext.Provider>
      </IconButton>
  );
}