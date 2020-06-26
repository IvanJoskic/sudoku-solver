var sudokuField = [
  [0,2,4, 0,9,0, 0,0,0],
  [8,9,0, 5,0,6, 0,0,0],
  [6,0,0, 7,0,0, 0,0,0],

  [3,0,0, 2,0,0, 8,0,0],
  [0,4,0, 8,1,3, 0,6,0],
  [0,0,1, 0,0,9, 0,0,7],

  [0,0,0, 0,0,1, 0,0,3],
  [0,0,0, 9,0,5, 0,8,1],
  [0,0,0, 0,6,0, 2,4,0],
];

function solveSudoku(sudokuField, i, j) {
  if(i >= 9 || j >= 9)
    return;

  if (sudokuField[i][j] !== 0) {
    if (j + 1 >= 9) {
      return solveSudoku(sudokuField, i + 1, 0);
    } else {
      return solveSudoku(sudokuField, i, j + 1);
    }

  }

  for(let number = 1; number <= 9; number++) {
    if(!findViolations(number, i, j)) {
      sudokuField[i][j] = number;
      if(j + 1 <= 8) {
        return solveSudoku(sudokuField, i, j + 1);
      } else {
        if(i + 1 <= 8) {
          return solveSudoku(sudokuField, i + 1, 0);
        } else {
          return 1;
        }
      }
    }
  }

};

function findViolations(number, row, column) {
  for(let j = 0; j < 9; j++) {
    if (sudokuField[row][j] === number)
      return true;
  }

  for(let i = 0; i < 9; i++) {
    if (sudokuField[i][column] === number)
      return true;
  }
  return false;
};

console.log(solveSudoku(sudokuField, 0, 0));
console.log(sudokuField);
