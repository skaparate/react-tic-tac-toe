import React, { useState } from "react";
import Board from "./Board";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return false;
}

function Game(props) {
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(false);
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);

  function handleGoBack(index) {
    const end = index + 1;

    if (end === history.length) {
      return;
    }

    if (winner) {
      setWinner(false);
    }

    const update = history.slice(0, end);
    const isXNext = 0 !== update.length % 2;

    setXIsNext(isXNext);
    setHistory(update);
  }

  function handleBoardClick(index) {
    if (winner) {
      return;
    }

    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (squares[index]) {
      return;
    }

    if (xIsNext) {
      squares[index] = "X";
    } else {
      squares[index] = "O";
    }

    setHistory(
      history.concat([
        {
          squares,
        },
      ])
    );

    const win = calculateWinner(squares);

    if (win) {
      setWinner(win);
      return;
    }

    setXIsNext(!xIsNext);
  }

  let status;

  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  const current = history[history.length - 1];
  const moveList = history.map((curr, i) => {
    const desc = i ? `Go to move #${i}` : "Go to game start";

    return (
      <li key={"history-" + i}>
        <button onClick={() => handleGoBack(i)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleBoardClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moveList}</ol>
      </div>
    </div>
  );
}

export default Game;
