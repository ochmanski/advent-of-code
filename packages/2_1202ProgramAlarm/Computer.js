const EventEmitter = require('events');
const Memory = require('./Memory');
const interpreter = require('./interpreter');

module.exports = class Computer extends EventEmitter {
  constructor() {
    super();

    this.memory = new Memory();
    this.isRunning = true;
    this.action = {
      HALT: Symbol('HALT'),
      ERROR: Symbol('ERROR'),
      EXEC: Symbol('EXEC'),
    };

    this.on(this.action.HALT, this.makeSafeListener(this.handleHalt));
    this.on(this.action.ERROR, this.makeSafeListener(this.handleError));
    this.on(this.action.EXEC, this.makeSafeListener(this.handleExec));
  }

  start() {
    this.emit(this.action.EXEC);
  }

  handleHalt() {
    console.log('HALT');
    this.isRunning = false;
  }

  handleError(message) {
    console.log(message);
    this.emit(this.action.HALT);
  }

  handleExec() {
    interpreter.call(this, this.memory.readPosition());

    if (this.memory.index <= this.memory.data.length - 1) {
      this.emit(this.action.EXEC);
    }
  }

  makeSafeListener(listener) {
    return (...args) => {
      if (!this.isRunning) {
        return;
      }

      return listener.call(this, ...args);
    };
  }

  load(data) {
    this.memory.load(data);
  }
};
