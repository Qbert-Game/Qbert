export default function ($scope, Timer, GameBoard, Game, $timeout) {
    Game.startLevel(1);
    Timer.start();

    $scope.gameBoard = GameBoard.get();

    $scope.qbert = GameBoard.qbert;

    Timer.subscribe(() => {
        $scope.possibleMoves = GameBoard.getPossibleMoves('qbert');
    });
}