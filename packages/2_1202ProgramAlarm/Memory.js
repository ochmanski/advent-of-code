module.exports = class Memory {
  constructor() {
    this.data = undefined;
    this.index = 0;
  }

  read(index) {
    return this.data[index];
  }

  write(index, value) {
    this.data[index] = value;
  }

  readPosition() {
    return this.data[this.index];
  }

  nextPosition() {
    return ++this.index;
  }

  load(data) {
    this.data = data;
    this.index = 0;
  }
};
