let currentPlayer = 'o';
const players = {
	'o': [],
	'x': []
};
const winSteps = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

document.querySelectorAll('.cell').forEach((cell, i, board) => {
	cell.addEventListener('click', () => {
		if (cell.classList.length < 2) {
			cell.style = `--backcolor: ${currentPlayer === 'o' ? '#00f' : '#f00'}`;
			cell.classList.add(currentPlayer);
			players[currentPlayer].push(i);
			currentPlayer = currentPlayer === 'o' ? 'x' : 'o';

			showWon(board);
		}
	});
});

function showWon(board) {
	const won = checkWon();
	const isOne = [...board].every(cell => cell.classList.length > 1) || won;
	if (!isOne) return;

	document.querySelector('#board').style.scale = 0;
	setTimeout(() => {
		document.body.id = won || 'draw';
		setTimeout(() => location.reload(), 1000);
	}, 500);
}

function checkWon() {
	let won;
	winSteps.forEach(steps => {
		if (won) return;
		
		won = steps.every(step => players.x.includes(step)) ? 'x' : won;
		won = steps.every(step => players.o.includes(step)) ? 'o' : won;
	});

	return won;
}
