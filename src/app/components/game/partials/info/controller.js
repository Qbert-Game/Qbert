export default function ($scope, Game) {
    Game.subscribe(data => {
        var { action, payload } = data;
        var { level } = payload;

        $scope.level = level;
        $scope.color = App.defaults.fieldColors[level];
    })
}