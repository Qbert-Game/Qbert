export default async function ($scope, MonsterUtils) {
    $scope.id = "0"
    $scope.isTransformed = false;
    $scope.moves = getMoves();

    function move() {
        var possibleMoves = MonsterUtils.getPossibleMoves($scope);
        var myPos = { row: 0, col: 0 }; // Gameboard.getMonsterPos($scope.id);
        var qbertPos = { row: 0, col: 0 }; // Gameboard.getQbertPos();

        if (possibleMoves.length > 0) {
            getBestMove(myPos, qbertPos, possibleMoves);
            //Gameboard.move(move);
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
        if ($scope.isTransformed)
            return ["UP RIGHT", "UP LEFT", "DOWN RIGHT", "DOWN LEFT"];
        else
            return ["DOWN RIGHT", "DOWN LEFT"]
    }
}