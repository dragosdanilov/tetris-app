document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startButton = document.querySelector('#start-button');
    const width = 10;
    let nextRandom = 0;
    let timerId;
    let score = 0;
    const colors = [
        'rgb(238, 147, 68)', //orange
        'rgb(214, 157, 154)', //pink
        'rgb(191, 78, 74)', //red
        'rgb(154, 166, 254)', //cyan
        'rgb(101, 82, 142)', //purple
        'rgb(92, 193, 126)', //green
        'rgb(52, 138, 167)' //blue
    ]

    // The Tetrominoes
    const jTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [width*2, 1, width+1, width*2+1],
        [width, width*2, width*2+1, width*2+2],
    ]

    const lTetromino = [
        [0, 1, width+1, width*2+1],
        [width*2, width*2+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2+2],
        [width, width+1, width+2, width*2],
    ]

    const sTetromino = [
        [width*2, width+1, width*2+1, width+2],
        [0, width, width+1, width*2+1],
        [width*2, width+1, width*2+1, width+2],
        [0, width, width+1, width*2+1],
    ]

    const zTetromino = [
        [width, width+1, width*2+1, width*2+2],
        [width+1, width*2+1, width+2, 2],
        [width, width+1, width*2+1, width*2+2],
        [width+1, width*2+1, width+2, 2],
    ]

    const tTetromino = [
        [1, width, width+1, width+2],
        [1, width+1, width*2+1, width+2],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1],
    ]

    const oTetromino = [
        [0, width, 1, width+1],
        [0, width, 1, width+1],
        [0, width, 1, width+1],
        [0, width, 1, width+1],
    ]

    const iTetromino = [
        [1, width+1, width*2+1, width*3+1],
        [0, 1, 2, 3],
        [1, width+1, width*2+1, width*3+1],
        [0, 1, 2, 3],
    ]

    const theTetrominoes = [jTetromino, lTetromino, sTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    let currentGridPosition = 4;
    let currentGridRotation = 0;

    // randomly select a tetromino and its first rotation
    let random = Math.floor(Math.random()*theTetrominoes.length);

    let currentTetromino = theTetrominoes[random][currentGridRotation];

    // draw the tetromino
    function draw() {
        currentTetromino.forEach(index => {
            squares[currentGridPosition + index].classList.add('tetromino')
            squares[currentGridPosition + index].style.backgroundColor = colors[random]
        })
    }

    // undraw the tetromino
    function undraw() {
        currentTetromino.forEach(index => {
            squares[currentGridPosition + index].classList.remove('tetromino')
            squares[currentGridPosition + index].style.backgroundColor = ''
        })
    }

    // make the tetromino move down every second
    // timerId = setInterval(moveDown, 1000)

    // assign functions to key codes
    function control(e) {
        if(e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode === 38) {
            rotate()
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            moveDown()
        }
    }
    document.addEventListener('keyup', control)

    // move down function
    function moveDown() {
        undraw()
        currentGridPosition += width;
        draw()
        freeze()
    }

    function freeze() {
        if(currentTetromino.some(index => squares[currentGridPosition + index + width].classList.contains('taken'))) {
            currentTetromino.forEach(index => squares[currentGridPosition + index].classList.add('taken'))
            // start a new tetromino falling
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            currentTetromino = theTetrominoes[random][currentGridRotation];
            currentGridPosition = 4
            draw()
            displayShape()
            addScore()
            gameOver()
        }
    }

    // move the tetromino left 
    // unless is at the edge of the grid or there is a blockage

    function moveLeft() {
        undraw()
        const isAtLeftEdge = currentTetromino.some(index => (currentGridPosition + index) % width === 0);

        if (!isAtLeftEdge) {
            currentGridPosition -= 1;
        }

        if (currentTetromino.some(index => squares[currentGridPosition + index].classList.contains('taken'))) {
            currentGridPosition += 1
        }

        draw()
    }

    // move the tetromino left 
    // unless is at the edge of the grid or there is a blockage

    function moveRight() {
        undraw()
        const isAtRightEdge = currentTetromino.some(index =>
        (currentGridPosition + index) % width === width - 1)

        if (!isAtRightEdge) {
            currentGridPosition += 1
        }

        if (currentTetromino.some(index => squares[currentGridPosition + index].classList.contains('taken'))) {
            currentGridPosition -= 1
        }

        draw()
    }

    // rotate the tetromino
    function rotate() {
        undraw()
        currentGridRotation ++
        if (currentGridRotation === currentTetromino.length) { //if the current rotation gets to 4, make it go back to 0
            currentGridRotation = 0
        }
        currentTetromino = theTetrominoes[random][currentGridRotation]
        draw()
    }

    // show up-next tetromino in mini-grid
    const displaySquares = document.querySelectorAll('.mini-grid div');
    const displayWidth = 4;
    const displayIndex = 0;

    // the tetrominoes without rotations
    const upNextTetrominoes = [
        [1, displayWidth+1, displayWidth*2+1, 2], //jTetromino
        [1, 2, displayWidth+2, displayWidth*2+2], //lTetromino
        [1, displayWidth+1, displayWidth+2, displayWidth*2+2], //sTetromino
        [displayWidth+1, displayWidth*2+1, displayWidth+2, 2], //zTetromino
        [1, displayWidth+1, displayWidth*2+1, displayWidth+2], //tTetromino
        [displayWidth+1, displayWidth+2, displayWidth*2+1, displayWidth*2+2], //oTetromino
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1], //iTetromino
    ]

    // display the shape in the mini-grid display
    function displayShape() {
        // remove any trace of a tetromino from the entire grid
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
            square.style.backgroundColor = ''
        })
        upNextTetrominoes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetromino')
            displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
        })
    }

    // add functionality to the button
    startButton.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId)
            timerId = null;
        } else {
            draw()
            timerId = setInterval(moveDown, 1000)
            nextRandom = Math.floor(Math.random()*theTetrominoes.length)
            displayShape()
        }
    })

    function addScore() {
        for (let i = 0; i < 199; i += width) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

            if (row.every(index => squares[index].classList.contains('taken'))) {
                score += 10;
                scoreDisplay.innerHTML = score;
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetromino')
                    squares[index].style.backgroundColor = ''
                })
                const squaresRemoved = squares.splice(i, width);
                squares = squaresRemoved.concat(squares);
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }

    // game over
    function gameOver() {
        if (currentTetromino.some(index => squares[currentGridPosition + index].classList.contains('taken'))) {
            scoreDisplay.innerHTML = 'end';
            clearInterval(timerId);
        }
    }

})