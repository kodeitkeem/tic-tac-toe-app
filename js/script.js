/*----- constants -----*/
//Model

const COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const LOOKUP = {
    '1': 'X',
    '-1': 'O',
    'null': '',
};

/*----- app's state (variables) -----*/
//Model

let turn, winner, gameboard;


/*----- cached element references -----*/
//View

const $gameboardEl = $('#gameboard');
const $squareEls = $('.square');
const $buttonEl = $('.reset-btn');
const $messageEL = $('#message');


/*----- event listeners -----*/
//Controller

$gameboardEl.on('click', handleMove);
$buttonEl.on('click', handleInit);

/*----- functions -----*/
//Controller

// Start the game once the browser loads
handleInit();


function handleInit() {
    // This function will do two things

    //1) Start the game 
        //A) Create an empty gameboard
            // gameboard = newArray(9).fill().map(() => null);
            gameboard = [null, null, null, null, null, null, null, null, null];

        //B) Assign the turn - player 1 goes first - X goes first
        turn = 1;

        //C) Set winner to false
        winner = false;
        
        //D) Visualize the state of the game to the DOM - create a render() function
        render();
}

function checkWinner() {
    //Compare the position of the player pieces (1 or -1) in the combos Array
    for(let i = 0; i < COMBOS.length; i++){
        if(Math.abs(gameboard[COMBOS[i][0]] + gameboard[COMBOS[i][1]] + gameboard[COMBOS[i][2]]) === 3){
            return gameboard[COMBOS[i][0]]
        }
    } if (gameboard.includes(null)){
        return false;
    } return 'T';
}

function handleMove(evt){
    const position = evt.target.dataset.index;
    if (winner || gameboard[position] !== null) return; //Stop running is value is present
    gameboard[position] = turn;

    // Check to see if we hve a winner
    winner = checkWinner();

    turn *= -1;
    render();
    
}

function render(){
    //Render is going to look at the gameboard array
    gameboard.forEach(function(value, index){
        $($squareEls[index]).text(LOOKUP[value]);
    })
    //Render will also update our message based on the turn or if we won
    if (!winner){
        $($messageEL).text(`It's Player ${LOOKUP[turn]}'s Turn`);
    } else if (winner === 'T'){
        $messageEL.text('Tie Game');
    } else {
        $messageEL.text(`Congratulations ${LOOKUP[winner]} Wins`);
    }
}