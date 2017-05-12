export default async function ($scope, $rootScope, GameBoard, Game) {
    $scope.id = "0";
    $scope.type = "ball";
    $scope.position = { row: 0, column: 0 };
    $scope.moves = [$rootScope.directions.downRight, $rootScope.directions.downLeft];

    var init = () => {
        $scope.position = {
            row: 3,
            column: 0
        }

        $scope.isJumping = false;

        var id = 'ball';
        var type = 'ball';

        GameBoard.registerCharacter({ id, type, position: $scope.position });
    };

    var updateViewPosition = () => {
        var { row, column } = $scope.position;
        var gameboard = GameBoard.get();

        gameboard[row][column].getPosition().then((position) => {
            $scope.top = position.top;
            $scope.left = position.left;
        });
    }

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