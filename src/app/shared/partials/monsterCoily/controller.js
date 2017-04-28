export default async function ($scope, $rootScope, MonsterUtils, Gameboard) {
    $scope.id = "0";
    $scope.type = "coily";
    $scope.position = null;
    $scope.isTransformed = false;
    $scope.moves = getMoves();

    function move() {
        var possibleMoves = MonsterUtils.getPossibleMonsterMoves($scope);
        var myPos = $scope.position;
        var qbertPos = Gameboard.getQbertPos();

        if (possibleMoves.length > 0) {
            getBestMove(myPos, qbertPos, possibleMoves);
            Gameboard.move($scope.id, move);
        }
    }

    function getBestMove(monsterPos, qbertPos, possibleMoves) {
        if (!$scope.isTransformed)
            return MonsterUtils.random(possibleMoves);

        var bestMove = { move: null, distanceFromQbert: Infinity };

        for (var move of possibleMoves) {
            var startPos = MonsterUtils.getPosAfterMove(monsterPos, move);
            var distanceFromQbert = MonsterUtils.distanceBetween(startPos, qbertPos);
            if (distanceFromQbert < bestMove.distanceFromQbert) {
                bestMove.move = move;
                bestMove.distanceFromQbert = distanceFromQbert;
            }
        }

        return bestMove.move;
    }

    function transform() {
        $scope.transformed = true;
    }

    function getMoves() {
        var { upRight, upLeft, downRight, downLeft } = $rootScope.directions;
        if ($scope.isTransformed)
            return [upRight, upLeft, downRight, downLeft];
        else
            return [downRight, downLeft];
    }
}