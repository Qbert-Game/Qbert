export default function ($scope, Timer, GameBoard, Game, $timeout) {
    // wait for all partials to be loaded
    $timeout(() => {
        Game.startLevel(1);
        Timer.start();
    }, 0);

    Game.subscribe((data) => {
        var { action } = data;

        if (action !== Game.actions.levelStarted) {
            return;
        }

        $scope.gameBoard = GameBoard.get();
        $scope.qbert = GameBoard.qbert;
    })
}