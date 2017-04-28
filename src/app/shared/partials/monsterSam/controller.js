export default async function ($scope, $rootScope, Gameboard, MonsterUtils) {
    $scope.id = "0";
    $scope.type = "sam";
    $scopee.positon = null;
    $scope.moves = [$rootScope.directions.downRight, $rootScope.directions.downLeft];

    function move() {
        var possibleMoves = MonsterUtils.getPossibleMonsterMoves($scope)

        if (possibleMoves.length > 0) {
            var move = MonsterUtils.random(possibleMoves);
            Gameboard.move(move)
        }
    }

    function getMoves(){
        return $scope.moves;
    }
}