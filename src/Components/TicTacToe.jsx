import React, { useState } from 'react';
import './TicTacToe.css';
import cross from '../assets/cross.png'; 
import circle from '../assets/circle.png'; 

const TicTacToe = () => {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) {
      return; // If the cell is already filled or there is a winner, do nothing
    }

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const currentWinner = calculateWinner(newBoard);
    if (currentWinner) {
      setWinner(currentWinner);
    } else if (isBoardFull(newBoard)) {
      setWinner('Draw');
    }

    setIsXNext(!isXNext);
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

  const isBoardFull = (squares) => {
    return squares.every((square) => square !== null);
  };

  const handleReset = () => {
    console.log('Resetting the game'); // Check if this log is printed
    setBoard(initialBoard);
    setIsXNext(true);
    setWinner(null);
  };

  const renderBoxes = () => {
    return board.map((value, index) => (
      <div key={index} className="Boxes" onClick={() => handleClick(index)}>
        {value === 'X' && <img src={cross} alt="cross" />}
        {value === 'O' && <img src={circle} alt="circle" />}
      </div>
    ));
  };

  return (
    <div className="Container">
      <h1 className="Title">Welcome to Tic-<span>Tac</span>-Toe Game</h1>
      {winner && <div className="Winner">Winner: {winner === 'Draw' ? 'It\'s a Draw!' : winner}</div>}
      {!winner && isBoardFull(board) && <div className="Winner">It's a Draw!</div>}
      <div className="Board">
        <div className="Row-1">{renderBoxes().slice(0, 3)}</div>
        <div className="Row-2">{renderBoxes().slice(3, 6)}</div>
        <div className="Row-3">{renderBoxes().slice(6, 9)}</div>
      </div>
      <button className="button-30" onClick={handleReset} role="button">
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
