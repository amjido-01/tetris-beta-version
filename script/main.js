// const { default: Swal } = require("sweetalert2");
// import {Howl, Howler} from 'howler';
// const { Howl } = require('howler');

// const { default: Swal } = require("sweetalert2");

// variable that hold the whole grid container
const grid = document.querySelector(`.grid`);
// variable that get all the divs inside the grid container
let squares = Array.from(document.querySelectorAll(`.grid div`));
// variable that hold the total width of the grid container
const width = 10;

// next random selected tetromino
let nextRandom = 0
// the score variabe
let score = 0;

let levelUp = 1

// time id variable
let timerId;

// tetrominoes colors
const colors = [
    '#d05663',
    '#f0ad4e',
    'black',
    'purple',
    'gray'
]

const btnSettings = document.querySelector(`#setting`);
const cancelBtn = document.querySelector(`#cancel-btn`)


// squares.forEach(index => {
//     if (index.classList.contains(`taken`)) {
//         index.style.background = `black`
//     }
// })

// variable that hold the display scores
const displayScore = document.querySelector(`#scores`);
// variable that hold the start and the stop button
const startBtn = document.querySelector(`#start-btn`);

// all shapes of the L tetromino
const lTetromino = [
    [1, width+1, width*2+1, 2],  //  |_
    [width, width+1, width+2, width*2+2],  //    
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
];

// all shapes of the Z tetromino
const zTetromino = [
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1]
];

// all shapes of the T tetromino
const tTetromino = [
    [1, width, width+1, width+2],
    [1, width+1, width*2+1, width+2],
    // [1, width, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1,width,width+1, width*2+1]
];

// all the shapes of the O tetromino
const oTetromino = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
];

// all the shapes of the I tetromino
const iTetromino = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3]
];

// all the shapes of the T tetromino
const theTetrominoes = [
    lTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino
];

// variable that hold the random choosing tetromino shapes
let random = Math.floor(Math.random() * theTetrominoes.length);
// varaible that hold the first shape of each tetromino
let currentRotation = 0
// variable the hold the current position to start from the top
let currentPosition = 4;
// variable the hold the current rotation of the shapes
let current = theTetrominoes[random][currentRotation];
console.log(current)
console.log(random)



// draw function
function draw() {
    // loops through all the index of the current choosing shape and add a class of tetromino which contains a background color  
    current.forEach(index => {
        squares[currentPosition + index].classList.add(`tetromino`)
        squares[currentPosition + index].style.background = colors[random]
    })
}

// undraw function
function undraw() {
    current.forEach( index => {
        squares[currentPosition + index].classList.remove(`tetromino`)
        squares[currentPosition + index].style.background = '';
    })
}

// move down function
function moveDown() {
    // remove the shape
    undraw();
    // add ten from the current position
    currentPosition += width;
    // draw the shape again
    draw();
    // stop at the end of the gane board
    stopAtTheBottom()
}
// timerId = setInterval(moveDown, 1000);

// control function
function control(e) {
    if (e.keyCode === 37) {
        moveLeft()
    } else if (e.keyCode === 38) {
        rotate()
    } else if (e.keyCode === 39) {
        moveRight()
    } else if (e.keyCode === 40) {
        moveDown()
    }
}

document.addEventListener(`keyup`, control)

// stop at the end function
function stopAtTheBottom() {
    // condition to check to see if some of current divs plus 10 will reach a div with the class of taken
    // and if true convert the whole current variable into a class of taken
    if (current.some(index => squares[currentPosition + index + width].classList.contains(`taken`))) {
        current.forEach(index => squares[currentPosition + index].classList.add(`taken`))
        // current.forEach(index => squares[currentPosition + index].style.background = 'black')
        // draw anothe random shape
        random = nextRandom
        nextRandom = Math.floor(Math.random() * theTetrominoes.length)
        current = theTetrominoes[random][currentRotation];
        currentPosition = 4;
        draw()
        displayShapes()
        addScore()
        gameOver()
        // addScore()
    }
}

// move left function
function moveLeft() {
    // undraw to delete the shape first
    undraw();

    // variable that hold to see if some of the current index reached the left side edge
    const leftEdge = current.some(index => (currentPosition + index) % width === 0);
    console.log(leftEdge)
    // and if the shape is not at the left edge, change the current position by subtractiong one from the initial position
    if(!leftEdge) currentPosition -=1

    // condition that satisfy not for any shape not to be enter another shape from the left side
    if (current.some(index => squares[currentPosition + index].classList.contains(`taken`))) {
        currentPosition +=1
    }
    draw()
}

// move right function
function moveRight() {
    // undraw to delete the shape first
    undraw();

    // variable that hold to see if some of the current index reached the right side edge
    const rightEdge = current.some(index => (currentPosition + index) % width === width - 1);
    console.log(rightEdge)

    // and if the shape is not at the left edge, change the current position by subtractiong one from the initial position
    if (!rightEdge) currentPosition +=1;

    // condition that satisfy not for any shape not to be enter another shape from the right side
    if (current.some(index => squares[currentPosition + index].classList.contains(`taken`))) {
        currentPosition -=1
    }
    draw()
}

