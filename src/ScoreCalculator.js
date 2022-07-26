function scoreUpperSection(number, dice) {
  return dice.count(number) * number;
}

function threeOfAKind(dice) {
  console.log("threeOfAKind is invoked")
  if (dice.some(number => count(dice, number) >= 3))
    return dice.reduce((total, number) => total + number);
  return 0;
}

function count(dice, number) {
  return dice.filter(n => n === number).length;
}

function fourOfAKind(dice) {
  if (dice.some(number => dice.count(number) >= 4))
    return dice.reduce((total, number) => total + number);
  return 0;
}

function fullHouse(dice) {
  if (dice.some(number => dice.count(number) === 3) && 
      dice.some(number => dice.count(number) === 2)
  )
    return 25;
  return 0;
}

function smallStraight(dice) {
  if ((dice.includes(2) && dice.includes(3) && dice.includes(4)) &&
         (dice.includes(1) || dice.includes(5))
         ||
         ((dice.includes(3) && dice.includes(4) && dice.includes(5)) &&
         (dice.includes(2) || dice.includes(6))))
         return 30;
  return 0;
}

function largeStraight(dice) {
  if ((dice.includes(2) && dice.includes(3) && dice.includes(4) && dice.includes(5))
        && (dice.includes(1) || dice.includes(6)))
      return 40;
  return 0;
}

function yahtzee(dice) {
  if (Set(dice).length === 1) return 50;
}

export {scoreUpperSection, threeOfAKind, fourOfAKind, fullHouse, smallStraight, largeStraight, yahtzee};