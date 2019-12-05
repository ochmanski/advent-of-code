module.exports = function(opcode) {
  if (opcode === 99) {
    this.emit(this.action.HALT);
    return;
  }

  const { memory } = this;
  let params;
  let dataToWrite;

  if (opcode === 1 || opcode === 2) {
    params = [
      memory.read(memory.read(memory.nextPosition())),
      memory.read(memory.read(memory.nextPosition())),
    ];
  }

  if (opcode === 1) {
    dataToWrite = params.reduce((a, b) => a + b);
  }

  if (opcode === 2) {
    dataToWrite = params.reduce((a, b) => a * b);
  }

  if (!dataToWrite) {
    this.emit(this.action.ERROR, 'UNKNOWN OPCODE');
  }

  memory.write(memory.read(memory.nextPosition()), dataToWrite);
  memory.nextPosition();
};
