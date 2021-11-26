const tiles = document.getElementsByClassName("tile"),
	squares = {
		a0: document.getElementById("a0"),
		b0: document.getElementById("b0"),
		c0: document.getElementById("c0"),
		d0: document.getElementById("d0"),
		e0: document.getElementById("e0"),
		f0: document.getElementById("f0"),
		g0: document.getElementById("g0"),
		h0: document.getElementById("h0"),
		a1: document.getElementById("a1"),
		b1: document.getElementById("b1"),
		c1: document.getElementById("c1"),
		d1: document.getElementById("d1"),
		e1: document.getElementById("e1"),
		f1: document.getElementById("f1"),
		g1: document.getElementById("g1"),
		h1: document.getElementById("h1"),
		a2: document.getElementById("a2"),
		b2: document.getElementById("b2"),
		c2: document.getElementById("c2"),
		d2: document.getElementById("d2"),
		e2: document.getElementById("e2"),
		f2: document.getElementById("f2"),
		g2: document.getElementById("g2"),
		h2: document.getElementById("h2"),
		a3: document.getElementById("a3"),
		b3: document.getElementById("b3"),
		c3: document.getElementById("c3"),
		d3: document.getElementById("d3"),
		e3: document.getElementById("e3"),
		f3: document.getElementById("f3"),
		g3: document.getElementById("g3"),
		h3: document.getElementById("h3"),
		a4: document.getElementById("a4"),
		b4: document.getElementById("b4"),
		c4: document.getElementById("c4"),
		d4: document.getElementById("d4"),
		e4: document.getElementById("e4"),
		f4: document.getElementById("f4"),
		g4: document.getElementById("g4"),
		h4: document.getElementById("h4"),
		a5: document.getElementById("a5"),
		b5: document.getElementById("b5"),
		c5: document.getElementById("c5"),
		d5: document.getElementById("d5"),
		e5: document.getElementById("e5"),
		f5: document.getElementById("f5"),
		g5: document.getElementById("g5"),
		h5: document.getElementById("h5"),
		a6: document.getElementById("a6"),
		b6: document.getElementById("b6"),
		c6: document.getElementById("c6"),
		d6: document.getElementById("d6"),
		e6: document.getElementById("e6"),
		f6: document.getElementById("f6"),
		g6: document.getElementById("g6"),
		h6: document.getElementById("h6"),
		a7: document.getElementById("a7"),
		b7: document.getElementById("b7"),
		c7: document.getElementById("c7"),
		d7: document.getElementById("d7"),
		e7: document.getElementById("e7"),
		f7: document.getElementById("f7"),
		g7: document.getElementById("g7"),
		h7: document.getElementById("h7"),
	};
let previousTile, startTile, allowNextMove = false, currentTile, index,
	rightLimit = false, leftLimit = false, topLimit = false, bottomLimit = false,
	topLeftLimit = false, bottomLeftLimit = false, rightTopLimit = false, rigthBottomLimit = false;

function allowDrop(img) {
	img.preventDefault();
}

function drop(img) {
	img.preventDefault();
	if (allowNextMove) {
		const info = img.dataTransfer.getData("image");
		const currentTile = img.srcElement;
		console.log("Placed at :", currentTile.id);
		if (img.target.tagName == "IMG") {
			const targetParent = img.target.parentElement;
			targetParent.removeChild(img.target);
			targetParent.appendChild(document.getElementById(info));
		} else img.target.appendChild(document.getElementById(info));
		console.log("---------------");
		allowNextMove = false;
		if (img.srcElement.classList.contains('confirm-drop'))
			img.srcElement.classList.remove('confirm-drop');
	}
}

function drag(img) {
	previousTile = img.srcElement.parentElement.id;
	console.log("Piece :", img.srcElement.id);
	console.log("Moved from :", previousTile);
	img.dataTransfer.setData("image", img.target.id);
}

