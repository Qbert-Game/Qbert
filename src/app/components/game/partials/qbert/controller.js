export default function ($scope, $rootScope, $timeout, Timer, GameBoard) {
    $scope.gameboard = GameBoard.get();
    $scope.position = {
        row: 4,
        column: 2
    }

    $scope.isJumping = false;

    var id = 'qbert';
    var type = 'qbert';

    var updateViewPosition = () => {
        var { row, column } = $scope.position;
        var position = $scope.gameboard[row][column].getPosition();

        $scope.top = position.top;
        $scope.left = position.left;
    }

    GameBoard.registerCharacter({ id, type, position: $scope.position })

    $timeout(() => {
        updateViewPosition();
    }, 0);

    GameBoard.subscribe((data) => {
        var { action, payload } = data;

        if (payload.id !== id) {
            return;
        }

        switch (action) {
            case GameBoard.actions.animationStart:
                $scope.isJumping = true;
                break;
            case GameBoard.actions.animationEnd:
                updateViewPosition();
                $timeout(() => $scope.isJumping = false, 500);
                break;
        }
    });
}