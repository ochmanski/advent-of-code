'use strict';

const { getTextFile } = require('helpers');

const sum = (a, b) => a + b;
const computeFuelRequiredForLaunch = (moduleMass) =>
  Math.floor(moduleMass / 3) - 2;

const computeFuelRequirement = function*(fuel) {
  const fuelRequirement = computeFuelRequiredForLaunch(fuel);

  if (fuelRequirement <= 0) {
    return fuel;
  }

  yield fuelRequirement;
  yield* computeFuelRequirement(fuelRequirement);
};

const computeTotalFuelRequirement = async () => {
  const moduleMasses = (await getTextFile('input.txt')).split('\n');

  return moduleMasses
    .map((mass) => Array.from(computeFuelRequirement(mass)).reduce(sum, 0))
    .reduce(sum, 0);
};

computeTotalFuelRequirement().then((fuel) => {
  console.log(fuel);
});