function checkTile(position, piece) {
	piece.parentElement.classList.add("on-top");
	let allowNextMove = position.id.split("");
	let rowAlpha = allowNextMove[0],
		columnAlpha = allowNextMove[1];
	let row = rowAlpha.charCodeAt(0);
	let column = Number(columnAlpha);
	const pieceId = piece.getAttribute("id");
	if (pieceId.includes("pawn"))
		highlightTilePawn(row, column, pieceId.slice(0, 5));
	if (pieceId.includes("rook"))
		highlightTileRook(row, column);
	if (pieceId.includes("bishop"))
		highlightTileBishop(row, column)
	if (pieceId.includes("knight"))
		highlightTileKnight(row, column);
	if (pieceId.includes("king"))
		highlightTileKing(row, column);
	if (pieceId.includes("queen")) {
		highlightTileRook(row, column);
		highlightTileBishop(row, column);
	}
}

function highlightTilePawn(row, column, check) {
	if (check == "white") {
		let x = String.fromCharCode(row + 1), y = String.fromCharCode(row + 2);
		if (!squares[`${x}${column}`]?.querySelector('img')) {
			glowTile(x, column);
			if (row == 98 && !squares[`${y}${column}`]?.querySelector('img')) glowTile(y, column);
		}
		checkPawnStrike(x, column);
	} else {
		let j = String.fromCharCode(row - 1), k = String.fromCharCode(row - 2);
		if (!squares[`${j}${column}`]?.querySelector('img')) {
			glowTile(j, column);
			if (row == 103 && !squares[`${k}${column}`]?.querySelector('img')) glowTile(k, column);
		}
		checkPawnStrike(j, column);
	}
}

function checkPawnStrike(x, y) {
	if (squares[`${x}${y - 1}`]?.querySelector('img'))
		if (squares[`${x}${y - 1}`]?.querySelector('img').getAttribute('value').slice(0, 5) != index)
			strike(x, y - 1);
	if (squares[`${x}${y + 1}`]?.querySelector('img'))
		if (squares[`${x}${y + 1}`]?.querySelector('img').getAttribute('value').slice(0, 5) != index)
			strike(x, y + 1);
}

function highlightTileRook(row, column) {
	for (let i = column; i <= 7; i++) {
		let z = String.fromCharCode(row);
		if (squares[`${z}${i}`]?.querySelector('img') !== -1 && rightLimit === false) {
			glowTile(z, i);
			if (squares[`${z}${i + 1}`]?.querySelector('img')) {
				rightLimit = true;
				if (squares[`${z}${i + 1}`]?.querySelector('img').getAttribute('value').slice(0, 5) != index)
					strike(z, i + 1);
			}
		}
	}
	for (let j = column; j >= 0; j--) {
		let z = String.fromCharCode(row);
		if (squares[`${z}${j}`]?.querySelector("img") != -1 && leftLimit == false) {
			glowTile(z, j);
			if (squares[`${z}${j - 1}`]?.querySelector("img")) {
				leftLimit = true;
				if (squares[`${z}${j - 1}`]?.querySelector("img").getAttribute('value').slice(0, 5) != index)
					strike(z, j - 1);
			}
		}
	}
	for (let a = row; a <= 104; a++) {
		let p = String.fromCharCode(a), n = String.fromCharCode(a + 1);
		if (squares[`${p}${column}`]?.querySelector("img") != -1 && topLimit == false) {
			glowTile(p, column);
			if (squares[`${n}${column}`]?.querySelector("img")) {
				topLimit = true;
				if (squares[`${n}${column}`]?.querySelector("img").getAttribute('value').slice(0, 5) != index)
					strike(n, column);
			}
		}
	}
	for (let b = row; b >= 97; b--) {
		let q = String.fromCharCode(b - 1), r = String.fromCharCode(b);
		if (squares[`${r}${column}`]?.querySelector("img") != -1 && bottomLimit == false) {
			glowTile(r, column);
			if (squares[`${q}${column}`]?.querySelector("img")) {
				bottomLimit = true;
				if (squares[`${q}${column}`]?.querySelector("img").getAttribute('value').slice(0, 5) != index)
					strike(q, column);
			}
		}
	}
}

