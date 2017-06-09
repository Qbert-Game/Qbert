export default function ($scope, $rootScope, $timeout, Timer, GameBoard, Game) {
    var id = 'qbert';
    var type = 'qbert';
    var startingPos = null;

    var updateViewPosition = () => {
        var { row, column } = $scope.position;
        var gameboard = GameBoard.get();

        gameboard[row][column].getPosition().then((position) => {
            $scope.top = position.top;
            $scope.left = position.left;

            if(!startingPos && $scope.top)
                startingPos = {top: $scope.top, left: $scope.left};
            if(startingPos && startingPos.top > $scope.top){
                $scope.top = startingPos.top;
                $scope.left = startingPos.left;
            }
        });
    }

    var init = () => {
        $scope.position = {
            row: 0,
            column: 0
        }

        $scope.isJumping = false;
        $scope.showSpeechBubble = false;

        GameBoard.registerCharacter({ id, type, position: $scope.position });
    };

    var gameBoardSubscription = GameBoard.subscribe((data) => {
        var { action, payload } = data;

        if (!payload || payload.id != id) {
            return;
        }

        switch (action) {
            case GameBoard.actions.animationStart: {
                $scope.isJumping = true;
                break;
            }
            case GameBoard.actions.animationEnd: {
                $scope.position = payload.position;
                updateViewPosition();
                $timeout(() => $scope.isJumping = false, 500);
                break;
            }
            case GameBoard.actions.qbertKilled: {
                $scope.position = payload.position;
                $scope.showSpeechBubble = true;                
                $timeout(() => {
                    $scope.showSpeechBubble = false;
                    updateViewPosition();
                }, 1000);
                break;
            }
        }
    });

    var gameSubscription = Game.subscribe((data) => {
        var { action } = data;

        switch (action) {
            case Game.actions.levelStarted: {
                init();
                updateViewPosition();
                break;
            }
        }
    });

    $scope.$on('$destroy', () => {
        gameBoardSubscription.unsubscribe();
        gameSubscription.unsubscribe();
        GameBoard.unregisterCharacter(id);
    });
}