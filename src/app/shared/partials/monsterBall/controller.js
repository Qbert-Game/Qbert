export default async function ($scope, MonsterUtils) {
    $scope.id = "0"
    $scope.moves = ["DOWN RIGHT", "DOWN LEFT"];

    function move() {
        var possibleMoves = MonsterUtils.getPossibleMoves($scope)

        if (possibleMoves.length > 0) {
            var move = MonsterUtils.random(possibleMoves);
            //Gameboard.move(move)
        }
    }

    function getMoves(){
        return $scope.moves;
    }
}