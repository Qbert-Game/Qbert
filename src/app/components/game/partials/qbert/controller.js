export default function ($scope, $rootScope, $timeout, Timer, GameBoard, Game) {
    var id = 'qbert';
    var type = 'qbert';

    var updateViewPosition = () => {
        var { row, column } = $scope.position;
        var gameboard = GameBoard.get();

        gameboard[row][column].getPosition().then((position) => {
            $scope.top = position.top;
            $scope.left = position.left;
        });
    }

    var init = () => {
        $scope.position = {
            row: 1,
            column: 0
        }

        $scope.isJumping = false;

        GameBoard.registerCharacter({ id, type, position: $scope.position });
    };

    GameBoard.subscribe((data) => {
        var { action, payload } = data;

        if (!payload || payload.id != id) {
            return;
        }

        switch (action) {
            case GameBoard.actions.animationStart: {
                $scope.isJumping = true;
                break;
            }
            case GameBoard.actions.animationEnd: {
                $scope.position = payload.position;
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