// having a big bug
function rotate() {
    undraw()
    currentRotation ++
    

    if (currentRotation === current.length) {
        currentRotation = 0
    }
    
    current = theTetrominoes[random][currentRotation]
    draw()
    
}


// need to be back from here downward
const displayNextSquares = document.querySelectorAll(`.mini-grid div`);
const displayWidth = 4;
const displayIndex = 0;

const upNextTetrominoesShape = [
    [1, displayWidth+1, displayWidth*2+1, 2],
    [0, displayWidth, displayWidth+1, displayWidth*2+1],
    [1, displayWidth, displayWidth+1, displayWidth+2],
    [0, 1, displayWidth, displayWidth+1],
    [1, displayWidth+1, displayWidth*2+1, displayIndex*3+1]
]

function displayShapes() {
    displayNextSquares.forEach(index => {
        index.classList.remove(`tetromino`);
        index.style.background = ''
    })

    upNextTetrominoesShape[nextRandom].forEach(index => {
        displayNextSquares[displayIndex + index].classList.add(`tetromino`);
        displayNextSquares[displayIndex + index].style.background = colors[nextRandom]
    })
}

// var sound = Howl({
//     src: ['sound/05 The One.mp3'],
//     format: ['mp3']
// });
  
// sound.play();
let seconds = 1000 

// const sound = new Howl({
//     src:['../sound.mp3']
// });

// sound.play()

// Howler.volume(0.5)




function playSound(src) {
    var audio = document.createElement(`audio`);
    audio.loop = true;
    audio.src = src;
    return audio;
}

// btn.addEventListener(`click`, () => {
//     if(timerId) {
//         clearInterval(timerId);
//         timerId = null
//     }
// })

function motion() {
    draw();
    timerId = setInterval(moveDown, seconds);
    nextRandom = Math.floor(Math.random() * theTetrominoes.length)
    displayShapes()
}

function btnFunction() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        // sweet alert need
        Swal.fire({
            title: 'Resume!',
            icon: 'info'
        }).then( (result) => {
            if (result.isConfirmed) {
                motion()
            }
        })
        // motion()
    } else {
        motion()
    }
};

btnSettings.addEventListener(`click`, () => {
    if(timerId) {
        clearInterval(timerId)
        timerId = null
    } else {
        // motion()
    }
})

// function btnSetFunction() {
//     if (timerId) {
//         draw();
//         timerId = setInterval(moveDown, seconds)
//         console.log(seconds)
//         nextRandom = Math.floor(Math.random() * theTetrominoes.length);
//         displayShapes()
//     } else {
//         clearInterval(timerId);
//         timerId = null;
//     }
// };

startBtn.addEventListener(`click`, btnFunction)
cancelBtn.addEventListener(`click`, motion)


let nextLevelAlert

function nextAlert() {
    levelUp ++
    let timerInterval

    Swal.fire({
        title: 'Auto close alert!',
        html: `welcome to level <b></b>`,
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            console.log(b)
            timerInterval = setInterval(() => {
            b.textContent = `${levelUp}`
        }, 100)
        clearInterval(timerId)
        // motion()
    },
    willClose: () => {
    clearInterval(timerInterval)
  }
    }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
    // console.log('I was closed by the timer')
  }
})
    // alert(`welcome to level ${levelUp}`)
    // motion()
}

function addScore() {
    for (let i = 0; i < 199; i +=width) {
        const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

        if (row.every(index => squares[index].classList.contains(`taken`))) {
            score += 10;
            // if (score % 50 !== 0) {
            //     seconds += 1000;
            //     console.log(seconds)
            // }
            if (score % 50 === 0) {
                clearInterval(timerId)
                seconds /= 2;
                // timerId = null;
                timerId = setInterval(moveDown, seconds)
                console.log(seconds)
                nextAlert();
                clearInterval(nextAlert)
                // levelUp ++
                // alert(`welcome to level ${levelUp}`)
            }
            displayScore.innerHTML = score;

            row.forEach(index => {
                squares[index].classList.remove(`taken`)
                squares[index].classList.remove(`tetromino`)
                squares[index].style.background = ''
            })

            const squaresRemoved = squares.splice(i, width)
            console.log(squaresRemoved)
            squares = squaresRemoved.concat(squares)
            squares.forEach(index => grid.appendChild(index))
        }
    }
}
// let message = document.querySelector(`#message`).innerHTML = 'you scored'
let createMessage = () => {
    let h1 = document.createElement(`h1`);
    let message = document.createTextNode(`you scored:`);
    h1.appendChild(message);
    h1.style.textTransform = 'capitalize'
    return h1.textContent;
}


function gameOver() {
    if (current.some(index => squares[currentPosition + index].classList.contains(`taken`))) {
        
        Swal.fire({
            title: 'Game Over!',
            text: `${createMessage()} ${score}`,
            showDenyButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Try again'
          }).then((result) => {
            if (result.isConfirmed) {
                document.location.reload()
            } else if (result.isDenied) {
                Swal.fire({
                    icon: 'warning',
                    title:'Are show you want to quit?',
                    // showCloseButton: true
                    // showCancelButton: true
                    // showCloseButton: true
                }).then((result2) => {
                    if (result2.isConfirmed) {
                        window.close()
                    }
                })
                
            }
        })

        clearInterval(timerId)
    }
}