// Treehouse Tech Project 4: Tic Tac Toe

// Ronald van der Bergh

// I aim for extra credit with this project.

// main app module, to keep names from cluttering global namespace
! function() {

    const $startScreen = $('#start');
    const $boardScreen = $('#board');
    const $finishScreen = $('#finish');
    const $finishMessage = $('.message');
    const $enterNameScreenP1 = $('#enter_name_p1');
    const $enterNameInputBoxP1 = $('#name_input_p1');
    const $enterNameFormP1 = $('#name_input_form_p1');
    const $enterNameScreenP2 = $('#enter_name_p2');
    const $enterNameInputBoxP2 = $('#name_input_p2');
    const $enterNameFormP2 = $('#name_input_form_p2');
    const $player1 = $('#player1');
    const $player2 = $('#player2');
    let activePlayer = 1; // player 1 is active; value alternates between 1 and 2  
    let playerOneName = 'Player 1';
    let playerTwoName = 'Player 2';
    let twoPlayerGame = false; // boolean for keeping track if game has one or two players
    const $boxes = $('.boxes');
    // boardArray emulates the board in a three by three pattern
    // using 3 nested arrays
    let boardArray = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    // clears boardArray
    function clearBoardArray() {
        boardArray = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
    }
    // draws game board - hides start screen and win screens
    // essentially, this sets up a new game
    function drawBoard() {
        $startScreen.hide();
        $enterNameScreenP1.hide();
        $enterNameScreenP2.hide();
        $finishScreen.hide();
        $boardScreen.show();
        $player1.addClass('active');
        activePlayer = 1;
        $player2.removeClass('active'); // in case this is left over from previous turn
        $('.box') // prepares boxes for a new game
            .addClass('p1')
            .removeClass('p2')
            .removeClass('clicked');
        $('.box')
            .removeClass('box-filled-1')
            .removeClass('box-filled-2');

        clearBoardArray();

        // clear finish screen message and classes, if left over from previous game
        $finishMessage.text('');
        $finishScreen
            .removeClass('screen-win-one')
            .removeClass('screen-win-two')
            .removeClass('screen-win-tie');
    }

    // toggles player between 1 and 2
    function togglePlayer() {
        if (activePlayer === 1) {
            activePlayer = 2;
            $player1.removeClass('active');
            $player2.addClass('active');
            $('.box').each(function(i, box) {
                if (!($(box).hasClass('clicked'))) {
                    $(box).removeClass('p1').addClass('p2');
                }
            });
        } else {
            activePlayer = 1;
            $player2.removeClass('active');
            $player1.addClass('active');
            $('.box').each(function(i, box) {
                if (!($(box).hasClass('clicked'))) {
                    $(box).removeClass('p2').addClass('p1');
                }
            });
        }
    }

    // tests if the game is over
    // returns the winner; -1 = game in progress, 0 = draw, 
    // 1 = player 1, 2 = player 2
    function testForFinish() {

        // tests a given combination of 3 co-ordinates in the 2d array to see if they all contain p(layer)
        function testCombination(r1, c1, r2, c2, r3, c3, p) {
            if (boardArray[r1][c1] === p && boardArray[r2][c2] === p && boardArray[r3][c3] === p) {
                return true;
            }
            return false;
        }
        // player 1 = o, player 2 = x
        // first, we test all player 1's tokens to see if three is in a line
        // then, if the test has not returned anything, test for player 2 - hence the for loop
        // finally, check if there is a draw
        for (let player = 1; player < 3; player++) {
            // test for all possible combinations of player tokens that can possible line up in 3
            if (testCombination(0, 0, 0, 1, 0, 2, player)) return player;
            if (testCombination(0, 0, 1, 0, 2, 0, player)) return player;
            if (testCombination(0, 0, 1, 1, 2, 2, player)) return player;

            if (testCombination(0, 1, 1, 1, 2, 1, player)) return player;

            if (testCombination(0, 2, 1, 1, 2, 0, player)) return player;
            if (testCombination(0, 2, 1, 2, 2, 2, player)) return player;

            if (testCombination(1, 0, 1, 1, 1, 2, player)) return player;

            if (testCombination(2, 0, 2, 1, 2, 2, player)) return player;
        }

        // test for a draw
        // a draw is when all the boxes have tokens on them but no one won
        // so nine tokens have been placed
        let count = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (boardArray[i][j] > 0) count++;
            }
        }
        if (count === 9) {
            return 0;
        }
        // if the test is at this point, the game must still be in progress
        return -1;
    }

    // p = player, the index is the index of the 0-indexed element in the DOM
    // the row and column are determined using the mod operator
    function addTokenToBoard(p, index) {

        let row = (index - (index % 3)) / 3;
        let col = (index % 3);
        boardArray[row][col] = p; // update the boardArray to contain player's token
    }

    // 
    function endScreen(gameState) {
        $boardScreen.hide();

        if (gameState === 1) {
            $finishScreen.addClass('screen-win-one');
            $finishMessage.text('Winner');
        } else if (gameState === 2) {
            $finishScreen.addClass('screen-win-two');
            $finishMessage.text('Winner');
        } else if (gameState === 0) {
            $finishScreen.addClass('screen-win-tie');
            $finishMessage.text('It\'s a Tie!');
        }
        $finishScreen.show();
    }

    function getPlayerName() {
        if (!twoPlayerGame) {
            $enterNameInputBoxP1.attr('placeholder', 'Enter player name ...');
        } else {
            $enterNameInputBoxP1.attr('placeholder', 'Enter player one name ...');
        }
        $enterNameScreenP1.show();
        $enterNameInputBoxP1.focus();
    }

    // INITIAL SETUP

    // remove the JavaScript disabled message
    $('#js_disabled').hide();

    $startScreen.show();

    // EVENT HANDLERS

    // event handler for start button on #start
    $startScreen.on('click', (event) => {

        if (event.target.className === "button") { // button clicked
            const button = event.target;
            if (button.textContent === "Start 1 player game") {
                twoPlayerGame = false;
            } else {
                twoPlayerGame = true;
            }
            getPlayerName();
        }
    });

    // event handler for player one enter name form
    $enterNameFormP1.on('submit', (event) => {
        event.preventDefault();
        playerOneName = $enterNameInputBoxP1.val();
        if (!twoPlayerGame) {
            drawBoard();
        } else { // this is a two player game, so set up screen for player two name entry
            $enterNameScreenP1.hide();
            $enterNameInputBoxP2.attr('placeholder', 'Enter player two name ...');
            $enterNameScreenP2.show();
            $enterNameInputBoxP2.focus();
        }
    });
    // event handler for player two enter name form
    $enterNameFormP2.on('submit', (event) => {
        event.preventDefault();
        playerTwoName = $enterNameInputBoxP2.val();
        drawBoard();
        console.log('p1: ', playerOneName, 'p2: ', playerTwoName);
    });

    // event handler for finish button on #finish
    $finishScreen.on('click', (event) => {

        if (event.target.className === "button") { // button clicked
            const button = event.target;
            $finishScreen.hide();
            $startScreen.show();
        }
    });

    // $boxes.hover((event) => { console.log(event.target); }, (event) => {});

    // event handler for game board boxes    
    $boxes.on('click', (event) => {
        const box = event.target;

        if (!($(box).hasClass('clicked'))) {
            if (activePlayer === 1) {
                $(box).addClass('box-filled-1');
            } else {
                $(box).addClass('box-filled-2');
            }

            $(box).addClass('clicked');

            // place the token "on the board" by adding it to the boardArray
            const index = $(box).index();
            addTokenToBoard(activePlayer, index);

            const gameState = testForFinish();
            if (gameState >= 0) {
                console.log('game over');
                endScreen(gameState);
            } else {
                togglePlayer();
            }
        };
    });

}();