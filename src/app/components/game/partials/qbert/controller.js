export default function ($scope, $timeout, Timer, GameBoard) {
    $scope.gameboard = GameBoard.get();
    $scope.position = {
        row: 0,
        column: 0
    }

    var updateViewPosition = () => {
        var { row, column } = $scope.position;
        var position = $scope.gameboard[row][column].getPosition();
        $scope.top = position.top;
        $scope.left = position.left;
    }

    $timeout(() => {
       updateViewPosition();
    }, 0);

    Timer.subscribe(() => {
        if ($scope.position.row >= $scope.gameboard.length - 1) {
            return;
        }

        $scope.position.row++;
        $scope.position.column++;
        updateViewPosition();
    });
}