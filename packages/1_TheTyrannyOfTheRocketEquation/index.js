'use strict';

const { getTextFile } = require('helpers');

const sum = (a, b) => a + b;
const computeFuelRequiredForLaunch = (moduleMass) =>
  Math.floor(moduleMass / 3) - 2;

const computeTotalFuelRequirement = async () => {
  const moduleMasses = (await getTextFile('input.txt')).split('\n');

  return moduleMasses.map(computeFuelRequiredForLaunch).reduce(sum, 0);
};

computeTotalFuelRequirement().then((fuel) => {
  console.log(fuel);
});
