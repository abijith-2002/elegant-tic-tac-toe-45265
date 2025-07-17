export const calculateBestMove = (squares) => {
  // Implement minimax algorithm for AI moves
  const emptySquares = squares
    .map((square, index) => (square ? null : index))
    .filter((index) => index !== null);

  // If center is empty, take it
  if (emptySquares.includes(4)) return 4;

  // Try to win or block opponent from winning
  for (const player of ['O', 'X']) {
    for (const index of emptySquares) {
      const squaresCopy = [...squares];
      squaresCopy[index] = player;
      if (calculateWinner(squaresCopy)) return index;
    }
  }

  // Take corners if available
  const corners = [0, 2, 6, 8].filter(corner => emptySquares.includes(corner));
  if (corners.length > 0) {
    return corners[Math.floor(Math.random() * corners.length)];
  }

  // Take any available square
  return emptySquares[Math.floor(Math.random() * emptySquares.length)];
};

export const calculateWinner = (squares) => {
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

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }

  return null;
};
