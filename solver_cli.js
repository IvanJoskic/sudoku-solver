const testSudokuField = [
	[0,2,4, 0,9,0, 0,0,0],
	[8,9,0, 5,0,6, 0,0,0],
	[6,0,0, 7,0,0, 0,0,0],
  
	[3,0,0, 2,0,0, 8,0,0],
	[0,4,0, 8,1,3, 0,6,0],
	[0,0,1, 0,0,9, 0,0,7],
  
	[0,0,0, 0,0,1, 0,0,3],
	[0,0,0, 9,0,5, 0,8,1],
	[0,0,0, 0,6,0, 2,4,0]
];

function solveSudoku(sudoku) {
	if (!sudoku || sudoku.length == 0) {
		console.log("Sudoku is empty.");
		return []
	}
	return solveHelper(sudoku, 0, 0, 1);
}

/**
 * 
 * @param {*} sudoku 
 * @param {*} xCord 
 * @param {*} yCord 
 * @returns 
 */
function solveHelper(sudoku, xCord, yCord) {
	if (sudoku[xCord][yCord] != 0) {
		nextYCord = (yCord + 1) % 9;
		if (nextYCord == 0) {
			nextXCord = (xCord + 1) % 9;
		} else {
			nextXCord = xCord;
		}
		return solveHelper(sudoku, nextXCord, nextYCord);
	}

	var solution;
	for (var i = 1; i <= 9; i++) {
		if (checkFieldCandidateCorectness(sudoku, xCord, yCord, i)) {
			sudoku[xCord][yCord] = i;
			if (xCord == 8 && yCord == 8) {
				return sudoku;
			}
			
			nextYCord = (yCord + 1) % 9;
			if (nextYCord == 0) {
				nextXCord = (xCord + 1) % 9;
			} else {
				nextXCord = xCord;
			}

			solution = solveHelper(sudoku, nextXCord, nextYCord);
			if (solution.length == 0) {
				sudoku[xCord][yCord] = 0;
				continue;
				// think about this algorithm more!!!
			}
			return solution;
		}
	}

	return [];
}

/**
 * Think about having a function that returns a set of row, col and square field values
 * then do the check on that set. Might be better.
 * @param {*} sudoku 
 * @param {*} xCord 
 * @param {*} yCord 
 * @param {*} candidate 
 * @returns 
 */
function checkFieldCandidateCorectness(sudoku, xCord, yCord, candidate) {
	if (sudoku[xCord].includes(candidate)) {
		return false;
	}

	for (var i = 0; i < 9; i++) {
		// will check the candidate field aswell, should be called before inserting the candidate
		if (sudoku[i][yCord] == candidate) {
			return false;
		}
	}

	var xStart, yStart;
	if (xCord < 3) {
		xStart = 0;
	} else if (xCord < 6) {
		xStart = 3;
	} else {
		xStart = 6;
	}

	if (yCord < 3) {
		yStart = 0;
	} else if (yCord < 6) {
		yStart = 3;
	} else {
		yStart = 6;
	}

	for (var i = xStart; i <= xStart + 2; i++) {                
		for (var j = yStart; j <= yStart + 2; j++) {                
			if (sudoku[i][j] == candidate) {
				return false;
			}
		}
	}

	return true;
}

function displaySudokuGrid(sudoku) {
	if (!sudoku || sudoku.length == 0) {
		console.log("Sudoku is empty.");
		return;
	}
	var row;
	for (var i = 0; i < 9; i++) {
		row = "";
		for (var j = 0; j < 9; j++) {
			row += " " + sudoku[i][j];
		}
		console.log(row);
	}
	console.log(' -----------------');
}

displaySudokuGrid(testSudokuField);
const testSolved = solveSudoku(testSudokuField);
displaySudokuGrid(testSolved);