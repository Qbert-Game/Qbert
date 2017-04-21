export default function ($scope, GameBoard) {
    $scope.move = (direction) => {
        var id = 'qbert';
        GameBoard.move({ id, direction });
    }
}