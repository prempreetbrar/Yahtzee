function scoreUpperSection(die, dice) {
  return count(dice, die) * die;
}

function threeOfAKind(dice) {
  /* if there exists some die that occurs at least three times, then we add
     all the dice */
  if (dice.some(die => count(dice, die) >= 3))
    return dice.reduce((total, die) => total + die);
  return 0;
}

function count(dice, die) {
  return dice.filter(d => d === die).length;
}

function fourOfAKind(dice) {
  /* if there exists some die that occurs at least four times, then we add
     all the dice */
  if (dice.some(die => count(dice, die) >= 4))
    return dice.reduce((total, die) => total + die);
  return 0;
}

function fullHouse(dice) {
  if (dice.some(die => count(dice, die) === 3) && 
      dice.some(die => count(dice, die) === 2))
        return 25;
  return 0;
}

function smallStraight(dice) {
  /* for a small straight, if the dice include 2,3,4, then in the remaining
     dice there must be a 1 or a 5 */
  if ((dice.includes(2) && dice.includes(3) && dice.includes(4)) &&
      (dice.includes(1) || dice.includes(5)))
        return 30;
  /* for a small straight, if the dice include 3,4,5, then in the remaining
     dice there must be a 2 or a 6 */
  else if ((dice.includes(3) && dice.includes(4) && dice.includes(5)) &&
           (dice.includes(2) || dice.includes(6)))
              return 30;
  return 0;
}

function largeStraight(dice) {
  /* a large straight must have 2,3,4,5, and the remaining dice should either be
     a 1 or a 6 */
  if ((dice.includes(2) && dice.includes(3) && dice.includes(4) && dice.includes(5))
        && (dice.includes(1) || dice.includes(6)))
      return 40;
  return 0;
}

function yahtzee(dice) {
  /* if there is only one unique dice, then that means all are the same
     and we have a yahtzee */
  if ((new Set(dice)).size === 1) return 50;
  return 0;
}

function chance(dice) {
  return dice.reduce((total, die) => total + die);
}

export {
  scoreUpperSection, 
  threeOfAKind, 
  fourOfAKind, 
  fullHouse, 
  chance, 
  smallStraight, 
  largeStraight, 
  yahtzee
};