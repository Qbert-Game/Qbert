export default async function ($scope, $rootScope, $timeout, GameBoard, MonsterUtils) {
    $scope.gameboard = GameBoard.get();
    $scope.id = "xd";
    $scope.type = "ball";
    $scope.position = {row: 1, column: 1};
    $scope.moves = [$rootScope.directions.downRight, $rootScope.directions.downLeft];
    
 var updateViewPosition = () => {

        var { row, column } = $scope.position;
        var position = $scope.gameboard[row][column].getPosition();

        $scope.top = position.top;
        $scope.left = position.left;
    }
    GameBoard.registerCharacter({ id: $scope.id, type: $scope.type, position: $scope.position })

    $timeout(() => {
        updateViewPosition();
    }, 0);

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