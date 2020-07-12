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

let k = 0;
function solveSudoku(i, j) {
  //console.log(k++);

  if(i >= 9 || j >= 9)
    return;

  if (sudokuField[i][j] !== 0) {
    if (j + 1 >= 9) {
      return solveSudoku(i + 1, 0);
    } else {
      return solveSudoku(i, j + 1);
    }

  }

  for(let number = 1; number <= 9; number++) {
    if(findViolations(number, i, j)) {
      continue;
    }

    sudokuField[i][j] = number;
    //console.log(`Trying ${number} at (${i}, ${j})`);
    if(j + 1 <= 8) {
      solveSudoku(i, j + 1);
    } else {
      if(i + 1 <= 8) {
        solveSudoku(i + 1, 0);
      } else {
        k = 1;
      }
    }
    //console.log(`Removing  ${number}  from (${i}, ${j})`);
    if (k !== 1)
      sudokuField[i][j] = 0;
  }
};

function checkCube(number, row, column) {
  let cubeX, cubeY;
  if (row < 3) {
    cubeX = 0;
  } else if (row < 6) {
    cubeX = 3;
  } else {
    cubeX = 6;
  }

  switch (column) {
    case 0:
    case 1:
    case 2:
      cubeY = 0;
      break;
    case 3:
    case 4:
    case 5:
      cubeY = 3;
      break;
    case 6:
    case 7:
    case 8:
      cubeY = 6;
      break;
  }


  let mX = cubeX + 3;
  let mY = cubeY + 3;
  for (; cubeX < mX; cubeX++) {
    for(; cubeY < mY; cubeY++) {
      if(sudokuField[cubeX][cubeY] === number)
        return true;
    }
  }
  return false;
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
  return checkCube(number, row, column);
};

console.log('Starting postion:', sudokuField)
solveSudoku(0, 0);
console.log('Solved:', sudokuField);

exports.solveSudoku = solveSudoku;
exports.sudokuField = sudokuField;