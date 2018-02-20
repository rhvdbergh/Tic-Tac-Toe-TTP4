// Treehouse Tech Project 4: Tic Tac Toe

// Ronald van der Bergh

// I aim for extra credit with this project.

// main app module, to keep names from cluttering global namespace
! function() {


    const $startScreen = $('#start');
    const $board = $('#board');
    const $finishScreen = $('#finish');

    // draws game board - hides start screen and win screens
    function drawBoard() {
        $startScreen.hide();
        $finishScreen.hide();
        $board.show();
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
}();