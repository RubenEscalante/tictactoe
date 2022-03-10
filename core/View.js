export default class View {
  constructor(turn) {
    this.turn = turn;
    this.show();
  }

  show() {
    document.querySelector("#board").classList.remove("x");
    document.querySelector("#board").classList.remove("o");
    document.querySelector(".turnX").classList.remove("turn");
    document.querySelector(".turnO").classList.remove("turn");
    if (this.turn.actualTurn() === 0) {
      document.querySelector("#board").classList.add("x");
      document.querySelector(".turnX").classList.add("turn");
      document.querySelector(".turnX").classList.add("x");
    } else {
      document.querySelector("#board").classList.add("o");
      document.querySelector(".turnO").classList.add("turn");
      document.querySelector(".turnO").classList.add("o");
    }
  }
  update() {
    this.show();
  }

  clickCell(func) {
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.addEventListener(
        "click",
        (e) => {
          this.handleClick(e, func);
        },
        { once: true }
      );
    });
  }
  handleClick(e, func) {
    console.log("Entro");
    if (this.turn.actualTurn() === 0) {
      e.target.classList.add("x");
      e.target.appendChild(this.addX());
    }
    if (this.turn.actualTurn() === 1) {
      e.target.classList.add("o");
      e.target.appendChild(this.addO());
    }
    func();
  }
  getBoard() {
    let cellArray = document.querySelectorAll(".cell");
    let boardView = [];
    cellArray.forEach((cell) => {
      let array = cell.className.split(" ");
      boardView.push(array[1]);
    });
    return boardView;
  }

  stopGame() {
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.setAttribute("style", "pointer-events: none");
    });
  }

  showWinner(winner) {
    let drawLineMap = {
      col: {
        1: "rotate(0deg) translate(calc(var(--cell-size)*-1),0px)",
        2: "rotate(0deg) translate(calc(var(--cell-size)*0),0px)",
        3: "rotate(0deg) translate(calc(var(--cell-size)*1),0px)",
      },
      row: {
        1: "rotate(90deg) translate(calc(var(--cell-size)*-1),0px)",
        2: "rotate(90deg) translate(calc(var(--cell-size)*0),0px)",
        3: "rotate(90deg) translate(calc(var(--cell-size)*1),0px)",
      },
      dia: {
        1: "rotate(-45deg) translate(calc(var(--cell-size)*0),0px)",
        2: "rotate(45deg) translate(calc(var(--cell-size)*0),0px)",
      },
    };
    if (winner.line.row) {
      document.querySelector(".winnerMark").style.transform =
        drawLineMap.row[winner.line.row];
      document.querySelector(".winnerMark").classList.add("winnerMarkShow");
    }
    if (winner.line.col) {
      document.querySelector(".winnerMark").style.transform =
        drawLineMap.col[winner.line.col];
      document.querySelector(".winnerMark").classList.add("winnerMarkShow");
    }
    if (winner.line.dia) {
      document.querySelector(".winnerMark").style.transform =
        drawLineMap.dia[winner.line.dia];
      document.querySelector(".winnerMark").classList.add("winnerMarkShow");
    }
  }

  gameState(boardState) {
    console.log(boardState);
  }

  addO() {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 150 150");
    svg.innerHTML = `
       <circle
         id="circlesvg"
         cx="75"
         cy="75"
         r="65"
       
         stroke-width="21"
         fill="none"
         stroke-dasharray="420"
         stroke-linecap="round"
       >
         <animate
           attributeName="stroke-dashoffset"
           values="360;0"
           dur=".4s"
           repeatCount="1"
         ></animate>
       </circle>`;
    return svg;
  }

  addX() {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 150 150");
    svg.innerHTML = `
    <style>
              <![CDATA[#eRdXZVqJbFg2 {animation: eRdXZVqJbFg2__sz 400ms linear 1 normal forwards}@keyframes eRdXZVqJbFg2__sz { 0% {width: 0px;height: 21px} 50% {width: 0px;height: 21px} 100% {width: 139.370533px;height: 21px}} #eRdXZVqJbFg3 {animation: eRdXZVqJbFg3__sz 400ms linear 1 normal forwards}@keyframes eRdXZVqJbFg3__sz { 0% {width: 0px;height: 21.000063px} 50% {width: 139.370533px;height: 21.000063px} 100% {width: 139.370533px;height: 21.000063px}}]]>
            </style>
            <rect
              id="eRdXZVqJbFg2"
              width="0"
              height="21"
              rx="8.73"
              ry="8.73"
              transform="matrix(.979149-.979149 0.707107 0.707107 0.593422 137.054587)"
              stroke-width="0"
            />
            <rect
              id="eRdXZVqJbFg3"
              width="0"
              height="21.000063"
              rx="8.73"
              ry="8.73"
              transform="matrix(.979149 0.979149-.707105 0.707105 12.945395 0.000018)"
              stroke-width="0"
              stroke-dasharray="320.73"
            />`;
    return svg;
  }
}
