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
		//
		const x = this.x
		const y = this.y

		//Creating array for the result
		const options = []
		for (let i = 0; i < options.length; i++) {
			options[i] = null
		}

		//Top right
		if (( x+2 >= 0 && x+2 <= 7 ) && ( y-2 >= 0 && y-2 <=7) && grid[x+1][y-1].white != this.white) { //1 & 2 is checking if the cell exists; 3 is checking if it's other player's chezch
			options[0] = grid[x+2][y-2]
		}
		//Bottom right
		if (( x+2 >= 0 && x+2 <= 7 ) && ( y+2 >= 0 && y+2 <=7) && grid[x+1][y+1].white != this.white) { //1 & 2 is checking if the cell exists; 3 is checking if it's other player's chezch
			options[1] = grid[x+2][y+2]
		}
		//Bottom left
		if (( x-2 >= 0 && x-2 <= 7 ) && ( y+2 >= 0 && y+2 <=7) && grid[x-1][y+1].white != this.white) { //1 & 2 is checking if the cell exists; 3 is checking if it's other player's chezch
			options[2] = grid[x-2][y+2]
		}
		//Top left 
		if (( x-2 >= 0 && x-2 <= 7 ) && ( y-2 >= 0 && y-2 <=7) && grid[x-1][y-1].white != this.white) { //1 & 2 is checking if the cell exists; 3 is checking if it's other player's chezch
			options[3] = grid[x-2][y-2]
		}
		//Result
		if (options) {
			return options
		} else {
			return false
		}
		
	}
}
