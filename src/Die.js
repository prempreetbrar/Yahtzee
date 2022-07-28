import { breadcrumbsClasses } from '@mui/material';
import { FaDiceOne, FaDiceTwo, FaDiceThree, FaDiceFour, FaDiceFive, FaDiceSix } from 'react-icons/fa';
import { BsDiceOne, BsDiceTwo, BsDiceThree, BsDiceFour, BsDiceFive, BsDiceSix } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import IconButton from '@mui/material/IconButton';
import { shadows } from '@mui/system';
import { Paper } from '@mui/material';
import "./Die.css";

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
    textShadow: "0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1)",
    filter: "drop-shadow(0 0 1rem rgba(0, 0, 0, 0.20))",
  }

  const buttonIconStyle = {
    color: "#FF101F",
    size: 42,
  }

  return (
            <IconButton className={`${isRolling ? "Die-rolling" : ""}`}disableRipple elevation={100} sx={buttonStyle} onClick={handleToggle}>
        <IconContext.Provider value={buttonIconStyle}>
          {die}
        </IconContext.Provider>
      </IconButton>
  );
}