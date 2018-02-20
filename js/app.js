// Treehouse Tech Project 4: Tic Tac Toe

// Ronald van der Bergh

// I aim for extra credit with this project.

// main app module, to keep names from cluttering global namespace
! function() {
    // draws game board - hides start screen and win screens

    // remove the JavaScript disabled message
    $('#js_disabled').hide();

    $('#start').show();


    function drawBoard() {
        $('#start').hide();
        $('#finish').hide();
        $('#board').show();
    }

    // drawBoard();

}();