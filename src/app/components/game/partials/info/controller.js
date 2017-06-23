export default function ($scope, $rootScope, Game) {
    $scope.points = 0;
    $scope.lives = 3;

    $scope.getArrayNumber = (n) => new Array(n);

    Game.subscribe(data => {
        var { action, payload } = data;

        switch (action) {
            case Game.actions.levelStarted: {
                let { level } = payload;
                $scope.level = level;
                let stepsToTarget = App.defaults.getLevelCfg(level).stepsToTarget;
                $scope.color = App.defaults.fieldColors[stepsToTarget];
                $scope.lives = 3;
                break;
            }
            case Game.actions.pointsAdded: 
            case Game.actions.pointsSubtracted: {
                let { points } = payload;
                $scope.points = points;
                $rootScope.totalScore = $scope.points;
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