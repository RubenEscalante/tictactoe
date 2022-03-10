export default class Turn {
  constructor() {
    this.turn = Math.floor(Math.random() * 2);
  }

  actualTurn() {
    return this.turn;
  }

  notTurn() {
    return (this.turn + 1) % 2;
  }

  changeTurn() {
    this.turn = this.notTurn();
  }
}
