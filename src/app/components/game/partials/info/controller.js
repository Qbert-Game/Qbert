export default function ($scope, Game) {
    $scope.points = 0;

    Game.subscribe(data => {
        var { action, payload } = data;

        switch (action) {
            case Game.actions.levelStarted: {
                let { level } = payload;
                $scope.level = level;
                $scope.color = App.defaults.fieldColors[level];
                break;
            }
            case Game.actions.pointsAdded: {
                let { points } = payload;
                $scope.points = points;
                break;
            }

        }
    });
}