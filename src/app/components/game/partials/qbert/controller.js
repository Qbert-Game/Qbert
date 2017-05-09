export default function ($scope, $rootScope, $timeout, Timer, GameBoard, Game) {
    var updateViewPosition = () => {
        var { row, column } = $scope.position;

        $scope.gameboard[row][column].getPosition().then((position) => {
            $scope.top = position.top;
            $scope.left = position.left;
        });
    }

    var init = () => {
        $scope.gameboard = GameBoard.get();
        $scope.position = {
            row: 0,
            column: 0
        }

        $scope.isJumping = false;

        var id = 'qbert';
        var type = 'qbert';

        GameBoard.registerCharacter({ id, type, position: $scope.position })
    };

    GameBoard.subscribe((data) => {
        var { action, payload } = data;

        switch (action) {
            case GameBoard.actions.animationStart: {
                $scope.isJumping = true;
                break;
            }
            case GameBoard.actions.animationEnd: {
                updateViewPosition();
                $timeout(() => $scope.isJumping = false, 500);
                break;
            }
        }
    });

    Game.subscribe((data) => {
        var { action } = data;

        switch (action) {
            case Game.actions.levelStarted: {
                init();
                updateViewPosition();
                break;
            }
        }
    });
}