export default async function ($scope, $rootScope, $timeout, GameBoard, Game, MonsterUtils) {
    $scope.gameboard = GameBoard.get();
    $scope.id = "xd";
    $scope.type = "ball";
    $scope.position = {row: 1, column: 1};
    $scope.moves = [$rootScope.directions.downRight, $rootScope.directions.downLeft];
    
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
            row: 3,
            column: 0
        }

        $scope.isJumping = false;

        var id = 'ball';
        var type = 'ball';

        GameBoard.registerCharacter({ id, type, position: $scope.position });
    };

    function move() {
        var possibleMoves = MonsterUtils.getPossibleMonsterMoves($scope.id)

        if (possibleMoves.length > 0) {
            var move = MonsterUtils.random(possibleMoves);
            Gameboard.move({id: $scope.id, direction: move})
        }
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