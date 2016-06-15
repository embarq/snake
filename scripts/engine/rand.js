module.exports = function rand(min, max) {
	return Math.abs(Math.floor(Math.random() * (max - min)) - min);
}