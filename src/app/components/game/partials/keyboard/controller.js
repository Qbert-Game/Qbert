export default function ($scope, $timeout, GameBoard, Game) {
    var id = 'qbert';

    $scope.move = (direction) => {
        if ($scope.jumpBlock) {
            return;
        }

        GameBoard.move({ id, direction });
        $scope.jumpBlock = true;
    }

    GameBoard.subscribe((data) => {
        var { action } = data;

        if (action === GameBoard.actions.animationEnd) {
            $scope.jumpBlock = false;
            $scope.possibleMoves = GameBoard.getPossibleMoves(id);
        }
    });

    Game.subscribe((data) => {
        var { action } = data;

        switch (action) {
            case Game.actions.levelStarted: {
                $scope.possibleMoves = GameBoard.getPossibleMoves(id);
                break;
            }
        }
    });
}