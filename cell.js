class Cell {
	constructor(x, y, isWhite) {
		this.x = x
		this.y = y
		this.isWhite = isWhite
		this.czech = null
		this.text = null


		if (this.isWhite) {
			this.class = 'white'
		} else {
			this.class = 'black'
		}
	}
	hasAttack(grid) {
		//First one
		if (grid[this.x-1][this.y-1].czech && grid[this.x-2][this.y-2].czech == null) {
			return 1
		} else if (grid[this.x+1][this.y-1].czech && grid[this.x+2][this.y-2].czech == null) {
			return 2
		}
	}
}