import React, { useState } from 'react';
import './App.css';

const initialState = {
  squares: Array(9).fill(null),
  xIsNext: true,
  winner: null,
};

const calculateWinner = (squares) => {
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

  return null;
};

const App = () => {
  const [state, setState] = useState(initialState);

  const handleClick = (index) => {
    if (state.squares[index] || state.winner) {
      return;
    }

    const newSquares = state.squares.slice();
    newSquares[index] = state.xIsNext ? 'X' : 'O';

    setState({
      squares: newSquares,
      xIsNext: !state.xIsNext,
      winner: calculateWinner(newSquares),
    });
  };

  const resetGame = () => {
    setState(initialState);
  };

  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {state.squares[index]}
    </button>
  );

  const getStatus = () => {
    if (state.winner) {
      return `Winner: ${state.winner}`;
    } else {
      return `Next player: ${state.xIsNext ? 'X' : 'O'}`;
    }
  };

  return (
    <div className="game-container">
      <div className="game">
        <div className="status">{getStatus()}</div>
        <div className="board">
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
            {renderSquare(8)}
          </div>
        </div>
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default App;
