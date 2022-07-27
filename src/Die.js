import { breadcrumbsClasses } from '@mui/material';
import { FaDiceOne, FaDiceTwo, FaDiceThree, FaDiceFour, FaDiceFive, FaDiceSix } from 'react-icons/fa';
import { BsDiceOne, BsDiceTwo, BsDiceThree, BsDiceFour, BsDiceFive, BsDiceSix } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';

export default function Die({value, i, toggleLockOnDie}) {
  function handleToggle(event) {
    toggleLockOnDie(i);
  }

  let die;
  switch(value) {
    case 1: 
      die = <FaDiceOne onClick={handleToggle}/>;
      break;
    case 2: 
      die = <FaDiceTwo onClick={handleToggle}/>;
      break;
    case 3: 
      die = <FaDiceThree onClick={handleToggle}/>;
      break;
    case 4: 
      die = <FaDiceFour onClick={handleToggle}/>;
      break;
    case 5: 
      die = <FaDiceFive onClick={handleToggle}/>;
      break;
    case 6:
      die = <FaDiceSix onClick={handleToggle}/>;
      break;
  }
  return (
    <IconContext.Provider value={{color: '#9f839c', size: 42}}>
      {die}
    </IconContext.Provider>
  );
}