'use strict';

const { getTextFile } = require('helpers');
const Computer = require('./Computer');

const startShipComputer = async () => {
  const intcodeComputer = new Computer();
  const intcodeInstructions = (await getTextFile('alarmInput.txt'))
    .split('\n')
    .join('')
    .split(',')
    .map((instruction) => parseInt(instruction, 10));

  intcodeComputer.load(intcodeInstructions);
  intcodeComputer.start();

  console.log(intcodeComputer.memory.data[0]);
};

startShipComputer();
