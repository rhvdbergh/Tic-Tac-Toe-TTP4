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
    const $displayNameP1 = $('#p1_name_display');
    const $displayNameP2 = $('#p2_name_display');
    let activePlayer = 1; // player 1 is active; value alternates between 1 and 2  
    let playerOneName = 'Player 1';
    let playerTwoName = 'Player 2';
    let gameState = -1; // game is still in progress
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
        $displayNameP1.addClass('active');
        activePlayer = 1;
        $player2.removeClass('active'); // in case this is left over from previous turn
        $displayNameP2.removeClass('active');
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
            $displayNameP1.removeClass('active');
            $player2.addClass('active');
            $displayNameP2.addClass('active');
            $('.box').each(function(i, box) {
                if (!($(box).hasClass('clicked'))) {
                    $(box).removeClass('p1').addClass('p2');
                }
            });
        } else {
            activePlayer = 1;
            $player2.removeClass('active');
            $displayNameP2.removeClass('active');
            $player1.addClass('active');
            $displayNameP1.addClass('active');
            $('.box').each(function(i, box) {
                if (!($(box).hasClass('clicked'))) {
                    $(box).removeClass('p2').addClass('p1');
                }
            });
        }
    }

    // returns an array with coordinates of empty boxes
    // check all the boxes, and if empty (value = 0), add to the array to return
    function findEmptyBoxes(testBoard) {
        let emptyBoxes = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (testBoard[i][j] === 0) {
                    emptyBoxes.push([i, j]);
                }
            }
        }
        return emptyBoxes;
    }

    // tests if the game is over
    // returns the winner; -1 = game in progress, 0 = draw, 
    // 1 = player 1, 2 = player 2
    function testForFinish(testBoard) {

        // tests a given combination of 3 co-ordinates in the 2d array to see if they all contain p(layer)
        function testCombination(r1, c1, r2, c2, r3, c3, p) {
            if (testBoard[r1][c1] === p && testBoard[r2][c2] === p && testBoard[r3][c3] === p) {
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

        // if there are no empty boxes left, the game is a draw
        if (findEmptyBoxes(testBoard).length === 0) {
            return 0;
        }

        // if the test is at this point, the game must still be in progress
        return -1;
    }

    // board = the current board (hypothetical for possible computer moves, but
    // pass boardArray for "real" moves), p = player, the index is the index of 
    // the 0-indexed element in the DOM
    // the row and column are determined using the mod operator
    function addTokenToBoard(p, index) {

        let row = (index - (index % 3)) / 3;
        let col = (index % 3);
        boardArray[row][col] = p; // update the boardArray to contain player's token
    }

    // shows end screen with player's name / tie message
    function endScreen() {

        if (gameState === 1) {
            $finishScreen.addClass('screen-win-one');
            $finishMessage.text(`${playerOneName} wins!`);
        } else if (gameState === 2) {
            $finishScreen.addClass('screen-win-two');
            $finishMessage.text(`${playerTwoName} wins!`);
        } else if (gameState === 0) {
            $finishScreen.addClass('screen-win-tie');
            $finishMessage.text('It\'s a Tie!');
        }

        $boxes.css('opacity', '0.2');

        setTimeout(() => { // delay the end screen to see final move
            $boardScreen.hide();
            $boxes.css('opacity', '1');
            $finishScreen.show();
            gameState = -1; // reset for new game
            if (!twoPlayerGame) {
                playerTwoName = "Player 2"; // reset in case next game is a 2 player game
            }
        }, 2500);
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

    // trims the player's name to 13 letters, to fit in on screen
    function trimName(name) {
        if (name.length > 13) {
            return name.substring(0, 13);
        }
        return name;
    }

    // findEmptyBoxes() returns coordinates; convert this to the n-th number box's index
    function convertCoordinatesToIndex(coord) { // coord is an array of length 2 containing row, col coord
        // multiply row by three, then add column
        return (coord[0] * 3) + coord[1];
    }


    // using the minimax algorithm, the function returns the best available move
    function findBestMove(boardState, player) {

        // an array to store possible scores in for each move
        let scores = [];

        let testState = testForFinish(boardState);

        // first we test to see whether the hypothetical game is over
        // if so, return the score that this game ended in
        if (testState === 1) { // the game is over, the human player has won
            return -1; // add -1 to the score for this round
        } else if (testState === 2) {
            return 1; // add 1 to the score for this round
        } else if (testState === 0) { // it's a tie
            return 0; // add 0 to the score for this round
        }

        findEmptyBoxes(boardState).forEach(box => {
            // make a hypothetical move on the current state of the board

            let newBoardState = [ // new board
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ];

            // copy everything in the previous array to the new board
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    newBoardState[i][j] = boardState[i][j];
                }
            }

            newBoardState[box[0]][box[1]] = player;

            // switch the player to the opposite player
            let oppositePlayer = 1;
            if (player === 1) {
                oppositePlayer = 2;
            } else {
                oppositePlayer = 1;
            }

            scores.push(findBestMove(newBoardState, oppositePlayer));
        });

        console.log(scores);

    }

    // makes a random move by the computer
    function computerMove() {

        // find all available moves by computer
        const options = findEmptyBoxes(boardArray);
        const allBoxes = $('.box');
        // picks a random option
        let choice = Math.round(Math.random() * (options.length - 1));

        findBestMove(boardArray, activePlayer);

        // convert the coordinates to the n-th number box to get the index in $('.box')
        const index = convertCoordinatesToIndex(options[choice]);

        setTimeout(() => { // wait to make it appear as if computer is thinking
            $(allBoxes[index]).addClass('clicked box-filled-2');
            addTokenToBoard(activePlayer, index); // computer will always be player 2

            gameState = testForFinish(boardArray);
            if (gameState >= 0) {
                endScreen();
            } else {
                togglePlayer();
            }
        }, 1500); // end timeout

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
        playerOneName = trimName(playerOneName);
        $displayNameP1.text(playerOneName);
        if (!twoPlayerGame) {
            $displayNameP2.text("Computer");
            playerTwoName = "Computer";
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
        playerTwoName = trimName(playerTwoName);
        $displayNameP2.text(playerTwoName);
        drawBoard();
    });

    // event handler for finish button on #finish
    $finishScreen.on('click', (event) => {

        if (event.target.className === "button") { // button clicked
            const button = event.target;
            $finishScreen.hide();
            $startScreen.show();
        }
    });

    // event handler for game board boxes    
    $boxes.on('click', (event) => {
        // only run logic if game is still in progress
        // otherwise user would still be able to click when game is over
        if (gameState === -1) {
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

                gameState = testForFinish(boardArray);
                if (gameState >= 0) {
                    endScreen();
                } else {
                    togglePlayer();
                    // if this is a two player game, make the computer move
                    // after the computer moved, if the game is not over, the 
                    // human player will again become the active player
                    if (!twoPlayerGame) {
                        computerMove();
                    }
                }
            }
        }

    });

}();