function highlightTileBishop(row, column) {
	for (let x = 0; x <= 7; x++) {
		let v = String.fromCharCode(row + x), vNext = String.fromCharCode(row + x + 1),
			w = String.fromCharCode(row - x), wNext = String.fromCharCode(row - x - 1);
		if (squares[`${v}${column - x}`]?.querySelector('img') != -1 && topLeftLimit == false) {
			glowTile(v, column - x)
			if (squares[`${vNext}${column - x - 1}`]?.querySelector('img')) {
				topLeftLimit = true;
				if (squares[`${vNext}${column - x - 1}`]?.querySelector("img").getAttribute('value').slice(0, 5) != index)
					strike(vNext, column - x - 1);
			}
		}
		if (squares[`${w}${column - x}`]?.querySelector('img') != -1 && bottomLeftLimit == false) {
			glowTile(w, column - x)
			if (squares[`${wNext}${column - x - 1}`]?.querySelector('img')) {
				bottomLeftLimit = true
				if (squares[`${wNext}${column - x - 1}`]?.querySelector("img").getAttribute('value').slice(0, 5) != index)
					strike(wNext, column - x - 1);
			}
		}
		if (squares[`${v}${column + x}`]?.querySelector('img') != -1 && rightTopLimit == false) {
			glowTile(v, column + x)
			if (squares[`${vNext}${column + x + 1}`]?.querySelector('img')) {
				rightTopLimit = true
				if (squares[`${vNext}${column + x + 1}`]?.querySelector("img").getAttribute('value').slice(0, 5) != index)
					strike(vNext, column + x + 1);
			}
		}
		if (squares[`${w}${column + x}`]?.querySelector('img') != -1 && rigthBottomLimit == false) {
			glowTile(w, column + x)
			if (squares[`${wNext}${column + x + 1}`]?.querySelector('img')) {
				rigthBottomLimit = true
				if (squares[`${wNext}${column + x + 1}`]?.querySelector("img").getAttribute('value').slice(0, 5) != index)
					strike(wNext, column + x + 1);
			}
		}
	}
}

function highlightTileKing(row, column) {
	for (let i = row - 1; i <= row + 1; i++)
		for (let j = column - 1; j <= column + 1; j++) {
			let z = String.fromCharCode(i);
			if (squares[`${z}${j}`]?.querySelector('img')) {
				if (squares[`${z}${j}`]?.querySelector('img').getAttribute('value').slice(0, 5) != index)
					strike(z, j);
			} else glowTile(z, j);
		}
}

function highlightTileKnight(row, column) {
	for (let x = row - 2, even = 1; x <= row + 2; x++)
		for (let y = column - 2; y <= column + 2; y++, even++)
			if (x != row && y != column && even % 2 == 0) {
				let z = String.fromCharCode(x)
				if (squares[`${z}${y}`]?.querySelector('img')) {
					if (squares[`${z}${y}`]?.querySelector('img').getAttribute('value').slice(0, 5) != index)
						strike(z, y);
				} else glowTile(z, y);
			}
}

function glowTile(a, b) {
	squares[`${a}${b}`]?.classList.add("on-top");
}

function strike(a, b) {
	squares[`${a}${b}`]?.classList.add("strikeable");
}

document.addEventListener("dragstart", (event) => {
	startTile = event.target.parentElement.querySelector("img");
	index = startTile.getAttribute("value").slice(0, 5);
	checkTile(squares[previousTile], startTile);
});

document.addEventListener("dragend", () => {
	rightLimit = false, leftLimit = false, topLimit = false, bottomLimit = false;
	topLeftLimit = false, bottomLeftLimit = false, rightTopLimit = false, rigthBottomLimit = false;
	Array.from(tiles, (tile) => {
		if (tile.classList.contains("on-top"))
			tile.classList.remove("on-top");
		if (tile.classList.contains('strikeable'))
			tile.classList.remove('strikeable');
	});
});

document.addEventListener("dragover", (event) => {
	if (event.target.classList.contains("on-top") ||
		event.target.parentElement?.classList.contains('strikeable'))
		allowNextMove = true;
	else allowNextMove = false;
});

document.addEventListener('dragenter', (event) => {
	if (event.target.classList.contains('on-top'))
		event.target.classList.add('confirm-drop');
})

document.addEventListener('dragleave', (event) => {
	if (event.target.classList.contains('confirm-drop'))
		event.target.classList.remove('confirm-drop');
	if (event.target.classList.contains('strikeable'))
		event.target.classList.remove('strikeable');
})