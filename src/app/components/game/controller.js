export default function ($scope, Timer, GameBoard, Game, $timeout) {
    // wait for all partials to be loaded
    $timeout(() => {
        Game.startLevel(1);

        if (!Timer.isTicking()) {
            Timer.start();
        }
    }, 0);

    Game.subscribe((data) => {
        var { action, payload } = data;

        switch (action) {
            case Game.actions.levelStarted:
                $scope.monsters = {
                    ball: [],
                    coily: [],
                    sam: []
                };
                $scope.gameBoard = GameBoard.get();
                $scope.qbert = GameBoard.qbert;
                break;
            case Game.actions.addCharacter:
                var { type } = payload;
                $scope.monsters[type].push({});
                break;
        }
    })
}