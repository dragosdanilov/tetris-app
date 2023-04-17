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

    function draw() {
        currentTetromino.forEach(index => {
            squares[currentGridPosition + index].classList.add('tetromino')
        })
    }

    draw()

    console.log(squares)
})