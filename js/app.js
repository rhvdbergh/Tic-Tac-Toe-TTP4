// Treehouse Tech Project 4: Tic Tac Toe

// Ronald van der Bergh

// I aim for extra credit with this project.

// main app module, to keep names from cluttering global namespace
! function() {

    const $startScreen = $('#start');
    const $boardScreen = $('#board');
    const $finishScreen = $('#finish');
    const $player1 = $('#player1');
    const $player2 = $('#player2');
    const $boxes = $('.boxes');
    // boardArray emulates the board in a three by three pattern
    // using 3 nested arrays
    let boardArray = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    let activePlayer = 1; // player 1 is active; value alternates between 1 and 2

    // draws game board - hides start screen and win screens
    function drawBoard() {
        $startScreen.hide();
        $finishScreen.hide();
        $boardScreen.show();
        $player1.addClass('active');
        $('.box').addClass('p1');
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

        // player 1 = o, player 2 = x
        // first, we test all player 1's tokens to see if three is in a line
        // then, if the test has not returned anything, test for player 2
        // finally, check if there is a draw
        for (let player = 1; player < 3; player++) {
            // test for all possible combinations of player tokens that can possible line up in 3
            if (boardArray[0][0] === player && boardArray[0][1] === player && boardArray[0][2] === player) {
                return player;
            }
            if (boardArray[0][0] === player && boardArray[1][0] === player && boardArray[2][0] === player) {
                return player;
            }
            if (boardArray[0][0] === player && boardArray[1][1] === player && boardArray[2][2] === player) {
                return player;
            }

            if (boardArray[0][1] === player && boardArray[1][1] === player && boardArray[1][2] === player) {
                return player;
            }

            if (boardArray[0][2] === player && boardArray[1][1] === player && boardArray[2][0] === player) {
                return player;
            }
            if (boardArray[0][2] === player && boardArray[1][2] === player && boardArray[2][2] === player) {
                return player;
            }

            if (boardArray[1][0] === player && boardArray[1][1] === player && boardArray[1][2] === player) {
                return player;
            }

            if (boardArray[2][0] === player && boardArray[2][1] === player && boardArray[2][2] === player) {
                return player;
            }
        }

        // if the test is at this point, the game must still be in progress
        return -1;
    }

    // p = player, the index is the index of the 0-indexed element in the DOM
    function addTokenToBoard(p, index) {

        let row = (index - (index % 3)) / 3;
        let col = (index % 3);
        boardArray[row][col] = p;
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
            drawBoard();
        }
    });

    // $boxes.hover((event) => { console.log(event.target); }, (event) => {});

    // event handler for game board boxes    
    $boxes.on('click', (event) => {
        const box = event.target;

        if (!($(box).hasClass('clicked'))) {
            console.log(box.id);
            if (activePlayer === 1) {
                $(box).addClass('box-filled-1');
            } else {
                $(box).addClass('box-filled-2');
            }

            $(box).addClass('clicked');

            // place the token "on the board" by adding it to the boardArray
            const index = $(box).index();
            addTokenToBoard(activePlayer, index);

            if (testForFinish() > 0) {
                console.log('game over');
            } else {
                togglePlayer();
            }
        };
    });

}();