document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const ScoreDisplay = document.querySelector('#score');
    const StartButton = document.querySelector('#start-button');
    const width = 10;

    // The Tetrominoes
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [width*2, 1, width+1, width*2+1],
        [width, width*2, width*2+1, width*2+2],
    ]

    const zTetromino = [
        [width*2, width+1, width*2+1, width+2],
        [0, width, width+1, width*2+1],
        [width*2, width+1, width*2+1, width+2],
        [0, width, width+1, width*2+1],
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

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    let currentGridPosition = 4;

    // randomly select a tetromino and its first rotation
    let randomTetromino = Math.floor(Math.random()*theTetrominoes.length);
    // 4 possible rotations
    let randomRotation = Math.floor(Math.random()*4);

    console.log(randomTetromino)
    console.log(randomRotation)
    let currentTetromino = theTetrominoes[randomTetromino][randomRotation];

    // draw the tetromino
    function draw() {
        currentTetromino.forEach(index => {
            squares[currentGridPosition + index].classList.add('tetromino')
        })
    }

    // undraw the tetromino
    function undraw() {
        currentTetromino.forEach(index => {
            squares[currentGridPosition + index].classList.remove('tetromino')
        })
    }

    // make the tetromino move down every second
    timerId = setInterval(moveDown, 1000)

    // assign functions to key codes
    function control(e) {
        if(e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode === 38) {
          // rotate
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
            randomTetromino = Math.floor(Math.random() * theTetrominoes.length);
            currentTetromino = theTetrominoes[randomTetromino][randomRotation];
            currentGridPosition = 4
            draw()
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
})