import React from "react";
import Square from "./Square";

function Board(props) {
  const { squares } = props;

  function renderSquare(i) {
    let clickHandler = props.onClick;

    if (!clickHandler) {
      clickHandler = function () {};
    }

    return <Square value={squares[i]} onClick={() => clickHandler(i)} />;
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(9)}
      </div>
    </div>
  );
}

export default Board;
