// The purpose of the game is to find the largest sequence of numbers before the timer runs out. You are awarded  points based off how close you got to the solution to the sequence. On the bottom, the number on the left is your sequence for that game, and the number on the right is your total points.

function longestSequence(grid) {
	var sequence = [];

	// Go through all the numbers in the grid, and find ones that have valid sequences near them
	for (var row = 0; row < grid.length; row++) {
		for (var column = 0; column < grid[row].length; column++) {
			try{
				sequence = numbersAround(row, column, grid, sequence)
			} catch(e) {

			}
		}
	}

	// With the valid sequences around them, find which one goes the longest
	for (var i = 0; i < sequence.length; i++) {
		try {
			checkNew(sequence[i].row, sequence[i].column, grid, sequence[i])
		} catch (s) {

		}
	}

	// Find largest path
	var big = 0
	for (var i = 0; i < sequence.length; i++) {
		if (sequence[i].sequenceNumber > big) {
			big = sequence[i].sequenceNumber
		}
	};
	return big;
}

function checkNew (currentRow, currentColumn, grid, item) {
	for (var x = -1; x <= 1; x++) {
		for (var y = -1; y <= 1; y++) {
			if (grid[currentRow - x][currentColumn - y] >= grid[currentRow][currentColumn]) {
				item.sequenceNumber += 1;
			}
		}
	}
	return sequence
}

function numbersAround(currentRow, currentColumn, grid, sequence) {
	for (var x = -1; x <= 1; x++) {
		for (var y = -1; y <= 1; y++) {
			if (grid[currentRow - x][currentColumn - y] >= grid[currentRow][currentColumn]) {
				sequence.push({
					row: currentRow - x,
					column: currentColumn - y,
					sequenceNumber: 0
				})
			}
		}
	}
	return sequence
}

// console.log(longestSequence( 
// 	[[8,2,4,5] 
// 	,[0,7,1,4] 
// 	,[3,7,9,2]
// 	,[4,4,2,7]] 
// 	));
var newGrid = 
[[null,null,null]
,[null,null,null]
,[null,null,null]]
for (var i = 0; i < newGrid.length; i++) {
	for (var y = 0; y < newGrid[i].length; y++) {
		newGrid[i][y] = Math.floor(Math.random(Math.random() * 10) * 10)
		explain = " The grid used was: " + newGrid[i][y]
		document.getElementById(i + "" + y).innerHTML = newGrid[i][y];
	}
}


// -- Global Variables --
console.log("New Array: " + longestSequence(newGrid))
// Largest Sequence
var max = longestSequence(newGrid)
// User sequence'd items
var clicks = 0;
// Last number clicked
var lastNumber = 0;
// Countdown
var timer = setInterval(timer, 1000);
var timerSeconds = 10;
// Points of all the games
var totalPoints = 0;
var gamePoints = 0;
// -- END Global Variables --

function counter(button) {
	if (timerSeconds == 0) {
	} else {
	// Change Color of Sequence Indicator
	var colorCode = "#E74C3C";
	var percent = clicks/max
	if (percent >= 0 && percent <= .5) {
		colorCode = "#E74C3C";
		gamePoints = 1;
	} else if (percent >= .51 && percent <= .95) {
		colorCode = "#F1C40F";
		gamePoints = 2;
	} else {
		colorCode = "#2ECC71";
		gamePoints = 3;
	}
	document.getElementById("count").style.color = colorCode;

	// Check to make active, or invalid
	var currentNumber = parseInt(document.getElementById(button).innerHTML)
	var buttonClass = document.getElementById(button)
	if (lastNumber <= currentNumber) {
		// Current Item Class
		if (buttonClass.className == "active") {
			buttonClass.removeAttribute("class");
			clicks -= 1;
		} else {
			buttonClass.className = "active";
			lastNumber = currentNumber;
			clicks += 1;
		}
		document.getElementById("count").innerHTML = clicks;
	} else {
		buttonClass.className = "invalid";
	}
}
}

function timer() {
	timerSeconds -= 1;
	var colorCode = "#2ECC71";
	if (timerSeconds > 10) {
		document.getElementById("message").innerHTML = "";
		timerSeconds -= 1;
	} else if (timerSeconds >= 7 && timerSeconds <= 10) {
		colorCode = "#2ECC71";
	} else if (timerSeconds >= 4 && timerSeconds <= 6) {
		colorCode = "#F1C40F";
	} else {
		colorCode = "#E74C3C";
	}
	document.getElementById("timer").style.color = colorCode;
	if (timerSeconds <= 0 || clicks > max) {
		// clearInterval(timer);
		document.getElementById("message").innerHTML = "New Game!";
		document.getElementById("timer").innerHTML = "";
		reset();
		return;
	}
	document.getElementById("timer").innerHTML = timerSeconds;
}

function reset() {
	newGrid = 
	[[null,null,null]
	,[null,null,null]
	,[null,null,null]]
	for (var i = 0; i < newGrid.length; i++) {
		for (var y = 0; y < newGrid[i].length; y++) {
			newGrid[i][y] = Math.floor(Math.random(Math.random() * 10) * 10)
			explain = " The grid used was: " + newGrid[i][y]
			document.getElementById(i + "" + y).innerHTML = newGrid[i][y];
			document.getElementById(i + "" + y).className = "";
		}
	}
	// Reset Global Variables with new board
	timerSeconds = 12;
	max = longestSequence(newGrid);
	clicks = 0;
	lastNumber = 0;
	totalPoints += gamePoints;
	gamePoints = 0;
	document.getElementById("count").innerHTML = clicks;
	document.getElementById("points").innerHTML = totalPoints;
}