window.onload = function() {
	require("./engine/game");

	var config = {
		output: document.querySelector('#score'),
		cnv: document.querySelector('#canvas'),
		ctx: cnv.getContext('2d'),
		gridSize: 20
	}

	try {
		new Game(config);
	} catch (referenceError) {
		console.error(referenceError);
	}
}