export default async function ($scope, $rootScope, Gameboard, MonsterUtils) {
    $scope.id = "0";
    $scope.type = "sam";
    $scopee.positon = null;
    $scope.moves = [$rootScope.directions.downRight, $rootScope.directions.downLeft];

    function move() {
        var possibleMoves = MonsterUtils.getPossibleMonsterMoves($scope.id)

        if (possibleMoves.length > 0) {
            var move = MonsterUtils.random(possibleMoves);
            Gameboard.move({id: $scope.id, direction: move})
        }
    }

    function getMoves(){
        return $scope.moves;
    }
}