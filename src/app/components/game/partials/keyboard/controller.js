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
        var { action, payload } = data;

        switch (action) {
            case GameBoard.actions.qbertKilled:
            case GameBoard.actions.animationEnd: {
                $scope.jumpBlock = false;
                $scope.possibleMoves = GameBoard.getPossibleMoves(id);
                break;
            }
            case GameBoard.actions.registeredCharacter: {
                if (payload.type !== 'qbert') {
                    return;
                }

                $scope.possibleMoves = GameBoard.getPossibleMoves(id);
            }
        }
    });
}