const table = {
	element: document.getElementById('grid'),
	cols: 8,
	rows: 8,
	grid: null,
	player1: true,
	czech: null,
	position: null,
	selectCzech: function(czech) {
		console.log(czech)
		this.czech = czech
	},
	canGo: function(czech, cell) {
		//Cheking stuff
		if (!(czech && cell)) {return false} 
		if (czech.x == cell.x && czech.y == czech.y) {return false}
		let dir; //Chaning direction depending on the player
		if (table.player1) {
			dir = -1
		} else {
			dir = 1
		}

		if (czech.x+dir == cell.x && czech.y+dir == cell.y) { //Going x-1;y-1/y+1
			console.log('#1')
			go()
		} else if (czech.x-dir == cell.x && czech.y+dir == cell.y) { //Going x+1;y-1/y+1
			console.log('#2')
			go()
		} else {
			const options = czech.hasAttack(table.grid)
			for (let i = 0; i < options.length; i++) {
				if (options[i] == null) { //Pass this i because it's null
					continue
				}
				if (cell.x == options[i].x && cell.y == options[i].y) { //If the cell you're aiming to is of the options
					attack(i) //Attaking
				}
			}
		}
		//Helping fuction
		function go() {
			console.log('Current cell:'+ czech.x +','+czech.y+'/Going to:'+cell.x+','+cell.y)
			table.grid[cell.x][cell.y].czech = new Czech(cell.x, cell.y, czech.white) //Creating the exact same czech in the new place
			table.grid[czech.x][czech.y].czech = null //Destroing the old one
			table.czech = null; //Clearing 
			table.displayGrid();
			table.player1 = !table.player1
		}
		function attack(number) {
			table.grid[cell.x][cell.y].czech = new Czech(cell.x, cell.y, czech.white) //Creating the exact same czech in the new place
			table.grid[czech.x][czech.y].czech = null //Destroing the old one
			table.czech = null; //Clearing
			//Destroing the czech of the oponent

			if (number == 0) { //Top right
				table.grid[czech.x+1][czech.y-1].czech = null
			} else if (number == 1) { //Bottom right
				table.grid[czech.x+1][czech.y+1].czech = null
			} else if (number == 2) { //Bottom left
				table.grid[czech.x-1][czech.y+1].czech = null
			} else if (number == 3) {//Top left
				table.grid[czech.x-1][czech.y-1].czech = null
			}
			//Displaying grid
			table.displayGrid();
			table.player1 = !table.player1
		}
	},
	attack: function(cell) {
		if (true) {}
	},
	createGrid: function() {
		this.grid = make2Darray(this.cols, this.rows); //Crerating empty grid

		for (let x = 0; x < this.grid.length; x++) {
			for (let y = 0; y < this.grid[x].length; y++) {
				//Coloring the grid
				let isWhite = false
				if (x % 2 == 0) {
					if (y % 2 == 0) {
						isWhite = true
					}
				} else {
					if (y % 2 != 0) {
						isWhite = true
					}
				}
				//Creating cells
				this.grid[x][y] = new Cell(x, y, isWhite)
			}
		}
	},
	displayGrid: function() {
		removeChildren(this.element); //Clearing 

		for (let y = 0; y < this.grid[0].length; y++) { //Going through every row
			let TR = document.createElement('TR')
			for (let x = 0; x < this.grid.length; x++) { //Going through every col
				let TH = document.createElement('TH') //Creating element
				TH.classList.add('cell')//Adding class
				TH.classList.add(this.grid[x][y].class) //Adding class
				//TH.innerHTML = 'X:'+this.grid[x][y].x+',Y:'+this.grid[x][y].y //Inner text for debugging
				TH.addEventListener('click', function() {table.canGo(table.czech, table.grid[x][y])})
				
				if (this.grid[x][y].czech) { //Adding CZECH if it is there
					let img = document.createElement('IMG') //Creating the element
					img.classList.add('czech') //For style
					if (this.grid[x][y].czech.white) {
						img.src = 'white.png'
					} else {
						img.src = 'black.png'
					}
					img.addEventListener('click', function() {table.selectCzech(table.grid[x][y].czech)}) //Adding even listener for game
					TH.appendChild(img) //Appending img to the cell
				}

				TR.appendChild(TH) //Appending

			}
			this.element.appendChild(TR)
	}},
	createCzechs: function() {
		for (let x = 0; x < this.grid.length; x++) {
			for (let y = 0; y < this.grid[0].length; y++) {
				if (y < 3) {
					if (!this.grid[y][x].isWhite) {
						this.grid[x][y].czech = new Czech(x,y,false)
					} 
				} else if (y > 4) {
					if (!this.grid[y][x].isWhite) {
						this.grid[x][y].czech = new Czech(x,y,true)
					}
				}
			}
		}
		//Creating top stuff
		

		function createCzech(x, y, white) {
			this.grid[x][y].czech = new Czech(white)
		}
	},

}


//Helper function
function make2Darray(cols, rows) {
	let myAr = new Array(cols);

	for (let x = 0; x < myAr.length; x ++) {
		myAr[x] = new Array(rows)
	}
	return myAr
}
function removeChildren(element) {
	var range = document.createRange();
	range.selectNodeContents(element);
	range.deleteContents();
}
function loopThrough2Darray(array) {
	for (let x = 0; x < array.length; x++) {
		for (let y = 0; y < array[x].length; y++) {
			console.log(array[x][y])
		}
	}
}
