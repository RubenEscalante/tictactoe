export default class Board {
  constructor() {
    this.board = new Array(9).fill(null);
    this.winningCombinations = [
      { Combination: [0, 1, 2], line: { row: 1 } },
      { Combination: [3, 4, 5], line: { row: 2 } },
      { Combination: [6, 7, 8], line: { row: 3 } },
      { Combination: [0, 3, 6], line: { col: 1 } },
      { Combination: [1, 4, 7], line: { col: 2 } },
      { Combination: [2, 5, 8], line: { col: 3 } },
      { Combination: [0, 4, 8], line: { dia: 1 } },
      { Combination: [2, 4, 6], line: { dia: 2 } },
    ];
    this.boardState = {
      winner: null,
      gameFinish: false,
      winsX: 0,
      winsO: 0,
      tied: 0,
    };
  }

  makeMove(board, turn) {
    this.board = board;
    this.turnWinner(turn);
  }

  turnWinner(turn) {
    let winner = this.findWinnigCombination(turn);
    this.boardState.winner = winner;
    if (this.boardState.winner && turn === 0) {
      this.boardState.winsX++;
    }
    if (this.boardState.winner && turn === 1) {
      this.boardState.winsO++;
    }
    if (this.boardState.winner == null && this.isComplete()) {
      this.boardState.winner = -1;
      this.boardState.tied++;
    }
  }

  findWinnigCombination(turn) {
    let comb = [];
    for (let i = 0; i < this.winningCombinations.length; i++) {
      comb.push(this.winningCombinations[i].Combination);
    }

    for (const combos of comb) {
      const [a, b, c] = combos;
      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        let winner = this.winningCombinations.find((e) => {
          return e.Combination == combos;
        });
        winner.playerWinner = turn;
        return winner;
      }
    }
    return null;
  }

  getWinner() {
    return this.boardState.winner;
  }

  isComplete() {
    let cell = 0;
    this.board.forEach((e) => {
      if (e === "x" || e === "o") cell++;
    });
    if (cell === 9 || this.boardState.winner) {
      this.boardState.gameFinish = true;
      return true;
    }
    return false;
  }

  getBoardState() {
    return this.boardState;
  }
}
