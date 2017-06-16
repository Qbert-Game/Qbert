export default function ($scope, Timer, GameBoard, Game, $timeout) {
    var newLevelSound = new Audio('assets/audio/game-start.wav');
    
    // wait for all partials to be loaded
    $timeout(() => {
        Game.startLevel(1);

        if (!Timer.isTicking()) {
            Timer.start();
        }
    }, 0);

    var initMonstersContainer = () => {
        $scope.monsters = {
            ball: [],
            coily: [],
            sam: []
        };
    };

    Game.subscribe((data) => {
        var { action, payload } = data;

        switch (action) {
            case Game.actions.levelStarted: {
                initMonstersContainer();
                $scope.gameBoard = GameBoard.get();
                $scope.qbert = GameBoard.qbert;
                newLevelSound.play();
                break;
            }
            case Game.actions.addCharacter: {
                var { type } = payload;
                $scope.monsters[type].push({});
                break;
            }
        }
    });

    GameBoard.subscribe((data) => {
        var { action, payload } = data;

        switch (action) {
            case GameBoard.actions.qbertKilled: {
                // delete monsters
                initMonstersContainer();
                break;
            }
        }
    });
}