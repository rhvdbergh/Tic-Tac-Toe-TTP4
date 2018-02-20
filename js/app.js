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

    let activePlayer = 1; // player 1 is active; value alternates between 1 and 2

    // draws game board - hides start screen and win screens
    function drawBoard() {
        $startScreen.hide();
        $finishScreen.hide();
        $boardScreen.show();
        $player1.addClass('active');
    }

    // toggles player between 1 and 2
    function togglePlayer() {
        if (activePlayer === 1) activePlayer = 2
        else activePlayer = 1;
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

    // event handler for game board boxes
    $boxes.hover((event) => { console.log(event.target); }, (event) => {});

    $boxes.on('click', (event) => {
        const box = event.target;

        if (!($(box).hasClass('clicked'))) {
            console.log('clickin');
            if (activePlayer === 1) {
                $(box).addClass('box-filled-1');
            } else {
                $(box).addClass('box-filled-2');
            }

            $(box).addClass('clicked');

            togglePlayer();
        };

    });

}();