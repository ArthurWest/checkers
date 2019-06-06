class Czech {
	constructor(x, y, isWhite) {
		this.x = x;
		this.y = y
		this.white = isWhite
	}
	display(element) {
		element.getElementsByTagName('TR')[this.y].getElementsByTagName('TH')[this.x].innerHTML = 'LOL';


	}
	hasAttack(grid) {
		//First one
		if (grid[this.x-1][this.y-1] != false && grid[this.x-1][this.y-1].czech && grid[this.x-2][this.y-2].czech == null) {
			return 1
		} else if (grid[this.x+1][this.y-1].czech && grid[this.x+2][this.y-2].czech == null) {
			return 2
		}
	}
}