export default async function ($scope, $rootScope, $timeout, GameBoard, Game, Timer, MonsterUtils) {
    var id = 'coily' + $scope.$id;
    var type = 'coily';
    var moves = getMoves();
    var hostile = true;
    var waitingRounds = 0;
    var moveCounter = 0;
    

    var updateViewPosition = () => {
        var { row, column } = $scope.position;
        var gameboard = GameBoard.get();

        gameboard[row][column].getPosition().then((position) => {
            $scope.top = position.top;
            $scope.left = position.left;
        });
    }

    function move() {
        hostile = moveCounter++ % (waitingRounds + 1) === 0;
        if($scope.isTransformed && !hostile )
            return;
        var possibleMoves = MonsterUtils.getPossibleMonsterMoves(id, moves);
        var qbertPos = GameBoard.getQbert().position;

        if (possibleMoves.length > 0) {
            var move = getBestMove($scope.position, qbertPos, possibleMoves);
            GameBoard.move({ id: id, direction: move });
        }
    }

    function unregister() {
        gameBoardSubscription.unsubscribe();
        GameBoard.unregisterCharacter(id);
    }

    var init = () => {
        $scope.position = { row: 3, column: 3 };

        $scope.isJumping = false;
        $scope.isAlive = true;
        $scope.isTransformed = false;

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
                $timeout(() => {
                    $scope.isJumping = false;
                    if (!$scope.isTransformed && $scope.position.row === 6)
                        transform();
                }, 500);
                break;
            }
            case GameBoard.actions.monsterDying: {
                die();
            }
        }
    });

    function die() {
        unregister();
        
        $timeout(() => {
            $scope.isDying = true;
        }, 500);
        $timeout(() => {
            $scope.isDying = false;
            $scope.isAlive = false;
        }, 900)
    }

    function getBestMove(monsterPos, qbertPos, possibleMoves) {
        if (!$scope.isTransformed)
            return MonsterUtils.randomMove(possibleMoves);

        var { upRight, upLeft, downRight, downLeft } = $rootScope.directions;
        var bestMove = null;

        if (qbertPos.column === monsterPos.column)
            bestMove = (qbertPos.row > monsterPos.row) ? downLeft : upRight;
        else if (qbertPos.column - monsterPos.column === qbertPos.row - monsterPos.row)
            bestMove = (qbertPos.row > monsterPos.row) ? downRight : upLeft;
        else if (qbertPos.row <= monsterPos.row)
            bestMove = (qbertPos.column < monsterPos.column) ? upLeft : upRight;
        else
            bestMove = (qbertPos.column < monsterPos.column) ? downLeft : downRight;

        return possibleMoves.includes(bestMove) ? bestMove : MonsterUtils.randomMove(possibleMoves);
    }

    function transform() {
        $scope.isTransformed = true;
        moves = getMoves();
    }

    function getMoves() {
        var { upRight, upLeft, downRight, downLeft } = $rootScope.directions;
        if ($scope.isTransformed)
            return [upRight, upLeft, downRight, downLeft];
        else
            return [downRight, downLeft];
    }

    init();
    updateViewPosition();

    $scope.$on('$destroy', () => {
        unregister();
    });
}