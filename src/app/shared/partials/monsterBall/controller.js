export default async function ($scope, $rootScope, $timeout, GameBoard, Game, Timer, MonsterUtils) {
    var id = 'ball' + $scope.$id;
    var type = 'ball';
    var moves = [$rootScope.directions.downRight, $rootScope.directions.downLeft];

    var updateViewPosition = () => {
        var { row, column } = $scope.position;
        var gameboard = GameBoard.get();

        gameboard[row][column].getPosition().then((position) => {
            $scope.top = position.top;
            $scope.left = position.left;
        });
    }

    function move() {
        var possibleMoves = MonsterUtils.getPossibleMonsterMoves(id, moves)

        if (possibleMoves.length > 0) {
            var move = MonsterUtils.randomMove(possibleMoves);
            GameBoard.move({ id: id, direction: move })
        }
    }

    var init = () => {
        $scope.position = {
            row: 1,
            column: 1
        }

        $scope.isJumping = false;
        $scope.isAlive = true;

        GameBoard.registerCharacter({ id, type, position: $scope.position });

        Timer.subscribe(move);
    };

    var gameBoardSubscription = GameBoard.subscribe((data) => {
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
            case GameBoard.actions.monsterDying: {
                die();
                break;
            }
        }
    });

    function die() {
        $timeout(() => {
            $scope.isJumping = true;
            $scope.top += 50;
            $scope.left += 20;
        }, 1000);
        $timeout(() => {
            $scope.isJumping = false;
            $scope.isDying = true;
        }, 1300);
        $timeout(() => {
            $scope.isDying = false;
            $scope.isAlive = false;
        }, 1800)
    }

    init();
    updateViewPosition();

    $scope.$on('$destroy', () => {
        gameBoardSubscription.unsubscribe();
        GameBoard.unregisterCharacter(id);
    });
}