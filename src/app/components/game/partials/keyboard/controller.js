export default function ($scope, $timeout, GameBoard, Game) {
    var id = 'qbert';
    $scope.jumpBlock = false;

    $scope.move = (direction) => {
        if ($scope.jumpBlock) {
            return;
        }

        $scope.jumpBlock = true;
        GameBoard.move({ id, direction });
    }

    GameBoard.subscribe((data) => {
        var { action, payload } = data;
        var hasIdProp = payload && payload.id;

        if (hasIdProp && payload.id !== 'qbert') {
            return;
        }

        switch (action) {
            case GameBoard.actions.qbertKilled:
            case GameBoard.actions.animationEnd: {
                $timeout(() => {
                    $scope.jumpBlock = false;
                    $scope.possibleMoves = GameBoard.getPossibleMoves(id);
                }, 750);
                break;
            }
            case GameBoard.actions.registeredCharacter: {
                $scope.possibleMoves = GameBoard.getPossibleMoves(id);
            }
        }
    });
}