import { FaDiceOne, FaDiceTwo, FaDiceThree, FaDiceFour, FaDiceFive, FaDiceSix } from 'react-icons/fa';

export default function Die({value, i, toggleLockOnDie}) {
  function handleToggle(event) {
    toggleLockOnDie(i);
  }

  switch(value) {
    case 1: return <button> <FaDiceOne onClick={handleToggle}/> </button>;
    case 2: return <button> <FaDiceTwo onClick={handleToggle}/> </button>;
    case 3: return <button> <FaDiceThree onClick={handleToggle}/> </button>;
    case 4: return <button> <FaDiceFour onClick={handleToggle}/> </button>;
    case 5: return <button> <FaDiceFive onClick={handleToggle}/> </button>;
    case 6: return <button> <FaDiceSix onClick={handleToggle}/> </button>;
  }
}