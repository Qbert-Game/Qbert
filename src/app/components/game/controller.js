export default function ($scope, Timer, GameBoard) {
    Timer.start();

    $scope.gameBoard = GameBoard.get();

    $scope.qbert = GameBoard.qbert;

    Timer.subscribe(() => {
        $scope.possibleMoves = GameBoard.getPossibleMoves('qbert');
    });
}