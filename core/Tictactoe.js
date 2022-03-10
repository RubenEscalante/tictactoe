import Turn from "./Turn.js";
import View from "./View.js";
import Player from "./Player.js";
import Board from "./Board.js";

class Tictactoe {
  constructor() {
    this.turn = new Turn();
    this.view = new View(this.turn);
    this.player = new Array(2);
    this.player[0] = new Player();
    this.player[1] = new Player();
    this.board = new Board();
  }

  Play() {
    this.view.clickCell(() => {
      this.board.makeMove(this.view.getBoard(), this.turn.actualTurn());
      if (this.board.isComplete()) {
        this.view.showWinner(this.board.getWinner());
        this.view.gameState(this.board.getBoardState());
        this.view.stopGame();
      } else {
        this.turn.changeTurn();
        this.view.update();
      }
    });
  }
}

let main = new Tictactoe();
main.Play();
