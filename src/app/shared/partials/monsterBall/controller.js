export default async function ($scope, Gameboard, MonsterUtils) {
    $scope.id = "0";
    $scope.type = "ball";
    $scope.position = null;
    $scope.moves = [$rootScope.directions.downRight, $rootScope.directions.downLeft];

    function move() {
        var possibleMoves = MonsterUtils.getPossibleMonsterMoves($scope.id)

        if (possibleMoves.length > 0) {
            var move = MonsterUtils.random(possibleMoves);
            Gameboard.move($scope.id, move)
        }
    }

    function getMoves(){
        return $scope.moves;
    }
}