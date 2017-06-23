export default function ($scope, $rootScope, $stateParams, $state, Game, GameBoard, $location) {
    $scope.gameEffect = $stateParams.effect;
    $scope.totalPoints = () => $rootScope.totalScore;

    $scope.playAgain = () => {
        $rootScope.totalScore = 0;
        $state.go('game', {});
    };
}