export default function ($scope, Game) {
    $scope.points = 0;
    $scope.lives = 3;

    Game.subscribe(data => {
        var { action, payload } = data;

        switch (action) {
            case Game.actions.levelStarted: {
                let { level } = payload;
                $scope.level = level;
                $scope.color = App.defaults.fieldColors[level];
                break;
            }
            case Game.actions.pointsAdded: 
            case Game.actions.pointsSubtracted: {
                let { points } = payload;
                $scope.points = points;
                break;
            }
            case Game.actions.qbertKilled: {
                let { lives } = payload;
                $scope.lives = lives;
                break;
            }
        }
    });
}