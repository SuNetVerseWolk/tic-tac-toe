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

document.querySelectorAll('.cell').forEach((cell, i, parent) => {
	cell.addEventListener('click', () => {
		const [won, wonStep] = checkWon();

		if (!won) {
			cell.style = `--backcolor: ${currentPlayer === 'o' ? '#00f' : '#f00'}`;
			cell.classList.add(currentPlayer);
			players[currentPlayer].push(i);
			currentPlayer = currentPlayer === 'o' ? 'x' : 'o';

			const [won, wonStep] = checkWon();
			console.log(won)
			won === 'o' && wonStep.forEach(step => parent[step].style = '--backcolor: #0f0');
			won === 'x' && wonStep.forEach(step => parent[step].style = '--backcolor: #0f0');
			return;
		}

		location.reload();
	});
});

function checkWon() {
	let won;
	let wonStep;
	winSteps.forEach(steps => {
		if (won) {
			return;
		}
		
		won = steps.every(step => players.x.includes(step)) ? 'x' : won;
		won = steps.every(step => players.o.includes(step)) ? 'o' : won;
		wonStep = won ? steps : [];
	});
	return [won, wonStep];
}
